import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Stat = {
    value: number;
    suffix: string;
    label: string;
};

function formatValue(value: number, suffix: string) {
    if (suffix === 'K+') {
        const k = Math.round(value / 1000);

        return `${k}K+`;
    }

    return `${Math.round(value)}${suffix}`;
}

function useCountUp(target: number, start: boolean, durationMs: number = 900) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) {
return;
}

        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            let active = true;
            const handle = requestAnimationFrame(() => {
                if (active) {
                    setValue(target);
                }
            });

            return () => {
                active = false;
                cancelAnimationFrame(handle);
            };
        }

        let raf = 0;
        const startTime = performance.now();

        const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / durationMs);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(target * eased);

            if (t < 1) {
raf = requestAnimationFrame(tick);
}
        };

        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [durationMs, start, target]);

    return value;
}

export function TamzisStatsBar({ data }: { data?: Stat[] }) {
    const { props } = usePage<{
        homeSections?: { stats?: Record<string, Stat[]> };
    }>();
    const locale = (props.locale as string) || 'id';

    const stats: Stat[] = useMemo(() => {
        const defaults = {
            id: [
                { value: 33, suffix: '+', label: 'Tahun Pengalaman' },
                { value: 50, suffix: '+', label: 'Kantor Cabang' },
                { value: 200_000, suffix: 'K+', label: 'Anggota Aktif' },
                { value: 100, suffix: '%', label: 'Berbasis Syariah' },
            ],
            en: [
                { value: 33, suffix: '+', label: 'Years Experience' },
                { value: 50, suffix: '+', label: 'Branch Offices' },
                { value: 200_000, suffix: 'K+', label: 'Active Members' },
                { value: 100, suffix: '%', label: 'Sharia Based' },
            ],
        };

        const source = data ?? props.homeSections?.stats?.[locale];

        if (source && source.length > 0) {
            return source.map((stat) => ({
                ...stat,
                value: Number(stat.value) || 0,
            }));
        }

        return defaults[locale as keyof typeof defaults] || defaults.id;
    }, [data, locale, props.homeSections]);

    const rootRef = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = rootRef.current;

        if (!el) {
return;
}

        const obs = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.35 },
        );
        obs.observe(el);

        return () => obs.disconnect();
    }, []);

    return (
        <section className="bg-white">
            <div ref={rootRef} className="w-full bg-emerald-800 text-white">
                <div className="mx-auto grid max-w-7xl grid-cols-4 divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            stat={stat}
                            start={inView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatItem({
    stat,
    start,
}: {
    stat: Stat;
    start: boolean;
}) {
    const animated = useCountUp(stat.value, start);

    return (
        <div
            className={cx(
                'flex flex-col items-center justify-center px-1 py-6 text-center transition-all duration-1000 sm:px-4 sm:py-12',
                start ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
        >
            <div
                className={cx(
                    'xs:text-xl text-lg font-black tracking-tighter transition-transform duration-500 sm:text-5xl',
                    start ? 'scale-100' : 'scale-90',
                )}
            >
                {formatValue(animated, stat.suffix)}
            </div>
            <div className="xs:text-[10px] mt-1 text-[8px] leading-tight font-bold tracking-tighter text-emerald-100/75 uppercase sm:mt-2 sm:text-xs sm:tracking-widest">
                {stat.label}
            </div>
        </div>
    );
}

function cx(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(' ');
}
