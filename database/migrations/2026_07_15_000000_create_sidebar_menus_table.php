<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sidebar_menus', function (Blueprint $table) {
            $table->id();
            $table->string('group_key')->unique();
            $table->string('name'); // Nama grup untuk ditampilkan di dashboard
            $table->json('title'); // Judul kotak menu per bahasa: { id, en }
            $table->json('items'); // Daftar link: [{ label: { id, en }, url }]
            $table->timestamps();
        });

        // Seed menu sidebar halaman profil sesuai data hardcoded sebelumnya.
        DB::table('sidebar_menus')->insert([
            'group_key' => 'profil',
            'name' => 'Menu Profil',
            'title' => json_encode(['id' => 'Profil Kami', 'en' => 'Our Profile']),
            'items' => json_encode([
                ['label' => ['id' => 'Profil Perusahaan', 'en' => 'Company Profile'], 'url' => '/company-profile'],
                ['label' => ['id' => 'Legalitas', 'en' => 'Legality'], 'url' => '/legalitas'],
                ['label' => ['id' => 'Misi dan Visi', 'en' => 'Mission and Vision'], 'url' => '/visi-misi'],
                ['label' => ['id' => 'Budaya Perusahaan', 'en' => 'Corporate Culture'], 'url' => '/corporate-culture'],
                ['label' => ['id' => 'Penghargaan', 'en' => 'Awards'], 'url' => '/penghargaan'],
                ['label' => ['id' => 'Alamat Kantor', 'en' => 'Office Address'], 'url' => '/kantor-layanan'],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('sidebar_menus');
    }
};
