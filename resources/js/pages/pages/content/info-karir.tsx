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
    informasi?: SectionData;
    hrd?: SectionData;
    lowongan?: SectionData;
    contact?: SectionData;
    sidebar?: SectionData;
    [key: string]: SectionData | undefined;
};

export default function InfoKarirEdit({ sections }: { sections: Sections }) {
    const { data, setData, put, processing } = useForm({
        header: {
            id: {
                title: sections.header?.id?.title || 'Portal Karir - TAMZIS',
                subtitle: sections.header?.id?.subtitle || 'Gerbang Masa Depan',
                background_image: sections.header?.id?.background_image || '/assets/img/header/karir.jpg',
            },
            en: {
                title: sections.header?.en?.title || 'Career Portal - TAMZIS',
                subtitle: sections.header?.en?.subtitle || 'Gateway to Future',
                background_image: sections.header?.en?.background_image || '/assets/img/header/karir.jpg',
            },
        },
        informasi: {
            id: {
                title: sections.informasi?.id?.title || 'Bertumbuh Bersama Nilai, Berkarya untuk Memberi Manfaat',
                description: sections.informasi?.id?.description || 'Di TAMZIS, kami percaya bahwa keberhasilan organisasi lahir dari insan-insan yang terus bertumbuh.',
                button_text: sections.informasi?.id?.button_text || 'Lihat Lowongan',
                values: sections.informasi?.id?.values || [
                    { title: 'Integritas', desc: 'Menjunjung tinggi kejujuran dan etika kerja Islami.' },
                    { title: 'Profesional', desc: 'Memberikan layanan terbaik dengan kompetensi tinggi.' },
                    { title: 'Inovatif', desc: 'Terus berkembang mengikuti kemajuan teknologi.' },
                ],
            },
            en: {
                title: sections.informasi?.en?.title || 'Building the Future with TAMZIS',
                description: sections.informasi?.en?.description || 'Join the KSPPS Tamzis Bina Utama big family.',
                button_text: sections.informasi?.en?.button_text || 'View Vacancies',
                values: sections.informasi?.en?.values || [
                    { title: 'Integrity', desc: 'Upholding honesty and Islamic work ethics.' },
                    { title: 'Professional', desc: 'Providing the best service with high competence.' },
                    { title: 'Innovative', desc: 'Continuously developing following technological progress.' },
                ],
            },
        },
        hrd: {
            id: {
                title: sections.hrd?.id?.title || 'Kegiatan HRD & Pengembangan',
                description: sections.hrd?.id?.description || 'TAMZIS berkomitmen untuk terus meningkatkan kapasitas.',
                programs: sections.hrd?.id?.programs || [
                    { title: 'Pelatihan Basic Syariah', desc: 'Pembekalan dasar-dasar ekonomi syariah.' },
                    { title: 'Leadership Development', desc: 'Program pengembangan kepemimpinan.' },
                    { title: 'Service Excellence', desc: 'Pelatihan rutin untuk menjaga standar pelayanan.' },
                ],
            },
            en: {
                title: sections.hrd?.en?.title || 'HRD & Development Activities',
                description: sections.hrd?.en?.description || 'TAMZIS is committed to continuously improving.',
                programs: sections.hrd?.en?.programs || [
                    { title: 'Basic Sharia Training', desc: 'Equipping new employees with the basics.' },
                    { title: 'Leadership Development', desc: 'Leadership development program.' },
                    { title: 'Service Excellence', desc: 'Routine training to maintain excellent service.' },
                ],
            },
        },
        lowongan: {
            id: {
                title: sections.lowongan?.id?.title || 'Lowongan Aktif',
                description: sections.lowongan?.id?.description || 'Temukan peluang karir terbaik Anda.',
                empty_text: sections.lowongan?.id?.empty_text || 'Belum ada lowongan yang tersedia saat ini.',
                apply_button: sections.lowongan?.id?.apply_button || 'Lamar Sekarang',
            },
            en: {
                title: sections.lowongan?.en?.title || 'Active Vacancies',
                description: sections.lowongan?.en?.description || 'Find your best career opportunity.',
                empty_text: sections.lowongan?.en?.empty_text || 'No vacancies available at the moment.',
                apply_button: sections.lowongan?.en?.apply_button || 'Apply Now',
            },
        },
        contact: {
            id: {
                title: sections.contact?.id?.title || 'Contact Center',
                description: sections.contact?.id?.description || 'Punya pertanyaan tentang karir?',
                email: sections.contact?.id?.email || 'info@tamzis.id',
                phone: sections.contact?.id?.phone || '0811-261-3134',
                whatsapp: sections.contact?.id?.whatsapp || '0811 2700 9068',
                whatsapp_label: sections.contact?.id?.whatsapp_label || 'Wa CS HRD',
                office_label: sections.contact?.id?.office_label || 'Kantor Terdekat',
            },
            en: {
                title: sections.contact?.en?.title || 'Contact Center',
                description: sections.contact?.en?.description || 'Have questions about careers?',
                email: sections.contact?.en?.email || 'info@tamzis.id',
                phone: sections.contact?.en?.phone || '0811-261-3134',
                whatsapp: sections.contact?.en?.whatsapp || '0811 2700 9068',
                whatsapp_label: sections.contact?.en?.whatsapp_label || 'Wa CS HRD',
                office_label: sections.contact?.en?.office_label || 'Nearest Office',
            },
        },
        sidebar: {
            id: {
                header: sections.sidebar?.id?.header || 'Menu Karir',
                items: sections.sidebar?.id?.items || [
                    { id: 'Informasi', label: 'Informasi Karir' },
                    { id: 'HRD', label: 'Kegiatan SDI' },
                    { id: 'Contact', label: 'Hubungi Kami' },
                ],
            },
            en: {
                header: sections.sidebar?.en?.header || 'Career Menu',
                items: sections.sidebar?.en?.items || [
                    { id: 'Informasi', label: 'Career Information' },
                    { id: 'HRD', label: 'HRD Activities' },
                    { id: 'Contact', label: 'Contact Center' },
                ],
            },
        },
    });

    const [activeTab, setActiveTab] = useState<'id' | 'en'>('id');
    const [activeSection, setActiveSection] = useState('header');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const programFileInputRef = useRef<HTMLInputElement>(null);
    const [programUploadIndex, setProgramUploadIndex] = useState<number | null>(null);

    const handleSubmit = () => {
        const toastId = toast.loading('Menyimpan perubahan...');

        put('/dashboard/pages/content/info-karir', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Konten Info Karir berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal memperbarui konten Info Karir.', { id: toastId });
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

        router.post('/dashboard/pages/content/info-karir/upload-background', formData, {
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

    const handleProgramImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const index = programUploadIndex;

        e.target.value = '';

        if (!file || index === null) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('locale', activeTab);
        formData.append('index', String(index));

        router.post('/dashboard/pages/content/info-karir/upload-program-image', formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                const freshSections = (page.props as { sections?: Sections }).sections;
                const newPath = freshSections?.hrd?.[activeTab]?.programs?.[index]?.image;

                if (newPath) {
                    const newPrograms = [...(data.hrd[activeTab]?.programs || [])];
                    newPrograms[index] = { ...newPrograms[index], image: newPath };
                    updateField('hrd', activeTab, 'programs', newPrograms);
                }

                toast.success('Foto kegiatan berhasil diupload!');
                setProgramUploadIndex(null);
            },
            onError: () => {
                toast.error('Gagal mengupload foto kegiatan.');
                setProgramUploadIndex(null);
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
        { id: 'informasi', label: 'Informasi' },
        { id: 'hrd', label: 'HRD' },
        { id: 'lowongan', label: 'Lowongan' },
        { id: 'contact', label: 'Kontak' },
        { id: 'sidebar', label: 'Sidebar' },
    ];

    return (
        <>
            <Head title="Edit Info Karir" />

            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/pages/content">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Konten Info Karir</h1>
                        <p className="text-sm text-muted-foreground">
                            Ubah konten halaman Info Karir secara visual.
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
                                    Edit title, subtitle, dan background image hero section.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={data.header[activeTab]?.title || ''}
                                        onChange={(e) => updateField('header', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Portal Karir - TAMZIS"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <Input
                                        value={data.header[activeTab]?.subtitle || ''}
                                        onChange={(e) => updateField('header', activeTab, 'subtitle', e.target.value)}
                                        placeholder="Contoh: Gerbang Masa Depan"
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

                    {/* Informasi Section */}
                    {activeSection === 'informasi' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Informasi Karir</CardTitle>
                                <CardDescription>
                                    Edit konten bagian informasi karir.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.informasi[activeTab]?.title || ''}
                                        onChange={(e) => updateField('informasi', activeTab, 'title', e.target.value)}
                                        placeholder="Judul informasi karir"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <RichTextEditor
                                        value={data.informasi[activeTab]?.description || ''}
                                        onChange={(value) => updateField('informasi', activeTab, 'description', value)}
                                        placeholder="Deskripsi informasi karir"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Teks Tombol</Label>
                                    <Input
                                        value={data.informasi[activeTab]?.button_text || ''}
                                        onChange={(e) => updateField('informasi', activeTab, 'button_text', e.target.value)}
                                        placeholder="Contoh: Lihat Lowongan"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Nilai-nilai Perusahaan</Label>
                                    {data.informasi[activeTab]?.values?.map((value: { title: string; desc: string }, index: number) => (
                                        <div key={index} className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Nilai {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeArrayItem('informasi', activeTab, 'values', index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={value.title}
                                                onChange={(e) => {
                                                    const newValues = [...(data.informasi[activeTab]?.values || [])];
                                                    newValues[index] = { ...newValues[index], title: e.target.value };
                                                    updateField('informasi', activeTab, 'values', newValues);
                                                }}
                                                placeholder="Judul nilai"
                                            />
                                            <RichTextEditor
                                                value={value.desc}
                                                onChange={(newDesc) => {
                                                    const newValues = [...(data.informasi[activeTab]?.values || [])];
                                                    newValues[index] = { ...newValues[index], desc: newDesc };
                                                    updateField('informasi', activeTab, 'values', newValues);
                                                }}
                                                placeholder="Deskripsi nilai"
                                                className="overflow-hidden rounded-xl border border-slate-200"
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addArrayItem('informasi', activeTab, 'values', { title: '', desc: '' })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Nilai
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* HRD Section */}
                    {activeSection === 'hrd' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Kegiatan HRD</CardTitle>
                                <CardDescription>
                                    Edit konten bagian kegiatan HRD & pengembangan.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.hrd[activeTab]?.title || ''}
                                        onChange={(e) => updateField('hrd', activeTab, 'title', e.target.value)}
                                        placeholder="Judul kegiatan HRD"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <RichTextEditor
                                        value={data.hrd[activeTab]?.description || ''}
                                        onChange={(value) => updateField('hrd', activeTab, 'description', value)}
                                        placeholder="Deskripsi kegiatan HRD"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Program Pelatihan / Kegiatan</Label>
                                    <input
                                        type="file"
                                        ref={programFileInputRef}
                                        onChange={handleProgramImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    {data.hrd[activeTab]?.programs?.map((program: { title: string; desc: string; image?: string }, index: number) => (
                                        <div key={index} className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Program {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeArrayItem('hrd', activeTab, 'programs', index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={program.title}
                                                onChange={(e) => {
                                                    const newPrograms = [...(data.hrd[activeTab]?.programs || [])];
                                                    newPrograms[index] = { ...newPrograms[index], title: e.target.value };
                                                    updateField('hrd', activeTab, 'programs', newPrograms);
                                                }}
                                                placeholder="Judul program"
                                            />
                                            <RichTextEditor
                                                value={program.desc}
                                                onChange={(newDesc) => {
                                                    const newPrograms = [...(data.hrd[activeTab]?.programs || [])];
                                                    newPrograms[index] = { ...newPrograms[index], desc: newDesc };
                                                    updateField('hrd', activeTab, 'programs', newPrograms);
                                                }}
                                                placeholder="Deskripsi program"
                                                className="overflow-hidden rounded-xl border border-slate-200"
                                            />
                                            <div className="space-y-2">
                                                <Label className="text-sm text-muted-foreground">Foto Kegiatan</Label>
                                                <div className="flex items-center gap-4">
                                                    {program.image && (
                                                        <div className="relative h-20 w-32 overflow-hidden rounded-lg border">
                                                            <img
                                                                src={program.image.startsWith('http') || program.image.startsWith('/') ? program.image : `/${program.image}`}
                                                                alt={`Foto program ${index + 1}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={programUploadIndex !== null}
                                                        onClick={() => {
                                                            setProgramUploadIndex(index);
                                                            programFileInputRef.current?.click();
                                                        }}
                                                    >
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        {programUploadIndex === index ? 'Mengupload...' : program.image ? 'Ganti Foto' : 'Upload Foto'}
                                                    </Button>
                                                    {program.image && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-destructive"
                                                            onClick={() => {
                                                                const newPrograms = [...(data.hrd[activeTab]?.programs || [])];
                                                                newPrograms[index] = { ...newPrograms[index], image: '' };
                                                                updateField('hrd', activeTab, 'programs', newPrograms);
                                                            }}
                                                        >
                                                            Hapus Foto
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addArrayItem('hrd', activeTab, 'programs', { title: '', desc: '', image: '' })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Program
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Lowongan Section */}
                    {activeSection === 'lowongan' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Lowongan</CardTitle>
                                <CardDescription>
                                    Edit konten bagian lowongan kerja.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.lowongan[activeTab]?.title || ''}
                                        onChange={(e) => updateField('lowongan', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Lowongan Aktif"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <RichTextEditor
                                        value={data.lowongan[activeTab]?.description || ''}
                                        onChange={(value) => updateField('lowongan', activeTab, 'description', value)}
                                        placeholder="Deskripsi lowongan"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Teks Kosong</Label>
                                    <Input
                                        value={data.lowongan[activeTab]?.empty_text || ''}
                                        onChange={(e) => updateField('lowongan', activeTab, 'empty_text', e.target.value)}
                                        placeholder="Teks saat tidak ada lowongan"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Teks Tombol Lamar</Label>
                                    <Input
                                        value={data.lowongan[activeTab]?.apply_button || ''}
                                        onChange={(e) => updateField('lowongan', activeTab, 'apply_button', e.target.value)}
                                        placeholder="Contoh: Lamar Sekarang"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact Section */}
                    {activeSection === 'contact' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Kontak</CardTitle>
                                <CardDescription>
                                    Edit konten bagian kontak.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Judul</Label>
                                    <Input
                                        value={data.contact[activeTab]?.title || ''}
                                        onChange={(e) => updateField('contact', activeTab, 'title', e.target.value)}
                                        placeholder="Contoh: Contact Center"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <RichTextEditor
                                        value={data.contact[activeTab]?.description || ''}
                                        onChange={(value) => updateField('contact', activeTab, 'description', value)}
                                        placeholder="Deskripsi kontak"
                                        className="overflow-hidden rounded-xl border border-slate-200"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            value={data.contact[activeTab]?.email || ''}
                                            onChange={(e) => updateField('contact', activeTab, 'email', e.target.value)}
                                            placeholder="info@tamzis.id"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Telepon</Label>
                                        <Input
                                            value={data.contact[activeTab]?.phone || ''}
                                            onChange={(e) => updateField('contact', activeTab, 'phone', e.target.value)}
                                            placeholder="0811-261-3134"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>WhatsApp</Label>
                                        <Input
                                            value={data.contact[activeTab]?.whatsapp || ''}
                                            onChange={(e) => updateField('contact', activeTab, 'whatsapp', e.target.value)}
                                            placeholder="0811 2700 9068"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Label WhatsApp</Label>
                                        <Input
                                            value={data.contact[activeTab]?.whatsapp_label || ''}
                                            onChange={(e) => updateField('contact', activeTab, 'whatsapp_label', e.target.value)}
                                            placeholder="Wa CS HRD"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Label Kantor</Label>
                                        <Input
                                            value={data.contact[activeTab]?.office_label || ''}
                                            onChange={(e) => updateField('contact', activeTab, 'office_label', e.target.value)}
                                            placeholder="Kantor Terdekat"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Sidebar Section */}
                    {activeSection === 'sidebar' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Sidebar</CardTitle>
                                <CardDescription>
                                    Edit konten sidebar menu.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Header Sidebar</Label>
                                    <Input
                                        value={data.sidebar[activeTab]?.header || ''}
                                        onChange={(e) => updateField('sidebar', activeTab, 'header', e.target.value)}
                                        placeholder="Contoh: Menu Karir"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Menu Items</Label>
                                    {data.sidebar[activeTab]?.items?.map((item: { id: string; label: string }, index: number) => (
                                        <div key={index} className="space-y-2 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Menu {index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeArrayItem('sidebar', activeTab, 'items', index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={item.id}
                                                onChange={(e) => {
                                                    const newItems = [...(data.sidebar[activeTab]?.items || [])];
                                                    newItems[index] = { ...newItems[index], id: e.target.value };
                                                    updateField('sidebar', activeTab, 'items', newItems);
                                                }}
                                                placeholder="ID menu (contoh: Informasi)"
                                            />
                                            <Input
                                                value={item.label}
                                                onChange={(e) => {
                                                    const newItems = [...(data.sidebar[activeTab]?.items || [])];
                                                    newItems[index] = { ...newItems[index], label: e.target.value };
                                                    updateField('sidebar', activeTab, 'items', newItems);
                                                }}
                                                placeholder="Label menu (contoh: Informasi Karir)"
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addArrayItem('sidebar', activeTab, 'items', { id: '', label: '' })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Menu
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
