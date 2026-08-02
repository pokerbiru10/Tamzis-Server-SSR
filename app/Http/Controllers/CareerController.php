<?php

namespace App\Http\Controllers;

use App\Models\KegiatanSdi;
use App\Models\JobVacancy;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        return Inertia::render('karir/index', [
            'vacancies' => JobVacancy::orderBy('id', 'desc')->paginate(10),
            'kegiatan' => KegiatanSdi::orderBy('id', 'desc')->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'apply_link' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|max:5120',
        ]);

        $data = $request->only(['title', 'description', 'apply_link', 'is_active']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $this->uploadImage($request);
        }

        JobVacancy::create($data);

        return redirect()->back()->with('success', 'Lowongan karir berhasil ditambahkan.');
    }

    public function update(Request $request, JobVacancy $karir)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'apply_link' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|max:5120',
        ]);

        $data = $request->only(['title', 'description', 'apply_link', 'is_active']);

        if ($request->hasFile('image')) {
            $this->deleteImage($karir->image_path);
            $data['image_path'] = $this->uploadImage($request);
        }

        $karir->update($data);

        return redirect()->back()->with('success', 'Lowongan karir berhasil diperbarui.');
    }

    public function destroy(JobVacancy $karir)
    {
        $this->deleteImage($karir->image_path);

        $karir->delete();

        return redirect()->back()->with('success', 'Lowongan karir berhasil dihapus.');
    }

    // Kegiatan SDI methods
    public function storeKegiatan(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $request->only(['title', 'content', 'is_active']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $this->uploadKegiatanImage($request);
        }

        KegiatanSdi::create($data);

        return redirect()->back()->with('success', 'Kegiatan SDI berhasil ditambahkan.');
    }

    public function updateKegiatan(Request $request, KegiatanSdi $kegiatanSdi)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_active' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $request->only(['title', 'content', 'is_active']);

        if ($request->hasFile('image')) {
            $this->deleteKegiatanImage($kegiatanSdi->image_path);
            $data['image_path'] = $this->uploadKegiatanImage($request);
        }

        $kegiatanSdi->update($data);

        return redirect()->back()->with('success', 'Kegiatan SDI berhasil diperbarui.');
    }

    public function destroyKegiatan(KegiatanSdi $kegiatanSdi)
    {
        $this->deleteKegiatanImage($kegiatanSdi->image_path);
        $kegiatanSdi->delete();

        return redirect()->back()->with('success', 'Kegiatan SDI berhasil dihapus.');
    }

    private function uploadImage(Request $request): string
    {
        $image = $request->file('image');
        $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

        $uploadPath = public_path('uploads/images/vacancies');
        if (! is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $image->move($uploadPath, $filename);

        ImageOptimizer::optimize($uploadPath.'/'.$filename, 1200, 80);

        return '/uploads/images/vacancies/'.$filename;
    }

    private function deleteImage(?string $imagePath): void
    {
        if (! $imagePath) {
            return;
        }

        if (str_starts_with($imagePath, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $imagePath);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }

            return;
        }

        $publicFile = public_path(ltrim($imagePath, '/'));
        if (str_starts_with($imagePath, '/uploads/') && file_exists($publicFile)) {
            ImageOptimizer::deleteSibling($imagePath);
            unlink($publicFile);
        }
    }

    private function uploadKegiatanImage(Request $request): string
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

    private function deleteKegiatanImage(?string $imagePath): void
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
