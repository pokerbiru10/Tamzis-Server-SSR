import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type SidebarMenuData = {
    title: { id: string; en: string };
    items: Array<{ label: { id: string; en: string }; url: string }>;
};

type FallbackItem = { label: string; url: string };

// Cache per grup agar pindah halaman antar menu yang sama tidak fetch ulang.
const menuCache = new Map<string, SidebarMenuData>();

export function clearSidebarMenuCache(group?: string) {
    if (group) {
        menuCache.delete(group);
    } else {
        menuCache.clear();
    }
}

interface SidebarMenuNavProps {
    group: string;
    locale: string;
    activeUrl: string;
    fallbackTitle: string;
    fallbackItems: FallbackItem[];
}

// Sidebar menu halaman publik. Isinya diambil via AJAX dari data menu di
// dashboard sehingga perubahan admin langsung tampil tanpa deploy ulang.
export function SidebarMenuNav({
    group,
    locale,
    activeUrl,
    fallbackTitle,
    fallbackItems,
}: SidebarMenuNavProps) {
    const [menu, setMenu] = useState<SidebarMenuData | null>(
        menuCache.get(group) ?? null,
    );

    useEffect(() => {
        let cancelled = false;

        fetch(`/api/sidebar-menu/${group}`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((data: SidebarMenuData | null) => {
                if (data && !cancelled) {
                    menuCache.set(group, data);
                    setMenu(data);
                }
            })
            .catch(() => {
                // Gagal fetch → tetap pakai fallback hardcoded.
            });

        return () => {
            cancelled = true;
        };
    }, [group]);

    const lang = locale === 'en' ? 'en' : 'id';
    const title = menu ? menu.title[lang] || menu.title.id : fallbackTitle;
    const items = menu
        ? menu.items.map((item) => ({
              label: item.label[lang] || item.label.id,
              url: item.url,
          }))
        : fallbackItems;

    return (
        <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
            <h4 className="mb-4 border-b border-emerald-950/5 px-2 pb-3 text-base font-black tracking-widest text-emerald-950 uppercase">
                {title}
            </h4>
            <nav className="space-y-1">
                {items.map((item) => {
                    const active = item.url === activeUrl;

                    return (
                        <Link
                            key={`${item.label}-${item.url}`}
                            href={item.url}
                            className={`flex w-full items-center justify-between rounded-2xl border-l-4 px-4 py-3 text-sm font-bold transition-all ${
                                active
                                    ? 'border-emerald-500 bg-emerald-800 text-white shadow-md'
                                    : 'border-transparent text-emerald-950/60 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-950'
                            }`}
                        >
                            {item.label}
                            <ChevronRight
                                className={`h-4 w-4 ${active ? 'text-white' : 'text-emerald-950/20'}`}
                            />
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
