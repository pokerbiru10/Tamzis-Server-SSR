<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PageContentController extends Controller
{
    public function index()
    {
        $contents = PageContent::orderBy('title')
            ->orderBy('locale')
            ->get();

        return Inertia::render('pages/content/index', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
            ],
            'contents' => $contents,
        ]);
    }

    public function create()
    {
        return Inertia::render('pages/content/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validated($request);

        PageContent::create($validated);

        return redirect()->route('dashboard.pages.content.index')
            ->with('success', 'Konten halaman berhasil dibuat!');
    }

    public function edit(PageContent $content)
    {
        return Inertia::render('pages/content/edit', [
            'pageContent' => $content,
        ]);
    }

    public function update(Request $request, PageContent $content)
    {
        $validated = $this->validated($request, $content);

        $content->update($validated);

        return redirect()->route('dashboard.pages.content.index')
            ->with('success', 'Konten halaman berhasil diperbarui!');
    }

    public function destroy(PageContent $content)
    {
        $content->delete();

        return redirect()->route('dashboard.pages.content.index')
            ->with('success', 'Konten halaman berhasil dihapus!');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $folder = 'uploads/images/content/'.now()->format('Y/m/d');
        $uploadPath = public_path($folder);
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);

        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1600, 80);

        $url = '/'.$folder.'/'.$filename;

        return response()->json([
            'url' => $url,
        ]);
    }

    public function togglePublish(PageContent $content)
    {
        $content->update(['is_published' => ! $content->is_published]);

        return back()->with('success', 'Status publikasi diperbarui!');
    }

    private function validated(Request $request, ?PageContent $content = null): array
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('page_contents', 'slug')
                    ->where('locale', $request->input('locale', 'id'))
                    ->ignore($content?->id),
            ],
            'locale' => 'required|string|in:id,en',
            'content' => 'nullable|string',
            'meta_description' => 'nullable|string|max:500',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['slug'] ?: $validated['title']);
        $validated['is_published'] = $request->boolean('is_published', true);

        return $validated;
    }
}
