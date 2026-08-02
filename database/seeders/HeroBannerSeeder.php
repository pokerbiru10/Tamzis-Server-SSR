<?php

namespace Database\Seeders;

use App\Models\HeroBanner;
use App\Services\ImageOptimizer;
use Illuminate\Database\Seeder;

class HeroBannerSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'title' => 'Solusi Keuangan Syariah Terpercaya',
                'description' => 'TAMZIS adalah solusi keuangan syariah terpercaya untuk Simpanan, pembiayaan dan pemberdayaan umat, telah berpengalaman lebih dari 3 dekade.',
                'button_text' => 'Profil Perusahaan',
                'button_url' => '/company-profile',
                'order' => 1,
            ],
            [
                'title' => 'Layanan Finansial Terbaik',
                'description' => 'Temukan berbagai produk simpanan dan pembiayaan unggulan yang dirancang untuk keberkahan ekonomi Anda.',
                'button_text' => 'Lihat Produk',
                'button_url' => '#produk',
                'order' => 2,
            ],
            [
                'title' => 'Simpanan Berkah & Amanah',
                'description' => 'Wujudkan impian keluarga Anda dengan beragam pilihan simpanan syariah yang fleksibel dan menguntungkan.',
                'button_text' => 'Simpanan Mutiara',
                'button_url' => '/simpanan-mutiara',
                'order' => 3,
            ],
            [
                'title' => 'Wakaf & ZISWAF untuk Umat',
                'description' => 'Salurkan zakat, infaq, sedekah, dan wakaf Anda melalui TAMZIS untuk kemaslahatan umat.',
                'button_text' => 'Info ZISWAF',
                'button_url' => '/ziswaf',
                'order' => 4,
            ],
        ];

        $uploadDir = public_path('uploads/images/banner/hero-section');
        if (! file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $imageIndex = [1, 3, 2, 4];

        foreach ($slides as $i => $slide) {
            $ext = 'jpg';
            $srcPath = public_path('assets/img/slider/'.$imageIndex[$i].'.'.$ext);
            if (! file_exists($srcPath)) {
                $srcPath = public_path('assets/img/slider/'.$imageIndex[$i].'.png');
                $ext = 'png';
            }
            if (! file_exists($srcPath)) {
                continue;
            }

            $filename = 'seed_'.$imageIndex[$i].'_'.uniqid().'.'.$ext;
            $destPath = $uploadDir.'/'.$filename;
            copy($srcPath, $destPath);

            ImageOptimizer::optimize($destPath, 1920, 80);

            HeroBanner::create([
                'title' => $slide['title'],
                'description' => $slide['description'],
                'button_text' => $slide['button_text'],
                'button_url' => $slide['button_url'],
                'image_path' => 'uploads/images/banner/hero-section/'.$filename,
                'page_slug' => 'homepage',
                'is_active' => true,
                'order' => $slide['order'],
            ]);
        }

        $this->command->info('Hero banners seeded successfully!');
    }
}
