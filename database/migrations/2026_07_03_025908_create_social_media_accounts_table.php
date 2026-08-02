<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_media_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // Nama sosmed, e.g. Instagram
            $table->string('icon');           // Nama icon Font Awesome / slug, e.g. instagram
            $table->string('url');            // Link URL akun
            $table->string('button_color')->default('#000000'); // Warna tombol hex
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_media_accounts');
    }
};
