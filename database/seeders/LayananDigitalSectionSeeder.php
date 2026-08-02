<?php

namespace Database\Seeders;

use App\Models\LayananDigitalSection;
use Illuminate\Database\Seeder;

class LayananDigitalSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            'header' => [
                'id' => [
                    'badge' => 'Layanan Digital',
                    'title' => 'M-TAMZIS',
                    'subtitle' => 'Aplikasi Mobile untuk Pengelolaan Keuangan Syariah',
                    'background_image' => '/assets/img/header/Cinta-masjid.webp',
                ],
                'en' => [
                    'badge' => 'Digital Services',
                    'title' => 'M-TAMZIS',
                    'subtitle' => 'Mobile App for Sharia Financial Management',
                    'background_image' => '/assets/img/header/Cinta-masjid.webp',
                ],
            ],
            'tentang' => [
                'id' => [
                    'title' => 'Tentang M-Tamzis',
                    'description' => 'M-TAMZIS adalah aplikasi mobile yang dirancang khusus untuk memudahkan Anda dalam mengelola keuangan secara syariah. Dengan teknologi terkini dan antarmuka yang user-friendly, M-TAMZIS membawa solusi perbankan digital yang sesuai dengan nilai-nilai Islam.',
                ],
                'en' => [
                    'title' => 'About M-Tamzis',
                    'description' => 'M-TAMZIS is a mobile application specifically designed to make it easy for you to manage your finances according to sharia principles. With the latest technology and a user-friendly interface, M-TAMZIS brings digital banking solutions that align with Islamic values.',
                ],
            ],
            'fitur' => [
                'id' => [
                    'title' => 'Fitur & Layanan M-Tamzis',
                    'description' => 'M-Tamzis menyediakan berbagai fitur dan layanan untuk memenuhi kebutuhan transaksi keuangan digital Anda:',
                    'items' => [
                        'Cek Saldo & Mutasi Rekening',
                        'Transfer & Pembayaran (PPOB, PLN, PDAM, dll)',
                        'Setoran Simpanan Wajib',
                        'Setor Zakat, Infaq, Sedekah',
                        'Jadwal Shalat & Baca Qur\'an Digital',
                    ],
                ],
                'en' => [
                    'title' => 'Features & Services of M-Tamzis',
                    'description' => 'M-Tamzis provides various features and services to meet your digital financial transaction needs:',
                    'items' => [
                        'Check Balance & Transaction History',
                        'Transfer & Payments (PPOB, PLN, PDAM, etc.)',
                        'Mandatory Savings Deposit',
                        'Zakat, Infaq, Sadaqah Donation',
                        'Prayer Schedule & Digital Qur\'an',
                    ],
                ],
            ],
            'panduan' => [
                'id' => [
                    'title' => 'Panduan & Download',
                    'download_title' => 'Download M-Tamzis Sekarang',
                    'download_description' => 'Dapatkan akses ke semua fitur dan layanan digital TAMZIS dengan mengunduh aplikasi dari Play Store.',
                    'download_play_store' => 'Download di Google Play',
                    'panduan_user_title' => 'Panduan Pengguna',
                    'panduan_steps' => [
                        ['title' => 'Registrasi Akun', 'desc' => 'Buka aplikasi dan pilih menu Registrasi. Isi data diri sesuai dengan data yang terdaftar di TAMZIS.'],
                        ['title' => 'Aktivasi Akun Pertama Kali', 'desc' => 'Verifikasi nomor HP Anda dengan OTP yang telah dikirimkan. Buat PIN keamanan yang kuat.'],
                        ['title' => 'Tips Keamanan Bertransaksi', 'desc' => 'Jangan bagikan PIN, password, dan OTP kepada siapa pun. Gunakan WiFi yang aman saat bertransaksi.'],
                    ],
                ],
                'en' => [
                    'title' => 'Guide & Download',
                    'download_title' => 'Download M-Tamzis Now',
                    'download_description' => 'Get access to all TAMZIS digital features and services by downloading the app from Play Store.',
                    'download_play_store' => 'Download on Google Play',
                    'panduan_user_title' => 'User Guide',
                    'panduan_steps' => [
                        ['title' => 'Account Registration', 'desc' => 'Open the app and select the Registration menu. Fill in your personal data as registered with TAMZIS.'],
                        ['title' => 'First Time Account Activation', 'desc' => 'Verify your phone number with the OTP sent to you. Create a strong security PIN.'],
                        ['title' => 'Transaction Security Tips', 'desc' => 'Do not share your PIN, password, and OTP with anyone. Use a secure WiFi connection when transacting.'],
                    ],
                ],
            ],
            'bantuan' => [
                'id' => [
                    'title' => 'Bantuan & Contact Center',
                    'hubungi_title' => 'Hubungi Tim Kami',
                    'hubungi_desc' => 'Jika Anda memiliki pertanyaan atau mengalami kendala, tim customer service kami siap membantu Anda.',
                    'hubungi_btn' => 'Hubungi: 0286 325303',
                    'download_mtamzis_title' => 'Download M-Tamzis',
                    'download_mtamzis_desc' => 'Dapatkan aplikasi M-Tamzis melalui tautan berikut:',
                    'open_play_store' => 'Buka di Google Play Store',
                    'faq_title' => 'Pertanyaan Umum',
                    'faqs' => [
                        ['q' => 'Apakah M-Tamzis gratis?', 'a' => 'Ya, M-Tamzis dapat diunduh dan digunakan secara gratis untuk semua anggota TAMZIS.'],
                        ['q' => 'Sistem operasi apa yang didukung?', 'a' => 'M-Tamzis tersedia untuk Android. Versi iOS sedang dalam tahap pengembangan.'],
                        ['q' => 'Bagaimana jika lupa PIN?', 'a' => 'Hubungi customer service kami di 0286 325303 untuk membantu reset PIN Anda dengan aman.'],
                    ],
                ],
                'en' => [
                    'title' => 'Help & Contact Center',
                    'hubungi_title' => 'Contact Our Team',
                    'hubungi_desc' => 'If you have questions or experience issues, our customer service team is ready to assist you.',
                    'hubungi_btn' => 'Call: 0286 325303',
                    'download_mtamzis_title' => 'Download M-Tamzis',
                    'download_mtamzis_desc' => 'Get the M-Tamzis app through the following link:',
                    'open_play_store' => 'Open on Google Play Store',
                    'faq_title' => 'Frequently Asked Questions',
                    'faqs' => [
                        ['q' => 'Is M-Tamzis free?', 'a' => 'Yes, M-Tamzis can be downloaded and used for free by all TAMZIS members.'],
                        ['q' => 'What operating systems are supported?', 'a' => 'M-Tamzis is available for Android. The iOS version is currently in development.'],
                        ['q' => 'What if I forget my PIN?', 'a' => 'Contact our customer service at 0286 325303 for a secure PIN reset.'],
                    ],
                ],
            ],
        ];

        foreach ($sections as $key => $data) {
            LayananDigitalSection::updateOrCreate(
                ['key' => $key],
                ['data' => $data]
            );
        }
    }
}
