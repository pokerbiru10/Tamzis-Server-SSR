import { useState, useEffect } from 'react';
import {
    HighlightFeedGrid
    
} from '@/components/marketing/highlight-feed-grid';
import type {HighlightFeedItem} from '@/components/marketing/highlight-feed-grid';

export type HighlightsSectionData = {
    badge: string;
    title: string;
    viewAll: string;
};

export function TamzisHighlights({ data }: { data?: HighlightsSectionData }) {
    const locale = 'id';
    const [feedItems, setFeedItems] = useState<HighlightFeedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const translations = {
        id: {
            badge: 'Tamzis Highlight',
            title: 'Berita & Kegiatan Terkini',
            viewAll: 'Lihat semua',
            loading: 'Memuat feed Instagram...',
            error: 'Gagal memuat feed',
            noData: 'Belum ada post terbaru',
        },
        en: {
            badge: 'Tamzis Highlight',
            title: 'Latest News & Activities',
            viewAll: 'View all',
            loading: 'Loading Instagram feed...',
            error: 'Failed to load feed',
            noData: 'No latest posts',
        },
    };

    const defaults =
        translations[locale as keyof typeof translations] || translations.id;
    const t = data ?? defaults;

    useEffect(() => {
        async function fetchInstagramFeed() {
            try {
                // Try fetching dynamically from Netlify Function first, fallback to static public/instagram.json
                let response = await fetch('/.netlify/functions/instagram').catch(() => null);

                if (!response || !response.ok) {
                    response = await fetch('/instagram.json');
                }

                if (!response.ok) {
                    throw new Error('Failed to load feed');
                }

                const items = await response.json();
                setFeedItems(items);
                setLoading(false);
            } catch (err) {
                console.error('Instagram feed error:', err);
                setError(translations.id.error);
                setLoading(false);
            }
        }

        fetchInstagramFeed();
    }, []);

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
                </div>

                <HighlightFeedGrid
                    items={feedItems}
                    loading={loading}
                    error={error !== null}
                    limit={4}
                    loadingText={translations.id.loading}
                    errorText={error ?? translations.id.error}
                    noDataText={translations.id.noData}
                />

                <div className="mt-8 flex justify-center">
                    <a
                        href="/berita"
                        className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-800"
                    >
                        {t.viewAll}
                    </a>
                </div>
            </div>
        </section>
    );
}
