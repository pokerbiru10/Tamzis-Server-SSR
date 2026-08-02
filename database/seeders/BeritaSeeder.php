<?php

namespace Database\Seeders;

use App\Models\InstagramFeed;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            ['name' => 'Simpanan', 'slug' => 'simpanan'],
            ['name' => 'Pembiayaan', 'slug' => 'pembiayaan'],
            ['name' => 'Kegiatan', 'slug' => 'kegiatan'],
            ['name' => 'ZISWAF', 'slug' => 'ziswaf'],
        ];

        foreach ($tags as $tag) {
            Tag::firstOrCreate($tag);
        }

        $berita = [
            [
                'excerpt' => 'TAMZIS Bina Utama Raih Penghargaan Koperasi Terbaik 2026',
                'caption' => '<p>TAMZIS Bina Utama berhasil meraih penghargaan sebagai Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS) terbaik tahun 2026. Penghargaan ini diberikan atas komitmen TAMZIS dalam memberikan pelayanan keuangan syariah yang transparan, amanah, dan memberdayakan masyarakat.</p><p>Penghargaan diterima langsung oleh Direktur Utama TAMZIS Bina Utama dalam acara puncak yang diselenggarakan di Yogyakarta.</p>',
                'image_path' => 'uploads/image/berita/berita1.jpg',
                'posted_at' => now()->subDays(1),
                'tags' => ['kegiatan'],
            ],
            [
                'excerpt' => 'Program Pembiayaan Modal Usaha Syariah Kini Semakin Mudah',
                'caption' => '<p>TAMZIS Bina Utama menghadirkan kemudahan baru dalam program pembiayaan modal usaha syariah. Kini anggota dapat mengajukan pembiayaan modal usaha dengan proses yang lebih cepat dan persyaratan yang lebih sederhana.</p><p>Program ini ditujukan untuk mendukung perkembangan usaha mikro dan kecil anggota koperasi agar semakin maju dan berkah.</p>',
                'image_path' => 'uploads/image/berita/berita2.jpg',
                'posted_at' => now()->subDays(3),
                'tags' => ['pembiayaan'],
            ],
            [
                'excerpt' => 'Penyaluran ZISWAF TAMZIS Tembus Rp 5 Miliar Sepanjang 2026',
                'caption' => '<p>TAMZIS Bina Utama melalui program ZISWAF (Zakat, Infaq, Sedekah, dan Wakaf) berhasil menyalurkan dana sebesar Rp 5 Miliar kepada masyarakat yang membutuhkan sepanjang tahun 2026.</p><p>Dana tersebut disalurkan dalam bentuk bantuan pendidikan, kesehatan, pemberdayaan ekonomi, dan bantuan sosial lainnya yang tersebar di berbagai daerah di Indonesia.</p>',
                'image_path' => 'uploads/image/berita/berita3.jpg',
                'posted_at' => now()->subDays(7),
                'tags' => ['ziswaf'],
            ],
        ];

        foreach ($berita as $item) {
            $feed = InstagramFeed::create([
                'instagram_id' => 'manual-' . Str::uuid(),
                'caption' => $item['caption'],
                'excerpt' => $item['excerpt'],
                'image_path' => $item['image_path'],
                'permalink' => null,
                'posted_at' => $item['posted_at'],
                'is_published' => true,
            ]);

            foreach ($item['tags'] as $tagSlug) {
                $tag = Tag::where('slug', $tagSlug)->first();
                if ($tag) {
                    $feed->tags()->attach($tag->id);
                }
            }
        }

        $this->command->info('Berita seeded successfully!');
    }
}
