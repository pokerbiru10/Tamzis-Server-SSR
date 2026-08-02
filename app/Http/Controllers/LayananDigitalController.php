<?php

namespace App\Http\Controllers;

use App\Models\LayananDigitalSection;

class LayananDigitalController extends Controller
{
    public function index()
    {
        $locale = app()->getLocale();
        $sections = LayananDigitalSection::all()->pluck('data', 'key');

        return inertia('layanan-digital', [
            'locale' => $locale,
            'sections' => $sections,
        ]);
    }
}
