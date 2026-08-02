<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ProfilePageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BaitulMaalController extends Controller
{
    private function renderPage(string $title, string $slug, string $routeName)
    {
        $savedContent = ProfilePageContent::where('page_key', $slug)->first();

        return Inertia::render('dashboard/baitul-maal/Page', [
            'title' => $title,
            'pageKey' => $slug,
            'pageSlug' => $slug,
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => '/dashboard'],
                ['title' => 'Baitul Maal', 'href' => '#'],
                ['title' => $title, 'href' => route($routeName)],
            ],
            'savedContent' => $savedContent?->data,
        ]);
    }

    public function save(Request $request, string $pageKey)
    {
        $request->validate([
            'data' => 'required|array',
            'data.id' => 'required|array',
            'data.en' => 'required|array',
        ]);

        ProfilePageContent::updateOrCreate(
            ['page_key' => $pageKey],
            ['data' => $request->input('data')],
        );

        return back()->with('success', 'Konten berhasil disimpan!');
    }

    public function pusatJajananRamadhan()
    {
        return $this->renderPage('Pusat Jajanan Selama Ramadhan', 'pusat-jajanan-ramadhan', 'dashboard.baitul-maal.pusat-jajanan-ramadhan');
    }

    public function bahagia1000YatimDhuafa()
    {
        return $this->renderPage('Bahagia 1000 Yatim dan Dhuafa', 'bahagia-1000-yatim-dhuafa', 'dashboard.baitul-maal.bahagia-1000-yatim-dhuafa');
    }

    public function peduliBencana()
    {
        return $this->renderPage('Peduli Bencana', 'peduli-bencana', 'dashboard.baitul-maal.peduli-bencana');
    }

    public function peduliSosialKeagamaan()
    {
        return $this->renderPage('Peduli Sosial Keagamaan', 'peduli-sosial-keagamaan', 'dashboard.baitul-maal.peduli-sosial-keagamaan');
    }

    public function peduliYatimDhuafa()
    {
        return $this->renderPage('Peduli Yatim dan Dhuafa', 'peduli-yatim-dhuafa', 'dashboard.baitul-maal.peduli-yatim-dhuafa');
    }

    public function bedahRumahBahagia()
    {
        return $this->renderPage('Bedah Rumah Bahagia', 'bedah-rumah-bahagia', 'dashboard.baitul-maal.bedah-rumah-bahagia');
    }

    public function pemberdayaanEkonomi()
    {
        return $this->renderPage('Program Pemberdayaan Ekonomi', 'pemberdayaan-ekonomi', 'dashboard.baitul-maal.pemberdayaan-ekonomi');
    }

    public function berbasisMasjidAlquran()
    {
        return $this->renderPage('Program Berbasis Masjid dan Al Quran', 'berbasis-masjid-alquran', 'dashboard.baitul-maal.berbasis-masjid-alquran');
    }

    public function beasiswaUstadz()
    {
        return $this->renderPage('Beasiswa Ustadz dan Ustadzah', 'beasiswa-ustadz', 'dashboard.baitul-maal.beasiswa-ustadz');
    }

    public function cintaMasjid()
    {
        return $this->renderPage('Cinta Masjid', 'cinta-masjid', 'dashboard.baitul-maal.cinta-masjid');
    }

    public function jumatBerkah()
    {
        return $this->renderPage('Jumat Berkah', 'jumat-berkah', 'dashboard.baitul-maal.jumat-berkah');
    }

    public function tpqKu()
    {
        return $this->renderPage('TPQ-Ku', 'tpq-ku', 'dashboard.baitul-maal.tpq-ku');
    }

    public function pengembanganAmilNadzir()
    {
        return $this->renderPage('Prog. Pengembangan dan Pembinaan Amil dan Nadzir', 'pengembangan-amil-nadzir', 'dashboard.baitul-maal.pengembangan-amil-nadzir');
    }

    public function wakafMukenaAlquran()
    {
        return $this->renderPage('Wakaf Mukena dan Al-Qur\'an', 'wakaf-mukena-alquran', 'dashboard.baitul-maal.wakaf-mukena-alquran');
    }

    public function berbasisMku()
    {
        return $this->renderPage('Program Berbasis Membangun Keluarga Utama', 'berbasis-mku', 'dashboard.baitul-maal.berbasis-mku');
    }

    public function binaSiswaCerdas()
    {
        return $this->renderPage('Bina Siswa Cerdas', 'bina-siswa-cerdas', 'dashboard.baitul-maal.bina-siswa-cerdas');
    }

    public function beAktriyo()
    {
        return $this->renderPage('Be-aktriyo', 'be-aktriyo', 'dashboard.baitul-maal.be-aktriyo');
    }

    public function mku()
    {
        return $this->renderPage('Membangun Keluarga Utama (Mku)', 'mku', 'dashboard.baitul-maal.mku');
    }

    public function peduliKesehatan()
    {
        return $this->renderPage('Peduli Kesehatan', 'peduli-kesehatan', 'dashboard.baitul-maal.peduli-kesehatan');
    }

    public function worldSightDay()
    {
        return $this->renderPage('World Sight Day / Desama', 'world-sight-day', 'dashboard.baitul-maal.world-sight-day');
    }

    public function qurban()
    {
        return $this->renderPage('Qurban On Tamzis', 'qurban', 'dashboard.baitul-maal.qurban');
    }

    public function khitanCeria()
    {
        return $this->renderPage('Khitan Ceria', 'khitan-ceria', 'dashboard.baitul-maal.khitan-ceria');
    }
}
