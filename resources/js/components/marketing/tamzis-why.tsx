import { faMosque } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePage } from '@inertiajs/react';
import { MapPin, Scale, CheckCircle2 } from 'lucide-react';

import { getSectionIcon } from '@/lib/section-icons';
import { webpSource } from '@/lib/utils';

type WhySectionData = {
    title: string;
    description: string;
    reasons: Array<{ title: string; description: string; icon?: string }>;
};

export function TamzisWhy({
    data,
    image,
    onImageClick,
}: {
    data?: WhySectionData;
    image?: string | null;
    onImageClick?: () => void;
}) {
    const { props } = usePage<{
        homeSections?: {
            why?: Record<string, WhySectionData> & { image?: string };
        };
    }>();
    const locale = (props.locale as string) || 'id';

    const translations = {
        id: {
            title: 'Kepercayaan Lebih dari Tiga Dekade',
            description:
                'TAMZIS Bina Utama hadir sejak 1992, melayani anggota dengan keuangan syariah yang transparan, amanah, dan memberdayakan.',
            reasons: [
                {
                    title: 'Pengawasan Resmi',
                    description: 'Diawasi Kementerian Koperasi RI',
                    Icon: Scale,
                },
                {
                    title: 'Fatwa Syariah',
                    description: 'Seluruh produk diawasi DSN-MUI',
                    icon: (
                        <FontAwesomeIcon
                            icon={faMosque}
                            className="h-8 w-8 text-white"
                        />
                    ),
                },
                {
                    title: 'Prinsip Amanah',
                    description: 'Diawasi Pengawas Syariah',
                    Icon: CheckCircle2,
                },
                {
                    title: 'Jaringan Luas',
                    description:
                        'Memiliki lebih dari 50 kantor layanan nasional',
                    Icon: MapPin,
                },
            ],
        },
        en: {
            title: 'Trust for Over Three Decades',
            description:
                'TAMZIS Bina Utama has been present since 1992, serving the community with transparent, trustworthy, and empowering sharia finance.',
            reasons: [
                {
                    title: 'Official Oversight',
                    description: 'Supervised by Ministry of Cooperatives RI',
                    Icon: Scale,
                },
                {
                    title: 'Sharia Fatwa',
                    description: 'All products supervised by DSN-MUI',
                    icon: (
                        <FontAwesomeIcon
                            icon={faMosque}
                            className="h-8 w-8 text-white"
                        />
                    ),
                },
                {
                    title: 'Trustworthy Principles',
                    description: 'Supervised by Sharia Supervisors',
                    Icon: CheckCircle2,
                },
                {
                    title: 'Wide Network',
                    description: 'Has more than 50 national service offices',
                    Icon: MapPin,
                },
            ],
        },
    };

    const defaults =
        translations[locale as keyof typeof translations] || translations.id;

    const fromDb = data ?? props.homeSections?.why?.[locale];
    const customImage = image ?? props.homeSections?.why?.image;

    // Teks dari database (dashboard), ikon tetap mengikuti urutan bawaan.
    const t = fromDb
        ? {
              title: fromDb.title,
              description: fromDb.description,
              reasons: defaults.reasons.map((reason, index) => {
                  const IconOverride = getSectionIcon(fromDb.reasons?.[index]?.icon);

                  return {
                      ...reason,
                      title: fromDb.reasons?.[index]?.title ?? reason.title,
                      description:
                          fromDb.reasons?.[index]?.description ??
                          reason.description,
                      ...(IconOverride
                          ? { Icon: IconOverride, icon: undefined }
                          : {}),
                  };
              }),
          }
        : defaults;

    return (
        <section className="bg-emerald-800 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
                            {t.title}
                        </h2>
                        <div
                            className="prose prose-invert mt-3 max-w-xl text-sm leading-relaxed font-medium text-white/85 sm:text-base"
                            dangerouslySetInnerHTML={{ __html: t.description }}
                        />

                        <div className="mt-5 h-1 w-20 rounded-full bg-orange-500" />

                        <div className="mt-7 grid gap-6 sm:grid-cols-2">
                            {t.reasons.map((r, index) => (
                                <ReasonItem
                                    key={index}
                                    icon={r.icon}
                                    Icon={r.Icon}
                                    title={r.title}
                                    description={r.description}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:pl-6">
                        <div
                            className={cxWhy(
                                'group relative overflow-hidden rounded-2xl border border-white/15 shadow-sm',
                                onImageClick && 'cursor-pointer',
                            )}
                            onClick={onImageClick}
                            role={onImageClick ? 'button' : undefined}
                            title={onImageClick ? 'Klik untuk ganti gambar' : undefined}
                        >
                            {customImage ? (
                                <picture>
                                    <source
                                        srcSet={webpSource(customImage)}
                                        type="image/webp"
                                    />
                                    <img
                                        src={`/${customImage}`}
                                        alt={
                                            locale === 'en'
                                                ? 'Why TAMZIS'
                                                : 'Mengapa TAMZIS'
                                        }
                                        className="w-full"
                                        loading="lazy"
                                    />
                                </picture>
                            ) : (
                                <picture>
                                    <source
                                        srcSet="/assets/img/menu/why-tz.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="/assets/img/menu/why-tz.jpg"
                                        alt={
                                            locale === 'en'
                                                ? 'Why TAMZIS'
                                                : 'Mengapa TAMZIS'
                                        }
                                        className="w-full"
                                        width={1586}
                                        height={992}
                                        loading="lazy"
                                    />
                                </picture>
                            )}

                            {onImageClick && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/50">
                                    <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                        Klik untuk ganti gambar
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function cxWhy(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(' ');
}

function ReasonItem({
    icon,
    Icon,
    title,
    description,
}: {
    icon?: React.ReactNode;
    Icon?: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                {icon ??
                    (Icon ? <Icon className="h-7 w-7 text-white" /> : null)}
            </div>
            <div className="min-w-0">
                <div className="text-lg leading-snug font-extrabold">
                    {title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed font-medium text-white/80">
                    {description}
                </div>
            </div>
        </div>
    );
}
