import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
import AppLayout from '@/layouts/app-layout';

// Pagination type
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

type User = {
    id: number;
    name: string;
    email: string;
    is_online: boolean;
    created_at: string;
};

export default function UsersIndex({ users }: { users: PaginatedData<User> }) {
    const { props } = usePage();
    const flash = (props.flash as { success?: string; error?: string }) || {};
    const errors_props = props.errors as Record<string, string>;

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Form for create
    const createForm = useForm({
        name: '',
        email: '',
        password: '',
    });

    // Form for edit
    const editForm = useForm({
        name: '',
        email: '',
        password: '',
    });

    const openCreateModal = () => {
        createForm.reset();
        createForm.clearErrors();
        setIsCreateOpen(true);
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
        });
        editForm.clearErrors();
        setIsEditOpen(true);
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/dashboard/users', {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser) {
return;
}

        editForm.put(`/dashboard/users/${selectedUser.id}`, {
            onSuccess: () => setIsEditOpen(false),
        });
    };

    const handleDelete = () => {
        if (!selectedUser) {
return;
}

        router.delete(`/dashboard/users/${selectedUser.id}`, {
            onSuccess: () => setIsDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title="Kelola User" />

            <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col gap-4 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Kelola User
                        </h2>
                        <p className="text-muted-foreground">
                            Kelola pengguna sistem dan akses mereka.
                        </p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah User
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

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.id}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.is_online ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    Online
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                    Offline
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        openEditModal(user)
                                                    }
                                                    title="Edit User"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        openDeleteModal(user)
                                                    }
                                                    title="Hapus User"
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
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        Tidak ada data user.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="mt-2 flex items-center justify-between px-2">
                        <div className="text-sm text-muted-foreground">
                            Menampilkan{' '}
                            <span className="font-medium">
                                {users.from || 0}
                            </span>{' '}
                            ke{' '}
                            <span className="font-medium">{users.to || 0}</span>{' '}
                            dari{' '}
                            <span className="font-medium">{users.total}</span>{' '}
                            data
                        </div>
                        <div className="flex items-center space-x-2">
                            {users.links.map((link, i) => {
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
                                        ></span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tambah User</DialogTitle>
                        <DialogDescription>
                            Buat akun user baru di sini. Klik simpan setelah
                            selesai.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="create-name">Nama</Label>
                                <Input
                                    id="create-name"
                                    value={createForm.data.name}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan nama"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-email">Email</Label>
                                <Input
                                    id="create-email"
                                    type="email"
                                    value={createForm.data.email}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan email"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="create-password">
                                    Password
                                </Label>
                                <Input
                                    id="create-password"
                                    type="password"
                                    value={createForm.data.password}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan password"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError
                                    message={createForm.errors.password}
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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Ubah detail pengguna di sini. Kosongkan password
                            jika tidak ingin mengubahnya.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nama</Label>
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
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={editForm.data.email}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-password">
                                    Password Baru (Opsional)
                                </Label>
                                <Input
                                    id="edit-password"
                                    type="password"
                                    value={editForm.data.password}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Kosongkan jika tidak diubah"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError
                                    message={editForm.errors.password}
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
                            Apakah Anda yakin ingin menghapus pengguna{' '}
                            <strong>{selectedUser?.name}</strong>? Tindakan ini
                            tidak dapat dibatalkan.
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

UsersIndex.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[{ title: 'Kelola User', href: '/dashboard/users' }]}
    >
        {page}
    </AppLayout>
);
