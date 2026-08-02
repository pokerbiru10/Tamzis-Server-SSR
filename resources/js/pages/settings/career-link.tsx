import { Form, Head } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import CareerLinkController from '@/actions/App/Http/Controllers/Settings/CareerLinkController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/career-link';

export default function CareerLink({
    careerLinkUrl,
    careerLinkLabel,
    careerLinkLabelEn,
}: {
    careerLinkUrl: string;
    careerLinkLabel: string;
    careerLinkLabelEn: string;
}) {
    return (
        <>
            <Head title="Link Karir" />

            <h1 className="sr-only">Link Karir</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Link Info Karir"
                    description="Atur URL dan nama tombol Info Karir yang tampil di navbar"
                />

                <Form
                    {...CareerLinkController.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="career_link_label">
                                    Nama Tombol Info Karir (Indonesia)
                                </Label>

                                <Input
                                    id="career_link_label"
                                    name="career_link_label"
                                    className="mt-1 block w-full"
                                    defaultValue={careerLinkLabel}
                                    required
                                    maxLength={100}
                                    placeholder="Contoh: Info Karir"
                                />

                                <p className="text-xs text-muted-foreground">
                                    Teks yang ditampilkan pada tombol di top bar
                                    navbar saat bahasa Indonesia aktif. Maksimal
                                    100 karakter.
                                </p>

                                <InputError
                                    className="mt-1"
                                    message={errors.career_link_label}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="career_link_label_en">
                                    Nama Tombol Info Karir (English)
                                </Label>

                                <Input
                                    id="career_link_label_en"
                                    name="career_link_label_en"
                                    className="mt-1 block w-full"
                                    defaultValue={careerLinkLabelEn}
                                    required
                                    maxLength={100}
                                    placeholder="Contoh: Career Info"
                                />

                                <p className="text-xs text-muted-foreground">
                                    Teks yang ditampilkan pada tombol di top bar
                                    navbar saat bahasa Inggris aktif. Maksimal
                                    100 karakter.
                                </p>

                                <InputError
                                    className="mt-1"
                                    message={errors.career_link_label_en}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="career_link_url">
                                    URL Info Karir
                                </Label>

                                <div className="flex gap-2">
                                    <Input
                                        id="career_link_url"
                                        name="career_link_url"
                                        className="mt-1 block w-full"
                                        defaultValue={careerLinkUrl}
                                        required
                                        placeholder="Contoh: /info-karir atau https://karir.tamzis.id"
                                    />

                                    {careerLinkUrl && (
                                        <a
                                            href={careerLinkUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-1 inline-flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                            title="Buka link"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Bisa berupa path relatif (
                                    <code className="rounded bg-muted px-1">/info-karir</code>
                                    ) atau URL lengkap (
                                    <code className="rounded bg-muted px-1">https://karir.tamzis.id</code>
                                    ).
                                </p>

                                <InputError
                                    className="mt-1"
                                    message={errors.career_link_url}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

CareerLink.layout = {
    breadcrumbs: [
        {
            title: 'Link Karir',
            href: edit(),
        },
    ],
};
