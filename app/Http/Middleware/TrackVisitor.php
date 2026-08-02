<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitor
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('GET') && ! $request->ajax() && ! $request->expectsJson()) {
            // Gunakan cookie untuk identifikasi perangkat unik
            $deviceId = $request->cookie('visitor_device_id');

            if (! $deviceId) {
                $deviceId = (string) Str::uuid();
                // Set cookie berlaku 1 tahun
                cookie()->queue('visitor_device_id', $deviceId, 60 * 24 * 365);
            }

            $ip = $request->ip();
            $today = now()->toDateString();

            // Cek berdasarkan device_id (lebih akurat dari IP saja)
            $existing = Visitor::where('device_id', $deviceId)
                ->where('visit_date', $today)
                ->exists();

            if (! $existing) {
                Visitor::create([
                    'device_id' => $deviceId,
                    'ip_address' => $ip,
                    'user_agent' => $request->userAgent(),
                    'page_url' => $request->path(),
                    'visited_at' => now(),
                    'visit_date' => $today,
                ]);
            }
        }

        return $next($request);
    }
}
