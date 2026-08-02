<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SiteSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KantorLayananContentController extends Controller
{
    private const KEY = 'kantor-layanan';

    public function edit()
    {
        $section = SiteSection::where('key', self::KEY)->first();

        return Inertia::render('pages/content/kantor-layanan', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Konten Halaman Kantor Layanan', 'href' => '/dashboard/pages/content/kantor-layanan'],
            ],
            'section' => $section?->data,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'headerImage' => 'nullable|string|max:500',
            'id' => 'required|array',
            'id.badge' => 'required|string|max:100',
            'id.title' => 'required|string|max:255',
            'id.content' => 'required|string',
            'en' => 'required|array',
            'en.badge' => 'required|string|max:100',
            'en.title' => 'required|string|max:255',
            'en.content' => 'required|string',
        ]);

        SiteSection::updateOrCreate(
            ['key' => self::KEY],
            ['data' => $validated],
        );

        return back()->with('success', 'Konten halaman Kantor Layanan berhasil diperbarui.');
    }
}
