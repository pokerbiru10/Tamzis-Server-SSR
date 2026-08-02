import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

type Office = {
    id: number;
    area: string;
    name: string;
    phone: string;
    address: string;
    maps_link: string;
};

export default function AlamatIndex({ offices }: { offices: Office[] }) {
    const { props } = usePage();
    const flash = (props.flash as { success?: string; error?: string }) || {};
    const errors_props = props.errors as Record<string, string>;

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAlamat, setSelectedAlamat] = useState<Office | null>(null);

    // Form for create
    const createForm = useForm({
        area: '',
        name: '',
        phone: '',
        address: '',
        maps_link: '',
    });

    // Form for edit
    const editForm = useForm({
        _method: 'PUT',
        area: '',
        name: '',
        phone: '',
        address: '',
        maps_link: '',
    });

    const openCreateModal = () => {
        createForm.reset();
        createForm.clearErrors();
        setIsCreateOpen(true);
    };

    const openEditModal = (alamat: Office) => {
        setSelectedAlamat(alamat);
        editForm.setData({
            _method: 'PUT',
            area: alamat.area,
            name: alamat.name,
            phone: alamat.phone,
            address: alamat.address,
            maps_link: alamat.maps_link,
        });
        editForm.clearErrors();
        setIsEditOpen(true);
    };

    const openDeleteModal = (alamat: Office) => {
        setSelectedAlamat(alamat);
        setIsDeleteOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/dashboard/alamat', {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAlamat) {
return;
}

        editForm.post(`/dashboard/alamat/${selectedAlamat.id}`, {
            onSuccess: () => setIsEditOpen(false),
        });
    };

    const handleDelete = () => {
        if (!selectedAlamat) {
return;
}

        router.delete(`/dashboard/alamat/${selectedAlamat.id}`, {
            onSuccess: () => setIsDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title="Kelola Alamat" />

            <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col gap-4 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Kelola Alamat
                        </h2>
                        <p className="text-muted-foreground">
                            Kelola alamat kantor layanan cabang TAMZIS.
                        </p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Alamat
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-700">
                        {flash.success}
                    </div>
                )}
                {errors_props?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
                        {errors_props.error}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">No</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Nama Cabang</TableHead>
                                <TableHead>Telepon/WA</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {offices && offices.length > 0 ? (
                                offices.map((alamat, index) => (
                                    <TableRow key={alamat.id}>
                                        <TableCell className="font-medium text-slate-500">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {alamat.area}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold text-emerald-950">
                                                {alamat.name}
                                            </div>
                                            <a
                                                href={alamat.maps_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-1 flex items-center text-xs text-blue-600 hover:underline"
                                            >
                                                <MapPin className="mr-1 h-3 w-3" />{' '}
                                                Maps
                                            </a>
                                        </TableCell>
                                        <TableCell>{alamat.phone}</TableCell>
                                        <TableCell
                                            className="max-w-[250px] truncate"
                                            title={alamat.address}
                                        >
                                            {alamat.address}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        openEditModal(alamat)
                                                    }
                                                    title="Edit Alamat"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        openDeleteModal(alamat)
                                                    }
                                                    title="Hapus Alamat"
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
                                        colSpan={6}
                                        className="h-24 text-center"
                                    >
                                        Tidak ada data alamat kantor.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Alamat Kantor</DialogTitle>
                        <DialogDescription>
                            Tambahkan data alamat kantor layanan baru.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="create-area">
                                    Area (Wilayah)
                                </Label>
                                <Input
                                    id="create-area"
                                    value={createForm.data.area}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'area',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: Area Wonosobo"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.area} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-name">Nama Cabang</Label>
                                <Input
                                    id="create-name"
                                    value={createForm.data.name}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: Kantor Pusat"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-phone">
                                    Nomor Telepon / WhatsApp
                                </Label>
                                <Input
                                    id="create-phone"
                                    value={createForm.data.phone}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'phone',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: 628112613134"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.phone} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-address">
                                    Alamat Lengkap
                                </Label>
                                <Textarea
                                    id="create-address"
                                    value={createForm.data.address}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'address',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan alamat lengkap"
                                    className="min-h-[80px] focus-visible:ring-emerald-500"
                                />
                                <InputError
                                    message={createForm.errors.address}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-maps">
                                    Tautan Google Maps
                                </Label>
                                <Input
                                    id="create-maps"
                                    value={createForm.data.maps_link}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'maps_link',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: https://maps.app.goo.gl/..."
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError
                                    message={createForm.errors.maps_link}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreateOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={createForm.processing}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                {createForm.processing
                                    ? 'Menyimpan...'
                                    : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Alamat Kantor</DialogTitle>
                        <DialogDescription>
                            Ubah informasi alamat kantor.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-area">
                                    Area (Wilayah)
                                </Label>
                                <Input
                                    id="edit-area"
                                    value={editForm.data.area}
                                    onChange={(e) =>
                                        editForm.setData('area', e.target.value)
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.area} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nama Cabang</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) =>
                                        editForm.setData('name', e.target.value)
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-phone">
                                    Nomor Telepon / WhatsApp
                                </Label>
                                <Input
                                    id="edit-phone"
                                    value={editForm.data.phone}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'phone',
                                            e.target.value,
                                        )
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.phone} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-address">
                                    Alamat Lengkap
                                </Label>
                                <Textarea
                                    id="edit-address"
                                    value={editForm.data.address}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'address',
                                            e.target.value,
                                        )
                                    }
                                    className="min-h-[80px] focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.address} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-maps">
                                    Tautan Google Maps
                                </Label>
                                <Input
                                    id="edit-maps"
                                    value={editForm.data.maps_link}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'maps_link',
                                            e.target.value,
                                        )
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError
                                    message={editForm.errors.maps_link}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                {editForm.processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus data alamat{' '}
                            <strong>{selectedAlamat?.name}</strong>?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Ya, Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

AlamatIndex.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[{ title: 'Kelola Alamat', href: '/dashboard/alamat' }]}
    >
        {page}
    </AppLayout>
);
