import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, ExternalLink } from 'lucide-react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { webpSource } from '@/lib/utils';

type TagType = {
    id: number;
    name: string;
    slug: string;
};

type FeedItem = {
    id: string;
    caption: string;
    excerpt: string;
    media_type: string;
    image: string;
    permalink: string;
    timestamp: string;
    posted_at_human: string;
    tags: TagType[];
};

type BeritaDetailProps = {
    feed: FeedItem;
};

function formatNewsContent(content: string) {
    if (!content) {
return '';
}

    // Periksa apakah teks mengandung tag HTML (seperti <p>, <div>, <h1>, dll)
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);

    if (hasHtmlTags) {
        return content;
    }

    // Jika berupa teks biasa dengan baris baru (\n atau \r\n), format menjadi paragraf <p>
    const paragraphs = content
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    if (paragraphs.length > 0) {
        return paragraphs.map((p) => `<p>${p.replace(/\r?\n/g, '<br />')}</p>`).join('');
    }

    return `<p>${content.replace(/\r?\n/g, '<br />')}</p>`;
}

export default function BeritaDetail() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const { feed } = props as unknown as BeritaDetailProps;

    const translations = {
        id: {
            title: 'Berita - TAMZIS Bina Utama',
            heading: 'Detail Berita',
            breadcrumb: {
                home: 'Beranda',
                berita: 'Berita',
                current: 'Detail',
            },
            postedAt: 'Diposting',
            readOriginal: 'Buka Sumber',
            backToNews: 'Kembali ke Berita',
        },
        en: {
            title: 'News - TAMZIS Bina Utama',
            heading: 'News Detail',
            breadcrumb: {
                home: 'Home',
                berita: 'News',
                current: 'Detail',
            },
            postedAt: 'Posted',
            readOriginal: 'Read Original',
            backToNews: 'Back to News',
        },
    };

    const t = translations[locale as keyof typeof translations] || translations.id;
    const isEn = locale === 'en';

    // Ambil teks judul ringkas tanpa tag HTML
    const titleText = feed.excerpt && feed.excerpt.trim() !== ''
        ? feed.excerpt.replace(/<[^>]*>?/gm, '').trim()
        : t.heading;

    const formattedContent = formatNewsContent(feed.caption || '');

    return (
        <>
            <Head>
                <title>{`${titleText} - TAMZIS Bina Utama`}</title>
                <meta name="description" content={titleText} />
                <meta property="og:title" content={`${titleText} - TAMZIS Bina Utama`} />
                <meta property="og:description" content={titleText} />
                {feed.image && <meta property="og:image" content={feed.image} />}
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-emerald-950">
                <TamzisHeader />
                <main className="flex-1">
                    <div className="relative overflow-hidden border-b border-white/5 py-8 text-center text-white sm:py-12">
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('/assets/img/header/banner1.jpg')",
                            }}
                        />
                        <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6">
                            <h1 className="mb-3 text-xl font-bold tracking-tight uppercase drop-shadow-md sm:text-3xl">
                                {t.heading}
                            </h1>
                            <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/70 uppercase sm:text-xs">
                                <a href="/" className="transition-colors hover:text-white">
                                    {t.breadcrumb.home}
                                </a>
                                <span className="text-white">/</span>
                                <a href="/berita" className="transition-colors hover:text-white">
                                    {t.breadcrumb.berita}
                                </a>
                                <span className="text-white">/</span>
                                <span className="tracking-widest text-white">{t.breadcrumb.current}</span>
                            </nav>
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
                        <article className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 sm:rounded-3xl">
                            {feed.image && (
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                    <picture>
                                        <source srcSet={webpSource(feed.image)} type="image/webp" />
                                        <img
                                            src={feed.image}
                                            alt={titleText}
                                            referrerPolicy="no-referrer"
                                            className="h-full w-full object-cover"
                                        />
                                    </picture>
                                </div>
                            )}

                            <div className="space-y-6 p-5 sm:space-y-8 sm:p-8 md:p-10">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-3xl">
                                        {titleText}
                                    </h2>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
                                            <Calendar className="h-4 w-4 text-emerald-600" />
                                            {t.postedAt} {feed.posted_at_human}
                                        </span>
                                        <Link
                                            href="/berita"
                                            className="inline-flex items-center rounded-full border border-emerald-900/10 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 sm:px-4 sm:py-2 sm:text-sm"
                                        >
                                            {t.backToNews}
                                        </Link>
                                    </div>
                                </div>

                                {feed.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {feed.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="inline-flex items-center rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div
                                    className="news-content text-sm leading-relaxed text-slate-700 sm:text-base"
                                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                                />

                                {feed.permalink && (
                                    <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5 sm:rounded-3xl sm:p-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 sm:text-sm">
                                                    {t.readOriginal}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                                                    {isEn ? 'This link opens the original source of the news or Instagram post.' : 'Link ini membuka sumber asli berita atau postingan Instagram.'}
                                                </p>
                                            </div>
                                            <a
                                                href={feed.permalink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-900 sm:text-sm"
                                            >
                                                {t.readOriginal}
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>
                </main>
                <TamzisFooter />
            </div>
        </>
    );
}
