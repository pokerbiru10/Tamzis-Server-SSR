<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('sidebar_menus')->updateOrInsert(
            ['group_key' => 'layanan-digital'],
            [
                'name' => 'Menu Layanan Digital',
                'title' => json_encode(['id' => 'Layanan Digital', 'en' => 'Digital Services']),
                'items' => json_encode([
                    ['label' => ['id' => 'M-TAMZIS', 'en' => 'M-TAMZIS'], 'url' => '/layanan-digital'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    public function down(): void
    {
        DB::table('sidebar_menus')->where('group_key', 'layanan-digital')->delete();
    }
};
