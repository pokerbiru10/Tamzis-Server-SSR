import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Phone,
    Award,
    Trophy,
    Image as ImageIcon,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import {
    penghargaanDefaults,
    profilMenuFallback,
} from '@/content/profile-page-defaults';
import { useProfilePageContent } from '@/hooks/use-profile-page-content';

export default function Penghargaan() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const lang = locale === 'en' ? 'en' : 'id';
    const isEn = locale === 'en';
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    // Konten dikelola dari dashboard (Konten Halaman Profil) dan diambil via AJAX.
    const { t } = useProfilePageContent(
        'penghargaan',
        penghargaanDefaults,
        locale,
    );
    const menuFallback = profilMenuFallback[lang];

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/banner1.webp')",
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
                            <span>{t.breadcrumb.profile}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
                    <div className="grid items-start gap-12 lg:grid-cols-3">
                        {/* Main Column */}
                        <div className="space-y-10 lg:col-span-2">
                            {/* Intro Section - Green Box Style */}
                            <div className="rounded-2xl border-l-[8px] border-emerald-500 bg-emerald-800 p-8 text-white shadow-xl sm:p-12">
                                <div className="mb-8 text-center sm:text-left">
                                    <h2 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                                        {t.intro.badge}
                                    </h2>
                                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
                                        {t.intro.title}
                                    </h3>
                                </div>

                                <div className="space-y-4 text-sm leading-relaxed font-medium text-white/90 sm:text-base">
                                    <p>{t.intro.content1}</p>
                                </div>
                            </div>

                            {/* Awards List Card */}
                            <div className="rounded-3xl border border-emerald-900/5 bg-white p-6 shadow-sm sm:p-10">
                                <div className="mb-8 flex items-center gap-4 border-b border-emerald-900/5 pb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-yellow-50 text-yellow-600">
                                        <Trophy className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-emerald-950 sm:text-xl">
                                        {t.awards.title}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {t.awards.items.map((award, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex items-start gap-4 rounded-md p-4 transition-colors hover:bg-emerald-50 sm:gap-6"
                                        >
                                            <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm transition-colors group-hover:bg-yellow-100 group-hover:text-yellow-600">
                                                <Award className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <p className="text-sm leading-relaxed font-medium text-emerald-950/80">
                                                    {award}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Photo Documentation Gallery */}
                            <div className="rounded-3xl border border-emerald-900/5 bg-white p-6 shadow-sm sm:p-10">
                                <div className="mb-8 flex items-center gap-4 border-b border-emerald-900/5 pb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                        <ImageIcon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-emerald-950 sm:text-xl">
                                        {t.gallery.title}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {t.gallery.items.map((photo, idx) => {
                                        const featured = idx === 0;

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => setZoomedImage(photo.src)}
                                                className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl ${
                                                    featured ? 'sm:col-span-2' : ''
                                                }`}
                                            >
                                                <div
                                                    className={`relative overflow-hidden ${
                                                        featured
                                                            ? 'aspect-video sm:aspect-[21/10]'
                                                            : 'aspect-[3/4]'
                                                    }`}
                                                >
                                                    <img
                                                        src={photo.src}
                                                        alt={photo.label}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent" />
                                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                                                        <p
                                                            className={`font-bold tracking-tight text-white drop-shadow ${
                                                                featured
                                                                    ? 'text-base sm:text-xl'
                                                                    : 'text-sm'
                                                            }`}
                                                        >
                                                            {photo.label}
                                                        </p>
                                                        <span className="hidden shrink-0 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-emerald-900 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100 sm:inline-block">
                                                            {isEn ? 'View Photo' : 'Lihat Foto'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="sticky top-24 space-y-8">
                            {/* Nav Menu - dikelola dari dashboard (Menu Halaman) */}
                            <SidebarMenuNav
                                group="profil"
                                locale={locale}
                                activeUrl="/penghargaan"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            {/* Contact Box */}
                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-base font-black tracking-widest text-emerald-950 uppercase">
                                    {t.contact.title}
                                </h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">
                                    {t.contact.desc}
                                </p>
                                <a
                                    href="https://wa.me/628112613134"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    <svg
                                        className="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    {t.contact.btn}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />

                {zoomedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                        onClick={() => setZoomedImage(null)}
                    >
                        <button
                            onClick={() => setZoomedImage(null)}
                            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
                            aria-label="Close"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <img
                            src={zoomedImage}
                            alt="Zoomed"
                            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
