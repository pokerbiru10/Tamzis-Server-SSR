import { Head, Link, router, usePage } from '@inertiajs/react';
import { Settings, Radio, FileText, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

type BeritaSourceProps = {
    currentSource: 'elfsight' | 'manual';
};

export default function BeritaSource({ currentSource }: BeritaSourceProps) {
    const { props } = usePage();
    const flash = (props.flash as { success?: string; error?: string }) || {};

    const [source, setSource] = useState<'elfsight' | 'manual'>(currentSource);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        router.patch(
            '/settings/berita-source',
            { source },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Sumber berita berhasil diperbarui!');
                    setIsSaving(false);
                },
                onError: () => {
                    toast.error('Gagal memperbarui sumber berita.');
                    setIsSaving(false);
                },
            },
        );
    };

    return (
        <>
            <Head title="Sumber Berita - Settings" />

            <div className="mx-auto flex h-full w-full max-w-2xl flex-1 flex-col gap-6 p-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Sumber Berita
                    </h2>
                    <p className="text-muted-foreground">
                        Pilih sumber data untuk halaman Berita & Kegiatan di
                        website publik.
                    </p>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        {/* Option: Elfsight */}
                        <label
                            className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                source === 'elfsight'
                                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            <input
                                type="radio"
                                name="source"
                                value="elfsight"
                                checked={source === 'elfsight'}
                                onChange={() => setSource('elfsight')}
                                className="sr-only"
                            />
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                        source === 'elfsight'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    <Radio className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-emerald-950">
                                            Elfsight Instagram Feed
                                        </h3>
                                        {source === 'elfsight' && (
                                            <Check className="h-5 w-5 text-emerald-500" />
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Mengambil data secara otomatis dari
                                        Instagram melalui widget Elfsight.
                                        Konten dikelola di dashboard Elfsight.
                                    </p>
                                </div>
                            </div>
                        </label>

                        {/* Option: Manual */}
                        <label
                            className={`cursor-pointer rounded-xl border-2 p-5 transition-all ${
                                source === 'manual'
                                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            <input
                                type="radio"
                                name="source"
                                value="manual"
                                checked={source === 'manual'}
                                onChange={() => setSource('manual')}
                                className="sr-only"
                            />
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                        source === 'manual'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-emerald-950">
                                            Manual (Database)
                                        </h3>
                                        {source === 'manual' && (
                                            <Check className="h-5 w-5 text-emerald-500" />
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Mengambil data dari database lokal.
                                        Kelola berita melalui menu{' '}
                                        <Link
                                            href="/dashboard/berita"
                                            className="font-semibold text-emerald-600 hover:underline"
                                        >
                                            Dashboard &gt; Berita
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            type="submit"
                            disabled={isSaving || source === currentSource}
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                        {source !== currentSource && (
                            <span className="text-sm text-orange-600">
                                Ada perubahan belum disimpan
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

BeritaSource.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[{ title: 'Sumber Berita', href: '/settings/berita-source' }]}
    >
        {page}
    </AppLayout>
);
