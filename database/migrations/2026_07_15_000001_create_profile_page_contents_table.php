<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->unique(); // company-profile, legalitas, dll.
            $table->json('data'); // Konten override: { id: {...}, en: {...}, images: {...} }
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_page_contents');
    }
};
