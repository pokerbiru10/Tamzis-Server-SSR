import { usePage } from '@inertiajs/react';

type SavedData = {
    id?: unknown;
    en?: unknown;
    images?: Record<string, string>;
} | null;

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Merge override tersimpan di atas konten default. Array diganti utuh agar
// admin bisa menambah/menghapus item; string kosong dianggap tidak mengubah.
export function deepMergeContent<T>(defaults: T, saved: unknown): T {
    if (saved === undefined || saved === null) {
        return defaults;
    }

    if (Array.isArray(defaults)) {
        return (Array.isArray(saved) ? saved : defaults) as T;
    }

    if (isPlainObject(defaults)) {
        if (!isPlainObject(saved)) {
            return defaults;
        }

        const result: Record<string, unknown> = { ...defaults };

        for (const key of Object.keys(saved)) {
            result[key] =
                key in (defaults as Record<string, unknown>)
                    ? deepMergeContent(
                          (defaults as Record<string, unknown>)[key],
                          saved[key],
                      )
                    : saved[key];
        }

        return result as T;
    }

    return saved as T;
}

// Buang akhiran "- Updated" (sisa teks uji coba admin) dari konten tersimpan
// supaya tidak pernah tampil di halaman publik walau masih ada di database.
function stripUpdatedSuffix<T>(value: T): T {
    if (typeof value === 'string') {
        return value.replace(/\s*-\s*Updated\s*$/i, '') as T;
    }

    if (Array.isArray(value)) {
        return value.map(stripUpdatedSuffix) as T;
    }

    if (isPlainObject(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, stripUpdatedSuffix(v)]),
        ) as T;
    }

    return value;
}

// Override konten halaman profil datang lewat prop Inertia `profileContents`
// (dikirim server bareng initial page load), bukan fetch AJAX terpisah —
// supaya halaman tidak sempat nampilin teks default dulu sebelum keganti
// teks tersimpan dari admin ("flash of stale content").
export function useProfilePageContent<
    D extends { id: unknown; en: unknown; images: Record<string, string> },
>(pageKey: string, defaults: D, locale: string) {
    const { props } = usePage<{
        profileContents?: Record<string, SavedData>;
    }>();

    const saved = stripUpdatedSuffix(props.profileContents?.[pageKey] ?? null);

    const lang = locale === 'en' ? 'en' : 'id';
    const t = deepMergeContent(
        defaults[lang] as D['id'],
        saved?.[lang],
    ) as D['id'];
    const images = deepMergeContent(defaults.images, saved?.images);

    return { t, images };
}
