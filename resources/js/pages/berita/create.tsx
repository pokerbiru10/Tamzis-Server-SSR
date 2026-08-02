import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Tag as TagIcon, X, Upload, ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type TagType = { id: number; name: string; slug: string };

const MIN_IMAGE_WIDTH = 800;
const MIN_IMAGE_HEIGHT = 450;

export default function BeritaCreate({ tags }: { tags: TagType[] }) {
    const [tagInput, setTagInput] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        caption: '',
        excerpt: '',
        media_url: '',
        permalink: '',
        posted_at: '',
        is_published: true as boolean,
        tags: [] as string[],
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading('Menyimpan berita...');
        form.post('/dashboard/berita', {
            forceFormData: true,
            onSuccess: () => {
                toast.dismiss();
                toast.success('Berita berhasil disimpan!');
            },
            onError: () => {
                toast.dismiss();
                toast.error('Gagal menyimpan berita. Silakan coba lagi.');
            },
        });
    };

    const addTag = () => {
        const t = tagInput.trim();

        if (t && !form.data.tags.includes(t)) {
            form.setData('tags', [...form.data.tags, t]);
        }

        setTagInput('');
    };

    const removeTag = (tag: string) => {
        form.setData('tags', form.data.tags.filter((t) => t !== tag));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (!file) {
            form.setData('image', null);
            setPreviewUrl(null);

            return;
        }

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            if (img.naturalWidth < MIN_IMAGE_WIDTH || img.naturalHeight < MIN_IMAGE_HEIGHT) {
                URL.revokeObjectURL(url);
                toast.error(
                    `Ukuran gambar terlalu kecil (${img.naturalWidth}×${img.naturalHeight} px). Minimal ${MIN_IMAGE_WIDTH}×${MIN_IMAGE_HEIGHT} px agar sesuai kartu berita.`,
                );

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                return;
            }

            form.setData('image', file);
            setPreviewUrl(url);
        };
        img.src = url;
    };

    const removeImage = () => {
        form.setData('image', null);
        setPreviewUrl(null);

        if (fileInputRef.current) {
fileInputRef.current.value = '';
}
    };

    return (
        <>
            <Head title="Tambah Berita" />

            <div className="mx-auto w-full max-w-3xl flex-1 p-4 md:p-8">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/dashboard/berita"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Daftar Berita
                    </Link>
                </div>

                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Berita</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tambahkan konten berita atau postingan Instagram baru ke website.
                    </p>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="space-y-6">

                        {/* Card: Konten */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
                            <h2 className="font-semibold text-base border-b pb-3">Konten Berita</h2>

                            {/* Excerpt */}
                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">
                                    Judul / Ringkasan{' '}
                                    <span className="text-xs text-muted-foreground">(Opsional)</span>
                                </Label>
                                <Input
                                    id="excerpt"
                                    value={form.data.excerpt}
                                    onChange={(e) => form.setData('excerpt', e.target.value)}
                                    placeholder="Contoh: Tamzis Buka Cabang Baru di Wonosobo"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={form.errors.excerpt} />
                            </div>

                            {/* Caption */}
                            <div className="grid gap-2">
                                <Label htmlFor="caption">
                                    Caption Lengkap{' '}
                                    <span className="text-xs text-muted-foreground">(Opsional)</span>
                                </Label>
                                <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                                    <RichTextEditor
                                        value={form.data.caption}
                                        onChange={(value) => form.setData('caption', value)}
                                        placeholder="Tulis teks caption lengkap di sini..."
                                        className="min-h-[250px] bg-white"
                                    />
                                </div>
                                <InputError message={form.errors.caption} />
                            </div>
                        </div>

                        {/* Card: Gambar */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
                            <h2 className="font-semibold text-base border-b pb-3">
                                Gambar Berita{' '}
                                <span className="text-xs font-normal text-muted-foreground">(Opsional)</span>
                            </h2>

                            {/* Image Upload */}
                            <div className="grid gap-3">
                                {previewUrl ? (
                                    <div className="relative w-full overflow-hidden rounded-lg border">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="h-56 w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex h-52 w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/40 text-muted-foreground">
                                        <ImageIcon className="h-10 w-10 opacity-50" />
                                        <div className="text-center">
                                            <p className="text-sm font-medium">Unggah gambar berita</p>
                                            <p className="text-xs mt-1 opacity-70">
                                                JPG, PNG, WEBP, GIF — Maks. 5 MB — Min. {MIN_IMAGE_WIDTH}×{MIN_IMAGE_HEIGHT} px (rasio 16:9)
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Unggah Gambar
                                        </Button>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpg,image/jpeg,image/png,image/webp,image/gif"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                {previewUrl && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-fit"
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Ganti Gambar
                                    </Button>
                                )}

                                <InputError message={form.errors.image} />
                            </div>

                            {/* Media URL (Instagram) */}
                            <div className="grid gap-2">
                                <Label htmlFor="media_url">
                                    URL Gambar Eksternal (misal dari Instagram){' '}
                                    <span className="text-xs text-muted-foreground">(Opsional)</span>
                                </Label>
                                <Input
                                    id="media_url"
                                    value={form.data.media_url}
                                    onChange={(e) => form.setData('media_url', e.target.value)}
                                    placeholder="https://..."
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={form.errors.media_url} />
                            </div>
                        </div>

                        {/* Card: Info Tambahan */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
                            <h2 className="font-semibold text-base border-b pb-3">Informasi Tambahan</h2>

                            {/* Permalink */}
                            <div className="grid gap-2">
                                <Label htmlFor="permalink">
                                    Link Instagram / Permalink{' '}
                                    <span className="text-xs text-muted-foreground">(Opsional)</span>
                                </Label>
                                <Input
                                    id="permalink"
                                    value={form.data.permalink}
                                    onChange={(e) => form.setData('permalink', e.target.value)}
                                    placeholder="https://www.instagram.com/p/..."
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={form.errors.permalink} />
                            </div>

                            {/* Posted At */}
                            <div className="grid gap-2">
                                <Label htmlFor="posted_at">
                                    Tanggal Posting{' '}
                                    <span className="text-xs text-muted-foreground">(Opsional)</span>
                                </Label>
                                <Input
                                    id="posted_at"
                                    type="date"
                                    value={form.data.posted_at}
                                    onChange={(e) => form.setData('posted_at', e.target.value)}
                                    className="focus-visible:ring-emerald-500 w-fit"
                                />
                                <InputError message={form.errors.posted_at} />
                            </div>

                            {/* Tags */}
                            <div className="grid gap-2">
                                <Label>
                                    Tag{' '}
                                    <span className="text-xs text-muted-foreground">(Opsional)</span>
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                        placeholder="Ketik nama tag lalu tekan Enter"
                                        className="focus-visible:ring-emerald-500"
                                    />
                                    <Button type="button" variant="outline" onClick={addTag}>
                                        <TagIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                {/* Suggestions dari tag existing */}
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        <span className="text-xs text-muted-foreground mr-1 self-center">
                                            Tersedia:
                                        </span>
                                        {tags
                                            .filter((t) => !form.data.tags.includes(t.name))
                                            .map((t) => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    onClick={() =>
                                                        !form.data.tags.includes(t.name) &&
                                                        form.setData('tags', [
                                                            ...form.data.tags,
                                                            t.name,
                                                        ])
                                                    }
                                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                                                >
                                                    + {t.name}
                                                </button>
                                            ))}
                                    </div>
                                )}
                                {form.data.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {form.data.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800"
                                            >
                                                {t}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(t)}
                                                    className="ml-0.5 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <InputError message={form.errors.tags} />
                            </div>

                            {/* Published */}
                            <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                                <div>
                                    <Label htmlFor="is_published" className="cursor-pointer font-medium">
                                        Publish Berita
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Aktifkan agar berita langsung tampil di website.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    id="is_published"
                                    role="switch"
                                    aria-checked={form.data.is_published}
                                    onClick={() => form.setData('is_published', !form.data.is_published)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                                        form.data.is_published ? 'bg-emerald-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            form.data.is_published ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pb-8">
                            <Link href="/dashboard/berita">
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={form.processing}
                                className="bg-emerald-600 text-white hover:bg-emerald-700 min-w-[120px]"
                            >
                                {form.processing ? 'Menyimpan...' : 'Simpan Berita'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

BeritaCreate.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[
            { title: 'Kelola Berita', href: '/dashboard/berita' },
            { title: 'Tambah Berita', href: '/dashboard/berita/create' },
        ]}
    >
        {page}
    </AppLayout>
);
