<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Pastikan response memiliki header sebelum di set (untuk menghindari error pada response biner/download)
        if (method_exists($response, 'headers')) {
            // Mencegah website di-embed di iframe website lain (Clickjacking)
            $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
            
            // Memaksa browser mematuhi MIME type (mencegah file gambar dieksekusi sebagai script/PHP)
            $response->headers->set('X-Content-Type-Options', 'nosniff');
            
            // Perlindungan dasar XSS (Cross-Site Scripting)
            $response->headers->set('X-XSS-Protection', '1; mode=block');
            
            // Referrer policy untuk keamanan pertukaran data antar domain
            $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
            
            // HSTS (HTTP Strict Transport Security) - memaksa HTTPS
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
            
            // Membatasi akses fitur perangkat keras (Kamera, Mic, Lokasi) jika website disisipi kode jahat
            $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        }

        return $response;
    }
}
