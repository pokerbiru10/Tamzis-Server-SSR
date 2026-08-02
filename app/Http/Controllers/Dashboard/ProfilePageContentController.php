<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ProfilePageContent;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilePageContentController extends Controller
{
    public function edit()
    {
        return Inertia::render('pages/content/profil', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Konten Halaman Profil', 'href' => '/dashboard/pages/content/profil'],
            ],
            // Override tersimpan per halaman; default konten ada di frontend.
            'savedContents' => ProfilePageContent::all()->pluck('data', 'page_key'),
        ]);
    }

    public function editSimpanan()
    {
        return Inertia::render('pages/content/simpanan', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Konten Halaman Simpanan', 'href' => '/dashboard/pages/content/simpanan'],
            ],
            'savedContents' => ProfilePageContent::all()->pluck('data', 'page_key'),
        ]);
    }

    public function editPembiayaan()
    {
        return Inertia::render('pages/content/pembiayaan', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Konten Halaman Pembiayaan', 'href' => '/dashboard/pages/content/pembiayaan'],
            ],
            'savedContents' => ProfilePageContent::all()->pluck('data', 'page_key'),
        ]);
    }

    public function editBaitulMaal()
    {
        $baitulMaalKeys = [
            'baitul-maal',
            'pusat-jajanan-ramadhan',
            'bahagia-1000-yatim-dhuafa',
            'peduli-bencana',
            'peduli-sosial-keagaan',
            'peduli-yatim-dhuafa',
            'bedah-rumah-bahagia',
            'pemberdayaan-ekonomi',
            'berbasis-masjid-alquran',
            'beasiswa-ustadz',
            'cinta-masjid',
            'jumat-berkah',
            'tpq-ku',
            'pengembangan-amil-nadzir',
            'wakaf-mukena-alquran',
            'berbasis-mku',
            'bina-siswa-cerdas',
            'be-aktriyo',
            'mku',
            'peduli-kesehatan',
            'world-sight-day',
            'qurban',
            'khitan-ceria',
        ];

        $savedContents = ProfilePageContent::whereIn('page_key', $baitulMaalKeys)
            ->get()
            ->keyBy('page_key')
            ->map(fn ($item) => $item->data);

        return Inertia::render('pages/content/baitul-maal', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Kelola Halaman', 'href' => '#'],
                ['title' => 'Konten Halaman', 'href' => '/dashboard/pages/content'],
                ['title' => 'Konten Halaman Baitul Maal', 'href' => '/dashboard/pages/content/baitul-maal'],
            ],
            'savedContents' => $savedContents,
        ]);
    }

    public function update(Request $request, string $page)
    {
        abort_unless(in_array($page, ProfilePageContent::PAGE_KEYS), 404);

        $request->validate([
            'data' => 'required|array',
            'data.id' => 'required|array',
            'data.en' => 'required|array',
        ]);

        ProfilePageContent::updateOrCreate(
            ['page_key' => $page],
            ['data' => $request->input('data')],
        );

        return back()->with('success', 'Konten halaman berhasil diperbarui!');
    }

    public function updateBaitulMaal(Request $request, string $page)
    {
        $baitulMaalKeys = [
            'baitul-maal',
            'pusat-jajanan-ramadhan',
            'bahagia-1000-yatim-dhuafa',
            'peduli-bencana',
            'peduli-sosial-keagaan',
            'peduli-yatim-dhuafa',
            'bedah-rumah-bahagia',
            'pemberdayaan-ekonomi',
            'berbasis-masjid-alquran',
            'beasiswa-ustadz',
            'cinta-masjid',
            'jumat-berkah',
            'tpq-ku',
            'pengembangan-amil-nadzir',
            'wakaf-mukena-alquran',
            'berbasis-mku',
            'bina-siswa-cerdas',
            'be-aktriyo',
            'mku',
            'peduli-kesehatan',
            'world-sight-day',
            'qurban',
            'khitan-ceria',
        ];

        abort_unless(in_array($page, $baitulMaalKeys), 404);

        $request->validate([
            'data' => 'required|array',
            'data.id' => 'required|array',
            'data.en' => 'required|array',
        ]);

        ProfilePageContent::updateOrCreate(
            ['page_key' => $page],
            ['data' => $request->input('data')],
        );

        return back()->with('success', 'Konten halaman berhasil diperbarui!');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        // Simpan terstruktur per tanggal: public/uploads/images/2026/07/15/...
        $folder = 'uploads/images/'.now()->format('Y/m/d');
        $uploadPath = public_path($folder);
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);

        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1600, 80);

        return response()->json([
            'url' => '/'.$folder.'/'.$filename,
        ]);
    }

    // Endpoint publik: halaman depan mengambil override konten via AJAX.
    public function show(string $page)
    {
        abort_unless(in_array($page, ProfilePageContent::PAGE_KEYS), 404);

        $content = ProfilePageContent::where('page_key', $page)->first();

        return response()->json([
            'page_key' => $page,
            'data' => $content?->data,
        ]);
    }
}
