<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\InstagramFeed;
use App\Models\Tag;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    /**
     * Direktori simpan gambar relatif terhadap public/
     */
    private string $imageDir = 'uploads/image/berita';

    public function index(Request $request)
    {
        // Hanya berita yang dibuat manual lewat CRUD ini, bukan hasil sync feed Instagram.
        $query = InstagramFeed::with('tags')
            ->where('instagram_id', 'like', 'manual-%');

        if ($request->filled('q')) {
            $q = $request->get('q');
            $query->where(function ($qbuilder) use ($q) {
                $qbuilder->where('caption', 'like', "%{$q}%")
                    ->orWhere('excerpt', 'like', "%{$q}%");
            });
        }

        if ($request->filled('tag')) {
            $tag = $request->get('tag');
            $query->whereHas('tags', function ($qb) use ($tag) {
                $qb->where('slug', $tag);
            });
        }

        $perPage = (int) $request->get('per_page', 15);

        $feeds = $query->orderByDesc('posted_at')
            ->paginate($perPage)
            ->through(fn ($item) => [
                'id' => $item->id,
                'instagram_id' => $item->instagram_id,
                'caption' => str($item->caption ?? '')->replaceMatches('/\r?\n+/', ' ')->toString(),
                'excerpt' => str($item->excerpt ?? '')->replaceMatches('/\r?\n+/', ' ')->toString(),
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

        $availableTags = Tag::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('berita/index', [
            'feeds' => $feeds,
            'filters' => $request->only(['q', 'tag']),
            'tags' => $availableTags,
        ]);
    }

    public function create()
    {
        $tags = Tag::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('berita/create', [
            'tags' => $tags,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'instagram_id' => 'nullable|string|unique:instagram_feeds,instagram_id',
            'caption' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'media_url' => 'nullable|url',
            'permalink' => 'nullable|url',
            'posted_at' => 'nullable|date',
            'is_published' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:5120|dimensions:min_width=800,min_height=450',
        ], [
            'image.dimensions' => 'Ukuran gambar minimal 800×450 px agar tampil tajam di kartu berita.',
        ]);

        // Handle upload gambar
        $imagePath = null;
        if ($request->hasFile('image')) {
            $dir = public_path($this->imageDir);
            File::ensureDirectoryExists($dir);

            $file = $request->file('image');
            $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
            $file->move($dir, $filename);

            ImageOptimizer::optimize($dir.'/'.$filename, 1200, 80);

            $imagePath = '/'.$this->imageDir.'/'.$filename;
        }

        $feed = InstagramFeed::create([
            'instagram_id' => $data['instagram_id'] ?? 'manual-'.Str::uuid(),
            'caption' => $data['caption'] ?? null,
            'excerpt' => $data['excerpt'] ?? null,
            'media_url' => $data['media_url'] ?? null,
            'image_path' => $imagePath,
            'permalink' => $data['permalink'] ?? null,
            'posted_at' => $data['posted_at'] ?? now(),
            'is_published' => $data['is_published'] ?? true,
        ]);

        if (! empty($data['tags'])) {
            $tagIds = [];
            foreach ($data['tags'] as $tagName) {
                $slug = Str::slug($tagName);
                $tag = Tag::firstOrCreate(['slug' => $slug], ['name' => $tagName]);
                $tagIds[] = $tag->id;
            }
            $feed->tags()->sync($tagIds);
        }

        return redirect()
            ->route('dashboard.berita.index')
            ->with('success', 'Berita berhasil ditambahkan.');
    }

    public function show(InstagramFeed $berita)
    {
        return redirect()->route('dashboard.berita.index');
    }

    public function edit(InstagramFeed $berita)
    {
        $berita->load('tags');
        $tags = Tag::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('berita/edit', [
            'feed' => [
                'id' => $berita->id,
                'instagram_id' => $berita->instagram_id,
                'caption' => $berita->caption,
                'excerpt' => $berita->excerpt,
                'media_url' => $berita->media_url,
                'image_path' => $this->normalizeImagePath($berita->image_path),
                'permalink' => $berita->permalink,
                'posted_at' => optional($berita->posted_at)->format('Y-m-d'),
                'is_published' => $berita->is_published === 1 || $berita->is_published === true,
                'tags' => $berita->tags->map(fn ($t) => [
                    'id' => $t->id,
                    'name' => $t->name,
                    'slug' => $t->slug,
                ])->values(),
            ],
            'tags' => $tags,
        ]);
    }

    public function update(Request $request, InstagramFeed $berita)
    {
        $data = $request->validate([
            'caption' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'media_url' => 'nullable|url',
            'permalink' => 'nullable|url',
            'posted_at' => 'nullable|date',
            'is_published' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:5120|dimensions:min_width=800,min_height=450',
        ], [
            'image.dimensions' => 'Ukuran gambar minimal 800×450 px agar tampil tajam di kartu berita.',
        ]);

        // Handle upload gambar baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($berita->image_path) {
                ImageOptimizer::deleteSibling($berita->image_path);
                $oldFile = public_path($berita->image_path);
                if (File::exists($oldFile)) {
                    File::delete($oldFile);
                }
            }

            $dir = public_path($this->imageDir);
            File::ensureDirectoryExists($dir);

            $file = $request->file('image');
            $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
            $file->move($dir, $filename);

            ImageOptimizer::optimize($dir.'/'.$filename, 1200, 80);

            $data['image_path'] = '/'.$this->imageDir.'/'.$filename;
        }

        $berita->update($data);

        if (array_key_exists('tags', $data)) {
            $tagIds = [];
            foreach ($data['tags'] as $tagName) {
                $slug = Str::slug($tagName);
                $tag = Tag::firstOrCreate(['slug' => $slug], ['name' => $tagName]);
                $tagIds[] = $tag->id;
            }
            $berita->tags()->sync($tagIds);
        }

        return redirect()
            ->route('dashboard.berita.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(InstagramFeed $berita)
    {
        // Hapus gambar jika ada
        if ($berita->image_path) {
            ImageOptimizer::deleteSibling($berita->image_path);
            $oldFile = public_path($berita->image_path);
            if (File::exists($oldFile)) {
                File::delete($oldFile);
            }
        }

        $berita->delete();

        return redirect()
            ->route('dashboard.berita.index')
            ->with('success', 'Berita berhasil dihapus.');
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
