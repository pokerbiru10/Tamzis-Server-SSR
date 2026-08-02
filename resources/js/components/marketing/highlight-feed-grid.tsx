import { useState } from 'react';
import { Instagram, Heart, MessageCircle, Play } from 'lucide-react';

export type HighlightFeedItem = {
    id: string;
    caption: string;
    excerpt: string;
    media_type?: string;
    image: string;
    video?: string;
    permalink: string;
    timestamp?: string;
    likes_count?: number;
    comments_count?: number;
};

function formatDate(dateStr: string): string {
    if (!dateStr) {
return '';
}

    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
return 'Baru saja';
}

    if (diffHours < 24) {
return `${diffHours} jam lalu`;
}

    if (diffDays < 7) {
return `${diffDays} hari lalu`;
}

    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

function formatCount(count?: number): string {
    const value = count ?? 0;

    if (value >= 1000000) {
return (value / 1000000).toFixed(1) + 'JT';
}

    if (value >= 1000) {
return (value / 1000).toFixed(1) + 'RB';
}

    return value.toString();
}

export function HighlightFeedGrid({
    items,
    loading = false,
    error = false,
    limit,
    loadingText = 'Memuat feed Instagram...',
    errorText = 'Gagal memuat feed',
    noDataText = 'Belum ada post terbaru',
}: {
    items?: HighlightFeedItem[];
    loading?: boolean;
    error?: boolean;
    limit?: number;
    loadingText?: string;
    errorText?: string;
    noDataText?: string;
}) {
    const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
    const sorted = [...(items ?? [])].sort((a, b) => {
        const timeA = new Date(a.timestamp ?? '').getTime();
        const timeB = new Date(b.timestamp ?? '').getTime();
        const validA = Number.isNaN(timeA) ? 0 : timeA;
        const validB = Number.isNaN(timeB) ? 0 : timeB;

        return validB - validA;
    });
    const feed = sorted.slice(0, limit ?? sorted.length);

    return (
        <div className="mt-10">
            {loading && (
                <div className="flex h-40 items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
                        <p className="text-sm text-slate-500">{loadingText}</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50">
                    <p className="text-sm font-semibold text-red-500">
                        {errorText}
                    </p>
                </div>
            )}

            {!loading && !error && feed.length === 0 && (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-emerald-900/15 bg-emerald-50/50">
                    <div className="flex flex-col items-center">
                        <Instagram className="mb-3 h-10 w-10 text-emerald-300" />
                        <p className="text-sm font-semibold text-slate-500">
                            {noDataText}
                        </p>
                    </div>
                </div>
            )}

            {!loading && !error && feed.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {feed.map((item, index) => {
                        const isVideo =
                            item.media_type === 'REELS' ||
                            item.media_type === 'VIDEO' ||
                            item.video;
                        const imageUrl = item.image;
                        const caption =
                            item.caption ||
                            item.excerpt ||
                            'Feed Instagram TAMZIS';

                        return (
                            <a
                                key={item.id || index}
                                href={item.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block aspect-square overflow-hidden bg-slate-100"
                            >
                                {imageUrl && !failedImages[item.id] ? (
                                    <img
                                        src={imageUrl}
                                        alt={caption.substring(0, 50)}
                                        loading="lazy"
                                        decoding="async"
                                        referrerPolicy="no-referrer"
                                        onError={() => {
                                            setFailedImages(prev => ({ ...prev, [item.id]: true }));
                                        }}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-800 to-teal-950 p-4 text-center">
                                        <Instagram className="mb-2 h-8 w-8 text-white/80" />
                                        <p className="line-clamp-4 text-[10px] font-bold leading-relaxed text-white/95">
                                            {caption}
                                        </p>
                                    </div>
                                )}

                                {isVideo && (
                                    <div className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                                        <Play className="h-4 w-4 fill-white text-white" />
                                    </div>
                                )}

                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="p-3">
                                        <p className="line-clamp-2 text-xs font-medium text-white">
                                            {caption.substring(0, 80)}
                                        </p>
                                        <div className="mt-2 flex items-center gap-3 text-xs text-white/80">
                                            <span className="flex items-center gap-1">
                                                <Heart className="h-3 w-3" />
                                                {formatCount(item.likes_count)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="h-3 w-3" />
                                                {formatCount(
                                                    item.comments_count,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {item.timestamp && (
                                    <div className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                        {formatDate(item.timestamp)}
                                    </div>
                                )}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
