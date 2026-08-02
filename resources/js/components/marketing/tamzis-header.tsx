import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Menu as MenuIcon,
    Headset,
    Phone,
    Search,
    X,
    Home,
    User,
    Heart,
    HandCoins,
    ChevronRight,
    MapPin,
    Mail,
    LayoutDashboard,
    Newspaper,
    Briefcase,
} from 'lucide-react';
import { Fragment, useState, useRef, useEffect, useCallback } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';

function SolidInstagramIcon(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={props.className}
            fill="currentColor"
        >
            <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.4 2H7.8A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.6-2.9a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
        </svg>
    );
}

function SolidFacebookIcon(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={props.className}
            fill="currentColor"
        >
            <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V11H7.6v3h2.6v8h3.3Z" />
        </svg>
    );
}

function SolidYouTubeIcon(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={props.className}
            fill="currentColor"
        >
            <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10.2 15.3V8.7L15.9 12l-5.7 3.3Z" />
        </svg>
    );
}

function cx(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(' ');
}

export type MegaSection = {
    title: string;
    items: Array<{ label: string; href: string; logo?: string }>;
};

export type NavItem =
    | { type: 'link'; label: string; href: string; typeLabel?: string }
    | {
          type: 'mega';
          label: string;
          href: string;
          sections: MegaSection[];
          footerTitle: string;
          footerText: string;
          image?: string;
          typeLabel?: string;
      }
    | {
          type: 'dropdown';
          label: string;
          href: string;
          items: Array<{ label: string; href: string }>;
          typeLabel?: string;
      };

export type TopbarData = {
    phone: string;
    phoneLabel: { id: string; en: string };
    whatsapp: string;
    socials: { instagram?: string; facebook?: string; youtube?: string };
};

export const defaultTopbar: TopbarData = {
    phone: '+62286325303',
    phoneLabel: { id: 'Call Center Tamzis', en: 'Tamzis Call Center' },
    whatsapp: '628112613134',
    socials: {
        instagram: 'https://www.instagram.com/tamzis_id/',
        facebook: 'https://www.facebook.com/TamzisBinaUtama/',
        youtube: 'https://www.youtube.com/@tamzisbinautama',
    },
};

