<?php

namespace App\Services;

use App\Models\InstagramFeed;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Throwable;

class InstagramFeedService
{
    public function getFeed(): array
    {
        return Cache::remember($this->cacheKey(), now()->addMinutes(30), function () {
            return $this->fetchFeed();
        });
    }

    /**
     * 4 item terbaru (sesuai media_type di config) untuk galeri beranda/berita.
     * Utamakan dari database (gambar lokal), fallback ke feed langsung.
     */
    public function latestForHome(int $limit = 4): array
    {
        $mediaType = strtoupper((string) config('services.instagram.media_type', 'REELS'));

        $items = InstagramFeed::query()
            ->where('is_published', true)
            ->when($mediaType !== 'ALL', fn ($q) => $q->where('media_type', $mediaType))
            ->orderByDesc('posted_at')
            ->limit($limit)
            ->get()
            ->map(fn (InstagramFeed $item): array => [
                'id' => (string) $item->id,
                'caption' => (string) ($item->caption ?? ''),
                'excerpt' => (string) ($item->excerpt ?? ''),
                'image' => $item->image_path
                    ? (string) $item->image_path
                    : (string) ($item->media_url ?? ''),
                'permalink' => (string) ($item->permalink ?? '#'),
            ])
            ->values()
            ->all();

        if ($items !== []) {
            return $items;
        }

        return collect($this->getFeed())
            ->take($limit)
            ->map(fn (array $item): array => [
                'id' => (string) ($item['id'] ?? ''),
                'caption' => (string) ($item['caption'] ?? ''),
                'excerpt' => (string) ($item['excerpt'] ?? ''),
                'image' => (string) ($item['image'] ?? ''),
                'permalink' => (string) ($item['permalink'] ?? '#'),
            ])
            ->values()
            ->all();
    }

    public function syncToDatabase(): array
    {
        $items = $this->fetchFeed();

        foreach ($items as $item) {
            $instagramId = (string) $item['id'];
            $existing = InstagramFeed::query()->where('instagram_id', $instagramId)->first();

            $data = [
                'media_type' => $item['media_type'] ?? 'IMAGE',
                'caption' => $item['caption'] ?? null,
                'media_url' => $item['image'] ?? null,
                'excerpt' => $item['excerpt'] ?? null,
                'permalink' => $item['permalink'] ?? null,
                'posted_at' => ! empty($item['timestamp']) ? Carbon::parse($item['timestamp']) : null,
                'is_published' => true,
            ];

            // Cache gambar ke server lokal (ala Smash Balloon di WordPress):
            // hanya sekali per post, agar halaman tidak hotlink ke CDN Instagram.
            if ($existing === null || $existing->image_path === null || $existing->image_path === '') {
                $imagePath = $this->downloadImage($instagramId, $item['image'] ?? null);
                if ($imagePath !== null) {
                    $data['image_path'] = $imagePath;
                }
            }

            InstagramFeed::query()->updateOrCreate(
                ['instagram_id' => $instagramId],
                $data
            );
        }

        Cache::forget($this->cacheKey());

        return $items;
    }

    /**
     * Download gambar post ke public/uploads/images/instagram-feed dan
     * buat varian WebP pendamping. Mengembalikan path relatif (dari public),
     * atau null jika gagal.
     */
    protected function downloadImage(string $instagramId, ?string $url): ?string
    {
        if ($url === null || $url === '' || filter_var($url, FILTER_VALIDATE_URL) === false) {
            return null;
        }

        try {
            $dir = public_path('uploads/images/instagram-feed');

            if (! File::isDirectory($dir)) {
                File::makeDirectory($dir, 0755, true);
            }

            $filename = preg_replace('/[^A-Za-z0-9_-]/', '_', $instagramId) ?: md5($instagramId);
            $path = $dir.'/'.$filename.'.jpg';

            if (! File::exists($path)) {
                $response = Http::timeout(20)->get($url);

                if (! $response->successful()) {
                    return null;
                }

                File::put($path, $response->body());
            }

            $webp = ImageOptimizer::optimize($path, 800, 80);

            return $webp ?? 'uploads/images/instagram-feed/'.$filename.'.jpg';
        } catch (Throwable) {
            return null;
        }
    }

