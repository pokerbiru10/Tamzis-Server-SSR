import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import type {
    simpananIjabahDefaults} from '@/content/simpanan-page-defaults';
import {
    simpananMenuFallback,
} from '@/content/simpanan-page-defaults';
import { useProfilePageContent } from '@/hooks/use-profile-page-content';

type SimpananContent = Omit<typeof simpananIjabahDefaults.id, 'advantages'> & {
    advantages?: { title: string; items: string[] };
};

type IjabahRate = {
    periode?: string;
    bulan1?: string;
    bulan2?: string;
    bulan3?: string;
    result?: Array<{
        jangka: string;
        nisbah: string;
        rate: Array<{ value: string }>;
    }>;
};

// Data fallback tabel imbal hasil jika API gagal.
const fallbackRates: IjabahRate = {
    periode: 'Periode Berlaku',
    bulan1: '1 Bulan',
    bulan2: '3 Bulan',
    bulan3: '6 Bulan',
    result: [
        { jangka: '3 Bulan', nisbah: '60:40', rate: [{ value: 'Rp 6.500' }, { value: 'Rp 7.000' }, { value: 'Rp 7.500' }] },
        { jangka: '6 Bulan', nisbah: '60:40', rate: [{ value: 'Rp 7.000' }, { value: 'Rp 7.500' }, { value: 'Rp 8.000' }] },
        { jangka: '12 Bulan', nisbah: '60:40', rate: [{ value: 'Rp 7.500' }, { value: 'Rp 8.000' }, { value: 'Rp 8.500' }] },
    ],
};

