<?php

namespace App\Http\Controllers;

use App\Services\SimulasiApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SimulasiMurobahahController extends Controller
{
    private const DEFAULT_JANGKA_WAKTU = 4;

    private const DEFAULT_MARGIN_PER_BULAN = 1.8;

    private const DEFAULT_UANG_MUKA = 0;

    private const DEFAULT_POLA_ANGSUR = 'B';

    private const MIN_JANGKA_WAKTU = 1;

    private const MAX_JANGKA_WAKTU = 12;

    private const MIN_MARGIN = 0.3;

    private const MAX_MARGIN = 10;

    private const MIN_UANG_MUKA = 0;

    private const MAX_UANG_MUKA = 500000000;

    private const MIN_HARGA_BELI = 100000;

    private const MAX_HARGA_BELI = 1000000000;

    private const POLA = [
        'H' => 'HARIAN',
        'P' => 'PASARAN',
        'M' => 'MINGGUAN',
        'B' => 'BULANAN',
    ];

    public function index(Request $request)
    {
        $hargaBeli = $request->query('hargaBeli');
        if (! isset($hargaBeli) || $hargaBeli === '') {
            return response()->json([
                'status' => false,
                'status_code' => 11,
                'message' => 'Parameter wajib tidak lengkap: hargaBeli.',
            ], 400);
        }

        $service = new SimulasiApiService;
        $response = $service->get('/api/v1/simulasi/murobahah', $request->query());

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

    private function validateParams(Request $request)
    {
        $hargaBeli = $request->query('hargaBeli');
        $jangkaWaktu = $request->query('jangkaWaktu');
        $uangMuka = $request->query('uangMuka');
        $polaAngsur = $request->query('polaAngsur');
        $marginPerBulan = $request->query('marginPerBulan');

        if (! isset($hargaBeli) || $hargaBeli === '') {
            return $this->errorResponse(11, 'Parameter wajib tidak lengkap: hargaBeli.');
        }
        if (! is_numeric($hargaBeli)) {
            return $this->errorResponse(12, 'hargaBeli harus berupa angka.');
        }
        if (strpos($hargaBeli, '.') !== false || strpos($hargaBeli, ',') !== false) {
            return $this->errorResponse(12, 'hargaBeli tidak boleh berupa bilangan pecahan.');
        }
        $hVal = (int) $hargaBeli;
        if ($hVal < self::MIN_HARGA_BELI || $hVal > self::MAX_HARGA_BELI) {
            return $this->errorResponse(12, 'hargaBeli harus berada di antara '.number_format(self::MIN_HARGA_BELI).' hingga '.number_format(self::MAX_HARGA_BELI).'.');
        }

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

        if (isset($uangMuka) && $uangMuka !== '') {
            if (! is_numeric($uangMuka)) {
                return $this->errorResponse(12, 'uangMuka harus berupa angka.');
            }
            if (strpos((string) $uangMuka, '.') !== false || strpos((string) $uangMuka, ',') !== false) {
                return $this->errorResponse(12, 'uangMuka tidak boleh berupa bilangan pecahan.');
            }
            $umVal = (int) $uangMuka;
            if ($umVal < self::MIN_UANG_MUKA || $umVal > self::MAX_UANG_MUKA) {
                return $this->errorResponse(12, 'uangMuka harus berada di antara '.number_format(self::MIN_UANG_MUKA).' hingga '.number_format(self::MAX_UANG_MUKA).'.');
            }
        }

        if (isset($polaAngsur) && $polaAngsur !== '') {
            if (! in_array(strtoupper($polaAngsur), ['H', 'P', 'M', 'B'])) {
                return $this->errorResponse(12, 'polaAngsur harus salah satu dari: H (Harian), P (Pasaran), M (Mingguan), B (Bulanan).');
            }
        }

        if (isset($marginPerBulan) && $marginPerBulan !== '') {
            if (! is_numeric($marginPerBulan)) {
                return $this->errorResponse(12, 'marginPerBulan harus berupa angka.');
            }
            $mVal = (float) $marginPerBulan;
            if ($mVal < self::MIN_MARGIN || $mVal > self::MAX_MARGIN) {
                return $this->errorResponse(12, 'marginPerBulan harus berada di antara '.self::MIN_MARGIN.' hingga '.self::MAX_MARGIN.' persen.');
            }
        }

        return null;
    }

    private function calculate(int $hargaBeli, int $jangkaWaktu, int $uangMuka, string $polaAngsur, float $marginPerBulan): array
    {
        // Formula Murobahah: margin flat
        // marginPerBulanNominal = hargaBeli × marginPerBulan / 100
        // marginTotal = marginPerBulanNominal × jangkaWaktu
        $marginPerBulanNominal = $hargaBeli * $marginPerBulan / 100;
        $marginTotal = $marginPerBulanNominal * $jangkaWaktu;

        // Harga
        $hargaJual = $hargaBeli + $marginTotal;
        $hargaAngsur = $hargaJual - $uangMuka;

        // Angsuran flat per bulan
        // angsuranPokok = (hargaAngsur - marginTotal) / jangkaWaktu
        // angsuranMargin = marginTotal / jangkaWaktu
        $angsuranPokok = ($hargaAngsur - $marginTotal) / $jangkaWaktu;
        $angsuranMargin = $marginTotal / $jangkaWaktu;
        $angsuranTotal = $angsuranPokok + $angsuranMargin;

        $data = [];
        $saldoPokok = $hargaAngsur - $marginTotal;
        $saldoMargin = $marginTotal;

        for ($i = 1; $i <= $jangkaWaktu; $i++) {
            $data[] = [
                'angsuran_ke' => $i,
                'angsuran' => [
                    'pokok' => (int) $angsuranPokok,
                    'margin' => (int) $angsuranMargin,
                    'total' => (int) $angsuranTotal,
                ],
                'saldo' => [
                    'pokok' => (int) max(0, $saldoPokok - ($angsuranPokok * $i)),
                    'margin' => (int) max(0, $saldoMargin - ($angsuranMargin * $i)),
                    'total' => (int) max(0, $hargaAngsur - ($angsuranTotal * $i)),
                ],
            ];
        }

        return [
            'harga_beli' => $hargaBeli,
            'margin' => (int) $marginTotal,
            'harga_jual' => (int) $hargaJual,
            'uang_muka' => $uangMuka,
            'harga_angsur' => (int) $hargaAngsur,
            'pola_angsur' => self::POLA[$polaAngsur] ?? self::POLA['B'],
            'jangka_waktu' => $jangkaWaktu,
            'data' => $data,
        ];
    }

    private function errorResponse(int $code, string $message, int $httpStatus = 400): JsonResponse
    {
        return response()->json([
            'status' => false,
            'status_code' => $code,
            'message' => $message,
        ], $httpStatus);
    }
}
