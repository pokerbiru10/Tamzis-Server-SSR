import { Head, useForm } from '@inertiajs/react';
import { FileText, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { SectionCard } from '@/components/dashboard-collapsible';
import { HeaderImageUploader } from '@/components/header-image-uploader';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Locale = 'id' | 'en';

type LegalSection = { title: string; body: string };

type LegalPageData = { headerImage?: string | null; id: LegalSection[]; en: LegalSection[] };

type Sections = {
    'kebijakan-privasi'?: LegalPageData;
    'syarat-ketentuan'?: LegalPageData;
};

const defaultKebijakanPrivasi: LegalPageData = {
    id: [
        {
            title: '1. Informasi yang Kami Kumpulkan',
            body: '<p>Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung, seperti nama lengkap, alamat email, nomor telepon, dan informasi lain yang dikirimkan melalui formulir di website ini.</p>',
        },
    ],
    en: [
        {
            title: '1. Information We Collect',
            body: '<p>We collect personal information you provide directly to us, such as your full name, email address, phone number, and other information submitted through forms on this website.</p>',
        },
    ],
};

const defaultSyaratKetentuan: LegalPageData = {
    id: [
        {
            title: '1. Penerimaan Ketentuan',
            body: '<p>Dengan mengakses dan menggunakan website ini, Anda setuju untuk terikat dengan Syarat & Ketentuan ini.</p>',
        },
    ],
    en: [
        {
            title: '1. Acceptance of Terms',
            body: '<p>By accessing and using this website, you agree to be bound by these Terms & Conditions.</p>',
        },
    ],
};

function LegalPageEditor({
    pageKey,
    pageLabel,
    icon,
    initial,
}: {
    pageKey: 'kebijakan-privasi' | 'syarat-ketentuan';
    pageLabel: string;
    icon: React.ReactNode;
    initial: LegalPageData;
}) {
    const [locale, setLocale] = useState<Locale>('id');
    const { data, setData, put, processing, errors } = useForm<LegalPageData>({
        headerImage: initial.headerImage ?? null,
        id: initial.id,
        en: initial.en,
    });

    const sections = data[locale];

    const setSections = (next: LegalSection[]) => {
        setData(locale, next);
    };

    const updateSection = (index: number, patch: Partial<LegalSection>) => {
        setSections(
            sections.map((section, i) => (i === index ? { ...section, ...patch } : section)),
        );
    };

    const addSection = () => {
        setSections([...sections, { title: '', body: '' }]);
    };

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const toastId = toast.loading(`Menyimpan ${pageLabel}...`);

        put(`/dashboard/pages/legal/${pageKey}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${pageLabel} berhasil diperbarui!`, { id: toastId });
            },
            onError: () => {
                toast.error('Gagal menyimpan. Periksa kembali isian Anda (cek juga tab bahasa lainnya).', {
                    id: toastId,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <SectionCard
                icon={icon}
                title={pageLabel}
                description="Kelola bagian-bagian konten halaman ini per bahasa."
                defaultOpen
            >
                <div className="mb-6">
                    <HeaderImageUploader
                        value={data.headerImage}
                        onChange={(url) => setData('headerImage', url)}
                    />
                </div>

                <div className="mb-6 flex gap-2">
                    <Button
                        type="button"
                        variant={locale === 'id' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLocale('id')}
                        className={locale === 'id' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                        Bahasa Indonesia
                    </Button>
                    <Button
                        type="button"
                        variant={locale === 'en' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLocale('en')}
                        className={locale === 'en' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                        English
                    </Button>
                </div>

                <div className="space-y-5">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="space-y-3 rounded-xl border border-slate-200 p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor={`${pageKey}-${locale}-title-${index}`}>
                                        Judul Bagian
                                    </Label>
                                    <Input
                                        id={`${pageKey}-${locale}-title-${index}`}
                                        value={section.title}
                                        onChange={(e) => updateSection(index, { title: e.target.value })}
                                        placeholder="Contoh: 1. Informasi yang Kami Kumpulkan"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSection(index)}
                                    disabled={sections.length <= 1}
                                    className="mt-6 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${pageKey}-${locale}-body-${index}`}>
                                    Isi Bagian
                                </Label>
                                <RichTextEditor
                                    value={section.body}
                                    onChange={(value) => updateSection(index, { body: value })}
                                    placeholder="Tuliskan isi teks untuk bagian ini..."
                                    className="overflow-hidden rounded-xl border border-slate-200"
                                />
                            </div>
                        </div>
                    ))}

                    {(errors as Record<string, string>)[locale] && (
                        <p className="text-sm text-red-500">
                            {(errors as Record<string, string>)[locale]}
                        </p>
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={addSection}
                        className="w-full border-dashed"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Bagian
                    </Button>
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={processing}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                    {processing ? 'Menyimpan...' : `Simpan ${pageLabel}`}
                </Button>
            </div>
        </form>
    );
}

export default function LegalPagesEdit({ sections }: { sections: Sections }) {
    return (
        <>
            <Head title="Kebijakan & Syarat" />

            <div className="space-y-8 p-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Kebijakan Privasi &amp; Syarat Ketentuan
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Halaman ini hanya tersedia via footer website (tidak ada di menu navigasi utama).
                    </p>
                </div>

                <LegalPageEditor
                    pageKey="kebijakan-privasi"
                    pageLabel="Kebijakan Privasi"
                    icon={<ShieldCheck className="h-5 w-5" />}
                    initial={sections['kebijakan-privasi'] ?? defaultKebijakanPrivasi}
                />

                <LegalPageEditor
                    pageKey="syarat-ketentuan"
                    pageLabel="Syarat & Ketentuan"
                    icon={<FileText className="h-5 w-5" />}
                    initial={sections['syarat-ketentuan'] ?? defaultSyaratKetentuan}
                />
            </div>
        </>
    );
}
