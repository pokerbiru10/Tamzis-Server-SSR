<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\LayananDigitalSection;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LayananDigitalController extends Controller
{
    public function edit()
    {
        $sections = LayananDigitalSection::all()->pluck('data', 'key');

        return Inertia::render('pages/content/layanan-digital', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Layanan Digital', 'href' => '/dashboard/pages/content/layanan-digital'],
            ],
            'sections' => $sections,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'header' => 'required|array',
            'header.id.badge' => 'required|string|max:100',
            'header.id.title' => 'required|string|max:255',
            'header.id.subtitle' => 'required|string|max:500',
            'header.id.background_image' => 'nullable|string|max:500',
            'header.en.badge' => 'required|string|max:100',
            'header.en.title' => 'required|string|max:255',
            'header.en.subtitle' => 'required|string|max:500',
            'header.en.background_image' => 'nullable|string|max:500',
            'tentang' => 'required|array',
            'tentang.id.title' => 'required|string|max:255',
            'tentang.id.description' => 'required|string|max:2000',
            'tentang.en.title' => 'required|string|max:255',
            'tentang.en.description' => 'required|string|max:2000',
            'fitur' => 'required|array',
            'fitur.id.title' => 'required|string|max:255',
            'fitur.id.description' => 'required|string|max:1000',
            'fitur.id.items' => 'required|array|min:1',
            'fitur.id.items.*' => 'required|string|max:255',
            'fitur.en.title' => 'required|string|max:255',
            'fitur.en.description' => 'required|string|max:1000',
            'fitur.en.items' => 'required|array|min:1',
            'fitur.en.items.*' => 'required|string|max:255',
            'panduan' => 'required|array',
            'panduan.id.title' => 'required|string|max:255',
            'panduan.id.download_title' => 'required|string|max:255',
            'panduan.id.download_description' => 'required|string|max:1000',
            'panduan.id.download_play_store' => 'required|string|max:255',
            'panduan.id.panduan_user_title' => 'required|string|max:255',
            'panduan.id.panduan_steps' => 'required|array|min:1',
            'panduan.id.panduan_steps.*.title' => 'required|string|max:255',
            'panduan.id.panduan_steps.*.desc' => 'required|string|max:1000',
            'panduan.en.title' => 'required|string|max:255',
            'panduan.en.download_title' => 'required|string|max:255',
            'panduan.en.download_description' => 'required|string|max:1000',
            'panduan.en.download_play_store' => 'required|string|max:255',
            'panduan.en.panduan_user_title' => 'required|string|max:255',
            'panduan.en.panduan_steps' => 'required|array|min:1',
            'panduan.en.panduan_steps.*.title' => 'required|string|max:255',
            'panduan.en.panduan_steps.*.desc' => 'required|string|max:1000',
            'bantuan' => 'required|array',
            'bantuan.id.title' => 'required|string|max:255',
            'bantuan.id.hubungi_title' => 'required|string|max:255',
            'bantuan.id.hubungi_desc' => 'required|string|max:1000',
            'bantuan.id.hubungi_btn' => 'required|string|max:255',
            'bantuan.id.download_mtamzis_title' => 'required|string|max:255',
            'bantuan.id.download_mtamzis_desc' => 'required|string|max:1000',
            'bantuan.id.open_play_store' => 'required|string|max:255',
            'bantuan.id.faq_title' => 'required|string|max:255',
            'bantuan.id.faqs' => 'required|array|min:1',
            'bantuan.id.faqs.*.q' => 'required|string|max:500',
            'bantuan.id.faqs.*.a' => 'required|string|max:1000',
            'bantuan.en.title' => 'required|string|max:255',
            'bantuan.en.hubungi_title' => 'required|string|max:255',
            'bantuan.en.hubungi_desc' => 'required|string|max:1000',
            'bantuan.en.hubungi_btn' => 'required|string|max:255',
            'bantuan.en.download_mtamzis_title' => 'required|string|max:255',
            'bantuan.en.download_mtamzis_desc' => 'required|string|max:1000',
            'bantuan.en.open_play_store' => 'required|string|max:255',
            'bantuan.en.faq_title' => 'required|string|max:255',
            'bantuan.en.faqs' => 'required|array|min:1',
            'bantuan.en.faqs.*.q' => 'required|string|max:500',
            'bantuan.en.faqs.*.a' => 'required|string|max:1000',
        ]);

        foreach ($validated as $key => $data) {
            LayananDigitalSection::updateOrCreate(
                ['key' => $key],
                ['data' => $data]
            );
        }

        return back()->with('success', 'Konten Layanan Digital berhasil diperbarui!');
    }

    public function uploadBackgroundImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'locale' => 'required|string|in:id,en',
        ]);

        $section = LayananDigitalSection::firstOrCreate(['key' => 'header'], ['data' => []]);
        $data = $section->data;

        $locale = $request->input('locale');

        // Delete old uploaded image (never the default asset)
        if (isset($data[$locale]['background_image']) && str_starts_with($data[$locale]['background_image'], 'uploads/') && file_exists(public_path($data[$locale]['background_image']))) {
            ImageOptimizer::deleteSibling($data[$locale]['background_image']);
            unlink(public_path($data[$locale]['background_image']));
        }

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/layanan-digital/header');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);
        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1920, 80);
        $data[$locale]['background_image'] = 'uploads/images/layanan-digital/header/'.$filename;

        $section->update(['data' => $data]);

        return back()->with('success', 'Gambar background berhasil diperbarui!');
    }
}
