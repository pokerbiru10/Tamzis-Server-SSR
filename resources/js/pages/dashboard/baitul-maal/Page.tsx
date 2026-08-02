import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ChevronRight,
    ExternalLink,
    Heart,
    Phone,
    Save,
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
import { baitulMaalPageDefaults, simpleDefaults  } from '@/content/baitul-maal-defaults';
import type {BaitulMaalPageKey} from '@/content/baitul-maal-defaults';
import { deepMergeContent } from '@/hooks/use-profile-page-content';

type PageDraft = {
    id: Record<string, unknown>;
    en: Record<string, unknown>;
    images: Record<string, string>;
};

interface BaitulMaalPageProps {
    title: string;
    pageKey: string;
    pageSlug: string;
    breadcrumbs: Array<{ title: string; href: string }>;
    savedContent?: {
        id?: Record<string, unknown>;
        en?: Record<string, unknown>;
        images?: Record<string, string>;
    };
}

/* ============================ PREVIEW ============================ */

function PreviewHeader({
    heading,
    breadcrumb,
}: {
    heading: string;
    breadcrumb: { home: string; baitulMaal: string; current: string };
}) {
    return (
        <div
            className="relative overflow-hidden py-8 text-center text-white"
            style={{
                backgroundImage: "url('/assets/img/header/banner1.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="relative z-10 mx-auto flex flex-col items-center px-4">
                <h1 className="mb-3 text-xl font-bold tracking-tight uppercase drop-shadow-md">
                    {heading || '—'}
                </h1>
                <nav className="flex items-center justify-center space-x-2 text-[9px] font-bold tracking-[0.2em] text-emerald-100/70 uppercase">
                    <span>{breadcrumb.home}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span>{breadcrumb.baitulMaal}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="tracking-widest text-white">
                        {breadcrumb.current}
                    </span>
                </nav>
            </div>
        </div>
    );
}

function PreviewGreenIntro({
    badge,
    title,
    image,
    paragraphs,
}: {
    badge: string;
    title: string;
    image?: string;
    paragraphs: string[];
}) {
    return (
        <div className="rounded-2xl border-l-[6px] border-emerald-500 bg-emerald-800 p-5 text-white shadow-xl">
            <div className="mb-5">
                <h2 className="mb-2 text-[9px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                    {badge}
                </h2>
                <h3 className="text-lg font-bold tracking-tight text-white">
                    {title}
                </h3>
            </div>
            {image && (
                <div className="mb-5 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                    <img
                        src={image}
                        alt={title}
                        className="aspect-video w-full object-cover"
                    />
                </div>
            )}
            <div className="space-y-3 text-xs leading-relaxed font-medium text-white/90">
                {paragraphs
                    .filter((p) => p)
                    .map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
            </div>
        </div>
    );
}

function PreviewContactBox({
    contact,
}: {
    contact: { title: string; desc: string; btn: string };
}) {
    return (
        <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Phone className="h-6 w-6" />
            </div>
            <h4 className="border-b border-emerald-950/5 pb-2 text-sm font-black tracking-widest text-emerald-950 uppercase">
                {contact.title}
            </h4>
            <p className="mt-3 mb-5 text-xs leading-relaxed text-emerald-950/60">
                {contact.desc}
            </p>
            <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-black text-white shadow-lg shadow-green-500/20">
                {contact.btn}
            </div>
        </div>
    );
}

function PagePreview({
    draft,
    locale,
}: {
    draft: PageDraft;
    locale: 'id' | 'en';
}) {
    const c = draft[locale] as {
        heading?: string;
        breadcrumb?: { home: string; baitulMaal: string; current: string };
        intro?: {
            badge?: string;
            title?: string;
            content1?: string;
            content2?: string;
        };
        contact?: { title: string; desc: string; btn: string };
    };

    return (
        <div className="space-y-5 bg-[#f8f9fa] p-4">
            {c.breadcrumb && c.heading && (
                <PreviewHeader
                    heading={c.heading}
                    breadcrumb={c.breadcrumb}
                />
            )}
            {c.intro && (
                <PreviewGreenIntro
                    badge={c.intro.badge || ''}
                    title={c.intro.title || ''}
                    image={draft.images?.intro}
                    paragraphs={[
                        c.intro.content1 || '',
                        c.intro.content2 || '',
                    ]}
                />
            )}
            {c.contact && <PreviewContactBox contact={c.contact} />}
        </div>
    );
}

/* ============================ HALAMAN ============================ */

export default function BaitulMaalPage({
    title,
    pageKey,
    pageSlug,
    breadcrumbs,
    savedContent,
}: BaitulMaalPageProps) {
    const defaults = baitulMaalPageDefaults[pageKey as BaitulMaalPageKey]?.defaults || simpleDefaults;
    const slug = baitulMaalPageDefaults[pageKey as BaitulMaalPageKey]?.slug || pageKey;

    const [draft, setDraft] = useState<PageDraft>(() =>
        deepMergeContent(defaults, savedContent) as PageDraft,
    );
    const [activeLocale, setActiveLocale] = useState<'id' | 'en'>('id');
    const [saving, setSaving] = useState(false);

    const hasImages = Object.keys(draft.images).length > 0;

    const setDraftPart = (part: 'id' | 'en' | 'images', next: unknown) => {
        setDraft((prev) => ({
            ...prev,
            [part]: next,
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

        router.put(
            `/dashboard/baitul-maal/${pageKey}`,
            { data: draft } as unknown as Record<string, never>,
            {
                preserveScroll: true,
                preserveState: true,
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
            <Head title={`Edit ${title}`} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">
                                Edit {title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Edit teks dan gambar program {title} dengan preview langsung, seperti di WordPress.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" asChild>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
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
                                href={`/${slug}`}
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
                                        Gambar dipakai untuk kedua bahasa. Unggah file atau isi URL gambar.
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
                                    {title} —{' '}
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

                        <div className="flex justify-end">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                size="lg"
                                className="inline-flex items-center gap-2 shadow-lg"
                            >
                                <Save className="h-4 w-4" />
                                {saving ? 'Menyimpan...' : `Simpan ${title}`}
                            </Button>
                        </div>
                    </div>

                    {/* Preview live */}
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
                        <div className="max-h-[80vh] overflow-y-auto rounded-2xl border shadow-inner">
                            <PagePreview
                                draft={draft}
                                locale={activeLocale}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
