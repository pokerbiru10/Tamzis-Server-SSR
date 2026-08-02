import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Pencil,
    Trash2,
    Plus,
    Save,
    X,
    Search,
    ImagePlus,
    ExternalLink,
    CheckCircle,
    Newspaper,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { FieldEditor } from '@/components/dashboard/content-field-editor';
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
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Feed {
    id: number;
    instagram_id: string;
    caption: string;
    excerpt: string;
    media_url: string;
    image_path: string;
    permalink: string;
    posted_at: string;
    is_published: boolean;
    tags: Tag[];
}

interface BeritaPageProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    feeds: Feed[];
    tags: Tag[];
}

export default function BeritaPage({ feeds: initialFeeds, tags }: BeritaPageProps) {
    const [feeds, setFeeds] = useState<Feed[]>(initialFeeds);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingFeed, setEditingFeed] = useState<Feed | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Filter feeds by search
    const filteredFeeds = feeds.filter((feed) => {
        const query = searchQuery.toLowerCase();

        return (
            feed.caption?.toLowerCase().includes(query) ||
            feed.excerpt?.toLowerCase().includes(query) ||
            feed.tags.some((tag) => tag.name.toLowerCase().includes(query))
        );
    });

    const handleEdit = (feed: Feed) => {
        setEditingId(feed.id);
        setEditingFeed({ ...feed });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingFeed(null);
    };

    const handleSave = () => {
        if (!editingFeed) {
return;
}

        setSaving(true);
        const toastId = toast.loading('Menyimpan...');

        router.put(
            `/dashboard/berita/${editingFeed.id}`,
            {
                caption: editingFeed.caption,
                excerpt: editingFeed.excerpt,
                media_url: editingFeed.media_url,
                permalink: editingFeed.permalink,
                posted_at: editingFeed.posted_at,
                is_published: editingFeed.is_published,
                tags: editingFeed.tags.map((t) => t.name),
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Berita berhasil diperbarui!', { id: toastId });
                    setFeeds((prev) =>
                        prev.map((f) => (f.id === editingFeed.id ? editingFeed : f)),
                    );
                    setEditingId(null);
                    setEditingFeed(null);
                },
                onError: () => {
                    toast.error('Gagal menyimpan!', { id: toastId });
                },
                onFinish: () => setSaving(false),
            },
        );
    };

    const handleDelete = (id: number) => {
        if (!confirm('Yakin ingin menghapus berita ini?')) {
return;
}

        setDeletingId(id);
        const toastId = toast.loading('Menghapus...');

        router.delete(`/dashboard/berita/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Berita berhasil dihapus!', { id: toastId });
                setFeeds((prev) => prev.filter((f) => f.id !== id));

                if (editingId === id) {
                    setEditingId(null);
                    setEditingFeed(null);
                }
            },
            onError: () => {
                toast.error('Gagal menghapus!', { id: toastId });
            },
            onFinish: () => setDeletingId(null),
        });
    };

    const handleTogglePublish = (feed: Feed) => {
        router.patch(`/dashboard/berita/${feed.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setFeeds((prev) =>
                    prev.map((f) =>
                        f.id === feed.id ? { ...f, is_published: !f.is_published } : f,
                    ),
                );
                toast.success(
                    feed.is_published ? 'Berita disembunyikan.' : 'Berita dipublikasikan.',
                );
            },
        });
    };

    return (
        <>
            <Head title="Kelola Berita" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Newspaper className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">Kelola Berita</h1>
                            <p className="text-sm text-muted-foreground">
                                Tambah, edit, dan kelola berita atau postingan dari Instagram feed.
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" asChild>
                        <Link
                            href="/dashboard/pages/content"
                            className="inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Search & Add */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari berita..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/berita/create" className="inline-flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tambah Berita
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Berita</CardTitle>
                        <CardDescription>
                            {filteredFeeds.length} berita ditemukan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Gambar</TableHead>
                                        <TableHead>Caption</TableHead>
                                        <TableHead>Tags</TableHead>
                                        <TableHead className="w-24">Tanggal</TableHead>
                                        <TableHead className="w-20 text-center">Status</TableHead>
                                        <TableHead className="w-32 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredFeeds.map((feed) => (
                                        <TableRow key={feed.id}>
                                            <TableCell>
                                                {feed.image_path || feed.media_url ? (
                                                    <img
                                                        src={feed.image_path || feed.media_url}
                                                        alt="thumbnail"
                                                        className="h-12 w-16 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100">
                                                        <ImagePlus className="h-4 w-4 text-slate-400" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    <p className="line-clamp-2 text-sm font-medium">
                                                        {feed.caption || feed.excerpt || '(tanpa caption)'}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {feed.tags.map((tag) => (
                                                        <span
                                                            key={tag.id}
                                                            className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {feed.posted_at
                                                    ? new Date(feed.posted_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                    : '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleTogglePublish(feed)}
                                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                                                        feed.is_published
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}
                                                >
                                                    {feed.is_published ? (
                                                        <>
                                                            <CheckCircle className="h-3 w-3" />
                                                            Publish
                                                        </>
                                                    ) : (
                                                        'Draft'
                                                    )}
                                                </button>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(feed)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(feed.id)}
                                                        disabled={deletingId === feed.id}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredFeeds.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                {searchQuery ? 'Tidak ada berita yang cocok.' : 'Belum ada berita. Klik "Tambah Berita" untuk membuat.'}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Modal */}
                {editingId && editingFeed && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
                            <CardHeader className="sticky top-0 bg-white z-10 border-b">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Edit Berita</CardTitle>
                                        <CardDescription>
                                            Edit konten berita #{editingId}
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleCancel}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="caption">Caption</Label>
                                    <textarea
                                        id="caption"
                                        value={editingFeed.caption || ''}
                                        onChange={(e) =>
                                            setEditingFeed({ ...editingFeed, caption: e.target.value })
                                        }
                                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Masukkan caption berita..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt / Ringkasan</Label>
                                    <textarea
                                        id="excerpt"
                                        value={editingFeed.excerpt || ''}
                                        onChange={(e) =>
                                            setEditingFeed({ ...editingFeed, excerpt: e.target.value })
                                        }
                                        className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Masukkan ringkasan singkat..."
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="media_url">URL Media</Label>
                                        <Input
                                            id="media_url"
                                            value={editingFeed.media_url || ''}
                                            onChange={(e) =>
                                                setEditingFeed({ ...editingFeed, media_url: e.target.value })
                                            }
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="permalink">Permalink</Label>
                                        <Input
                                            id="permalink"
                                            value={editingFeed.permalink || ''}
                                            onChange={(e) =>
                                                setEditingFeed({ ...editingFeed, permalink: e.target.value })
                                            }
                                            placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="posted_at">Tanggal Posting</Label>
                                    <Input
                                        id="posted_at"
                                        type="date"
                                        value={editingFeed.posted_at?.split('T')[0] || ''}
                                        onChange={(e) =>
                                            setEditingFeed({ ...editingFeed, posted_at: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="is_published"
                                        checked={editingFeed.is_published}
                                        onCheckedChange={(checked) =>
                                            setEditingFeed({ ...editingFeed, is_published: checked })
                                        }
                                    />
                                    <Label htmlFor="is_published" className="cursor-pointer">
                                        {editingFeed.is_published ? 'Dipublikasikan' : 'Simpan sebagai draft'}
                                    </Label>
                                </div>

                                {/* Preview Image */}
                                {(editingFeed.image_path || editingFeed.media_url) && (
                                    <div className="space-y-2">
                                        <Label>Preview Gambar</Label>
                                        <img
                                            src={editingFeed.image_path || editingFeed.media_url}
                                            alt="preview"
                                            className="max-h-48 rounded-lg object-contain border"
                                        />
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 pt-4 border-t">
                                    <Button variant="outline" onClick={handleCancel}>
                                        Batal
                                    </Button>
                                    <Button onClick={handleSave} disabled={saving}>
                                        <Save className="h-4 w-4 mr-2" />
                                        {saving ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}
