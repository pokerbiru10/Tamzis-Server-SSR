import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Heart,
    Wallet,
    HandHeart,
    Scale,
    Users,
    TrendingUp,
    Clock,
    CheckCircle2,
    Phone,
    Sparkles,
} from 'lucide-react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export default function Ziswaf() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const translations = {
        id: {
            title: 'Zakat, Infaq, Sedekah & Wakaf - TAMZIS Bina Utama',
            heading: 'ZISWAF',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'ZISWAF',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Zakat, Infaq, Sedekah & Wakaf',
                quote: '"Sucikan Harta Kita"',
                content:
                    'Zakat merupakan salah satu rukun Islam dan menjadi salah satu unsur pokok bagi tiang syariat Islam. Meninggalkan kewajiban zakat berarti meninggalkan salah satu rukun Islam, dosa besar bagi mereka yang meninggalkan. TAMZIS hadir untuk memfasilitasi Anda dalam menyalurkan ZISWAF secara amanah dan produktif.',
            },
            zakat: {
                title: 'Mengenal Zakat',
                intro: 'Menurut bahasa, kata “zakat” berarti tumbuh, berkembang, subur atau bertambah. Dalam Al-Quran disebutkan, “Ambilah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan menyucikan mereka” (QS. At-Taubah: 103).',
                philosophical:
                    '"Bila rukun Islam memiliki hubungan langsung dengan Allah SWT, Zakat tidak saja memiliki hubungan langsung dengan Allah, tetapi juga memiliki hubungan dengan manusia secara sosiologis."',
                recipients: {
                    title: '8 Penerima Zakat',
                    items: [
                        'Fakir',
                        'Miskin',
                        'Amil',
                        'Muallaf',
                        'Riqab',
                        'Gharimin',
                        'Sabilillah',
                        'Ibnu Sabil',
                    ],
                },
                requirements: {
                    title: 'Syarat Wajib',
                    nishab: 'Memenuhi Nishab (Ukuran minimal)',
                    haul: 'Mencapai Haul (Satu tahun hijriyyah)',
                },
                simulation: {
                    title: 'Simulasi Zakat Profesi',
                    nishabLabel: 'Nishab Bulanan (85g Emas)',
                    zakatLabel: 'Zakat yang dikeluarkan (2,5%)',
                },
            },
            sedekah: {
                title: 'Sedekah on TAMZIS',
                content:
                    'Infak dikeluarkan oleh setiap orang beriman baik dalam keadaan lapang maupun sempit. Sedekah memiliki arti luas, tak hanya menyangkut uang namun juga bersifat non materil, bahkan sekedar senyuman.',
                quote: '"Infak dan sedekah bukan mengurangi harta, bahkan sebaliknya, menjadi banyak dan berkah."',
            },
            wakaf: {
                title: 'Wakaf Uang TAMZIS',
                advantages: {
                    title: 'Keunggulan',
                    items: [
                        'Siapapun Bisa',
                        'Bisa Dimana Saja',
                        'Uang Tak Berkurang',
                    ],
                },
                programs: {
                    title: 'Program Utama',
                    items: [
                        'Syariah Integratif Zone (SIZ)',
                        'Pengembangan Insan Qur’ani',
                        'Masyarakat Mandiri',
                        'Makmur Masjidku',
                    ],
                },
            },
            sidebar: {
                title: 'Program Baitul Maal',
                menu: [
                    { label: 'Cinta Masjid', url: '/cinta-masjid' },
                    { label: 'Qurban Tamzis', url: '/qurban-tamzis' },
                    { label: 'ZISWAF', url: '/ziswaf' },
                    {
                        label: 'Beasiswa Ustadz (BETA)',
                        url: '/beasiswa-ustadz',
                    },
                ],
                contact: {
                    title: 'Hubungi Kami',
                    desc: 'Punya pertanyaan seputar Zakat, Infak, Sedekah, atau Wakaf?',
                },
            },
        },
        en: {
            title: 'Zakat, Infaq, Alms & Waqf - TAMZIS Bina Utama',
            heading: 'ZISWAF',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'ZISWAF',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Zakat, Infaq, Alms & Waqf',
                quote: '"Purify Our Wealth"',
                content:
                    'Zakat is one of the pillars of Islam and becomes one of the main elements for the pillars of Islamic sharia. Leaving the obligation of zakat means leaving one of the pillars of Islam, a major sin for those who leave it. TAMZIS is here to facilitate you in distributing ZISWAF trustworthily and productively.',
            },
            zakat: {
                title: 'Understanding Zakat',
                intro: 'Linguistically, the word "zakat" means to grow, develop, fertile, or increase. In the Al-Quran it is mentioned, "Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase" (QS. At-Tawbah: 103).',
                philosophical:
                    '"If the pillars of Islam have a direct relationship with Allah SWT, Zakat not only has a direct relationship with Allah, but also has a relationship with humans sociologically."',
                recipients: {
                    title: '8 Zakat Recipients',
                    items: [
                        'Fakir',
                        'Poor',
                        'Amil',
                        'Muallaf',
                        'Riqab',
                        'Gharimin',
                        'Sabilillah',
                        'Ibnu Sabil',
                    ],
                },
                requirements: {
                    title: 'Mandatory Requirements',
                    nishab: 'Meeting Nishab (Minimum amount)',
                    haul: 'Reaching Haul (One hijri year)',
                },
                simulation: {
                    title: 'Profession Zakat Simulation',
                    nishabLabel: 'Monthly Nishab (85g Gold)',
                    zakatLabel: 'Zakat issued (2.5%)',
                },
            },
            sedekah: {
                title: 'Alms on TAMZIS',
                content:
                    'Infaq is issued by every believer both in ease and hardship. Alms has a broad meaning, not only concerning money but also non-material, even just a smile.',
                quote: '"Infaq and alms do not reduce wealth, instead, it becomes much and blessed."',
            },
            wakaf: {
                title: 'TAMZIS Cash Waqf',
                advantages: {
                    title: 'Advantages',
                    items: [
                        'Anyone Can',
                        'Can be Anywhere',
                        "Money Doesn't Decrease",
                    ],
                },
                programs: {
                    title: 'Main Programs',
                    items: [
                        'Integrative Sharia Zone (SIZ)',
                        'Quranic Human Development',
                        'Independent Community',
                        'Prosper My Mosque',
                    ],
                },
            },
            sidebar: {
                title: 'Baitul Maal Program',
                menu: [
                    { label: 'Masjid Love', url: '/cinta-masjid' },
                    { label: 'Qurban Tamzis', url: '/qurban-tamzis' },
                    { label: 'ZISWAF', url: '/ziswaf' },
                    { label: 'Ustadz Scholarship', url: '/beasiswa-ustadz' },
                ],
                contact: {
                    title: 'Contact Us',
                    desc: 'Have questions about Zakat, Infaq, Alms, or Waqf?',
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
                                "url('/assets/img/header/ZISWAF (1).jpg')",
                        }}
                    />

                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight drop-shadow-md sm:text-4xl">
                            {t.heading}
                        </h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/50 uppercase">
                            <Link
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                {t.breadcrumb.home}
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <span>{t.breadcrumb.baitulMaal}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-white">
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
                                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
                                        {t.hero.title}
                                    </h3>
                                </div>

                                {/* Illustration */}
                                <div className="mb-8 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                                    <ImageWithFallback
                                        src="/assets/img/menu/menu-baitul-maal.jpg"
                                        alt={t.heading}
                                        aspectRatio="video"
                                    />
                                </div>

                                {/* Headline */}
                                <div className="mb-6">
                                    <p className="text-lg leading-snug font-bold text-white italic sm:text-xl">
                                        {t.hero.quote}
                                    </p>
                                </div>

                                <p className="text-sm leading-relaxed font-medium text-white/80">
                                    {t.hero.content}
                                </p>
                            </div>

                            {/* Zakat Detail Sections */}
                            <div className="space-y-12">
                                {/* Zakat Intro */}
                                <div className="rounded-2xl border border-emerald-900/5 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                                        <Wallet className="h-6 w-6 text-emerald-600" />
                                        <h3 className="text-lg font-bold text-emerald-950">
                                            {t.zakat.title}
                                        </h3>
                                    </div>
                                    <div className="prose prose-emerald max-w-none space-y-4 text-sm font-medium text-emerald-950/70">
                                        <p>{t.zakat.intro}</p>
                                        <div className="rounded-md border border-emerald-100 bg-emerald-50 p-6 italic">
                                            {t.zakat.philosophical}
                                        </div>
                                    </div>
                                </div>

                                {/* Recipients & Types Grid */}
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-emerald-900/5 bg-white p-6 shadow-sm">
                                        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-emerald-900 uppercase">
                                            <Users className="h-4 w-4" />{' '}
                                            {t.zakat.recipients.title}
                                        </h4>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {t.zakat.recipients.items.map(
                                                (item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-center gap-2 text-xs font-semibold text-emerald-950/60"
                                                    >
                                                        <div className="h-1 w-1 rounded-full bg-emerald-400" />{' '}
                                                        {item}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <div className="rounded-2xl bg-emerald-800 p-6 text-white shadow-sm">
                                        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                                            <Scale className="h-4 w-4" />{' '}
                                            {t.zakat.requirements.title}
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                                                <p className="text-xs font-medium">
                                                    {
                                                        t.zakat.requirements
                                                            .nishab
                                                    }
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                                                <Clock className="mt-0.5 h-4 w-4 text-emerald-400" />
                                                <p className="text-xs font-medium">
                                                    {t.zakat.requirements.haul}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Zakat Profesi Simulasi */}
                                <div className="rounded-2xl border border-emerald-900/5 bg-white p-8 shadow-sm">
                                    <h4 className="mb-6 text-sm font-bold tracking-widest text-emerald-900 uppercase">
                                        {t.zakat.simulation.title}
                                    </h4>
                                    <div className="space-y-4 rounded-2xl bg-emerald-50 p-6">
                                        <div className="flex justify-between text-sm font-bold text-emerald-900">
                                            <span>
                                                {t.zakat.simulation.nishabLabel}
                                            </span>
                                            <span>Rp 3.500.000</span>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-emerald-200 pt-4">
                                            <div className="text-xs font-medium text-emerald-950/60">
                                                {t.zakat.simulation.zakatLabel}
                                            </div>
                                            <div className="text-xl font-bold text-emerald-700">
                                                Rp 87.500
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sedekah Section */}
                                <div className="rounded-2xl border border-orange-100 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-3 border-b border-orange-50 pb-4">
                                        <HandHeart className="h-6 w-6 text-orange-500" />
                                        <h3 className="text-lg font-bold text-emerald-950">
                                            {t.sedekah.title}
                                        </h3>
                                    </div>
                                    <p className="mb-6 text-sm leading-relaxed font-medium text-emerald-950/70">
                                        {t.sedekah.content}
                                    </p>
                                    <div className="rounded-md border border-orange-100 bg-orange-50 p-6 text-center text-sm font-bold text-orange-900 italic">
                                        {t.sedekah.quote}
                                    </div>
                                </div>

                                {/* Wakaf Section */}
                                <div className="relative overflow-hidden rounded-[1.5rem] bg-emerald-900 p-10 text-white shadow-2xl">
                                    <div className="relative z-10">
                                        <div className="mb-8 flex items-center gap-3">
                                            <TrendingUp className="h-6 w-6 text-emerald-400" />
                                            <h3 className="text-2xl font-bold">
                                                {t.wakaf.title}
                                            </h3>
                                        </div>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase">
                                                    {t.wakaf.advantages.title}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {t.wakaf.advantages.items.map(
                                                        (item) => (
                                                            <li
                                                                key={item}
                                                                className="flex items-center gap-2 text-xs font-semibold"
                                                            >
                                                                <Sparkles className="h-3 w-3 text-emerald-400" />{' '}
                                                                {item}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase">
                                                    {t.wakaf.programs.title}
                                                </h4>
                                                <ul className="space-y-2 text-[10px] font-medium text-white/70">
                                                    {t.wakaf.programs.items.map(
                                                        (item) => (
                                                            <li key={item}>
                                                                • {item}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-0 bottom-0 -mr-24 -mb-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            {/* Program List */}
                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
                                <h4 className="mb-4 border-b border-emerald-950/5 px-2 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">
                                    {t.sidebar.title}
                                </h4>
                                <nav className="space-y-1">
                                    {t.sidebar.menu.map((menu) => {
                                        const active = menu.url === '/ziswaf';

                                        return (
                                            <Link
                                                key={menu.label}
                                                href={menu.url}
                                                className={`flex w-full items-center justify-between rounded-xl border-l-4 px-4 py-3 text-sm font-bold transition-all ${
                                                    active
                                                        ? 'border-emerald-500 bg-emerald-800 text-white shadow-md'
                                                        : 'border-transparent text-emerald-950/60 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-950'
                                                }`}
                                            >
                                                {menu.label}
                                                <ChevronRight
                                                    className={`h-4 w-4 ${active ? 'text-white' : 'text-emerald-950/20'}`}
                                                />
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

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
                                <div className="space-y-3">
                                    <a
                                        href="https://wa.me/081331530539"
                                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-[10px] font-bold text-white shadow-lg transition-all hover:bg-[#128C7E] active:scale-95"
                                    >
                                        Bapak Zubaeri
                                    </a>
                                    <a
                                        href="https://wa.me/085701271807"
                                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-[10px] font-bold text-white shadow-lg transition-all hover:bg-[#128C7E] active:scale-95"
                                    >
                                        Bapak Eko
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
