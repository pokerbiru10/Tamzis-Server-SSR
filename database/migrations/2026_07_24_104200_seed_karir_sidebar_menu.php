<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('sidebar_menus')->updateOrInsert(
            ['group_key' => 'karir'],
            [
                'name' => 'Menu Karir',
                'title' => json_encode(['id' => 'Karir', 'en' => 'Career']),
                'items' => json_encode([
                    ['label' => ['id' => 'Info Karir', 'en' => 'Career Info'], 'url' => '/info-karir'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }

    public function down(): void
    {
        DB::table('sidebar_menus')->where('group_key', 'karir')->delete();
    }
};
