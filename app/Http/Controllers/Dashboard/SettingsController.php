<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Services\EnvFileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the API settings page.
     */
    public function index()
    {
        $settings = [
            'ELFSIGHT_WIDGET_ID' => [
                'label' => 'Elfsight Widget ID',
                'value' => AppSetting::get('ELFSIGHT_WIDGET_ID', 'ab3033ea-aefd-4900-b309-55712f426462'),
                'description' => 'Widget ID dari Elfsight untuk menampilkan feed Instagram di halaman beranda.',
                'type' => 'text',
            ],
            'INSTAGRAM_ACCESS_TOKEN' => [
                'label' => 'Instagram Access Token',
                'value' => AppSetting::get('INSTAGRAM_ACCESS_TOKEN', ''),
                'description' => 'Access token untuk mengambil data dari Instagram API.',
                'type' => 'password',
            ],
            'INSTAGRAM_USER_ID' => [
                'label' => 'Instagram User ID',
                'value' => AppSetting::get('INSTAGRAM_USER_ID', '17841407149067411'),
                'description' => 'User ID Instagram untuk mengambil feed.',
                'type' => 'text',
            ],
            'INSTAGRAM_ACCOUNT_NAME' => [
                'label' => 'Instagram Account Name',
                'value' => AppSetting::get('INSTAGRAM_ACCOUNT_NAME', 'tamzisbinautama'),
                'description' => 'Nama akun Instagram tanpa @.',
                'type' => 'text',
            ],
            'TAMZIS_API_URL' => [
                'label' => 'TAMZIS API URL',
                'value' => AppSetting::get('TAMZIS_API_URL', 'http://103.52.147.11:10505'),
                'description' => 'URL API TAMZIS untuk integrasi.',
                'type' => 'text',
            ],
            'HMAC_SECRET_KEY' => [
                'label' => 'HMAC Secret Key',
                'value' => AppSetting::get('HMAC_SECRET_KEY', ''),
                'description' => 'Secret key untuk HMAC authentication.',
                'type' => 'password',
            ],
        ];

        return Inertia::render('pages/settings/api', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Pengaturan', 'href' => '#'],
                ['title' => 'API Settings', 'href' => '/dashboard/settings/api'],
            ],
            'settings' => $settings,
        ]);
    }

    /**
     * Update API settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string|max:255',
            'settings.*.value' => 'nullable|string|max:1000',
        ]);

        foreach ($validated['settings'] as $setting) {
            // Save to database
            AppSetting::set($setting['key'], $setting['value'] ?? '');

            // Update .env file
            EnvFileService::update($setting['key'], $setting['value'] ?? '');
        }

        return back()->with('success', 'Pengaturan API berhasil disimpan!');
    }

    /**
     * Clear config cache.
     */
    public function clearConfig()
    {
        Artisan::call('config:clear');
        Artisan::call('cache:clear');
        Artisan::call('view:clear');

        return back()->with('success', 'Config cache berhasil di-clear!');
    }
}