function IjabahRatesTable({ isEn }: { isEn: boolean }) {
    const [rates, setRates] = useState<IjabahRate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/ijabah-rate')
            .then((res) => res.json())
            .then((data) => {
                if (data.status && data.data) {
                    setRates(data.data);
                } else {
                    setRates(fallbackRates);
                    setError(data.message || 'Menggunakan data terakhir yang tersedia');
                }
            })
            .catch(() => {
                setRates(fallbackRates);
                setError('Menggunakan data terakhir yang tersedia');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
            <h3 className="mb-4 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                {isEn ? 'Ijabah Returns' : 'Imbal Hasil Ijabah'}
            </h3>
            {rates?.periode && (
                <p className="mb-2 text-sm text-emerald-950/70">
                    {isEn ? 'Period' : 'Periode'}: {rates.periode}
                </p>
            )}
            <p className="mb-6 text-sm font-semibold text-emerald-950">
                {isEn
                    ? 'Per Rp. 1,000,000 (One Million Rupiah)'
                    : 'Per Rp. 1.000.000 (Satu Juta Rupiah)'}
            </p>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
                    <span className="ml-3 text-sm text-emerald-950/60">
                        {isEn ? 'Loading...' : 'Memuat data...'}
                    </span>
                </div>
            ) : rates?.result ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-emerald-900/10 bg-emerald-50">
                                <th className="px-4 py-3 text-left font-bold text-emerald-950">
                                    {isEn
                                        ? 'Term (Member Share)'
                                        : 'Jangka Waktu (Nisbah Anggota)'}
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-emerald-950">
                                    {rates.bulan1 || '1 Bulan'}
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-emerald-950">
                                    {rates.bulan2 || '3 Bulan'}
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-emerald-950">
                                    {rates.bulan3 || '6 Bulan'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rates.result.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-emerald-900/5 hover:bg-emerald-50/50"
                                >
                                    <td className="px-4 py-3 font-semibold text-emerald-950">
                                        {item.jangka}{' '}
                                        <span className="text-emerald-600">
                                            ({item.nisbah})
                                        </span>
                                    </td>
                                    {item.rate.map((r, j) => (
                                        <td
                                            key={j}
                                            className="px-4 py-3 text-center font-medium text-emerald-950/80"
                                        >
                                            {r.value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {error && (
                        <p className="mt-3 text-center text-xs text-amber-600">
                            ⚠️ {error}
                        </p>
                    )}
                </div>
            ) : null}
        </div>
    );
}

function CheckList({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
            <h3 className="mb-8 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                {title}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-semibold text-emerald-950/80">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface SimpananPageProps {
    pageKey: string;
    defaults: { id: unknown; en: unknown; images: Record<string, string> };
    featureIcons: ComponentType<{ className?: string }>[];
    heroImageLink?: string;
    showIjabahRates?: boolean;
}

// Layout bersama halaman produk simpanan. Konten (teks & gambar) dikelola dari
// dashboard (Konten Halaman Simpanan) dan diambil via AJAX.
export function SimpananPage({
    pageKey,
    defaults,
    featureIcons,
    heroImageLink,
    showIjabahRates = false,
}: SimpananPageProps) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const lang = locale === 'en' ? 'en' : 'id';
    const isEn = locale === 'en';

    const { t: content, images } = useProfilePageContent(
        pageKey,
        defaults as {
            id: unknown;
            en: unknown;
            images: Record<string, string>;
        },
        locale,
    );
    const t = content as SimpananContent;
    const menuFallback = simpananMenuFallback[lang];

    const heroImage = (
        <ImageWithFallback
            src={images.hero}
            alt={t.heading}
            className="max-h-80 w-auto rounded-xl border-4 border-white/25 shadow-2xl"
        />
    );

    let heroImageBlock: ReactNode;

    if (heroImageLink) {
        heroImageBlock = (
            <a
                href={heroImageLink}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-block -rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]"
                title={t.heading}
            >
                {heroImage}
                <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-emerald-900 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                    Instagram ↗
                </span>
            </a>
        );
    } else {
        heroImageBlock = (
            <div className="group relative inline-block -rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]">
                {heroImage}
            </div>
        );
    }

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                {/* Page Title */}
                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${images.banner}')`,
                        }}
                    />

                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase drop-shadow-md sm:text-4xl">
                            {t.heading}
                        </h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/70 uppercase">
                            <Link
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                {t.breadcrumb.home}
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <span>{t.breadcrumb.savings}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
                    <div className="grid items-start gap-12 lg:grid-cols-3">
                        {/* Main Column */}
                        <div className="space-y-10 lg:col-span-2">
                            {/* Hero Box */}
                            <div className="rounded-2xl border-l-[8px] border-emerald-500 bg-emerald-800 p-8 text-white shadow-xl sm:p-12">
                                <div className="mb-8">
                                    <h2 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                                        {t.hero.badge}
                                    </h2>
                                    <h3 className="mb-8 text-xl leading-tight font-bold tracking-tight text-white sm:text-3xl">
                                        {t.hero.title}
                                    </h3>

                                    <div className="relative mb-10 flex justify-center py-4 sm:justify-start">
                                        <div className="absolute inset-x-8 top-6 bottom-2 rounded-full bg-emerald-400/25 blur-3xl" />
                                        {heroImageBlock}
                                    </div>
                                </div>

                                <p className="mb-8 text-base leading-relaxed font-medium text-emerald-50">
                                    {t.hero.content}
                                </p>

                                <div className="grid gap-6 sm:grid-cols-3">
                                    {t.features.map((feature, i) => {
                                        const Icon =
                                            featureIcons[
                                                i % featureIcons.length
                                            ];

                                        return (
                                            <div
                                                key={i}
                                                className="rounded-lg border border-white/10 bg-white/10 p-5"
                                            >
                                                <div className="mb-3 text-emerald-300">
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <h4 className="mb-2 text-xs font-bold text-white">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-[10px] leading-relaxed text-emerald-100/70">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Details List */}
                            <CheckList
                                title={t.details.title}
                                items={t.details.items}
                            />

                            {/* Advantages (opsional, mis. Ijabah) */}
                            {t.advantages && (
                                <CheckList
                                    title={t.advantages.title}
                                    items={t.advantages.items}
                                />
                            )}

                            {/* Tabel imbal hasil (khusus Ijabah, dari API) */}
                            {showIjabahRates && <IjabahRatesTable isEn={isEn} />}
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            {/* Nav Menu - dikelola dari dashboard (Menu Halaman) */}
                            <SidebarMenuNav
                                group="simpanan"
                                locale={locale}
                                activeUrl={`/${pageKey}`}
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
