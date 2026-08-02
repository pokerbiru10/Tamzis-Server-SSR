<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- DNS prefetch & preconnect for external resources --}}
        <link rel="dns-prefetch" href="https://wa.me">
        <link rel="dns-prefetch" href="https://elfsightcdn.com">
        <link rel="preconnect" href="https://elfsightcdn.com" crossorigin>

        {{-- Light mode only --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }
        </style>

        <link rel="icon" href="/images/logo/fav-tamzis-1.png" type="image/png">
        <?php if(app()->isLocal()): ?>
            <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src * 'self' 'unsafe-inline';">
        <?php endif; ?>

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'TAMZIS Bina Utama') }}</title>
            <meta name="description" content="TAMZIS Bina Utama — lembaga keuangan mikro syariah dengan layanan simpanan, pembiayaan, dan program sosial (Baitul Maal) yang aman, transparan, dan berkah.">
            <link rel="canonical" href="{{ url()->current() }}">
            <meta name="robots" content="index, follow">
            <meta property="og:type" content="website">
            <meta property="og:site_name" content="TAMZIS Bina Utama">
            <meta property="og:title" content="TAMZIS Bina Utama — Keuangan Syariah yang Memberdayakan">
            <meta property="og:description" content="Layanan keuangan syariah yang aman, transparan, dan memberdayakan—untuk keluarga, usaha, dan umat.">
            <meta property="og:url" content="{{ url()->current() }}">
            <meta property="og:image" content="{{ asset('assets/img/logo-remove.webp') }}">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="TAMZIS Bina Utama — Keuangan Syariah yang Memberdayakan">
            <meta name="twitter:description" content="Layanan keuangan syariah yang aman, transparan, dan memberdayakan—untuk keluarga, usaha, dan umat.">
            <meta name="twitter:image" content="{{ asset('assets/img/logo-remove.webp') }}">
            <meta name="theme-color" content="#065f46">
        </x-inertia::head>

        {{-- Structured Data for SEO / Google Search --}}
        <script type="application/ld+json">
            {
                "@@context": "https://schema.org",
                "@type": "Organization",
                "name": "TAMZIS Bina Utama",
                "url": "{{ url('/') }}",
                "logo": "{{ asset('assets/img/logo-remove.webp') }}",
                "description": "Lembaga keuangan mikro syariah dengan layanan simpanan, pembiayaan, dan program sosial yang aman, transparan, dan berkah.",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+62-286-325303",
                    "contactType": "customer service"
                }
            }
        </script>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
