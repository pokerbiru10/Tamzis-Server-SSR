import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { webpSource } from '@/lib/utils';

interface Banner {
    id: number;
    title: string;
    description: string | null;
    button_text: string | null;
    button_url: string | null;
    image_path: string;
}

const FALLBACK_IMAGES = [
    '/assets/img/slider/1.jpg',
    '/assets/img/slider/2.jpg',
    '/assets/img/slider/3.jpg',
    '/assets/img/slider/4.jpg',
];

export function TamzisHeroSlider({ banners }: { banners: Banner[] }) {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';

    if (!banners || banners.length === 0) {
        return null;
    }

    const slides = banners.map((b, i) => ({
        imageUrl: `/${b.image_path}`,
        imageWebp: webpSource(`/${b.image_path}`),
        fallbackUrl: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        alt: b.title,
        title: b.title,
        description: b.description || '',
        buttonText: b.button_text || (locale === 'id' ? 'Pelajari Selengkapnya' : 'Learn More'),
        buttonUrl: b.button_url || '#',
    }));

    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(true);
    const [imgFailed, setImgFailed] = useState(false);

    useEffect(() => {
        if (slides.length === 0) {
return;
}

        const id = window.setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setActive((current) => (current + 1) % slides.length);
                setImgFailed(false);
                setVisible(true);
            }, 500);
        }, 6000);

        return () => window.clearInterval(id);
    }, [slides.length]);

    function goTo(index: number) {
        if (index === active) {
return;
}

        setVisible(false);
        setTimeout(() => {
            setActive(index);
            setImgFailed(false);
            setVisible(true);
        }, 500);
    }

    function prev() {
        goTo((active - 1 + slides.length) % slides.length);
    }

    function next() {
        goTo((active + 1) % slides.length);
    }

    const slide = slides[active];

    return (
        <section className="bg-white">
            <div className="w-full">
                <div className="relative w-full overflow-hidden bg-emerald-950">
                    <div
                        className="w-full transition-opacity duration-700 ease-in-out"
                        style={{ opacity: visible ? 1 : 0 }}
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/7] lg:aspect-[2667/938]">
                            {slide.imageWebp ? (
                                <picture>
                                    <source srcSet={slide.imageWebp} type="image/webp" />
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.alt}
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                        loading="eager"
                                        fetchPriority="high"
                                        onError={() => setImgFailed(true)}
                                    />
                                </picture>
                            ) : (
                                <img
                                    key={slide.imageUrl}
                                    src={imgFailed ? slide.fallbackUrl : slide.imageUrl}
                                    alt={slide.alt}
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                    loading="eager"
                                    fetchPriority="high"
                                    onError={() => setImgFailed(true)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />

                    <div
                        className="absolute inset-0 flex items-center transition-all duration-700 ease-in-out"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible
                                ? 'translateY(0)'
                                : 'translateY(10px)',
                        }}
                    >
                        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
                            <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
                                <h1 className="mb-4 text-2xl leading-[1.1] font-bold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {slide.title}
                                </h1>

                                {slide.description && (
                                    <div
                                        className="prose prose-sm sm:prose-base md:prose-lg prose-invert mb-6 max-w-none leading-relaxed font-medium text-white/80 sm:mb-10"
                                        dangerouslySetInnerHTML={{ __html: slide.description }}
                                    />
                                )}

                                <Link
                                    href={slide.buttonUrl}
                                    className="group inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-900/50 transition-all hover:bg-emerald-600 active:scale-95 sm:px-10 sm:py-4 sm:text-sm"
                                >
                                    {slide.buttonText}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {slides.length > 1 && (
                        <>
                            <div className="absolute right-6 bottom-6 z-30 flex gap-3 sm:right-10 sm:bottom-10">
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90 sm:h-12 sm:w-12"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={next}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90 sm:h-12 sm:w-12"
                                    aria-label="Next"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1 sm:bottom-8 sm:gap-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => goTo(index)}
                                        className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7"
                                        aria-label={`Go to slide ${index + 1}`}
                                    >
                                        <span
                                            className={cx(
                                                'block h-1.5 rounded-full transition-all duration-300',
                                                index === active
                                                    ? 'w-4 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                                                    : 'w-1.5 bg-white/30 hover:bg-white/50',
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

function cx(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(' ');
}
