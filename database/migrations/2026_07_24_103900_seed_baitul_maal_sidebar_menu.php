<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('sidebar_menus')->updateOrInsert(
            ['group_key' => 'baitul-maal'],
            [
                'name' => 'Menu Baitul Maal',
                'title' => json_encode(['id' => 'Program Baitul Maal', 'en' => 'Baitul Maal Programs']),
                'items' => json_encode([
                    ['label' => ['id' => 'Pusat Jajanan Selama Ramadhan', 'en' => 'Ramadhan Snack Center'], 'url' => '/pusat-jajanan-selama-ramadhan'],
                    ['label' => ['id' => 'Bahagia 1000 Yatim dan Dhuafa', 'en' => 'Happiness for 1000 Orphans & Underprivileged'], 'url' => '/bahagia-1000-yatim-dan-dhuafa'],
                    ['label' => ['id' => 'Peduli Bencana', 'en' => 'Disaster Care'], 'url' => '/peduli-bencana'],
                    ['label' => ['id' => 'Peduli Sosial Keagamaan', 'en' => 'Social & Religious Care'], 'url' => '/peduli-sosial-keagamaan'],
                    ['label' => ['id' => 'Peduli Yatim dan Dhuafa', 'en' => 'Orphan & Underprivileged Care'], 'url' => '/peduli-yatim-dan-dhuafa'],
                    ['label' => ['id' => 'Bedah Rumah Bahagia', 'en' => 'Happy Home Renovation'], 'url' => '/bedah-rumah-bahagia'],
                    ['label' => ['id' => 'Program Pemberdayaan Ekonomi', 'en' => 'Economic Empowerment Program'], 'url' => '/program-pemberdayaan-dhuafa'],
                    ['label' => ['id' => 'ZISWAF', 'en' => 'ZISWAF'], 'url' => '/ziswaf'],
                    ['label' => ['id' => 'Beasiswa Ustadz dan Ustadzah', 'en' => 'Ustadz & Ustadzah Scholarship'], 'url' => '/beasiswa-ustadz'],
                    ['label' => ['id' => 'Cinta Masjid', 'en' => 'Masjid Love'], 'url' => '/cinta-masjid'],
                    ['label' => ['id' => 'Jumat Berkah', 'en' => 'Blessed Friday'], 'url' => '/jumat-berkah'],
                    ['label' => ['id' => 'TPQ-Ku', 'en' => 'TPQ-Ku'], 'url' => '/tpq-ku'],
                    ['label' => ['id' => 'Prog. Pengembangan Amil dan Nadzir', 'en' => 'Amil & Nadzir Development Program'], 'url' => '/prog-pengembangan-pembinaan-amil-nadzir'],
                    ['label' => ['id' => "Wakaf Mukena dan Al-Qur'an", 'en' => "Mukena & Al-Qur'an Waqf"], 'url' => '/wakaf-mukena-al-quran'],
                    ['label' => ['id' => 'Bina Siswa Cerdas', 'en' => 'Smart Student Development'], 'url' => '/program-bina-siswa-cerdas'],
                    ['label' => ['id' => 'Be-aktriyo', 'en' => 'Be-aktriyo'], 'url' => '/program-be-aktriyo'],
                    ['label' => ['id' => 'Membangun Keluarga Utama (MKU)', 'en' => 'Building Prime Families (MKU)'], 'url' => '/program-membangun-keluarga-utama-mku'],
                    ['label' => ['id' => 'Peduli Kesehatan', 'en' => 'Health Care'], 'url' => '/program-peduli-kesehatan'],
                    ['label' => ['id' => 'World Sight Day / Desama', 'en' => 'World Sight Day / Desama'], 'url' => '/program-world-sight-day-desama'],
                    ['label' => ['id' => 'Qurban On Tamzis', 'en' => 'Qurban On Tamzis'], 'url' => '/qurban-tamzis'],
                    ['label' => ['id' => 'Khitan Ceria', 'en' => 'Joyful Circumcision'], 'url' => '/program-khitan-ceria'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    public function down(): void
    {
        DB::table('sidebar_menus')->where('group_key', 'baitul-maal')->delete();
    }
};
