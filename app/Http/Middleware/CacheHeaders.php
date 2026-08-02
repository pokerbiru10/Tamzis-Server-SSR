<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheHeaders
{
    /**
     * Add cache control headers for better performance.
     * Static assets (CSS/JS) are already cached by Vite's hashed filenames.
     * This handles HTML pages with short cache + revalidation.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Skip if not HTML response or if user is authenticated
        if ($request->user() || ! $this->isHtmlResponse($response)) {
            return $response;
        }

        // Page content depends on the session locale, so the browser must
        // revalidate on every visit instead of serving a shared cached copy.
        $response->headers->set('Cache-Control', 'private, no-cache');
        $response->headers->set('Vary', 'Accept, X-Inertia, Cookie');

        return $response;
    }

    private function isHtmlResponse(Response $response): bool
    {
        $contentType = $response->headers->get('Content-Type', '');

        return str_contains($contentType, 'text/html');
    }
}
