import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    ExternalLink,
    Heart,
    Phone,
    Save,
    Sparkles,
    HeartHandshake,
    Users,
    Home,
    GraduationCap,
    Shield,
    Droplet,
    Cross,
    Banknote,
    Building2,
    BookOpen,
    Gift,
    Star,
    Sun,
    Moon,
    Eye,
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
    baitulMaalPageDefaults
    
} from '@/content/baitul-maal-defaults';
import type {BaitulMaalPageKey} from '@/content/baitul-maal-defaults';
import { deepMergeContent } from '@/hooks/use-profile-page-content';

type PageDraft = {
    id: Record<string, unknown>;
    en: Record<string, unknown>;
    images: Record<string, string>;
};

type HeroContent = {
    badge: string;
    title: string;
    content: string;
};

type FeatureItem = { title: string; desc: string };

type ContactContent = { title: string; desc: string; btn: string };

interface BaitulMaalContentProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    savedContents: Record<string, unknown>;
}

const pageKeys = Object.keys(baitulMaalPageDefaults) as BaitulMaalPageKey[];

// Icon untuk setiap program
const programIcons: Record<BaitulMaalPageKey, React.ComponentType<{ className?: string }>> = {
    'baitul-maal': Heart,
    'pusat-jajanan-ramadhan': Star,
    'bahagia-1000-yatim-dhuafa': HeartHandshake,
    'peduli-bencana': Shield,
    'peduli-sosial-keagamaan': Users,
    'peduli-yatim-dhuafa': HeartHandshake,
    'bedah-rumah-bahagia': Home,
    'pemberdayaan-ekonomi': Banknote,
    'berbasis-masjid-alquran': Building2,
    'beasiswa-ustadz': GraduationCap,
    'cinta-masjid': Heart,
    'jumat-berkah': Sun,
    'tpq-ku': BookOpen,
    'pengembangan-amil-nadzir': Shield,
    'wakaf-mukena-alquran': BookOpen,
    'berbasis-mku': Home,
    'bina-siswa-cerdas': GraduationCap,
    'be-aktriyo': Star,
    'mku': Home,
    'peduli-kesehatan': Cross,
    'world-sight-day': Eye,
    'qurban': Gift,
    'khitan-ceria': Moon,
};

// Key yang dirender khusus di preview (selain ini dianggap seksi daftar biasa).
const specialKeys = ['title', 'heading', 'breadcrumb', 'hero', 'features', 'contact'];

/* ============================ PREVIEW ============================ */

function PreviewSection({ section }: { section: Record<string, unknown> }) {
    const title = typeof section.title === 'string' ? section.title : '';
    const intro =
        typeof section.intro === 'string'
            ? section.intro
            : typeof section.desc === 'string'
              ? section.desc
              : '';
    const items = Array.isArray(section.items) ? section.items : [];
    const note = typeof section.note === 'string' ? section.note : '';
    const nested = Object.entries(section).filter(
        ([key, value]) =>
            !['title', 'intro', 'desc', 'items', 'note'].includes(key) &&
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value),
    );

    return (
        <div className="rounded-xl border border-emerald-900/5 bg-white p-5 shadow-sm">
            {title && (
                <h3 className="mb-4 border-b border-emerald-900/5 pb-3 text-sm font-bold text-emerald-950">
                    {title}
                </h3>
            )}
            {intro && (
                <p className="mb-4 text-xs text-emerald-950/70">{intro}</p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item, i) =>
                    typeof item === 'string' ? (
                        <div key={i} className="flex items-center gap-3">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-3 w-3" />
                            </div>
                            <p className="text-[11px] font-semibold text-emerald-950/80">
                                {item}
                            </p>
                        </div>
                    ) : (
                        <div
                            key={i}
                            className="rounded-xl border border-emerald-900/5 bg-emerald-50/50 p-4"
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white">
                                    <Heart className="h-4 w-4" />
                                </div>
                                <h4 className="text-xs font-bold text-emerald-950">
                                    {(item as { name?: string; title?: string })
                                        .name ??
                                        (item as { title?: string }).title}
                                </h4>
                            </div>
                            <p className="text-[10px] leading-relaxed font-medium text-emerald-950/70">
                                {(item as { desc?: string }).desc}
                            </p>
                        </div>
                    ),
                )}
            </div>
            {nested.map(([key, value]) => (
                <div
                    key={key}
                    className="mt-4 rounded-xl bg-emerald-50/60 p-4 ring-1 ring-emerald-100"
                >
                    <PreviewNestedSection
                        section={value as Record<string, unknown>}
                    />
                </div>
            ))}
            {note && (
                <p className="mt-4 text-[10px] leading-relaxed font-medium text-emerald-950/60 italic">
                    {note}
                </p>
            )}
        </div>
    );
}

