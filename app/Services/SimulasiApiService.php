<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class SimulasiApiService
{
    private string $secret;

    private string $baseUrl;

    public function __construct()
    {
        $this->secret = config('services.tamzis.hmac_secret', '');
        $this->baseUrl = config('services.tamzis.api_url', 'http://103.52.147.11:10505');
    }

    public function get(string $path, array $params = []): array
    {
        $isProxy = str_contains($this->baseUrl, 'netlify.app');

        if ($isProxy) {
            return $this->getViaProxy($path, $params);
        }

        return $this->getDirect($path, $params);
    }

    private function getViaProxy(string $path, array $params = []): array
    {
        $proxyUrl = rtrim($this->baseUrl, '/').$path;

        try {
            $response = Http::timeout(30)->get($proxyUrl, $params);

            $json = $response->json();

            if ($json === null) {
                Log::error('SimulasiApiService: Invalid JSON from proxy', [
                    'path' => $path,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return [
                    'status' => false,
                    'status_code' => 502,
                    'message' => 'Server simulasi mengembalikan response yang tidak valid.',
                ];
            }

            return $json;
        } catch (ConnectionException $e) {
            Log::error('SimulasiApiService: Proxy connection failed', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => false,
                'status_code' => 502,
                'message' => 'Gagal menghubungi server simulasi.',
            ];
        } catch (Throwable $e) {
            Log::error('SimulasiApiService: Unexpected error via proxy', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => false,
                'status_code' => 500,
                'message' => 'Terjadi kesalahan saat menghubungi server simulasi.',
            ];
        }
    }

    private function getDirect(string $path, array $params = []): array
    {
        $queryString = http_build_query($params);
        $timestamp = (string) time();
        $message = "GET:{$path}:{$queryString}:{$timestamp}";
        $signature = hash_hmac('sha256', $message, $this->secret);

        try {
            $response = Http::withHeaders([
                'X-Timestamp' => $timestamp,
                'X-Signature' => $signature,
            ])->timeout(30)->get("{$this->baseUrl}{$path}", $params);

            $json = $response->json();

            if ($json === null) {
                Log::error('SimulasiApiService: Invalid JSON response', [
                    'path' => $path,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return [
                    'status' => false,
                    'status_code' => 502,
                    'message' => 'Server simulasi mengembalikan response yang tidak valid.',
                ];
            }

            return $json;
        } catch (ConnectionException $e) {
            Log::error('SimulasiApiService: Connection failed', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => false,
                'status_code' => 502,
                'message' => 'Gagal menghubungi server simulasi.',
            ];
        } catch (Throwable $e) {
            Log::error('SimulasiApiService: Unexpected error', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => false,
                'status_code' => 500,
                'message' => 'Terjadi kesalahan saat menghubungi server simulasi.',
            ];
        }
    }
}
