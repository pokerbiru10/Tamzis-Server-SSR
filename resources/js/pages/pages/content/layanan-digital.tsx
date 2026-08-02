import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SectionData = Record<string, any>;

type Sections = {
    header?: SectionData;
    tentang?: SectionData;
    fitur?: SectionData;
    panduan?: SectionData;
    bantuan?: SectionData;
    [key: string]: SectionData | undefined;
};

export default function LayananDigitalEdit({ sections }: { sections: Sections }) {
    const { data, setData, put, processing } = useForm({
        header: {
            id: {
                badge: sections.header?.id?.badge || 'Layanan Digital',
                title: sections.header?.id?.title || 'M-TAMZIS',
                subtitle: sections.header?.id?.subtitle || 'Aplikasi Mobile untuk Pengelolaan Keuangan Syariah',
                background_image: sections.header?.id?.background_image || '/assets/img/header/Cinta-masjid.webp',
            },
            en: {
                badge: sections.header?.en?.badge || 'Digital Services',
                title: sections.header?.en?.title || 'M-TAMZIS',
                subtitle: sections.header?.en?.subtitle || 'Mobile App for Sharia Financial Management',
                background_image: sections.header?.en?.background_image || '/assets/img/header/Cinta-masjid.webp',
            },
        },
        tentang: {
            id: {
                title: sections.tentang?.id?.title || 'Tentang M-Tamzis',
                description: sections.tentang?.id?.description || 'M-TAMZIS adalah aplikasi mobile yang dirancang khusus untuk memudahkan Anda dalam mengelola keuangan secara syariah. Dengan teknologi terkini dan antarmuka yang user-friendly, M-TAMZIS membawa solusi perbankan digital yang sesuai dengan nilai-nilai Islam.',
            },
            en: {
                title: sections.tentang?.en?.title || 'About M-Tamzis',
                description: sections.tentang?.en?.description || 'M-TAMZIS is a mobile application specifically designed to make it easy for you to manage your finances according to sharia principles. With the latest technology and a user-friendly interface, M-TAMZIS brings digital banking solutions that align with Islamic values.',
            },
        },
        fitur: {
            id: {
                title: sections.fitur?.id?.title || 'Fitur & Layanan M-Tamzis',
                description: sections.fitur?.id?.description || 'M-Tamzis menyediakan berbagai fitur dan layanan untuk memenuhi kebutuhan transaksi keuangan digital Anda:',
                items: sections.fitur?.id?.items || [
                    'Cek Saldo & Mutasi Rekening',
                    'Transfer & Pembayaran (PPOB, PLN, PDAM, dll)',
                    'Setoran Simpanan Wajib',
                    'Setor Zakat, Infaq, Sedekah',
                    'Jadwal Shalat & Baca Qur\'an Digital',
                ],
            },
            en: {
                title: sections.fitur?.en?.title || 'Features & Services of M-Tamzis',
                description: sections.fitur?.en?.description || 'M-Tamzis provides various features and services to meet your digital financial transaction needs:',
                items: sections.fitur?.en?.items || [
                    'Check Balance & Transaction History',
                    'Transfer & Payments (PPOB, PLN, PDAM, etc.)',
                    'Mandatory Savings Deposit',
                    'Zakat, Infaq, Sadaqah Donation',
                    'Prayer Schedule & Digital Qur\'an',
                ],
            },
        },
        panduan: {
            id: {
                title: sections.panduan?.id?.title || 'Panduan & Download',
                download_title: sections.panduan?.id?.download_title || 'Download M-Tamzis Sekarang',
                download_description: sections.panduan?.id?.download_description || 'Dapatkan akses ke semua fitur dan layanan digital TAMZIS dengan mengunduh aplikasi dari Play Store.',
                download_play_store: sections.panduan?.id?.download_play_store || 'Download di Google Play',
                panduan_user_title: sections.panduan?.id?.panduan_user_title || 'Panduan Pengguna',
                panduan_steps: sections.panduan?.id?.panduan_steps || [
                    { title: 'Registrasi Akun', desc: 'Buka aplikasi dan pilih menu Registrasi. Isi data diri sesuai dengan data yang terdaftar di TAMZIS.' },
                    { title: 'Aktivasi Akun Pertama Kali', desc: 'Verifikasi nomor HP Anda dengan OTP yang telah dikirimkan. Buat PIN keamanan yang kuat.' },
                    { title: 'Tips Keamanan Bertransaksi', desc: 'Jangan bagikan PIN, password, dan OTP kepada siapa pun. Gunakan WiFi yang aman saat bertransaksi.' },
                ],
            },
            en: {
                title: sections.panduan?.en?.title || 'Guide & Download',
                download_title: sections.panduan?.en?.download_title || 'Download M-Tamzis Now',
                download_description: sections.panduan?.en?.download_description || 'Get access to all TAMZIS digital features and services by downloading the app from Play Store.',
                download_play_store: sections.panduan?.en?.download_play_store || 'Download on Google Play',
                panduan_user_title: sections.panduan?.en?.panduan_user_title || 'User Guide',
                panduan_steps: sections.panduan?.en?.panduan_steps || [
                    { title: 'Account Registration', desc: 'Open the app and select the Registration menu. Fill in your personal data as registered with TAMZIS.' },
                    { title: 'First Time Account Activation', desc: 'Verify your phone number with the OTP sent to you. Create a strong security PIN.' },
                    { title: 'Transaction Security Tips', desc: 'Do not share your PIN, password, and OTP with anyone. Use a secure WiFi connection when transacting.' },
                ],
            },
        },
        bantuan: {
            id: {
                title: sections.bantuan?.id?.title || 'Bantuan & Contact Center',
                hubungi_title: sections.bantuan?.id?.hubungi_title || 'Hubungi Tim Kami',
                hubungi_desc: sections.bantuan?.id?.hubungi_desc || 'Jika Anda memiliki pertanyaan atau mengalami kendala, tim customer service kami siap membantu Anda.',
                hubungi_btn: sections.bantuan?.id?.hubungi_btn || 'Hubungi: 0286 325303',
                download_mtamzis_title: sections.bantuan?.id?.download_mtamzis_title || 'Download M-Tamzis',
                download_mtamzis_desc: sections.bantuan?.id?.download_mtamzis_desc || 'Dapatkan aplikasi M-Tamzis melalui tautan berikut:',
                open_play_store: sections.bantuan?.id?.open_play_store || 'Buka di Google Play Store',
                faq_title: sections.bantuan?.id?.faq_title || 'Pertanyaan Umum',
                faqs: sections.bantuan?.id?.faqs || [
                    { q: 'Apakah M-Tamzis gratis?', a: 'Ya, M-Tamzis dapat diunduh dan digunakan secara gratis untuk semua anggota TAMZIS.' },
                    { q: 'Sistem operasi apa yang didukung?', a: 'M-Tamzis tersedia untuk Android. Versi iOS sedang dalam tahap pengembangan.' },
                    { q: 'Bagaimana jika lupa PIN?', a: 'Hubungi customer service kami di 0286 325303 untuk membantu reset PIN Anda dengan aman.' },
                ],
            },
            en: {
                title: sections.bantuan?.en?.title || 'Help & Contact Center',
                hubungi_title: sections.bantuan?.en?.hubungi_title || 'Contact Our Team',
                hubungi_desc: sections.bantuan?.en?.hubungi_desc || 'If you have questions or experience issues, our customer service team is ready to assist you.',
                hubungi_btn: sections.bantuan?.en?.hubungi_btn || 'Call: 0286 325303',
                download_mtamzis_title: sections.bantuan?.en?.download_mtamzis_title || 'Download M-Tamzis',
                download_mtamzis_desc: sections.bantuan?.en?.download_mtamzis_desc || 'Get the M-Tamzis app through the following link:',
                open_play_store: sections.bantuan?.en?.open_play_store || 'Open on Google Play Store',
                faq_title: sections.bantuan?.en?.faq_title || 'Frequently Asked Questions',
                faqs: sections.bantuan?.en?.faqs || [
                    { q: 'Is M-Tamzis free?', a: 'Yes, M-Tamzis can be downloaded and used for free by all TAMZIS members.' },
                    { q: 'What operating systems are supported?', a: 'M-Tamzis is available for Android. The iOS version is currently in development.' },
                    { q: 'What if I forget my PIN?', a: 'Contact our customer service at 0286 325303 for a secure PIN reset.' },
                ],
            },
        },
    });

    const [activeTab, setActiveTab] = useState<'id' | 'en'>('id');
    const [activeSection, setActiveSection] = useState('header');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = () => {
        const toastId = toast.loading('Menyimpan perubahan...');

        put('/dashboard/pages/content/layanan-digital', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Konten Layanan Digital berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal memperbarui konten Layanan Digital.', { id: toastId });
            },
        });
    };

    const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('locale', activeTab);

        router.post('/dashboard/pages/content/layanan-digital/upload-background', formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Gambar background berhasil diupload!');
                setUploading(false);
            },
            onError: () => {
                toast.error('Gagal mengupload gambar background.');
                setUploading(false);
            },
        });
    };

    const updateField = (section: string, locale: string, field: string, value: unknown) => {
        setData((prev) => {
            const prevData = prev as Record<string, Record<string, Record<string, unknown>>>;

            return {
                ...prev,
                [section]: {
                    ...prevData[section],
                    [locale]: {
                        ...prevData[section][locale],
                        [field]: value,
                    },
                },
            };
        });
    };

    const updateArrayItem = (section: string, locale: string, field: string, index: number, value: unknown) => {
        setData((prev) => {
            const prevData = prev as Record<string, Record<string, Record<string, unknown[]>>>;
            const newArray = [...prevData[section][locale][field]];
            newArray[index] = value;

            return {
                ...prev,
                [section]: {
                    ...prevData[section],
                    [locale]: {
                        ...prevData[section][locale],
                        [field]: newArray,
                    },
                },
            };
        });
    };

    const addArrayItem = (section: string, locale: string, field: string, defaultValue: unknown) => {
        setData((prev) => {
            const prevData = prev as Record<string, Record<string, Record<string, unknown[]>>>;

            return {
                ...prev,
                [section]: {
                    ...prevData[section],
                    [locale]: {
                        ...prevData[section][locale],
                        [field]: [...(prevData[section][locale][field] || []), defaultValue],
                    },
                },
            };
        });
    };

    const removeArrayItem = (section: string, locale: string, field: string, index: number) => {
        setData((prev) => {
            const prevData = prev as Record<string, Record<string, Record<string, unknown[]>>>;

            return {
                ...prev,
                [section]: {
                    ...prevData[section],
                    [locale]: {
                        ...prevData[section][locale],
                        [field]: prevData[section][locale][field].filter((_: unknown, i: number) => i !== index),
                    },
                },
            };
        });
    };

    const sections_list = [
        { id: 'header', label: 'Header' },
        { id: 'tentang', label: 'Tentang' },
        { id: 'fitur', label: 'Fitur' },
        { id: 'panduan', label: 'Panduan' },
        { id: 'bantuan', label: 'Bantuan' },
    ];

    return (
        <>
            <Head title="Edit Layanan Digital" />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/content">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Konten Layanan Digital</h1>
                        <p className="text-sm text-muted-foreground">
                            Ubah konten halaman Layanan Digital (M-TAMZIS) secara visual.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-6"
                >
                    {/* Language Tabs */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('id')}
                            className={`rounded-lg px-4 py-2 font-medium transition-all ${
                                activeTab === 'id'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            Indonesia
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('en')}
                            className={`rounded-lg px-4 py-2 font-medium transition-all ${
                                activeTab === 'en'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            English
                        </button>
                    </div>

                    {/* Section Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {sections_list.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                onClick={() => setActiveSection(section.id)}
                                className={`rounded-lg px-4 py-2 font-medium transition-all ${
                                    activeSection === section.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>

                    {/* Header Section */}
                    {activeSection === 'header' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Header Hero Section</CardTitle>
                                <CardDescription>
                                    Edit badge, title, subtitle, dan background image hero section.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Badge</Label>
                                    <Input
                                        value={data.header[activeTab]?.badge || ''}
                                        onChange={(e) => updateField('header', activeTab, 'badge', e.target.value)}
                                        placeholder="Contoh: Layanan Digital"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={data.header[activeTab]?.title || ''}
                                        onChange={(e) => updateField('header', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: M-TAMZIS"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <RichTextEditor
                                        value={data.header[activeTab]?.subtitle || ''}
                                        onChange={(value) => updateField('header', activeTab, 'subtitle', value)}
                                        placeholder="Contoh: Aplikasi Mobile untuk Pengelolaan Keuangan Syariah"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Background Image</Label>
                                    <div className="flex items-center gap-4">
                                        {data.header[activeTab]?.background_image && (
                                            <div className="relative h-20 w-32 overflow-hidden rounded-lg border">
                                                <img
                                                    src={data.header[activeTab]?.background_image}
                                                    alt="Background"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleBackgroundImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={uploading}
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                {uploading ? 'Mengupload...' : 'Upload Gambar'}
                                            </Button>
                                        </div>
                                    </div>
                                    <Input
                                        value={data.header[activeTab]?.background_image || ''}
                                        onChange={(e) => updateField('header', activeTab, 'background_image', e.target.value)}
                                        placeholder="Atau masukkan URL gambar"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Tentang Section */}
                    {activeSection === 'tentang' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Tentang</CardTitle>
                                <CardDescription>
                                    Edit konten bagian "Tentang M-Tamzis".
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.tentang[activeTab]?.title || ''}
                                        onChange={(e) => updateField('tentang', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Tentang M-Tamzis"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <RichTextEditor
                                        value={data.tentang[activeTab]?.description || ''}
                                        onChange={(value) => updateField('tentang', activeTab, 'description', value)}
                                        placeholder="Deskripsi tentang M-Tamzis"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Fitur Section */}
                    {activeSection === 'fitur' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Fitur</CardTitle>
                                <CardDescription>
                                    Edit konten bagian "Fitur & Layanan".
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.fitur[activeTab]?.title || ''}
                                        onChange={(e) => updateField('fitur', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Fitur & Layanan M-Tamzis"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <RichTextEditor
                                        value={data.fitur[activeTab]?.description || ''}
                                        onChange={(value) => updateField('fitur', activeTab, 'description', value)}
                                        placeholder="Deskripsi fitur"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Daftar Fitur</Label>
                                    {data.fitur[activeTab]?.items?.map((item: string, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={item}
                                                onChange={(e) => updateArrayItem('fitur', activeTab, 'items', index, e.target.value)}
                                                placeholder={`Fitur ${index + 1}`}
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeArrayItem('fitur', activeTab, 'items', index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addArrayItem('fitur', activeTab, 'items', '')}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Fitur
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Panduan Section */}
                    {activeSection === 'panduan' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Panduan</CardTitle>
                                <CardDescription>
                                    Edit konten bagian "Panduan & Download".
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul Section</Label>
                                    <Input
                                        value={data.panduan[activeTab]?.title || ''}
                                        onChange={(e) => updateField('panduan', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Panduan & Download"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Judul Download</Label>
                                    <Input
                                        value={data.panduan[activeTab]?.download_title || ''}
                                        onChange={(e) => updateField('panduan', activeTab, 'download_title', e.target.value)}
                                        placeholder="Contoh: Download M-Tamzis Sekarang"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi Download</Label>
                                    <RichTextEditor
                                        value={data.panduan[activeTab]?.download_description || ''}
                                        onChange={(value) => updateField('panduan', activeTab, 'download_description', value)}
                                        placeholder="Deskripsi download"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Teks Tombol Play Store</Label>
                                    <Input
                                        value={data.panduan[activeTab]?.download_play_store || ''}
                                        onChange={(e) => updateField('panduan', activeTab, 'download_play_store', e.target.value)}
                                        placeholder="Contoh: Download di Google Play"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Judul Panduan User</Label>
                                    <Input
                                        value={data.panduan[activeTab]?.panduan_user_title || ''}
                                        onChange={(e) => updateField('panduan', activeTab, 'panduan_user_title', e.target.value)}
                                        placeholder="Contoh: Panduan Pengguna"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Langkah-langkah Panduan</Label>
                                    {data.panduan[activeTab]?.panduan_steps?.map((step: { title: string; desc: string }, index: number) => (
                                        <div key={index} className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Langkah {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeArrayItem('panduan', activeTab, 'panduan_steps', index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={step.title}
                                                onChange={(e) => {
                                                    const newSteps = [...(data.panduan[activeTab]?.panduan_steps || [])];
                                                    newSteps[index] = { ...newSteps[index], title: e.target.value };
                                                    updateField('panduan', activeTab, 'panduan_steps', newSteps);
                                                }}
                                                placeholder="Judul langkah"
                                            />
                                            <RichTextEditor
                                                value={step.desc}
                                                onChange={(newDesc) => {
                                                    const newSteps = [...(data.panduan[activeTab]?.panduan_steps || [])];
                                                    newSteps[index] = { ...newSteps[index], desc: newDesc };
                                                    updateField('panduan', activeTab, 'panduan_steps', newSteps);
                                                }}
                                                placeholder="Deskripsi langkah"
                                                className="overflow-hidden rounded-xl border border-slate-200"
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addArrayItem('panduan', activeTab, 'panduan_steps', { title: '', desc: '' })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Langkah
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bantuan Section */}
                    {activeSection === 'bantuan' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Bantuan</CardTitle>
                                <CardDescription>
                                    Edit konten bagian "Bantuan & Contact Center".
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul Section</Label>
                                    <Input
                                        value={data.bantuan[activeTab]?.title || ''}
                                        onChange={(e) => updateField('bantuan', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Bantuan & Contact Center"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Judul Hubungi</Label>
                                    <Input
                                        value={data.bantuan[activeTab]?.hubungi_title || ''}
                                        onChange={(e) => updateField('bantuan', activeTab, 'hubungi_title', e.target.value)}
                                        placeholder="Contoh: Hubungi Tim Kami"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi Hubungi</Label>
                                    <RichTextEditor
                                        value={data.bantuan[activeTab]?.hubungi_desc || ''}
                                        onChange={(value) => updateField('bantuan', activeTab, 'hubungi_desc', value)}
                                        placeholder="Deskripsi hubungi"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Teks Tombol Hubungi</Label>
                                    <Input
                                        value={data.bantuan[activeTab]?.hubungi_btn || ''}
                                        onChange={(e) => updateField('bantuan', activeTab, 'hubungi_btn', e.target.value)}
                                        placeholder="Contoh: Hubungi: 0286 325303"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Judul Download M-Tamzis</Label>
                                    <Input
                                        value={data.bantuan[activeTab]?.download_mtamzis_title || ''}
                                        onChange={(e) => updateField('bantuan', activeTab, 'download_mtamzis_title', e.target.value)}
                                        placeholder="Contoh: Download M-Tamzis"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi Download M-Tamzis</Label>
                                    <RichTextEditor
                                        value={data.bantuan[activeTab]?.download_mtamzis_desc || ''}
                                        onChange={(value) => updateField('bantuan', activeTab, 'download_mtamzis_desc', value)}
                                        placeholder="Deskripsi download M-Tamzis"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Teks Tombol Play Store</Label>
                                    <Input
                                        value={data.bantuan[activeTab]?.open_play_store || ''}
                                        onChange={(e) => updateField('bantuan', activeTab, 'open_play_store', e.target.value)}
                                        placeholder="Contoh: Buka di Google Play Store"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Judul FAQ</Label>
                                    <Input
                                        value={data.bantuan[activeTab]?.faq_title || ''}
                                        onChange={(e) => updateField('bantuan', activeTab, 'faq_title', e.target.value)}
                                        placeholder="Contoh: Pertanyaan Umum"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>FAQ (Pertanyaan & Jawaban)</Label>
                                    {data.bantuan[activeTab]?.faqs?.map((faq: { q: string; a: string }, index: number) => (
                                        <div key={index} className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>FAQ {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeArrayItem('bantuan', activeTab, 'faqs', index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={faq.q}
                                                onChange={(e) => {
                                                    const newFaqs = [...(data.bantuan[activeTab]?.faqs || [])];
                                                    newFaqs[index] = { ...newFaqs[index], q: e.target.value };
                                                    updateField('bantuan', activeTab, 'faqs', newFaqs);
                                                }}
                                                placeholder="Pertanyaan"
                                            />
                                            <RichTextEditor
                                                value={faq.a}
                                                onChange={(newAnswer) => {
                                                    const newFaqs = [...(data.bantuan[activeTab]?.faqs || [])];
                                                    newFaqs[index] = { ...newFaqs[index], a: newAnswer };
                                                    updateField('bantuan', activeTab, 'faqs', newFaqs);
                                                }}
                                                placeholder="Jawaban"
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addArrayItem('bantuan', activeTab, 'faqs', { q: '', a: '' })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah FAQ
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
