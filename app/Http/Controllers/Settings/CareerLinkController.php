<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CareerLinkController extends Controller
{
    /**
     * Show the career link settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/career-link', [
            'careerLinkUrl' => AppSetting::get('career_link_url', '/info-karir'),
            'careerLinkLabel' => AppSetting::get('career_link_label', 'Info Karir'),
            'careerLinkLabelEn' => AppSetting::get('career_link_label_en', 'Career Info'),
        ]);
    }

    /**
     * Update the career link URL and label.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'career_link_url' => ['required', 'string', 'max:500'],
            'career_link_label' => ['required', 'string', 'max:100'],
            'career_link_label_en' => ['required', 'string', 'max:100'],
        ]);

        AppSetting::set('career_link_url', $request->career_link_url);
        AppSetting::set('career_link_label', $request->career_link_label);
        AppSetting::set('career_link_label_en', $request->career_link_label_en);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Link Karir berhasil disimpan.']);

        return to_route('career-link.edit');
    }
}
