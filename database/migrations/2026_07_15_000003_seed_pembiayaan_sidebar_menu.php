<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Seed menu sidebar halaman produk pembiayaan.
        DB::table('sidebar_menus')->updateOrInsert(
            ['group_key' => 'pembiayaan'],
            [
                'name' => 'Menu Pembiayaan',
                'title' => json_encode(['id' => 'Produk Pembiayaan', 'en' => 'Financing Products']),
                'items' => json_encode([
                    ['label' => ['id' => 'Mudharabah (Modal Usaha)', 'en' => 'Mudharabah (Business Capital)'], 'url' => '/ikhtiar-utama'],
                    ['label' => ['id' => 'Murabahah (Jual Beli)', 'en' => 'Murabahah (Buying & Selling)'], 'url' => '/murabahah'],
                    ['label' => ['id' => 'Kafalah (Sosial)', 'en' => 'Kafalah (Social)'], 'url' => '/kafalah'],
                    ['label' => ['id' => 'Porsi Haji', 'en' => 'Hajj Portion'], 'url' => '/porsi-haji'],
                    ['label' => ['id' => 'Griya Tumbuh Bahagia', 'en' => 'Griya Tumbuh Bahagia'], 'url' => '/rumah-tumbuh-bahagia'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    public function down(): void
    {
        DB::table('sidebar_menus')->where('group_key', 'pembiayaan')->delete();
    }
};
