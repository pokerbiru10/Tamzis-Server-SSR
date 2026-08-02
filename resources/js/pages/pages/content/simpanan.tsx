import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    ExternalLink,
    Save,
    Sparkles,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { FieldEditor } from '@/components/dashboard/content-field-editor';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    simpananPageDefaults
    
} from '@/content/simpanan-page-defaults';
import type {
    simpananIjabahDefaults} from '@/content/simpanan-page-defaults';
import type {SimpananPageKey} from '@/content/simpanan-page-defaults';
import { deepMergeContent } from '@/hooks/use-profile-page-content';

type PageDraft = {
    id: Record<string, unknown>;
    en: Record<string, unknown>;
    images: Record<string, string>;
};

// Struktur konten halaman simpanan (ijabah = struktur terlengkap).
type SimpananContent = Omit<typeof simpananIjabahDefaults.id, 'advantages'> & {
    advantages?: { title: string; items: string[] };
};

interface SimpananContentProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    savedContents: Record<string, unknown>;
}

const pageKeys = Object.keys(simpananPageDefaults) as SimpananPageKey[];

/* ============================ PREVIEW ============================ */
/* Replika tampilan halaman publik, ikut berubah saat form diketik. */

function PagePreview({
    draft,
    locale,
}: {
    draft: PageDraft;
    locale: 'id' | 'en';
}) {
    const c = draft[locale] as SimpananContent;
    const images = draft.images;

    return (
        <div className="space-y-5 bg-[#f8f9fa] p-4">
            {/* Header banner */}
            <div
                className="relative overflow-hidden py-8 text-center text-white"
                style={{
                    backgroundImage:
                        "url('/assets/img/header/banner-tabungan.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 mx-auto flex flex-col items-center px-4">
                    <h1 className="mb-3 text-xl font-bold tracking-tight uppercase drop-shadow-md">
                        {c.heading || '—'}
                    </h1>
                    <nav className="flex items-center justify-center space-x-2 text-[9px] font-bold tracking-[0.2em] text-emerald-100/70 uppercase">
                        <span>{c.breadcrumb.home}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span>{c.breadcrumb.savings}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="tracking-widest text-white">
                            {c.breadcrumb.current}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Hero box */}
            <div className="rounded-2xl border-l-[6px] border-emerald-500 bg-emerald-800 p-5 text-white shadow-xl">
                <h2 className="mb-2 text-[9px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                    {c.hero.badge}
                </h2>
                <h3 className="mb-4 text-lg leading-tight font-bold tracking-tight text-white">
                    {c.hero.title}
                </h3>

                {images.hero && (
                    <div className="relative mb-5 flex justify-center py-2">
                        <div className="absolute inset-x-8 top-4 bottom-2 rounded-full bg-emerald-400/25 blur-3xl" />
                        <img
                            src={images.hero}
                            alt={c.heading}
                            className="relative max-h-52 w-auto -rotate-2 rounded-xl border-4 border-white/25 shadow-2xl"
                        />
                    </div>
                )}

                <p className="mb-5 text-xs leading-relaxed font-medium text-emerald-50">
                    {c.hero.content}
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                    {c.features.map((feature, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-white/10 bg-white/10 p-3"
                        >
                            <div className="mb-2 text-emerald-300">
                                <Wallet className="h-4 w-4" />
                            </div>
                            <h4 className="mb-1 text-[10px] font-bold text-white">
                                {feature.title}
                            </h4>
                            <p className="text-[9px] leading-relaxed text-emerald-100/70">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Details list */}
            <div className="rounded-xl border border-emerald-900/5 bg-white p-5 shadow-sm">
                <h3 className="mb-4 border-b border-emerald-900/5 pb-3 text-sm font-bold text-emerald-950">
                    {c.details.title}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                    {c.details.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-3 w-3" />
                            </div>
                            <p className="text-[11px] font-semibold text-emerald-950/80">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Advantages (khusus Ijabah) */}
            {c.advantages && (
                <div className="rounded-xl border border-emerald-900/5 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 border-b border-emerald-900/5 pb-3 text-sm font-bold text-emerald-950">
                        {c.advantages.title}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {c.advantages.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <p className="text-[11px] font-semibold text-emerald-950/80">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ============================ HALAMAN ============================ */

export default function SimpananContentPage({
    savedContents,
}: SimpananContentProps) {
    const [drafts, setDrafts] = useState<Record<string, PageDraft>>(() =>
        Object.fromEntries(
            pageKeys.map((key) => [
                key,
                deepMergeContent(
                    simpananPageDefaults[key].defaults,
                    savedContents?.[key],
                ) as PageDraft,
            ]),
        ),
    );
    const [activePage, setActivePage] = useState<SimpananPageKey>(pageKeys[0]);
    const [activeLocale, setActiveLocale] = useState<'id' | 'en'>('id');
    const [saving, setSaving] = useState(false);

    const draft = drafts[activePage];
    const hasImages = Object.keys(draft.images).length > 0;

    const setDraftPart = (part: 'id' | 'en' | 'images', next: unknown) => {
        setDrafts((prev) => ({
            ...prev,
            [activePage]: { ...prev[activePage], [part]: next },
        }));
    };

    const handleSave = () => {
        // Cegah simpan saat upload gambar masih berjalan (URL sementara blob:).
        if (JSON.stringify(draft).includes('"blob:')) {
            toast.error('Tunggu upload gambar selesai dulu ya.');

            return;
        }

        setSaving(true);
        const toastId = toast.loading('Menyimpan konten...');

        // preserveState + preserveScroll → simpan via AJAX tanpa reload halaman.
        router.put(
            `/dashboard/pages/content/profil/${activePage}`,
            { data: draft } as unknown as Record<string, never>,
            {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    toast.success(
                        'Konten berhasil disimpan! Perubahan langsung tampil di halaman website.',
                        { id: toastId },
                    );
                },
                onError: () => {
                    toast.error('Gagal menyimpan konten!', { id: toastId });
                },
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <>
            <Head title="Konten Halaman Simpanan" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">
                                Konten Halaman Simpanan
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Edit teks dan gambar halaman produk simpanan dengan preview langsung, seperti di WordPress.
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

                {/* Pilih halaman */}
                <div className="flex flex-wrap gap-2">
                    {pageKeys.map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setActivePage(key)}
                            className={
                                key === activePage
                                    ? 'rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white'
                                    : 'rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200'
                            }
                        >
                            {simpananPageDefaults[key].name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-1 rounded-full bg-slate-100 p-1">
                        {(['id', 'en'] as const).map((locale) => (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => setActiveLocale(locale)}
                                className={
                                    activeLocale === locale
                                        ? 'rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase shadow'
                                        : 'rounded-full px-4 py-1.5 text-xs font-bold uppercase text-slate-500'
                                }
                            >
                                {locale === 'id' ? 'Indonesia' : 'English'}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a
                                href={`/${activePage}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Lihat Halaman
                            </a>
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {saving ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </div>

                {/* Editor kiri + preview kanan (gaya WordPress) */}
                <div className="grid items-start gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                        {hasImages && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gambar Halaman</CardTitle>
                                    <CardDescription>
                                        Tarik & letakkan gambar untuk mengganti. Dipakai untuk kedua bahasa.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FieldEditor
                                        fieldKey="src"
                                        value={draft.images}
                                        onChange={(next) =>
                                            setDraftPart('images', next)
                                        }
                                    />
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {simpananPageDefaults[activePage].name} —{' '}
                                    {activeLocale === 'id'
                                        ? 'Bahasa Indonesia'
                                        : 'English'}
                                </CardTitle>
                                <CardDescription>
                                    Ubah teks di bawah, lalu klik Simpan. Jangan lupa isi kedua bahasa.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FieldEditor
                                    fieldKey={activeLocale}
                                    value={draft[activeLocale]}
                                    onChange={(next) =>
                                        setDraftPart(activeLocale, next)
                                    }
                                />
                            </CardContent>
                        </Card>

                        {activePage === 'simpanan-ijabah' && (
                            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
                                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                                <p>
                                    Tabel &quot;Imbal Hasil Ijabah&quot; di halaman ini diambil otomatis dari API rate, jadi tidak diedit dari sini.
                                </p>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                size="lg"
                                className="inline-flex items-center gap-2 shadow-lg"
                            >
                                <Save className="h-4 w-4" />
                                {saving
                                    ? 'Menyimpan...'
                                    : `Simpan ${simpananPageDefaults[activePage].name}`}
                            </Button>
                        </div>
                    </div>

                    {/* Preview live: sticky, ikut saat halaman di-scroll */}
                    <div className="sticky top-4 space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <p className="text-sm font-semibold">
                                Preview Halaman (
                                {activeLocale === 'id' ? 'Indonesia' : 'English'})
                            </p>
                            <span className="text-xs text-muted-foreground">
                                Ikut berubah saat Anda mengetik
                            </span>
                        </div>
                        <div className="max-h-[85vh] overflow-y-auto rounded-2xl border shadow-inner">
                            <PagePreview draft={draft} locale={activeLocale} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
