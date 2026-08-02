import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type PageContentFormData = {
    title: string;
    slug: string;
    locale: string;
    content: string;
    meta_description: string;
    is_published: boolean;
};

type PageContentFormProps = {
    data: PageContentFormData;
    setData: <K extends keyof PageContentFormData>(key: K, value: PageContentFormData[K]) => void;
    errors: Partial<Record<keyof PageContentFormData, string>>;
    processing: boolean;
    submitLabel: string;
    onSubmit: () => void;
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');

export function PageContentForm({ data, setData, errors, processing, submitLabel, onSubmit }: PageContentFormProps) {
    const [slugTouched, setSlugTouched] = useState(data.slug !== '' && data.slug !== slugify(data.title));
    const [showPreview, setShowPreview] = useState(true);

    const handleTitleChange = (title: string) => {
        setData('title', title);

        if (!slugTouched) {
            setData('slug', slugify(title));
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="grid gap-6 lg:grid-cols-[1fr_320px]"
        >
            <div className="space-y-6">
                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Halaman</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Contoh: Visi & Misi"
                                className="text-lg font-semibold"
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">/</span>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => {
                                        setSlugTouched(true);
                                        setData('slug', slugify(e.target.value));
                                    }}
                                    placeholder="visi-misi"
                                />
                            </div>
                            {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Konten</CardTitle>
                            <CardDescription>
                                Edit isi halaman secara visual seperti di WordPress.
                            </CardDescription>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPreview((v) => !v)}
                            className="inline-flex items-center gap-2"
                        >
                            {showPreview ? (
                                <>
                                    <EyeOff className="h-4 w-4" /> Sembunyikan Preview
                                </>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4" /> Tampilkan Preview
                                </>
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <RichTextEditor
                            value={data.content}
                            onChange={(value) => setData('content', value)}
                            placeholder="Tulis konten halaman di sini..."
                        />
                        {errors.content && <p className="mt-2 text-sm text-red-500">{errors.content}</p>}
                    </CardContent>
                </Card>

                {showPreview && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> Preview Halaman
                            </CardTitle>
                            <CardDescription>
                                Tampilan langsung seperti yang akan dilihat pengunjung website — ikut berubah saat Anda mengetik.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-hidden rounded-xl border shadow-sm">
                                <div className="flex items-center gap-1.5 border-b bg-slate-100 px-4 py-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                                    <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-xs text-muted-foreground">
                                        {`${typeof window !== 'undefined' ? window.location.origin : ''}/${data.slug || 'slug-halaman'}`}
                                    </span>
                                </div>
                                <div className="bg-white">
                                    <div className="bg-emerald-800 px-6 py-10 text-center text-white">
                                        <h1 className="text-3xl font-bold sm:text-4xl">
                                            {data.title || 'Judul Halaman'}
                                        </h1>
                                    </div>
                                    <div className="mx-auto max-w-3xl px-6 py-8">
                                        {data.content ? (
                                            <div
                                                className="prose prose-sm sm:prose-base prose-emerald max-w-none"
                                                dangerouslySetInnerHTML={{ __html: data.content }}
                                            />
                                        ) : (
                                            <p className="py-8 text-center text-sm text-muted-foreground">
                                                Konten masih kosong — mulai menulis di editor untuk melihat preview.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Publikasi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                            {errors.locale && <p className="text-sm text-red-500">{errors.locale}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                id="is_published"
                                type="checkbox"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <Label htmlFor="is_published" className="text-sm font-medium">
                                Publikasikan Halaman
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            {processing ? 'Menyimpan...' : submitLabel}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SEO</CardTitle>
                        <CardDescription>Deskripsi singkat untuk mesin pencari.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="meta_description">Meta Description</Label>
                            <Textarea
                                id="meta_description"
                                rows={4}
                                maxLength={500}
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                placeholder="Ringkasan halaman (maks. 500 karakter)"
                            />
                            {errors.meta_description && (
                                <p className="text-sm text-red-500">{errors.meta_description}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
