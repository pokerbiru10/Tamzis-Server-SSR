<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LayananLinkController extends Controller
{
    /**
     * Show the layanan link settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/layanan-link', [
            'layananLinkUrl' => AppSetting::get('layanan_link_url', '/simulasi-gtb'),
        ]);
    }

    /**
     * Update the layanan link URL.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'layanan_link_url' => ['required', 'string', 'max:500'],
        ]);

        AppSetting::set('layanan_link_url', $request->layanan_link_url);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Link Layanan berhasil disimpan.']);

        return to_route('layanan-link.edit');
    }
}
