import { Instagram } from 'lucide-react';
import { useState } from 'react';
import { webpSource } from '@/lib/utils';

export type InstagramFeedItem = {
    id: string;
    caption: string;
    excerpt: string;
    image: string;
    permalink: string;
};

function FeedCard({ item }: { item: InstagramFeedItem }) {
    const [hasError, setHasError] = useState(false);

    if (!item.image || hasError) {
        return (
            <div className="flex aspect-[9/16] items-center justify-center bg-emerald-50">
                <Instagram className="h-8 w-8 text-emerald-200" aria-hidden />
            </div>
        );
    }

    return (
        <a
            href={item.permalink || '#'}
            target="_blank"
            rel="noreferrer"
            aria-label={item.excerpt || item.caption || 'Instagram'}
            className="group relative block aspect-[9/16] overflow-hidden bg-emerald-50"
        >
            <picture>
                <source srcSet={webpSource(item.image)} type="image/webp" />
                <img
                    src={item.image}
                    alt={item.excerpt || item.caption || 'Instagram'}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setHasError(true)}
                />
            </picture>
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                <Instagram className="h-5 w-5 text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
            </span>
        </a>
    );
}

/**
 * Galeri Instagram 4 item, kartu vertikal 9:16, rapat (dempetan)
 * seperti feed Instagram. Tanpa script eksternal, gambar lokal WebP + lazy-load.
 */
export function InstagramFeedGallery({
    items,
    className = 'gap-1 sm:gap-1.5',
}: {
    items?: InstagramFeedItem[];
    className?: string;
}) {
    const feed = (items ?? []).slice(0, 4);

    if (feed.length === 0) {
        return null;
    }

    return (
        <div className={`grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-4 ${className}`}>
            {feed.map((item) => (
                <FeedCard key={item.id} item={item} />
            ))}
        </div>
    );
}
