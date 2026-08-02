<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class ImageOptimizer
{
    /**
     * Konversi gambar menjadi WebP yang di-resize sebagai file pendamping.
     * File asli tetap dipertahankan (path di database tidak berubah),
     * file ".webp" dengan basename yang sama dibuat di folder yang sama.
     *
     * @return string|null path relatif file webp (dari public), null jika gagal
     */
    public static function optimize(string $absolutePath, int $maxWidth = 1600, int $quality = 80): ?string
    {
        if (! extension_loaded('gd') || ! file_exists($absolutePath)) {
            return null;
        }

        $info = @getimagesize($absolutePath);
        if ($info === false) {
            return null;
        }

        [$width, $height, $type] = $info;

        $image = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($absolutePath),
            IMAGETYPE_PNG => @imagecreatefrompng($absolutePath),
            IMAGETYPE_WEBP => @imagecreatefromwebp($absolutePath),
            default => null,
        };

        if (! $image) {
            return null;
        }

        if (! imageistruecolor($image)) {
            imagepalettetotruecolor($image);
        }

        if ($width > $maxWidth) {
            $newWidth = $maxWidth;
            $newHeight = (int) round($height * $maxWidth / $width);
            $resized = imagecreatetruecolor($newWidth, $newHeight);

            imagealphablending($resized, false);
            imagesavealpha($resized, true);

            imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagedestroy($image);
            $image = $resized;
        }

        $dirname = dirname($absolutePath);
        $basename = pathinfo($absolutePath, PATHINFO_FILENAME);
        $webpPath = $dirname.DIRECTORY_SEPARATOR.$basename.'.webp';

        @unlink($webpPath);

        $result = imagewebp($image, $webpPath, $quality);
        imagedestroy($image);

        if (! $result) {
            return null;
        }

        $publicPath = rtrim(str_replace('\\', '/', public_path()), '/').'/';

        return str_replace($publicPath, '', str_replace('\\', '/', $webpPath));
    }

    /**
     * Hapus file webp pendamping milik sebuah gambar (jika ada).
     */
    public static function deleteSibling(string $relativePath): void
    {
        $absolutePath = public_path(ltrim($relativePath, '/'));

        if (! file_exists($absolutePath)) {
            return;
        }

        $basename = pathinfo($absolutePath, PATHINFO_FILENAME);
        $webpPath = dirname($absolutePath).DIRECTORY_SEPARATOR.$basename.'.webp';

        if (file_exists($webpPath)) {
            File::delete($webpPath);
        }
    }
}
