<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class FetchInstagramFeed extends Command
{
    protected $signature = 'instagram:fetch-json {--limit=12 : Number of posts to fetch}';
    protected $description = 'Fetch Instagram feed, download images locally, and save to public/instagram.json';

    public function handle(): int
    {
        $this->info('Fetching Instagram feed...');

        $limit = (int) $this->option('limit');

        // Try multiple sources
        $items = $this->fetchFromRssHub($limit);

        if (empty($items)) {
            $items = $this->fetchFromWebApi($limit);
        }

        if (empty($items)) {
            $this->warn('No items fetched. Keeping existing instagram.json if available.');
            return self::SUCCESS;
        }

        // Download images locally agar tidak bergantung pada CDN Instagram yang expire/hotlink-block
        $this->info('Downloading images...');
        $items = array_map(function (array $item) {
            $localPath = $this->downloadImage($item['id'] ?? '', $item['image'] ?? '');
            if ($localPath !== null) {
                $item['image'] = $localPath;
            }
            return $item;
        }, $items);

        // Save to public/instagram.json
        $jsonPath = public_path('instagram.json');
        $jsonContent = json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        File::put($jsonPath, $jsonContent);

        $this->info('Saved ' . count($items) . ' items to public/instagram.json');

        foreach (array_slice($items, 0, 3) as $item) {
            $this->line('- ' . Str::limit($item['caption'] ?? 'No caption', 60));
        }

        return self::SUCCESS;
    }

    /**
     * Download gambar ke public/uploads/images/instagram-feed/ dan kembalikan path relatif.
     * Dengan path lokal di JSON, gambar bisa di-serve dari GitHub raw CDN tanpa hotlink block.
     */
    protected function downloadImage(string $id, string $url): ?string
    {
        if ($url === '' || !filter_var($url, FILTER_VALIDATE_URL)) {
            return null;
        }

        try {
            $dir = public_path('uploads/images/instagram-feed');
            if (!File::isDirectory($dir)) {
                File::makeDirectory($dir, 0755, true);
            }

            $filename = preg_replace('/[^A-Za-z0-9_-]/', '_', $id ?: md5($url));

            // Deteksi ekstensi dari URL atau default ke .jpg
            $ext = 'jpg';
            if (str_contains($url, '.webp')) {
                $ext = 'webp';
            } elseif (str_contains($url, '.png')) {
                $ext = 'png';
            }

            $localFile = $dir . '/' . $filename . '.' . $ext;

            // Skip jika sudah ada
            if (File::exists($localFile)) {
                $this->line("  ↩ Exists: {$filename}.{$ext}");
                return 'uploads/images/instagram-feed/' . $filename . '.' . $ext;
            }

            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
                'Referer' => 'https://www.instagram.com/',
                'Accept' => 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
            ])->timeout(20)->get($url);

            if (!$response->successful()) {
                $this->warn("  ✗ HTTP {$response->status()} for {$id}");
                return null;
            }

            File::put($localFile, $response->body());
            $this->line("  ✓ Downloaded: {$filename}.{$ext}");

            return 'uploads/images/instagram-feed/' . $filename . '.' . $ext;
        } catch (\Throwable $e) {
            $this->warn("  ✗ Failed image for {$id}: " . $e->getMessage());
            return null;
        }
    }

    protected function fetchFromRssHub(int $limit): array
    {
        try {
            $url = 'https://rsshub.app/instagram/user/tamzisbinautama';
            $response = Http::timeout(30)->get($url);

            if (!$response->successful()) {
                $this->warn('RSSHub returned: ' . $response->status());
                return [];
            }

            return $this->parseXml($response->body(), $limit);
        } catch (\Throwable $e) {
            $this->warn('RSSHub fetch failed: ' . $e->getMessage());
            return [];
        }
    }

    protected function fetchFromWebApi(int $limit): array
    {
        try {
            $username = 'tamzisbinautama';

            $response = Http::withHeaders([
                'X-IG-App-ID' => '936619743392459',
                'User-Agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            ])->timeout(30)->get(
                "https://www.instagram.com/api/v1/feed/user/{$username}/username/",
                ['count' => max($limit * 3, 12)]
            );

            if (!$response->successful()) {
                $this->warn('Web API returned: ' . $response->status());
                return [];
            }

            $data = $response->json();
            $items = data_get($data, 'items', []);

            return collect($items)
                ->take($limit)
                ->map(function ($item) {
                    $code = data_get($item, 'code', '');
                    $caption = trim(data_get($item, 'caption.text', ''));
                    $candidates = data_get($item, 'image_versions2.candidates', []);

                    return [
                        'id' => data_get($item, 'id', ''),
                        'caption' => $caption,
                        'excerpt' => Str::limit($caption ?: 'Feed Instagram TAMZIS', 120),
                        'media_type' => $this->normalizeMediaType(data_get($item, 'media_type', 1)),
                        'image' => $this->pickBestImage($candidates),
                        'video' => data_get($item, 'video_versions.0.url') ?? '',
                        'permalink' => $code ? "https://www.instagram.com/reel/{$code}/" : '#',
                        'timestamp' => date('c', data_get($item, 'taken_at', 0)),
                        'likes_count' => data_get($item, 'like_count', 0),
                        'comments_count' => data_get($item, 'comment_count', 0),
                    ];
                })
                ->values()
                ->all();
        } catch (\Throwable $e) {
            $this->warn('Web API fetch failed: ' . $e->getMessage());
            return [];
        }
    }

    protected function parseXml(string $xml, int $limit): array
    {
        try {
            $xmlElement = simplexml_load_string($xml);
            if (!$xmlElement) {
                return [];
            }

            $items = [];
            foreach ($xmlElement->channel->item as $item) {
                $title = (string) $item->title;
                $link = (string) $item->link;
                $pubDate = (string) $item->pubDate;
                $description = (string) $item->description;

                $image = '';
                if (preg_match('/<img[^>]+src="([^"]+)"/', $description, $m)) {
                    $image = $m[1];
                }

                foreach ($item->enclosure as $enc) {
                    $type = (string) $enc['type'];
                    if (str_starts_with($type, 'image/')) {
                        $image = (string) $enc['url'];
                        break;
                    }
                }

                $isReel = preg_match('#/reel/#i', $link) === 1;

                $items[] = [
                    'id' => md5($link),
                    'caption' => $title,
                    'excerpt' => Str::limit($title ?: 'Feed Instagram TAMZIS', 120),
                    'media_type' => $isReel ? 'REELS' : 'IMAGE',
                    'image' => $image,
                    'video' => '',
                    'permalink' => $link,
                    'timestamp' => $pubDate ? date('c', strtotime($pubDate)) : '',
                    'likes_count' => 0,
                    'comments_count' => 0,
                ];

                if (count($items) >= $limit) {
                    break;
                }
            }

            return $items;
        } catch (\Throwable $e) {
            $this->warn('XML parse failed: ' . $e->getMessage());
            return [];
        }
    }

    protected function pickBestImage(array $candidates): string
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

        return $best ?? '';
    }

    protected function normalizeMediaType(int $type): string
    {
        return match ($type) {
            2 => 'REELS',
            8 => 'CAROUSEL',
            default => 'IMAGE',
        };
    }
}