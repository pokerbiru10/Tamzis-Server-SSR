<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SiteSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalPageController extends Controller
{
    public const PAGE_KEYS = ['kebijakan-privasi', 'syarat-ketentuan'];

    public function edit()
    {
        $sections = SiteSection::whereIn('key', self::PAGE_KEYS)->pluck('data', 'key');

        return Inertia::render('pages/legal', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Kebijakan & Syarat', 'href' => '/dashboard/pages/legal'],
            ],
            'sections' => $sections,
        ]);
    }

    public function update(Request $request, string $page)
    {
        abort_unless(in_array($page, self::PAGE_KEYS), 404);

        $validated = $request->validate([
            'headerImage' => 'nullable|string|max:500',
            'id' => 'required|array|min:1',
            'id.*.title' => 'required|string|max:255',
            'id.*.body' => 'required|string',
            'en' => 'required|array|min:1',
            'en.*.title' => 'required|string|max:255',
            'en.*.body' => 'required|string',
        ]);

        SiteSection::updateOrCreate(
            ['key' => $page],
            ['data' => $validated],
        );

        return back()->with('success', 'Konten halaman berhasil diperbarui.');
    }
}
