import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { BreadcrumbItem } from '@/types';

interface HeroBanner {
    id: number;
    title: string;
    description: string | null;
    button_text: string | null;
    button_url: string | null;
    image_path: string;
    page_slug: string;
    is_active: boolean;
    order: number;
    created_at: string;
}

export default function HeroBannerIndex({
    banners,
}: {
    banners: HeroBanner[];
}) {
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelola Halaman', href: '#' },
        { title: 'Banner Hero Section', href: '/dashboard/pages/banners/hero' },
    ];

    const handleDelete = (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus banner ini?')) {
            return;
        }

        setIsDeleting(id);
        const toastId = toast.loading('Menghapus banner...');

        router.delete(`/dashboard/pages/banners/hero/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Banner berhasil dihapus!', { id: toastId });
                setIsDeleting(null);
            },
            onError: () => {
                toast.error('Gagal menghapus banner!', { id: toastId });
                setIsDeleting(null);
            },
        });
    };

    const handleToggleActive = (id: number, currentStatus: boolean) => {
        const toastId = toast.loading('Mengubah status banner...');

        router.patch(
            `/dashboard/pages/banners/hero/${id}/toggle`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        `Banner ${currentStatus ? 'dinonaktifkan' : 'diaktifkan'}!`,
                        { id: toastId },
                    );
                },
                onError: () => {
                    toast.error('Gagal mengubah status banner!', {
                        id: toastId,
                    });
                },
            },
        );
    };

    return (
        <>
            <Head title="Banner Hero Section" />

            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Banner Hero Section</CardTitle>
                            <CardDescription>
                                Kelola banner hero section untuk halaman website
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/dashboard/pages/banners/hero/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Banner
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {banners.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">
                                Belum ada banner. Klik tombol "Tambah Banner"
                                untuk menambahkan.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-20">
                                            #
                                        </TableHead>
                                        <TableHead className="w-32">
                                            Gambar
                                        </TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Halaman</TableHead>
                                        <TableHead>Tombol</TableHead>
                                        <TableHead className="w-24 text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-24 text-center">
                                            Urutan
                                        </TableHead>
                                        <TableHead className="w-40 text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {banners.map((banner, index) => (
                                        <TableRow key={banner.id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    src={`/${banner.image_path}`}
                                                    alt={banner.title}
                                                    className="h-16 w-24 rounded object-cover"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {banner.title}
                                                </div>
                                                {banner.description && (
                                                    <div className="text-sm text-muted-foreground line-clamp-2">
                                                        {banner.description}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="rounded bg-muted px-2 py-1 text-xs font-medium">
                                                    {banner.page_slug}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {banner.button_text ? (
                                                    <span className="text-xs text-muted-foreground">
                                                        {banner.button_text}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={
                                                        banner.is_active
                                                            ? 'text-green-600 hover:text-green-700'
                                                            : 'text-red-600 hover:text-red-700'
                                                    }
                                                    onClick={() =>
                                                        handleToggleActive(
                                                            banner.id,
                                                            banner.is_active,
                                                        )
                                                    }
                                                >
                                                    {banner.is_active
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {banner.order}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/dashboard/pages/banners/hero/${banner.id}/edit`}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() =>
                                                            handleDelete(
                                                                banner.id,
                                                            )
                                                        }
                                                        disabled={
                                                            isDeleting ===
                                                            banner.id
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
