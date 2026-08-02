import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { PhotoDropzone } from '@/components/photo-dropzone';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TestimonialCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        locale: 'id',
        name: '',
        occupation: '',
        location: '',
        quote: '',
        photo_url: '',
        order: 0,
        is_active: true,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Menyimpan testimoni...');

        post('/dashboard/pages/testimonials', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Testimoni berhasil ditambahkan!', { id: toastId });
                reset();
            },
            onError: () => {
                toast.error('Gagal menyimpan testimoni.', { id: toastId });
            },
        });
    };

    return (
        <>
            <Head title="Tambah Testimoni" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/testimonials">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Tambah Testimoni</h1>
                        <p className="text-sm text-muted-foreground">
                            Tambahkan testimoni baru untuk section Member Testimonials di homepage.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Testimoni</CardTitle>
                        <CardDescription>
                            Isi informasi member dan kutipan yang akan ditampilkan di homepage.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="locale">Bahasa</Label>
                                    <select
                                        id="locale"
                                        value={data.locale}
                                        onChange={(e) => setData('locale', e.target.value)}
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="id">Indonesia</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="order">Urutan</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="occupation">Profesi</Label>
                                    <Input
                                        id="occupation"
                                        value={data.occupation}
                                        onChange={(e) => setData('occupation', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Lokasi</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quote">Kutipan</Label>
                                <RichTextEditor
                                    value={data.quote}
                                    onChange={(value) => setData('quote', value)}
                                    className="overflow-hidden rounded-xl border border-slate-200"
                                />
                                {errors.quote && <p className="text-sm text-red-500">{errors.quote}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Foto</Label>
                                <PhotoDropzone
                                    value={data.photo_url}
                                    onChange={(url) => setData('photo_url', url)}
                                />
                                {errors.photo_url && <p className="text-sm text-red-500">{errors.photo_url}</p>}
                            </div>

                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <Label htmlFor="is_active" className="text-sm font-medium">
                                        Aktifkan Testimoni
                                    </Label>
                                </div>
                                <Button type="submit" disabled={processing} className="bg-emerald-600 text-white hover:bg-emerald-700">
                                    {processing ? 'Menyimpan...' : 'Simpan Testimoni'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
