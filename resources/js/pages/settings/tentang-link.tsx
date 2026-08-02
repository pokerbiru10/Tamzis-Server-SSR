import { Form, Head } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import TentangLinkController from '@/actions/App/Http/Controllers/Settings/TentangLinkController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/tentang-link';

export default function TentangLink({
    tentangLinkUrl,
}: {
    tentangLinkUrl: string;
}) {
    return (
        <>
            <Head title="Link Tentang Kami" />

            <h1 className="sr-only">Link Tentang Kami</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Link Tentang Kami"
                    description="Atur URL tujuan menu Tentang Kami yang tampil di top bar navbar"
                />

                <Form
                    {...TentangLinkController.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="tentang_link_url">
                                    URL Tentang Kami
                                </Label>

                                <div className="flex gap-2">
                                    <Input
                                        id="tentang_link_url"
                                        name="tentang_link_url"
                                        className="mt-1 block w-full"
                                        defaultValue={tentangLinkUrl}
                                        required
                                        placeholder="Contoh: /company-profile atau https://tamzis.id/tentang"
                                    />

                                    {tentangLinkUrl && (
                                        <a
                                            href={tentangLinkUrl}
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
                                    <code className="rounded bg-muted px-1">/company-profile</code>
                                    ) atau URL lengkap (
                                    <code className="rounded bg-muted px-1">https://tamzis.id/tentang</code>
                                    ).
                                </p>

                                <InputError
                                    className="mt-1"
                                    message={errors.tentang_link_url}
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

TentangLink.layout = {
    breadcrumbs: [
        {
            title: 'Link Tentang Kami',
            href: edit(),
        },
    ],
};
