<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\KegiatanSdi;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanSdiController extends Controller
{
    public function index()
    {
        return Inertia::render('kegiatan-sdi/index', [
            'kegiatan' => KegiatanSdi::orderBy('id', 'desc')->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $request->only(['title', 'content', 'is_active']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $this->uploadImage($request);
        }

        KegiatanSdi::create($data);

        return redirect()->back()->with('success', 'Kegiatan SDI berhasil ditambahkan.');
    }

    public function update(Request $request, KegiatanSdi $kegiatanSdi)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $request->only(['title', 'content', 'is_active']);

        if ($request->hasFile('image')) {
            $this->deleteImage($kegiatanSdi->image_path);
            $data['image_path'] = $this->uploadImage($request);
        }

        $kegiatanSdi->update($data);

        return redirect()->back()->with('success', 'Kegiatan SDI berhasil diperbarui.');
    }

    public function destroy(KegiatanSdi $kegiatanSdi)
    {
        $this->deleteImage($kegiatanSdi->image_path);
        $kegiatanSdi->delete();

        return redirect()->back()->with('success', 'Kegiatan SDI berhasil dihapus.');
    }

    private function uploadImage(Request $request): string
    {
        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/kegiatan-sdi');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);

        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1200, 80);

        return '/uploads/images/kegiatan-sdi/'.$filename;
    }

    private function deleteImage(?string $imagePath): void
    {
        if (! $imagePath) {
            return;
        }

        $publicFile = public_path(ltrim($imagePath, '/'));
        if (str_starts_with($imagePath, '/uploads/') && file_exists($publicFile)) {
            ImageOptimizer::deleteSibling($imagePath);
            unlink($publicFile);
        }
    }
}
