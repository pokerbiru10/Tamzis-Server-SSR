<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Seed default settings
        DB::table('app_settings')->insert([
            'key' => 'career_link_url',
            'value' => '/info-karir',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('app_settings')->insert([
            'key' => 'layanan_link_url',
            'value' => '/simulasi-gtb',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('app_settings');
    }
};
