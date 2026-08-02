<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\InstagramFeed;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaContentController extends Controller
{
    public function index(Request $request)
    {
        $query = InstagramFeed::with('tags');

        if ($request->filled('q')) {
            $q = $request->get('q');
            $query->where(function ($qbuilder) use ($q) {
                $qbuilder->where('caption', 'like', "%{$q}%")
                    ->orWhere('excerpt', 'like', "%{$q}%");
            });
        }

        $feeds = $query->orderByDesc('posted_at')
            ->limit(100)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'instagram_id' => $item->instagram_id,
                'caption' => $item->caption ?? '',
                'excerpt' => $item->excerpt ?? '',
                'media_url' => $item->media_url,
                'image_path' => $this->normalizeImagePath($item->image_path),
                'permalink' => $item->permalink,
                'posted_at' => optional($item->posted_at)->toIso8601String(),
                'is_published' => (bool) $item->is_published,
                'tags' => $item->tags->map(fn ($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'slug' => $t->slug,
                ])->values(),
            ]);

        $tags = Tag::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('pages/content/berita', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Kelola Berita', 'href' => '/dashboard/pages/content/berita'],
            ],
            'feeds' => $feeds,
            'tags' => $tags,
        ]);
    }

    private function normalizeImagePath(?string $path): ?string
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