    protected function fetchFeed(): array
    {
        $limit = (int) config('services.instagram.limit', 16);
        $mediaType = strtoupper((string) config('services.instagram.media_type', 'ALL'));

        try {
            $items = $this->fetchFromGraphApi($limit, $mediaType);
            $items = $this->filterByMediaType($items, $mediaType);

            if ($items !== []) {
                return $items;
            }

            // Alternatif tanpa login: endpoint web internal Instagram
            // (gratis, tanpa akses token / Meta Developer).
            $items = $this->fetchFromWebApi($limit, $mediaType);
            $items = $this->filterByMediaType($items, $mediaType);

            if ($items !== []) {
                return $items;
            }

            $sourceUrl = (string) config('services.instagram.rsshub_url', 'https://rsshub.app/instagram/user/tamzisbinautama/json');
            $response = Http::timeout(20)->get($sourceUrl);

            if (! $response->successful()) {
                return $this->fallbackFeed();
            }

            $payload = $response->json();

            if (! is_array($payload) || isset($payload['error'])) {
                return $this->fallbackFeed();
            }

            $items = collect(data_get($payload, 'items', data_get($payload, 'data', [])))
                ->take($limit)
                ->map(function (array $item): array {
                    $caption = trim((string) data_get($item, 'title', data_get($item, 'caption', '')));
                    $image = (string) data_get($item, 'url', data_get($item, 'media_url', data_get($item, 'thumbnail', '')));
                    $permalink = (string) data_get($item, 'link', data_get($item, 'permalink', '#'));
                    $timestamp = (string) data_get($item, 'pubDate', data_get($item, 'timestamp', data_get($item, 'date', '')));
                    $id = (string) data_get($item, 'guid', data_get($item, 'id', md5($permalink.'|'.$caption)));

                    $isReel = preg_match('#/reel/#i', $permalink) === 1;
                    $isVideo = str_ends_with(strtolower($image), '.mp4');

                    return [
                        'id' => $id !== '' ? $id : (string) Str::uuid(),
                        'caption' => $caption,
                        'excerpt' => Str::limit($caption !== '' ? $caption : 'Kegiatan terbaru TAMZIS di Instagram.', 120),
                        'media_type' => $isReel ? 'REELS' : ($isVideo ? 'VIDEO' : 'IMAGE'),
                        'image' => $image,
                        'permalink' => $permalink,
                        'timestamp' => $timestamp,
                    ];
                })
                ->values()
                ->all();

            $items = $this->filterByMediaType($items, $mediaType);

            return $items !== [] ? $items : $this->fallbackFeed();
        } catch (Throwable) {
            return $this->fallbackFeed();
        }
    }

    /**
     * Saring item sesuai media type (REELS/VIDEO/IMAGE/ALL).
     */
    protected function filterByMediaType(array $items, string $mediaType): array
    {
        if ($mediaType === 'ALL') {
            return $items;
        }

        return array_values(array_filter(
            $items,
            fn (array $item): bool => strtoupper((string) ($item['media_type'] ?? 'IMAGE')) === $mediaType
        ));
    }

    protected function fetchFromGraphApi(int $limit, string $mediaType = 'ALL'): array
    {
        $accessToken = (string) config('services.instagram.access_token');
        $userId = (string) config('services.instagram.user_id');

        if ($accessToken === '' || $userId === '') {
            return [];
        }

        $params = [
            'fields' => 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url',
            'limit' => $limit,
            'access_token' => $accessToken,
        ];

        if ($mediaType !== 'ALL') {
            $params['media_type'] = $mediaType;
        }

        try {
            $response = Http::timeout(20)->get("https://graph.facebook.com/v19.0/{$userId}/media", $params);

            if (! $response->successful()) {
                return [];
            }
        } catch (Throwable) {
            return [];
        }

        $payload = $response->json();

        if (! is_array($payload)) {
            return [];
        }

        return collect(data_get($payload, 'data', []))
            ->take($limit)
            ->map(function (array $item): array {
                $caption = trim((string) data_get($item, 'caption', ''));
                $mediaType = strtoupper((string) data_get($item, 'media_type', 'IMAGE'));
                // Untuk video/reels pakai thumbnail_url (jpeg), bukan media_url (mp4).
                $image = $mediaType === 'REELS' || $mediaType === 'VIDEO'
                    ? (string) data_get($item, 'thumbnail_url', data_get($item, 'media_url', ''))
                    : (string) data_get($item, 'media_url', data_get($item, 'thumbnail_url', ''));
                $permalink = (string) data_get($item, 'permalink', '#');
                $timestamp = (string) data_get($item, 'timestamp', '');
                $id = (string) data_get($item, 'id', md5($permalink.'|'.$caption));

                return [
                    'id' => $id !== '' ? $id : (string) Str::uuid(),
                    'caption' => $caption,
                    'excerpt' => Str::limit($caption !== '' ? $caption : 'Kegiatan terbaru TAMZIS di Instagram.', 120),
                    'media_type' => $mediaType,
                    'image' => $image,
                    'permalink' => $permalink,
                    'timestamp' => $timestamp,
                ];
            })
            ->values()
            ->all();
    }

