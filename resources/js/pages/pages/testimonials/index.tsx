import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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

type Testimonial = {
    id: number;
    locale: string;
    name: string;
    occupation: string | null;
    location: string | null;
    quote: string;
    photo_url: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
};

interface TestimonialPageProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    testimonials: Testimonial[];
}

export default function TestimonialsIndex({ testimonials }: TestimonialPageProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
            return;
        }

        setDeletingId(id);
        const toastId = toast.loading('Menghapus testimoni...');

        router.delete(`/dashboard/pages/testimonials/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Testimoni berhasil dihapus!', { id: toastId });
                setDeletingId(null);
            },
            onError: () => {
                toast.error('Gagal menghapus testimoni!', { id: toastId });
                setDeletingId(null);
            },
        });
    };

    return (
        <>
            <Head title="Testimoni Page" />

            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Testimoni Page</CardTitle>
                            <CardDescription>
                                Tambahkan, edit, dan hapus testimoni anggota atau klien TAMZIS di halaman ini.
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/dashboard/pages/testimonials/create" className="inline-flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Tambah Testimoni
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {testimonials.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-emerald-300/80 bg-emerald-50 p-12 text-center text-sm text-emerald-900">
                                <p className="mb-4 text-lg font-semibold">Belum ada testimoni.</p>
                                <p className="max-w-xl mx-auto text-emerald-800/80">
                                    Klik tombol &quot;Tambah Testimoni&quot; untuk membuat data testimoni yang akan tampil pada homepage.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-8">No</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Posisi</TableHead>
                                            <TableHead>Lokasi</TableHead>
                                            <TableHead>Quote</TableHead>
                                            <TableHead>Locale</TableHead>
                                            <TableHead className="text-center">Order</TableHead>
                                            <TableHead className="text-center">Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {testimonials.map((testimonial, index) => (
                                            <TableRow key={testimonial.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{testimonial.name}</TableCell>
                                                <TableCell>{testimonial.occupation ?? '-'}</TableCell>
                                                <TableCell>{testimonial.location ?? '-'}</TableCell>
                                                <TableCell className="max-w-xl truncate">{testimonial.quote}</TableCell>
                                                <TableCell>{testimonial.locale}</TableCell>
                                                <TableCell className="text-center">{testimonial.order}</TableCell>
                                                <TableCell className="text-center">
                                                    {testimonial.is_active ? 'Aktif' : 'Nonaktif'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/dashboard/pages/testimonials/${testimonial.id}/edit`}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(testimonial.id)}
                                                            disabled={deletingId === testimonial.id}
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
