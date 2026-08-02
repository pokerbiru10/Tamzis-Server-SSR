import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    /** Extra classes applied to <img> (e.g. "absolute inset-0 w-full h-full object-cover") */
    className?: string;
    /** Extra classes on the fallback placeholder wrapper */
    wrapperClassName?: string;
    /**
     * Controls built-in aspect-ratio class on both <img> and the fallback wrapper.
     * Use "auto" when the parent already handles the ratio (e.g. pb-[56.25%] trick).
     */
    aspectRatio?: 'video' | '4/3' | 'square' | 'auto';
}

/**
 * Drop-in replacement for <img> that shows a grey placeholder with an
 * ImageIcon when the image fails to load (404, missing file, etc.).
 */
export function ImageWithFallback({
    src,
    alt,
    className = '',
    wrapperClassName = '',
    aspectRatio = 'video',
}: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    const aspectClass =
        aspectRatio === 'video'
            ? 'aspect-video'
            : aspectRatio === '4/3'
              ? 'aspect-[4/3]'
              : aspectRatio === 'square'
                ? 'aspect-square'
                : ''; // "auto" → no built-in aspect class

    if (error) {
        return (
            <div
                className={`flex items-center justify-center w-full bg-slate-200 ${aspectClass} ${wrapperClassName}`}
                role="img"
                aria-label={alt}
            >
                <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ImageIcon
                        className="h-10 w-10 sm:h-14 sm:w-14"
                        strokeWidth={1.5}
                    />
                    <span className="text-xs font-medium text-slate-400 select-none text-center px-4">
                        {alt}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${aspectClass} w-full object-cover ${className}`}
            onError={() => setError(true)}
        />
    );
}
