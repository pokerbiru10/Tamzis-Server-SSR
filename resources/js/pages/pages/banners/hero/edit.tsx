import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEventHandler} from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

interface HeroBanner {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
    page_slug: string;
    is_active: boolean;
    order: number;
}

export default function HeroBannerEdit({ banner }: { banner: HeroBanner }) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        `/${banner.image_path}`,
    );
    const { data, setData, post, processing, errors } = useForm({
        title: banner.title || '',
        description: banner.description || '',
        button_text: banner.button_text || '',
        button_url: banner.button_url || '',
        image: null as File | null,
        page_slug: banner.page_slug || '',
        is_active: banner.is_active ?? true,
        order: banner.order || 0,
        _method: 'PATCH',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Halaman', href: '#' },
        {
            title: 'Banner Hero Section',
            href: '/dashboard/pages/banners/hero',
        },
        { title: 'Edit Banner', href: '#' },
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const toastId = toast.loading('Menyimpan perubahan...');

        post(`/dashboard/pages/banners/hero/${banner.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Banner berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal memperbarui banner!', { id: toastId });
            },
        });
    };

    return (
        <>
            <Head title="Edit Banner Hero Section" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/banners/hero">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            Edit Banner Hero Section
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi banner
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Banner</CardTitle>
                        <CardDescription>
                            Edit formulir di bawah untuk memperbarui banner
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Judul Banner{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="Masukkan judul banner"
                                    className={
                                        errors.title ? 'border-red-500' : ''
                                    }
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <RichTextEditor
                                    value={data.description}
                                    onChange={(value) => setData('description', value)}
                                    placeholder="Masukkan deskripsi banner (opsional)"
                                    className={`overflow-hidden rounded-xl border ${
                                        errors.description ? 'border-red-500' : 'border-slate-200'
                                    }`}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="button_text">
                                    Teks Tombol
                                </Label>
                                <Input
                                    id="button_text"
                                    value={data.button_text}
                                    onChange={(e) =>
                                        setData('button_text', e.target.value)
                                    }
                                    placeholder="cth: Lihat Selengkapnya"
                                    className={
                                        errors.button_text ? 'border-red-500' : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Teks untuk tombol CTA pada banner
                                </p>
                                {errors.button_text && (
                                    <p className="text-sm text-red-500">
                                        {errors.button_text}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="button_url">
                                    URL Tombol
                                </Label>
                                <Input
                                    id="button_url"
                                    value={data.button_url}
                                    onChange={(e) =>
                                        setData('button_url', e.target.value)
                                    }
                                    placeholder="cth: /products, https://example.com"
                                    className={
                                        errors.button_url ? 'border-red-500' : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Halaman tujuan saat tombol diklik
                                </p>
                                {errors.button_url && (
                                    <p className="text-sm text-red-500">
                                        {errors.button_url}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="page_slug">
                                    Slug Halaman{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="page_slug"
                                    value={data.page_slug}
                                    onChange={(e) =>
                                        setData('page_slug', e.target.value)
                                    }
                                    placeholder="contoh: homepage, about, contact"
                                    className={
                                        errors.page_slug ? 'border-red-500' : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Slug untuk mengidentifikasi halaman mana
                                    yang akan menampilkan banner ini
                                </p>
                                {errors.page_slug && (
                                    <p className="text-sm text-red-500">
                                        {errors.page_slug}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Urutan</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) =>
                                        setData(
                                            'order',
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    className={
                                        errors.order ? 'border-red-500' : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Semakin kecil angka, semakin di atas urutan
                                    tampilan
                                </p>
                                {errors.order && (
                                    <p className="text-sm text-red-500">
                                        {errors.order}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Gambar Banner</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={
                                        errors.image ? 'border-red-500' : ''
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Format: JPG, PNG, WEBP. Maksimal 1MB.
                                    Rekomendasi ukuran: 1920x800 piksel.
                                    Kosongkan jika tidak ingin mengganti gambar.
                                </p>
                                {errors.image && (
                                    <p className="text-sm text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-sm font-medium">
                                            Preview:
                                        </p>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-48 w-auto rounded-lg border object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData('is_active', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="is_active" className="!mt-0">
                                    Aktifkan banner
                                </Label>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                >
                                    <Link href="/dashboard/pages/banners/hero">
                                        Batal
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
