<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaSourceController extends Controller
{
    public function edit()
    {
        $currentSource = AppSetting::get('berita_source', 'elfsight');

        return Inertia::render('settings/berita-source', [
            'currentSource' => $currentSource,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'source' => 'required|in:elfsight,manual',
        ]);

        AppSetting::set('berita_source', $data['source']);

        return redirect()
            ->route('berita-source.edit')
            ->with('success', 'Sumber berita berhasil diperbarui.');
    }
}
