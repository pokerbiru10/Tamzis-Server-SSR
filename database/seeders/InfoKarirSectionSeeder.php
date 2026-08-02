<?php

namespace Database\Seeders;

use App\Models\InfoKarirSection;
use Illuminate\Database\Seeder;

class InfoKarirSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            'header' => [
                'id' => [
                    'title' => 'Portal Karir - TAMZIS',
                    'subtitle' => 'Gerbang Masa Depan',
                    'background_image' => '/assets/img/header/karir.jpg',
                ],
                'en' => [
                    'title' => 'Career Portal - TAMZIS',
                    'subtitle' => 'Gateway to Future',
                    'background_image' => '/assets/img/header/karir.jpg',
                ],
            ],
            'informasi' => [
                'id' => [
                    'title' => 'Bertumbuh Bersama Nilai, Berkarya untuk Memberi Manfaat',
                    'description' => 'Di TAMZIS, kami percaya bahwa keberhasilan organisasi lahir dari insan-insan yang terus bertumbuh. Oleh karena itu, kami membangun lingkungan kerja yang selaras dengan visi dan misi perusahaan untuk menghadirkan manfaat yang lebih luas bagi anggota, masyarakat, dan seluruh pemangku kepentingan.

Budaya kerja LIFE—Learning, Integrity, Friendliness, dan Endurance—menjadi fondasi dalam setiap langkah kami. Kami mendorong setiap insan TAMZIS untuk terus belajar, menjunjung tinggi integritas, membangun hubungan yang dilandasi kepedulian, serta memiliki ketangguhan dalam menghadapi perubahan dan tantangan.

Kami meyakini bahwa pengembangan karyawan adalah investasi jangka panjang. Melalui berbagai program pembelajaran, pengembangan kompetensi, pendampingan, serta kesempatan untuk terus berkarya, setiap karyawan memiliki ruang untuk meningkatkan kemampuan diri, mengembangkan potensi, dan mempersiapkan diri menjadi pemimpin masa depan.

Di TAMZIS, karier bukan hanya tentang mencapai target, tetapi juga tentang menjalankan amanah dengan penuh tanggung jawab, bertumbuh bersama nilai-nilai perusahaan, dan memberikan kontribusi nyata bagi kemajuan organisasi serta kebermanfaatan bagi sesama.',
                    'button_text' => 'Lihat Lowongan',
                    'values' => [
                        ['title' => 'Integritas', 'desc' => 'Menjunjung tinggi kejujuran dan etika kerja Islami.'],
                        ['title' => 'Profesional', 'desc' => 'Memberikan layanan terbaik dengan kompetensi tinggi.'],
                        ['title' => 'Inovatif', 'desc' => 'Terus berkembang mengikuti kemajuan teknologi.'],
                    ],
                ],
                'en' => [
                    'title' => 'Building the Future with TAMZIS',
                    'description' => 'Join the KSPPS Tamzis Bina Utama big family and be part of the journey towards a strong sharia economy.',
                    'button_text' => 'View Vacancies',
                    'values' => [
                        ['title' => 'Integrity', 'desc' => 'Upholding honesty and Islamic work ethics.'],
                        ['title' => 'Professional', 'desc' => 'Providing the best service with high competence.'],
                        ['title' => 'Innovative', 'desc' => 'Continuously developing following technological progress.'],
                    ],
                ],
            ],
            'hrd' => [
                'id' => [
                    'title' => 'Kegiatan HRD & Pengembangan',
                    'description' => 'TAMZIS berkomitmen untuk terus meningkatkan kapasitas dan kapabilitas setiap insan TAMZIS melalui berbagai program pelatihan berkelanjutan.',
                    'programs' => [
                        ['title' => 'Pelatihan Basic Syariah', 'desc' => 'Pembekalan dasar-dasar ekonomi syariah dan muamalah untuk karyawan baru.'],
                        ['title' => 'Leadership Development', 'desc' => 'Program pengembangan kepemimpinan untuk mencetak kader manajerial masa depan.'],
                        ['title' => 'Service Excellence', 'desc' => 'Pelatihan rutin untuk menjaga standar pelayanan prima kepada anggota.'],
                    ],
                ],
                'en' => [
                    'title' => 'HRD & Development Activities',
                    'description' => 'TAMZIS is committed to continuously improving the capacity and capability of every TAMZIS member through various sustainable training programs.',
                    'programs' => [
                        ['title' => 'Basic Sharia Training', 'desc' => 'Equipping new employees with the basics of sharia economics and muamalah.'],
                        ['title' => 'Leadership Development', 'desc' => 'Leadership development program to create future managerial cadres.'],
                        ['title' => 'Service Excellence', 'desc' => 'Routine training to maintain excellent service standards for members.'],
                    ],
                ],
            ],
            'lowongan' => [
                'id' => [
                    'title' => 'Lowongan Aktif',
                    'description' => 'Temukan peluang karir terbaik Anda di TAMZIS Bina Utama.',
                    'empty_text' => 'Belum ada lowongan yang tersedia saat ini.',
                    'apply_button' => 'Lamar Sekarang',
                ],
                'en' => [
                    'title' => 'Active Vacancies',
                    'description' => 'Find your best career opportunity at TAMZIS Bina Utama.',
                    'empty_text' => 'No vacancies available at the moment.',
                    'apply_button' => 'Apply Now',
                ],
            ],
            'contact' => [
                'id' => [
                    'title' => 'Contact Center',
                    'description' => 'Punya pertanyaan tentang karir atau layanan kami? Tim Contact Center siap membantu Anda melalui berbagai saluran komunikasi di bawah ini.',
                    'email' => 'info@tamzis.id',
                    'phone' => '0811-261-3134',
                    'whatsapp' => '0811 2700 9068',
                    'whatsapp_label' => 'Wa CS HRD',
                    'office_label' => 'Kantor Terdekat',
                ],
                'en' => [
                    'title' => 'Contact Center',
                    'description' => 'Have questions about careers or our services? The Contact Center team is ready to assist you through the communication channels below.',
                    'email' => 'info@tamzis.id',
                    'phone' => '0811-261-3134',
                    'whatsapp' => '0811 2700 9068',
                    'whatsapp_label' => 'Wa CS HRD',
                    'office_label' => 'Nearest Office',
                ],
            ],
            'sidebar' => [
                'id' => [
                    'header' => 'Menu Karir',
                    'items' => [
                        ['id' => 'Informasi', 'label' => 'Informasi Karir'],
                        ['id' => 'HRD', 'label' => 'Kegiatan SDI'],
                        ['id' => 'Contact', 'label' => 'Hubungi Kami'],
                    ],
                ],
                'en' => [
                    'header' => 'Career Menu',
                    'items' => [
                        ['id' => 'Informasi', 'label' => 'Career Information'],
                        ['id' => 'HRD', 'label' => 'HRD Activities'],
                        ['id' => 'Contact', 'label' => 'Contact Center'],
                    ],
                ],
            ],
        ];

        foreach ($sections as $key => $data) {
            InfoKarirSection::updateOrCreate(
                ['key' => $key],
                ['data' => $data]
            );
        }
    }
}
