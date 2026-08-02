import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Home, ListTree, FileText, Wallet, Banknote, Building2, Smartphone, Newspaper, Briefcase, Settings, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type PageContent = {
    id: number;
    slug: string;
    locale: string;
    title: string;
    meta_description: string | null;
    is_published: boolean;
    updated_at: string;
};

interface PageContentIndexProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    contents: PageContent[];
}

export default function PageContentIndex({ contents }: PageContentIndexProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus konten halaman ini?')) {
            return;
        }

        setDeletingId(id);
        const toastId = toast.loading('Menghapus konten halaman...');

        router.delete(`/dashboard/pages/content/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Konten halaman berhasil dihapus!', { id: toastId });
                setDeletingId(null);
            },
            onError: () => {
                toast.error('Gagal menghapus konten halaman!', { id: toastId });
                setDeletingId(null);
            },
        });
    };

    const handleToggle = (content: PageContent) => {
        const toastId = toast.loading('Memperbarui status...');

        router.patch(
            `/dashboard/pages/content/${content.id}/toggle`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        content.is_published
                            ? 'Halaman disembunyikan (draft).'
                            : 'Halaman dipublikasikan!',
                        { id: toastId },
                    );
                },
                onError: () => {
                    toast.error('Gagal memperbarui status!', { id: toastId });
                },
            },
        );
    };

    return (
        <>
            <Head title="Konten Halaman" />

            <div className="space-y-6">
                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Home className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Halaman Beranda</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit konten section homepage: statistik, keunggulan, dan lainnya.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/beranda" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Beranda
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <ListTree className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Menu Halaman</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit menu sidebar halaman profil dan lainnya — perubahan langsung tampil di website.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/menus" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Menu
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Profil</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit teks dan gambar halaman Profil Perusahaan, Legalitas, Visi Misi, Budaya, dan Penghargaan.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/profil" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Konten Profil
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Wallet className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Simpanan</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit teks dan gambar halaman Simpanan Mutiara, Pendidikan, Ijabah, Mudharabah, dan Berjangka.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/simpanan" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Konten Simpanan
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Banknote className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Pembiayaan</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit teks dan gambar halaman Mudharabah, Murabahah, Kafalah, Porsi Haji & Umroh, dan Griya Tumbuh Bahagia.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/pembiayaan" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Konten Pembiayaan
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Baitul Maal</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit teks dan gambar halaman Baitul Maal dan program sosial Islami lainnya.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/baitul-maal" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Konten Baitul Maal
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Newspaper className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Kelola Berita</p>
                                <p className="text-sm text-muted-foreground">
                                    Tambah, edit, dan kelola berita atau postingan dari Instagram feed.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/berita" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Kelola Berita
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Smartphone className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Layanan Digital</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit header, badge, subtitle, dan background image halaman Layanan Digital (M-TAMZIS).
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/layanan-digital" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Layanan Digital
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Info Karir</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit header, informasi, kegiatan HRD, lowongan, kontak, dan sidebar halaman Info Karir.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/info-karir" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Info Karir
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Konten Halaman Kantor Layanan</p>
                                <p className="text-sm text-muted-foreground">
                                    Edit gambar header, badge, judul, dan deskripsi hero halaman Kantor Layanan.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages/content/kantor-layanan" className="inline-flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Kantor Layanan
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Konten Halaman</CardTitle>
                            <CardDescription>
                                Kelola isi halaman website secara visual seperti di WordPress — tambah, edit, dan atur publikasinya.
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href="/dashboard/settings/api" className="inline-flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    API Settings
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/dashboard/pages/content/create" className="inline-flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Tambah Halaman
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {contents.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-emerald-300/80 bg-emerald-50 p-12 text-center text-sm text-emerald-900">
                                <p className="mb-4 text-lg font-semibold">Belum ada konten halaman.</p>
                                <p className="mx-auto max-w-xl text-emerald-800/80">
                                    Klik tombol &quot;Tambah Halaman&quot; untuk membuat konten halaman pertama Anda.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-8">No</TableHead>
                                            <TableHead>Judul</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Bahasa</TableHead>
                                            <TableHead className="text-center">Status</TableHead>
                                            <TableHead>Terakhir Diubah</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {contents.map((content, index) => (
                                            <TableRow key={content.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="font-medium">{content.title}</TableCell>
                                                <TableCell className="text-muted-foreground">/{content.slug}</TableCell>
                                                <TableCell className="uppercase">{content.locale}</TableCell>
                                                <TableCell className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggle(content)}
                                                        className={
                                                            content.is_published
                                                                ? 'rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200'
                                                                : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200'
                                                        }
                                                    >
                                                        {content.is_published ? 'Publish' : 'Draft'}
                                                    </button>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {new Date(content.updated_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/dashboard/pages/content/${content.id}/edit`}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(content.id)}
                                                            disabled={deletingId === content.id}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
