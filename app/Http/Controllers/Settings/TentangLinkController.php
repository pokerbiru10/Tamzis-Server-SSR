<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TentangLinkController extends Controller
{
    /**
     * Show the tentang kami link settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/tentang-link', [
            'tentangLinkUrl' => AppSetting::get('tentang_link_url', '/company-profile'),
        ]);
    }

    /**
     * Update the tentang kami link URL.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'tentang_link_url' => ['required', 'string', 'max:500'],
        ]);

        AppSetting::set('tentang_link_url', $request->tentang_link_url);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Link Tentang Kami berhasil disimpan.']);

        return to_route('tentang-link.edit');
    }
}
