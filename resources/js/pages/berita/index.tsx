import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Plus,
    Pencil,
    Trash2,
    ExternalLink,
    Search,
    X,
    ImageIcon,
    HelpCircle,
    ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSetBreadcrumbs } from '@/hooks/use-breadcrumbs';

type LinkType = {
    url: string | null;
    label: string;
    active: boolean;
};

type TagType = {
    id: number;
    name: string;
    slug: string;
};

type Feed = {
    id: number;
    instagram_id: string;
    caption: string | null;
    excerpt: string | null;
    media_url: string | null;
    image_path: string | null;
    permalink: string | null;
    posted_at: string | null;
    is_published: boolean;
    tags: TagType[];
};

type PaginatedData<T> = {
    data: T[];
    links: LinkType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
};

export default function BeritaIndex({
    feeds,
    filters,
    tags,
}: {
    feeds: PaginatedData<Feed>;
    filters: { q?: string; tag?: string };
    tags: TagType[];
}) {
    useSetBreadcrumbs([{ title: 'Kelola Berita', href: '/dashboard/berita' }]);
    const { props } = usePage();
    const flash = (props.flash as { success?: string; error?: string }) || {};

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [search, setSearch] = useState(filters?.q || '');
    const [tagFilter, setTagFilter] = useState(filters?.tag || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/dashboard/berita',
            { q: search, tag: tagFilter },
            { preserveState: true, replace: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setTagFilter('');
        router.get('/dashboard/berita', {}, { preserveState: false });
    };

    const openDeleteModal = (feed: Feed) => {
        setSelectedFeed(feed);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        if (!selectedFeed) {
return;
}

        setIsDeleting(true);
        toast.loading('Menghapus berita...');
        router.delete(`/dashboard/berita/${selectedFeed.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss();
                toast.success('Berita berhasil dihapus!');
                setIsDeleteOpen(false);
                setSelectedFeed(null);
                setIsDeleting(false);
            },
            onError: () => {
                toast.dismiss();
                toast.error('Gagal menghapus berita. Silakan coba lagi.');
                setIsDeleting(false);
            },
        });
    };

    const formatDate = (iso: string | null) => {
        if (!iso) {
return '-';
}

        return new Date(iso).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Gunakan hanya gambar yang disimpan di database (image_path).
    // Jangan fallback ke media_url Instagram / Elfsight di dashboard admin.
    const getThumb = (feed: Feed) => feed.image_path || null;

    return (
        <>
            <Head title="Kelola Berita" />

            <div className="mx-auto flex h-full w-full max-w-6xl flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Kelola Berita
                        </h2>
                        <p className="text-muted-foreground">
                            Kelola konten berita / Instagram feed di website.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 text-slate-500 hover:text-emerald-600"
                                        asChild
                                    >
                                        <Link href="/settings/berita-source">
                                            <HelpCircle className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="max-w-xs p-4 border border-slate-200 bg-white text-slate-900 shadow-lg">
                                    <div className="space-y-2">
                                        <p className="font-bold text-emerald-900">
                                            Atur Sumber Berita
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            Pilih sumber data untuk halaman berita di website:
                                        </p>
                                        <ul className="space-y-1 text-xs text-slate-600">
                                            <li className="flex items-center gap-1">
                                                <span className="font-semibold">1.</span> Elfsight (Otomatis dari Instagram)
                                            </li>
                                            <li className="flex items-center gap-1">
                                                <span className="font-semibold">2.</span> Manual (Upload dari Dashboard)
                                            </li>
                                        </ul>
                                        <Link
                                            href="/settings/berita-source"
                                            className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                                        >
                                            Atur Sekarang
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Link href="/dashboard/berita/create">
                            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Berita
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                {/* Search & Filter */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-wrap items-center gap-2"
                >
                    <div className="relative min-w-[200px] flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            className="pl-9 focus-visible:ring-emerald-500"
                            placeholder="Cari caption atau excerpt..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={tagFilter}
                        onChange={(e) => setTagFilter(e.target.value)}
                    >
                        <option value="">Semua Tag</option>
                        {tags.map((t) => (
                            <option key={t.id} value={t.slug}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                    <Button
                        type="submit"
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        <Search className="mr-1 h-4 w-4" />
                        Cari
                    </Button>
                    {(filters?.q || filters?.tag) && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={clearFilters}
                        >
                            <X className="mr-1 h-4 w-4" />
                            Reset
                        </Button>
                    )}
                </form>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead className="w-[80px]">Gambar</TableHead>
                                <TableHead>Caption / Excerpt</TableHead>
                                <TableHead>Tag</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal Post</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feeds.data.length > 0 ? (
                                feeds.data.map((feed) => (
                                    <TableRow key={feed.id}>
                                        <TableCell className="font-medium">
                                            {feed.id}
                                        </TableCell>
                                        <TableCell>
                                            {getThumb(feed) ? (
                                                <img
                                                    src={getThumb(feed)!}
                                                    alt="media"
                                                    className="h-12 w-12 rounded-md border object-cover"
                                                    onError={(e) => {
                                                        (
                                                            e.target as HTMLImageElement
                                                        ).style.display =
                                                            'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted">
                                                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-xs">
                                                {feed.excerpt && (
                                                    <p
                                                        className="line-clamp-2 text-sm font-medium"
                                                        dangerouslySetInnerHTML={{ __html: feed.excerpt }}
                                                    />
                                                )}
                                                {feed.caption && (
                                                    <p
                                                        className="mt-0.5 line-clamp-1 text-xs text-muted-foreground"
                                                        dangerouslySetInnerHTML={{ __html: feed.caption }}
                                                    />
                                                )}
                                                {feed.permalink && (
                                                    <a
                                                        href={feed.permalink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                        Lihat di Instagram
                                                    </a>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex max-w-[150px] flex-wrap gap-1">
                                                {feed.tags.length > 0 ? (
                                                    feed.tags.map((t) => (
                                                        <span
                                                            key={t.id}
                                                            className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800"
                                                        >
                                                            {t.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {feed.is_published ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    Publish
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                                                    Draft
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                            {formatDate(feed.posted_at)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/berita/${feed.id}/edit`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        title="Edit Berita"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        openDeleteModal(feed)
                                                    }
                                                    title="Hapus Berita"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center"
                                    >
                                        Tidak ada data berita.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {feeds.links && feeds.links.length > 3 && (
                    <div className="mt-2 flex items-center justify-between px-2">
                        <div className="text-sm text-muted-foreground">
                            Menampilkan{' '}
                            <span className="font-medium">{feeds.from || 0}</span>{' '}
                            ke{' '}
                            <span className="font-medium">{feeds.to || 0}</span>{' '}
                            dari{' '}
                            <span className="font-medium">{feeds.total}</span>{' '}
                            data
                        </div>
                        <div className="flex items-center space-x-2">
                            {feeds.links.map((link, i) => {
                                let label = link.label;

                                if (label.includes('Previous')) {
label = '«';
}

                                if (label.includes('Next')) {
label = '»';
}

                                return (
                                    <Button
                                        key={i}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.get(link.url)
                                        }
                                        className={
                                            link.active
                                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                : ''
                                        }
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: label,
                                            }}
                                        />
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Hapus Berita</DialogTitle>
                        <DialogDescription>
                            Yakin ingin menghapus berita ini? Tindakan ini tidak
                            dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Menghapus...' : 'Hapus'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}