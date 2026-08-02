import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Clock,
    ShieldCheck,
    HeartHandshake,
    CheckCircle2,
    ArrowRight,
    Phone,
} from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { pembiayaanMenuFallback } from '@/content/pembiayaan-page-defaults';

export default function Kafalah() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = pembiayaanMenuFallback[lang];

    const translations = {
        id: {
            title: 'Kafalah (Sosial) - TAMZIS Bina Utama',
            heading: 'Kafalah (Sosial)',
            breadcrumb: {
                home: 'Beranda',
                financing: 'Pembiayaan',
                current: 'Kafalah',
            },
            hero: {
                badge: 'Layanan Sosial',
                title: 'Pembiayaan Kafalah (Sosial)',
                content:
                    "Kafalah adalah layanan jaminan atau tanggungan yang diberikan oleh KSPPS TAMZIS Bina Utama untuk membantu anggota dalam hal penyelesaian suatu kewajiban. Dilandasi oleh semangat saling tolong menolong (Ta'awun) yang sangat dianjurkan dalam Islam.",
            },
            features: [
                {
                    title: 'Tolok Ukur Kepedulian',
                    desc: "Berbasis akad tabarru' (sosial) untuk membantu sesama anggota koperasi yang sedang membutuhkan jaminan.",
                    icon: HeartHandshake,
                },
                {
                    title: 'Jaminan Terpercaya',
                    desc: 'TAMZIS bertindak sebagai penjamin yang amanah atas kewajiban yang ditanggung oleh anggota.',
                    icon: ShieldCheck,
                },
                {
                    title: 'Proses Mudah',
                    desc: 'Persyaratan yang transparan, mudah, dan sangat mengedepankan asas kekeluargaan.',
                    icon: CheckCircle2,
                },
            ],
            details: {
                title: 'Keunggulan Layanan Kafalah',
                items: [
                    'Memberikan rasa aman bagi pihak-pihak yang sedang bertransaksi.',
                    'Dikelola sesuai dengan prinsip-prinsip Syariah murni (tanpa unsur riba).',
                    'Dukungan penuh dari institusi keuangan terpercaya (TAMZIS).',
                    'Solusi perlindungan finansial berbasis nilai-nilai sosial Islami.',
                ],
            },
            sidebar: {
                title: 'Produk Pembiayaan',
                menu: [
                    { label: 'Ikhtiar Utama (Mudharabah)', url: '/ikhtiar-utama' },
                    { label: 'Murabahah (Jual Beli)', url: '/murabahah' },
                    { label: 'Kafalah (Sosial)', url: '/kafalah' },
                    { label: 'Porsi Haji', url: '/porsi-haji' },
                    { label: 'Griya Tumbuh Bahagia', url: '/rumah-tumbuh-bahagia' },
                ],
                contact: {
                    title: 'Tanya Tentang Layanan',
                    desc: 'Ingin tahu lebih lanjut tentang layanan Kafalah Sosial? Tim kami siap membantu Anda.',
                    btn: 'Hubungi Kami',
                },
            },
        },
        en: {
            title: 'Kafalah (Social) - TAMZIS Bina Utama',
            heading: 'Kafalah (Social Guarantee)',
            breadcrumb: {
                home: 'Home',
                financing: 'Financing',
                current: 'Kafalah',
            },
            hero: {
                badge: 'Social Service',
                title: 'Kafalah (Social) Financing',
                content:
                    "Kafalah is a guarantee or underwriting service provided by KSPPS TAMZIS Bina Utama to help members fulfill a specific obligation. It is based on the spirit of mutual assistance (Ta'awun) which is highly recommended in Islam.",
            },
            features: [
                {
                    title: 'Symbol of Care',
                    desc: "Based on the tabarru' (social/charity) contract to help fellow cooperative members who need a guarantee.",
                    icon: HeartHandshake,
                },
                {
                    title: 'Trusted Guarantee',
                    desc: 'TAMZIS acts as a trustworthy guarantor for the obligations borne by the member.',
                    icon: ShieldCheck,
                },
                {
                    title: 'Easy Process',
                    desc: 'Transparent, easy requirements that highly prioritize the principle of kinship.',
                    icon: CheckCircle2,
                },
            ],
            details: {
                title: 'Advantages of Kafalah Services',
                items: [
                    'Provides a sense of security for transacting parties.',
                    'Managed in accordance with pure Sharia principles (without riba).',
                    'Full support from a trusted financial institution (TAMZIS).',
                    'Financial protection solution based on Islamic social values.',
                ],
            },
            sidebar: {
                title: 'Financing Products',
                menu: [
                    { label: 'Ikhtiar Utama (Mudharabah)', url: '/ikhtiar-utama' },
                    { label: 'Murabahah (Buying & Selling)', url: '/murabahah' },
                    { label: 'Kafalah (Social)', url: '/kafalah' },
                    { label: 'Hajj Portion', url: '/porsi-haji' },
                    { label: 'Griya Tumbuh Bahagia', url: '/rumah-tumbuh-bahagia' },
                ],
                contact: {
                    title: 'Ask About Services',
                    desc: 'Want to know more about Social Kafalah services? Our team is ready to help you.',
                    btn: 'Contact Us',
                },
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
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/kafalah.jpg')",
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
                            <span>{t.breadcrumb.financing}</span>
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

                                    <div className="group relative mb-10 overflow-hidden rounded-xl border-4 border-white/20 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                                        <div className="absolute inset-0 z-10 bg-emerald-950/20 transition-colors group-hover:bg-transparent" />
                                        <ImageWithFallback
                                            src="/assets/img/pembiayaan/kafalah-utama.jpg"
                                            alt={t.heading}
                                            aspectRatio="video"
                                        />
                                    </div>
                                </div>

                                <p className="text-base leading-relaxed font-medium text-emerald-50">
                                    {t.hero.content}
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid gap-6 sm:grid-cols-3">
                                {t.features.map((feature, i) => (
                                    <div
                                        key={i}
                                        className="group rounded-xl border border-emerald-900/5 bg-white p-6 shadow-sm transition-colors hover:border-emerald-500"
                                    >
                                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition-all group-hover:bg-emerald-700 group-hover:text-white">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <h4 className="mb-2 text-sm font-bold text-emerald-950">
                                            {feature.title}
                                        </h4>
                                        <p className="text-xs leading-relaxed font-medium text-emerald-950/60">
                                            {feature.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Benefits List */}
                            <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="mb-8 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                                    {t.details.title}
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {t.details.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4"
                                        >
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
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
                                            ? 'Try our Kafalah financing simulation calculator'
                                            : 'Coba kalkulator simulasi pembiayaan Kafalah kami'}
                                    </p>
                                </div>
                                <Link
                                    href="/simulasi-kafalah"
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
                            {/* Product List */}
                            <SidebarMenuNav
                                group="pembiayaan"
                                locale={locale}
                                activeUrl="/kafalah"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            {/* Contact Box */}
                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">
                                    {t.sidebar.contact.title}
                                </h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">
                                    {t.sidebar.contact.desc}
                                </p>
                                <a
                                    href="https://wa.me/628112613134?text=Halo Marketing Tamzis, saya tertarik dengan Layanan Kafalah. Mohon informasinya."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    <svg
                                        className="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.01-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    {t.sidebar.contact.btn}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
