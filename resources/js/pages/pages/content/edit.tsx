import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageContentForm  } from './page-content-form';
import type {PageContentFormData} from './page-content-form';

type PageContent = {
    id: number;
    slug: string;
    locale: string;
    title: string;
    content: string | null;
    meta_description: string | null;
    is_published: boolean;
};

export default function PageContentEdit({ pageContent }: { pageContent: PageContent }) {
    const { data, setData, put, processing, errors } = useForm<PageContentFormData>({
        title: pageContent.title,
        slug: pageContent.slug,
        locale: pageContent.locale,
        content: pageContent.content ?? '',
        meta_description: pageContent.meta_description ?? '',
        is_published: pageContent.is_published,
    });

    const handleSubmit = () => {
        const toastId = toast.loading('Menyimpan perubahan...');

        put(`/dashboard/pages/content/${pageContent.id}`, {
            preserveState: false,
            onSuccess: () => {
                toast.success('Konten halaman berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal memperbarui konten halaman.', { id: toastId });
            },
        });
    };

    return (
        <>
            <Head title={`Edit: ${pageContent.title}`} />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/content">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Konten Halaman</h1>
                        <p className="text-sm text-muted-foreground">
                            Ubah isi halaman &quot;{pageContent.title}&quot; secara visual.
                        </p>
                    </div>
                </div>

                <PageContentForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    submitLabel="Simpan Perubahan"
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}
