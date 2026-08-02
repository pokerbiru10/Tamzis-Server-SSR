import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatNumberID(num: number | undefined | null): string {
    if (num === undefined || num === null || isNaN(num)) {
        return '0';
    }

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatCurrencyIDR(num: number | undefined | null): string {
    if (num === undefined || num === null || isNaN(num)) {
        return 'Rp0';
    }

    return `Rp${formatNumberID(num)}`;
}

/**
 * Mengembalikan URL varian WebP dari gambar upload lokal (file .webp
 * pendamping dengan basename sama), atau URL asli untuk URL remote
 * dan file yang sudah .webp.
 */
export function webpSource(url: string | null | undefined): string | undefined {
    if (!url) {
        return undefined;
    }

    const isLocalUpload =
        url.startsWith('/uploads/') || url.startsWith('uploads/');

    if (!isLocalUpload || url.endsWith('.webp')) {
        return url;
    }

    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}
