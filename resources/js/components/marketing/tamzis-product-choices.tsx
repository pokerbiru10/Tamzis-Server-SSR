import { Link, usePage } from '@inertiajs/react';

export type ChoicesSectionData = {
    badge: string;
    title: string;
    description: string;
    readMore: string;
    cards: Array<{ title: string; description: string; href: string; tag: string }>;
};

export function TamzisProductChoices({ data }: { data?: ChoicesSectionData }) {
    const { props } = usePage<{
        homeSections?: { choices?: Record<string, ChoicesSectionData> };
    }>();
    const locale = (props.locale as string) || 'id';

    const translations = {
        id: {
            badge: 'Pilihan Produk',
            title: 'Simpanan & Pembiayaan Terbaik',
            description:
                'Temukan produk yang paling sesuai untuk kebutuhan finansial Anda bersama TAMZIS.',
            readMore: 'Selengkapnya',
            cards: [
                {
                    title: 'Simpanan Mudharabah',
                    description:
                        'Investasi syariah jangka panjang dengan bagi hasil kompetitif untuk masa depan yang lebih tenang.',
                    href: '/simpanan-mudharabah',
                    imageUrl:
                        '/assets/img/produk-unggulan/simpanan-mudharabah-hd.webp',
                    tag: 'Investasi',
                },
                {
                    title: 'Simpanan Pendidikan',
                    description:
                        'Rencanakan masa depan pendidikan buah hati Anda dengan simpanan syariah yang terencana dan aman.',
                    href: '/simpanan-mutiara',
                    imageUrl:
                        '/assets/img/produk-unggulan/simpanan-pendidikan.webp',
                    tag: 'Pendidikan',
                },
                {
                    title: 'Griya Tumbuh Bahagia',
                    description:
                        'Wujudkan rumah impian dengan pembiayaan syariah yang ringan, terencana, dan penuh berkah.',
                    href: '/rumah-tumbuh-bahagia',
                    imageUrl:
                        '/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp',
                    tag: 'Pembiayaan',
                },
            ],
        },
        en: {
            badge: 'Product Choices',
            title: 'Best Savings & Financing',
            description:
                'Find the products that best suit your financial needs with TAMZIS.',
            readMore: 'Read More',
            cards: [
                {
                    title: 'Mudharabah Savings',
                    description:
                        'Long-term sharia investment with competitive profit sharing for a more peaceful future.',
                    href: '/simpanan-mudharabah',
                    imageUrl:
                        '/assets/img/produk-unggulan/simpanan-mudharabah-hd.webp',
                    tag: 'Investment',
                },
                {
                    title: 'Education Savings',
                    description:
                        "Plan your child's educational future with planned and secure sharia savings.",
                    href: '/simpanan-mutiara',
                    imageUrl:
                        '/assets/img/produk-unggulan/simpanan-pendidikan.webp',
                    tag: 'Education',
                },
                {
                    title: 'Griya Tumbuh Bahagia',
                    description:
                        'Realize your dream home with light, planned, and blessed sharia financing.',
                    href: '/rumah-tumbuh-bahagia',
                    imageUrl:
                        '/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp',
                    tag: 'Financing',
                },
            ],
        },
    };

    const defaults =
        translations[locale as keyof typeof translations] || translations.id;

    const fromDb = data ?? props.homeSections?.choices?.[locale];

    // Teks dari database (dashboard); gambar tetap mengikuti urutan bawaan.
    const t = fromDb
        ? {
              badge: fromDb.badge,
              title: fromDb.title,
              description: fromDb.description,
              readMore: fromDb.readMore,
              cards: defaults.cards.map((card, index) => ({
                  ...card,
                  ...(fromDb.cards?.[index] ?? {}),
              })),
          }
        : defaults;

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-6 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold tracking-widest text-emerald-700 uppercase">
                        {t.badge}
                    </span>
                    <h2 className="mb-6 text-4xl leading-tight font-bold text-emerald-950 sm:text-6xl">
                        {t.title}
                    </h2>
                    <div
                        className="prose prose-slate mt-3 max-w-none text-sm font-semibold text-emerald-950/70 sm:text-base"
                        dangerouslySetInnerHTML={{ __html: t.description }}
                    />
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {t.cards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.href}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="relative">
                                <div className="aspect-[3545/2268] w-full overflow-hidden bg-emerald-950/5">
                                    <img
                                        src={card.imageUrl}
                                        alt={card.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute right-0 bottom-0 rounded-tl-2xl bg-emerald-900 px-4 py-2 text-xs font-extrabold tracking-widest text-white uppercase shadow">
                                    {card.tag}
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-5">
                                <div className="text-lg leading-snug font-extrabold text-emerald-950">
                                    {card.title}
                                </div>
                                <div
                                    className="prose prose-sm prose-slate mt-2 max-w-none leading-relaxed font-semibold text-emerald-950/75"
                                    dangerouslySetInnerHTML={{ __html: card.description }}
                                />

                                <div className="mt-auto pt-6">
                                    <div className="h-px w-full bg-emerald-900/10" />
                                    <div className="pt-4">
                                        <div className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 group-hover:text-emerald-800">
                                            {t.readMore}
                                            <span className="transition-transform group-hover:translate-x-0.5">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
