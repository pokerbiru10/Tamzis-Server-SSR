<?php

namespace App\Console\Commands;

use App\Services\ImageOptimizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class OptimizeImages extends Command
{
    protected $signature = 'images:optimize {--force : Proses ulang gambar yang sudah punya file .webp}';

    protected $description = 'Konversi semua gambar di public/uploads menjadi WebP (file .webp pendamping, path asli tetap)';

    public function handle(): int
    {
        if (! extension_loaded('gd')) {
            $this->error('Ekstensi GD tidak tersedia.');

            return self::FAILURE;
        }

        $dirs = [
            public_path('uploads/images'),
            public_path('uploads/image'),
        ];

        $files = [];
        foreach ($dirs as $dir) {
            if (is_dir($dir)) {
                $files = array_merge($files, File::allFiles($dir));
            }
        }

        if (count($files) === 0) {
            $this->info('Tidak ada file di public/uploads.');

            return self::SUCCESS;
        }

        $maxWidth = (int) $this->ask('Max width (px)? [1920]', 1920);
        $quality = (int) $this->ask('Kualitas WebP (1-100)? [80]', 80);

        $converted = 0;
        $skipped = 0;
        $failed = 0;

        $bar = $this->output->createProgressBar(count($files));
        $bar->start();

        foreach ($files as $file) {
            $path = $file->getPathname();
            $ext = strtolower($file->getExtension());

            if (! in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
                $bar->advance();
                continue;
            }

            $webpPath = dirname($path).DIRECTORY_SEPARATOR.$file->getBasename('.'.$ext).'.webp';

            if (! $this->option('force') && file_exists($webpPath) && filemtime($webpPath) >= filemtime($path)) {
                $skipped++;
                $bar->advance();
                continue;
            }

            $result = ImageOptimizer::optimize($path, $maxWidth, $quality);

            if ($result) {
                $converted++;
            } else {
                $failed++;
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("Selesai: {$converted} dikonversi, {$skipped} sudah ada, {$failed} gagal.");

        return self::SUCCESS;
    }
}
