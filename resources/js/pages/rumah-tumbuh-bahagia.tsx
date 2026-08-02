import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Home,
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

export default function RumahTumbuhBahagia() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = pembiayaanMenuFallback[lang];

    const translations = {
        id: {
            title: 'Griya Tumbuh Bahagia (GTB) - TAMZIS Bina Utama',
            heading: 'Griya Tumbuh Bahagia',
            breadcrumb: {
                home: 'Beranda',
                savings: 'Pembiayaan',
                current: 'Griya Tumbuh Bahagia',
            },
            hero: {
                badge: 'Solusi Rumah Syariah',
                title: 'Mau Punya Rumah Mudah Tanpa Ribet? Bisa!',
                content:
                    'Griya Tumbuh Bahagia adalah pembiayaan syariah untuk renovasi rumah, pembelian rumah baru, kapling tanah, konstruksi bangunan, atau full tanah & bangunan. Syariah, Mudah, Berkah.',
            },
            features: [
                {
                    title: 'Renovasi Rumah',
                    desc: 'Pembiayaan untuk memperbaiki, menambah, atau memperbarui bagian rumah agar lebih kuat, nyaman, aman, dan layak huni.',
                    icon: CheckCircle2,
                },
                {
                    title: 'Kapling Tanah',
                    desc: 'Pembiayaan untuk pembelian tanah siap bangun untuk investasi atau hunian masa depan.',
                    icon: ShieldCheck,
                },
                {
                    title: 'Konstruksi Bangunan',
                    desc: 'Pembiayaan untuk membangun rumah baru sesuai kebutuhan dan impian keluarga Anda.',
                    icon: HeartHandshake,
                },
                {
                    title: 'Full Tanah & Bangunan',
                    desc: 'Pembiayaan kepemilikan tanah sekaligus bangunannya, rumah lama maupun baru (Full GTB).',
                    icon: Home,
                },
            ],
            details: {
                title: 'Keunggulan Griya Tumbuh Bahagia',
                items: [
                    'Menggunakan akad-akad syariah (Murobahah, Istisna).',
                    'Tidak ada floating rate/step up. Fix rate dari awal sampai akhir.',
                    'Tidak ada biaya provisi (biaya real cost).',
                    'DP ringan dan fleksibel.',
                    'Jangka waktu sampai 15 tahun.',
                    'Bagi karyawan pembayaran per tanggal 20.',
                    'Margin ringan, start from 0,68% per bulan.',
                    'Rumah lama/baru.',
                    'Rumah bangun.',
                    'Diskon pelunasan tidak ada pinalti pelunasan.',
                ],
            },
            peruntukan: {
                title: 'Peruntukan Pembiayaan',
                items: [
                    'Renovasi Rumah',
                    'Kapling Tanah',
                    'Konstruksi Bangunan',
                    'Full Tanah & Bangunan',
                ],
            },
            renovasi: {
                title: 'Renovasi Rumah',
                desc: 'Pembiayaan untuk memperbaiki, menambah, atau meningkatkan kualitas rumah yang sudah dimiliki seperti:',
                items: [
                    'Tambah kamar',
                    'Perbaikan atap, dapur, kamar mandi',
                    'Rumah lebih nyaman dan bernilai',
                    'Dan renovasi lainnya',
                ],
                ilustrasi: {
                    title: 'Ilustrasi Untuk Renovasi Rumah',
                    items: [
                        'Nilai pembiayaan: Rp 100.000.000',
                        'Jangka waktu: 5 tahun (60 bulan)',
                        'Angsuran per bulan: ± Rp 2.417.000',
                        'Setara hanya: ± Rp 120.850 per hari',
                    ],
                    note: 'Artinya, dengan angsuran harian yang ringan, Anda sudah bisa memperbaiki rumah, menambah ruang, dan meningkatkan kenyamanan keluarga — tanpa riba, tanpa ribet, dan sesuai prinsip syariah.',
                },
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
                contact: {
                    title: 'Info Selengkapnya',
                    desc: 'Silahkan Hubungi Customer Service kami.',
                    btn: '0812-8461-8561',
                },
            },
        },
        en: {
            title: 'Griya Tumbuh Bahagia (GTB) - TAMZIS Bina Utama',
            heading: 'Griya Tumbuh Bahagia',
            breadcrumb: {
                home: 'Home',
                savings: 'Financing',
                current: 'Griya Tumbuh Bahagia',
            },
            hero: {
                badge: 'Sharia House Solution',
                title: 'Want to Own a House Easily Without Hassle? You Can!',
                content:
                    'Griya Tumbuh Bahagia is sharia financing for house renovation, new house purchase, land plots, construction, or full land & building. Sharia, Easy, Blessed.',
            },
            features: [
                {
                    title: 'House Renovation',
                    desc: 'Financing to repair, add, or renew parts of the house to be stronger, comfortable, safe, and habitable.',
                    icon: CheckCircle2,
                },
                {
                    title: 'Land Plots',
                    desc: 'Financing for purchasing ready-to-build land for investment or future dwelling.',
                    icon: ShieldCheck,
                },
                {
                    title: 'Building Construction',
                    desc: 'Financing to build a new house according to your family needs and dreams.',
                    icon: HeartHandshake,
                },
                {
                    title: 'Full Land & Building',
                    desc: 'Financing for owning land along with its building, whether an old or new house (Full GTB).',
                    icon: Home,
                },
            ],
            details: {
                title: 'Advantages of Griya Tumbuh Bahagia',
                items: [
                    'Uses sharia contracts (Murobahah, Istisna).',
                    'No floating rate/step up. Fixed rate from start to finish.',
                    'No provision fees (real cost).',
                    'Light and flexible down payment.',
                    'Tenure up to 15 years.',
                    'For employees, payment on the 20th.',
                    'Light margin, starting from 0.68% per month.',
                    'Old/new house.',
                    'Build house.',
                    'Discount on early settlement, no penalty.',
                ],
            },
            peruntukan: {
                title: 'Financing Purposes',
                items: [
                    'House Renovation',
                    'Land Plots',
                    'Building Construction',
                    'Full Land & Building',
                ],
            },
            renovasi: {
                title: 'House Renovation',
                desc: 'Financing to repair, add, or improve the quality of existing houses such as:',
                items: [
                    'Add rooms',
                    'Repair roof, kitchen, bathroom',
                    'More comfortable and valuable house',
                    'And other renovations',
                ],
                ilustrasi: {
                    title: 'House Renovation Illustration',
                    items: [
                        'Financing amount: Rp 100,000,000',
                        'Term: 5 years (60 months)',
                        'Monthly installment: ± Rp 2,417,000',
                        'Equivalent to only: ± Rp 120,850 per day',
                    ],
                    note: 'This means that with light daily installments, you can repair your house, add rooms, and improve your family\'s comfort — without riba, without hassle, and in accordance with sharia principles.',
                },
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
                contact: {
                    title: 'More Information',
                    desc: 'Please Contact Our Customer Service.',
                    btn: '0812-8461-8561',
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
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/Rumah-Tumbuh-Bahagia.jpg')",
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
                                <div className="mb-8 text-center sm:text-left">
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
                                                src="/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp"
                                                alt={t.heading}
                                                className="max-h-80 w-auto rounded-xl border-4 border-white/25 shadow-2xl"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="mb-8 text-base leading-relaxed font-medium text-emerald-50">
                                    {t.hero.content}
                                </p>

                                <div className="grid gap-6 sm:grid-cols-2">
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

                            {/* Peruntukan Pembiayaan */}
                            <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="mb-8 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                                    {t.peruntukan.title}
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {t.peruntukan.items.map((item, i) => (
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

                            {/* Renovasi Rumah */}
                            <div className="rounded-xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="mb-4 border-b border-emerald-900/5 pb-4 text-lg font-bold text-emerald-950">
                                    {t.renovasi.title}
                                </h3>
                                <p className="mb-6 text-sm text-emerald-950/70">
                                    {t.renovasi.desc}
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {t.renovasi.items.map((item, i) => (
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

                                <div className="mt-8 rounded-xl bg-emerald-50/60 p-6 ring-1 ring-emerald-100">
                                    <h4 className="mb-4 text-sm font-bold text-emerald-900">
                                        {t.renovasi.ilustrasi.title}
                                    </h4>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {t.renovasi.ilustrasi.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                                                <p className="text-sm font-semibold text-emerald-950/80">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-5 text-xs leading-relaxed font-medium text-emerald-950/60 italic">
                                        {t.renovasi.ilustrasi.note}
                                    </p>
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
                                            ? 'Try our financing simulation calculator'
                                            : 'Coba kalkulator simulasi pembiayaan kami'}
                                    </p>
                                </div>
                                <Link
                                    href="/simulasi-gtb"
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
                                activeUrl="/rumah-tumbuh-bahagia"
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
                                    href="https://wa.me/628112613134?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Griya%20Tumbuh%20Bahagia"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    <svg
                                        className="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
