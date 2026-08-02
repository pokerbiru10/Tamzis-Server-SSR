<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('sidebar_menus')->updateOrInsert(
            ['group_key' => 'berita'],
            [
                'name' => 'Menu Berita',
                'title' => json_encode(['id' => 'Berita', 'en' => 'News']),
                'items' => json_encode([
                    ['label' => ['id' => 'Semua Berita', 'en' => 'All News'], 'url' => '/berita'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    public function down(): void
    {
        DB::table('sidebar_menus')->where('group_key', 'berita')->delete();
    }
};
