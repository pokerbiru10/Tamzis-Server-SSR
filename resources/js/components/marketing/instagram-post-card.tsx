import { Heart, Share, Instagram, Camera } from 'lucide-react';
import { useState } from 'react';
import { webpSource } from '@/lib/utils';

export type InstagramPostItem = {
    id: string;
    caption: string;
    excerpt: string;
    image: string;
    permalink: string;
    timestamp?: string;
    likes_count?: number;
};

/**
 * Komponen Instagram Post Card yang meniru layout asli Instagram
 * Berdasarkan screenshot tamzisbinautama post
 */
export function InstagramPostCard({ 
    item, 
    className = "" 
}: { 
    item: InstagramPostItem;
    className?: string;
}) {
    const [hasError, setHasError] = useState(false);

    // Static profile data untuk TAMZIS
    const profile = {
        username: "tamzisbinautama",
        profile_picture_url: "/images/logo/image.png"
    };

    // Format likes count untuk display yang lebih readable
    const formatLikesCount = (count?: number) => {
        // Jika 0 atau tidak ada, jangan tampilkan angka
        if (!count || count === 0) {
return "";
}
        
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1).replace('.0', '')}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1).replace('.0', '')}K`;
        }
        
        return count.toString();
    };

    // Check apakah ada likes untuk ditampilkan
    const hasLikes = item.likes_count && item.likes_count > 0;

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Langsung redirect ke post Instagram tanpa animasi color change
        window.open(item.permalink || `https://instagram.com/${profile.username}`, '_blank', 'noopener,noreferrer');
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator.share && item.permalink) {
            navigator.share({
                title: `Post dari @${profile.username}`,
                text: item.excerpt || item.caption,
                url: item.permalink
            }).catch(() => {
                window.open(item.permalink, '_blank', 'noopener,noreferrer');
            });
        } else {
            window.open(item.permalink || `https://instagram.com/${profile.username}`, '_blank', 'noopener,noreferrer');
        }
    };

    const handlePostClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(item.permalink || `https://instagram.com/${profile.username}`, '_blank', 'noopener,noreferrer');
    };

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(`https://instagram.com/${profile.username}`, '_blank', 'noopener,noreferrer');
    };

    if (!item.image || hasError) {
        return (
            <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 ${className}`}>
                <div className="flex aspect-square items-center justify-center bg-emerald-50">
                    <Instagram className="h-12 w-12 text-emerald-200" aria-hidden />
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 ${className}`}>
            {/* Header - Profile info - Clickable */}
            <div 
                className="flex items-center justify-between p-4 pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleProfileClick}
            >
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-1 border border-gray-100">
                        <img
                            src={profile.profile_picture_url}
                            alt={profile.username}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/assets/img/logo-tamzis.jpg";
                            }}
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-900">{profile.username}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent parent click
                            handlePostClick(e);
                        }}
                    >
                        <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Main Image - Clickable */}
            <div 
                className="relative cursor-pointer"
                onClick={handlePostClick}
            >
                <picture>
                    <source srcSet={webpSource(item.image)} type="image/webp" />
                    <img
                        src={item.image}
                        alt={item.excerpt || item.caption || 'Instagram post'}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full aspect-square object-cover hover:opacity-95 transition-opacity"
                        onError={() => setHasError(true)}
                    />
                </picture>
                
                {/* Camera overlay indicator */}
                <div className="absolute top-4 right-4">
                    <div className="p-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                        <Camera className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>

            {/* Interaction bar */}
            <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleLikeClick}
                        className="flex items-center space-x-1.5 hover:opacity-75 transition-opacity"
                        title="Lihat di Instagram"
                    >
                        <Heart 
                            className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" 
                        />
                        {hasLikes && (
                            <span className="text-sm font-medium text-gray-700">
                                {formatLikesCount(item.likes_count)}
                            </span>
                        )}
                    </button>
                </div>
                
                <button
                    onClick={handleShareClick}
                    className="flex items-center space-x-1.5 hover:opacity-75 transition-opacity"
                    title="Share post"
                >
                    <Share className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">Share</span>
                </button>
            </div>

            {/* Caption - Clickable */}
            <div 
                className="px-4 pb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handlePostClick}
            >
                <div className="text-sm text-gray-900 leading-relaxed">
                    <span className="font-semibold text-gray-900">
                        {profile.username.toUpperCase()}&nbsp;
                    </span>
                    <span>
                        {item.excerpt || item.caption || 'Bersinergi dengan Lazismu Banjarnegara Dukung Pembangunan Masjid At-Tanwir Kec Pandanarum Banjarnegara. Sebagai wujud komitmen dalam memperkuat syiar Islam dan pemberdayaan umat, ULAZ MKU TAMZIS'}
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * Gallery wrapper untuk menampilkan multiple Instagram posts
 * Dengan layout 4 kolom pada desktop
 */
export function InstagramPostGallery({
    items,
    className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
}: {
    items?: InstagramPostItem[];
    className?: string;
}) {
    const feed = (items ?? []).slice(0, 8); // Maksimal 8 posts untuk 2 rows x 4 cols

    if (feed.length === 0) {
        return (
            <div className="min-h-[300px]">
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-900/15 bg-emerald-50/50 py-16 text-center">
                    <Instagram className="mb-3 h-10 w-10 text-emerald-300" aria-hidden />
                    <p className="text-sm font-semibold text-slate-500">
                        Feed Instagram segera hadir.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            {feed.map((item) => (
                <InstagramPostCard 
                    key={item.id} 
                    item={item} 
                />
            ))}
        </div>
    );
}