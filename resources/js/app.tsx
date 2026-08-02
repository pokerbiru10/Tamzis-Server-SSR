import { createInertiaApp, router } from '@inertiajs/react';
import type { ComponentType, ReactNode } from 'react';

type LayoutComponent = ComponentType<{ children: ReactNode }>;
type LayoutFunction = (page: ReactNode) => ReactNode;
type ReactComponent = ComponentType<any> & {
    layout?:
        | LayoutComponent
        | LayoutComponent[]
        | LayoutFunction
        | ((props: any) => any);
};
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ScrollToTop from '@/components/scroll-to-top';
import SocialFloatingMenu from '@/components/social-floating-menu';
import type {SocialAccount} from '@/components/social-floating-menu';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import WhatsAppFloatingButton from '@/components/whatsapp-floating-button';
import { initializeTheme } from '@/hooks/use-appearance';
import { BreadcrumbsProvider } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || '';

function FloatingElements() {
    const [mounted, setMounted] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);

    useEffect(() => {
        let active = true;
        const handle = requestAnimationFrame(() => {
            if (active) {
                setMounted(true);
                setCurrentUrl(window.location.pathname);
            }
        });

        // Fetch social media accounts from API
        fetch('/api/social-media-accounts')
            .then((res) => res.json())
            .then((data) => {
                if (active && Array.isArray(data)) {
                    setSocialAccounts(data);
                }
            })
            .catch(() => {});

        const unsubscribe = router.on('navigate', (event) => {
            if (active) {
                setCurrentUrl(event.detail.page.url);
            }
        });

        return () => {
            active = false;
            cancelAnimationFrame(handle);
            unsubscribe();
        };
    }, []);

    // Prevent rendering on server to avoid hydration mismatch
    if (!mounted) {
return null;
}

    // Hide floating elements on login page, dashboard, and settings
    if (
        currentUrl === '/login' ||
        currentUrl.startsWith('/login?') ||
        currentUrl.startsWith('/dashboard') ||
        currentUrl.startsWith('/settings')
    ) {
        return null;
    }

    return (
        <>
            <WhatsAppFloatingButton />
            <SocialFloatingMenu accounts={socialAccounts} />
            <ScrollToTop />
        </>
    );
}

// Lazy-load semua halaman — setiap halaman jadi chunk terpisah
const pages = import.meta.glob('./pages/**/*.tsx');

const marketingPages = [
    'welcome',
    'company-profile',
    'legalitas',
    'visi-misi',
    'corporate-culture',
    'penghargaan',
    'baitul-maal',
    'cinta-masjid',
    'pusat-jajanan-selama-ramadhan',
    'bahagia-1000-yatim-dan-dhuafa',
    'peduli-bencana',
    'peduli-sosial-keagamaan',
    'peduli-yatim-dan-dhuafa',
    'bedah-rumah-bahagia',
    'jumat-berkah',
    'tpq-ku',
    'prog-pengembangan-pembinaan-amil-nadzir',
    'program-bina-siswa-cerdas',
    'program-be-aktriyo',
    'program-membangun-keluarga-utama-mku',
    'program-peduli-kesehatan',
    'program-world-sight-day-desama',
    'wakaf-mukena-al-quran',
    'program-pemberdayaan-dhuafa',
    'qurban-tamzis',
    'program-khitan-ceria',
    'ziswaf',
    'simpanan-mutiara',
    'kantor-layanan',
    'beasiswa-ustadz',
    'simpanan-pendidikan',
    'simpanan-berjangka',
    'simpanan-ijabah',
    'simpanan-mudharabah',
    'ikhtiar-utama',
    'porsi-haji',
    'rumah-tumbuh-bahagia',
    'simulasi-pkr',
    'simulasi-gtb',
    'simulasi-haji',
    'simulasi-mudharabah',
    'simulasi-murabahah',
    'simulasi-kafalah',
    'simulasi-pembiayaan',
    'berita',
    'berita-detail',
    'info-karir',
    'murabahah',
    'kafalah',
    'layanan-digital',
    'page-view',
    'kebijakan-privasi',
    'syarat-ketentuan',
];

createInertiaApp({
    title: (title) => (title && appName ? `${title} - ${appName}` : title || appName),

    resolve: async (name) => {
        const page = pages[`./pages/${name}.tsx`];

        if (!page) {
throw new Error(`Page not found: ${name}`);
}

        const module = (await page()) as { default: ReactComponent };

        if (marketingPages.includes(name)) {
            module.default.layout = undefined;
        } else if (name.startsWith('auth/')) {
            module.default.layout = AuthLayout as ReactComponent['layout'];
        } else if (name.startsWith('settings/')) {
            module.default.layout = [
                AppLayout,
                SettingsLayout,
            ] as ReactComponent['layout'];
        } else {
            module.default.layout = DashboardLayout as ReactComponent['layout'];
        }

        return module.default;
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                <BreadcrumbsProvider>
                    {app}
                    <Toaster position="top-right" richColors />
                    <FloatingElements />
                </BreadcrumbsProvider>
            </TooltipProvider>
        );
    },
    progress: {
        color: '#10b981',
        showSpinner: false,
    },
});

// This will set light / dark mode on load...
if (typeof document !== 'undefined') {
    initializeTheme();

    // Prefetch links on mouse hover for faster navigation
    document.addEventListener(
        'mouseover',
        (e) => {
            const link = (e.target as HTMLElement).closest('a[href]');

            if (
                link &&
                link.getAttribute('href')?.startsWith('/') &&
                !link.getAttribute('href')?.startsWith('//')
            ) {
                const href = link.getAttribute('href')!;

                if (
                    !document.querySelector(
                        `link[rel="prefetch"][href="${href}"]`,
                    )
                ) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                }
            }
        },
        { passive: true },
    );
}


router.on('finish', () => {
    const flash = router.page?.props?.flash as
        | Record<string, string | null>
        | undefined;

    if (flash?.success) {
        toast.success(flash.success);
    }

    if (flash?.error) {
        toast.error(flash.error);
    }
});
