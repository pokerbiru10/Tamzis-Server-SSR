import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Star } from 'lucide-react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export default function QurbanTamzis() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const translations = {
        id: {
            title: 'Qurban Tamzis - TAMZIS Bina Utama',
            heading: 'Qurban Tamzis',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Qurban Tamzis',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Qurban Tamzis',
                hadits: '"Maka dirikanlah sholat karena Tuhanmu, dan berkorbanlah."',
                haditsSource: '(QS Al-Kausar: 2)',
                content: 'Program edukasi dan fasilitasi ibadah qurban bagi insan Tamzis dan masyarakat.\nMasyarakat umum',
            },
            sidebar: {
                title: 'Program Baitul Maal',
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
                contact: {
                    title: 'Daftar Sekarang',
                    desc: 'Segera bergabung dan tunaikan ibadah qurban Anda bersama TAMZIS.',
                    btn: 'Daftar via WhatsApp',
                },
            },
        },
        en: {
            title: 'Qurban Tamzis - TAMZIS Bina Utama',
            heading: 'Qurban Tamzis',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Qurban Tamzis',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Qurban Tamzis',
                hadits: '"So pray to your Lord and sacrifice [to Him alone]."',
                haditsSource: '(QS Al-Kawthar: 2)',
                content: `PROGRAM
The Qurban Tamzis Program is an educational and facilitation program for the qurban sacrifice for Tamzis personnel and the general public. This program is organized as a form of service to facilitate the implementation of qurban worship in accordance with Islamic sharia.

The program aims to provide education about the laws and procedures of qurban, facilitate the process of qurban implementation, and distribute qurban meat to those entitled to receive it, particularly the dhuafa and underprivileged communities.

Through this program, it is hoped that the implementation of qurban can be carried out properly, correctly, and provide maximum benefits to the recipients.

TARGETS
The general public`,
            },
            sidebar: {
                title: 'Baitul Maal Program',
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
                contact: {
                    title: 'Register Now',
                    desc: 'Join immediately and perform your qurban sacrifice with TAMZIS.',
                    btn: 'Register via WhatsApp',
                },
            },
        },
    };

    const t = translations[locale as keyof typeof translations] || translations.id;

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                {/* Page Title - Astra Style */}
                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/Qurban-tamzis.webp')",
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
                                    <picture>
                                        <source type="image/webp" srcSet="/assets/img/menu/menu-qurban.webp" />
                                        <ImageWithFallback src="/assets/img/menu/menu-qurban.jpg" alt={t.heading} aspectRatio="video" />
                                    </picture>
                                </div>
                                
                                <blockquote className="mb-6 border-l-4 border-emerald-400 py-2 pl-6">
                                    <p className="text-lg leading-snug font-bold text-white italic sm:text-xl">
                                        {t.hero.hadits}
                                    </p>
                                    <footer className="mt-2 text-[10px] font-semibold tracking-wide text-emerald-300">
                                        {t.hero.haditsSource}
                                    </footer>
                                </blockquote>

                                <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-white/80">
                                    {t.hero.content}
                                </p>
                            </div>
                            <div className="min-h-[1px]" />
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            {/* Program Baitul Maal */}
                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
                                <h4 className="mb-4 border-b border-emerald-950/5 px-2 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">
                                    {t.sidebar.title}
                                </h4>
                                <nav className="space-y-1">
                                    {t.sidebar.menu.map((menu) => {
                                        const active =
                                            menu.url === '/qurban-tamzis';

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

                            {/* CTA Daftar */}
                            <div className="rounded-2xl bg-emerald-800 p-8 text-center text-white shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                                    <Star className="h-8 w-8 text-yellow-400" />
                                </div>
                                <h4 className="mb-4 border-b border-white/10 pb-3 text-sm font-bold tracking-widest uppercase">
                                    {t.sidebar.contact.title}
                                </h4>
                                <p className="mb-6 text-xs leading-relaxed text-white/70">
                                    {t.sidebar.contact.desc}
                                </p>
                                <a
                                    href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20daftar%20Qurban%20Tamzis"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#128C7E] active:scale-95"
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
