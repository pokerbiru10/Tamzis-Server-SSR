<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class IjabahRateController extends Controller
{
    public function index()
    {
        $secret = config('services.tamzis.hmac_secret');
        $baseUrl = config('services.tamzis.api_url');
        $path = '/api/v1/ijabah-rate';
        $method = 'GET';
        $params = '';
        $timestamp = (string) time();

        $message = "{$method}:{$path}:{$params}:{$timestamp}";
        $signature = hash_hmac('sha256', $message, $secret);

        try {
            $response = Http::withHeaders([
                'X-Timestamp' => $timestamp,
                'X-Signature' => $signature,
            ])->get($baseUrl.$path);

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data imbal hasil Ijabah.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
