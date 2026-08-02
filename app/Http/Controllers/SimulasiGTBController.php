<?php

namespace App\Http\Controllers;

use App\Services\SimulasiApiService;
use Illuminate\Http\Request;

class SimulasiGTBController extends Controller
{
    public function anuitas(Request $request)
    {
        return $this->handle($request, 'anuitas');
    }

    public function flat(Request $request)
    {
        return $this->handle($request, 'flat');
    }

    private function handle(Request $request, string $method)
    {
        $hargaObjek = $request->query('hargaObjek');
        if (! isset($hargaObjek) || $hargaObjek === '') {
            return response()->json([
                'status' => false,
                'status_code' => 11,
                'message' => 'Parameter wajib tidak lengkap: hargaObjek.',
            ], 400);
        }

        $service = new SimulasiApiService;
        $response = $service->get("/api/v1/simulasi/gtb/{$method}", $request->query());

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
}
