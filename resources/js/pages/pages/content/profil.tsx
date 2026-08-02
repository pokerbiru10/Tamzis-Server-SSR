import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Compass,
    ExternalLink,
    FileText,
    Heart,
    HeartHandshake,
    History,
    Image as ImageIcon,
    Mountain,
    Phone,
    Save,
    Scale,
    ShieldCheck,
    Trophy,
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
    profilePageDefaults
    
} from '@/content/profile-page-defaults';
import type {
    companyProfileDefaults,
    corporateCultureDefaults,
    legalitasDefaults,
    penghargaanDefaults,
    visiMisiDefaults} from '@/content/profile-page-defaults';
import type {ProfilePageKey} from '@/content/profile-page-defaults';
import { deepMergeContent } from '@/hooks/use-profile-page-content';

type PageDraft = {
    id: Record<string, unknown>;
    en: Record<string, unknown>;
    images: Record<string, string>;
};

interface ProfilContentProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    savedContents: Record<string, unknown>;
}

const pageKeys = Object.keys(profilePageDefaults) as ProfilePageKey[];

/* ============================ PREVIEW ============================ */
/* Replika tampilan halaman publik, ikut berubah saat form diketik. */

function PreviewHeader({
    heading,
    breadcrumb,
}: {
    heading: string;
    breadcrumb: { home: string; profile: string; current: string };
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
                    <span>{breadcrumb.profile}</span>
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

const detailIcons = [Scale, FileText, ShieldCheck, CheckCircle2];
const lifeIcons = [BookOpen, ShieldCheck, HeartHandshake, Mountain];

function PreviewLegalList({
    badge,
    title,
    items,
    icon: Icon,
}: {
    badge: string;
    title: string;
    items: Array<{ label: string; value: string }>;
    icon: typeof Scale;
}) {
    return (
        <div>
            <div className="mb-4 text-center">
                <span className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-[9px] font-bold tracking-widest text-emerald-700 uppercase">
                    {badge}
                </span>
                <h2 className="text-lg font-bold text-emerald-950">{title}</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-emerald-900/5 bg-white shadow-sm">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-4 py-3 ${
                            index !== items.length - 1
                                ? 'border-b border-emerald-900/5'
                                : ''
                        }`}
                    >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <Icon className="h-4 w-4" />
                        </div>
                        <div>
                            <div className="text-[9px] font-bold tracking-widest text-emerald-950/50 uppercase">
                                {item.label}
                            </div>
                            <div className="text-xs font-bold text-emerald-950">
                                {item.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PagePreview({
    pageKey,
    draft,
    locale,
}: {
    pageKey: ProfilePageKey;
    draft: PageDraft;
    locale: 'id' | 'en';
}) {
    const images = draft.images;

    if (pageKey === 'company-profile') {
        const c = draft[locale] as typeof companyProfileDefaults.id;

        return (
            <div className="space-y-5 bg-[#f8f9fa] p-4">
                <PreviewHeader heading={c.heading} breadcrumb={c.breadcrumb} />
                <PreviewGreenIntro
                    badge={c.intro.badge}
                    title={c.intro.title}
                    image={images.intro}
                    paragraphs={[
                        c.intro.content1,
                        c.intro.content2,
                        c.intro.content3,
                        c.intro.content4,
                    ]}
                />
                <div className="rounded-3xl border border-emerald-900/5 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                            <History className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-bold text-emerald-950">
                            {c.journey.title}
                        </h3>
                    </div>
                    <div className="space-y-3 text-xs leading-relaxed font-medium text-emerald-950/80">
                        <p>{c.journey.content1}</p>
                        <p>{c.journey.content2}</p>
                        <p>{c.journey.content3}</p>
                    </div>
                </div>
                <PreviewContactBox contact={c.contact} />
            </div>
        );
    }

    if (pageKey === 'legalitas') {
        const c = draft[locale] as typeof legalitasDefaults.id;

        return (
            <div className="space-y-6 bg-[#f8f9fa] p-4">
                <PreviewHeader heading={c.heading} breadcrumb={c.breadcrumb} />
                <div className="text-center">
                    <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-[9px] font-bold tracking-widest text-emerald-700 uppercase">
                        {c.main.badge}
                    </span>
                    <h2 className="mb-3 text-lg leading-tight font-bold text-emerald-950">
                        {c.main.title}
                    </h2>
                    <p className="text-xs leading-relaxed font-medium text-slate-600">
                        {c.main.content}
                    </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {c.details.map((item, index) => {
                        const Icon = detailIcons[index % detailIcons.length];

                        return (
                            <div
                                key={index}
                                className="rounded-2xl border border-emerald-900/5 bg-white p-4 shadow-sm"
                            >
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <h3 className="mb-1.5 text-xs font-bold text-emerald-950">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] leading-relaxed font-medium text-slate-500">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <PreviewLegalList
                    badge={c.legalTamzis.badge}
                    title={c.legalTamzis.title}
                    items={c.legalTamzis.items}
                    icon={Scale}
                />
                <PreviewLegalList
                    badge={c.baitulMaal.badge}
                    title={c.baitulMaal.title}
                    items={c.baitulMaal.items}
                    icon={Heart}
                />
                <div className="rounded-2xl bg-emerald-950 p-5 text-white shadow-2xl">
                    <h3 className="mb-2 text-sm font-bold">{c.official.title}</h3>
                    <p className="text-base font-bold tracking-tight text-emerald-400 uppercase">
                        {c.official.value}
                    </p>
                </div>
                <PreviewContactBox contact={c.contact} />
            </div>
        );
    }

    if (pageKey === 'visi-misi') {
        const c = draft[locale] as typeof visiMisiDefaults.id;

        return (
            <div className="space-y-5 bg-[#f8f9fa] p-4">
                <PreviewHeader heading={c.heading} breadcrumb={c.breadcrumb} />
                <PreviewGreenIntro
                    badge={c.intro.badge}
                    title={c.intro.title}
                    image={images.intro}
                    paragraphs={[c.intro.content1]}
                />
                <div className="relative overflow-hidden rounded-3xl border border-emerald-900/5 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                            <Compass className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-bold text-emerald-950">
                            {c.visi.title}
                        </h3>
                    </div>
                    <p className="text-xs leading-relaxed font-semibold text-emerald-900">
                        {c.visi.content}
                    </p>
                </div>
                <div className="rounded-3xl border border-emerald-900/5 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-bold text-emerald-950">
                            {c.misi.title}
                        </h3>
                    </div>
                    <ul className="space-y-3">
                        {c.misi.items.map((misi, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600">
                                    {idx + 1}
                                </div>
                                <p className="text-xs leading-relaxed font-medium text-emerald-950/80">
                                    {misi}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <PreviewContactBox contact={c.contact} />
            </div>
        );
    }

    if (pageKey === 'corporate-culture') {
        const c = draft[locale] as typeof corporateCultureDefaults.id;

        return (
            <div className="space-y-5 bg-[#f8f9fa] p-4">
                <PreviewHeader heading={c.heading} breadcrumb={c.breadcrumb} />
                <div className="rounded-2xl border border-emerald-900/5 bg-white p-5 shadow-sm">
                    <div className="mb-5">
                        <h2 className="mb-2 text-[9px] font-bold tracking-[0.2em] text-emerald-700 uppercase">
                            {c.intro.badge}
                        </h2>
                        <h3 className="text-lg font-bold tracking-tight text-emerald-950">
                            {c.intro.title}
                        </h3>
                    </div>
                    {images.logo && (
                        <img
                            src={images.logo}
                            alt={c.intro.title}
                            className="mx-auto mb-4 block w-full max-w-[300px]"
                        />
                    )}
                </div>
                <div className="space-y-3">
                    {c.life.map((item, index) => {
                        const Icon = lifeIcons[index % lifeIcons.length];

                        return (
                            <div
                                key={index}
                                className="flex items-center gap-4 rounded-3xl border border-emerald-900/5 bg-white p-4 shadow-sm"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-emerald-50 text-xl font-bold text-emerald-600">
                                    {item.letter}
                                </div>
                                <div className="flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <Icon className="h-3.5 w-3.5 text-emerald-500" />
                                        <h3 className="text-xs font-bold tracking-wider text-emerald-950 uppercase">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-[10px] leading-relaxed font-medium text-emerald-950/70">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <PreviewContactBox contact={c.contact} />
            </div>
        );
    }

    // penghargaan
    const c = draft[locale] as typeof penghargaanDefaults.id;

    return (
        <div className="space-y-5 bg-[#f8f9fa] p-4">
            <PreviewHeader heading={c.heading} breadcrumb={c.breadcrumb} />
            <PreviewGreenIntro
                badge={c.intro.badge}
                title={c.intro.title}
                paragraphs={[c.intro.content1]}
            />
            <div className="rounded-3xl border border-emerald-900/5 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-50 text-yellow-600">
                        <Trophy className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-emerald-950">
                        {c.awards.title}
                    </h3>
                </div>
                <div className="space-y-2">
                    {c.awards.items.map((award, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-md p-2">
                            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                                <Award className="h-3.5 w-3.5" />
                            </div>
                            <p className="flex-1 pt-1 text-[10px] leading-relaxed font-medium text-emerald-950/80">
                                {award}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-3xl border border-emerald-900/5 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                        <ImageIcon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-emerald-950">
                        {c.gallery.title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {c.gallery.items.map((photo, idx) => {
                        const featured = idx === 0;

                        return (
                            <div
                                key={idx}
                                className={`relative overflow-hidden rounded-2xl shadow-md ${
                                    featured ? 'col-span-2' : ''
                                }`}
                            >
                                <div
                                    className={`relative overflow-hidden ${
                                        featured
                                            ? 'aspect-[21/10]'
                                            : 'aspect-[3/4]'
                                    }`}
                                >
                                    {photo.src && (
                                        <img
                                            src={photo.src}
                                            alt={photo.label}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent" />
                                    <p className="absolute inset-x-0 bottom-0 p-3 text-[10px] font-bold tracking-tight text-white drop-shadow">
                                        {photo.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <PreviewContactBox contact={c.contact} />
        </div>
    );
}

/* ============================ HALAMAN ============================ */

export default function ProfilContent({ savedContents }: ProfilContentProps) {
    const [drafts, setDrafts] = useState<Record<string, PageDraft>>(() =>
        Object.fromEntries(
            pageKeys.map((key) => [
                key,
                deepMergeContent(
                    profilePageDefaults[key].defaults,
                    savedContents?.[key],
                ) as PageDraft,
            ]),
        ),
    );
    const [activePage, setActivePage] = useState<ProfilePageKey>(pageKeys[0]);
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
            <Head title="Konten Halaman Profil" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">
                                Konten Halaman Profil
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Edit teks dan gambar halaman profil dengan preview langsung, seperti di WordPress.
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
                            {profilePageDefaults[key].name}
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
                                    {profilePageDefaults[activePage].name} —{' '}
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
                                {saving
                                    ? 'Menyimpan...'
                                    : `Simpan ${profilePageDefaults[activePage].name}`}
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
                                pageKey={activePage}
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
