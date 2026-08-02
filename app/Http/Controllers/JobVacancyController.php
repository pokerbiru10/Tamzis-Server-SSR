<?php

namespace App\Http\Controllers;

use App\Models\InfoKarirSection;
use App\Models\JobVacancy;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobVacancyController extends Controller
{
    public function index()
    {
        $locale = app()->getLocale();
        $sections = InfoKarirSection::all()->pluck('data', 'key');

        return Inertia::render('info-karir', [
            'locale' => $locale,
            'sections' => $sections,
            'vacancies' => JobVacancy::where('is_active', true)->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'apply_link' => 'nullable|string|max:500',
            'image' => 'nullable|image|max:5120',
        ]);

        $data = $request->only(['title', 'description', 'apply_link']);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time().'_'.uniqid().'.'.$image->getClientOriginalExtension();

            $uploadPath = public_path('uploads/images/vacancies');
            if (! is_dir($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $image->move($uploadPath, $filename);
            ImageOptimizer::optimize($uploadPath.'/'.$filename, 1200, 80);
            $data['image_path'] = '/uploads/images/vacancies/'.$filename;
        }

        $data['is_active'] = true;

        JobVacancy::create($data);

        return redirect()->back()->with('message', 'Lowongan berhasil ditambahkan.');
    }
}
