<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('pages/testimonials/index', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Testimoni Page', 'href' => '/dashboard/pages/testimonials'],
            ],
            'testimonials' => $testimonials,
        ]);
    }

    public function create()
    {
        return Inertia::render('pages/testimonials/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'locale' => 'required|string|in:id,en',
            'name' => 'required|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'quote' => 'required|string',
            'photo_url' => 'nullable|string|max:1000',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        Testimonial::create($validated);

        return redirect()->route('dashboard.pages.testimonials.index')
            ->with('success', 'Testimoni berhasil ditambahkan!');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('pages/testimonials/edit', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'locale' => 'required|string|in:id,en',
            'name' => 'required|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'quote' => 'required|string',
            'photo_url' => 'nullable|string|max:1000',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        $testimonial->update($validated);

        return redirect()->route('dashboard.pages.testimonials.index')
            ->with('success', 'Testimoni berhasil diperbarui!');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('dashboard.pages.testimonials.index')
            ->with('success', 'Testimoni berhasil dihapus!');
    }
}
