<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Seed menu sidebar halaman simpanan sesuai data hardcoded sebelumnya.
        DB::table('sidebar_menus')->updateOrInsert(
            ['group_key' => 'simpanan'],
            [
                'name' => 'Menu Simpanan',
                'title' => json_encode(['id' => 'Produk Simpanan', 'en' => 'Savings Products']),
                'items' => json_encode([
                    ['label' => ['id' => 'Simpanan Mutiara', 'en' => 'Mutiara Savings'], 'url' => '/simpanan-mutiara'],
                    ['label' => ['id' => 'Simpanan Pendidikan', 'en' => 'Education Savings'], 'url' => '/simpanan-pendidikan'],
                    ['label' => ['id' => 'Simpanan Ijabah', 'en' => 'Ijabah Savings'], 'url' => '/simpanan-ijabah'],
                    ['label' => ['id' => 'Simpanan Mudharabah', 'en' => 'Mudharabah Savings'], 'url' => '/simpanan-mudharabah'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    public function down(): void
    {
        DB::table('sidebar_menus')->where('group_key', 'simpanan')->delete();
    }
};
