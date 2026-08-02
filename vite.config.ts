import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        hmr: {
            host: '127.0.0.1',
        },
    },

    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        inertia(),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],

    build: {
        // Target modern browsers — smaller, faster output
        target: 'es2022',

        // Increase chunk warning threshold (suppress false alarms)
        chunkSizeWarningLimit: 800,

        rollupOptions: {
            output: {
                // Manual chunk splitting for better caching
                manualChunks(id) {
                    // React core
                    if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
                        return 'react-core';
                    }
                    // Inertia
                    if (id.includes('@inertiajs')) {
                        return 'inertia';
                    }
                    // Headless UI
                    if (id.includes('@headlessui')) {
                        return 'headlessui';
                    }
                    // Radix UI
                    if (id.includes('@radix-ui')) {
                        return 'radix';
                    }
                    // Lucide icons
                    if (id.includes('lucide-react')) {
                        return 'icons';
                    }
                    // FontAwesome
                    if (id.includes('@fortawesome')) {
                        return 'fontawesome';
                    }
                    // Tailwind / animation utilities
                    if (id.includes('tailwind-merge') || id.includes('clsx') || id.includes('class-variance')) {
                        return 'utils';
                    }
                },
            },
        },

        // Enable CSS code splitting
        cssCodeSplit: true,

        // Minify with esbuild (default, fastest)
        minify: 'esbuild',

        // Source maps only in dev
        sourcemap: false,
    },

    // Optimize dependency pre-bundling
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@inertiajs/react',
            '@headlessui/react',
            'lucide-react',
        ],
    },

    // Faster module resolution
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
