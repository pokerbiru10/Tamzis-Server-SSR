<?php

namespace Database\Seeders;

use App\Models\InstagramFeedDb;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class InstagramFeedDbSeeder extends Seeder
{
    public function run(): void
    {
        // Hapus data lama
        InstagramFeedDb::truncate();

        // Data 4 reels terbaru TAMZIS (contoh data)
        $reelsData = [
            [
                'instagram_id' => '3523456789012345678',
                'caption' => 'Bersinergi dengan Lazismu Banjarnegara Dukung Pembangunan Masjid At-Tanwir Kec Pandanarum Banjarnegara. Sebagai wujud komitmen dalam memperkuat syiar Islam dan pemberdayaan umat, ULAZ MKU TAMZIS',
                'excerpt' => 'Bersinergi dengan Lazismu Banjarnegara Dukung Pembangunan Masjid At-Tanwir...',
                'media_type' => 'REELS',
                'media_url' => 'https://scontent.cdninstagram.com/v/t66.30100-16/123456789_123456789012345_123456789012345678_n.mp4',
                'image_path' => '/assets/img/instagram/reel1.jpg',
                'permalink' => 'https://www.instagram.com/reel/ABC123/',
                'likes_count' => 250,
                'comments_count' => 15,
                'posted_at' => Carbon::now()->subDays(1),
            ],
            [
                'instagram_id' => '3523456789012345679',
                'caption' => 'Kegiatan Edukasi Finansial Syariah untuk UMKM bersama TAMZIS. Membangun ekonomi umat melalui literasi keuangan syariah yang tepat sasaran dan berkelanjutan.',
                'excerpt' => 'Kegiatan Edukasi Finansial Syariah untuk UMKM bersama TAMZIS...',
                'media_type' => 'REELS',
                'media_url' => 'https://scontent.cdninstagram.com/v/t66.30100-16/123456789_123456789012345_123456789012345679_n.mp4',
                'image_path' => '/assets/img/instagram/reel2.jpg',
                'permalink' => 'https://www.instagram.com/reel/DEF456/',
                'likes_count' => 180,
                'comments_count' => 12,
                'posted_at' => Carbon::now()->subDays(3),
            ],
            [
                'instagram_id' => '3523456789012345680',
                'caption' => 'Pelatihan Manajemen Keuangan Keluarga Islami. TAMZIS hadir memberikan solusi pengelolaan keuangan keluarga sesuai prinsip syariah untuk kesejahteraan bersama.',
                'excerpt' => 'Pelatihan Manajemen Keuangan Keluarga Islami. TAMZIS hadir memberikan solusi...',
                'media_type' => 'REELS',
                'media_url' => 'https://scontent.cdninstagram.com/v/t66.30100-16/123456789_123456789012345_123456789012345680_n.mp4',
                'image_path' => '/assets/img/instagram/reel3.jpg',
                'permalink' => 'https://www.instagram.com/reel/GHI789/',
                'likes_count' => 320,
                'comments_count' => 28,
                'posted_at' => Carbon::now()->subDays(5),
            ],
            [
                'instagram_id' => '3523456789012345681',
                'caption' => 'Program Baitul Maal TAMZIS: Bantuan Pendidikan untuk Anak Yatim dan Dhuafa. Wujud kepedulian nyata dalam membangun generasi Islam yang berkualitas.',
                'excerpt' => 'Program Baitul Maal TAMZIS: Bantuan Pendidikan untuk Anak Yatim dan Dhuafa...',
                'media_type' => 'REELS',
                'media_url' => 'https://scontent.cdninstagram.com/v/t66.30100-16/123456789_123456789012345_123456789012345681_n.mp4',
                'image_path' => '/assets/img/instagram/reel4.jpg',
                'permalink' => 'https://www.instagram.com/reel/JKL012/',
                'likes_count' => 445,
                'comments_count' => 35,
                'posted_at' => Carbon::now()->subWeek(),
            ],
        ];

        foreach ($reelsData as $data) {
            InstagramFeedDb::create($data);
        }

        $this->command->info('✅ Successfully seeded 4 Instagram reels data to instagram_feed_db table');
    }
}