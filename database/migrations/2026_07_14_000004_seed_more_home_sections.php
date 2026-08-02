<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();

        DB::table('home_sections')->insert([
            [
                'key' => 'standards',
                'data' => json_encode([
                    'id' => [
                        'title' => 'Standar Layanan Kami',
                        'subtitle' => 'Komitmen TAMZIS untuk menghadirkan pengalaman terbaik bagi setiap anggota di era digital.',
                        'items' => [
                            ['title' => 'Profesional', 'desc' => 'Dikelola oleh tenaga ahli yang kompeten dan berintegritas tinggi.'],
                            ['title' => 'Modern & Interaktif', 'desc' => 'Menghadirkan fitur-fitur terkini yang memudahkan interaksi Anda.'],
                            ['title' => 'User Friendly', 'desc' => 'Antarmuka yang intuitif dan mudah digunakan oleh semua kalangan.'],
                            ['title' => 'Branding & Kepercayaan', 'desc' => 'Memperkuat citra lembaga sebagai mitra finansial syariah terpercaya.'],
                            ['title' => 'Layanan Digital', 'desc' => 'Mendukung pemasaran produk dan layanan melalui ekosistem digital.'],
                        ],
                    ],
                    'en' => [
                        'title' => 'Our Service Standards',
                        'subtitle' => 'TAMZIS commitment to providing the best experience for every member in the digital era.',
                        'items' => [
                            ['title' => 'Professional', 'desc' => 'Managed by competent experts with high integrity.'],
                            ['title' => 'Modern & Interactive', 'desc' => 'Bringing the latest features that ease your interaction.'],
                            ['title' => 'User Friendly', 'desc' => 'Intuitive interface that is easy to use for everyone.'],
                            ['title' => 'Branding & Trust', 'desc' => "Strengthening the institution's image as a trusted sharia financial partner."],
                            ['title' => 'Digital Services', 'desc' => 'Supporting product and service marketing through a digital ecosystem.'],
                        ],
                    ],
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'choices',
                'data' => json_encode([
                    'id' => [
                        'badge' => 'Pilihan Produk',
                        'title' => 'Simpanan & Pembiayaan Terbaik',
                        'description' => 'Temukan produk yang paling sesuai untuk kebutuhan finansial Anda bersama TAMZIS.',
                        'readMore' => 'Selengkapnya',
                        'cards' => [
                            ['title' => 'Simpanan Mudharabah', 'description' => 'Investasi syariah jangka panjang dengan bagi hasil kompetitif untuk masa depan yang lebih tenang.', 'href' => '/simpanan-mudharabah', 'tag' => 'Investasi'],
                            ['title' => 'Simpanan Pendidikan', 'description' => 'Rencanakan masa depan pendidikan buah hati Anda dengan simpanan syariah yang terencana dan aman.', 'href' => '/simpanan-mutiara', 'tag' => 'Pendidikan'],
                            ['title' => 'Griya Tumbuh Bahagia', 'description' => 'Wujudkan rumah impian dengan pembiayaan syariah yang ringan, terencana, dan penuh berkah.', 'href' => '/rumah-tumbuh-bahagia', 'tag' => 'Pembiayaan'],
                        ],
                    ],
                    'en' => [
                        'badge' => 'Product Choices',
                        'title' => 'Best Savings & Financing',
                        'description' => 'Find the products that best suit your financial needs with TAMZIS.',
                        'readMore' => 'Read More',
                        'cards' => [
                            ['title' => 'Mudharabah Savings', 'description' => 'Long-term sharia investment with competitive profit sharing for a more peaceful future.', 'href' => '/simpanan-mudharabah', 'tag' => 'Investment'],
                            ['title' => 'Education Savings', 'description' => "Plan your child's educational future with planned and secure sharia savings.", 'href' => '/simpanan-mutiara', 'tag' => 'Education'],
                            ['title' => 'Griya Tumbuh Bahagia', 'description' => 'Realize your dream home with light, planned, and blessed sharia financing.', 'href' => '/rumah-tumbuh-bahagia', 'tag' => 'Financing'],
                        ],
                    ],
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'baitulmaal',
                'data' => json_encode([
                    'id' => [
                        'badge' => 'Baitul Maal',
                        'title' => 'Program Sosial & Keagamaan',
                        'description' => 'TAMZIS hadir tidak hanya sebagai lembaga keuangan, tetapi juga sebagai mitra sosial yang memberdayakan umat.',
                        'showMore' => 'Lihat Semua',
                    ],
                    'en' => [
                        'badge' => 'Baitul Maal',
                        'title' => 'Social & Religious Programs',
                        'description' => 'TAMZIS exists not only as a financial institution but also as a social partner that empowers the community.',
                        'showMore' => 'See All',
                    ],
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'highlights',
                'data' => json_encode([
                    'id' => [
                        'badge' => 'Tamzis Highlight',
                        'title' => 'Berita & Kegiatan Terkini',
                        'viewAll' => 'Lihat semua',
                    ],
                    'en' => [
                        'badge' => 'Tamzis Highlight',
                        'title' => 'Latest News & Activities',
                        'viewAll' => 'View all',
                    ],
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }

    public function down(): void
    {
        DB::table('home_sections')->whereIn('key', ['standards', 'choices', 'baitulmaal', 'highlights'])->delete();
    }
};
