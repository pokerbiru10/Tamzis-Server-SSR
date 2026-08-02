<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();

        DB::table('home_sections')->insert([
            'key' => 'featured',
            'data' => json_encode([
                'id' => [
                    'badge' => 'Produk Unggulan',
                    'title' => 'Layanan Keuangan Syariah Terbaik',
                    'description' => 'Solusi finansial yang lengkap, aman, dan berkah untuk mendukung kebutuhan ekonomi Anda.',
                    'readMore' => 'Selengkapnya',
                    'categories' => [
                        [
                            'name' => 'Simpanan',
                            'products' => [
                                ['title' => 'Simpanan Mutiara', 'href' => '/simpanan-mutiara', 'desc' => 'Simpanan harian wadiah.', 'tag' => 'Simpanan'],
                                ['title' => 'Simpanan Pendidikan', 'href' => '/simpanan-pendidikan', 'desc' => 'Simpanan terencana pendidikan.', 'tag' => 'Simpanan'],
                                ['title' => 'Simpanan Ijabah', 'href' => '/simpanan-ijabah', 'desc' => 'Simpanan impian masa depan.', 'tag' => 'Investasi'],
                                ['title' => 'Simpanan Mudharabah', 'href' => '/simulasi-mudharabah', 'desc' => 'Simpanan bagi hasil syariah.', 'tag' => 'Simpanan'],
                            ],
                        ],
                        [
                            'name' => 'Pembiayaan',
                            'products' => [
                                ['title' => 'Modal Usaha', 'href' => '/ikhtiar-utama', 'desc' => 'Pendanaan modal kerja produktif.', 'tag' => 'Pembiayaan'],
                                ['title' => 'Griya Tumbuh Bahagia', 'href' => '/rumah-tumbuh-bahagia', 'desc' => 'Pembiayaan kepemilikan rumah syariah yang ringan dan terencana.', 'tag' => 'GTB'],
                                ['title' => 'Murabahah', 'href' => '/murabahah', 'desc' => 'Pembiayaan jual beli syariah.', 'tag' => 'Pembiayaan'],
                                ['title' => 'Kafalah', 'href' => '/kafalah', 'desc' => 'Jaminan pembiayaan yang amanah.', 'tag' => 'Pembiayaan'],
                            ],
                        ],
                        [
                            'name' => 'M-TAMZIS',
                            'products' => [
                                ['title' => 'Transfer Antar Anggota & Perbankan', 'href' => '/layanan-digital', 'desc' => 'Transfer dana antar anggota TAMZIS dan melalui jaringan perbankan nasional.', 'tag' => 'Transfer'],
                                ['title' => 'Saldo Real-time', 'href' => '/layanan-digital', 'desc' => 'Pantau saldo pembiayaan dan simpanan Anda secara real-time 24/7.', 'tag' => 'Real-time'],
                                ['title' => 'Pulsa & Pembayaran PDAM', 'href' => '/layanan-digital', 'desc' => 'Pembelian pulsa, token listrik, dan pembayaran tagihan PDAM dalam satu aplikasi.', 'tag' => 'PPOB'],
                                ['title' => 'Setor ZIS & Sedekah', 'href' => '/layanan-digital', 'desc' => 'Tunaikan zakat, infaq, dan sedekah langsung dari aplikasi dengan mudah.', 'tag' => 'ZIS'],
                            ],
                        ],
                    ],
                ],
                'en' => [
                    'badge' => 'Featured Products',
                    'title' => 'Best Sharia Financial Services',
                    'description' => 'Complete, safe, and blessed financial solutions to support your economic needs.',
                    'readMore' => 'Read More',
                    'categories' => [
                        [
                            'name' => 'Savings',
                            'products' => [
                                ['title' => 'Savings Mutiara', 'href' => '/simpanan-mutiara', 'desc' => 'Daily wadiah savings.', 'tag' => 'Savings'],
                                ['title' => 'Education Savings', 'href' => '/simpanan-pendidikan', 'desc' => 'Planned education savings.', 'tag' => 'Savings'],
                                ['title' => 'Ijabah Savings', 'href' => '/simpanan-ijabah', 'desc' => 'Future dream savings.', 'tag' => 'Investment'],
                                ['title' => 'Mudharabah Savings', 'href' => '/simulasi-mudharabah', 'desc' => 'Sharia profit sharing savings.', 'tag' => 'Savings'],
                            ],
                        ],
                        [
                            'name' => 'Financing',
                            'products' => [
                                ['title' => 'Business Capital', 'href' => '/ikhtiar-utama', 'desc' => 'Productive working capital funding.', 'tag' => 'Financing'],
                                ['title' => 'Griya Tumbuh Bahagia', 'href' => '/rumah-tumbuh-bahagia', 'desc' => 'Light and planned sharia homeownership financing.', 'tag' => 'GTB'],
                                ['title' => 'Murabahah', 'href' => '/murabahah', 'desc' => 'Sharia trade-based financing.', 'tag' => 'Financing'],
                                ['title' => 'Kafalah', 'href' => '/kafalah', 'desc' => 'Trustworthy financing guarantee.', 'tag' => 'Financing'],
                            ],
                        ],
                        [
                            'name' => 'M-TAMZIS',
                            'products' => [
                                ['title' => 'Member & Bank Transfer', 'href' => '/layanan-digital', 'desc' => 'Transfer funds between TAMZIS members and through national banking networks.', 'tag' => 'Transfer'],
                                ['title' => 'Real-time Balance', 'href' => '/layanan-digital', 'desc' => 'Monitor your financing and savings balances in real-time 24/7.', 'tag' => 'Real-time'],
                                ['title' => 'Credit & Bill Payment', 'href' => '/layanan-digital', 'desc' => 'Buy phone credit, electricity tokens, and pay water bills in one app.', 'tag' => 'PPOB'],
                                ['title' => 'ZIS & Charity', 'href' => '/layanan-digital', 'desc' => 'Pay zakat, infaq, and charity directly from the app with ease.', 'tag' => 'ZIS'],
                            ],
                        ],
                    ],
                ],
            ]),
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }

    public function down(): void
    {
        DB::table('home_sections')->where('key', 'featured')->delete();
    }
};
