import { Head, usePage } from '@inertiajs/react';

import { TamzisBaitulMaal } from '@/components/marketing/tamzis-baitul-maal';
import { TamzisFeaturedProducts } from '@/components/marketing/tamzis-featured-products';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { TamzisHeroSlider } from '@/components/marketing/tamzis-hero-slider';
import { TamzisHighlights } from '@/components/marketing/tamzis-highlights';
import { TamzisProductChoices } from '@/components/marketing/tamzis-product-choices';
import { TamzisStandards } from '@/components/marketing/tamzis-standards';
import { TamzisStatsBar } from '@/components/marketing/tamzis-stats-bar';
import { TamzisTestimonials } from '@/components/marketing/tamzis-testimonials';
import { TamzisWhy } from '@/components/marketing/tamzis-why';
import { webpSource } from '@/lib/utils';

interface HeroBanner {
    id: number;
    title: string;
    description: string | null;
    button_text: string | null;
    button_url: string | null;
    image_path: string;
}

interface Testimonial {
    id: number;
    locale: string;
    name: string;
    occupation: string | null;
    location: string | null;
    quote: string;
    photo_url: string | null;
    order: number;
    is_active: boolean;
}

export default function Welcome() {
    const { props } = usePage<{ heroBanners: HeroBanner[]; testimonials: Testimonial[] }>();
    const locale = (props.locale as string) || 'id';

    const firstBanner = props.heroBanners?.[0];
    const lcpImage = firstBanner
        ? webpSource(`/${firstBanner.image_path}`)
        : undefined;

    const translations = {
        id: {
            title: 'Beranda - TAMZIS Bina Utama',
            description:
                'Lembaga keuangan mikro syariah dengan layanan simpanan, pembiayaan, dan program sosial (Baitul Maal) yang aman, transparan, dan berkah.',
        },
        en: {
            title: 'Home - TAMZIS Bina Utama',
            description:
                'Sharia microfinance institution offering savings, financing, and social programs (Baitul Maal) that are safe, transparent, and blessed.',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    return (
        <>
            <Head title={t.title}>
                <meta name="description" content={t.description} />
                <meta property="og:title" content={t.title} />
                <meta property="og:description" content={t.description} />
                {lcpImage && (
                    <link rel="preload" as="image" href={lcpImage} fetchPriority="high" />
                )}
            </Head>
            <main className="min-h-screen bg-white text-emerald-950">
                <TamzisHeader />
                <TamzisHeroSlider banners={props.heroBanners} />
                <TamzisStatsBar />
                <TamzisFeaturedProducts />
                <TamzisWhy />
                <TamzisStandards />
                <TamzisProductChoices />
                <TamzisBaitulMaal />
                <TamzisHighlights />
                <TamzisTestimonials />
                <TamzisFooter />
            </main>
        </>
    );
}
