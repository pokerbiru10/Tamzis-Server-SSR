<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>404 - Halaman Tidak Ditemukan | TAMZIS</title>
        <link rel="icon" href="/images/logo/fav-tamzis-1.png" type="image/png">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
            }
            .container {
                text-align: center;
                padding: 2rem;
                max-width: 500px;
            }
            .logo {
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
            }
            .code {
                font-size: 8rem;
                font-weight: 900;
                color: #065f46;
                line-height: 1;
                opacity: 0.15;
            }
            .title {
                font-size: 1.5rem;
                font-weight: 700;
                color: #065f46;
                margin: -1rem 0 0.75rem;
            }
            .desc {
                font-size: 1rem;
                color: #6b7280;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            .btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.875rem 2rem;
                background-color: #059669;
                color: #fff;
                font-size: 0.95rem;
                font-weight: 600;
                border-radius: 0.75rem;
                text-decoration: none;
                transition: all 0.2s;
                box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3);
            }
            .btn:hover {
                background-color: #047857;
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
            }
            .btn svg {
                width: 18px;
                height: 18px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="/images/logo/fav-tamzis-1.png" alt="TAMZIS" class="logo">
            <div class="code">404</div>
            <h1 class="title">Halaman Tidak Ditemukan</h1>
            <p class="desc">Sepertinya halaman yang kamu cari sudah dipindahkan, dihapus, atau belum tersedia.</p>
            <a href="/" class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Kembali ke Beranda
            </a>
        </div>
    </body>
</html>