function PreviewNestedSection({
    section,
}: {
    section: Record<string, unknown>;
}) {
    const title = typeof section.title === 'string' ? section.title : '';
    const items = Array.isArray(section.items) ? section.items : [];
    const note = typeof section.note === 'string' ? section.note : '';

    return (
        <div>
            {title && (
                <h4 className="mb-3 text-xs font-bold text-emerald-900">
                    {title}
                </h4>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
                {items.map(
                    (item, i) =>
                        typeof item === 'string' && (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                                <p className="text-[10px] font-semibold text-emerald-950/80">
                                    {item}
                                </p>
                            </div>
                        ),
                )}
            </div>
            {note && (
                <p className="mt-3 text-[10px] leading-relaxed font-medium text-emerald-950/60 italic">
                    {note}
                </p>
            )}
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
    const c = draft[locale];
    const images = draft.images;
    const breadcrumb = c.breadcrumb as {
        home: string;
        baitulMaal?: string;
        financing?: string;
        savings?: string;
        current: string;
    };
    const hero = c.hero as HeroContent;
    const features = (c.features as FeatureItem[]) ?? [];
    const contact = c.contact as ContactContent | undefined;
    const sections = Object.entries(c).filter(
        ([key, value]) =>
            !specialKeys.includes(key) &&
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value),
    );

    return (
        <div className="space-y-5 bg-[#f8f9fa] p-4">
            {/* Header banner */}
            <div
                className="relative overflow-hidden py-8 text-center text-white"
                style={{
                    backgroundImage: `url('${images.banner}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 mx-auto flex flex-col items-center px-4">
                    <h1 className="mb-3 text-xl font-bold tracking-tight uppercase drop-shadow-md">
                        {(c.heading as string) || '—'}
                    </h1>
                    <nav className="flex items-center justify-center space-x-2 text-[9px] font-bold tracking-[0.2em] text-emerald-100/70 uppercase">
                        <span>{breadcrumb.home}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span>{breadcrumb.baitulMaal || breadcrumb.financing || breadcrumb.savings || 'Baitul Maal'}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="tracking-widest text-white">
                            {breadcrumb.current}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Hero box */}
            {hero && (
                <div className="rounded-2xl border-l-[6px] border-emerald-500 bg-emerald-800 p-5 text-white shadow-xl">
                    <h2 className="mb-2 text-[9px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                        {hero.badge}
                    </h2>
                    <h3 className="mb-4 text-lg leading-tight font-bold tracking-tight text-white">
                        {hero.title}
                    </h3>

                    {images.hero && (
                        <div className="relative mb-5 flex justify-center py-2">
                            <div className="absolute inset-x-8 top-4 bottom-2 rounded-full bg-emerald-400/25 blur-3xl" />
                            <img
                                src={images.hero}
                                alt={(c.heading as string) || ''}
                                className="relative max-h-52 w-auto -rotate-2 rounded-xl border-4 border-white/25 shadow-2xl"
                            />
                        </div>
                    )}

                    <p className="mb-5 text-xs leading-relaxed font-medium text-emerald-50">
                        {hero.content}
                    </p>

                    {features.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-white/10 bg-white/10 p-3"
                                >
                                    <div className="mb-2 text-emerald-300">
                                        <Heart className="h-4 w-4" />
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
                    )}
                </div>
            )}

            {/* Seksi daftar */}
            {sections.map(([key, value]) => (
                <PreviewSection
                    key={key}
                    section={value as Record<string, unknown>}
                />
            ))}

            {/* Kotak kontak */}
            {contact && (
                <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Phone className="h-6 w-6" />
                    </div>
                    <h4 className="border-b border-emerald-950/5 pb-2 text-xs font-bold tracking-widest text-emerald-950 uppercase">
                        {contact.title}
                    </h4>
                    <p className="mt-3 mb-4 text-xs leading-relaxed text-emerald-950/60">
                        {contact.desc}
                    </p>
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-lg shadow-green-500/20">
                        {contact.btn}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ============================ HALAMAN ============================ */

export default function BaitulMaalContentPage({
    savedContents,
}: BaitulMaalContentProps) {
    const [drafts, setDrafts] = useState<Record<string, PageDraft>>(() =>
        Object.fromEntries(
            pageKeys.map((key) => [
                key,
                deepMergeContent(
                    baitulMaalPageDefaults[key].defaults,
                    savedContents?.[key],
                ) as PageDraft,
            ]),
        ),
    );
    const [activePage, setActivePage] = useState<BaitulMaalPageKey>(
        pageKeys[0],
    );
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
        if (JSON.stringify(draft).includes('"blob:')) {
            toast.error('Tunggu upload gambar selesai dulu ya.');

            return;
        }

        setSaving(true);
        const toastId = toast.loading('Menyimpan konten...');

        router.put(
            `/dashboard/pages/content/baitul-maal/${activePage}`,
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
            <Head title="Konten Halaman Baitul Maal" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">
                                Konten Halaman Baitul Maal
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Edit teks dan gambar program sosial Baitul Maal dengan preview langsung.
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

                {/* Pilih halaman program - Grid 5 kolom */}
                <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">
                        Pilih Program yang Ingin Diedit:
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {pageKeys.map((key) => {
                        const Icon = programIcons[key];

                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActivePage(key)}
                                className={
                                    key === activePage
                                        ? 'flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-emerald-600 bg-emerald-600 px-3 py-4 text-center shadow-md transition-all hover:bg-emerald-700'
                                        : 'flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-4 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50'
                                }
                            >
                                <Icon className={key === activePage ? 'h-5 w-5 text-white' : 'h-5 w-5 text-emerald-600'} />
                                <span className={key === activePage ? 'text-xs font-semibold text-white' : 'text-xs font-medium text-slate-600'}>
                                    {baitulMaalPageDefaults[key].name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Halaman yang sedang diedit */}
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 border border-emerald-200">
                    <Heart className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-medium text-muted-foreground">Sedang diedit:</span>
                    <span className="text-sm font-bold text-emerald-700">
                        {baitulMaalPageDefaults[activePage].name}
                    </span>
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
                                href={`/${baitulMaalPageDefaults[activePage].slug}`}
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

                {/* Editor kiri + preview kanan */}
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
                                    {baitulMaalPageDefaults[activePage].name} —{' '}
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

                        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>
                                Konten program sosial Baitul Maal dapat diedit di sini. Perubahan akan tampil langsung di halaman website.
                            </p>
                        </div>

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
                                    : `Simpan ${baitulMaalPageDefaults[activePage].name}`}
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
                        <div className="max-h-[85vh] overflow-y-auto rounded-2xl border shadow-inner">
                            <PagePreview draft={draft} locale={activeLocale} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
