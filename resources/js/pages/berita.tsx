import { Head, usePage } from '@inertiajs/react';
import { ChevronRight, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    HighlightFeedGrid
    
} from '@/components/marketing/highlight-feed-grid';
import type {HighlightFeedItem} from '@/components/marketing/highlight-feed-grid';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

type TagType = {
    id: number;
    name: string;
    slug: string;
};

type BeritaItem = {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
    posted_at: string | null;
    timestamp: string | null;
    tags: TagType[];
};

type BeritaProps = {
    berita?: BeritaItem[];
    search?: string;
};

export default function Berita() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const { berita, search } = props as unknown as BeritaProps;

    // Instagram feed diambil dari sumber yang sama dengan Tamzis Highlight
    // (public/instagram.json) agar datanya identik dan urutannya konsisten.
    const [instagramFeed, setInstagramFeed] = useState<HighlightFeedItem[]>([]);
    const [feedLoading, setFeedLoading] = useState(true);
    const [feedError, setFeedError] = useState(false);

    useEffect(() => {
        // Try fetching dynamically from Netlify Function first, fallback to static public/instagram.json
        fetch('/.netlify/functions/instagram')
            .catch(() => fetch('/instagram.json'))
            .then((res) => {
                if (!res.ok) {
                    return fetch('/instagram.json');
                }
                return res;
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to load feed');
                }
                return res.json();
            })
            .then((items: HighlightFeedItem[]) => {
                setInstagramFeed(items);
                setFeedLoading(false);
            })
            .catch(() => {
                setFeedError(true);
                setFeedLoading(false);
            });
    }, []);

    const activeSearch = (search ?? '').trim();
    const isSearching = activeSearch !== '';
    const [query, setQuery] = useState(activeSearch);

    const beritaData: BeritaItem[] = berita ?? [];

    const submitSearch = (value: string) => {
        const q = value.trim();
        // Implementasi search bisa ditambahkan nanti
        console.log('Search:', q);
    };

    const clearSearch = () => {
        setQuery('');
        submitSearch('');
    };

    const translations = {
        id: {
            title: 'Berita - TAMZIS Bina Utama',
            heading: 'Berita & Kegiatan',
            breadcrumb: {
                home: 'Beranda',
                current: 'Berita',
            },
            searchPlaceholder: 'Cari berita atau kegiatan...',
            searchButton: 'Cari',
            searchResults: 'Hasil pencarian untuk',
            searchEmpty: 'Tidak ada berita yang cocok dengan pencarian Anda.',
            clearSearch: 'Hapus pencarian',
            latestNews: 'Berita Terbaru',
            noNewsAvailable: 'Belum ada berita tersedia saat ini.',
        },
        en: {
            title: 'News - TAMZIS Bina Utama',
            heading: 'News & Activities',
            breadcrumb: {
                home: 'Home',
                current: 'News',
            },
            searchPlaceholder: 'Search news or activities...',
            searchButton: 'Search',
            searchResults: 'Search results for',
            searchEmpty: 'No news matches your search.',
            clearSearch: 'Clear search',
            latestNews: 'Latest News',
            noNewsAvailable: 'No news available at the moment.',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    return (
        <>
            <Head title={t.title} />
            <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-emerald-950">
                <TamzisHeader />

                <main className="flex-1">
                    <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('/assets/img/header/banner1.jpg')",
                            }}
                        />
                        <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                            <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase drop-shadow-md sm:text-4xl">
                                {t.heading}
                            </h1>
                            <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/70 uppercase">
                                <a
                                    href="/"
                                    className="transition-colors hover:text-white"
                                >
                                    {t.breadcrumb.home}
                                </a>
                                <ChevronRight className="h-3 w-3" />
                                <span className="tracking-widest text-white">
                                    {t.breadcrumb.current}
                                </span>
                            </nav>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10">
                        {/* Search Bar */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitSearch(query);
                            }}
                            className="mx-auto mb-8 flex max-w-2xl items-center gap-2"
                        >
                            <div className="relative flex-1">
                                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={t.searchPlaceholder}
                                    className="w-full rounded-full border border-emerald-900/10 bg-white py-3 pr-10 pl-11 text-sm font-medium text-emerald-950 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                />
                                {isSearching && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        aria-label={t.clearSearch}
                                        className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-950"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="rounded-full bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-900"
                            >
                                {t.searchButton}
                            </button>
                        </form>

                        {/* Search Results Info */}
                        {isSearching && (
                            <div className="mb-6 text-center text-sm font-semibold text-slate-600">
                                {t.searchResults}{' '}
                                <span className="font-bold text-emerald-800">
                                    "{activeSearch}"
                                </span>{' '}
                                ({beritaData.length})
                            </div>
                        )}

                        {/* Berita Terbaru Section - dari dashboard kelola berita */}
                        <section className="mb-12">
                            <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-emerald-950 uppercase sm:text-2xl">
                                {t.latestNews}
                            </h2>

                            {beritaData.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {beritaData.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`/berita/${item.id}`}
                                            className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="aspect-video overflow-hidden bg-slate-100">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center bg-emerald-50">
                                                        <Search className="h-8 w-8 text-emerald-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col p-5">
                                                {item.posted_at && (
                                                    <span className="mb-2 text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
                                                        {item.posted_at}
                                                    </span>
                                                )}
                                                <h3 className="mb-2 line-clamp-2 text-base font-bold text-emerald-950 group-hover:text-emerald-700">
                                                    {item.title}
                                                </h3>
                                                <p className="line-clamp-3 text-sm text-slate-500">
                                                    {item.excerpt}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-emerald-900/15 bg-white py-16 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                                        <Search className="h-8 w-8 text-emerald-300" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-500">
                                        {isSearching
                                            ? t.searchEmpty
                                            : t.noNewsAvailable}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Instagram Feed Section - sumber sama dengan Tamzis Highlight */}
                        <section>
                            <h2 className="mb-8 text-center text-xl font-bold tracking-tight text-emerald-950 uppercase sm:text-2xl">
                                @tamzisbinautama
                            </h2>
                            <div className="mx-auto max-w-6xl">
                                <HighlightFeedGrid
                                    items={instagramFeed}
                                    loading={feedLoading}
                                    error={feedError}
                                    limit={4}
                                />
                            </div>
                        </section>
                    </div>
                </main>

                <TamzisFooter />
            </div>
        </>
    );
}
