import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, GraduationCap, Heart, Star } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function BeasiswaUstadz() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Beasiswa Ustadz (BETA) - TAMZIS Bina Utama',
            heading: 'Beasiswa Ustadz (BETA)',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'BETA',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Mencetak Generasi Qurani melalui BETA',
                imgLabel: 'Mendukung Para Pejuang Al-Quran',
                content:
                    'BETA (Beasiswa Ustadz Ustadzah) adalah program unggulan Baitul Maal TAMZIS yang didedikasikan untuk mendukung para pejuang Al-Quran. Kami percaya bahwa ustadz dan ustadzah adalah pilar utama dalam membangun moral bangsa.',
            },
            assistance: {
                education: {
                    title: 'Bantuan Pendidikan',
                    desc: 'Membantu biaya pendidikan bagi ustadz/ah yang sedang menempuh studi lanjut.',
                },
                incentive: {
                    title: 'Tali Asih',
                    desc: 'Pemberian insentif rutin bagi guru ngaji di pelosok daerah.',
                },
            },
            goals: {
                title: 'Tujuan Program',
                items: [
                    'Meningkatkan kesejahteraan para pengajar Al-Quran.',
                    'Mendorong peningkatan kompetensi dan kualitas pengajaran.',
                    'Menjamin keberlangsungan pendidikan agama di masyarakat.',
                    'Wujud kepedulian anggota TAMZIS melalui penyaluran ZISWAF.',
                ],
            },
            contribute: {
                title: 'Mari Berkontribusi',
                desc: 'Setiap rupiah yang Anda zakatkan atau infakkan melalui Baitul Maal TAMZIS akan sangat berarti bagi perjuangan para Ustadz dan Ustadzah.',
                btn: 'Salurkan ZISWAF Sekarang',
            },
            sidebar: {
                title: 'Program Sosial',
                menu: [
                    { label: 'Ramadhan Snack Center', url: '/pusat-jajanan-selama-ramadhan' },
                    { label: 'Happiness for 1000 Orphans & Needy', url: '/bahagia-1000-yatim-dan-dhuafa' },
                    { label: 'Disaster Relief', url: '/peduli-bencana' },
                    { label: 'Social & Religious Care', url: '/peduli-sosial-keagamaan' },
                    { label: 'Orphan & Needy Care', url: '/peduli-yatim-dan-dhuafa' },
                    { label: 'Happy House Renovation', url: '/bedah-rumah-bahagia' },
                    { label: 'Economic Empowerment Program', url: '/program-pemberdayaan-dhuafa' },
                    { label: 'Ustadz & Ustadzah Scholarship', url: '/beasiswa-ustadz' },
                    { label: 'Love Mosque', url: '/cinta-masjid' },
                    { label: 'Blessed Friday', url: '/jumat-berkah' },
                    { label: 'My TPQ', url: '/tpq-ku' },
                    { label: 'Amil & Nadzir Development', url: '/prog-pengembangan-pembinaan-amil-nadzir' },
                    { label: "Mukena & Quran endowment", url: '/wakaf-mukena-al-quran' },
                    { label: 'Smart Student Program', url: '/program-bina-siswa-cerdas' },
                    { label: 'Be-aktriyo', url: '/program-be-aktriyo' },
                    { label: 'Building Prime Family (MKU)', url: '/program-membangun-keluarga-utama-mku' },
                    { label: 'Health Care', url: '/program-peduli-kesehatan' },
                    { label: 'World Sight Day / Desama', url: '/program-world-sight-day-desama' },
                    { label: 'Qurban On Tamzis', url: '/qurban-tamzis' },
                    { label: 'Joyful Circumcision', url: '/program-khitan-ceria' },
                ],
            },
        },
        en: {
            title: 'Ustadz Scholarship (BETA) - TAMZIS Bina Utama',
            heading: 'Ustadz Scholarship (BETA)',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'BETA',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Creating the Quranic Generation through BETA',
                imgLabel: 'Supporting Al-Quran Warriors',
                content:
                    'BETA (Ustadz Ustadzah Scholarship) is a flagship program of Baitul Maal TAMZIS dedicated to supporting Al-Quran warriors. We believe that ustadz and ustadzah are the main pillars in building national character.',
            },
            assistance: {
                education: {
                    title: 'Education Aid',
                    desc: 'Helping with education costs for teachers (ustadz/ah) who are pursuing advanced studies.',
                },
                incentive: {
                    title: 'Welfare Incentive',
                    desc: 'Providing regular incentives for Quran teachers in remote areas.',
                },
            },
            goals: {
                title: 'Program Objectives',
                items: [
                    'Improving the welfare of Al-Quran teachers.',
                    'Encouraging increased competence and quality of teaching.',
                    'Ensuring the sustainability of religious education in society.',
                    "A form of TAMZIS members' care through ZISWAF distribution.",
                ],
            },
            contribute: {
                title: "Let's Contribute",
                desc: 'Every rupiah you tithe or give through Baitul Maal TAMZIS will mean a lot for the struggle of the Ustadz and Ustadzah.',
                btn: 'Distribute ZISWAF Now',
            },
            sidebar: {
                title: 'Social Program',
                menu: [
                    { label: 'Ramadhan Snack Center', url: '/pusat-jajanan-selama-ramadhan' },
                    { label: 'Happiness for 1000 Orphans & Needy', url: '/bahagia-1000-yatim-dan-dhuafa' },
                    { label: 'Disaster Relief', url: '/peduli-bencana' },
                    { label: 'Social & Religious Care', url: '/peduli-sosial-keagamaan' },
                    { label: 'Orphan & Needy Care', url: '/peduli-yatim-dan-dhuafa' },
                    { label: 'Happy House Renovation', url: '/bedah-rumah-bahagia' },
                    { label: 'Economic Empowerment Program', url: '/program-pemberdayaan-dhuafa' },
                    { label: 'Ustadz & Ustadzah Scholarship', url: '/beasiswa-ustadz' },
                    { label: 'Love Mosque', url: '/cinta-masjid' },
                    { label: 'Blessed Friday', url: '/jumat-berkah' },
                    { label: 'My TPQ', url: '/tpq-ku' },
                    { label: 'Amil & Nadzir Development', url: '/prog-pengembangan-pembinaan-amil-nadzir' },
                    { label: "Mukena & Quran endowment", url: '/wakaf-mukena-al-quran' },
                    { label: 'Smart Student Program', url: '/program-bina-siswa-cerdas' },
                    { label: 'Be-aktriyo', url: '/program-be-aktriyo' },
                    { label: 'Building Prime Family (MKU)', url: '/program-membangun-keluarga-utama-mku' },
                    { label: 'Health Care', url: '/program-peduli-kesehatan' },
                    { label: 'World Sight Day / Desama', url: '/program-world-sight-day-desama' },
                    { label: 'Qurban On Tamzis', url: '/qurban-tamzis' },
                    { label: 'Joyful Circumcision', url: '/program-khitan-ceria' },
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
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/beasiswa-ustadz.webp')",
                        }}
                    />

                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase drop-shadow-md sm:text-4xl">
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
                                        <picture>
                                            <source type="image/webp" srcSet="/assets/img/menu/menu-beasiswa.webp" />
                                            <ImageWithFallback
                                                src="/assets/img/menu/menu-beasiswa.jpg"
                                                alt={t.heading}
                                                aspectRatio="video"
                                            />
                                        </picture>
                                        <div className="absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-emerald-950/90 to-transparent p-6">
                                            <p className="text-[10px] font-bold tracking-widest text-white uppercase opacity-80">
                                                {t.hero.imgLabel}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="mb-8 text-base leading-relaxed font-medium text-emerald-50">
                                    {t.hero.content}
                                </p>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="rounded-md border border-white/10 bg-white/10 p-6">
                                        <GraduationCap className="mb-4 h-8 w-8 text-emerald-300" />
                                        <h4 className="mb-2 font-bold text-white">
                                            {t.assistance.education.title}
                                        </h4>
                                        <p className="text-sm text-emerald-100/70">
                                            {t.assistance.education.desc}
                                        </p>
                                    </div>
                                    <div className="rounded-md border border-white/10 bg-white/10 p-6">
                                        <Heart className="mb-4 h-8 w-8 text-emerald-300" />
                                        <h4 className="mb-2 font-bold text-white">
                                            {t.assistance.incentive.title}
                                        </h4>
                                        <p className="text-sm text-emerald-100/70">
                                            {t.assistance.incentive.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <section>
                                <h3 className="mb-6 text-lg font-bold tracking-tight text-emerald-900 uppercase">
                                    {t.goals.title}
                                </h3>
                                <div className="grid gap-4">
                                    {t.goals.items.map((goal, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 rounded-md border border-emerald-900/5 bg-white p-4 shadow-sm"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                                                {i + 1}
                                            </div>
                                            <p className="text-sm font-semibold text-emerald-950/80">
                                                {goal}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-md border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <Star className="mx-auto mb-6 h-12 w-12 text-orange-400" />
                                <h3 className="mb-4 text-lg font-bold text-emerald-950">
                                    {t.contribute.title}
                                </h3>
                                <p className="mx-auto mb-8 max-w-lg text-sm text-emerald-950/60">
                                    {t.contribute.desc}
                                </p>
                                <Link
                                    href="/ziswaf"
                                    className="inline-block rounded-full bg-emerald-800 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-900"
                                >
                                    {t.contribute.btn}
                                </Link>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            <SidebarMenuNav
                                group="baitul-maal"
                                locale={locale}
                                activeUrl="/beasiswa-ustadz"
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
