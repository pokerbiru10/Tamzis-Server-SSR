import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Phone,
    BookOpen,
    ShieldCheck,
    HeartHandshake,
    Mountain,
} from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import {
    corporateCultureDefaults,
    profilMenuFallback,
} from '@/content/profile-page-defaults';
import { useProfilePageContent } from '@/hooks/use-profile-page-content';

// Ikon nilai LIFE mengikuti urutan item (konten teks dikelola dashboard).
const lifeIcons = [BookOpen, ShieldCheck, HeartHandshake, Mountain];

export default function CorporateCulture() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const lang = locale === 'en' ? 'en' : 'id';

    // Konten dikelola dari dashboard (Konten Halaman Profil) dan diambil via AJAX.
    const { t, images } = useProfilePageContent(
        'corporate-culture',
        corporateCultureDefaults,
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
                            {/* Intro Section */}
                            <div className="rounded-2xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-12">
                                <div className="mb-8">
                                    <h2 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-emerald-700 uppercase">
                                        {t.intro.badge}
                                    </h2>
                                    <h3 className="text-xl font-bold tracking-tight text-emerald-950 sm:text-3xl">
                                        {t.intro.title}
                                    </h3>
                                </div>

                                <ImageWithFallback
                                    src={images.logo}
                                    alt={t.intro.title}
                                    aspectRatio="auto"
                                    className="mx-auto mb-8 block w-full max-w-[473px]"
                                />
                            </div>

                            {/* LIFE Values */}
                            <div className="space-y-4">
                                {t.life.map((item, index) => {
                                    const Icon =
                                        lifeIcons[index % lifeIcons.length];

                                    return (
                                        <div
                                            key={index}
                                            className="group flex flex-col items-start gap-5 rounded-3xl border border-emerald-900/5 bg-white p-5 shadow-sm transition-colors hover:border-emerald-300 sm:flex-row sm:items-center sm:p-6"
                                        >
                                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-emerald-50 text-2xl font-bold text-emerald-600 transition-all group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white sm:h-20 sm:w-20 sm:text-3xl">
                                                {item.letter}
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-1.5 flex items-center gap-2">
                                                    <Icon className="h-4 w-4 text-emerald-500" />
                                                    <h3 className="text-base font-bold tracking-wider text-emerald-950 uppercase sm:text-lg">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <p className="text-sm leading-relaxed font-medium text-emerald-950/70">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="sticky top-24 space-y-8">
                            {/* Nav Menu - dikelola dari dashboard (Menu Halaman) */}
                            <SidebarMenuNav
                                group="profil"
                                locale={locale}
                                activeUrl="/corporate-culture"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            {/* Contact Box - Sharper Style */}
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
                                    href="https://wa.me/628112613134?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Budaya%20TAMZIS"
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
            </div>
        </>
    );
}
