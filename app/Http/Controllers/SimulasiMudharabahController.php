<?php

namespace App\Http\Controllers;

use App\Services\SimulasiApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SimulasiMudharabahController extends Controller
{
    // ─── Constants ───────────────────────────────────────────────
    private const DEFAULT_JANGKA_WAKTU = 4;

    private const DEFAULT_POLAAANGSUR = 'H';

    private const DEFAULT_NISBAH = 35;

    private const MIN_JANGKA_WAKTU = 1;

    private const MAX_JANGKA_WAKTU = 12;

    private const MIN_NISBAH = 10;

    private const MAX_NISBAH = 40;

    private const MIN_PLAFOND = 500000;

    private const MAX_PLAFOND = 1000000000;

    // HIM = Hasil Investasi Murni per hari (0.625%)
    private const HIM = 0.625;

    // Jumlah hari kerja per bulan
    private const JUMLAH_HARI = 20;

    // Pola angsuran
    private const POLA = [
        'H' => ['nama' => 'HARIAN', 'hari' => 1],
        'P' => ['nama' => 'PASARAN', 'hari' => 4],
        'M' => ['nama' => 'MINGGUAN', 'hari' => 5],
        'B' => ['nama' => 'BULANAN', 'hari' => 20],
    ];

    // ─── Entry Point ────────────────────────────────────────────
    public function index(Request $request)
    {
        return $this->handle($request);
    }

    // ─── Main Handler ───────────────────────────────────────────
    private function handle(Request $request)
    {
        $plafond = $request->query('plafond');
        if (! isset($plafond) || $plafond === '') {
            return response()->json([
                'status' => false,
                'status_code' => 11,
                'message' => 'Parameter wajib tidak lengkap: plafond.',
            ], 400);
        }

        $service = new SimulasiApiService;
        $response = $service->get('/api/v1/simulasi/mudharabah', $request->query());

        if (! is_array($response)) {
            return response()->json([
                'status' => false,
                'status_code' => 502,
                'message' => 'Server simulasi mengembalikan response yang tidak valid.',
            ], 502);
        }

        if (isset($response['status_code'])) {
            $httpCode = match ($response['status_code']) {
                11, 12 => 400,
                13, 14, 15 => 401,
                default => ($response['status'] ?? false) ? 200 : 502,
            };
        } else {
            $httpCode = ($response['status'] ?? false) ? 200 : 502;
        }

        return response()->json($response, $httpCode);
    }

    // ─── Validation ─────────────────────────────────────────────
    private function validateParams(Request $request)
    {
        $plafond = $request->query('plafond');
        $jangkaWaktu = $request->query('jangkaWaktu');
        $polaAngsur = $request->query('polaAngsur');
        $nisbah = $request->query('nisbah');

        // plafond — WAJIB
        if (! isset($plafond) || $plafond === '') {
            return $this->errorResponse(11, 'Parameter wajib tidak lengkap: plafond.');
        }
        if (! is_numeric($plafond)) {
            return $this->errorResponse(12, 'plafond harus berupa angka.');
        }
        if (strpos($plafond, '.') !== false || strpos($plafond, ',') !== false) {
            return $this->errorResponse(12, 'plafond tidak boleh berupa bilangan pecahan.');
        }
        $pVal = (int) $plafond;
        if ($pVal < self::MIN_PLAFOND || $pVal > self::MAX_PLAFOND) {
            return $this->errorResponse(12, 'plafond harus berada di antara '.number_format(self::MIN_PLAFOND).' hingga '.number_format(self::MAX_PLAFOND).'.');
        }

        // jangkaWaktu — opsional
        if (isset($jangkaWaktu) && $jangkaWaktu !== '') {
            if (! is_numeric($jangkaWaktu)) {
                return $this->errorResponse(12, 'jangkaWaktu harus berupa angka.');
            }
            if (strpos((string) $jangkaWaktu, '.') !== false || strpos((string) $jangkaWaktu, ',') !== false) {
                return $this->errorResponse(12, 'jangkaWaktu tidak boleh berupa bilangan pecahan.');
            }
            $jwVal = (int) $jangkaWaktu;
            if ($jwVal < self::MIN_JANGKA_WAKTU || $jwVal > self::MAX_JANGKA_WAKTU) {
                return $this->errorResponse(12, 'jangkaWaktu harus berada di antara '.self::MIN_JANGKA_WAKTU.' hingga '.self::MAX_JANGKA_WAKTU.' bulan.');
            }
        }

        // polaAngsur — opsional
        if (isset($polaAngsur) && $polaAngsur !== '') {
            if (! in_array(strtoupper($polaAngsur), ['H', 'P', 'M', 'B'])) {
                return $this->errorResponse(12, 'polaAngsur harus salah satu dari: H (Harian), P (Pasaran), M (Mingguan), B (Bulanan).');
            }
        }

        // nisbah — opsional
        if (isset($nisbah) && $nisbah !== '') {
            if (! is_numeric($nisbah)) {
                return $this->errorResponse(12, 'nisbah harus berupa angka.');
            }
            $nVal = (float) $nisbah;
            if ($nVal < self::MIN_NISBAH || $nVal > self::MAX_NISBAH) {
                return $this->errorResponse(12, 'nisbah harus berada di antara '.self::MIN_NISBAH.' hingga '.self::MAX_NISBAH.' persen.');
            }
        }

        return null;
    }

    // ─── Mudharabah Calculation ──────────────────────────────────
    private function calculateMudharabah(int $plafond, int $jangkaWaktu, string $polaAngsur, float $nisbah): array
    {
        $nisbahTamzis = $nisbah;
        $nisbahAnggota = 100 - $nisbahTamzis;
        $pola = self::POLA[$polaAngsur] ?? self::POLA['H'];
        $hariPerPola = $pola['hari'];

        // Angsuran pokok per bulan (flat)
        $angsuranPokokPerBulan = $plafond / $jangkaWaktu;

        $data = [];
        for ($bulan = 1; $bulan <= $jangkaWaktu; $bulan++) {
            $saldoPokokAwal = $plafond - ($angsuranPokokPerBulan * ($bulan - 1));

            // Proyeksi bagi hasil per hari
            $proyeksiPerHari = $saldoPokokAwal * self::HIM / 100;
            $bagiHasilPerHari = $proyeksiPerHari * $nisbahAnggota / 100;

            // Bagi hasil per bulan (20 hari kerja)
            $bagiHasilPerBulan = $bagiHasilPerHari * self::JUMLAH_HARI;

            // Titipan per pola
            $titipanPokok = $angsuranPokokPerBulan / self::JUMLAH_HARI * $hariPerPola;
            $titipanBagiHasil = $bagiHasilPerHari * $hariPerPola;
            $titipanTotal = $titipanPokok + $titipanBagiHasil;

            // Sisa saldo pokok setelah bulan ini
            $saldoPokokAkhir = $plafond - ($angsuranPokokPerBulan * $bulan);

            $data[] = [
                'bulan_ke' => $bulan,
                'angsuran_per_bulan' => [
                    'pokok' => (int) $angsuranPokokPerBulan,
                    'bagi_hasil' => (int) round($bagiHasilPerBulan),
                    'total' => (int) round($angsuranPokokPerBulan + $bagiHasilPerBulan),
                ],
                'titipan' => [
                    'pokok' => (int) round($titipanPokok),
                    'bagi_hasil' => (int) round($titipanBagiHasil),
                    'total' => (int) round($titipanTotal),
                ],
                'saldo_pokok' => (int) max(0, round($saldoPokokAkhir)),
            ];
        }

        return [
            'plafond' => $plafond,
            'jangka_waktu' => $jangkaWaktu,
            'nisbah_tamzis' => $nisbahTamzis,
            'nisbah_anggota' => $nisbahAnggota,
            'pola_angsur' => $pola['nama'],
            'data' => $data,
        ];
    }

    // ─── Helpers ────────────────────────────────────────────────
    private function errorResponse(int $code, string $message): JsonResponse
    {
        return response()->json([
            'status' => false,
            'status_code' => $code,
            'message' => $message,
        ], $code >= 13 ? 401 : 400);
    }
}
