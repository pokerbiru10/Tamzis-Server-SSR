<?php

namespace App\Http\Controllers;

use App\Services\SimulasiApiService;
use Illuminate\Http\Request;

class SimulasiHajiController extends Controller
{
    public function index(Request $request)
    {
        $service = new SimulasiApiService;
        $response = $service->get('/api/v1/simulasi/haji', $request->query());

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
