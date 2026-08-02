<?php

namespace App\Services;

class EnvFileService
{
    /**
     * Update a value in the .env file.
     */
    public static function update(string $key, string $value): bool
    {
        $path = base_path('.env');

        if (! file_exists($path)) {
            return false;
        }

        $content = file_get_contents($path);

        // Check if key exists
        if (str_contains($content, $key.'=')) {
            // Update existing key
            $pattern = '/^'.preg_quote($key, '/').'=.*/m';
            $replacement = $key.'='.$value;
            $content = preg_replace($pattern, $replacement, $content);
        } else {
            // Add new key
            $content .= "\n".$key.'='.$value;
        }

        file_put_contents($path, $content);

        return true;
    }

    /**
     * Get a value from the .env file.
     */
    public static function get(string $key, string $default = ''): string
    {
        $path = base_path('.env');

        if (! file_exists($path)) {
            return $default;
        }

        $content = file_get_contents($path);
        $pattern = '/^'.preg_quote($key, '/').'=(.*)$/m';

        if (preg_match($pattern, $content, $matches)) {
            return trim($matches[1], '"');
        }

        return $default;
    }

    /**
     * Delete a key from the .env file.
     */
    public static function delete(string $key): bool
    {
        $path = base_path('.env');

        if (! file_exists($path)) {
            return false;
        }

        $content = file_get_contents($path);
        $pattern = '/^'.preg_quote($key, '/').'=.*\n?/m';
        $content = preg_replace($pattern, '', $content);

        file_put_contents($path, $content);

        return true;
    }
}
