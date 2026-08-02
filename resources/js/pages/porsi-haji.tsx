import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Plane,
    ShieldCheck,
    HeartHandshake,
    CheckCircle2,
    Phone,
    ArrowRight,
} from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { pembiayaanMenuFallback } from '@/content/pembiayaan-page-defaults';

export default function PorsiHajiUmroh() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = pembiayaanMenuFallback[lang];

    const translations = {
        id: {
            title: 'Porsi Haji - TAMZIS Bina Utama',
            heading: 'Porsi Haji',
            breadcrumb: {
                home: 'Beranda',
                savings: 'Simpanan',
                current: 'Haji',
            },
            hero: {
                badge: 'Niat Suci ke Tanah Suci',
                title: 'Wujudkan Ibadah Impian Anda',
                content:
                    'Pembiayaan yang dikhususkan untuk talangan porsi haji. Besar Pembiayaan maksimal senilai Rp 20 juta. Uang muka (Urbun) senilai Rp 5 juta. Akad yang digunakan Qordh dan Ijaroh.',
            },
            features: [
                {
                    title: 'Talangan Porsi Haji',
                    desc: 'Pembiayaan khusus untuk mendapatkan porsi haji dengan cicilan ringan.',
                    icon: Plane,
                },
                {
                    title: 'Pembiayaan Maksimal Rp 20 Juta',
                    desc: 'Besar pembiayaan maksimal senilai Rp 20.000.000,- untuk kebutuhan porsi haji Anda.',
                    icon: ShieldCheck,
                },
                {
                    title: 'Urbun Rp 5 Juta',
                    desc: 'Uang muka (Urbun) senilai Rp 5.000.000,- untuk memulai pembiayaan.',
                    icon: CheckCircle2,
                },
            ],
            tujuan: {
                title: 'Tujuan dan Manfaat',
                items: [
                    'Memberikan kemudahan kepada anggota TAMZIS dalam melaksanakan ibadah haji.',
                    'Memberikan kepastian keberangkatan Ibadah Haji tanpa dibayang-bayangi kekhawatiran kehabisan quota porsi haji.',
                    'Memudahkan dalam hal pembayaran cicilan dana talangan, karena jangka waktu sampai tiga tahun.',
                ],
            },
            akad: {
                title: 'Akad',
                intro: 'Pembiayaan Talangan Haji TAMZIS ini menggunakan akad Ijaroh wal Qordh.',
                items: [
                    {
                        name: 'Ijaroh',
                        desc: 'Akad pemindahan hak guna (manfaat) atas suatu barang atau jasa dalam waktu tertentu melalui pembayaran sewa/upah, tanpa diikuti dengan pemindahan kepemilikan barang itu sendiri. Dalam akad ijaroh tidak ada perubahan kepemilikan, hanya pemindahan hak guna dari yang menyewakan kepada penyewa.',
                    },
                    {
                        name: 'Qordh',
                        desc: 'Akad perjanjian pinjam-meminjam dari seseorang atau lembaga (muqtaridh) yang wajib dikembalikan dengan jumlah yang sama selama jangka waktu yang telah ditentukan, dengan tujuan saling tolong-menolong tanpa mengharapkan imbalan (non-profit oriented transaction).',
                    },
                ],
            },
            details: {
                title: 'Ketentuan Pembiayaan',
                items: [
                    'Akad yang digunakan adalah Qordh dan Ijaroh.',
                    'Pembiayaan dikhususkan untuk talangan porsi haji.',
                    'Besar pembiayaan maksimal senilai Rp 20.000.000,-.',
                    'Uang muka (Urbun) senilai Rp 5.000.000,-.',
                    'Cicilan dapat disesuaikan dengan kemampuan anggota.',
                    'Pembiayaan dapat dicairkan saat pendaftaran porsi haji.',
                ],
            },
            sidebar: {
                title: 'Produk Pembiayaan',
                menu: [
                    { label: 'Mudharabah (Modal Usaha)', url: '/ikhtiar-utama' },
                    { label: 'Murabahah (Jual Beli)', url: '/murabahah' },
                    { label: 'Kafalah (Sosial)', url: '/kafalah' },
                    { label: 'Porsi Haji', url: '/porsi-haji' },
                    { label: 'Griya Tumbuh Bahagia', url: '/rumah-tumbuh-bahagia' },
                ],
            },
        },
        en: {
            title: 'Hajj Portion - TAMZIS Bina Utama',
            heading: 'Hajj Portion',
            breadcrumb: {
                home: 'Home',
                savings: 'Savings',
                current: 'Hajj',
            },
            hero: {
                badge: 'Sacred Intention to Holy Land',
                title: 'Realize Your Dream Worship',
                content:
                    'Financing specifically designated for hajj portion advances. Maximum financing amount of Rp 20 million. Down payment (Urbun) of Rp 5 million. Contracts used are Qordh and Ijaroh.',
            },
            features: [
                {
                    title: 'Hajj Portion Advance',
                    desc: 'Specific financing to obtain hajj portion with easy installments.',
                    icon: Plane,
                },
                {
                    title: 'Maximum Financing Rp 20 Million',
                    desc: 'Maximum financing amount of Rp 20,000,000,- for your hajj portion needs.',
                    icon: ShieldCheck,
                },
                {
                    title: 'Urbun Rp 5 Million',
                    desc: 'Down payment (Urbun) of Rp 5,000,000,- to start financing.',
                    icon: CheckCircle2,
                },
            ],
            tujuan: {
                title: 'Purpose and Benefits',
                items: [
                    'Providing convenience for TAMZIS members in performing the hajj pilgrimage.',
                    'Providing certainty of Hajj departure without worrying about running out of hajj portion quota.',
                    'Easing the installment payments of the advance funds, with a term of up to three years.',
                ],
            },
            akad: {
                title: 'Contract',
                intro: 'This TAMZIS Hajj Advance Financing uses the Ijaroh wal Qordh contract.',
                items: [
                    {
                        name: 'Ijaroh',
                        desc: 'A contract transferring the right of use (benefit) of goods or services for a certain period through rental/fee payments, without transferring ownership of the goods themselves. In an ijaroh contract there is no change of ownership, only a transfer of the right of use from the lessor to the lessee.',
                    },
                    {
                        name: 'Qordh',
                        desc: 'A lending agreement from a person or institution (muqtaridh) that must be repaid in the same amount within a specified period, with the aim of mutual help without expecting any reward (non-profit oriented transaction).',
                    },
                ],
            },
            details: {
                title: 'Financing Terms',
                items: [
                    'Contracts used are Qordh and Ijaroh.',
                    'Financing is specifically designated for hajj portion advances.',
                    'Maximum financing amount of Rp 20,000,000,-.',
                    'Down payment (Urbun) of Rp 5,000,000,-.',
                    'Installments can be adjusted to member capabilities.',
                    'Financing can be disbursed when registering for hajj portion.',
                ],
            },
            sidebar: {
                title: 'Financing Products',
                menu: [
                    { label: 'Mudharabah (Business Capital)', url: '/ikhtiar-utama' },
                    { label: 'Murabahah (Buying & Selling)', url: '/murabahah' },
                    { label: 'Kafalah (Social)', url: '/kafalah' },
                    { label: 'Hajj Portion', url: '/porsi-haji' },
                    { label: 'Griya Tumbuh Bahagia', url: '/rumah-tumbuh-bahagia' },
                ],
            },
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                {/* Page Title */}
                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/Pembiayaan Umroh.jpg')",
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
                                        <div className="group relative inline-block -rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]">
                                            <ImageWithFallback
                                                src="/assets/img/menu/porsi-haji.png"
                                                alt={t.heading}
                                                className="max-h-80 w-auto rounded-xl border-4 border-white/25 shadow-2xl"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="mb-8 text-base leading-relaxed font-medium text-emerald-50">
                                    {t.hero.content}
                                </p>

                                <div className="grid gap-6 sm:grid-cols-3">
                                    {t.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="rounded-lg border border-white/10 bg-white/10 p-5"
                                        >
                                            <div className="mb-3 text-emerald-300">
                                                <feature.icon className="h-6 w-6" />
                                            </div>
                                            <h4 className="mb-2 text-xs font-bold text-white">
                                                {feature.title}
                                            </h4>
                                            <p className="text-[10px] leading-relaxed text-emerald-100/70">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tujuan dan Manfaat */}
                            <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="mb-8 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                                    {t.tujuan.title}
                                </h3>
                                <div className="space-y-5">
                                    {t.tujuan.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <p className="text-sm font-semibold text-emerald-950/80">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Akad */}
                            <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="mb-4 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                                    {t.akad.title}
                                </h3>
                                <p className="mb-8 text-sm font-semibold text-emerald-950/80">
                                    {t.akad.intro}
                                </p>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {t.akad.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="rounded-xl border border-emerald-900/5 bg-emerald-50/50 p-6"
                                        >
                                            <div className="mb-3 flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white">
                                                    <HeartHandshake className="h-5 w-5" />
                                                </div>
                                                <h4 className="text-base font-bold text-emerald-950">
                                                    {item.name}
                                                </h4>
                                            </div>
                                            <p className="text-xs leading-relaxed font-medium text-emerald-950/70">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="mb-8 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                                    {t.details.title}
                                </h3>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {t.details.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4"
                                        >
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

                            {/* Simulation CTA */}
                            <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-emerald-950 p-8 text-white shadow-xl sm:flex-row sm:p-12">
                                <div className="text-center sm:text-left">
                                    <h3 className="mb-3 text-xl font-bold">
                                        {isEn
                                            ? 'Plan Your Installment'
                                            : 'Rencanakan Angsuran Anda'}
                                    </h3>
                                    <p className="text-sm font-medium text-emerald-300">
                                        {isEn
                                            ? 'Try our Porsi Haji financing simulation calculator'
                                            : 'Coba kalkulator simulasi pembiayaan Porsi Haji kami'}
                                    </p>
                                </div>
                                <Link
                                    href="/simulasi-haji"
                                    className="flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-emerald-900 transition-all hover:bg-emerald-50"
                                >
                                    {isEn
                                        ? 'Go to Simulation'
                                        : 'Buka Simulasi'}{' '}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            <SidebarMenuNav
                                group="pembiayaan"
                                locale={locale}
                                activeUrl="/porsi-haji"
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
