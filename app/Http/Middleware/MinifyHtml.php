<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class MinifyHtml
{
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Hanya terapkan pada response HTML
        if ($response->headers->get('Content-Type') && strpos($response->headers->get('Content-Type'), 'text/html') !== false) {
            $buffer = $response->getContent();

            // 1. Lindungi tag yang isinya sensitif terhadap spasi/enter
            // Kita juga lindungi <script> agar tidak rusak logikanya (karena Vite dev server)
            $placeholders = [];
            $buffer = preg_replace_callback('/<(textarea|pre|script|style)[^>]*>.*?<\/\\1>/is', function ($matches) use (&$placeholders) {
                $id = '###PROTECTED_BLOCK_'.count($placeholders).'###';
                $placeholders[$id] = $matches[0];

                return $id;
            }, $buffer);

            // 2. Hapus komentar HTML
            $buffer = preg_replace('/<!--(.*?)-->/is', '', $buffer);

            // 3. Minify sisa HTML (tag-tag HTML) agar memanjang ke kanan
            $buffer = str_replace(["\r\n", "\r", "\n", "\t"], ' ', $buffer);
            $buffer = preg_replace('/\s+/', ' ', $buffer);
            $buffer = preg_replace('/>\s+</', '><', $buffer);

            // 4. Kembalikan tag yang dilindungi
            foreach ($placeholders as $id => $content) {
                $buffer = str_replace($id, $content, $buffer);
            }

            $response->setContent(trim($buffer));
        }

        return $response;
    }
}
