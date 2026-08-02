import { Head, useForm, router, usePage } from '@inertiajs/react';
import {
    Plus,
    Pencil,
    Trash2,
    ToggleLeft,
    ToggleRight,
    ExternalLink,
    Share2,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    Globe,
    Send,
    Rss,
    MessageCircle,
    Phone,
    Youtube,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
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

// Daftar icon sosmed menggunakan Lucide React
const SOSMED_ICONS: { label: string; value: string; color: string; Icon: LucideIcon }[] = [
    { label: 'Instagram',  value: 'instagram',  color: '#E1306C', Icon: Instagram },
    { label: 'Facebook',   value: 'facebook',   color: '#1877F2', Icon: Facebook },
    { label: 'YouTube',    value: 'youtube',    color: '#FF0000', Icon: Youtube },
    { label: 'LinkedIn',   value: 'linkedin',   color: '#0A66C2', Icon: Linkedin },
    { label: 'Twitter',    value: 'twitter',   color: '#1DA1F2', Icon: Twitter },
    { label: 'Telegram',   value: 'telegram',   color: '#2CA5E0', Icon: Send },
    { label: 'WhatsApp',   value: 'whatsapp',   color: '#25D366', Icon: MessageCircle },
    { label: 'Website',    value: 'website',    color: '#6366F1', Icon: Globe },
    { label: 'Kontak',     value: 'phone',      color: '#16a34a', Icon: Phone },
    { label: 'Blog / RSS', value: 'rss',        color: '#F97316', Icon: Rss },
    { label: 'Lainnya',    value: 'other',      color: '#64748b', Icon: Share2 },
];

// Render icon sosmed menggunakan Lucide React
function SosmedIcon({ icon, size = 20 }: { icon: string; size?: number }) {
    const found = SOSMED_ICONS.find((i) => i.value === icon);
    const Icon = found ? found.Icon : Share2;

    return <Icon size={size} />;
}

type SocialMediaAccount = {
    id: number;
    name: string;
    icon: string;
    url: string;
    button_color: string;
    sort_order: number;
    is_active: boolean;
};

const emptyForm = {
    name: '',
    icon: 'instagram',
    url: '',
    button_color: '#E1306C',
    sort_order: '0',
    is_active: true as boolean,
};

export default function SosmedIndex({
    accounts,
}: {
    accounts: SocialMediaAccount[];
}) {
    const { props } = usePage();
    const flash = (props.flash as { success?: string; error?: string }) || {};

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selected, setSelected] = useState<SocialMediaAccount | null>(null);

    const createForm = useForm({ ...emptyForm });
    const editForm = useForm({ ...emptyForm });

    const openCreate = () => {
        createForm.reset();
        createForm.clearErrors();
        setIsCreateOpen(true);
    };

    const openEdit = (acc: SocialMediaAccount) => {
        setSelected(acc);
        editForm.setData({
            name: acc.name,
            icon: acc.icon,
            url: acc.url,
            button_color: acc.button_color,
            sort_order: String(acc.sort_order),
            is_active: acc.is_active,
        });
        editForm.clearErrors();
        setIsEditOpen(true);
    };

    const openDelete = (acc: SocialMediaAccount) => {
        setSelected(acc);
        setIsDeleteOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/dashboard/sosmed', {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selected) {
return;
}

        editForm.put(`/dashboard/sosmed/${selected.id}`, {
            onSuccess: () => setIsEditOpen(false),
        });
    };

    const handleDelete = () => {
        if (!selected) {
return;
}

        router.delete(`/dashboard/sosmed/${selected.id}`, {
            onSuccess: () => setIsDeleteOpen(false),
        });
    };

    const handleToggle = (acc: SocialMediaAccount) => {
        router.patch(`/dashboard/sosmed/${acc.id}/toggle`, {});
    };

    // Sinkronisasi warna default saat icon berubah
    const syncColor = (iconValue: string, form: typeof createForm) => {
        const found = SOSMED_ICONS.find((i) => i.value === iconValue);
        form.setData('icon', iconValue);

        if (found) {
form.setData('button_color', found.color);
}
    };

    return (
        <>
            <Head title="Akun Sosmed" />

            <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Akun Sosmed
                        </h2>
                        <p className="text-muted-foreground">
                            Kelola akun media sosial yang tampil di website.
                        </p>
                    </div>
                    <Button
                        onClick={openCreate}
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Akun
                    </Button>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-700">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
                        {flash.error}
                    </div>
                )}

                {/* Table */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">No</TableHead>
                                <TableHead className="w-[60px]">Icon</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead className="w-[110px]">
                                    Warna Tombol
                                </TableHead>
                                <TableHead className="w-[70px]">
                                    Urutan
                                </TableHead>
                                <TableHead className="w-[90px]">
                                    Status
                                </TableHead>
                                <TableHead className="w-[110px] text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.length > 0 ? (
                                accounts.map((acc, idx) => (
                                    <TableRow key={acc.id}>
                                        <TableCell className="font-medium">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow"
                                                style={{
                                                    backgroundColor:
                                                        acc.button_color,
                                                }}
                                            >
                                                <SosmedIcon
                                                    icon={acc.icon}
                                                    size={16}
                                                />
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {acc.name}
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                href={acc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex max-w-[200px] items-center gap-1 truncate text-sm text-blue-600 hover:underline"
                                            >
                                                <ExternalLink className="h-3 w-3 shrink-0" />
                                                {acc.url}
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="inline-block h-5 w-5 rounded border"
                                                    style={{
                                                        backgroundColor:
                                                            acc.button_color,
                                                    }}
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {acc.button_color}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {acc.sort_order}
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() =>
                                                    handleToggle(acc)
                                                }
                                                title={
                                                    acc.is_active
                                                        ? 'Nonaktifkan'
                                                        : 'Aktifkan'
                                                }
                                                className="flex items-center gap-1 text-sm transition-colors"
                                            >
                                                {acc.is_active ? (
                                                    <>
                                                        <ToggleRight className="h-5 w-5 text-emerald-500" />
                                                        <span className="text-emerald-600">
                                                            Aktif
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                                                        <span className="text-gray-400">
                                                            Nonaktif
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => openEdit(acc)}
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        openDelete(acc)
                                                    }
                                                    title="Hapus"
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
                                        colSpan={8}
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Share2 className="h-8 w-8 opacity-30" />
                                            <span>
                                                Belum ada akun sosmed. Klik
                                                "Tambah Akun" untuk mulai.
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* ── CREATE DIALOG ── */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Akun Sosmed</DialogTitle>
                        <DialogDescription>
                            Isi informasi akun media sosial baru.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="grid gap-4 py-4">
                            {/* Nama */}
                            <div className="grid gap-2">
                                <Label htmlFor="c-name">Nama Sosmed</Label>
                                <Input
                                    id="c-name"
                                    value={createForm.data.name}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="cth: Instagram Tamzis"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>

                            {/* Icon */}
                            <div className="grid gap-2">
                                <Label htmlFor="c-icon">Icon Platform</Label>
                                <div className="grid grid-cols-5 gap-2">
                                    {SOSMED_ICONS.map((ic) => (
                                        <button
                                            type="button"
                                            key={ic.value}
                                            onClick={() =>
                                                syncColor(
                                                    ic.value,
                                                    createForm as any,
                                                )
                                            }
                                            className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-xs transition-all ${
                                                createForm.data.icon === ic.value
                                                    ? 'border-emerald-500 bg-emerald-500/20'
                                                    : 'border-transparent hover:border-gray-300'
                                            }`}
                                        >
                                            <span
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                                                style={{
                                                    backgroundColor: ic.color,
                                                }}
                                            >
                                                <SosmedIcon
                                                    icon={ic.value}
                                                    size={14}
                                                />
                                            </span>
                                            <span className="leading-tight">
                                                {ic.label.split(' ')[0]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <InputError message={createForm.errors.icon} />
                            </div>

                            {/* URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="c-url">URL Akun</Label>
                                <Input
                                    id="c-url"
                                    type="url"
                                    value={createForm.data.url}
                                    onChange={(e) =>
                                        createForm.setData('url', e.target.value)
                                    }
                                    placeholder="https://instagram.com/tamzis"
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={createForm.errors.url} />
                            </div>

                            {/* Warna tombol + Urutan */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="c-color">
                                        Warna Tombol
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="c-color"
                                            type="color"
                                            value={createForm.data.button_color}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    'button_color',
                                                    e.target.value,
                                                )
                                            }
                                            className="h-10 w-12 cursor-pointer rounded border p-1"
                                        />
                                        <Input
                                            value={createForm.data.button_color}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    'button_color',
                                                    e.target.value,
                                                )
                                            }
                                            className="focus-visible:ring-emerald-500"
                                            maxLength={7}
                                        />
                                    </div>
                                    <InputError
                                        message={createForm.errors.button_color}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="c-sort">Urutan</Label>
                                    <Input
                                        id="c-sort"
                                        type="number"
                                        min={0}
                                        value={createForm.data.sort_order}
                                        onChange={(e) =>
                                            createForm.setData(
                                                'sort_order',
                                                e.target.value,
                                            )
                                        }
                                        className="focus-visible:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            {/* Status aktif */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="c-active"
                                    type="checkbox"
                                    checked={createForm.data.is_active}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'is_active',
                                            e.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                                />
                                <Label htmlFor="c-active">
                                    Aktifkan akun ini
                                </Label>
                            </div>

                            {/* Preview tombol */}
                            <div className="grid gap-2">
                                <Label>Preview Tombol</Label>
                                <div>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow transition-opacity hover:opacity-90"
                                        style={{
                                            backgroundColor:
                                                createForm.data.button_color,
                                        }}
                                    >
                                        <SosmedIcon
                                            icon={createForm.data.icon}
                                            size={14}
                                        />
                                        {createForm.data.name ||
                                            'Nama Sosmed...'}
                                    </button>
                                </div>
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

            {/* ── EDIT DIALOG ── */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Akun Sosmed</DialogTitle>
                        <DialogDescription>
                            Ubah detail akun media sosial.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="e-name">Nama Sosmed</Label>
                                <Input
                                    id="e-name"
                                    value={editForm.data.name}
                                    onChange={(e) =>
                                        editForm.setData('name', e.target.value)
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Icon Platform</Label>
                                <div className="grid grid-cols-5 gap-2">
                                    {SOSMED_ICONS.map((ic) => (
                                        <button
                                            type="button"
                                            key={ic.value}
                                            onClick={() =>
                                                syncColor(
                                                    ic.value,
                                                    editForm as any,
                                                )
                                            }
                                            className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-xs transition-all ${
                                                editForm.data.icon === ic.value
                                                    ? 'border-emerald-500 bg-emerald-500/20'
                                                    : 'border-transparent hover:border-gray-300'
                                            }`}
                                        >
                                            <span
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                                                style={{
                                                    backgroundColor: ic.color,
                                                }}
                                            >
                                                <SosmedIcon
                                                    icon={ic.value}
                                                    size={14}
                                                />
                                            </span>
                                            <span className="leading-tight">
                                                {ic.label.split(' ')[0]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <InputError message={editForm.errors.icon} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="e-url">URL Akun</Label>
                                <Input
                                    id="e-url"
                                    type="url"
                                    value={editForm.data.url}
                                    onChange={(e) =>
                                        editForm.setData('url', e.target.value)
                                    }
                                    className="focus-visible:ring-emerald-500"
                                />
                                <InputError message={editForm.errors.url} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="e-color">
                                        Warna Tombol
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="e-color"
                                            type="color"
                                            value={editForm.data.button_color}
                                            onChange={(e) =>
                                                editForm.setData(
                                                    'button_color',
                                                    e.target.value,
                                                )
                                            }
                                            className="h-10 w-12 cursor-pointer rounded border p-1"
                                        />
                                        <Input
                                            value={editForm.data.button_color}
                                            onChange={(e) =>
                                                editForm.setData(
                                                    'button_color',
                                                    e.target.value,
                                                )
                                            }
                                            className="focus-visible:ring-emerald-500"
                                            maxLength={7}
                                        />
                                    </div>
                                    <InputError
                                        message={editForm.errors.button_color}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="e-sort">Urutan</Label>
                                    <Input
                                        id="e-sort"
                                        type="number"
                                        min={0}
                                        value={editForm.data.sort_order}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'sort_order',
                                                e.target.value,
                                            )
                                        }
                                        className="focus-visible:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="e-active"
                                    type="checkbox"
                                    checked={editForm.data.is_active}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'is_active',
                                            e.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                                />
                                <Label htmlFor="e-active">
                                    Aktifkan akun ini
                                </Label>
                            </div>

                            <div className="grid gap-2">
                                <Label>Preview Tombol</Label>
                                <div>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow transition-opacity hover:opacity-90"
                                        style={{
                                            backgroundColor:
                                                editForm.data.button_color,
                                        }}
                                    >
                                        <SosmedIcon
                                            icon={editForm.data.icon}
                                            size={14}
                                        />
                                        {editForm.data.name || 'Nama Sosmed...'}
                                    </button>
                                </div>
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

            {/* ── DELETE DIALOG ── */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus akun{' '}
                            <strong>{selected?.name}</strong>? Tindakan ini
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

SosmedIndex.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[{ title: 'Akun Sosmed', href: '/dashboard/sosmed' }]}
    >
        {page}
    </AppLayout>
);
