<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use App\Models\SiteSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSectionController extends Controller
{
    public function edit()
    {
        $sections = SiteSection::all()->pluck('data', 'key');

        return Inertia::render('pages/navigation', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Navbar & Footer', 'href' => '/dashboard/pages/navigation'],
            ],
            'sections' => $sections,
            'availablePages' => PageContent::where('is_published', true)
                ->orderBy('title')
                ->get(['id', 'title', 'slug', 'locale']),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'topbar' => 'required|array',
            'topbar.phone' => 'required|string|max:30',
            'topbar.phoneLabel.id' => 'required|string|max:100',
            'topbar.phoneLabel.en' => 'required|string|max:100',
            'topbar.whatsapp' => 'required|string|max:30',
            'topbar.socials.instagram' => 'nullable|string|max:255',
            'topbar.socials.facebook' => 'nullable|string|max:255',
            'topbar.socials.youtube' => 'nullable|string|max:255',
            'navbar' => 'required|array',
            'navbar.id' => 'required|array|min:1',
            'navbar.id.*.label' => 'required|string|max:100',
            'navbar.id.*.href' => 'required|string|max:255',
            'navbar.id.*.items' => 'sometimes|array',
            'navbar.id.*.items.*.label' => 'required|string|max:100',
            'navbar.id.*.items.*.href' => 'required|string|max:255',
            'navbar.id.*.sections' => 'sometimes|array',
            'navbar.id.*.sections.*.title' => 'required|string|max:100',
            'navbar.id.*.sections.*.items' => 'sometimes|array',
            'navbar.id.*.sections.*.items.*.label' => 'required|string|max:150',
            'navbar.id.*.sections.*.items.*.href' => 'required|string|max:255',
            'navbar.en' => 'required|array|min:1',
            'navbar.en.*.label' => 'required|string|max:100',
            'navbar.en.*.href' => 'required|string|max:255',
            'navbar.en.*.items' => 'sometimes|array',
            'navbar.en.*.items.*.label' => 'required|string|max:100',
            'navbar.en.*.items.*.href' => 'required|string|max:255',
            'navbar.en.*.sections' => 'sometimes|array',
            'navbar.en.*.sections.*.title' => 'required|string|max:100',
            'navbar.en.*.sections.*.items' => 'sometimes|array',
            'navbar.en.*.sections.*.items.*.label' => 'required|string|max:150',
            'navbar.en.*.sections.*.items.*.href' => 'required|string|max:255',
            'footer' => 'required|array',
            'footer.id.about' => 'required|string|max:500',
            'footer.id.menuTitle' => 'required|string|max:50',
            'footer.id.links' => 'required|array',
            'footer.id.links.*.label' => 'required|string|max:100',
            'footer.id.links.*.href' => 'required|string|max:255',
            'footer.id.contactTitle' => 'required|string|max:50',
            'footer.id.callCenter' => 'required|string|max:150',
            'footer.id.phone' => 'required|string|max:30',
            'footer.id.email' => 'required|string|max:100',
            'footer.id.nearestOffice' => 'required|string|max:100',
            'footer.id.privacy' => 'required|string|max:100',
            'footer.id.terms' => 'required|string|max:100',
            'footer.id.copyright' => 'required|string|max:150',
            'footer.en.about' => 'required|string|max:500',
            'footer.en.menuTitle' => 'required|string|max:50',
            'footer.en.links' => 'required|array',
            'footer.en.links.*.label' => 'required|string|max:100',
            'footer.en.links.*.href' => 'required|string|max:255',
            'footer.en.contactTitle' => 'required|string|max:50',
            'footer.en.callCenter' => 'required|string|max:150',
            'footer.en.phone' => 'required|string|max:30',
            'footer.en.email' => 'required|string|max:100',
            'footer.en.nearestOffice' => 'required|string|max:100',
            'footer.en.privacy' => 'required|string|max:100',
            'footer.en.terms' => 'required|string|max:100',
            'footer.en.copyright' => 'required|string|max:150',
        ]);

        // Simpan input mentah agar field tambahan (type, image, footerTitle, dll.) ikut tersimpan.
        foreach (['topbar', 'navbar', 'footer'] as $key) {
            SiteSection::updateOrCreate(
                ['key' => $key],
                ['data' => $request->input($key)],
            );
        }

        return back()->with('success', 'Navbar & footer berhasil diperbarui!');
    }
}
