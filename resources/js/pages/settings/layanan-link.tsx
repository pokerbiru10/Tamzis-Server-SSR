import { Form, Head } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import LayananLinkController from '@/actions/App/Http/Controllers/Settings/LayananLinkController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/layanan-link';

export default function LayananLink({
    layananLinkUrl,
}: {
    layananLinkUrl: string;
}) {
    return (
        <>
            <Head title="Link Layanan" />

            <h1 className="sr-only">Link Layanan</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Link Layanan"
                    description="Atur URL tujuan menu Layanan yang tampil di top bar navbar"
                />

                <Form
                    {...LayananLinkController.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="layanan_link_url">
                                    URL Layanan
                                </Label>

                                <div className="flex gap-2">
                                    <Input
                                        id="layanan_link_url"
                                        name="layanan_link_url"
                                        className="mt-1 block w-full"
                                        defaultValue={layananLinkUrl}
                                        required
                                        placeholder="Contoh: /simulasi-gtb atau https://layanan.tamzis.id"
                                    />

                                    {layananLinkUrl && (
                                        <a
                                            href={layananLinkUrl}
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
                                    <code className="rounded bg-muted px-1">/simulasi-gtb</code>
                                    ) atau URL lengkap (
                                    <code className="rounded bg-muted px-1">https://layanan.tamzis.id</code>
                                    ).
                                </p>

                                <InputError
                                    className="mt-1"
                                    message={errors.layanan_link_url}
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

LayananLink.layout = {
    breadcrumbs: [
        {
            title: 'Link Layanan',
            href: edit(),
        },
    ],
};
