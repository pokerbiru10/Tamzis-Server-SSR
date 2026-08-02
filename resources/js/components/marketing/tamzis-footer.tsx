import {
    faFacebookF,
    faInstagram,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, usePage } from '@inertiajs/react';
import { TamzisBottomNav } from './tamzis-bottom-nav';

export type FooterData = {
    about: string;
    logo: string;
    menuTitle: string;
    links: Array<{ label: string; href: string }>;
    contactTitle: string;
    callCenter: string;
    phone: string;
    email: string;
    nearestOffice: string;
    privacy: string;
    terms: string;
    copyright: string;
};

export const defaultFooter: Record<'id' | 'en', FooterData> = {
    id: {
        about: 'Layanan keuangan syariah yang aman, transparan, dan memberdayakan—untuk keluarga, usaha, dan umat.',
        logo: '/assets/img/logo-remove.webp',
        menuTitle: 'Menu',
        links: [
            { label: 'Simpanan', href: '/simpanan-mutiara' },
            { label: 'Pembiayaan', href: '/ikhtiar-utama' },
            { label: 'Baitul Maal', href: '/ziswaf' },
            { label: 'Berita & Kegiatan', href: '/' },
        ],
        contactTitle: 'Kontak',
        callCenter: 'Telpon Kantor Pusat: 0286 325303',
        phone: '0286325303',
        email: 'info@tamzis.id',
        nearestOffice: 'Kantor Terdekat',
        privacy: 'Kebijakan Privasi',
        terms: 'Syarat & Ketentuan',
        copyright: 'Copyright © IT Solution Yogyakarta',
    },
    en: {
        about: 'Secure, transparent, and empowering sharia financial services—for families, businesses, and the community.',
        logo: '/assets/img/logo-remove.webp',
        menuTitle: 'Menu',
        links: [
            { label: 'Savings', href: '/simpanan-mutiara' },
            { label: 'Financing', href: '/ikhtiar-utama' },
            { label: 'Baitul Maal', href: '/ziswaf' },
            { label: 'News & Activities', href: '/' },
        ],
        contactTitle: 'Contact',
        callCenter: 'Head Office Phone: 0286 325303',
        phone: '0286325303',
        email: 'info@tamzis.id',
        nearestOffice: 'Nearest Office',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
        copyright: 'Copyright © IT Solution Yogyakarta',
    },
};

export function TamzisFooter({
    data,
    hideBottomNav = false,
}: {
    data?: FooterData;
    hideBottomNav?: boolean;
}) {
    const { props } = usePage<{
        siteSections?: {
            footer?: Record<string, FooterData>;
            topbar?: { socials?: { instagram?: string; facebook?: string; youtube?: string } };
        };
    }>();
    const locale = (props.locale as string) || 'id';
    const lang = locale === 'en' ? 'en' : 'id';

    // Teks dari database (dashboard), fallback ke bawaan.
    const defaults = defaultFooter[lang];
    const fromDb = data ?? props.siteSections?.footer?.[lang];
    const t: FooterData = fromDb ? { ...defaults, ...fromDb } : defaults;
    t.copyright = 'Copyright © IT Solution Yogyakarta';

    const socials = {
        instagram: 'https://www.instagram.com/tamzis_id/',
        facebook: 'https://www.facebook.com/TamzisBinaUtama/',
        youtube: 'https://www.youtube.com/@tamzisbinautama',
        ...(props.siteSections?.topbar?.socials ?? {}),
    };

    return (
        <footer className="bg-emerald-950 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-10 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <img
                            src={t.logo || '/assets/img/logo-remove.webp'}
                            alt="TAMZIS Bina Utama"
                            className="h-10 w-auto brightness-0 invert"
                            width={600}
                            height={122}
                            style={{ maxWidth: '150px', height: 'auto' }}
                            loading="lazy"
                        />
                        <p className="mt-4 max-w-xl text-sm leading-relaxed font-medium text-white/75">
                            {t.about}
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <a
                                href={socials.instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="h-4 w-4"
                                />
                            </a>
                            <a
                                href={socials.facebook}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="h-4 w-4"
                                />
                            </a>
                            <a
                                href={socials.youtube}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faYoutube}
                                    className="h-4 w-4"
                                />
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-extrabold text-white">
                            {t.menuTitle}
                        </div>
                        <div className="mt-4 grid gap-2 text-sm font-semibold text-white/75">
                            {t.links.map((link, index) => (
                                <Link
                                    key={index}
                                    className="hover:text-white"
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-extrabold text-white">
                            {t.contactTitle}
                        </div>
                        <div className="mt-4 grid gap-3 text-sm font-semibold text-white/75">
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="mt-0.5 h-4 w-4 text-white/70"
                                />
                                <a
                                    href={`tel:${t.phone}`}
                                    className="hover:text-white"
                                >
                                    {t.callCenter}
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="mt-0.5 h-4 w-4 text-white/70"
                                />
                                <a
                                    href={`mailto:${t.email}`}
                                    className="hover:text-white"
                                >
                                    {t.email}
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="mt-0.5 h-4 w-4 text-white/70"
                                />
                                <Link
                                    href="/kantor-layanan"
                                    className="hover:text-white"
                                >
                                    {t.nearestOffice}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 h-px w-full bg-white/10" />
                <div className="mt-6 flex flex-col gap-2 text-xs font-semibold text-white/55 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        {t.copyright}
                    </div>
                    <div className="flex gap-4">
                        <Link href="/kebijakan-privasi" className="hover:text-white/80">
                            {t.privacy}
                        </Link>
                        <Link href="/syarat-ketentuan" className="hover:text-white/80">
                            {t.terms}
                        </Link>
                    </div>
                </div>
            </div>
            {!hideBottomNav && <TamzisBottomNav />}
        </footer>
    );
}
