<?php

namespace App\Http\Controllers;

use App\Models\InstagramFeed;
use App\Models\JobVacancy;
use App\Models\SimulasiSimpanan;
use App\Models\User;
use App\Models\Visitor;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalSimulasi = SimulasiSimpanan::count();
        $simulasiHariIni = SimulasiSimpanan::whereDate('created_at', today())->count();
        $totalBerita = InstagramFeed::where('is_published', true)->count();
        $totalKarir = JobVacancy::count();

        // Visitor stats (based on device_id = lebih akurat)
        $totalPengunjung = Visitor::whereNotNull('device_id')->distinct('device_id')->count('device_id');
        $pengunjungHariIni = Visitor::where('visit_date', today())->whereNotNull('device_id')->distinct('device_id')->count('device_id');
        $pengunjungBulanIni = Visitor::whereMonth('visit_date', now()->month)
            ->whereYear('visit_date', now()->year)
            ->whereNotNull('device_id')
            ->distinct('device_id')
            ->count('device_id');

        $simulasiSimpanans = SimulasiSimpanan::latest()->take(10)->get();

        return Inertia::render('dashboard', [
            'simulasiSimpanans' => $simulasiSimpanans,
            'totalUsers' => $totalUsers,
            'totalSimulasi' => $totalSimulasi,
            'simulasiHariIni' => $simulasiHariIni,
            'totalBerita' => $totalBerita,
            'totalKarir' => $totalKarir,
            'totalPengunjung' => $totalPengunjung,
            'pengunjungHariIni' => $pengunjungHariIni,
            'pengunjungBulanIni' => $pengunjungBulanIni,
        ]);
    }

    public function simulasi($jenis)
    {
        $simulasiSimpanans = SimulasiSimpanan::where('jenis_simulasi', $jenis)->latest()->get();

        return Inertia::render('dashboard/simulasi', [
            'simulasiSimpanans' => $simulasiSimpanans,
            'jenis' => $jenis,
        ]);
    }
}