    /**
     * Endpoint web internal Instagram (tanpa login, tanpa token):
     * GET https://www.instagram.com/api/v1/feed/user/{username}/username/
     * Cukup header X-IG-App-ID + User-Agent mobile. media_type: 1=IMAGE,
     * 2=VIDEO (reels), 8=CAROUSEL_ALBUM.
     */
    protected function fetchFromWebApi(int $limit, string $mediaType = 'ALL'): array
    {
        $username = (string) config('services.instagram.account_name');

        if ($username === '') {
            return [];
        }

        try {
            $response = Http::withHeaders([
                'X-IG-App-ID' => '936619743392459',
                'User-Agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            ])->timeout(20)->get(
                "https://www.instagram.com/api/v1/feed/user/{$username}/username/",
                ['count' => max($limit * 3, 12)]
            );

            if (! $response->successful()) {
                return [];
            }

            $payload = $response->json();

            if (! is_array($payload) || ! is_array(data_get($payload, 'items'))) {
                return [];
            }

            return collect(data_get($payload, 'items', []))
                ->take($limit * 3)
                ->map(function (array $item): array {
                    $code = (string) data_get($item, 'code', '');
                    $permalink = $code !== ''
                        ? "https://www.instagram.com/reel/{$code}/"
                        : '#';
                    $caption = trim((string) data_get($item, 'caption.text', ''));
                    $candidates = data_get($item, 'image_versions2.candidates', []);
                    $image = (string) ($this->pickThumbnail($candidates) ?? '');
                    $id = (string) data_get($item, 'id', md5($permalink.'|'.$caption));
                    $takenAt = (int) data_get($item, 'taken_at', 0);

                    return [
                        'id' => $id !== '' ? $id : (string) Str::uuid(),
                        'caption' => $caption,
                        'excerpt' => Str::limit($caption !== '' ? $caption : 'Kegiatan terbaru TAMZIS di Instagram.', 120),
                        'media_type' => $this->normalizeWebMediaType((int) data_get($item, 'media_type', 1)),
                        'image' => $image,
                        'permalink' => $permalink,
                        'timestamp' => $takenAt > 0 ? date('c', $takenAt) : '',
                    ];
                })
                ->values()
                ->all();
        } catch (Throwable) {
            return [];
        }
    }

    /**
     * Pilih kandidat thumbnail dengan resolusi mendekati 640px (ringan untuk web).
     */
    protected function pickThumbnail(array $candidates): ?string
    {
        $best = null;
        $bestDiff = PHP_INT_MAX;

        foreach ($candidates as $candidate) {
            $width = (int) data_get($candidate, 'width', 0);
            $url = (string) data_get($candidate, 'url', '');
            $diff = abs($width - 640);

            if ($url !== '' && $diff < $bestDiff) {
                $bestDiff = $diff;
                $best = $url;
            }
        }

        return $best;
    }

    /**
     * Normalisasi media_type dari web API ke format Graph API:
     * 2 (video) dianggap reels, 8 = carousel.
     */
    protected function normalizeWebMediaType(int $type): string
    {
        return match ($type) {
            2 => 'REELS',
            8 => 'CAROUSEL_ALBUM',
            default => 'IMAGE',
        };
    }

    protected function fallbackFeed(): array
    {
        return [];
    }

    protected function cacheKey(): string
    {
        return 'instagram_feed_'.md5((string) config('services.instagram.user_id').'|'.(string) config('services.instagram.account_name'));
    }
}
