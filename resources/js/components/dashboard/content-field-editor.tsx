import { ArrowDown, ArrowUp, ImageUp, Plus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Label bahasa Indonesia untuk key konten yang umum dipakai.
const keyLabels: Record<string, string> = {
    title: 'Judul',
    heading: 'Judul Halaman',
    breadcrumb: 'Breadcrumb',
    home: 'Beranda',
    profile: 'Profil',
    savings: 'Simpanan',
    current: 'Halaman Ini',
    badge: 'Badge',
    intro: 'Pendahuluan',
    hero: 'Bagian Hero',
    journey: 'Sekilas Perjalanan',
    main: 'Bagian Utama',
    details: 'Kartu Keunggulan',
    features: 'Fitur Unggulan',
    advantages: 'Keunggulan',
    legalTamzis: 'Legalitas Tamzis',
    baitulMaal: 'Legalitas Baitul Maal',
    official: 'Nama Resmi',
    visi: 'Visi',
    misi: 'Misi',
    life: 'Nilai LIFE',
    awards: 'Daftar Penghargaan',
    gallery: 'Dokumentasi Foto',
    contact: 'Kotak Hubungi Kami',
    content: 'Isi',
    desc: 'Deskripsi',
    label: 'Label',
    value: 'Isi',
    items: 'Daftar Item',
    letter: 'Huruf',
    src: 'Gambar',
    btn: 'Teks Tombol',
};

export function labelFor(key: string): string {
    if (keyLabels[key]) {
        return keyLabels[key];
    }

    const contentMatch = key.match(/^content(\d+)$/);

    if (contentMatch) {
        return `Paragraf ${contentMatch[1]}`;
    }

    return key.charAt(0).toUpperCase() + key.slice(1);
}

function getXsrfToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

// Buat item baru meniru struktur item pertama, dengan semua string dikosongkan.
function emptyLike(sample: unknown): unknown {
    if (typeof sample === 'string') {
        return '';
    }

    if (Array.isArray(sample)) {
        return [];
    }

    if (typeof sample === 'object' && sample !== null) {
        return Object.fromEntries(
            Object.entries(sample).map(([key, value]) => [key, emptyLike(value)]),
        );
    }

    return sample;
}

// Zona drag & drop upload gambar. Gambar lokal langsung tampil selagi upload,
// lalu diganti URL server (tersimpan di public/uploads/images/{Y}/{m}/{d}).
export function ImageField({
    value,
    onChange,
}: {
    value: string;
    onChange: (url: string) => void;
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleUpload = async (file: File) => {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            toast.error('Format tidak didukung. Gunakan jpg, png, atau webp.');

            return;
        }

        const previousValue = value;
        const localUrl = URL.createObjectURL(file);
        onChange(localUrl);

        setUploading(true);
        const toastId = toast.loading('Mengunggah gambar...');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/dashboard/pages/content/profil/upload', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': getXsrfToken(),
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Upload gagal');
            }

            const json = (await res.json()) as { url: string };
            onChange(json.url);
            toast.success('Gambar berhasil diunggah!', { id: toastId });
        } catch {
            onChange(previousValue);
            toast.error('Gagal mengunggah gambar (maks 2MB, jpg/png/webp).', {
                id: toastId,
            });
        } finally {
            URL.revokeObjectURL(localUrl);
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <div
                role="button"
                tabIndex={0}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        fileRef.current?.click();
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    const file = e.dataTransfer.files?.[0];

                    if (file) {
                        void handleUpload(file);
                    }
                }}
                className={`relative flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
                    dragging
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
            >
                {value ? (
                    <>
                        <img
                            src={value}
                            alt="Preview"
                            className="max-h-40 w-auto max-w-full rounded-lg object-contain"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-2 text-[11px] font-semibold text-white">
                            {uploading
                                ? 'Mengunggah...'
                                : 'Tarik & letakkan gambar baru ke sini, atau klik untuk ganti'}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-4 text-slate-500">
                        <ImageUp className="h-8 w-8 text-emerald-500" />
                        <p className="text-xs font-semibold">
                            {uploading
                                ? 'Mengunggah...'
                                : 'Tarik & letakkan gambar ke sini'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                            atau klik untuk pilih file (jpg/png/webp, maks 2MB)
                        </p>
                    </div>
                )}
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                        void handleUpload(file);
                    }

                    e.target.value = '';
                }}
            />

            {/* Info URL gambar yang sedang dipakai */}
            {value && !value.startsWith('blob:') && (
                <p className="truncate text-[11px] text-muted-foreground" title={value}>
                    URL: {value}
                </p>
            )}
        </div>
    );
}

// Editor rekursif: merender input sesuai struktur konten halaman.
export function FieldEditor({
    value,
    onChange,
    fieldKey,
}: {
    value: unknown;
    onChange: (next: unknown) => void;
    fieldKey: string;
}) {
    if (typeof value === 'string') {
        // Key bernilai string yang merupakan gambar → render drop zone upload.
        // (hero/banner/intro/logo dipakai di objek images tiap halaman.)
        if (['src', 'image', 'hero', 'banner', 'intro', 'logo'].includes(fieldKey)) {
            return <ImageField value={value} onChange={onChange} />;
        }

        if (value.length > 90) {
            return (
                <RichTextEditor
                    value={value}
                    onChange={onChange}
                    className="overflow-hidden rounded-xl border border-slate-200"
                />
            );
        }

        return (
            <Input value={value} onChange={(e) => onChange(e.target.value)} />
        );
    }

    if (Array.isArray(value)) {
        const move = (index: number, direction: -1 | 1) => {
            const target = index + direction;

            if (target < 0 || target >= value.length) {
                return;
            }

            const next = [...value];
            [next[index], next[target]] = [next[target], next[index]];
            onChange(next);
        };

        return (
            <div className="space-y-3">
                {value.map((item, index) => (
                    <div key={index} className="rounded-xl border bg-slate-50/50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground">
                                Item #{index + 1}
                            </span>
                            <div className="flex gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => move(index, -1)}
                                    disabled={index === 0}
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => move(index, 1)}
                                    disabled={index === value.length - 1}
                                >
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() =>
                                        onChange(value.filter((_, i) => i !== index))
                                    }
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <FieldEditor
                            fieldKey={fieldKey}
                            value={item}
                            onChange={(next) =>
                                onChange(
                                    value.map((v, i) => (i === index ? next : v)),
                                )
                            }
                        />
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-2"
                    onClick={() =>
                        onChange([
                            ...value,
                            value.length > 0 ? emptyLike(value[0]) : '',
                        ])
                    }
                >
                    <Plus className="h-4 w-4" />
                    Tambah Item
                </Button>
            </div>
        );
    }

    if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value as Record<string, unknown>);

        return (
            <div className="space-y-4">
                {entries.map(([key, child]) => (
                    <div key={key} className="space-y-2">
                        <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            {labelFor(key)}
                        </Label>
                        <FieldEditor
                            fieldKey={key}
                            value={child}
                            onChange={(next) =>
                                onChange({
                                    ...(value as Record<string, unknown>),
                                    [key]: next,
                                })
                            }
                        />
                    </div>
                ))}
            </div>
        );
    }

    return null;
}
