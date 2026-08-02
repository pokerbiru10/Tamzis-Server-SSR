import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, LocateFixed, Loader2, MapPin, Phone, Mail, Globe, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

// Haversine formula — jarak garis lurus antara dua koordinat (km)
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function KantorLayanan({ areasData }: { areasData?: any[] }) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const [query, setQuery] = useState('');
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locating, setLocating] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const translations = {
        id: {
            title: 'Kantor Layanan - TAMZIS Bina Utama',
            heading: 'Kantor Layanan',
            breadcrumb: {
                home: 'Beranda',
                profile: 'Profil',
                current: 'Kantor Layanan',
            },
            hero: {
                badge: 'Jaringan Layanan',
                title: 'Temukan Kantor Terdekat',
                content:
                    'TAMZIS hadir lebih dekat untuk melayani kebutuhan finansial syariah Anda. Jaringan kantor kami tersebar di berbagai wilayah untuk memastikan kemudahan akses bagi seluruh anggota.',
            },
            central: {
                title: 'Kantor Pusat',
                address: 'Jl. Ahmad Yani No. 12, Wonosobo, Jawa Tengah',
                phone: '0286321280',
                email: 'info@tamzis.id',
            },
            searchPlaceholder: 'Cari kota atau cabang...',
            nearest: {
                button: 'Cari Kantor Terdekat',
                locating: 'Mencari lokasi...',
                badge: 'Terdekat',
                unsupported: 'Perangkat/browser Anda tidak mendukung deteksi lokasi.',
                denied: 'Izin lokasi ditolak. Aktifkan akses lokasi untuk mencari kantor terdekat.',
                failed: 'Gagal mendapatkan lokasi Anda. Silakan coba lagi.',
                reset: 'Reset',
            },
            notFound: 'Tidak ada kantor yang cocok dengan pencarian Anda.',
        },
        en: {
            title: 'Service Offices - TAMZIS Bina Utama',
            heading: 'Service Offices',
            breadcrumb: {
                home: 'Home',
                profile: 'Profile',
                current: 'Service Offices',
            },
            hero: {
                badge: 'Service Network',
                title: 'Find Nearest Office',
                content:
                    'TAMZIS is closer to serve your sharia financial needs. Our office network is spread across various regions to ensure easy access for all members.',
            },
            central: {
                title: 'Head Office',
                address: 'Jl. Ahmad Yani No. 12, Wonosobo, Central Java',
                phone: '0286321280',
                email: 'info@tamzis.id',
            },
            searchPlaceholder: 'Search city or branch...',
            nearest: {
                button: 'Find Nearest Office',
                locating: 'Locating...',
                badge: 'Nearest',
                unsupported: 'Your browser/device does not support location detection.',
                denied: 'Location access denied. Enable location access to find the nearest office.',
                failed: 'Failed to get your location. Please try again.',
                reset: 'Reset',
            },
            notFound: 'No office matches your search.',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    // Override dari dashboard admin (Kelola Halaman > Konten Halaman > Kantor Layanan), jika ada.
    const savedSection = (
        props.siteSections as
            | Record<string, { headerImage?: string | null; id?: typeof t.hero; en?: typeof t.hero }>
            | undefined
    )?.['kantor-layanan'];
    const savedHero = savedSection?.[locale as 'id' | 'en'];

    if (savedHero) {
        t.hero = savedHero;
    }

    const headerImage = savedSection?.headerImage;

    // Gunakan data dari backend jika ada, jika tidak, pakai array kosong
    const areas = areasData || [];

    const allOffices = useMemo(
        () =>
            areas.flatMap((area: any) =>
                (area.offices || []).map((office: any) => ({
                    ...office,
                    areaName: area.name,
                })),
            ),
        [areas],
    );

    const handleFindNearest = () => {
        setLocationError(null);

        if (!('geolocation' in navigator)) {
            setLocationError(t.nearest.unsupported);

            return;
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocating(false);
            },
            (error) => {
                setLocating(false);
                setLocationError(
                    error.code === error.PERMISSION_DENIED
                        ? t.nearest.denied
                        : t.nearest.failed,
                );
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    };

    const resetNearest = () => {
        setUserLocation(null);
        setLocationError(null);
    };

    const filteredOffices = useMemo(() => {
        let list = allOffices;

        const q = query.trim().toLowerCase();

        if (q) {
            list = list.filter(
                (office: any) =>
                    office.name?.toLowerCase().includes(q) ||
                    office.address?.toLowerCase().includes(q) ||
                    office.areaName?.toLowerCase().includes(q),
            );
        }

        if (userLocation) {
            list = list
                .map((office: any) => ({
                    ...office,
                    distance:
                        office.lat != null && office.lng != null
                            ? distanceKm(userLocation.lat, userLocation.lng, office.lat, office.lng)
                            : null,
                }))
                .sort((a: any, b: any) => {
                    if (a.distance == null) {
return 1;
}

                    if (b.distance == null) {
return -1;
}

                    return a.distance - b.distance;
                });
        }

        return list;
    }, [allOffices, query, userLocation]);

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                {/* Page Title */}
                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${headerImage || '/assets/img/menu/kantor.webp'}')` }}
                    />
                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase sm:text-4xl">
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
                            <span>{t.breadcrumb.profile}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
                    {/* Hero Section */}
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <span className="mb-6 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-[10px] font-bold tracking-widest text-emerald-700 uppercase">
                            {t.hero.badge}
                        </span>
                        <h2 className="mb-6 text-2xl leading-tight font-bold text-emerald-950 sm:text-4xl">
                            {t.hero.title}
                        </h2>
                        <div
                            className="prose prose-slate mx-auto max-w-none text-base leading-relaxed font-medium text-slate-600"
                            dangerouslySetInnerHTML={{ __html: t.hero.content }}
                        />
                    </div>

                    {/* Search & Nearest */}
                    <div className="mx-auto mb-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm font-medium text-emerald-950 shadow-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {userLocation ? (
                            <button
                                type="button"
                                onClick={resetNearest}
                                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                            >
                                <LocateFixed className="h-4 w-4" />
                                {t.nearest.reset}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleFindNearest}
                                disabled={locating}
                                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {locating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <LocateFixed className="h-4 w-4" />
                                )}
                                {locating ? t.nearest.locating : t.nearest.button}
                            </button>
                        )}
                    </div>

                    {locationError && (
                        <p className="mx-auto mb-8 max-w-3xl text-center text-sm font-medium text-red-600">
                            {locationError}
                        </p>
                    )}

                    {filteredOffices.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredOffices.map((office: any, index: number) => (
                                    <div
                                        key={office.id ?? index}
                                        className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
                                    >
                                        <div className="mb-4 flex items-start justify-between gap-2">
                                            <h3 className="text-lg font-bold text-emerald-950 transition-colors group-hover:text-emerald-700">
                                                {office.name}
                                            </h3>
                                            {userLocation && index === 0 && office.distance != null && (
                                                <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold tracking-wide text-emerald-700 uppercase">
                                                    {t.nearest.badge}
                                                </span>
                                            )}
                                        </div>
                                        {userLocation && office.distance != null && (
                                            <p className="mb-3 text-xs font-bold text-emerald-600">
                                                ± {office.distance.toFixed(1)} km
                                            </p>
                                        )}

                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                                <p className="text-sm leading-relaxed font-medium text-slate-600">
                                                    {office.address}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <a
                                                    href={`tel:${office.phone}`}
                                                    className="text-sm font-bold text-slate-600 transition-colors hover:text-emerald-600"
                                                >
                                                    {office.phone}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                                            <a
                                                href={office.maps}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
                                            >
                                                <MapPin className="h-4 w-4" />{' '}
                                                Maps
                                            </a>
                                            <a
                                                href={`https://wa.me/${(office.whatsapp || office.phone || '').replace(/[^0-9]/g, '')}?text=Halo ${office.name}, saya ingin bertanya...`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faWhatsapp}
                                                    className="h-4 w-4"
                                                />{' '}
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-20 text-center shadow-sm">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                                <MapPin className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-emerald-950">
                                {allOffices.length > 0
                                    ? t.notFound
                                    : 'Belum Ada Kantor Layanan'}
                            </h3>
                            <p className="mx-auto max-w-md text-slate-500">
                                {allOffices.length > 0
                                    ? t.searchPlaceholder
                                    : 'Saat ini belum ada data kantor layanan yang tersedia. Silakan cek kembali nanti atau hubungi Contact Center kami.'}
                            </p>
                        </div>
                    )}
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
