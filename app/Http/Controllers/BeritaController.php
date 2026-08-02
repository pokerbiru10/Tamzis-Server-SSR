<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\InstagramFeed;
use App\Models\InstagramFeedDb;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class BeritaController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));

        // Berita manual yang dikelola lewat dashboard CRUD (tabel instagram_feeds,
        // instagram_id berawalan "manual-"). Feed hasil sync Instagram tidak diikutkan.
        $beritaData = $this->getBeritaManual($search);

        return Inertia::render('berita', [
            'berita' => $beritaData,
            'search' => $search,
        ]);
    }

    public function show(int $id): Response
    {
        // Cari di tabel berita dulu
        $berita = Berita::published()->find($id);

        if ($berita) {
            return $this->showBerita($berita);
        }

        // Berita manual yang dikelola lewat dashboard CRUD (tabel instagram_feeds)
        $manual = InstagramFeed::where('is_published', true)
            ->where('instagram_id', 'like', 'manual-%')
            ->find($id);

        if ($manual) {
            return $this->showManual($manual);
        }

        // Jika tidak ada, cari di instagram_feed_db (hasil sync feed Instagram)
        $instagramItem = InstagramFeedDb::published()->findOrFail($id);

        return $this->showInstagramFeed($instagramItem);
    }

    protected function showBerita(Berita $berita): Response
    {
        return Inertia::render('berita-detail', [
            'feed' => [
                'id' => $berita->id,
                'caption' => $berita->content,
                'excerpt' => $berita->excerpt ?: $berita->title,
                'image' => $this->normalizeImage($berita->image_path),
                'permalink' => null,
                'posted_at_human' => $berita->published_at?->translatedFormat('d F Y'),
                'tags' => $berita->tags->map(fn ($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'slug' => $t->slug,
                ])->values(),
            ],
            'type' => 'berita',
        ]);
    }

    protected function showManual(InstagramFeed $feed): Response
    {
        $caption = $feed->caption ?? '';
        $excerpt = $feed->excerpt ?: str(strip_tags($caption))->limit(160)->toString();

        return Inertia::render('berita-detail', [
            'feed' => [
                'id' => $feed->id,
                'caption' => $caption,
                'excerpt' => $excerpt,
                'image' => $this->normalizeImage($feed->image_path ?: $feed->media_url),
                'permalink' => $feed->permalink,
                'posted_at_human' => $feed->posted_at?->translatedFormat('d F Y'),
                'tags' => $feed->tags->map(fn ($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'slug' => $t->slug,
                ])->values(),
            ],
            'type' => 'manual',
        ]);
    }

    protected function showInstagramFeed(InstagramFeedDb $item): Response
    {
        $caption = $item->caption ?? '';
        $excerpt = $item->excerpt ?: str(strip_tags($caption))->limit(160)->toString();

        return Inertia::render('berita-detail', [
            'feed' => [
                'id' => $item->id,
                'caption' => $caption,
                'excerpt' => $excerpt,
                'image' => $this->normalizeImage($item->image),
                'permalink' => $item->permalink,
                'posted_at_human' => $item->posted_at?->translatedFormat('d F Y'),
                'tags' => [],
            ],
            'type' => 'instagram',
        ]);
    }

    protected function getBeritaManual(string $search = ''): Collection
    {
        $query = InstagramFeed::query()
            ->with('tags')
            ->where('instagram_id', 'like', 'manual-%')
            ->where('is_published', true);

        if ($search !== '') {
            $query->where(function ($qb) use ($search) {
                $qb->where('caption', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        return $query->orderByDesc('posted_at')
            ->get()
            ->map(fn (InstagramFeed $item) => [
                'id' => $item->id,
                'title' => str(strip_tags($item->caption ?? ''))->limit(80)->toString(),
                'excerpt' => $item->excerpt
                    ?: str(strip_tags($item->caption ?? ''))->limit(160)->toString(),
                'image' => $this->normalizeImage($item->image_path ?: $item->media_url),
                'posted_at' => $item->posted_at?->translatedFormat('d F Y'),
                'timestamp' => $item->posted_at?->toIso8601String(),
                'tags' => $item->tags->map(fn ($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'slug' => $t->slug,
                ])->values(),
            ])
            ->values();
    }

    protected function normalizeImage(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return '/'.ltrim($path, '/');
    }
}
