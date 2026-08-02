import { faCow, faMosque } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Heart,
    GraduationCap,
    ArrowRight,
    Sparkles,
    Star,
} from 'lucide-react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

export default function BaitulMaal() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const translations = {
        id: {
            title: 'Baitul Maal - TAMZIS Bina Utama',
            heading: 'Baitul Maal TAMZIS',
            breadcrumb: {
                home: 'Beranda',
                current: 'Baitul Maal',
            },
            hero: {
                badge: 'Amanah Sosial & Kemanusiaan',
                title: 'Menyalurkan Kebaikan, Memberdayakan Umat',
                content:
                    'Baitul Maal TAMZIS hadir sebagai jembatan bagi anggota untuk menyucikan harta dan berbagi kemanfaatan melalui pengelolaan ZISWAF yang amanah, transparan, dan berdampak nyata.',
            },
            programs: [
                {
                    id: 'cinta-masjid',
                    title: 'Cinta Masjid',
                    desc: 'Layanan kebersihan dan kemakmuran masjid/mushola untuk kenyamanan ibadah umat.',
                    icon: () => (
                        <FontAwesomeIcon icon={faMosque} className="h-6 w-6" />
                    ),
                    href: '/cinta-masjid',
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                },
                {
                    id: 'qurban',
                    title: 'Qurban Tamzis',
                    desc: 'Memudahkan ibadah qurban Anda hingga ke pelosok daerah yang membutuhkan.',
                    icon: () => (
                        <FontAwesomeIcon icon={faCow} className="h-6 w-6" />
                    ),
                    href: '/qurban-tamzis',
                    color: 'text-orange-600',
                    bg: 'bg-orange-50',
                },
                {
                    id: 'ziswaf',
                    title: 'ZISWAF',
                    desc: 'Pengelolaan Zakat, Infaq, Sedekah, dan Wakaf secara produktif dan berkelanjutan.',
                    icon: () => <Heart className="h-6 w-6" />,
                    href: '/ziswaf',
                    color: 'text-pink-600',
                    bg: 'bg-pink-50',
                },
                {
                    id: 'beta',
                    title: 'Beasiswa Ustadz (BETA)',
                    desc: 'Dukungan pendidikan bagi para pejuang Al-Quran di seluruh wilayah layanan.',
                    icon: () => <GraduationCap className="h-6 w-6" />,
                    href: '/beasiswa-ustadz',
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                },
            ],
            cta: {
                title: 'Mari Berbagi Keberkahan',
                desc: 'Tunaikan ZISWAF Anda melalui Baitul Maal TAMZIS untuk masyarakat yang lebih berdaya.',
                btn: 'Salurkan Sekarang',
            },
        },
        en: {
            title: 'Baitul Maal - TAMZIS Bina Utama',
            heading: 'Baitul Maal TAMZIS',
            breadcrumb: {
                home: 'Home',
                current: 'Baitul Maal',
            },
            hero: {
                badge: 'Social & Humanitarian Trust',
                title: 'Channelling Kindness, Empowering People',
                content:
                    'Baitul Maal TAMZIS exists as a bridge for members to purify wealth and share benefits through trustworthy, transparent, and impactful ZISWAF management.',
            },
            programs: [
                {
                    id: 'cinta-masjid',
                    title: 'Masjid Love',
                    desc: 'Mosque/mushola cleaning and prosperity services for the comfort of community worship.',
                    icon: () => (
                        <FontAwesomeIcon icon={faMosque} className="h-6 w-6" />
                    ),
                    href: '/cinta-masjid',
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                },
                {
                    id: 'qurban',
                    title: 'Qurban Tamzis',
                    desc: 'Easing your qurban sacrifice to remote areas in need.',
                    icon: () => (
                        <FontAwesomeIcon icon={faCow} className="h-6 w-6" />
                    ),
                    href: '/qurban-tamzis',
                    color: 'text-orange-600',
                    bg: 'bg-orange-50',
                },
                {
                    id: 'ziswaf',
                    title: 'ZISWAF',
                    desc: 'Productive and sustainable management of Zakat, Infaq, Alms, and Waqf.',
                    icon: () => <Heart className="h-6 w-6" />,
                    href: '/ziswaf',
                    color: 'text-pink-600',
                    bg: 'bg-pink-50',
                },
                {
                    id: 'beta',
                    title: 'Ustadz Scholarship (BETA)',
                    desc: 'Educational support for Al-Quran warriors throughout service areas.',
                    icon: () => <GraduationCap className="h-6 w-6" />,
                    href: '/beasiswa-ustadz',
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                },
            ],
            cta: {
                title: "Let's Share Blessings",
                desc: 'Fulfill your ZISWAF through Baitul Maal TAMZIS for a more empowered community.',
                btn: 'Distribute Now',
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
                                "url('/assets/img/header/profil-banner.webp')",
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
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20">
                    {/* Hero Section */}
                    <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <span className="mb-6 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-[10px] font-bold tracking-widest text-emerald-700 uppercase">
                                {t.hero.badge}
                            </span>
                            <h2 className="mb-6 text-3xl leading-tight font-bold text-emerald-950 sm:text-5xl">
                                {t.hero.title}
                            </h2>
                            <p className="mb-10 text-base leading-relaxed font-medium text-slate-600 sm:text-lg">
                                {t.hero.content}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#programs"
                                    className="rounded-full bg-emerald-800 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-900"
                                >
                                    {isEn ? 'Our Programs' : 'Lihat Program'}
                                </a>
                                <Link
                                    href="/ziswaf"
                                    className="rounded-full border border-emerald-900/10 bg-white px-8 py-4 text-sm font-bold text-emerald-800 transition-all hover:bg-emerald-50"
                                >
                                    {isEn ? 'Learn ZISWAF' : 'Pelajari ZISWAF'}
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="group relative aspect-video overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                                <div className="absolute inset-0 z-10 bg-emerald-950/10 transition-colors group-hover:bg-transparent" />
                                <picture>
                                    <source type="image/webp" srcSet="/assets/img/menu/menu-baitul-maal.webp" />
                                    <img
                                        src="/assets/img/menu/menu-baitul-maal.jpg"
                                        alt="Baitul Maal TAMZIS"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </picture>
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-xl backdrop-blur">
                                        <Heart className="h-6 w-6 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Programs Section */}
                    <div id="programs" className="mb-20">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <h3 className="mb-2 text-2xl font-bold text-emerald-950">
                                    {isEn
                                        ? 'Social Programs'
                                        : 'Seluruh Program Maal'}
                                </h3>
                                <p className="text-sm font-medium text-slate-500">
                                    {isEn
                                        ? 'Explore our initiatives'
                                        : 'Jelajahi inisiatif kebaikan kami'}
                                </p>
                            </div>
                            <div className="hidden gap-2 sm:flex">
                                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                    <Sparkles className="h-3 w-3 text-orange-400" />{' '}
                                    {isEn ? 'Scroll to view' : 'Scroll untuk melihat'}
                                </div>
                            </div>
                        </div>

                        {/* Horizontal Scroll System */}
                        <div className="relative">
                            <div className="scrollbar-hide no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8">
                                {t.programs.map((program) => (
                                    <Link
                                        key={program.id}
                                        href={program.href}
                                        className="group w-[280px] flex-shrink-0 snap-start sm:w-[320px]"
                                    >
                                        <div className="flex h-full flex-col rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-xl hover:border-emerald-500">
                                            <div
                                                className={`h-14 w-14 rounded-xl ${program.bg} ${program.color} mb-8 flex items-center justify-center transition-transform group-hover:scale-110`}
                                            >
                                                <program.icon />
                                            </div>
                                            <h4 className="mb-3 text-xl font-bold tracking-tight text-emerald-950 uppercase transition-colors group-hover:text-emerald-700">
                                                {program.title}
                                            </h4>
                                            <p className="mb-8 flex-1 text-sm leading-relaxed font-medium text-slate-500">
                                                {program.desc}
                                            </p>
                                            <div className="mt-auto flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-800 uppercase transition-all group-hover:gap-3">
                                                {isEn
                                                    ? 'View Detail'
                                                    : 'Lihat Detail'}{' '}
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {/* Placeholder for more items if needed */}
                                <div className="w-2 flex-shrink-0 px-1" />
                            </div>
                        </div>
                    </div>

                    {/* Impact Section */}
                    <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-10 text-center text-white shadow-2xl sm:p-16">
                        <div className="relative z-10 mx-auto max-w-2xl">
                            <Star className="mx-auto mb-8 h-12 w-12 text-yellow-400" />
                            <h3 className="mb-6 text-2xl font-bold sm:text-3xl">
                                {t.cta.title}
                            </h3>
                            <p className="mb-10 text-base leading-relaxed text-emerald-100/70 sm:text-lg">
                                {t.cta.desc}
                            </p>
                            <Link
                                href="/ziswaf"
                                className="inline-block rounded-full bg-emerald-600 px-12 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-900/50 transition-all hover:bg-emerald-700"
                            >
                                {t.cta.btn}
                            </Link>
                        </div>
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
