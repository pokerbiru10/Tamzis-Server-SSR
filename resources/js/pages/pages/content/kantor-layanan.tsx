import { Head, useForm } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
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

type HeroContent = { badge: string; title: string; content: string };

type SectionData = {
    headerImage?: string | null;
    id: HeroContent;
    en: HeroContent;
};

const defaultData: SectionData = {
    headerImage: null,
    id: {
        badge: 'Jaringan Layanan',
        title: 'Temukan Kantor Terdekat',
        content:
            'TAMZIS hadir lebih dekat untuk melayani kebutuhan finansial syariah Anda. Jaringan kantor kami tersebar di berbagai wilayah untuk memastikan kemudahan akses bagi seluruh anggota.',
    },
    en: {
        badge: 'Service Network',
        title: 'Find Nearest Office',
        content:
            'TAMZIS is closer to serve your sharia financial needs. Our office network is spread across various regions to ensure easy access for all members.',
    },
};

export default function KantorLayananContentEdit({ section }: { section: SectionData | null }) {
    const [locale, setLocale] = useState<Locale>('id');
    const { data, setData, put, processing, errors } = useForm<SectionData>({
        headerImage: section?.headerImage ?? defaultData.headerImage,
        id: section?.id ?? defaultData.id,
        en: section?.en ?? defaultData.en,
    });

    const hero = data[locale];

    const setHeroField = (field: keyof HeroContent, value: string) => {
        setData(locale, { ...hero, [field]: value });
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Menyimpan konten Kantor Layanan...');

        put('/dashboard/pages/content/kantor-layanan', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Konten Kantor Layanan berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal menyimpan. Periksa kembali isian Anda (cek juga tab bahasa lainnya).', {
                    id: toastId,
                });
            },
        });
    };

    return (
        <>
            <Head title="Konten Halaman Kantor Layanan" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Konten Halaman Kantor Layanan</h1>
                    <p className="text-sm text-muted-foreground">
                        Kelola gambar header dan teks hero pada halaman /kantor-layanan. Daftar kantor sendiri
                        diambil otomatis dari sistem cabang TAMZIS, bukan dari sini.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <SectionCard
                        icon={<MapPin className="h-5 w-5" />}
                        title="Header &amp; Hero"
                        description="Gambar header serta badge, judul, dan deskripsi hero halaman Kantor Layanan."
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
                            <div className="space-y-2">
                                <Label htmlFor="hero-badge">Badge</Label>
                                <Input
                                    id="hero-badge"
                                    value={hero.badge}
                                    onChange={(e) => setHeroField('badge', e.target.value)}
                                    placeholder="Contoh: Jaringan Layanan"
                                />
                                {errors[`${locale}.badge` as keyof typeof errors] && (
                                    <p className="text-sm text-red-500">
                                        {errors[`${locale}.badge` as keyof typeof errors]}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hero-title">Judul</Label>
                                <Input
                                    id="hero-title"
                                    value={hero.title}
                                    onChange={(e) => setHeroField('title', e.target.value)}
                                    placeholder="Contoh: Temukan Kantor Terdekat"
                                />
                                {errors[`${locale}.title` as keyof typeof errors] && (
                                    <p className="text-sm text-red-500">
                                        {errors[`${locale}.title` as keyof typeof errors]}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Deskripsi</Label>
                                <RichTextEditor
                                    value={hero.content}
                                    onChange={(value) => setHeroField('content', value)}
                                    placeholder="Tuliskan deskripsi hero di sini..."
                                    className="overflow-hidden rounded-xl border border-slate-200"
                                />
                                {errors[`${locale}.content` as keyof typeof errors] && (
                                    <p className="text-sm text-red-500">
                                        {errors[`${locale}.content` as keyof typeof errors]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </SectionCard>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
