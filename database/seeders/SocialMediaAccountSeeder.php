<?php

namespace Database\Seeders;

use App\Models\SocialMediaAccount;
use Illuminate\Database\Seeder;

class SocialMediaAccountSeeder extends Seeder
{
    /**
     * Seed akun sosmed default Tamzis untuk floating menu.
     */
    public function run(): void
    {
        $accounts = [
            [
                'name' => 'Instagram',
                'icon' => 'instagram',
                'url' => 'https://www.instagram.com/tamzis_id/',
                'button_color' => '#E1306C',
                'sort_order' => 1,
            ],
            [
                'name' => 'Facebook',
                'icon' => 'facebook',
                'url' => 'https://www.facebook.com/TamzisBinaUtama/',
                'button_color' => '#1877F2',
                'sort_order' => 2,
            ],
            [
                'name' => 'YouTube',
                'icon' => 'youtube',
                'url' => 'https://www.youtube.com/@tamzisbinautama',
                'button_color' => '#FF0000',
                'sort_order' => 3,
            ],
        ];

        foreach ($accounts as $account) {
            SocialMediaAccount::updateOrCreate(
                ['icon' => $account['icon']],
                [...$account, 'is_active' => true]
            );
        }
    }
}
