import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { RichTextEditor } from '@/components/rich-text-editor';
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
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

type Link = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedData<T> = {
    data: T[];
    links: Link[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
};

type JobVacancy = {
    id: number;
    title: string;
    description: string;
    image_path: string | null;
    apply_link: string | null;
    is_active: boolean;
    created_at: string;
};

type KegiatanSdi = {
    id: number;
    title: string;
    content: string | null;
    image_path: string | null;
    is_active: boolean;
    created_at: string;
};

export default function KarirIndex({
    vacancies,
    kegiatan,
}: {
    vacancies: PaginatedData<JobVacancy>;
    kegiatan: PaginatedData<KegiatanSdi>;
}) {
    const { props } = usePage();
    const flash = (props.flash as { success?: string; error?: string }) || {};

    const [activeTab, setActiveTab] = useState<'lowongan' | 'kegiatan'>('lowongan');

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedKarir, setSelectedKarir] = useState<JobVacancy | null>(null);

    const [isCreateKegiatanOpen, setIsCreateKegiatanOpen] = useState(false);
    const [isEditKegiatanOpen, setIsEditKegiatanOpen] = useState(false);
    const [isDeleteKegiatanOpen, setIsDeleteKegiatanOpen] = useState(false);
    const [selectedKegiatan, setSelectedKegiatan] = useState<KegiatanSdi | null>(null);

    const createForm = useForm({
        title: '',
        description: '',
        apply_link: '',
        is_active: true,
        image: null as File | null,
    });

    const editForm = useForm({
        _method: 'PUT',
        title: '',
        description: '',
        apply_link: '',
        is_active: true,
        image: null as File | null,
    });

    const createKegiatanForm = useForm({
        title: '',
        content: '',
        is_active: true,
        image: null as File | null,
    });

    const editKegiatanForm = useForm({
        _method: 'PUT',
        title: '',
        content: '',
        is_active: true,
        image: null as File | null,
    });

    const openCreateModal = () => {
        createForm.reset();
        createForm.clearErrors();
        setIsCreateOpen(true);
    };

    const openEditModal = (karir: JobVacancy) => {
        setSelectedKarir(karir);
        editForm.setData({
            _method: 'PUT',
            title: karir.title,
            description: karir.description,
            apply_link: karir.apply_link || '',
            is_active: Boolean(karir.is_active),
            image: null,
        });
        editForm.clearErrors();
        setIsEditOpen(true);
    };

    const openDeleteModal = (karir: JobVacancy) => {
        setSelectedKarir(karir);
        setIsDeleteOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/dashboard/karir', {
            onSuccess: () => setIsCreateOpen(false),
            forceFormData: true,
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedKarir) {
return;
}

        editForm.post(`/dashboard/karir/${selectedKarir.id}`, {
            onSuccess: () => setIsEditOpen(false),
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        if (!selectedKarir) {
return;
}

        router.delete(`/dashboard/karir/${selectedKarir.id}`, {
            onSuccess: () => setIsDeleteOpen(false),
        });
    };

    // Kegiatan SDI handlers
    const openCreateKegiatanModal = () => {
        createKegiatanForm.reset();
        createKegiatanForm.clearErrors();
        setIsCreateKegiatanOpen(true);
    };

    const openEditKegiatanModal = (item: KegiatanSdi) => {
        setSelectedKegiatan(item);
        editKegiatanForm.setData({
            _method: 'PUT',
            title: item.title,
            content: item.content || '',
            is_active: Boolean(item.is_active),
            image: null,
        });
        editKegiatanForm.clearErrors();
        setIsEditKegiatanOpen(true);
    };

    const openDeleteKegiatanModal = (item: KegiatanSdi) => {
        setSelectedKegiatan(item);
        setIsDeleteKegiatanOpen(true);
    };

    const handleCreateKegiatan = (e: React.FormEvent) => {
        e.preventDefault();
        createKegiatanForm.post('/dashboard/karir/kegiatan-sdi', {
            onSuccess: () => setIsCreateKegiatanOpen(false),
            forceFormData: true,
        });
    };

    const handleEditKegiatan = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedKegiatan) {
return;
}

        editKegiatanForm.post(`/dashboard/karir/kegiatan-sdi/${selectedKegiatan.id}`, {
            onSuccess: () => setIsEditKegiatanOpen(false),
            forceFormData: true,
        });
    };

    const handleDeleteKegiatan = () => {
        if (!selectedKegiatan) {
return;
}

        router.delete(`/dashboard/karir/kegiatan-sdi/${selectedKegiatan.id}`, {
            onSuccess: () => setIsDeleteKegiatanOpen(false),
        });
    };

    return (
        <>
            <Head title="Kelola Karir" />

            <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col gap-4 p-4">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold tracking-tight">Kelola Karir</h2>
                    <p className="text-muted-foreground">
                        Kelola lowongan pekerjaan dan kegiatan SDI yang tampil di Portal Karir.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b pb-0">
                    <button
                        onClick={() => setActiveTab('lowongan')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === 'lowongan'
                                ? 'border-b-2 border-emerald-600 text-emerald-700'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Lowongan Kerja
                    </button>
                    <button
                        onClick={() => setActiveTab('kegiatan')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === 'kegiatan'
                                ? 'border-b-2 border-emerald-600 text-emerald-700'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Kegiatan SDI
                    </button>
                </div>

                {flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-700">
                        {flash.success}
                    </div>
                )}

                {/* Lowongan Kerja Tab */}
                {activeTab === 'lowongan' && (
                    <>
                        <div className="flex items-center justify-between">
                            <div />
                            <Button onClick={openCreateModal} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Karir
                            </Button>
                        </div>

                        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">ID</TableHead>
                                        <TableHead>Posisi / Judul</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vacancies.data.length > 0 ? (
                                        vacancies.data.map((vacancy) => (
                                            <TableRow key={vacancy.id}>
                                                <TableCell className="font-medium">{vacancy.id}</TableCell>
                                                <TableCell>
                                                    <div className="font-semibold text-emerald-950">{vacancy.title}</div>
                                                    {vacancy.image_path && (
                                                        <a href={vacancy.image_path} target="_blank" rel="noreferrer" className="mt-1 flex items-center text-xs text-blue-600 hover:underline">
                                                            <Eye className="mr-1 h-3 w-3" /> Lihat Poster
                                                        </a>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {vacancy.is_active ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Aktif</span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Tidak Aktif</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(vacancy.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="icon" onClick={() => openEditModal(vacancy)} title="Edit Karir">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="destructive" size="icon" onClick={() => openDeleteModal(vacancy)} title="Hapus Karir">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">
                                                Tidak ada data lowongan karir.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {vacancies.links && vacancies.links.length > 3 && (
                            <div className="mt-2 flex items-center justify-between px-2">
                                <div className="text-sm text-muted-foreground">
                                    Menampilkan <span className="font-medium">{vacancies.from || 0}</span> ke{' '}
                                    <span className="font-medium">{vacancies.to || 0}</span> dari{' '}
                                    <span className="font-medium">{vacancies.total}</span> data
                                </div>
                                <div className="flex items-center space-x-2">
                                    {vacancies.links.map((link, i) => {
                                        let label = link.label;

                                        if (label.includes('Previous')) {
label = '«';
}

                                        if (label.includes('Next')) {
label = '»';
}

                                        return (
                                            <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} onClick={() => link.url && router.get(link.url)} className={link.active ? 'bg-emerald-600 text-white hover:bg-emerald-700' : ''}>
                                                <span dangerouslySetInnerHTML={{ __html: label }} />
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Kegiatan SDI Tab */}
                {activeTab === 'kegiatan' && (
                    <>
                        <div className="flex items-center justify-between">
                            <div />
                            <Button onClick={openCreateKegiatanModal} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Kegiatan
                            </Button>
                        </div>

                        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">ID</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Foto</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {kegiatan.data.length > 0 ? (
                                        kegiatan.data.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.id}</TableCell>
                                                <TableCell>
                                                    <div className="font-semibold text-emerald-950">{item.title}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {item.image_path ? (
                                                        <a href={item.image_path} target="_blank" rel="noreferrer" className="flex items-center text-xs text-blue-600 hover:underline">
                                                            <Eye className="mr-1 h-3 w-3" /> Lihat Foto
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {item.is_active ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Aktif</span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Tidak Aktif</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="icon" onClick={() => openEditKegiatanModal(item)} title="Edit">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="destructive" size="icon" onClick={() => openDeleteKegiatanModal(item)} title="Hapus">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                Tidak ada data kegiatan SDI.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {kegiatan.links && kegiatan.links.length > 3 && (
                            <div className="mt-2 flex items-center justify-between px-2">
                                <div className="text-sm text-muted-foreground">
                                    Menampilkan <span className="font-medium">{kegiatan.from || 0}</span> ke{' '}
                                    <span className="font-medium">{kegiatan.to || 0}</span> dari{' '}
                                    <span className="font-medium">{kegiatan.total}</span> data
                                </div>
                                <div className="flex items-center space-x-2">
                                    {kegiatan.links.map((link, i) => {
                                        let label = link.label;

                                        if (label.includes('Previous')) {
label = '«';
}

                                        if (label.includes('Next')) {
label = '»';
}

                                        return (
                                            <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} onClick={() => link.url && router.get(link.url)} className={link.active ? 'bg-emerald-600 text-white hover:bg-emerald-700' : ''}>
                                                <span dangerouslySetInnerHTML={{ __html: label }} />
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ===== Lowongan Kerja Dialogs ===== */}

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] sm:max-w-[640px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Karir</DialogTitle>
                        <DialogDescription>Tambahkan lowongan pekerjaan baru.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                        <div className="grid min-h-0 gap-4 overflow-y-auto py-4 pr-1">
                            <div className="grid gap-2">
                                <Label htmlFor="create-title">Judul Posisi</Label>
                                <Input id="create-title" value={createForm.data.title} onChange={(e) => createForm.setData('title', e.target.value)} placeholder="Contoh: Account Officer" className="focus-visible:ring-emerald-500" />
                                <InputError message={createForm.errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-desc">Deskripsi & Syarat</Label>
                                <RichTextEditor value={createForm.data.description} onChange={(value) => createForm.setData('description', value)} placeholder="Masukkan kualifikasi dan deskripsi pekerjaan" className="min-w-0 max-w-full overflow-hidden rounded-md border bg-white" />
                                <InputError message={createForm.errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-image">Poster/Gambar (Opsional)</Label>
                                <Input id="create-image" type="file" accept="image/*" onChange={(e) => createForm.setData('image', e.target.files?.[0] || null)} className="focus-visible:ring-emerald-500" />
                                <InputError message={createForm.errors.image} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-apply-link">Link Tombol Lamar Sekarang (Opsional)</Label>
                                <Input id="create-apply-link" value={createForm.data.apply_link} onChange={(e) => createForm.setData('apply_link', e.target.value)} placeholder="https://karir.tamzis.id" className="focus-visible:ring-emerald-500" />
                                <p className="text-xs text-slate-500">Kosongkan untuk menggunakan link default (karir.tamzis.id)</p>
                                <InputError message={createForm.errors.apply_link} />
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <input type="checkbox" id="create-active" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500" checked={createForm.data.is_active} onChange={(e) => createForm.setData('is_active', e.target.checked)} />
                                <Label htmlFor="create-active" className="cursor-pointer">Aktifkan Lowongan Ini</Label>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={createForm.processing} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                {createForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] sm:max-w-[640px]">
                    <DialogHeader>
                        <DialogTitle>Edit Karir</DialogTitle>
                        <DialogDescription>Ubah informasi lowongan. Unggah gambar baru untuk mengganti poster lama.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                        <div className="grid min-h-0 gap-4 overflow-y-auto py-4 pr-1">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-title">Judul Posisi</Label>
                                <Input id="edit-title" value={editForm.data.title} onChange={(e) => editForm.setData('title', e.target.value)} className="focus-visible:ring-emerald-500" />
                                <InputError message={editForm.errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-desc">Deskripsi & Syarat</Label>
                                <RichTextEditor value={editForm.data.description} onChange={(value) => editForm.setData('description', value)} placeholder="Masukkan kualifikasi dan deskripsi pekerjaan" className="min-w-0 max-w-full overflow-hidden rounded-md border bg-white" />
                                <InputError message={editForm.errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-image">Ganti Poster (Biarkan kosong jika tidak diubah)</Label>
                                <Input id="edit-image" type="file" accept="image/*" onChange={(e) => editForm.setData('image', e.target.files?.[0] || null)} className="focus-visible:ring-emerald-500" />
                                <InputError message={editForm.errors.image} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-apply-link">Link Tombol Lamar Sekarang (Opsional)</Label>
                                <Input id="edit-apply-link" value={editForm.data.apply_link} onChange={(e) => editForm.setData('apply_link', e.target.value)} placeholder="https://karir.tamzis.id" className="focus-visible:ring-emerald-500" />
                                <p className="text-xs text-slate-500">Kosongkan untuk menggunakan link default (karir.tamzis.id)</p>
                                <InputError message={editForm.errors.apply_link} />
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <input type="checkbox" id="edit-active" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500" checked={editForm.data.is_active} onChange={(e) => editForm.setData('is_active', e.target.checked)} />
                                <Label htmlFor="edit-active" className="cursor-pointer">Aktifkan Lowongan Ini</Label>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={editForm.processing} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus lowongan <strong>{selectedKarir?.title}</strong>? File gambar yang terkait juga akan dihapus.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
                        <Button variant="destructive" onClick={handleDelete}>Ya, Hapus</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ===== Kegiatan SDI Dialogs ===== */}

            <Dialog open={isCreateKegiatanOpen} onOpenChange={setIsCreateKegiatanOpen}>
                <DialogContent className="max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] sm:max-w-[640px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Kegiatan SDI</DialogTitle>
                        <DialogDescription>Tambahkan kegiatan SDI baru.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateKegiatan} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                        <div className="grid min-h-0 gap-4 overflow-y-auto py-4 pr-1">
                            <div className="grid gap-2">
                                <Label htmlFor="create-kegiatan-title">Judul</Label>
                                <Input id="create-kegiatan-title" value={createKegiatanForm.data.title} onChange={(e) => createKegiatanForm.setData('title', e.target.value)} placeholder="Contoh: Pelatihan Basic Syariah" className="focus-visible:ring-emerald-500" />
                                <InputError message={createKegiatanForm.errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-kegiatan-content">Teks / Berita</Label>
                                <RichTextEditor value={createKegiatanForm.data.content} onChange={(value) => createKegiatanForm.setData('content', value)} placeholder="Masukkan teks atau berita kegiatan" className="min-w-0 max-w-full overflow-hidden rounded-md border bg-white" />
                                <InputError message={createKegiatanForm.errors.content} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-kegiatan-image">Foto (Opsional)</Label>
                                <Input id="create-kegiatan-image" type="file" accept="image/*" onChange={(e) => createKegiatanForm.setData('image', e.target.files?.[0] || null)} className="focus-visible:ring-emerald-500" />
                                <InputError message={createKegiatanForm.errors.image} />
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <input type="checkbox" id="create-kegiatan-active" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500" checked={createKegiatanForm.data.is_active} onChange={(e) => createKegiatanForm.setData('is_active', e.target.checked)} />
                                <Label htmlFor="create-kegiatan-active" className="cursor-pointer">Aktifkan Kegiatan Ini</Label>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsCreateKegiatanOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={createKegiatanForm.processing} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                {createKegiatanForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditKegiatanOpen} onOpenChange={setIsEditKegiatanOpen}>
                <DialogContent className="max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] sm:max-w-[640px]">
                    <DialogHeader>
                        <DialogTitle>Edit Kegiatan SDI</DialogTitle>
                        <DialogDescription>Ubah informasi kegiatan. Unggah gambar baru untuk mengganti foto lama.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditKegiatan} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                        <div className="grid min-h-0 gap-4 overflow-y-auto py-4 pr-1">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-kegiatan-title">Judul</Label>
                                <Input id="edit-kegiatan-title" value={editKegiatanForm.data.title} onChange={(e) => editKegiatanForm.setData('title', e.target.value)} className="focus-visible:ring-emerald-500" />
                                <InputError message={editKegiatanForm.errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-kegiatan-content">Teks / Berita</Label>
                                <RichTextEditor value={editKegiatanForm.data.content} onChange={(value) => editKegiatanForm.setData('content', value)} placeholder="Masukkan teks atau berita kegiatan" className="min-w-0 max-w-full overflow-hidden rounded-md border bg-white" />
                                <InputError message={editKegiatanForm.errors.content} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-kegiatan-image">Ganti Foto (Biarkan kosong jika tidak diubah)</Label>
                                <Input id="edit-kegiatan-image" type="file" accept="image/*" onChange={(e) => editKegiatanForm.setData('image', e.target.files?.[0] || null)} className="focus-visible:ring-emerald-500" />
                                <InputError message={editKegiatanForm.errors.image} />
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <input type="checkbox" id="edit-kegiatan-active" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500" checked={editKegiatanForm.data.is_active} onChange={(e) => editKegiatanForm.setData('is_active', e.target.checked)} />
                                <Label htmlFor="edit-kegiatan-active" className="cursor-pointer">Aktifkan Kegiatan Ini</Label>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsEditKegiatanOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={editKegiatanForm.processing} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                {editKegiatanForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteKegiatanOpen} onOpenChange={setIsDeleteKegiatanOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus kegiatan <strong>{selectedKegiatan?.title}</strong>? File gambar yang terkait juga akan dihapus.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteKegiatanOpen(false)}>Batal</Button>
                        <Button variant="destructive" onClick={handleDeleteKegiatan}>Ya, Hapus</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

KarirIndex.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[{ title: 'Kelola Karir', href: '/dashboard/karir' }]}
    >
        {page}
    </AppLayout>
);
