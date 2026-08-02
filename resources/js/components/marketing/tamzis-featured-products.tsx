import { Link, usePage } from '@inertiajs/react';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { webpSource } from '@/lib/utils';

function ProductCarouselCard({
    category,
    readMore,
}: {
    category: {
        id: string;
        name: string;
        products: {
            title: string;
            href: string;
            desc: string;
            tag: string;
            imageUrl?: string;
            imageFit?: 'cover' | 'contain';
        }[];
    };
    readMore: string;
}) {
    const [current, setCurrent] = useState(0);
    const total = category.products.length;
    const product = category.products[current];

    const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
    const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

    return (
        <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
            {/* Image area with carousel controls */}
            <div className="relative">
                <div className="flex aspect-[3545/2268] w-full items-center justify-center overflow-hidden bg-slate-100">
                    {product.imageUrl ? (
                        <picture>
                            <source
                                srcSet={webpSource(product.imageUrl)}
                                type="image/webp"
                            />
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className={`h-full w-full transition-transform duration-500 hover:scale-105 ${product.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                            />
                        </picture>
                    ) : (
                        <ImageIcon className="h-12 w-12 text-slate-300" />
                    )}
                </div>
                <div className="absolute top-0 right-0 z-10 rounded-bl-2xl bg-emerald-900 px-4 py-2 text-[10px] font-extrabold tracking-widest text-white uppercase shadow-lg">
                    {product.tag}
                </div>

                {/* Carousel arrow buttons */}
                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prev}
                            className="absolute top-1/2 left-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-emerald-700 shadow transition-all hover:bg-white"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            className="absolute top-1/2 right-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-emerald-700 shadow transition-all hover:bg-white"
                            aria-label="Next"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </>
                )}
            </div>

            {/* Content area */}
            <div className="p-5">
                <div className="text-lg leading-snug font-extrabold text-emerald-950">
                    {product.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed font-semibold text-emerald-950/75">
                    {product.desc}
                </div>

                <div className="mt-6">
                    <div className="h-px w-full bg-emerald-900/10" />
                    <div className="flex items-center justify-between pt-4">
                        <Link
                            href={product.href}
                            className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 hover:text-emerald-800"
                        >
                            {readMore}
                            <span className="transition-transform hover:translate-x-0.5">
                                →
                            </span>
                        </Link>

                        {/* Dot indicators */}
                        <div className="flex items-center gap-0.5">
                            {category.products.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrent(idx)}
                                    className="flex h-6 w-6 items-center justify-center"
                                    aria-label={`Slide ${idx + 1}`}
                                >
                                    <span
                                        className={`block h-2 w-2 rounded-full transition-all ${idx === current ? 'w-4 bg-emerald-700' : 'bg-slate-300 hover:bg-slate-400'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type FeaturedProductText = {
    title: string;
    href: string;
    desc: string;
    tag: string;
    imageUrl?: string;
    imageFit?: 'cover' | 'contain';
};

export type FeaturedSectionData = {
    badge: string;
    title: string;
    description: string;
    readMore: string;
    categories: Array<{
        name: string;
        products: Array<{
            title: string;
            href: string;
            desc: string;
            tag: string;
            imageUrl?: string;
            imageFit?: 'cover' | 'contain';
        }>;
    }>;
};

export function TamzisFeaturedProducts({ data }: { data?: FeaturedSectionData }) {
    const { props } = usePage<{
        homeSections?: { featured?: Record<string, FeaturedSectionData> };
    }>();
    const locale = (props.locale as string) || 'id';

    const translations = {
        id: {
            badge: 'Produk Unggulan',
            title: 'Layanan Keuangan Syariah Terbaik',
            description:
                'Solusi finansial yang lengkap, aman, dan berkah untuk mendukung kebutuhan ekonomi Anda.',
            readMore: 'Selengkapnya',
            categories: [
                {
                    id: 'savings',
                    name: 'Simpanan',
                    products: [
                        {
                            title: 'Simpanan Mutiara',
                            href: '/simpanan-mutiara',
                            desc: 'Simpanan harian wadiah.',
                            tag: 'Simpanan',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-mutiara.webp',
                        },
                        {
                            title: 'Simpanan Pendidikan',
                            href: '/simpanan-pendidikan',
                            desc: 'Simpanan terencana pendidikan.',
                            tag: 'Simpanan',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-pendidikan-poster.webp',
                        },
                        {
                            title: 'Simpanan Ijabah',
                            href: '/simpanan-ijabah',
                            desc: 'Simpanan impian masa depan.',
                            tag: 'Investasi',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-ijabah.webp',
                        },
                        {
                            title: 'Simpanan Mudharabah',
                            href: '/simulasi-mudharabah',
                            desc: 'Simpanan bagi hasil syariah.',
                            tag: 'Simpanan',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-mudharabah.webp',
                        },
                    ],
                },
                {
                    id: 'financing',
                    name: 'Pembiayaan',
                    products: [
                        {
                            title: 'Modal Usaha',
                            href: '/ikhtiar-utama',
                            desc: 'Pendanaan modal kerja produktif.',
                            tag: 'Pembiayaan',
                            imageUrl: '/images/modal.webp',
                        },
                        {
                            title: 'Griya Tumbuh Bahagia',
                            href: '/rumah-tumbuh-bahagia',
                            desc: 'Pembiayaan kepemilikan rumah syariah yang ringan dan terencana.',
                            tag: 'GTB',
                            imageUrl:
                                '/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp',
                        },
                        {
                            title: 'Murabahah',
                            href: '/murabahah',
                            desc: 'Pembiayaan jual beli syariah.',
                            tag: 'Pembiayaan',
                            imageUrl:
                                '/assets/img/produk-unggulan/murabahah.webp',
                        },
                        {
                            title: 'Kafalah',
                            href: '/kafalah',
                            desc: 'Jaminan pembiayaan yang amanah.',
                            tag: 'Pembiayaan',
                            imageUrl: '/assets/img/produk-unggulan/kafalah-penjamin.webp',
                        },
                    ],
                },
                {
                    id: 'digital',
                    name: 'M-TAMZIS',
                    products: [
                        {
                            title: 'Transfer Antar Anggota & Perbankan',
                            href: '/layanan-digital',
                            desc: 'Transfer dana antar anggota TAMZIS dan melalui jaringan perbankan nasional.',
                            tag: 'Transfer',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-transfer.webp',
                        },
                        {
                            title: 'Saldo Real-time',
                            href: '/layanan-digital',
                            desc: 'Pantau saldo pembiayaan dan simpanan Anda secara real-time 24/7.',
                            tag: 'Real-time',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-saldo.webp',
                        },
                        {
                            title: 'Pulsa & Pembayaran PDAM',
                            href: '/layanan-digital',
                            desc: 'Pembelian pulsa, token listrik, dan pembayaran tagihan PDAM dalam satu aplikasi.',
                            tag: 'PPOB',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-pulsa-pdam.webp',
                        },
                        {
                            title: 'Setor ZIS & Sedekah',
                            href: '/layanan-digital',
                            desc: 'Tunaikan zakat, infaq, dan sedekah langsung dari aplikasi dengan mudah.',
                            tag: 'ZIS',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-zis.webp',
                        },
                    ],
                },
            ],
        },
        en: {
            badge: 'Featured Products',
            title: 'Best Sharia Financial Services',
            description:
                'Complete, safe, and blessed financial solutions to support your economic needs.',
            readMore: 'Read More',
            categories: [
                {
                    id: 'savings',
                    name: 'Savings',
                    products: [
                        {
                            title: 'Savings Mutiara',
                            href: '/simpanan-mutiara',
                            desc: 'Daily wadiah savings.',
                            tag: 'Savings',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-mutiara.webp',
                        },
                        {
                            title: 'Education Savings',
                            href: '/simpanan-pendidikan',
                            desc: 'Planned education savings.',
                            tag: 'Savings',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-pendidikan-poster.webp',
                        },
                        {
                            title: 'Ijabah Savings',
                            href: '/simpanan-ijabah',
                            desc: 'Future dream savings.',
                            tag: 'Investment',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-ijabah.webp',
                        },
                        {
                            title: 'Mudharabah Savings',
                            href: '/simulasi-mudharabah',
                            desc: 'Sharia profit sharing savings.',
                            tag: 'Savings',
                            imageUrl:
                                '/assets/img/produk-unggulan/simpanan-mudharabah.webp',
                        },
                    ],
                },
                {
                    id: 'financing',
                    name: 'Financing',
                    products: [
                        {
                            title: 'Business Capital',
                            href: '/ikhtiar-utama',
                            desc: 'Productive working capital funding.',
                            tag: 'Financing',
                            imageUrl: '/images/modal.webp',
                        },
                        {
                            title: 'Griya Tumbuh Bahagia',
                            href: '/rumah-tumbuh-bahagia',
                            desc: 'Light and planned sharia homeownership financing.',
                            tag: 'GTB',
                            imageUrl:
                                '/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp',
                        },
                        {
                            title: 'Murabahah',
                            href: '/murabahah',
                            desc: 'Sharia trade-based financing.',
                            tag: 'Financing',
                            imageUrl:
                                '/assets/img/produk-unggulan/murabahah.webp',
                        },
                        {
                            title: 'Kafalah',
                            href: '/kafalah',
                            desc: 'Trustworthy financing guarantee.',
                            tag: 'Financing',
                            imageUrl: '/assets/img/produk-unggulan/kafalah-penjamin.webp',
                        },
                    ],
                },
                {
                    id: 'digital',
                    name: 'M-TAMZIS',
                    products: [
                        {
                            title: 'Member & Bank Transfer',
                            href: '/layanan-digital',
                            desc: 'Transfer funds between TAMZIS members and through national banking networks.',
                            tag: 'Transfer',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-transfer.webp',
                        },
                        {
                            title: 'Real-time Balance',
                            href: '/layanan-digital',
                            desc: 'Monitor your financing and savings balances in real-time 24/7.',
                            tag: 'Real-time',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-saldo.webp',
                        },
                        {
                            title: 'Credit & Bill Payment',
                            href: '/layanan-digital',
                            desc: 'Buy phone credit, electricity tokens, and pay water bills in one app.',
                            tag: 'PPOB',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-pulsa-pdam.webp',
                        },
                        {
                            title: 'ZIS & Charity',
                            href: '/layanan-digital',
                            desc: 'Pay zakat, infaq, and charity directly from the app with ease.',
                            tag: 'ZIS',
                            imageUrl:
                                '/assets/img/produk-unggulan/m-tamzis-zis.webp',
                        },
                    ],
                },
            ],
        },
    };

    const defaults =
        translations[locale as keyof typeof translations] || translations.id;

    const fromDb = data ?? props.homeSections?.featured?.[locale];

    // Teks dari database (dashboard); gambar tetap mengikuti urutan bawaan.
    const t = fromDb
        ? {
              ...defaults,
              badge: fromDb.badge,
              title: fromDb.title,
              description: fromDb.description,
              readMore: fromDb.readMore,
              categories: defaults.categories.map((category, ci) => ({
                  ...category,
                  name: fromDb.categories?.[ci]?.name ?? category.name,
                  products: category.products.map((product, pi) => ({
                      ...product,
                      ...(fromDb.categories?.[ci]?.products?.[pi] ?? {}),
                  })),
              })),
          }
        : defaults;

    return (
        <section id="pembiayaan" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="mb-6 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold tracking-widest text-emerald-700 uppercase">
                        {t.badge}
                    </span>
                    <h2 className="mb-6 text-4xl leading-tight font-bold text-emerald-950 sm:text-6xl">
                        {t.title}
                    </h2>
                    <div
                        className="prose prose-slate max-w-none text-base leading-relaxed font-medium text-slate-500"
                        dangerouslySetInnerHTML={{ __html: t.description }}
                    />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {t.categories.map((category) => (
                        <ProductCarouselCard
                            key={category.id}
                            category={category}
                            readMore={t.readMore}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
