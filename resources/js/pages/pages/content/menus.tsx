import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    ChevronRight,
    ListTree,
    Plus,
    Save,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { clearSidebarMenuCache } from '@/components/marketing/sidebar-menu-nav';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MenuItem = {
    label: { id: string; en: string };
    url: string;
};

type SidebarMenu = {
    id: number;
    group_key: string;
    name: string;
    title: { id: string; en: string };
    items: MenuItem[];
};

interface SidebarMenusProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    menus: SidebarMenu[];
}

const emptyItem: MenuItem = { label: { id: '', en: '' }, url: '' };

export default function SidebarMenus({ menus }: SidebarMenusProps) {
    const [drafts, setDrafts] = useState<Record<number, SidebarMenu>>(() =>
        Object.fromEntries(menus.map((menu) => [menu.id, menu])),
    );
    const [activeId, setActiveId] = useState<number | null>(
        menus[0]?.id ?? null,
    );
    const [previewLocale, setPreviewLocale] = useState<'id' | 'en'>('id');
    const [saving, setSaving] = useState(false);

    const draft = activeId !== null ? drafts[activeId] : null;

    const setDraft = (updater: (menu: SidebarMenu) => SidebarMenu) => {
        if (activeId === null) {
            return;
        }

        setDrafts((prev) => ({ ...prev, [activeId]: updater(prev[activeId]) }));
    };

    const updateTitle = (locale: 'id' | 'en', value: string) => {
        setDraft((menu) => ({
            ...menu,
            title: { ...menu.title, [locale]: value },
        }));
    };

    const updateItem = (
        index: number,
        patch: { label?: { id?: string; en?: string }; url?: string },
    ) => {
        setDraft((menu) => ({
            ...menu,
            items: menu.items.map((item, i) =>
                i === index
                    ? {
                          label: { ...item.label, ...patch.label },
                          url: patch.url ?? item.url,
                      }
                    : item,
            ),
        }));
    };

    const addItem = () => {
        setDraft((menu) => ({ ...menu, items: [...menu.items, emptyItem] }));
    };

    const removeItem = (index: number) => {
        setDraft((menu) => ({
            ...menu,
            items: menu.items.filter((_, i) => i !== index),
        }));
    };

    const moveItem = (index: number, direction: -1 | 1) => {
        setDraft((menu) => {
            const target = index + direction;

            if (target < 0 || target >= menu.items.length) {
                return menu;
            }

            const items = [...menu.items];
            [items[index], items[target]] = [items[target], items[index]];

            return { ...menu, items };
        });
    };

    const handleSave = () => {
        if (!draft) {
            return;
        }

        if (draft.items.length === 0) {
            toast.error('Menu harus punya minimal satu link.');

            return;
        }

        setSaving(true);
        const toastId = toast.loading('Menyimpan menu...');

        // preserveState + preserveScroll → simpan via AJAX tanpa reload halaman.
        router.put(
            `/dashboard/pages/content/menus/${draft.id}`,
            { title: draft.title, items: draft.items },
            {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    clearSidebarMenuCache(draft.name.toLowerCase().replace(/\s+/g, '-'));
                    clearSidebarMenuCache();
                    toast.success(
                        'Menu berhasil disimpan! Perubahan langsung tampil di halaman website.',
                        { id: toastId },
                    );
                },
                onError: () => {
                    toast.error(
                        'Gagal menyimpan. Pastikan semua label dan URL terisi.',
                        { id: toastId },
                    );
                },
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <>
            <Head title="Menu Halaman" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <ListTree className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">Menu Halaman</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola menu sidebar halaman profil dan halaman lainnya. Perubahan langsung tampil tanpa deploy ulang.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" asChild>
                        <Link
                            href="/dashboard/pages/content"
                            className="inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {menus.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                        {menus.map((menu) => (
                            <button
                                key={menu.id}
                                type="button"
                                onClick={() => setActiveId(menu.id)}
                                className={
                                    menu.id === activeId
                                        ? 'rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white'
                                        : 'rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200'
                                }
                            >
                                {menu.name}
                            </button>
                        ))}
                    </div>
                )}

                {!draft ? (
                    <Card>
                        <CardContent className="p-12 text-center text-sm text-muted-foreground">
                            Belum ada data menu.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid items-start gap-6 lg:grid-cols-3">
                        {/* Editor */}
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{draft.name}</CardTitle>
                                    <CardDescription>
                                        Judul kotak menu yang tampil di sidebar halaman.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Judul (ID)</Label>
                                        <Input
                                            value={draft.title.id}
                                            onChange={(e) =>
                                                updateTitle('id', e.target.value)
                                            }
                                            placeholder="Contoh: Profil Kami"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Judul (EN)</Label>
                                        <Input
                                            value={draft.title.en}
                                            onChange={(e) =>
                                                updateTitle('en', e.target.value)
                                            }
                                            placeholder="Contoh: Our Profile"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <CardTitle>Daftar Link</CardTitle>
                                        <CardDescription>
                                            Atur label (2 bahasa), URL tujuan, dan urutan link menu.
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addItem}
                                        className="inline-flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Tambah Link
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {draft.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border p-4"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-semibold text-muted-foreground">
                                                    Link #{index + 1}
                                                </span>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            moveItem(index, -1)
                                                        }
                                                        disabled={index === 0}
                                                    >
                                                        <ArrowUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            moveItem(index, 1)
                                                        }
                                                        disabled={
                                                            index ===
                                                            draft.items.length - 1
                                                        }
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                        onClick={() =>
                                                            removeItem(index)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label>Label (ID)</Label>
                                                    <Input
                                                        value={item.label.id}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                label: {
                                                                    id: e.target
                                                                        .value,
                                                                },
                                                            })
                                                        }
                                                        placeholder="Contoh: Profil Perusahaan"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Label (EN)</Label>
                                                    <Input
                                                        value={item.label.en}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                label: {
                                                                    en: e.target
                                                                        .value,
                                                                },
                                                            })
                                                        }
                                                        placeholder="Contoh: Company Profile"
                                                    />
                                                </div>
                                                <div className="space-y-2 sm:col-span-2">
                                                    <Label>URL</Label>
                                                    <Input
                                                        value={item.url}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                url: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        placeholder="Contoh: /company-profile"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {draft.items.length === 0 && (
                                        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                                            Belum ada link. Klik &quot;Tambah Link&quot; untuk menambahkan.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {saving ? 'Menyimpan...' : 'Simpan Menu'}
                                </Button>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="sticky top-20 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold">
                                    Preview Sidebar
                                </p>
                                <div className="flex gap-1 rounded-full bg-slate-100 p-1">
                                    {(['id', 'en'] as const).map((locale) => (
                                        <button
                                            key={locale}
                                            type="button"
                                            onClick={() =>
                                                setPreviewLocale(locale)
                                            }
                                            className={
                                                previewLocale === locale
                                                    ? 'rounded-full bg-white px-3 py-1 text-xs font-bold uppercase shadow'
                                                    : 'rounded-full px-3 py-1 text-xs font-bold uppercase text-slate-500'
                                            }
                                        >
                                            {locale}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Replika tampilan sidebar di halaman publik */}
                            <div className="rounded-3xl bg-[#f8f9fa] p-4">
                                <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
                                    <h4 className="mb-4 border-b border-emerald-950/5 px-2 pb-3 text-base font-black tracking-widest text-emerald-950 uppercase">
                                        {draft.title[previewLocale] || '—'}
                                    </h4>
                                    <nav className="space-y-1">
                                        {draft.items.map((item, index) => {
                                            const active = index === 0;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex w-full items-center justify-between rounded-2xl border-l-4 px-4 py-3 text-sm font-bold ${
                                                        active
                                                            ? 'border-emerald-500 bg-emerald-800 text-white shadow-md'
                                                            : 'border-transparent text-emerald-950/60'
                                                    }`}
                                                >
                                                    {item.label[previewLocale] ||
                                                        item.label.id ||
                                                        '(tanpa label)'}
                                                    <ChevronRight
                                                        className={`h-4 w-4 ${active ? 'text-white' : 'text-emerald-950/20'}`}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Link pertama ditandai aktif hanya sebagai contoh tampilan. Di website, link aktif mengikuti halaman yang dibuka.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
