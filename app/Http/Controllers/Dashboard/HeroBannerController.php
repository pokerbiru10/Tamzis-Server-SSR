<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\HeroBanner;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = HeroBanner::orderBy('order')->orderBy('created_at', 'desc')->get();

        return Inertia::render('pages/banners/hero/index', [
            'banners' => $banners,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pages/banners/hero/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string|max:100',
            'button_url' => 'nullable|string|max:500',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:1024',
            'page_slug' => 'required|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

            // Ensure directory exists
            $uploadPath = public_path('uploads/images/banner/hero-section');
            if (! file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $image->move($uploadPath, $filename);
            ImageOptimizer::optimize($uploadPath.'/'.$filename, 1920, 80);
            $validated['image_path'] = 'uploads/images/banner/hero-section/'.$filename;
        }

        HeroBanner::create($validated);

        return redirect()->route('dashboard.pages.banners.hero.index')
            ->with('success', 'Banner berhasil ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroBanner $banner)
    {
        return Inertia::render('pages/banners/hero/edit', [
            'banner' => $banner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroBanner $banner)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string|max:100',
            'button_url' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1024',
            'page_slug' => 'required|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($banner->image_path && file_exists(public_path($banner->image_path))) {
                ImageOptimizer::deleteSibling($banner->image_path);
                unlink(public_path($banner->image_path));
            }

            $image = $request->file('image');
            $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

            $uploadPath = public_path('uploads/images/banner/hero-section');
            if (! file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $image->move($uploadPath, $filename);
            ImageOptimizer::optimize($uploadPath.'/'.$filename, 1920, 80);
            $validated['image_path'] = 'uploads/images/banner/hero-section/'.$filename;
        }

        $banner->update($validated);

        return redirect()->route('dashboard.pages.banners.hero.index')
            ->with('success', 'Banner berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroBanner $banner)
    {
        // Delete image file
        if ($banner->image_path && file_exists(public_path($banner->image_path))) {
            ImageOptimizer::deleteSibling($banner->image_path);
            unlink(public_path($banner->image_path));
        }

        $banner->delete();

        return redirect()->route('dashboard.pages.banners.hero.index')
            ->with('success', 'Banner berhasil dihapus!');
    }

    /**
     * Toggle active status
     */
    public function toggleActive(HeroBanner $banner)
    {
        $banner->update(['is_active' => ! $banner->is_active]);

        return back()->with('success', 'Status banner berhasil diubah!');
    }
}
