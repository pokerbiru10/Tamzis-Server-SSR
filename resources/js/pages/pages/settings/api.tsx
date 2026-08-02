import { Head, router } from '@inertiajs/react';
import { Settings, Save, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SettingItem = {
    label: string;
    value: string;
    description: string;
    type: 'text' | 'password';
};

type SettingsData = Record<string, SettingItem>;

interface ApiSettingsProps {
    breadcrumbs?: Array<{ title: string; href: string }>;
    settings: SettingsData;
}

export default function ApiSettings({ settings }: ApiSettingsProps) {
    const [formData, setFormData] = useState<Record<string, string>>(
        Object.fromEntries(
            Object.entries(settings).map(([key, item]) => [key, item.value])
        )
    );
    const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
    const [processing, setProcessing] = useState(false);
    const [clearing, setClearing] = useState(false);

    const handleSave = () => {
        setProcessing(true);
        const toastId = toast.loading('Menyimpan pengaturan...');

        const settingsArray = Object.entries(formData).map(([key, value]) => ({
            key,
            value,
        }));

        router.put('/dashboard/settings/api', { settings: settingsArray }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pengaturan API berhasil disimpan!', { id: toastId });
                setProcessing(false);
            },
            onError: () => {
                toast.error('Gagal menyimpan pengaturan.', { id: toastId });
                setProcessing(false);
            },
        });
    };

    const handleClearConfig = () => {
        setClearing(true);
        const toastId = toast.loading('Membersihkan config cache...');

        router.post('/dashboard/settings/api/clear-config', {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Config cache berhasil di-clear!', { id: toastId });
                setClearing(false);
            },
            onError: () => {
                toast.error('Gagal membersihkan config cache.', { id: toastId });
                setClearing(false);
            },
        });
    };

    const togglePassword = (key: string) => {
        setShowPasswords((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <>
            <Head title="API Settings" />

            <div className="mx-auto w-full max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Settings className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">API Settings</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola API keys dan konfigurasi aplikasi.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleClearConfig}
                            disabled={clearing}
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${clearing ? 'animate-spin' : ''}`} />
                            {clearing ? 'Clearing...' : 'Clear Config'}
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={processing}
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Semua'}
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Elfsight Widget</CardTitle>
                        <CardDescription>
                            Konfigurasi widget Elfsight untuk menampilkan feed Instagram di halaman beranda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="ELFSIGHT_WIDGET_ID">Elfsight Widget ID</Label>
                            <Input
                                id="ELFSIGHT_WIDGET_ID"
                                value={formData.ELFSIGHT_WIDGET_ID || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, ELFSIGHT_WIDGET_ID: e.target.value }))}
                                placeholder="33a7653a-2974-46e0-8abb-67c44efb373a"
                            />
                            <p className="text-xs text-muted-foreground">
                                {settings.ELFSIGHT_WIDGET_ID?.description}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Instagram API</CardTitle>
                        <CardDescription>
                            Konfigurasi API Instagram untuk mengambil feed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="INSTAGRAM_ACCESS_TOKEN">Instagram Access Token</Label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        id="INSTAGRAM_ACCESS_TOKEN"
                                        type={showPasswords.INSTAGRAM_ACCESS_TOKEN ? 'text' : 'password'}
                                        value={formData.INSTAGRAM_ACCESS_TOKEN || ''}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, INSTAGRAM_ACCESS_TOKEN: e.target.value }))}
                                        placeholder="Masukkan Instagram Access Token"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => togglePassword('INSTAGRAM_ACCESS_TOKEN')}
                                    >
                                        {showPasswords.INSTAGRAM_ACCESS_TOKEN ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {settings.INSTAGRAM_ACCESS_TOKEN?.description}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="INSTAGRAM_USER_ID">Instagram User ID</Label>
                                <Input
                                    id="INSTAGRAM_USER_ID"
                                    value={formData.INSTAGRAM_USER_ID || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, INSTAGRAM_USER_ID: e.target.value }))}
                                    placeholder="17841407149067411"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="INSTAGRAM_ACCOUNT_NAME">Instagram Account Name</Label>
                                <Input
                                    id="INSTAGRAM_ACCOUNT_NAME"
                                    value={formData.INSTAGRAM_ACCOUNT_NAME || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, INSTAGRAM_ACCOUNT_NAME: e.target.value }))}
                                    placeholder="tamzisbinautama"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>TAMZIS API</CardTitle>
                        <CardDescription>
                            Konfigurasi API TAMZIS untuk integrasi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="TAMZIS_API_URL">TAMZIS API URL</Label>
                            <Input
                                id="TAMZIS_API_URL"
                                value={formData.TAMZIS_API_URL || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, TAMZIS_API_URL: e.target.value }))}
                                placeholder="http://103.52.147.11:10505"
                            />
                            <p className="text-xs text-muted-foreground">
                                {settings.TAMZIS_API_URL?.description}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="HMAC_SECRET_KEY">HMAC Secret Key</Label>
                            <div className="relative">
                                <Input
                                    id="HMAC_SECRET_KEY"
                                    type={showPasswords.HMAC_SECRET_KEY ? 'text' : 'password'}
                                    value={formData.HMAC_SECRET_KEY || ''}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, HMAC_SECRET_KEY: e.target.value }))}
                                    placeholder="Masukkan HMAC Secret Key"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => togglePassword('HMAC_SECRET_KEY')}
                                >
                                    {showPasswords.HMAC_SECRET_KEY ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {settings.HMAC_SECRET_KEY?.description}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                <RefreshCw className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-yellow-900">Clear Config Cache</h3>
                                <p className="mt-1 text-sm text-yellow-700">
                                    Setelah mengubah API settings, klik tombol "Clear Config" untuk menerapkan perubahan.
                                    Ini akan menjalankan <code className="rounded bg-yellow-100 px-1">php artisan config:clear</code>.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
