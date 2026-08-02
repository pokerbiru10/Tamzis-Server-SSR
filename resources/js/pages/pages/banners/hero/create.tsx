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

export default function HeroBannerCreate() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        button_text: '',
        button_url: '',
        image: null as File | null,
        page_slug: '',
        is_active: true,
        order: 0,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Halaman', href: '#' },
        {
            title: 'Banner Hero Section',
            href: '/dashboard/pages/banners/hero',
        },
        { title: 'Tambah Banner', href: '#' },
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

        const toastId = toast.loading('Menyimpan banner...');

        post('/dashboard/pages/banners/hero', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Banner berhasil ditambahkan!', { id: toastId });
                reset();
                setImagePreview(null);
            },
            onError: () => {
                toast.error('Gagal menambahkan banner!', { id: toastId });
            },
        });
    };

    return (
        <>
            <Head title="Tambah Banner Hero Section" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/banners/hero">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            Tambah Banner Hero Section
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Tambahkan banner baru untuk hero section
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Banner</CardTitle>
                        <CardDescription>
                            Isi formulir di bawah untuk menambahkan banner baru
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
                                <Label htmlFor="image">
                                    Gambar Banner{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
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
                                    Rekomendasi ukuran: 1920x800 piksel
                                </p>
                                {errors.image && (
                                    <p className="text-sm text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                                {imagePreview && (
                                    <div className="mt-4">
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
                                    Aktifkan banner sekarang
                                </Label>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan'}
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
