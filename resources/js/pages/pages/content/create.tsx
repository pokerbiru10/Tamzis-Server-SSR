import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageContentForm  } from './page-content-form';
import type {PageContentFormData} from './page-content-form';

export default function PageContentCreate() {
    const { data, setData, post, processing, errors } = useForm<PageContentFormData>({
        title: '',
        slug: '',
        locale: 'id',
        content: '',
        meta_description: '',
        is_published: true,
    });

    const handleSubmit = () => {
        const toastId = toast.loading('Menyimpan konten halaman...');

        post('/dashboard/pages/content', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Konten halaman berhasil dibuat!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal menyimpan konten halaman.', { id: toastId });
            },
        });
    };

    return (
        <>
            <Head title="Tambah Konten Halaman" />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/content">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Tambah Konten Halaman</h1>
                        <p className="text-sm text-muted-foreground">
                            Buat halaman baru dan edit isinya secara visual.
                        </p>
                    </div>
                </div>

                <PageContentForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    submitLabel="Simpan Halaman"
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}
