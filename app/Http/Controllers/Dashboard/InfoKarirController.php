<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\InfoKarirSection;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfoKarirController extends Controller
{
    public function edit()
    {
        $sections = InfoKarirSection::all()->pluck('data', 'key');

        return Inertia::render('pages/content/info-karir', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Info Karir', 'href' => '/dashboard/pages/content/info-karir'],
            ],
            'sections' => $sections,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'header' => 'required|array',
            'header.id.title' => 'required|string|max:255',
            'header.id.subtitle' => 'required|string|max:255',
            'header.id.background_image' => 'nullable|string|max:500',
            'header.en.title' => 'required|string|max:255',
            'header.en.subtitle' => 'required|string|max:255',
            'header.en.background_image' => 'nullable|string|max:500',
            'informasi' => 'required|array',
            'informasi.id.title' => 'required|string|max:255',
            'informasi.id.description' => 'required|string|max:5000',
            'informasi.id.button_text' => 'required|string|max:100',
            'informasi.id.values' => 'required|array|min:1',
            'informasi.id.values.*.title' => 'required|string|max:100',
            'informasi.id.values.*.desc' => 'required|string|max:500',
            'informasi.en.title' => 'required|string|max:255',
            'informasi.en.description' => 'required|string|max:5000',
            'informasi.en.button_text' => 'required|string|max:100',
            'informasi.en.values' => 'required|array|min:1',
            'informasi.en.values.*.title' => 'required|string|max:100',
            'informasi.en.values.*.desc' => 'required|string|max:500',
            'hrd' => 'required|array',
            'hrd.id.title' => 'required|string|max:255',
            'hrd.id.description' => 'required|string|max:2000',
            'hrd.id.programs' => 'required|array|min:1',
            'hrd.id.programs.*.title' => 'required|string|max:255',
            'hrd.id.programs.*.desc' => 'required|string|max:1000',
            'hrd.id.programs.*.image' => 'nullable|string|max:500',
            'hrd.en.title' => 'required|string|max:255',
            'hrd.en.description' => 'required|string|max:2000',
            'hrd.en.programs' => 'required|array|min:1',
            'hrd.en.programs.*.title' => 'required|string|max:255',
            'hrd.en.programs.*.desc' => 'required|string|max:1000',
            'hrd.en.programs.*.image' => 'nullable|string|max:500',
            'lowongan' => 'required|array',
            'lowongan.id.title' => 'required|string|max:255',
            'lowongan.id.description' => 'required|string|max:1000',
            'lowongan.id.empty_text' => 'required|string|max:255',
            'lowongan.id.apply_button' => 'required|string|max:100',
            'lowongan.en.title' => 'required|string|max:255',
            'lowongan.en.description' => 'required|string|max:1000',
            'lowongan.en.empty_text' => 'required|string|max:255',
            'lowongan.en.apply_button' => 'required|string|max:100',
            'contact' => 'required|array',
            'contact.id.title' => 'required|string|max:255',
            'contact.id.description' => 'required|string|max:1000',
            'contact.id.email' => 'required|email|max:255',
            'contact.id.phone' => 'required|string|max:50',
            'contact.id.whatsapp' => 'required|string|max:50',
            'contact.id.whatsapp_label' => 'required|string|max:100',
            'contact.id.office_label' => 'required|string|max:100',
            'contact.en.title' => 'required|string|max:255',
            'contact.en.description' => 'required|string|max:1000',
            'contact.en.email' => 'required|email|max:255',
            'contact.en.phone' => 'required|string|max:50',
            'contact.en.whatsapp' => 'required|string|max:50',
            'contact.en.whatsapp_label' => 'required|string|max:100',
            'contact.en.office_label' => 'required|string|max:100',
            'sidebar' => 'required|array',
            'sidebar.id.header' => 'required|string|max:100',
            'sidebar.id.items' => 'required|array|min:1',
            'sidebar.id.items.*.id' => 'required|string|max:50',
            'sidebar.id.items.*.label' => 'required|string|max:100',
            'sidebar.en.header' => 'required|string|max:100',
            'sidebar.en.items' => 'required|array|min:1',
            'sidebar.en.items.*.id' => 'required|string|max:50',
            'sidebar.en.items.*.label' => 'required|string|max:100',
        ]);

        foreach ($validated as $key => $data) {
            InfoKarirSection::updateOrCreate(
                ['key' => $key],
                ['data' => $data]
            );
        }

        return back()->with('success', 'Konten Info Karir berhasil diperbarui!');
    }

    public function uploadBackgroundImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'locale' => 'required|string|in:id,en',
        ]);

        $section = InfoKarirSection::firstOrCreate(['key' => 'header'], ['data' => []]);
        $data = $section->data;

        $locale = $request->input('locale');

        if (isset($data[$locale]['background_image']) && str_starts_with($data[$locale]['background_image'], 'uploads/') && file_exists(public_path($data[$locale]['background_image']))) {
            ImageOptimizer::deleteSibling($data[$locale]['background_image']);
            unlink(public_path($data[$locale]['background_image']));
        }

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/info-karir/header');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);
        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1920, 80);
        $data[$locale]['background_image'] = 'uploads/images/info-karir/header/'.$filename;

        $section->update(['data' => $data]);

        return back()->with('success', 'Gambar background berhasil diperbarui!');
    }

    public function uploadProgramImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'locale' => 'required|string|in:id,en',
            'index' => 'required|integer|min:0',
        ]);

        $section = InfoKarirSection::firstOrCreate(['key' => 'hrd'], ['data' => []]);
        $data = $section->data;

        $locale = $request->input('locale');
        $index = (int) $request->input('index');

        $oldImage = $data[$locale]['programs'][$index]['image'] ?? null;
        if ($oldImage && str_starts_with($oldImage, 'uploads/') && file_exists(public_path($oldImage))) {
            ImageOptimizer::deleteSibling($oldImage);
            unlink(public_path($oldImage));
        }

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/info-karir/hrd');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);
        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1200, 80);
        $data[$locale]['programs'][$index]['image'] = 'uploads/images/info-karir/hrd/'.$filename;

        $section->update(['data' => $data]);

        return back()->with('success', 'Foto kegiatan berhasil diperbarui!');
    }
}
