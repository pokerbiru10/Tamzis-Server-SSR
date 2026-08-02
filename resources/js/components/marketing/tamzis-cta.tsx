import {
    faLocationDot,
    faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePage } from '@inertiajs/react';

export function TamzisCTA() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';

    const translations = {
        id: {
            title: 'Bergabung Bersama Ratusan Ribu Anggota TAMZIS',
            description:
                'Mulai perjalanan finansial syariah Anda hari ini. Hubungi kami atau kunjungi kantor terdekat.',
            contactBtn: 'Hubungi Kami',
            visitBtn: 'Kunjungi Kantor',
        },
        en: {
            title: 'Join Hundreds of Thousands of TAMZIS Members',
            description:
                'Start your sharia financial journey today. Contact us or visit our nearest office.',
            contactBtn: 'Contact Us',
            visitBtn: 'Visit Office',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    return (
        <section className="bg-emerald-800 text-white">
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -right-24 -bottom-28 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
                    <div className="max-w-4xl">
                        <h2 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                            {t.title}
                        </h2>
                        <p className="mt-3 text-base leading-relaxed font-medium text-white/85">
                            {t.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="https://wa.me/628112613134?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20TAMZIS"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow hover:bg-orange-600"
                            >
                                <FontAwesomeIcon
                                    icon={faPhoneVolume}
                                    className="h-4 w-4"
                                />
                                {t.contactBtn}
                            </a>
                            <a
                                href="#alamat"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/15"
                            >
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="h-4 w-4"
                                />
                                {t.visitBtn}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
