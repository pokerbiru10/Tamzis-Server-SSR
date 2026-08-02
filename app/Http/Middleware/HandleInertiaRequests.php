<?php

namespace App\Http\Middleware;

use App\Models\AppSetting;
use App\Models\ProfilePageContent;
use App\Models\SiteSection;
use App\Models\SocialMediaAccount;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => app()->getLocale(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'simulasiId' => fn () => $request->session()->get('simulasi_id'),
            ],
            'socialMediaAccounts' => fn () => SocialMediaAccount::where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(['id', 'name', 'icon', 'url', 'button_color']),
            'careerLinkUrl' => fn () => AppSetting::get('career_link_url', '/info-karir'),
            'careerLinkLabel' => fn () => app()->getLocale() === 'en'
                ? AppSetting::get('career_link_label_en') ?: AppSetting::get('career_link_label', 'Career Info')
                : AppSetting::get('career_link_label', 'Info Karir'),
            'layananLinkUrl' => fn () => AppSetting::get('layanan_link_url', '/simulasi-gtb'),
            'tentangLinkUrl' => fn () => AppSetting::get('tentang_link_url', '/company-profile'),
            'siteSections' => fn () => SiteSection::all()->pluck('data', 'key'),
            // Dikirim langsung di initial load (bukan fetch AJAX terpisah) supaya
            // halaman profil/simpanan/pembiayaan/baitul-maal tidak "flash" nampilin
            // teks default dulu sebelum keganti teks tersimpan dari admin.
            'profileContents' => fn () => ProfilePageContent::all()->pluck('data', 'page_key'),
        ];
    }
}