export const getNavItems = (locale: string): NavItem[] => {
    const isEn = locale === 'en';

    return [
        { type: 'link', label: isEn ? 'Home' : 'Beranda', href: '/' },
        {
            type: 'mega',
            label: isEn ? 'Profile' : 'Profil',
            href: '#profile',
            sections: [
                {
                    title: isEn ? 'About Us' : 'Tentang Kami',
                    items: [
                        {
                            label: isEn ? 'Company Profile' : 'Profil Perusahaan',
                            href: '/company-profile',
                        },
                        {
                            label: isEn ? 'Legality' : 'Legalitas',
                            href: '/legalitas',
                        },
                        {
                            label: isEn
                                ? 'Vision and Mission'
                                : 'Visi dan Misi',
                            href: '/visi-misi',
                        },
                        {
                            label: isEn
                                ? 'Corporate Culture'
                                : 'Budaya Perusahaan',
                            href: '/corporate-culture',
                        },
                        {
                            label: isEn ? 'Awards' : 'Penghargaan',
                            href: '/penghargaan',
                        },
                        {
                            label: isEn ? 'Office Address' : 'Alamat Kantor',
                            href: '/kantor-layanan',
                        },
                    ],
                },
            ],
            footerTitle: 'Tamzis Bina Utama',
            footerText: isEn
                ? 'Serving with sharia principles for mutual prosperity.'
                : 'Melayani dengan prinsip syariah untuk kesejahteraan bersama.',
            image: '/assets/img/sub-menu/profil-gedung.png',
        },
        {
            type: 'mega',
            label: isEn ? 'Savings' : 'Simpanan',
            href: '#simpanan',
            sections: [
                {
                    title: isEn ? 'Saving Products' : 'Produk Simpanan',
                    items: [
                        {
                            label: isEn
                                ? 'Mutiara Savings'
                                : 'Simpanan Mutiara',
                            href: '/simpanan-mutiara',
                        },
                        {
                            label: isEn
                                ? 'Education Savings'
                                : 'Simpanan Pendidikan',
                            href: '/simpanan-pendidikan',
                        },
                        {
                            label: isEn ? 'Ijabah Savings' : 'Simpanan Ijabah',
                            href: '/simpanan-ijabah',
                        },
                        {
                            label: isEn
                                ? 'Mudharabah Savings'
                                : 'Simpanan Mudharabah',
                            href: '/simpanan-mudharabah',
                        },
                    ],
                },
            ],
            footerTitle: isEn ? 'Sharia Savings' : 'Simpanan Syariah',
            footerText: isEn
                ? 'Plan your future with safe and blessed saving products.'
                : 'Rencanakan masa depan Anda dengan produk simpanan yang aman dan berkah.',
            image: '/assets/img/menu/menu-simpanan.jpg',
        },
        {
            type: 'mega',
            label: isEn ? 'Financing' : 'Pembiayaan',
            href: '/ikhtiar-utama',
            sections: [
                {
                    title: isEn ? 'Financing Products' : 'Produk Pembiayaan',
                    items: [
                        {
                            label: isEn
                                ? 'Mudharabah (Business Capital)'
                                : 'Mudharabah (Modal Usaha)',
                            href: '/ikhtiar-utama',
                        },
                        {
                            label: isEn
                                ? 'Murabahah (Buying & Selling)'
                                : 'Murabahah (Jual Beli)',
                            href: '/murabahah',
                        },
                        {
                            label: isEn
                                ? 'Kafalah (Social)'
                                : 'Kafalah (Sosial)',
                            href: '/kafalah',
                        },
                        {
                            label: isEn
                                ? 'Hajj Portion'
                                : 'Porsi Haji',
                            href: '/porsi-haji',
                        },
                        {
                            label: isEn
                                ? 'Griya Tumbuh Bahagia'
                                : 'Griya Tumbuh Bahagia',
                            href: '/rumah-tumbuh-bahagia',
                        },
                    ],
                },
                {
                    title: isEn ? 'Simulation' : 'Simulasi',
                    items: [
                        {
                            label: isEn
                                ? 'Mudharabah Simulation'
                                : 'Simulasi Mudharabah',
                            href: '/simulasi-mudharabah',
                        },
                        {
                            label: isEn
                                ? 'Murabahah Simulation'
                                : 'Simulasi Murabahah',
                            href: '/simulasi-murabahah',
                        },
                        {
                            label: isEn
                                ? 'Kafalah Simulation'
                                : 'Simulasi Kafalah',
                            href: '/simulasi-kafalah',
                        },
                        {
                            label: isEn
                                ? 'Hajj Simulation'
                                : 'Simulasi Porsi Haji',
                            href: '/simulasi-haji',
                        },
                        {
                            label: isEn ? 'GTB Simulation' : 'Simulasi GTB',
                            href: '/simulasi-gtb',
                        },
                    ],
                },
            ],
            footerTitle: isEn ? 'Productive Financing' : 'Pembiayaan Produktif',
            footerText: isEn
                ? 'Realize your dreams and develop your business with our sharia financing.'
                : 'Wujudkan impian dan kembangkan usaha Anda bersama pembiayaan syariah kami.',
            image: '/assets/img/menu/menu-pembiayaan.jpg',
        },
        {
            type: 'mega',
            label: 'Baitul Maal',
            href: '#baitul-maal',
            sections: [
                {
                    title: isEn
                        ? 'Underprivileged Empowerment & Welfare Improvement Programs'
                        : 'Program Pemberdayaan dan Peningkatan Kesejahteraan Dhuafa',
                    items: [
                        {
                            label: isEn
                                ? 'Ramadhan Snack Center'
                                : 'Pusat Jajanan Selama Ramadhan',
                            href: '/pusat-jajanan-selama-ramadhan',
                        },
                        {
                            label: isEn
                                ? 'Happiness for 1000 Orphans & Underprivileged'
                                : 'Bahagia 1000 Yatim dan Dhuafa',
                            href: '/bahagia-1000-yatim-dan-dhuafa',
                        },
                        {
                            label: isEn
                                ? 'Disaster Care (Disaster Response & Humanity)'
                                : 'Peduli Bencana (Tanggap Bencana & Kemanusiaan)',
                            href: '/peduli-bencana',
                        },
                        {
                            label: isEn
                                ? 'Social & Religious Care'
                                : 'Peduli Sosial Keagamaan',
                            href: '/peduli-sosial-keagamaan',
                        },
                        {
                            label: isEn
                                ? 'Orphan & Underprivileged Care'
                                : 'Peduli Yatim dan Dhuafa',
                            href: '/peduli-yatim-dan-dhuafa',
                        },
                        {
                            label: isEn
                                ? 'Happy Home Renovation'
                                : 'Bedah Rumah Bahagia',
                            href: '/bedah-rumah-bahagia',
                        },
                        {
                            label: isEn
                                ? 'Economic Empowerment Program'
                                : 'Program Pemberdayaan Ekonomi',
                            href: '/program-pemberdayaan-dhuafa',
                        },
                        {
                            label: 'ZISWAF',
                            href: '/ziswaf',
                        },
                    ],
                },
                {
                    title: isEn
                        ? 'Mosque & Al-Quran Based Programs'
                        : 'Program Berbasis Masjid dan Al Quran',
                    items: [
                        {
                            label: isEn
                                ? 'Ustadz & Ustadzah Scholarship'
                                : 'Beasiswa Ustadz dan Ustadzah',
                            href: '/beasiswa-ustadz',
                        },
                        {
                            label: isEn ? 'Masjid Love' : 'Cinta Masjid',
                            href: '/cinta-masjid',
                        },
                        {
                            label: isEn ? 'Blessed Friday' : 'Jumat Berkah',
                            href: '/jumat-berkah',
                        },
                        {
                            label: 'TPQ-Ku',
                            href: '/tpq-ku',
                        },
                        {
                            label: isEn
                                ? 'Amil & Nadzir Development Program'
                                : 'Prog. Pengembangan dan Pembinaan Amil dan Nadzir',
                            href: '/prog-pengembangan-pembinaan-amil-nadzir',
                        },
                        {
                            label: isEn
                                ? "Mukena & Al-Qur'an Waqf"
                                : "Wakaf Mukena dan Al-Qur'an",
                            href: '/wakaf-mukena-al-quran',
                        },
                    ],
                },
                {
                    title: isEn
                        ? 'Prime Family Building Based Programs'
                        : 'Program Berbasis Membangun Keluarga Utama',
                    items: [
                        {
                            label: isEn
                                ? 'Smart Student Development'
                                : 'Bina Siswa Cerdas',
                            href: '/program-bina-siswa-cerdas',
                        },
                        {
                            label: 'Be-aktriyo',
                            href: '/program-be-aktriyo',
                        },
                        {
                            label: isEn
                                ? 'Building Prime Families (MKU)'
                                : 'Membangun Keluarga Utama (Mku)',
                            href: '/program-membangun-keluarga-utama-mku',
                        },
                        {
                            label: isEn ? 'Health Care' : 'Peduli Kesehatan',
                            href: '/program-peduli-kesehatan',
                        },
                        {
                            label: 'World Sight Day / Desama',
                            href: '/program-world-sight-day-desama',
                        },
                        {
                            label: 'Qurban On Tamzis',
                            href: '/qurban-tamzis',
                        },
                        {
                            label: isEn ? 'Joyful Circumcision' : 'Khitan Ceria',
                            href: '/program-khitan-ceria',
                        },
                    ],
                },
            ],
            footerTitle: 'Baitul Maal',
            footerText: isEn
                ? 'Channelling your trust for the benefit of the people.'
                : 'Menyalurkan amanah Anda untuk kemaslahatan umat.',
            image: '/assets/img/menu/menu-baitul-maal.jpg',
        },
        {
            type: 'link',
            label: isEn ? 'Digital Services' : 'Layanan Digital',
            href: '/layanan-digital',
        },
        {
            type: 'link',
            label: isEn ? 'News' : 'Berita',
            href: '/berita',
        },
        {
            type: 'link',
            label: isEn ? 'Career' : 'Karir',
            href: '/info-karir',
        },
    ];
};

