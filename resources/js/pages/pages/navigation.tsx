import { Head, useForm } from '@inertiajs/react';
import { Menu as MenuIcon, PanelBottom, PanelTop, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { CollapsibleBox, SectionCard } from '@/components/dashboard-collapsible';
import { defaultFooter, TamzisFooter  } from '@/components/marketing/tamzis-footer';
import type {FooterData} from '@/components/marketing/tamzis-footer';
import {
    defaultTopbar,
    getNavItems,
    TamzisMainNav,
    TamzisTopbar
    
    
} from '@/components/marketing/tamzis-header';
import type {NavItem, TopbarData} from '@/components/marketing/tamzis-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Locale = 'id' | 'en';

type Sections = {
    topbar?: TopbarData;
    navbar?: { id?: NavItem[]; en?: NavItem[] };
    footer?: { id?: FooterData; en?: FooterData };
};

type AvailablePage = {
    id: number;
    title: string;
    slug: string;
    locale: string;
};

const typeLabels: Record<string, string> = {
    link: 'Sub Menu',
    dropdown: 'Dropdown',
    mega: 'Menu',
};

export default function NavigationEdit({
    sections,
    availablePages = [],
}: {
    sections: Sections;
    availablePages?: AvailablePage[];
}) {
    const [locale, setLocale] = useState<Locale>('id');
    const [selectedPageId, setSelectedPageId] = useState('');
    const [selectedParent, setSelectedParent] = useState('');

    const { data, setData, put, processing, errors } = useForm({
        topbar: sections.topbar ?? defaultTopbar,
        navbar: {
            id: sections.navbar?.id ?? getNavItems('id'),
            en: sections.navbar?.en ?? getNavItems('en'),
        },
        footer: {
            id: sections.footer?.id ?? defaultFooter.id,
            en: sections.footer?.en ?? defaultFooter.en,
        },
    });

    const setTopbar = (patch: Partial<TopbarData>) => {
        setData('topbar', { ...data.topbar, ...patch });
    };

    const setNav = (items: NavItem[]) => {
        setData('navbar', { ...data.navbar, [locale]: items });
    };

    const updateNavItem = (index: number, patch: Record<string, unknown>) => {
        setNav(
            data.navbar[locale].map((item, i) =>
                i === index ? ({ ...item, ...patch } as NavItem) : item,
            ),
        );
    };

    // Ganti jenis menu; submenu yang sudah ada ikut dipindahkan ke struktur baru.
    const changeNavType = (navIndex: number, newType: 'link' | 'dropdown' | 'mega') => {
        const item = data.navbar[locale][navIndex];

        if (item.type === newType) {
return;
}

        const base = { label: item.label, href: item.href };
        let next: NavItem;

        if (newType === 'link') {
            next = { type: 'link', ...base };
        } else if (newType === 'dropdown') {
            const items =
                item.type === 'mega'
                    ? item.sections.flatMap((section) =>
                          section.items.map(({ label, href }) => ({ label, href })),
                      )
                    : [];
            next = { type: 'dropdown', ...base, items };
        } else {
            const sections =
                item.type === 'dropdown'
                    ? [{ title: item.label, items: item.items }]
                    : [{ title: item.label, items: [] }];
            next = {
                type: 'mega',
                ...base,
                sections,
                footerTitle: item.label,
                footerText: '',
            };
        }

        setNav(data.navbar[locale].map((it, i) => (i === navIndex ? next : it)));
    };

    const updateDropdownItem = (
        navIndex: number,
        itemIndex: number,
        field: 'label' | 'href',
        value: string,
    ) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'dropdown') {
return;
}

        updateNavItem(navIndex, {
            items: nav.items.map((sub, i) =>
                i === itemIndex ? { ...sub, [field]: value } : sub,
            ),
        });
    };

    const addDropdownItem = (navIndex: number) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'dropdown') {
return;
}

        updateNavItem(navIndex, { items: [...nav.items, { label: '', href: '/' }] });
    };

    const removeDropdownItem = (navIndex: number, itemIndex: number) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'dropdown') {
return;
}

        updateNavItem(navIndex, { items: nav.items.filter((_, i) => i !== itemIndex) });
    };

    const updateMegaSectionTitle = (navIndex: number, sectionIndex: number, value: string) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'mega') {
return;
}

        updateNavItem(navIndex, {
            sections: nav.sections.map((section, i) =>
                i === sectionIndex ? { ...section, title: value } : section,
            ),
        });
    };

    const updateMegaItem = (
        navIndex: number,
        sectionIndex: number,
        itemIndex: number,
        field: 'label' | 'href',
        value: string,
    ) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'mega') {
return;
}

        updateNavItem(navIndex, {
            sections: nav.sections.map((section, i) =>
                i === sectionIndex
                    ? {
                          ...section,
                          items: section.items.map((sub, j) =>
                              j === itemIndex ? { ...sub, [field]: value } : sub,
                          ),
                      }
                    : section,
            ),
        });
    };

    const addMegaItem = (navIndex: number, sectionIndex: number) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'mega') {
return;
}

        updateNavItem(navIndex, {
            sections: nav.sections.map((section, i) =>
                i === sectionIndex
                    ? { ...section, items: [...section.items, { label: '', href: '/' }] }
                    : section,
            ),
        });
    };

    const removeMegaItem = (navIndex: number, sectionIndex: number, itemIndex: number) => {
        const nav = data.navbar[locale][navIndex];

        if (nav.type !== 'mega') {
return;
}

        updateNavItem(navIndex, {
            sections: nav.sections.map((section, i) =>
                i === sectionIndex
                    ? { ...section, items: section.items.filter((_, j) => j !== itemIndex) }
                    : section,
            ),
        });
    };

    const setFooterField = (field: keyof FooterData, value: string) => {
        setData('footer', {
            ...data.footer,
            [locale]: { ...data.footer[locale], [field]: value },
        });
    };

    const updateFooterLink = (index: number, field: 'label' | 'href', value: string) => {
        setData('footer', {
            ...data.footer,
            [locale]: {
                ...data.footer[locale],
                links: data.footer[locale].links.map((link, i) =>
                    i === index ? { ...link, [field]: value } : link,
                ),
            },
        });
    };

    const addFooterLink = () => {
        setData('footer', {
            ...data.footer,
            [locale]: {
                ...data.footer[locale],
                links: [...data.footer[locale].links, { label: '', href: '/' }],
            },
        });
    };

    const removeFooterLink = (index: number) => {
        setData('footer', {
            ...data.footer,
            [locale]: {
                ...data.footer[locale],
                links: data.footer[locale].links.filter((_, i) => i !== index),
            },
        });
    };

    // Daftar menu induk yang bisa menampung submenu (dropdown & kolom mega menu).
    const parentOptions = data.navbar[locale].flatMap((item, navIndex) => {
        if (item.type === 'dropdown') {
            return [{ value: `d-${navIndex}`, label: item.label }];
        }

        if (item.type === 'mega') {
            return item.sections.map((section, sectionIndex) => ({
                value: `m-${navIndex}-${sectionIndex}`,
                label: `${item.label} → ${section.title}`,
            }));
        }

        return [];
    });

    const addSubmenuFromPage = () => {
        const page = availablePages.find((p) => String(p.id) === selectedPageId);

        if (!page) {
            toast.error('Pilih halaman dari database terlebih dahulu.');

            return;
        }

        if (!selectedParent) {
            toast.error('Pilih menu tujuan terlebih dahulu.');

            return;
        }

        const newItem = { label: page.title, href: `/${page.slug}` };
        const parts = selectedParent.split('-');

        if (parts[0] === 'd') {
            const navIndex = Number(parts[1]);
            const nav = data.navbar[locale][navIndex];

            if (nav.type !== 'dropdown') {
return;
}

            updateNavItem(navIndex, { items: [...nav.items, newItem] });
        } else {
            const navIndex = Number(parts[1]);
            const sectionIndex = Number(parts[2]);
            const nav = data.navbar[locale][navIndex];

            if (nav.type !== 'mega') {
return;
}

            updateNavItem(navIndex, {
                sections: nav.sections.map((section, i) =>
                    i === sectionIndex
                        ? { ...section, items: [...section.items, newItem] }
                        : section,
                ),
            });
        }

        setSelectedPageId('');
        toast.success(
            `Submenu "${page.title}" ditambahkan. Jangan lupa klik Simpan Perubahan.`,
        );
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Menyimpan navbar & footer...');

        put('/dashboard/pages/navigation', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Navbar & footer berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal menyimpan. Periksa kembali isian Anda (cek juga tab bahasa lainnya).', {
                    id: toastId,
                });
            },
        });
    };

    const hasErrors = Object.keys(errors).length > 0;

    const linkRow = (
        label: string,
        href: string,
        onLabel: (v: string) => void,
        onHref: (v: string) => void,
        onRemove?: () => void,
    ) => (
        <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1.5">
                <Label>Label</Label>
                <Input value={label} onChange={(e) => onLabel(e.target.value)} />
            </div>
            <div className="flex-1 space-y-1.5">
                <Label>Link</Label>
                <Input value={href} onChange={(e) => onHref(e.target.value)} placeholder="/halaman" />
            </div>
            {onRemove && (
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={onRemove}
                    className="shrink-0"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    );

    return (
        <>
            <Head title="Navbar & Footer" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Navbar & Footer</h1>
                        <p className="text-sm text-muted-foreground">
                            Atur menu navbar kecil di atas, menu utama, dan footer website.
                        </p>
                    </div>

                    <div className="inline-flex rounded-lg border p-1">
                        <button
                            type="button"
                            onClick={() => setLocale('id')}
                            className={
                                locale === 'id'
                                    ? 'rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white'
                                    : 'rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-slate-100'
                            }
                        >
                            Indonesia
                        </button>
                        <button
                            type="button"
                            onClick={() => setLocale('en')}
                            className={
                                locale === 'en'
                                    ? 'rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white'
                                    : 'rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-slate-100'
                            }
                        >
                            English
                        </button>
                    </div>
                </div>

                {hasErrors && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        Ada isian yang belum valid (periksa juga tab bahasa lainnya). Label dan link menu wajib diisi.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <SectionCard
                        icon={<PanelTop className="h-5 w-5" />}
                        title="Navbar Kecil (Topbar)"
                        description="Bar hijau di paling atas: call center, WhatsApp, dan link sosial media."
                        contentClassName="space-y-4"
                        defaultOpen
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="topbar-phone">Nomor Call Center</Label>
                                <Input
                                    id="topbar-phone"
                                    value={data.topbar.phone}
                                    onChange={(e) => setTopbar({ phone: e.target.value })}
                                    placeholder="+62286325303"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topbar-wa">Nomor WhatsApp</Label>
                                <Input
                                    id="topbar-wa"
                                    value={data.topbar.whatsapp}
                                    onChange={(e) => setTopbar({ whatsapp: e.target.value })}
                                    placeholder="628112613134"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="topbar-label-id">Label Call Center (ID)</Label>
                                <Input
                                    id="topbar-label-id"
                                    value={data.topbar.phoneLabel.id}
                                    onChange={(e) =>
                                        setTopbar({
                                            phoneLabel: { ...data.topbar.phoneLabel, id: e.target.value },
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topbar-label-en">Label Call Center (EN)</Label>
                                <Input
                                    id="topbar-label-en"
                                    value={data.topbar.phoneLabel.en}
                                    onChange={(e) =>
                                        setTopbar({
                                            phoneLabel: { ...data.topbar.phoneLabel, en: e.target.value },
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="topbar-ig">URL Instagram</Label>
                                <Input
                                    id="topbar-ig"
                                    value={data.topbar.socials.instagram ?? ''}
                                    onChange={(e) =>
                                        setTopbar({
                                            socials: { ...data.topbar.socials, instagram: e.target.value },
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topbar-fb">URL Facebook</Label>
                                <Input
                                    id="topbar-fb"
                                    value={data.topbar.socials.facebook ?? ''}
                                    onChange={(e) =>
                                        setTopbar({
                                            socials: { ...data.topbar.socials, facebook: e.target.value },
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topbar-yt">URL YouTube</Label>
                                <Input
                                    id="topbar-yt"
                                    value={data.topbar.socials.youtube ?? ''}
                                    onChange={(e) =>
                                        setTopbar({
                                            socials: { ...data.topbar.socials, youtube: e.target.value },
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Link "Tentang Kami", "Layanan", dan tombol "Info Karir" di topbar dikelola lewat menu Settings
                            (Tentang Link, Layanan Link, Career Link).
                        </p>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-muted-foreground">
                                Preview (tampilan di website) — ikut berubah saat Anda mengetik, tersimpan setelah klik Simpan Perubahan
                            </p>
                            <div className="overflow-hidden rounded-xl border shadow-sm">
                                <TamzisTopbar data={data.topbar} />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        icon={<MenuIcon className="h-5 w-5" />}
                        title="Menu Navbar Utama"
                        description="Menu utama website: label, link, submenu dropdown, dan mega menu. Ikuti tab bahasa di atas."
                        contentClassName="space-y-3"
                    >
                        <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                            <p className="text-sm font-semibold text-emerald-900">
                                Tambah Submenu dari Halaman Database
                            </p>
                            {availablePages.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Belum ada halaman yang dipublikasikan. Buat dulu di menu{' '}
                                    <span className="font-medium">Konten Halaman</span>, lalu halamannya bisa
                                    disambungkan ke menu di sini.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-3 md:flex-row md:items-end">
                                    <div className="flex-1 space-y-1.5">
                                        <Label htmlFor="page-select">Halaman</Label>
                                        <select
                                            id="page-select"
                                            value={selectedPageId}
                                            onChange={(e) => setSelectedPageId(e.target.value)}
                                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="">— Pilih halaman —</option>
                                            {availablePages.map((page) => (
                                                <option key={page.id} value={page.id}>
                                                    {page.title} (/{page.slug}, {page.locale.toUpperCase()})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex-1 space-y-1.5">
                                        <Label htmlFor="parent-select">Sambungkan ke Menu</Label>
                                        <select
                                            id="parent-select"
                                            value={selectedParent}
                                            onChange={(e) => setSelectedParent(e.target.value)}
                                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="">— Pilih menu tujuan —</option>
                                            {parentOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={addSubmenuFromPage}
                                        className="inline-flex shrink-0 items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                                    >
                                        <Plus className="h-4 w-4" /> Tambahkan
                                    </Button>
                                </div>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Halaman diambil dari Konten Halaman yang berstatus publish. Submenu ditambahkan ke tab
                                bahasa yang sedang aktif ({locale === 'id' ? 'Indonesia' : 'English'}).
                            </p>
                        </div>

                        {data.navbar[locale].map((item, navIndex) => (
                            <CollapsibleBox
                                key={navIndex}
                                title={`${item.label || '(tanpa label)'} — ${item.typeLabel || typeLabels[item.type] || item.type}`}
                            >
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Label Menu</Label>
                                        <Input
                                            value={item.label}
                                            onChange={(e) => updateNavItem(navIndex, { label: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Link</Label>
                                        <Input
                                            value={item.href}
                                            onChange={(e) => updateNavItem(navIndex, { href: e.target.value })}
                                            placeholder="/halaman"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Jenis Menu</Label>
                                        <select
                                            value={item.type}
                                            onChange={(e) =>
                                                changeNavType(
                                                    navIndex,
                                                    e.target.value as 'link' | 'dropdown' | 'mega',
                                                )
                                            }
                                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="link">Sub Menu (link biasa)</option>
                                            <option value="dropdown">Dropdown</option>
                                            <option value="mega">Menu (punya submenu)</option>
                                        </select>
                                    </div>
                                </div>

                                {item.type === 'dropdown' && (
                                    <div className="space-y-3">
                                        <p className="text-sm font-semibold text-muted-foreground">Submenu</p>
                                        {item.items.map((sub, itemIndex) => (
                                            <div key={itemIndex}>
                                                {linkRow(
                                                    sub.label,
                                                    sub.href,
                                                    (v) => updateDropdownItem(navIndex, itemIndex, 'label', v),
                                                    (v) => updateDropdownItem(navIndex, itemIndex, 'href', v),
                                                    () => removeDropdownItem(navIndex, itemIndex),
                                                )}
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addDropdownItem(navIndex)}
                                            className="inline-flex items-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" /> Tambah Submenu
                                        </Button>
                                    </div>
                                )}

                                {item.type === 'mega' && (
                                    <div className="space-y-3">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>Judul Footer Menu</Label>
                                                <Input
                                                    value={item.footerTitle}
                                                    onChange={(e) =>
                                                        updateNavItem(navIndex, { footerTitle: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Teks Footer Menu</Label>
                                                <Input
                                                    value={item.footerText}
                                                    onChange={(e) =>
                                                        updateNavItem(navIndex, { footerText: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {item.sections.map((section, sectionIndex) => (
                                            <CollapsibleBox
                                                key={sectionIndex}
                                                title={`Kolom: ${section.title || '(tanpa judul)'}`}
                                            >
                                                <div className="space-y-2">
                                                    <Label>Judul Kolom</Label>
                                                    <Input
                                                        value={section.title}
                                                        onChange={(e) =>
                                                            updateMegaSectionTitle(navIndex, sectionIndex, e.target.value)
                                                        }
                                                    />
                                                </div>
                                                {section.items.map((sub, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {linkRow(
                                                            sub.label,
                                                            sub.href,
                                                            (v) => updateMegaItem(navIndex, sectionIndex, itemIndex, 'label', v),
                                                            (v) => updateMegaItem(navIndex, sectionIndex, itemIndex, 'href', v),
                                                            () => removeMegaItem(navIndex, sectionIndex, itemIndex),
                                                        )}
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => addMegaItem(navIndex, sectionIndex)}
                                                    className="inline-flex items-center gap-2"
                                                >
                                                    <Plus className="h-4 w-4" /> Tambah Link
                                                </Button>
                                            </CollapsibleBox>
                                        ))}
                                    </div>
                                )}
                            </CollapsibleBox>
                        ))}
                        <p className="text-xs text-muted-foreground">
                            Perubahan menu berlaku untuk navbar desktop dan menu mobile sekaligus.
                        </p>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-muted-foreground">
                                Preview (tampilan di website) — arahkan kursor ke menu untuk melihat submenu; ikut
                                berubah saat Anda mengetik, tersimpan setelah klik Simpan Perubahan
                            </p>
                            <div className="relative z-10 rounded-xl border bg-white shadow-sm">
                                <div className="flex min-h-14 items-stretch px-4">
                                    <TamzisMainNav
                                        items={data.navbar[locale]}
                                        className="flex flex-1 flex-wrap items-center justify-center gap-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        icon={<PanelBottom className="h-5 w-5" />}
                        title="Footer"
                        description="Deskripsi, logo, menu link, kontak, dan teks copyright di footer website. Ikuti tab bahasa di atas."
                        contentClassName="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="footer-logo">URL Logo Footer</Label>
                            <Input
                                id="footer-logo"
                                value={data.footer[locale].logo || ''}
                                onChange={(e) => setFooterField('logo', e.target.value)}
                                placeholder="/assets/img/logo-remove.png"
                            />
                            <p className="text-xs text-muted-foreground">
                                Ukuran yang disarankan: 150x40px. Logo akan ditampilkan dengan filter putih (brightness-0 invert).
                            </p>
                            {data.footer[locale].logo && (
                                <div className="mt-2 rounded-lg border bg-slate-50 p-4">
                                    <p className="mb-2 text-xs font-semibold text-muted-foreground">Preview Logo:</p>
                                    <img
                                        src={data.footer[locale].logo}
                                        alt="Preview Logo"
                                        style={{ maxWidth: '150px', height: '40px' }}
                                        className="brightness-0 invert"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="footer-about">Deskripsi Singkat</Label>
                            <Textarea
                                id="footer-about"
                                rows={2}
                                value={data.footer[locale].about}
                                onChange={(e) => setFooterField('about', e.target.value)}
                            />
                        </div>

                        <div className="space-y-3 rounded-xl border p-4">
                            <div className="space-y-2">
                                <Label htmlFor="footer-menutitle">Judul Kolom Menu</Label>
                                <Input
                                    id="footer-menutitle"
                                    value={data.footer[locale].menuTitle}
                                    onChange={(e) => setFooterField('menuTitle', e.target.value)}
                                />
                            </div>
                            {data.footer[locale].links.map((link, index) => (
                                <div key={index}>
                                    {linkRow(
                                        link.label,
                                        link.href,
                                        (v) => updateFooterLink(index, 'label', v),
                                        (v) => updateFooterLink(index, 'href', v),
                                        () => removeFooterLink(index),
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addFooterLink}
                                className="inline-flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" /> Tambah Link
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="footer-contacttitle">Judul Kolom Kontak</Label>
                                <Input
                                    id="footer-contacttitle"
                                    value={data.footer[locale].contactTitle}
                                    onChange={(e) => setFooterField('contactTitle', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-callcenter">Teks Telepon</Label>
                                <Input
                                    id="footer-callcenter"
                                    value={data.footer[locale].callCenter}
                                    onChange={(e) => setFooterField('callCenter', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-phone">Nomor Telepon (untuk link tel:)</Label>
                                <Input
                                    id="footer-phone"
                                    value={data.footer[locale].phone}
                                    onChange={(e) => setFooterField('phone', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-email">Email</Label>
                                <Input
                                    id="footer-email"
                                    value={data.footer[locale].email}
                                    onChange={(e) => setFooterField('email', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-nearest">Teks Kantor Terdekat</Label>
                                <Input
                                    id="footer-nearest"
                                    value={data.footer[locale].nearestOffice}
                                    onChange={(e) => setFooterField('nearestOffice', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-copyright">Teks Copyright</Label>
                                <Input
                                    id="footer-copyright"
                                    value={data.footer[locale].copyright}
                                    onChange={(e) => setFooterField('copyright', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-privacy">Label Kebijakan Privasi</Label>
                                <Input
                                    id="footer-privacy"
                                    value={data.footer[locale].privacy}
                                    onChange={(e) => setFooterField('privacy', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-terms">Label Syarat & Ketentuan</Label>
                                <Input
                                    id="footer-terms"
                                    value={data.footer[locale].terms}
                                    onChange={(e) => setFooterField('terms', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-muted-foreground">
                                Preview (tampilan di website)
                            </p>
                            <div className="overflow-hidden rounded-xl border shadow-sm">
                                <TamzisFooter data={data.footer[locale]} hideBottomNav />
                            </div>
                        </div>
                    </SectionCard>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
