import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

type LayoutComponent = ComponentType<{ children: ReactNode }>;
type LayoutFunction = (page: ReactNode) => ReactNode;
type ReactComponent = ComponentType<any> & {
    layout?:
        | LayoutComponent
        | LayoutComponent[]
        | LayoutFunction
        | ((props: any) => any);
};

import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || '';

// Resolve pages using import.meta.glob
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
    'info-karir',
    'murabahah',
    'kafalah',
    'layanan-digital',
    'kebijakan-privasi',
    'syarat-ketentuan',
];

export default function render(page: any) {
    return createInertiaApp({
        page,
        render: renderToString,
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
                module.default.layout =
                    module.default.layout ??
                    (AppLayout as ReactComponent['layout']);
            }

            return module.default;
        },
        setup: ({ App, props }) => (
            <TooltipProvider delayDuration={0}>
                <App {...props} />
            </TooltipProvider>
        ),
    });
}