function findScopeHref(items: NavItem[], scopeLabel: string) {
    if (scopeLabel === 'Semua' || scopeLabel === 'All') {
return '/';
}

    const found = items.find((i) => i.label === scopeLabel);

    return found?.href ?? '/';
}

function DesktopDropdown({
    label,
    items,
}: {
    label: string;
    items: Array<{ label: string; href: string }>;
}) {
    const { isCurrentUrl: isLinkActive } = useCurrentUrl();
    const isActive = items.some((item) => isLinkActive(item.href));
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative flex h-full items-stretch"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={cx(
                    'relative inline-flex items-center gap-1 px-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none active:scale-95',
                    isActive ? 'text-emerald-700' : 'text-emerald-950/90',
                )}
            >
                {label}
                <ChevronDown className="h-4 w-4" aria-hidden />
                {isActive && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-emerald-600" />
                )}
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div className="absolute top-full left-0 z-50 w-max min-w-44 overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-xl focus:outline-none">
                    <div className="p-2">
                        {items.map((sub) => (
                            <Link
                                key={sub.label}
                                href={sub.href}
                                className={cx(
                                    'block rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap text-emerald-950 transition-colors hover:bg-emerald-50',
                                    isLinkActive(sub.href) &&
                                        'bg-emerald-50 text-emerald-700',
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {sub.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Transition>
        </div>
    );
}

function DesktopMegaMenu({
    item,
}: {
    item: Extract<NavItem, { type: 'mega' }>;
}) {
    const { isCurrentUrl: isLinkActive } = useCurrentUrl();
    const isActive = item.sections.some((section) =>
        section.items.some((sub) => isLinkActive(sub.href)),
    );
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [dropdownLeft, setDropdownLeft] = useState<number | null>(null);

    const isBaitulMaal = item.label === 'Baitul Maal';
    const DROPDOWN_WIDTH = 1080;

    const calculatePosition = useCallback(() => {
        if (!isBaitulMaal || !wrapperRef.current) {
            return;
        }

        const rect = wrapperRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // Align-right: dropdown rata kanan dari wrapper tombol
        let left = rect.width - DROPDOWN_WIDTH;

        // Pastikan tidak keluar dari kiri viewport
        if (rect.left + left < 16) {
            left = 16 - rect.left;
        }

        // Pastikan tidak keluar dari kanan viewport
        const dropdownAbsoluteRight = rect.left + left + DROPDOWN_WIDTH;

        if (dropdownAbsoluteRight > viewportWidth - 16) {
            left = viewportWidth - 16 - DROPDOWN_WIDTH - rect.left;
        }

        setDropdownLeft(left);
    }, [isBaitulMaal]);

    useEffect(() => {
        if (isOpen && isBaitulMaal) {
            calculatePosition();
        }
    }, [isOpen, isBaitulMaal, calculatePosition]);

    return (
        <div
            ref={wrapperRef}
            className="relative flex h-full items-stretch"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={cx(
                    'relative inline-flex items-center gap-1 px-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none active:scale-95',
                    isActive ? 'text-emerald-700' : 'text-emerald-950/90',
                )}
            >
                {item.label}
                <ChevronDown className="h-4 w-4" aria-hidden />
                {isActive && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-emerald-600" />
                )}
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div
                    className={cx(
                        'absolute top-full z-50 overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-xl focus:outline-none',
                        isBaitulMaal
                            ? 'w-[1080px]'
                            : 'left-1/2 -translate-x-1/2',
                        !isBaitulMaal &&
                            (item.sections.length === 1
                                ? 'w-[500px]'
                                : 'w-[720px]'),
                    )}
                    style={
                        isBaitulMaal
                            ? { left: dropdownLeft !== null ? `${dropdownLeft}px` : '0px' }
                            : undefined
                    }
                >
                    {item.label === 'Baitul Maal' ? (
                        <div className="grid grid-cols-4 gap-6 p-5">
                            <div className="col-span-3 grid grid-cols-3 gap-6">
                                {item.sections.map((section) => (
                                    <div key={section.title}>
                                        <div className="mb-2 text-xs font-extrabold text-emerald-950/60">
                                            {section.title}
                                        </div>
                                        <div className="grid gap-1">
                                            {section.items.map((link) => (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    className={cx(
                                                        'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-50',
                                                        isLinkActive(link.href) &&
                                                            'bg-emerald-50 text-emerald-700',
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {link.logo && (
                                                        <img
                                                            src={link.logo}
                                                            alt=""
                                                            className="h-5 w-5 object-contain shrink-0"
                                                        />
                                                    )}
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col rounded-xl bg-emerald-950/5 p-4">
                                {item.image && (
                                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl">
                                        <picture>
                                            <source
                                                srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                                                type="image/webp"
                                            />
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </picture>
                                    </div>
                                )}
                                <div className="mb-2 text-xs font-extrabold text-emerald-950/60">
                                    {item.footerTitle}
                                </div>
                                <div className="text-sm font-semibold text-emerald-950/80">
                                    {item.footerText}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={cx(
                                'grid gap-6 p-5',
                                item.sections.length === 1
                                    ? 'md:grid-cols-2'
                                    : 'md:grid-cols-3',
                            )}
                        >
                            <div
                                className={cx(
                                    'grid gap-4',
                                    item.sections.length === 1
                                        ? 'md:col-span-1 md:grid-cols-1'
                                        : 'md:col-span-2 md:grid-cols-2',
                                )}
                            >
                                {item.sections.map((section) => (
                                    <div key={section.title}>
                                        <div className="mb-2 text-xs font-extrabold text-emerald-950/60">
                                            {section.title}
                                        </div>
                                        <div className="grid gap-1">
                                            {section.items.map((link) => (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    className={cx(
                                                        'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-50',
                                                        isLinkActive(link.href) &&
                                                            'bg-emerald-50 text-emerald-700',
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {link.logo && (
                                                        <img
                                                            src={link.logo}
                                                            alt=""
                                                            className="h-5 w-5 object-contain shrink-0"
                                                        />
                                                    )}
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col rounded-xl bg-emerald-950/5 p-4">
                                {item.image && (
                                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl">
                                        <picture>
                                            <source
                                                srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                                                type="image/webp"
                                            />
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </picture>
                                    </div>
                                )}
                                <div className="mb-2 text-xs font-extrabold text-emerald-950/60">
                                    {item.footerTitle}
                                </div>
                                <div className="text-sm font-semibold text-emerald-950/80">
                                    {item.footerText}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Transition>
        </div>
    );
}

function IndonesiaFlagIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
            <rect width="24" height="16" rx="2" fill="#fff" />
            <rect width="24" height="8" fill="#E70011" rx="2" />
            <rect y="8" width="24" height="8" fill="#fff" />
            <rect
                width="24"
                height="16"
                rx="2"
                fill="none"
                stroke="#000"
                strokeOpacity="0.1"
                strokeWidth="0.5"
            />
        </svg>
    );
}

function USFlagIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
            <rect width="24" height="16" rx="2" fill="#fff" />
            <rect width="24" height="1.23" fill="#B22234" />
            <rect y="2.46" width="24" height="1.23" fill="#B22234" />
            <rect y="4.92" width="24" height="1.23" fill="#B22234" />
            <rect y="7.38" width="24" height="1.23" fill="#B22234" />
            <rect y="9.85" width="24" height="1.23" fill="#B22234" />
            <rect y="12.31" width="24" height="1.23" fill="#B22234" />
            <rect y="14.77" width="24" height="1.23" fill="#B22234" />
            <rect width="9.6" height="8.62" fill="#3C3B6E" />
            <rect
                width="24"
                height="16"
                rx="2"
                fill="none"
                stroke="#000"
                strokeOpacity="0.1"
                strokeWidth="0.5"
            />
        </svg>
    );
}

function LanguageSwitcher() {
    const { props } = usePage();
    const currentLocale = (props.locale as string) || 'id';
    const [isOpen, setIsOpen] = useState(false);

    const switchLanguage = (locale: string) => {
        router.get(
            `/language/${locale}`,
            {},
            {
                onSuccess: () => setIsOpen(false),
                preserveScroll: true,
            },
        );
    };

    return (
        <div
            className="relative flex h-full items-stretch"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center gap-1.5 rounded-xl border border-emerald-900/10 bg-white px-3 py-1.5 text-[10px] font-black tracking-widest text-emerald-950 uppercase transition-all hover:bg-emerald-50 focus:outline-none sm:text-xs">
                {currentLocale === 'id' ? (
                    <IndonesiaFlagIcon className="h-3.5 w-5 shrink-0" />
                ) : (
                    <USFlagIcon className="h-3.5 w-5 shrink-0" />
                )}
                <span>{currentLocale.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3 opacity-40" />
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-1 scale-95"
            >
                <div className="absolute top-full right-0 z-50 w-36 origin-top-right overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
                    <div className="p-1.5">
                        <button
                            onClick={() => switchLanguage('id')}
                            className={cx(
                                'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-colors',
                                currentLocale === 'id'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'text-emerald-950 hover:bg-emerald-50 hover:text-emerald-900',
                            )}
                        >
                            <IndonesiaFlagIcon className="h-3 w-4.5 shrink-0" />
                            Indonesia
                        </button>
                        <button
                            onClick={() => switchLanguage('en')}
                            className={cx(
                                'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-colors',
                                currentLocale === 'en'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'text-emerald-950 hover:bg-emerald-50 hover:text-emerald-900',
                            )}
                        >
                            <USFlagIcon className="h-3 w-4.5 shrink-0" />
                            English
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export function TamzisTopbar({ data }: { data?: TopbarData }) {
    const { props } = usePage();
    const currentLocale = (props.locale as string) || 'id';
    const isEn = currentLocale === 'en';
    const careerLinkUrl = (props.careerLinkUrl as string) || '/info-karir';
    const careerLinkLabel =
        (props.careerLinkLabel as string) || (isEn ? 'Career Info' : 'Info Karir');
    const layananLinkUrl = (props.layananLinkUrl as string) || '/simulasi-gtb';
    const tentangLinkUrl = (props.tentangLinkUrl as string) || '/company-profile';

    // Data topbar: override dari prop (preview dashboard) > database > bawaan.
    const dbTopbar = (props.siteSections as { topbar?: TopbarData } | undefined)?.topbar;
    const source = data ?? dbTopbar;

    const topbar: TopbarData = {
        ...defaultTopbar,
        ...(source ?? {}),
        phoneLabel: {
            ...defaultTopbar.phoneLabel,
            ...(source?.phoneLabel ?? {}),
        },
        socials: {
            ...defaultTopbar.socials,
            ...(source?.socials ?? {}),
        },
    };

    return (
            <div className="border-b border-emerald-900/10 bg-emerald-800 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-[10px] sm:text-xs">
                    {/* Kiri: Call Center + WA */}
                    <div className="flex items-center gap-2 font-semibold">
                        <a
                            href={`tel:${topbar.phone}`}
                            aria-label={
                                isEn ? topbar.phoneLabel.en : topbar.phoneLabel.id
                            }
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 font-bold hover:bg-white/15"
                        >
                            <Headset
                                className="h-3.5 w-3.5 shrink-0"
                                aria-hidden
                            />
                            <span className="hidden sm:inline">
                                {isEn
                                    ? topbar.phoneLabel.en
                                    : topbar.phoneLabel.id}
                            </span>
                        </a>
                        <a
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 font-bold hover:bg-white/15"
                            href={`https://wa.me/${topbar.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="WhatsApp"
                        >
                            <FontAwesomeIcon
                                icon={faWhatsapp}
                                className="h-3.5 w-3.5"
                            />
                            <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                    </div>

                    {/* Kanan */}
                    <div className="flex items-center gap-2 font-semibold sm:gap-4">
                        {/* Tentang Kami & Layanan — hidden di mobile, tampil di sm+ */}
                        <div className="hidden items-center gap-3 border-r border-white/20 pr-3 sm:flex sm:gap-4 sm:pr-4">
                            <a
                                href={tentangLinkUrl}
                                className="transition-colors hover:text-emerald-200"
                            >
                                {isEn ? 'About Us' : 'Tentang Kami'}
                            </a>
                            <a
                                href={layananLinkUrl}
                                className="transition-colors hover:text-emerald-200"
                            >
                                {isEn ? 'Services' : 'Layanan'}
                            </a>
                        </div>

                        {/* Social icons — hidden di mobile */}
                        <div className="hidden items-center gap-3 sm:flex">
                            {topbar.socials.instagram && (
                                <a
                                    href={topbar.socials.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-white/90 hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <SolidInstagramIcon className="h-4 w-4" />
                                </a>
                            )}
                            {topbar.socials.facebook && (
                                <a
                                    href={topbar.socials.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-white/90 hover:text-white"
                                    aria-label="Facebook"
                                >
                                    <SolidFacebookIcon className="h-4 w-4" />
                                </a>
                            )}
                            {topbar.socials.youtube && (
                                <a
                                    href={topbar.socials.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-white/90 hover:text-white"
                                    aria-label="YouTube"
                                >
                                    <SolidYouTubeIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>

                        {/* Info Karir — selalu tampil, teks ringkas di mobile */}
                        <Link
                            className="rounded-full bg-orange-700 px-2 py-0.5 font-semibold whitespace-nowrap text-white hover:bg-orange-600 sm:px-3 sm:py-1"
                            href={careerLinkUrl}
                        >
                            <span className="sm:hidden">
                                {careerLinkLabel}
                            </span>
                            <span className="hidden sm:inline">
                                {careerLinkLabel}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
    );
}

export function TamzisMainNav({
    items,
    className,
}: {
    items?: NavItem[];
    className?: string;
}) {
    const { props } = usePage();
    const currentLocale = (props.locale as string) || 'id';
    const { isCurrentUrl: isLinkActive } = useCurrentUrl();

    // Data menu dari prop (preview dashboard) > database > bawaan.
    const dbNav = (props.siteSections as { navbar?: Record<string, NavItem[]> } | undefined)
        ?.navbar?.[currentLocale];
    const fallbackNav = getNavItems(currentLocale);

    // Pastikan Baitul Maal selalu tampil sebagai mega menu 3 kolom,
    // meskipun data di database corrupt atau hilang type/sections-nya.
    const baitulMaalFallback = fallbackNav.find(
        (item): item is Extract<NavItem, { type: 'mega' }> =>
            item.type === 'mega' && item.label === 'Baitul Maal',
    );

    let navItems: NavItem[];

    if (items) {
        navItems = items;
    } else if (dbNav && dbNav.length > 0) {
        navItems = dbNav.map((item) =>
            item.label === 'Baitul Maal' && baitulMaalFallback
                ? { ...baitulMaalFallback, href: item.href }
                : item,
        );
    } else {
        navItems = fallbackNav;
    }

    return (
        <nav
            className={
                className ??
                'hidden flex-1 items-center justify-center gap-0 lg:flex'
            }
        >
                        {navItems.map((item) => {
                            if (item.type === 'link') {
                                const active = isLinkActive(item.href);
                                const isExternal = item.href.startsWith('http');
                                const className = cx(
                                    'relative flex h-full items-center px-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95',
                                    active
                                        ? 'text-emerald-700'
                                        : 'text-emerald-950/90',
                                );

                                if (isExternal) {
                                    return (
                                        <a key={item.label} href={item.href} className={className}>
                                            {item.label}
                                            {active && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-emerald-600" />
                                            )}
                                        </a>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={className}
                                    >
                                        {item.label}
                                        {active && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-emerald-600" />
                                        )}
                                    </Link>
                                );
                            }

                            if (item.type === 'mega') {
                                return (
                                    <DesktopMegaMenu
                                        key={item.label}
                                        item={item}
                                    />
                                );
                            }

                            return (
                                <DesktopDropdown
                                    key={item.label}
                                    label={item.label}
                                    items={item.items}
                                />
                            );
                        })}
        </nav>
    );
}

export function TamzisHeader() {
    const { props } = usePage();
    const currentLocale = (props.locale as string) || 'id';
    const isEn = currentLocale === 'en';
    const { isCurrentUrl: isLinkActive } = useCurrentUrl();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Data navbar dari database (dashboard), fallback ke bawaan.
    const siteSections = props.siteSections as
        | {
              navbar?: Record<string, NavItem[]>;
          }
        | undefined;

    const dbNav = siteSections?.navbar?.[currentLocale];
    const fallbackNav = getNavItems(currentLocale);

    // Pastikan Baitul Maal selalu mega menu, bahkan kalau data DB corrupt.
    const baitulMaalFallback = fallbackNav.find(
        (item): item is Extract<NavItem, { type: 'mega' }> =>
            item.type === 'mega' && item.label === 'Baitul Maal',
    );

    const navItems = dbNav?.length
        ? dbNav.map((item) =>
              item.label === 'Baitul Maal' && baitulMaalFallback
                  ? { ...baitulMaalFallback, href: item.href }
                  : item,
          )
        : fallbackNav;

    const [searchScope, setSearchScope] = useState(isEn ? 'All' : 'Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchableItems, setSearchableItems] = useState<Array<{ label: string; href: string; category: string }>>([]);

    // Fetch searchable items from backend API (dynamic)
    useEffect(() => {
        fetch(`/api/search?locale=${currentLocale}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.items) {
setSearchableItems(data.items);
}
            })
            .catch(() => {
                // Fallback: flatten navItems
                const fallback = navItems.flatMap((item) => {
                    if (item.type === 'link') {
                        return [{ label: item.label, href: item.href, category: isEn ? 'Main Menu' : 'Menu Utama' }];
                    }

                    if (item.type === 'mega') {
                        return item.sections.flatMap((section) =>
                            section.items.map((sub) => ({ label: sub.label, href: sub.href, category: section.title })),
                        );
                    }

                    if (item.type === 'dropdown') {
                        return item.items.map((sub) => ({ label: sub.label, href: sub.href, category: item.label }));
                    }

                    return [];
                });
                setSearchableItems(fallback);
            });
    }, [currentLocale]);

    // Dynamic scopes from fetched items
    const dynamicScopes = [
        isEn ? 'All' : 'Semua',
        ...Array.from(new Set(searchableItems.map((i) => i.category))),
    ];

    const filteredResults = searchableItems
        .filter((item) => {
            const matchesQuery =
                searchQuery.trim() === '' ||
                item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesScope =
                searchScope === 'Semua' ||
                searchScope === 'All' ||
                item.category === searchScope ||
                ((searchScope === 'Menu Utama' ||
                    searchScope === 'Main Menu') &&
                    (item.category === 'Menu Utama' ||
                        item.category === 'Main Menu'));

            return matchesQuery && matchesScope;
        })
        .filter(
            () =>
                searchQuery.trim() !== '' ||
                (searchScope !== 'Semua' && searchScope !== 'All'),
        ); // Don't show everything if both empty

    return (
        <header className="w-full">
            <TamzisTopbar />

            {/* Main navbar - Sticky on scroll */}
            <div className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex h-14 max-w-7xl items-stretch justify-between gap-4 px-4">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/assets/img/logo-remove.webp"
                            alt="TAMZIS Bina Utama"
                            className="h-8 w-auto sm:h-10"
                            width={600}
                            height={122}
                            loading="eager"
                        />
                    </Link>

                    <TamzisMainNav items={navItems} />

                    {/* Search block & Mobile menu */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex h-full items-stretch">
                            <LanguageSwitcher />
                        </div>

                        <div className="flex h-full items-center">
                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 lg:h-9 lg:w-11"
                                aria-label="Cari"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="h-4 w-4" aria-hidden />
                            </button>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-2xl border border-emerald-900/15 bg-white p-2 text-emerald-950 hover:bg-emerald-50 lg:hidden"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Buka menu"
                        >
                            <MenuIcon className="h-5 w-5" aria-hidden />
                        </button>
                    </div>
                </div>
            </div>

            {/* Search modal */}
            <Transition show={searchOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[60]"
                    onClose={() => setSearchOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center px-4 py-10">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 translate-y-2 scale-[0.99]"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-2 scale-[0.99]"
                            >
                                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-emerald-900/10">
                                    <div className="flex items-center justify-between border-b border-emerald-900/10 px-5 py-4">
                                        <Dialog.Title className="text-sm font-extrabold text-emerald-950">
                                            Cari informasi
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            className="rounded-2xl border border-emerald-900/10 p-2 text-emerald-950 hover:bg-emerald-50"
                                            onClick={() => setSearchOpen(false)}
                                            aria-label="Tutup"
                                        >
                                            <X
                                                className="h-5 w-5"
                                                aria-hidden
                                            />
                                        </button>
                                    </div>

                                    <div className="px-5 py-5">
                                        <div className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-3 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <Search
                                                    className="h-5 w-5 text-emerald-950/50"
                                                    aria-hidden
                                                />
                                                <input
                                                    value={searchQuery}
                                                    onChange={(e) =>
                                                        setSearchQuery(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Ketik kata kunci…"
                                                    className="w-full text-sm font-semibold text-emerald-950 outline-none placeholder:text-emerald-950/40"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        {/* Results List */}
                                        <div className="mt-6 max-h-[300px] overflow-y-auto pr-2">
                                            {filteredResults.length > 0 ? (
                                                <div className="space-y-2">
                                                    <div className="mb-2 text-xs font-extrabold tracking-widest text-emerald-950/60 uppercase">
                                                        Hasil Pencarian (
                                                        {filteredResults.length}
                                                        )
                                                    </div>
                                                    {filteredResults.map(
                                                        (result, idx) => (
                                                            <Link
                                                                key={`${result.href}-${idx}`}
                                                                href={
                                                                    result.href
                                                                }
                                                                className="group flex items-center justify-between rounded-2xl border border-emerald-900/10 bg-emerald-50 p-4 transition-all hover:bg-emerald-700 hover:text-white"
                                                                onClick={() =>
                                                                    setSearchOpen(
                                                                        false,
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-bold">
                                                                        {
                                                                            result.label
                                                                        }
                                                                    </span>
                                                                    <span className="text-[10px] font-medium tracking-wider uppercase opacity-60 group-hover:text-emerald-100">
                                                                        {
                                                                            result.category
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <ChevronRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            ) : searchQuery.trim() !== '' ||
                                              searchScope !== 'Semua' ? (
                                                <div className="py-8 text-center">
                                                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                        <Search className="h-6 w-6" />
                                                    </div>
                                                    <p className="text-sm font-bold text-emerald-950">
                                                        Tidak ada hasil
                                                        ditemukan
                                                    </p>
                                                    <p className="text-xs font-medium text-emerald-950/40">
                                                        Coba gunakan kata kunci
                                                        lain
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="py-8 text-center">
                                                    <p className="text-xs font-bold tracking-widest text-emerald-950/40 uppercase">
                                                        Mulai ketik atau pilih
                                                        kategori untuk
                                                        mencari...
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-8">
                                            <div className="mb-3 text-xs font-extrabold tracking-widest text-emerald-950/60 uppercase">
                                                Telusuri Kategori
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {dynamicScopes.map(
                                                    (scope) => (
                                                        <button
                                                            key={scope}
                                                            type="button"
                                                            onClick={() =>
                                                                setSearchScope(
                                                                    scope,
                                                                )
                                                            }
                                                            className={cx(
                                                                'rounded-full border px-3 py-1.5 text-xs font-extrabold tracking-wide',
                                                                searchScope ===
                                                                    scope
                                                                    ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                                                                    : 'border-emerald-900/10 bg-white text-emerald-950/75 hover:bg-emerald-50',
                                                            )}
                                                        >
                                                            {scope}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-6 rounded-2xl border border-emerald-900/5 bg-emerald-950/5 p-4">
                                            <div className="text-xs font-extrabold tracking-widest text-emerald-950/60 uppercase">
                                                Aksi cepat
                                            </div>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <a
                                                    href={findScopeHref(
                                                        navItems,
                                                        searchScope,
                                                    )}
                                                    className="rounded-full bg-emerald-800 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:bg-emerald-900"
                                                    onClick={() =>
                                                        setSearchOpen(false)
                                                    }
                                                >
                                                    Buka {searchScope}
                                                </a>
                                                <button
                                                    type="button"
                                                    className="rounded-full border border-emerald-900/10 bg-white px-4 py-2 text-xs font-extrabold text-emerald-950/75 shadow-sm transition-all hover:bg-emerald-50"
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                    }}
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Mobile drawer */}
            <Transition show={mobileOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[70] lg:hidden"
                    onClose={() => setMobileOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-2xl ring-1 ring-emerald-900/10">
                                <div className="flex items-center justify-between border-b border-emerald-900/10 px-5 py-4">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2.5"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <img
                                            src="/assets/img/logo-tamzis.jpg"
                                            alt="TAMZIS Bina Utama"
                                            className="h-8 w-auto"
                                            width={1655}
                                            height={336}
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        className="rounded-full border border-emerald-900/10 p-2 text-emerald-950 hover:bg-emerald-50"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="flex-1 px-4 py-6">
                                    <nav className="space-y-1">
                                        {navItems.map((item) => {
                                            const getIcon = (label: string) => {
                                                if (
                                                    label === 'Beranda' ||
                                                    label === 'Home'
                                                ) {
return (
                                                        <Home className="h-5 w-5" />
                                                    );
}

                                                if (
                                                    label === 'Profil' ||
                                                    label === 'Profile'
                                                ) {
return (
                                                        <User className="h-5 w-5" />
                                                    );
}

                                                if (label === 'Baitul Maal') {
return (
                                                        <Heart className="h-5 w-5" />
                                                    );
}

                                                if (
                                                    label === 'Simpanan' ||
                                                    label === 'Savings'
                                                ) {
return (
                                                        <img
                                                            src="/assets/icon/chicken.png"
                                                            alt=""
                                                            aria-hidden
                                                            className="h-5 w-5 object-contain [filter:invert(28%)_sepia(41%)_saturate(1178%)_hue-rotate(115deg)_brightness(95%)_contrast(101%)]"
                                                        />
                                                    );
}

                                                if (
                                                    label === 'Pembiayaan' ||
                                                    label === 'Financing'
                                                ) {
return (
                                                        <HandCoins className="h-5 w-5" />
                                                    );
}

                                                if (
                                                    label ===
                                                        'Layanan Digital' ||
                                                    label === 'Digital Services'
                                                ) {
return (
                                                        <LayoutDashboard className="h-5 w-5" />
                                                    );
}

                                                if (
                                                    label === 'Berita' ||
                                                    label === 'News'
                                                ) {
return (
                                                        <Newspaper className="h-5 w-5" />
                                                    );
}

                                                if (
                                                    label === 'Karir' ||
                                                    label === 'Career'
                                                ) {
return (
                                                        <Briefcase className="h-5 w-5" />
                                                    );
}

                                                return null;
                                            };

                                            if (item.type === 'link') {
                                                const active = isLinkActive(
                                                    item.href,
                                                );
                                                const isExternal = item.href.startsWith('http');
                                                const className = cx(
                                                    'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-colors',
                                                    active
                                                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10'
                                                        : 'text-emerald-950 hover:bg-emerald-50 active:bg-emerald-100',
                                                );

                                                if (isExternal) {
                                                    return (
                                                        <a
                                                            key={item.label}
                                                            href={item.href}
                                                            className={className}
                                                            onClick={() => setMobileOpen(false)}
                                                        >
                                                            <span className="text-emerald-700">
                                                                {getIcon(item.label)}
                                                            </span>
                                                            {item.label}
                                                        </a>
                                                    );
                                                }

                                                return (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className={className}
                                                        onClick={() =>
                                                            setMobileOpen(false)
                                                        }
                                                    >
                                                        <span className="text-emerald-700">
                                                            {getIcon(
                                                                item.label,
                                                            )}
                                                        </span>
                                                        {item.label}
                                                    </Link>
                                                );
                                            }

                                            const isParentActive =
                                                item.type === 'mega'
                                                    ? item.sections.some((s) =>
                                                          s.items.some((i) =>
                                                              isLinkActive(
                                                                  i.href,
                                                              ),
                                                          ),
                                                      )
                                                    : item.items.some((i) =>
                                                          isLinkActive(i.href),
                                                      );

                                            return (
                                                <Disclosure
                                                    as="div"
                                                    key={item.label}
                                                    className="overflow-hidden"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className={cx(
                                                                    'flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-colors',
                                                                    isParentActive
                                                                        ? 'bg-emerald-50 text-emerald-700'
                                                                        : 'text-emerald-950 hover:bg-emerald-50 active:bg-emerald-100',
                                                                )}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-emerald-700">
                                                                        {getIcon(
                                                                            item.label,
                                                                        )}
                                                                    </span>
                                                                    {item.label}
                                                                </div>
                                                                <ChevronRight
                                                                    className={cx(
                                                                        'h-4 w-4 text-emerald-900/40 transition-transform duration-200',
                                                                        (open ||
                                                                            isParentActive) &&
                                                                            'rotate-90 text-emerald-700',
                                                                    )}
                                                                />
                                                            </Disclosure.Button>
                                                            <Transition
                                                                show={
                                                                    open ||
                                                                    isParentActive
                                                                }
                                                                enter="transition duration-200 ease-out"
                                                                enterFrom="opacity-0 -translate-y-2"
                                                                enterTo="opacity-100 translate-y-0"
                                                                leave="transition duration-150 ease-in"
                                                                leaveFrom="opacity-100 translate-y-0"
                                                                leaveTo="opacity-0 -translate-y-2"
                                                            >
                                                                <Disclosure.Panel className="mt-1 mb-2 ml-4 border-l-2 border-emerald-900/10 pl-4">
                                                                    <div className="grid gap-1">
                                                                        {item.type ===
                                                                        'mega'
                                                                            ? item.sections.map(
                                                                                  (
                                                                                      section,
                                                                                  ) => (
                                                                                      <div
                                                                                          key={
                                                                                              section.title
                                                                                          }
                                                                                          className="mb-2"
                                                                                      >
                                                                                          <div className="mb-1.5 px-3 pt-2 text-[10px] font-black tracking-wider text-emerald-950/50 uppercase">
                                                                                              {
                                                                                                  section.title
                                                                                              }
                                                                                          </div>
                                                                                          {section.items.map(
                                                                                              (
                                                                                                  sub,
                                                                                              ) => {
                                                                                                  const active =
                                                                                                      isLinkActive(
                                                                                                          sub.href,
                                                                                                      );

                                                                                                  return (
                                                                                                      <Link
                                                                                                          key={
                                                                                                              sub.label
                                                                                                          }
                                                                                                          href={
                                                                                                              sub.href
                                                                                                          }
                                                                                                          className={cx(
                                                                                                              'block rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors',
                                                                                                              active
                                                                                                                  ? 'bg-emerald-100 text-emerald-900'
                                                                                                                  : 'text-emerald-950/80 hover:bg-emerald-50 hover:text-emerald-900',
                                                                                                          )}
                                                                                                          onClick={() =>
                                                                                                              setMobileOpen(
                                                                                                                  false,
                                                                                                              )
                                                                                                          }
                                                                                                      >
                                                                                                          {
                                                                                                              sub.label
                                                                                                          }
                                                                                                      </Link>
                                                                                                  );
                                                                                              },
                                                                                          )}
                                                                                      </div>
                                                                                  ),
                                                                              )
                                                                            : item.items.map(
                                                                                  (
                                                                                      sub,
                                                                                  ) => {
                                                                                      const active =
                                                                                          isLinkActive(
                                                                                              sub.href,
                                                                                          );

                                                                                      return (
                                                                                          <Link
                                                                                              key={
                                                                                                  sub.label
                                                                                              }
                                                                                              href={
                                                                                                  sub.href
                                                                                              }
                                                                                              className={cx(
                                                                                                  'block rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors',
                                                                                                  active
                                                                                                      ? 'bg-emerald-100 text-emerald-900'
                                                                                                      : 'text-emerald-950/80 hover:bg-emerald-50 hover:text-emerald-900',
                                                                                              )}
                                                                                              onClick={() =>
                                                                                                  setMobileOpen(
                                                                                                      false,
                                                                                                  )
                                                                                              }
                                                                                          >
                                                                                              {
                                                                                                  sub.label
                                                                                              }
                                                                                          </Link>
                                                                                      );
                                                                                  },
                                                                              )}
                                                                    </div>
                                                                </Disclosure.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            );
                                        })}
                                    </nav>

                                    <div className="mt-10 rounded-3xl bg-emerald-950 p-6 text-white shadow-lg">
                                        <div className="text-xs font-black tracking-widest text-white/50 uppercase">
                                            Butuh Bantuan?
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <a
                                                href="tel:+62286325303"
                                                className="flex items-center gap-3 text-sm font-bold hover:text-emerald-200"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                                    <Phone className="h-4 w-4" />
                                                </div>
                                                <span>
                                                    Call Center
                                                    <span className="block text-xs font-semibold text-white/70">
                                                        0286 325303
                                                    </span>
                                                </span>
                                            </a>
                                            <a
                                                href="mailto:info@tamzis.id"
                                                className="flex items-center gap-3 text-sm font-bold hover:text-emerald-200"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                                    <Mail className="h-4 w-4" />
                                                </div>
                                                info@tamzis.id
                                            </a>
                                            <Link
                                                href="/kantor-layanan"
                                                className="flex items-center gap-3 text-sm font-bold hover:text-emerald-200"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                                    <MapPin className="h-4 w-4" />
                                                </div>
                                                Kantor Terdekat
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-emerald-900/10 p-5 text-center">
                                    <div className="text-[10px] font-bold tracking-widest text-emerald-900/40 uppercase">
                                        Copyright © IT Solution Yogyakarta
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </header>
    );
}
