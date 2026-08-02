import {
    faCow,
    faGraduationCap,
    faHandHoldingHeart,
    faMosque,
    faPeopleRoof,
    faHouseChimneyCrack,
    faSeedling,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

type LocalizedText = {
    id: string;
    en: string;
};

type ProgramItem = {
    title: LocalizedText;
    description: LocalizedText;
    icon: typeof faMosque;
    href: string;
    imageUrl?: string;
};

const PROGRAM_IMAGE_DIMS: Record<string, [number, number]> = {
    '/assets/img/baitul-maal/pusat-jajanan-ramadhan.webp': [345, 262],
    '/assets/img/baitul-maal/bahagia-1000-yatim-dhuafa.webp': [392, 116],
    '/assets/img/baitul-maal/bedah-rumah-bahagia-biru.webp': [634, 203],
    '/assets/img/baitul-maal/beta.webp': [768, 410],
    '/assets/img/baitul-maal/cinta-masjid.webp': [353, 319],
    '/assets/img/baitul-maal/tpq-ku-baru.webp': [1014, 393],
    '/assets/img/baitul-maal/wakaf-uang-tamzis.webp': [660, 245],
    '/assets/img/baitul-maal/beasiswa-aktriyo-biru.webp': [1485, 317],
    '/assets/img/baitul-maal/mku-biru.webp': [1067, 1499],
    '/assets/img/baitul-maal/qurban-baru.webp': [767, 409],
    '/assets/img/baitul-maal/zakat-on-tamzis.webp': [527, 269],
    '/assets/img/baitul-maal/sedekah-on-tamzis.webp': [572, 184],
};

const sharedPrograms: ProgramItem[] = [
    {
        title: {
            id: 'Pusat Jajanan Selama Ramadhan',
            en: 'Ramadhan Snack Center',
        },
        description: {
            id: 'Mendukung ekonomi dhuafa selama bulan Ramadhan dengan program pemberdayaan usaha.',
            en: 'Supporting the economy of the underprivileged during Ramadhan through business empowerment programs.',
        },
        icon: faUtensils,
        href: '/pusat-jajanan-selama-ramadhan',
        imageUrl: '/assets/img/baitul-maal/pusat-jajanan-ramadhan.webp',
    },
    {
        title: {
            id: 'Bahagia 1000 Yatim dan Dhuafa',
            en: 'Happiness for 1000 Orphans & Underprivileged',
        },
        description: {
            id: 'Program kebahagiaan dan pendampingan untuk anak yatim dan dhuafa.',
            en: 'Happiness and mentoring program for orphans and the underprivileged.',
        },
        icon: faPeopleRoof,
        href: '/bahagia-1000-yatim-dan-dhuafa',
        imageUrl: '/assets/img/baitul-maal/bahagia-1000-yatim-dhuafa.webp',
    },
    {
        title: {
            id: 'Peduli Bencana',
            en: 'Disaster Care',
        },
        description: {
            id: 'Respon cepat untuk kemanusiaan dan bantuan tanggap bencana.',
            en: 'Rapid humanitarian response and disaster relief assistance.',
        },
        icon: faHouseChimneyCrack,
        href: '/peduli-bencana',
    },
    {
        title: {
            id: 'Peduli Sosial Keagamaan',
            en: 'Social & Religious Care',
        },
        description: {
            id: 'Program kepedulian sosial untuk mendukung aktivitas keagamaan.',
            en: 'Social care program to support religious activities.',
        },
        icon: faHandHoldingHeart,
        href: '/peduli-sosial-keagamaan',
    },
    {
        title: {
            id: 'Peduli Yatim dan Dhuafa',
            en: 'Orphan & Underprivileged Care',
        },
        description: {
            id: 'Bantuan dan pendampingan bagi yatim serta dhuafa yang membutuhkan.',
            en: 'Assistance and mentoring for orphans and the underprivileged in need.',
        },
        icon: faPeopleRoof,
        href: '/peduli-yatim-dan-dhuafa',
    },
    {
        title: {
            id: 'Bedah Rumah Bahagia',
            en: 'Happy Home Renovation',
        },
        description: {
            id: 'Program renovasi dan perbaikan rumah untuk keluarga yang membutuhkan.',
            en: 'House renovation and repair program for families in need.',
        },
        icon: faHouseChimneyCrack,
        href: '/bedah-rumah-bahagia',
        imageUrl: '/assets/img/baitul-maal/bedah-rumah-bahagia-biru.webp',
    },
    {
        title: {
            id: 'Program Pemberdayaan Ekonomi',
            en: 'Economic Empowerment Program',
        },
        description: {
            id: 'Penguatan usaha dan kemandirian ekonomi mustahik.',
            en: 'Strengthening businesses and the economic independence of beneficiaries.',
        },
        icon: faSeedling,
        href: '/program-pemberdayaan-dhuafa',
    },
    {
        title: {
            id: 'Beasiswa Ustadz dan Ustadzah',
            en: 'Ustadz & Ustadzah Scholarship',
        },
        description: {
            id: 'Dukungan pendidikan untuk para ustadz dan ustadzah pejuang pendidikan Islam.',
            en: 'Educational support for ustadz and ustadzah championing Islamic education.',
        },
        icon: faGraduationCap,
        href: '/beasiswa-ustadz',
        imageUrl: '/assets/img/baitul-maal/beta.webp',
    },
    {
        title: {
            id: 'Cinta Masjid',
            en: 'Masjid Love',
        },
        description: {
            id: 'Program pemberdayaan dan pengembangan masjid di seluruh wilayah layanan TAMZIS.',
            en: 'Mosque empowerment and development program across all TAMZIS service areas.',
        },
        icon: faMosque,
        href: '/cinta-masjid',
        imageUrl: '/assets/img/baitul-maal/cinta-masjid.webp',
    },
    {
        title: {
            id: 'Jumat Berkah',
            en: 'Blessed Friday',
        },
        description: {
            id: 'Aksi berbagi keberkahan pada hari Jumat untuk masyarakat sekitar.',
            en: 'Sharing blessings on Fridays with the surrounding community.',
        },
        icon: faHandHoldingHeart,
        href: '/jumat-berkah',
    },
    {
        title: {
            id: 'TPQ-Ku',
            en: 'TPQ-Ku',
        },
        description: {
            id: 'Pembinaan pendidikan Al-Qur’an untuk anak-anak di lingkungan sekitar.',
            en: "Qur'an education guidance for children in the local community.",
        },
        icon: faMosque,
        href: '/tpq-ku',
        imageUrl: '/assets/img/baitul-maal/tpq-ku-baru.webp',
    },
    {
        title: {
            id: 'Prog. Pengembangan dan Pembinaan Amil dan Nadzir',
            en: 'Amil & Nadzir Development Program',
        },
        description: {
            id: 'Penguatan kapasitas amil dan nadzir agar amanah dalam pengelolaan umat.',
            en: "Capacity building for amil and nadzir to faithfully manage the community's trust.",
        },
        icon: faGraduationCap,
        href: '/prog-pengembangan-pembinaan-amil-nadzir',
    },
    {
        title: {
            id: 'Wakaf Uang Tamzis',
            en: 'Tamzis Cash Waqf',
        },
        description: {
            id: 'Wakaf uang yang produktif dan amanah untuk kemaslahatan umat.',
            en: 'Productive and trustworthy cash waqf for the benefit of the community.',
        },
        icon: faHandHoldingHeart,
        href: '/ziswaf',
        imageUrl: '/assets/img/baitul-maal/wakaf-uang-tamzis.webp',
    },
    {
        title: {
            id: "Wakaf Mukena dan Al-Qur'an",
            en: "Mukena & Al-Qur'an Waqf",
        },
        description: {
            id: 'Program wakaf perlengkapan ibadah untuk masjid, musala, dan pesantren.',
            en: 'Waqf program providing worship equipment for mosques, musala, and pesantren.',
        },
        icon: faHandHoldingHeart,
        href: '/wakaf-mukena-al-quran',
    },
    {
        title: {
            id: 'Bina Siswa Cerdas',
            en: 'Smart Student Development',
        },
        description: {
            id: 'Pendampingan pendidikan bagi siswa agar tumbuh unggul dan berkarakter.',
            en: 'Educational mentoring for students to grow excellent and with character.',
        },
        icon: faGraduationCap,
        href: '/program-bina-siswa-cerdas',
    },
    {
        title: {
            id: 'Be-aktriyo',
            en: 'Be-aktriyo',
        },
        description: {
            id: 'Program pengembangan generasi muda melalui pembinaan dan pendampingan.',
            en: 'Youth development program through coaching and mentoring.',
        },
        icon: faSeedling,
        href: '/program-be-aktriyo',
        imageUrl: '/assets/img/baitul-maal/beasiswa-aktriyo-biru.webp',
    },
    {
        title: {
            id: 'Membangun Keluarga Utama (Mku)',
            en: 'Building Prime Families (MKU)',
        },
        description: {
            id: 'Penguatan ketahanan dan peran keluarga sebagai fondasi masyarakat.',
            en: 'Strengthening family resilience and its role as the foundation of society.',
        },
        icon: faPeopleRoof,
        href: '/program-membangun-keluarga-utama-mku',
        imageUrl: '/assets/img/baitul-maal/mku-biru.webp',
    },
    {
        title: {
            id: 'Peduli Kesehatan',
            en: 'Health Care',
        },
        description: {
            id: 'Layanan dan dukungan kesehatan untuk masyarakat yang membutuhkan.',
            en: 'Health services and support for communities in need.',
        },
        icon: faHandHoldingHeart,
        href: '/program-peduli-kesehatan',
    },
    {
        title: {
            id: 'World Sight Day / Desama',
            en: 'World Sight Day / Desama',
        },
        description: {
            id: 'Kegiatan kepedulian kesehatan mata dan edukasi masyarakat.',
            en: 'Eye health awareness activities and community education.',
        },
        icon: faHandHoldingHeart,
        href: '/program-world-sight-day-desama',
    },
    {
        title: {
            id: 'Qurban On Tamzis',
            en: 'Qurban On Tamzis',
        },
        description: {
            id: 'Layanan qurban yang mudah, amanah, dan terpercaya bersama TAMZIS.',
            en: 'Easy, trustworthy, and reliable qurban services with TAMZIS.',
        },
        icon: faCow,
        href: '/qurban-tamzis',
        imageUrl: '/assets/img/baitul-maal/qurban-baru.webp',
    },
    {
        title: {
            id: 'Zakat On Tamzis',
            en: 'Zakat On Tamzis',
        },
        description: {
            id: 'Tunaikan zakat dengan mudah dan tepat sasaran. Sucikan harta kita.',
            en: 'Fulfill your zakat easily and right on target. Purify our wealth.',
        },
        icon: faHandHoldingHeart,
        href: '/ziswaf',
        imageUrl: '/assets/img/baitul-maal/zakat-on-tamzis.webp',
    },
    {
        title: {
            id: 'Sedekah On Tamzis',
            en: 'Sedekah On Tamzis',
        },
        description: {
            id: 'Sedekah ringan kapan saja, pahala berlipat untuk sesama.',
            en: 'Give alms easily anytime, with multiplied rewards for others.',
        },
        icon: faHandHoldingHeart,
        href: '/ziswaf',
        imageUrl: '/assets/img/baitul-maal/sedekah-on-tamzis.webp',
    },
    {
        title: {
            id: 'Khitan Ceria',
            en: 'Khitan Ceria',
        },
        description: {
            id: 'Program khitan untuk anak-anak dengan layanan yang ramah dan aman.',
            en: 'Circumcision program for children with friendly and safe services.',
        },
        icon: faHandHoldingHeart,
        href: '/program-khitan-ceria',
    },
];

export type BaitulMaalSectionData = {
    badge: string;
    title: string;
    description: string;
    showMore: string;
};

export function TamzisBaitulMaal({ data }: { data?: BaitulMaalSectionData }) {
    const { props } = usePage<{
        homeSections?: { baitulmaal?: Record<string, BaitulMaalSectionData> };
    }>();
    const locale = (props.locale as string) || 'id';
    const scrollRef = useRef<HTMLDivElement>(null);

    const translations: Record<
        string,
        {
            badge: string;
            title: string;
            description: string;
            showMore: string;
        }
    > = {
        id: {
            badge: 'Baitul Maal',
            title: 'Program Sosial & Keagamaan',
            description:
                'TAMZIS hadir tidak hanya sebagai lembaga keuangan, tetapi juga sebagai mitra sosial yang memberdayakan umat.',
            showMore: 'Lihat Semua',
        },
        en: {
            badge: 'Baitul Maal',
            title: 'Social & Religious Programs',
            description:
                'TAMZIS exists not only as a financial institution but also as a social partner that empowers the community.',
            showMore: 'See All',
        },
    };

    const defaults =
        translations[locale as keyof typeof translations] || translations.id;

    // Teks header dari database (dashboard); daftar program tetap dari bawaan.
    const t = data ?? props.homeSections?.baitulmaal?.[locale] ?? defaults;
    const lang: keyof LocalizedText = locale === 'en' ? 'en' : 'id';

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) {
return;
}

        const amount = 300;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6">
                        <Link href="/baitul-maal" className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold tracking-widest text-emerald-700 uppercase hover:bg-emerald-200 transition-colors">
                            {t.badge}
                        </Link>
                    </div>
                    <h2 className="mb-6 text-4xl leading-tight font-bold text-emerald-950 sm:text-6xl">
                        {t.title}
                    </h2>
                    <div
                        className="prose prose-slate mt-3 max-w-none text-sm font-semibold text-slate-600 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: t.description }}
                    />
                </div>

                <div className="relative mt-10">
                    <button
                        type="button"
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-700 shadow transition-all hover:bg-emerald-50 hover:shadow-md"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scroll('right')}
                        className="absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-700 shadow transition-all hover:bg-emerald-50 hover:shadow-md"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto px-2 pb-4 scrollbar-hide scroll-smooth"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {sharedPrograms.map((p) => (
                            <Link
                                key={p.title.id}
                                href={p.href}
                                className="group block min-w-[220px] max-w-[220px] shrink-0 rounded-2xl border-2 border-slate-100 bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-500 hover:shadow-md"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                {p.imageUrl ? (
                                    <div className="relative mx-auto h-20 w-28">
                                        <div className="absolute inset-x-4 top-3 h-14 rounded-full bg-emerald-300/40 blur-xl transition-colors duration-300 group-hover:bg-emerald-400/50" />
                                        <div className="relative flex h-20 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-emerald-50/60 to-emerald-100/70 p-2 shadow-sm ring-1 ring-emerald-100 transition-all duration-300 group-hover:-rotate-2 group-hover:scale-110 group-hover:shadow-md group-hover:ring-emerald-300">
                                            <img
                                                src={p.imageUrl}
                                                alt={p.title[lang]}
                                                width={PROGRAM_IMAGE_DIMS[p.imageUrl]?.[0] ?? 768}
                                                height={PROGRAM_IMAGE_DIMS[p.imageUrl]?.[1] ?? 410}
                                                className="max-h-16 max-w-24 object-contain drop-shadow-sm"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                                        <FontAwesomeIcon
                                            icon={p.icon}
                                            fixedWidth
                                            className="text-white"
                                            style={{ width: '36px', height: '36px' }}
                                        />
                                    </div>
                                )}
                                <div className="mt-4 text-sm font-extrabold text-emerald-800 group-hover:text-emerald-600">
                                    {p.title[lang]}
                                </div>
                                <div className="mx-auto mt-2 line-clamp-3 max-w-[28ch] text-xs leading-relaxed font-medium text-slate-500">
                                    {p.description[lang]}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
