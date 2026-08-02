<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NavigationMenuSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $navigationMenus = [
            [
                'id' => 3,
                'location' => 'top_header_left',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'phone',
                'label' => 'Call Center Tamzis',
                'label_en' => 'Tamzis Call Center',
                'url' => 'tel:+62286325303',
                'is_active' => true,
                'order' => 0,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 4,
                'location' => 'top_header_left',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'whatsapp',
                'label' => 'WhatsApp',
                'label_en' => 'WhatsApp',
                'url' => 'https://wa.me/628112613134',
                'is_active' => true,
                'order' => 1,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 5,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => null,
                'label' => 'Tentang Kami',
                'label_en' => 'About Us',
                'url' => '/company-profile',
                'is_active' => true,
                'order' => 1,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 6,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => null,
                'label' => 'Layanan',
                'label_en' => 'Services',
                'url' => '/simulasi-gtb',
                'is_active' => true,
                'order' => 2,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 7,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'instagram',
                'label' => 'Instagram',
                'label_en' => 'Instagram',
                'url' => 'https://www.instagram.com/tamzis_id/',
                'is_active' => true,
                'order' => 3,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 8,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'facebook',
                'label' => 'Facebook',
                'label_en' => 'Facebook',
                'url' => 'https://www.facebook.com/TamzisBinaUtama/',
                'is_active' => true,
                'order' => 4,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 9,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'youtube',
                'label' => 'YouTube',
                'label_en' => 'YouTube',
                'url' => 'https://www.youtube.com/@tamzisbinautama',
                'is_active' => true,
                'order' => 5,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 10,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => null,
                'label' => 'Info Karir',
                'label_en' => 'Career Info',
                'url' => '/info-karir',
                'is_active' => true,
                'order' => 6,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Truncate table and insert with explicit IDs
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('navigation_menus')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        DB::table('navigation_menus')->insert($navigationMenus);
    }
}