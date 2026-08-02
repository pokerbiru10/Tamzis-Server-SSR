<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_sections', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('data');
            $table->timestamps();
        });

        $now = now();

        DB::table('home_sections')->insert([
            [
                'key' => 'stats',
                'data' => json_encode([
                    'id' => [
                        ['value' => 33, 'suffix' => '+', 'label' => 'Tahun Pengalaman'],
                        ['value' => 50, 'suffix' => '+', 'label' => 'Kantor Cabang'],
                        ['value' => 200000, 'suffix' => 'K+', 'label' => 'Anggota Aktif'],
                        ['value' => 100, 'suffix' => '%', 'label' => 'Berbasis Syariah'],
                    ],
                    'en' => [
                        ['value' => 33, 'suffix' => '+', 'label' => 'Years Experience'],
                        ['value' => 50, 'suffix' => '+', 'label' => 'Branch Offices'],
                        ['value' => 200000, 'suffix' => 'K+', 'label' => 'Active Members'],
                        ['value' => 100, 'suffix' => '%', 'label' => 'Sharia Based'],
                    ],
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'why',
                'data' => json_encode([
                    'id' => [
                        'title' => 'Kepercayaan Lebih dari Tiga Dekade',
                        'description' => 'TAMZIS Bina Utama hadir sejak 1992, melayani anggota dengan keuangan syariah yang transparan, amanah, dan memberdayakan.',
                        'reasons' => [
                            ['title' => 'Pengawasan Resmi', 'description' => 'Diawasi Kementerian Koperasi RI'],
                            ['title' => 'Fatwa Syariah', 'description' => 'Seluruh produk diawasi DSN-MUI'],
                            ['title' => 'Prinsip Amanah', 'description' => 'Diawasi Pengawas Syariah'],
                            ['title' => 'Jaringan Luas', 'description' => 'Memiliki lebih dari 50 kantor layanan nasional'],
                        ],
                    ],
                    'en' => [
                        'title' => 'Trust for Over Three Decades',
                        'description' => 'TAMZIS Bina Utama has been present since 1992, serving the community with transparent, trustworthy, and empowering sharia finance.',
                        'reasons' => [
                            ['title' => 'Official Oversight', 'description' => 'Supervised by Ministry of Cooperatives RI'],
                            ['title' => 'Sharia Fatwa', 'description' => 'All products supervised by DSN-MUI'],
                            ['title' => 'Trustworthy Principles', 'description' => 'Supervised by Sharia Supervisors'],
                            ['title' => 'Wide Network', 'description' => 'Has more than 50 national service offices'],
                        ],
                    ],
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('home_sections');
    }
};
