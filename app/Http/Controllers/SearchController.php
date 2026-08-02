<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    public function index(): JsonResponse
    {
        $locale = request()->query('locale', 'id');
        $isEn = $locale === 'en';

        $items = [
            // Menu Utama
            ['label' => $isEn ? 'Home' : 'Beranda', 'href' => '/', 'category' => $isEn ? 'Main Menu' : 'Menu Utama'],

            // Profil
            ['label' => $isEn ? 'Company Profile' : 'Profil Perusahaan', 'href' => '/company-profile', 'category' => $isEn ? 'About Us' : 'Tentang Kami'],
            ['label' => $isEn ? 'Vision and Mission' : 'Visi dan Misi', 'href' => '/visi-misi', 'category' => $isEn ? 'About Us' : 'Tentang Kami'],
            ['label' => $isEn ? 'Corporate Culture' : 'Budaya Perusahaan', 'href' => '/corporate-culture', 'category' => $isEn ? 'About Us' : 'Tentang Kami'],
            ['label' => $isEn ? 'Awards' : 'Penghargaan', 'href' => '/penghargaan', 'category' => $isEn ? 'About Us' : 'Tentang Kami'],
            ['label' => $isEn ? 'Office Address' : 'Alamat Kantor', 'href' => '/kantor-layanan', 'category' => $isEn ? 'About Us' : 'Tentang Kami'],

            // Simpanan
            ['label' => $isEn ? 'Mutiara Savings' : 'Simpanan Mutiara', 'href' => '/simpanan-mutiara', 'category' => $isEn ? 'Saving Products' : 'Produk Simpanan'],
            ['label' => $isEn ? 'Education Savings' : 'Simpanan Pendidikan', 'href' => '/simpanan-pendidikan', 'category' => $isEn ? 'Saving Products' : 'Produk Simpanan'],
            ['label' => $isEn ? 'Ijabah Savings' : 'Simpanan Ijabah', 'href' => '/simpanan-ijabah', 'category' => $isEn ? 'Saving Products' : 'Produk Simpanan'],
            ['label' => $isEn ? 'Mudharabah Savings' : 'Simpanan Mudharabah', 'href' => '/simpanan-mudharabah', 'category' => $isEn ? 'Saving Products' : 'Produk Simpanan'],
            ['label' => $isEn ? 'Time Deposit' : 'Simpanan Berjangka', 'href' => '/simpanan-berjangka', 'category' => $isEn ? 'Saving Products' : 'Produk Simpanan'],

            // Pembiayaan
            ['label' => $isEn ? 'Mudharabah (Business Capital)' : 'Mudharabah (Modal Usaha)', 'href' => '/ikhtiar-utama', 'category' => $isEn ? 'Financing Products' : 'Produk Pembiayaan'],
            ['label' => $isEn ? 'Murabahah (Buying & Selling)' : 'Murabahah (Jual Beli)', 'href' => '/murabahah', 'category' => $isEn ? 'Financing Products' : 'Produk Pembiayaan'],
            ['label' => $isEn ? 'Kafalah (Guarantee)' : 'Kafalah (Penjaminan)', 'href' => '/kafalah', 'category' => $isEn ? 'Financing Products' : 'Produk Pembiayaan'],
            ['label' => $isEn ? 'Griya Tumbuh Bahagia' : 'Griya Tumbuh Bahagia', 'href' => '/rumah-tumbuh-bahagia', 'category' => $isEn ? 'Financing Products' : 'Produk Pembiayaan'],

            // ZISWAF
            ['label' => $isEn ? 'Zakat' : 'Zakat', 'href' => '/ziswaf#zakat', 'category' => 'ZISWAF'],
            ['label' => $isEn ? 'Infaq' : 'Infaq', 'href' => '/ziswaf#infaq', 'category' => 'ZISWAF'],
            ['label' => $isEn ? 'Sadaqah' : 'Sadaqah', 'href' => '/ziswaf#sadaqah', 'category' => 'ZISWAF'],
            ['label' => $isEn ? 'Wakaf' : 'Wakaf', 'href' => '/ziswaf#wakaf', 'category' => 'ZISWAF'],

            // Baitul Maal Programs
            ['label' => $isEn ? 'Bedah Rumah Bahagia' : 'Bedah Rumah Bahagia', 'href' => '/bedah-rumah-bahagia', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'TPQ-Ku' : 'TPQ-Ku', 'href' => '/tpq-ku', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Be-aktriyo' : 'Be-aktriyo', 'href' => '/program-be-aktriyo', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'MKU' : 'MKU', 'href' => '/program-membangun-keluarga-utama-mku', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'World Sight Day' : 'World Sight Day', 'href' => '/program-world-sight-day-desama', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Smart Students' : 'Bina Siswa Cerdas', 'href' => '/program-bina-siswa-cerdas', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Empowerment' : 'Pemberdayaan Dhuafa', 'href' => '/program-pemberdayaan-dhuafa', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Amil Nadzir Development' : 'Pengembangan Pembinaan Amil Nadzir', 'href' => '/prog-pengembangan-pembinaan-amil-nadzir', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Happy 1000 Orphans' : 'Bahagia 1000 Yatim dan Dhuafa', 'href' => '/bahagia-1000-yatim-dan-dhuafa', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Orphans & Dhuafa Care' : 'Peduli Yatim dan Dhuafa', 'href' => '/peduli-yatim-dan-dhuafa', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Disaster Relief' : 'Peduli Bencana', 'href' => '/peduli-bencana', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Social & Religious Care' : 'Peduli Sosial Keagamaan', 'href' => '/peduli-sosial-keagamaan', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Mosque Love' : 'Cinta Masjid', 'href' => '/cinta-masjid', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Friday Blessing' : 'Jumat Berkah', 'href' => '/jumat-berkah', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Ramadhan Center' : 'Pusat Jajanan Selama Ramadhan', 'href' => '/pusat-jajanan-selama-ramadhan', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Qurban' : 'Qurban TAMZIS', 'href' => '/qurban-tamzis', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Wakaf Mukena & Quran' : 'Wakaf Mukena Al-Quran', 'href' => '/wakaf-mukena-al-quran', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],
            ['label' => $isEn ? 'Khitan Ceria' : 'Program Khitan Ceria', 'href' => '/program-khitan-ceria', 'category' => $isEn ? 'Baitul Maal Programs' : 'Program Baitul Maal'],

            // Simulasi
            ['label' => $isEn ? 'Mudharabah Simulation' : 'Simulasi Mudharabah', 'href' => '/simulasi-mudharabah', 'category' => $isEn ? 'Simulation' : 'Simulasi'],
            ['label' => $isEn ? 'Murabahah Simulation' : 'Simulasi Murabahah', 'href' => '/simulasi-murabahah', 'category' => $isEn ? 'Simulation' : 'Simulasi'],
            ['label' => $isEn ? 'GTB Simulation' : 'Simulasi GTB', 'href' => '/simulasi-gtb', 'category' => $isEn ? 'Simulation' : 'Simulasi'],
            ['label' => $isEn ? 'Financing Simulation' : 'Simulasi Pembiayaan', 'href' => '/simulasi-pembiayaan', 'category' => $isEn ? 'Simulation' : 'Simulasi'],
            ['label' => $isEn ? 'Hajj Simulation' : 'Simulasi Haji', 'href' => '/simulasi-haji', 'category' => $isEn ? 'Simulation' : 'Simulasi'],
            ['label' => $isEn ? 'Kafalah Simulation' : 'Simulasi Kafalah', 'href' => '/simulasi-kafalah', 'category' => $isEn ? 'Simulation' : 'Simulasi'],

            // Layanan Digital
            ['label' => $isEn ? 'M-TAMZIS' : 'M-TAMZIS', 'href' => '/layanan-digital', 'category' => $isEn ? 'Digital Services' : 'Layanan Digital'],

            // Others
            ['label' => $isEn ? 'Hajj Portion' : 'Porsi Haji', 'href' => '/porsi-haji', 'category' => $isEn ? 'Others' : 'Lainnya'],
            ['label' => $isEn ? 'Beasiswa Ustadz' : 'Beasiswa Ustadz', 'href' => '/beasiswa-ustadz', 'category' => $isEn ? 'Others' : 'Lainnya'],
            ['label' => $isEn ? 'Career' : 'Karir', 'href' => '/info-karir', 'category' => $isEn ? 'Others' : 'Lainnya'],
            ['label' => $isEn ? 'News' : 'Berita', 'href' => '/berita', 'category' => $isEn ? 'Others' : 'Lainnya'],
        ];

        // Add active job vacancies
        $vacancies = JobVacancy::where('is_active', true)
            ->latest()
            ->limit(10)
            ->get(['id', 'title']);

        foreach ($vacancies as $vacancy) {
            $items[] = [
                'label' => $vacancy->title,
                'href' => '/info-karir',
                'category' => $isEn ? 'Career' : 'Karir',
            ];
        }

        return response()->json(['items' => $items]);
    }
}
