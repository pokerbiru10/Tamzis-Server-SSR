import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    BarChart3,
    ChevronDown,
    Eye,
    EyeOff,
    HandHeart,
    HelpCircle,
    ImageUp,
    Newspaper,
    ShieldCheck,
    ShoppingBag,
    Upload,
    Wallet,
} from 'lucide-react';
import { useRef, useState } from 'react';
import type { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { CollapsibleBox, SectionCard } from '@/components/dashboard-collapsible';
import { TamzisBaitulMaal  } from '@/components/marketing/tamzis-baitul-maal';
import type {BaitulMaalSectionData} from '@/components/marketing/tamzis-baitul-maal';
import { TamzisFeaturedProducts  } from '@/components/marketing/tamzis-featured-products';
import type {FeaturedSectionData} from '@/components/marketing/tamzis-featured-products';

// Default featured products data for image fallbacks
const tamzisFeaturedDefaults = {
    categories: [
        {
            id: 'savings',
            name: 'Simpanan',
            products: [
                { title: 'Simpanan Mutiara', href: '/simpanan-mutiara', desc: 'Simpanan harian wadiah.', tag: 'Simpanan', imageUrl: '/assets/img/produk-unggulan/simpanan-mutiara.webp' },
                { title: 'Simpanan Pendidikan', href: '/simpanan-pendidikan', desc: 'Simpanan terencana pendidikan.', tag: 'Simpanan', imageUrl: '/assets/img/produk-unggulan/simpanan-pendidikan-poster.webp' },
                { title: 'Simpanan Ijabah', href: '/simpanan-ijabah', desc: 'Simpanan impian masa depan.', tag: 'Investasi', imageUrl: '/assets/img/produk-unggulan/simpanan-ijabah.webp' },
                { title: 'Simpanan Mudharabah', href: '/simulasi-mudharabah', desc: 'Simpanan bagi hasil syariah.', tag: 'Simpanan', imageUrl: '/assets/img/produk-unggulan/simpanan-mudharabah.webp' },
            ],
        },
        {
            id: 'financing',
            name: 'Pembiayaan',
            products: [
                { title: 'Modal Usaha', href: '/ikhtiar-utama', desc: 'Pendanaan modal kerja produktif.', tag: 'Pembiayaan', imageUrl: '/images/modal.webp' },
                { title: 'Griya Tumbuh Bahagia', href: '/rumah-tumbuh-bahagia', desc: 'Pembiayaan kepemilikan rumah syariah.', tag: 'GTB', imageUrl: '/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp' },
                { title: 'Murabahah', href: '/murabahah', desc: 'Pembiayaan jual beli syariah.', tag: 'Pembiayaan', imageUrl: '/assets/img/produk-unggulan/murabahah.webp' },
                { title: 'Kafalah', href: '/kafalah', desc: 'Jaminan pembiayaan yang amanah.', tag: 'Pembiayaan', imageUrl: '/assets/img/produk-unggulan/kafalah-penjamin.webp' },
            ],
        },
        {
            id: 'digital',
            name: 'M-TAMZIS',
            products: [
                { title: 'Transfer', href: '/layanan-digital', desc: 'Transfer dana antar anggota.', tag: 'Transfer', imageUrl: '/assets/img/produk-unggulan/m-tamzis-transfer.webp' },
                { title: 'Saldo Real-time', href: '/layanan-digital', desc: 'Pantau saldo secara real-time.', tag: 'Real-time', imageUrl: '/assets/img/produk-unggulan/m-tamzis-saldo.webp' },
                { title: 'Pulsa & PDAM', href: '/layanan-digital', desc: 'Pembelian pulsa dan tagihan.', tag: 'PPOB', imageUrl: '/assets/img/produk-unggulan/m-tamzis-pulsa-pdam.webp' },
                { title: 'ZIS & Sedekah', href: '/layanan-digital', desc: 'Tunaikan zakat dan sedekah.', tag: 'ZIS', imageUrl: '/assets/img/produk-unggulan/m-tamzis-zis.webp' },
            ],
        },
    ],
};
import { TamzisHighlights  } from '@/components/marketing/tamzis-highlights';
import type {HighlightsSectionData} from '@/components/marketing/tamzis-highlights';
import { TamzisProductChoices  } from '@/components/marketing/tamzis-product-choices';
import type {ChoicesSectionData} from '@/components/marketing/tamzis-product-choices';
import { TamzisStandards  } from '@/components/marketing/tamzis-standards';
import type {StandardsSectionData} from '@/components/marketing/tamzis-standards';
import { TamzisStatsBar } from '@/components/marketing/tamzis-stats-bar';
import { TamzisWhy } from '@/components/marketing/tamzis-why';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSectionIcon, sectionIcons } from '@/lib/section-icons';

type Stat = {
    value: number;
    suffix: string;
    label: string;
};

type Reason = {
    title: string;
    description: string;
    icon?: string;
};

// Ikon bawaan tiap posisi, dipakai saat admin belum memilih ikon sendiri.
const whyDefaultIcons = ['scale', 'mosque', 'check-circle', 'map-pin'];
const standardsDefaultIcons = ['shield', 'zap', 'mouse-pointer', 'star', 'trending-up'];

type WhyContent = {
    title: string;
    description: string;
    reasons: Reason[];
};

type Sections = {
    stats?: { id?: Stat[]; en?: Stat[] };
    why?: { id?: WhyContent; en?: WhyContent; image?: string };
    featured?: { id?: FeaturedSectionData; en?: FeaturedSectionData };
    standards?: { id?: StandardsSectionData; en?: StandardsSectionData };
    choices?: { id?: ChoicesSectionData; en?: ChoicesSectionData };
    baitulmaal?: { id?: BaitulMaalSectionData; en?: BaitulMaalSectionData };
    highlights?: { id?: HighlightsSectionData; en?: HighlightsSectionData };
};

type Locale = 'id' | 'en';

const emptyStats: Stat[] = Array.from({ length: 4 }, () => ({ value: 0, suffix: '+', label: '' }));
const emptyWhy: WhyContent = {
    title: '',
    description: '',
    reasons: Array.from({ length: 4 }, () => ({ title: '', description: '' })),
};
const emptyStandards: StandardsSectionData = {
    title: '',
    subtitle: '',
    items: Array.from({ length: 5 }, () => ({ title: '', desc: '' })),
};
const emptyChoices: ChoicesSectionData = {
    badge: '',
    title: '',
    description: '',
    readMore: '',
    cards: Array.from({ length: 3 }, () => ({ title: '', description: '', href: '', tag: '' })),
};
const emptyBaitulMaal: BaitulMaalSectionData = {
    badge: '',
    title: '',
    description: '',
    showMore: '',
};
const emptyHighlights: HighlightsSectionData = {
    badge: '',
    title: '',
    viewAll: '',
};
const emptyFeatured: FeaturedSectionData = {
    badge: '',
    title: '',
    description: '',
    readMore: '',
    categories: Array.from({ length: 3 }, () => ({
        name: '',
        products: Array.from({ length: 4 }, () => ({ title: '', href: '', desc: '', tag: '' })),
    })),
};

function isValidUrl(href: string, validRoutes: string[]): boolean {
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return true;
    }

    const normalized = href.startsWith('/') ? href : `/${href}`;

    return validRoutes.includes(normalized);
}

function IconPicker({
    value,
    onChange,
}: {
    value: string;
    onChange: (name: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const Current = getSectionIcon(value);

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm hover:bg-slate-50"
            >
                {Current ? (
                    <Current className="h-4 w-4 text-emerald-700" />
                ) : (
                    <span className="text-muted-foreground">Pilih ikon</span>
                )}
                <span className="text-xs text-muted-foreground">{value}</span>
                <ChevronDown
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="grid grid-cols-8 gap-1 rounded-lg border bg-white p-2 shadow-sm sm:grid-cols-10">
                    {Object.entries(sectionIcons).map(([name, Icon]) => (
                        <button
                            key={name}
                            type="button"
                            title={name}
                            onClick={() => {
                                onChange(name);
                                setOpen(false);
                            }}
                            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                                name === value
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function BerandaEdit({ sections, validRoutes }: { sections: Sections; validRoutes: string[] }) {
    const validRoutesList = Array.isArray(validRoutes) ? validRoutes : Object.values(validRoutes);
    const [locale, setLocale] = useState<Locale>('id');
    const [showPreview, setShowPreview] = useState(true);

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageDragOver, setImageDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [featuredImageModalOpen, setFeaturedImageModalOpen] = useState(false);
    const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
    const [featuredImagePreviewUrl, setFeaturedImagePreviewUrl] = useState<string | null>(null);
    const [featuredUploading, setFeaturedUploading] = useState(false);
    const [featuredImageTarget, setFeaturedImageTarget] = useState<{ ci: number; pi: number } | null>(null);
    const [featuredDragOver, setFeaturedDragOver] = useState(false);
    const featuredFileInputRef = useRef<HTMLInputElement | null>(null);

    const openImageModal = () => {
        setImageFile(null);
        setImagePreviewUrl(null);
        setImageModalOpen(true);
    };

    const handleImageSelect = (file: File | null) => {
        setImageFile(file);
        setImagePreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleImageUpload = () => {
        if (!imageFile) {
            toast.error('Pilih gambar terlebih dahulu.');

            return;
        }

        setUploading(true);
        const toastId = toast.loading('Mengunggah gambar...');

        router.post(
            '/dashboard/pages/content/beranda/why-image',
            { image: imageFile },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Gambar berhasil diganti!', { id: toastId });
                    setImageModalOpen(false);
                    setUploading(false);
                },
                onError: (errors) => {
                    toast.error(
                        errors.image ?? 'Gagal mengunggah gambar (maks. 1MB, format JPG/PNG/WebP).',
                        { id: toastId },
                    );
                    setUploading(false);
                },
            },
        );
    };

    const openFeaturedImageModal = (ci: number, pi: number) => {
        setFeaturedImageFile(null);
        setFeaturedImagePreviewUrl(null);
        setFeaturedImageTarget({ ci, pi });
        setFeaturedImageModalOpen(true);
    };

    const handleFeaturedImageSelect = (file: File | null) => {
        setFeaturedImageFile(file);
        setFeaturedImagePreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleFeaturedImageUpload = () => {
        if (!featuredImageFile || !featuredImageTarget) {
            toast.error('Pilih gambar terlebih dahulu.');

            return;
        }

        setFeaturedUploading(true);
        const toastId = toast.loading('Mengunggah gambar produk...');

        router.post(
            '/dashboard/pages/content/beranda/featured-image',
            {
                image: featuredImageFile,
                category_index: featuredImageTarget.ci,
                product_index: featuredImageTarget.pi,
            },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Gambar produk berhasil diganti!', { id: toastId });
                    setFeaturedImageModalOpen(false);
                    setFeaturedUploading(false);
                },
                onError: (errors) => {
                    toast.error(
                        errors.image ?? 'Gagal mengunggah gambar (maks. 1MB, format JPG/PNG/WebP).',
                        { id: toastId },
                    );
                    setFeaturedUploading(false);
                },
            },
        );
    };

    const { data, setData, put, processing, errors } = useForm({
        stats: {
            id: sections.stats?.id ?? emptyStats,
            en: sections.stats?.en ?? emptyStats,
        },
        why: {
            id: sections.why?.id ?? emptyWhy,
            en: sections.why?.en ?? emptyWhy,
        },
        featured: {
            id: sections.featured?.id ?? emptyFeatured,
            en: sections.featured?.en ?? emptyFeatured,
        },
        standards: {
            id: sections.standards?.id ?? emptyStandards,
            en: sections.standards?.en ?? emptyStandards,
        },
        choices: {
            id: sections.choices?.id ?? emptyChoices,
            en: sections.choices?.en ?? emptyChoices,
        },
        baitulmaal: {
            id: sections.baitulmaal?.id ?? emptyBaitulMaal,
            en: sections.baitulmaal?.en ?? emptyBaitulMaal,
        },
        highlights: {
            id: sections.highlights?.id ?? emptyHighlights,
            en: sections.highlights?.en ?? emptyHighlights,
        },
    });

    const setStat = (index: number, field: keyof Stat, value: string | number) => {
        const next = data.stats[locale].map((stat, i) =>
            i === index ? { ...stat, [field]: value } : stat,
        );
        setData('stats', { ...data.stats, [locale]: next });
    };

    const setWhy = (field: 'title' | 'description', value: string) => {
        setData('why', {
            ...data.why,
            [locale]: { ...data.why[locale], [field]: value },
        });
    };

    const setReason = (index: number, field: keyof Reason, value: string) => {
        const next = data.why[locale].reasons.map((reason, i) =>
            i === index ? { ...reason, [field]: value } : reason,
        );
        setData('why', {
            ...data.why,
            [locale]: { ...data.why[locale], reasons: next },
        });
    };

    const setFeaturedField = (
        field: 'badge' | 'title' | 'description' | 'readMore',
        value: string,
    ) => {
        setData('featured', {
            ...data.featured,
            [locale]: { ...data.featured[locale], [field]: value },
        });
    };

    const setCategoryName = (ci: number, value: string) => {
        const categories = data.featured[locale].categories.map((category, i) =>
            i === ci ? { ...category, name: value } : category,
        );
        setData('featured', {
            ...data.featured,
            [locale]: { ...data.featured[locale], categories },
        });
    };

    const setProduct = (
        ci: number,
        pi: number,
        field: 'title' | 'href' | 'desc' | 'tag',
        value: string,
    ) => {
        const categories = data.featured[locale].categories.map((category, i) =>
            i === ci
                ? {
                      ...category,
                      products: category.products.map((product, j) =>
                          j === pi ? { ...product, [field]: value } : product,
                      ),
                  }
                : category,
        );
        setData('featured', {
            ...data.featured,
            [locale]: { ...data.featured[locale], categories },
        });
    };

    const setStandardsField = (field: 'title' | 'subtitle', value: string) => {
        setData('standards', {
            ...data.standards,
            [locale]: { ...data.standards[locale], [field]: value },
        });
    };

    const setStandardsItem = (index: number, field: 'title' | 'desc' | 'icon', value: string) => {
        const items = data.standards[locale].items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item,
        );
        setData('standards', {
            ...data.standards,
            [locale]: { ...data.standards[locale], items },
        });
    };

    const setChoicesField = (
        field: 'badge' | 'title' | 'description' | 'readMore',
        value: string,
    ) => {
        setData('choices', {
            ...data.choices,
            [locale]: { ...data.choices[locale], [field]: value },
        });
    };

    const setChoicesCard = (
        index: number,
        field: 'title' | 'description' | 'href' | 'tag',
        value: string,
    ) => {
        const cards = data.choices[locale].cards.map((card, i) =>
            i === index ? { ...card, [field]: value } : card,
        );
        setData('choices', {
            ...data.choices,
            [locale]: { ...data.choices[locale], cards },
        });
    };

    const setBaitulMaalField = (
        field: 'badge' | 'title' | 'description' | 'showMore',
        value: string,
    ) => {
        setData('baitulmaal', {
            ...data.baitulmaal,
            [locale]: { ...data.baitulmaal[locale], [field]: value },
        });
    };

    const setHighlightsField = (field: 'badge' | 'title' | 'viewAll', value: string) => {
        setData('highlights', {
            ...data.highlights,
            [locale]: { ...data.highlights[locale], [field]: value },
        });
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Menyimpan konten beranda...');

        put('/dashboard/pages/content/beranda', {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                toast.success('Konten beranda berhasil diperbarui!', { id: toastId });
            },
            onError: () => {
                toast.error('Gagal menyimpan. Periksa kembali isian Anda.', { id: toastId });
            },
        });
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <>
            <Head title="Edit Halaman Beranda" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard/pages/content">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Edit Halaman Beranda</h1>
                            <p className="text-sm text-muted-foreground">
                                Ubah konten section beranda. Data yang tampil adalah data yang sedang digunakan di website.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
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

                        <div className="inline-flex rounded-lg border p-1">
                        <button
                            type="button"
                            onClick={() => setLocale('id')}
                            className={
                                locale === 'id'
                                    ? 'rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white'
                                    : 'rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-slate-100'
                            }
                        >
                            Indonesia
                        </button>
                        <button
                            type="button"
                            onClick={() => setLocale('en')}
                            className={
                                locale === 'en'
                                    ? 'rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white'
                                    : 'rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-slate-100'
                            }
                        >
                            English
                        </button>
                        </div>
                    </div>
                </div>

                {hasErrors && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        Ada isian yang belum valid (periksa juga tab bahasa lainnya). Semua kolom wajib diisi.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <SectionCard
                        icon={<BarChart3 className="h-5 w-5" />}
                        title="Section Statistik"
                        description="Empat angka statistik pada bar hijau di bawah hero banner."
                        defaultOpen
                    >
                            <div className="grid gap-4 md:grid-cols-2">
                                {data.stats[locale].map((stat, index) => (
                                    <div key={index} className="space-y-3 rounded-xl border p-4">
                                        <p className="text-sm font-semibold text-muted-foreground">
                                            Statistik {index + 1}
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <Label htmlFor={`stat-value-${index}`}>Angka</Label>
                                                <Input
                                                    id={`stat-value-${index}`}
                                                    type="number"
                                                    min={0}
                                                    value={stat.value}
                                                    onChange={(e) => setStat(index, 'value', Number(e.target.value))}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`stat-suffix-${index}`}>Sufiks</Label>
                                                <select
                                                    id={`stat-suffix-${index}`}
                                                    value={stat.suffix}
                                                    onChange={(e) => setStat(index, 'suffix', e.target.value)}
                                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                                >
                                                    <option value="+">+</option>
                                                    <option value="K+">K+ (ribuan)</option>
                                                    <option value="%">%</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`stat-label-${index}`}>Label</Label>
                                            <Input
                                                id={`stat-label-${index}`}
                                                value={stat.label}
                                                onChange={(e) => setStat(index, 'label', e.target.value)}
                                                placeholder={locale === 'id' ? 'Contoh: Tahun Pengalaman' : 'e.g. Years Experience'}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {showPreview && (
                                <div className="mt-6 space-y-2">
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Preview (tampilan di website)
                                    </p>
                                    <div className="overflow-hidden rounded-xl border shadow-sm">
                                        <TamzisStatsBar data={data.stats[locale]} />
                                    </div>
                                </div>
                            )}
                    </SectionCard>

                    <SectionCard
                        icon={<ShoppingBag className="h-5 w-5" />}
                        title="Section Produk Unggulan"
                        description="Judul section dan tiga kartu kategori produk (Simpanan, Pembiayaan, M-TAMZIS) beserta produk di dalamnya."
                        contentClassName="space-y-6"
                    >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="featured-badge">Badge</Label>
                                    <Input
                                        id="featured-badge"
                                        value={data.featured[locale].badge}
                                        onChange={(e) => setFeaturedField('badge', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="featured-readmore">Teks Tombol Selengkapnya</Label>
                                    <Input
                                        id="featured-readmore"
                                        value={data.featured[locale].readMore}
                                        onChange={(e) => setFeaturedField('readMore', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="featured-title">Judul</Label>
                                <Input
                                    id="featured-title"
                                    value={data.featured[locale].title}
                                    onChange={(e) => setFeaturedField('title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="featured-description">Deskripsi</Label>
                                <RichTextEditor
                                    value={data.featured[locale].description}
                                    onChange={(value) => setFeaturedField('description', value)}
                                    className="overflow-hidden rounded-xl border border-slate-200"
                                />
                            </div>

                            {data.featured[locale].categories.map((category, ci) => (
                                <CollapsibleBox
                                    key={ci}
                                    title={`Kategori ${ci + 1}: ${category.name || '(tanpa nama)'}`}
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor={`category-name-${ci}`}>
                                            Nama Kategori {ci + 1}
                                        </Label>
                                        <Input
                                            id={`category-name-${ci}`}
                                            value={category.name}
                                            onChange={(e) => setCategoryName(ci, e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        {category.products.map((product, pi) => {
                                            // Path gambar diambil dari prop `sections` (sumber kebenaran di
                                            // database), bukan dari state form lokal, supaya thumbnail langsung
                                            // menampilkan foto terbaru begitu upload berhasil tanpa perlu reload.
                                            const productImageUrl =
                                                sections.featured?.[locale]?.categories?.[ci]?.products?.[pi]?.imageUrl ||
                                                product.imageUrl ||
                                                (tamzisFeaturedDefaults?.categories?.[ci]?.products?.[pi]?.imageUrl) || null;

                                            return (
                                                <div key={pi} className="space-y-3 rounded-lg border bg-slate-50/50 p-3">
                                                    <div className="flex items-start gap-3">
                                                        {productImageUrl ? (
                                                            <div
                                                                className="group relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border"
                                                                onClick={() => openFeaturedImageModal(ci, pi)}
                                                            >
                                                                <img
                                                                    src={productImageUrl.startsWith('uploads/') ? `/${productImageUrl}` : productImageUrl}
                                                                    alt={product.title}
                                                                    className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                                                                    <ImageUp className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => openFeaturedImageModal(ci, pi)}
                                                                className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 text-slate-400 transition-colors hover:border-emerald-400 hover:text-emerald-600"
                                                            >
                                                                <ImageUp className="h-6 w-6" />
                                                            </button>
                                                        )}
                                                        <div className="flex-1 space-y-1.5">
                                                            <p className="text-xs font-semibold text-muted-foreground">
                                                                Produk {pi + 1}
                                                            </p>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="space-y-1.5">
                                                                    <Label htmlFor={`product-title-${ci}-${pi}`}>Nama Produk</Label>
                                                                    <Input
                                                                        id={`product-title-${ci}-${pi}`}
                                                                        value={product.title}
                                                                        onChange={(e) => setProduct(ci, pi, 'title', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <Label htmlFor={`product-tag-${ci}-${pi}`}>Tag</Label>
                                                                    <Input
                                                                        id={`product-tag-${ci}-${pi}`}
                                                                        value={product.tag}
                                                                        onChange={(e) => setProduct(ci, pi, 'tag', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor={`product-desc-${ci}-${pi}`}>Deskripsi</Label>
                                                        <Input
                                                            id={`product-desc-${ci}-${pi}`}
                                                            value={product.desc}
                                                            onChange={(e) => setProduct(ci, pi, 'desc', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor={`product-href-${ci}-${pi}`}>Link Halaman</Label>
                                                        <Input
                                                            id={`product-href-${ci}-${pi}`}
                                                            value={product.href}
                                                            onChange={(e) => setProduct(ci, pi, 'href', e.target.value)}
                                                            placeholder="/simpanan-mutiara"
                                                            className={product.href && !isValidUrl(product.href, validRoutesList) ? 'border-red-400 focus-visible:ring-red-400' : ''}
                                                        />
                                                        {product.href && !isValidUrl(product.href, validRoutesList) && (
                                                            <p className="flex items-center gap-1 text-xs text-red-600">
                                                                <AlertTriangle className="h-3 w-3" />
                                                                URL tidak ditemukan. Pengunjung akan melihat halaman 404.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CollapsibleBox>
                            ))}

                            {showPreview && (
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Preview (tampilan di website)
                                    </p>
                                    <div className="overflow-hidden rounded-xl border shadow-sm">
                                        <TamzisFeaturedProducts data={data.featured[locale]} />
                                    </div>
                                </div>
                            )}
                    </SectionCard>

                    <SectionCard
                        icon={<HelpCircle className="h-5 w-5" />}
                        title="Section Mengapa TAMZIS"
                        description='Judul, deskripsi, dan empat poin keunggulan pada section hijau "Kepercayaan Lebih dari Tiga Dekade".'
                        contentClassName="space-y-4"
                    >
                            <div className="space-y-2">
                                <Label htmlFor="why-title">Judul</Label>
                                <Input
                                    id="why-title"
                                    value={data.why[locale].title}
                                    onChange={(e) => setWhy('title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="why-description">Deskripsi</Label>
                                <RichTextEditor
                                    value={data.why[locale].description}
                                    onChange={(value) => setWhy('description', value)}
                                    className="overflow-hidden rounded-xl border border-slate-200"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {data.why[locale].reasons.map((reason, index) => (
                                    <div key={index} className="space-y-3 rounded-xl border p-4">
                                        <p className="text-sm font-semibold text-muted-foreground">
                                            Poin {index + 1}
                                        </p>
                                        <div className="space-y-2">
                                            <Label>Ikon</Label>
                                            <IconPicker
                                                value={reason.icon ?? whyDefaultIcons[index]}
                                                onChange={(name) => setReason(index, 'icon', name)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`reason-title-${index}`}>Judul Poin</Label>
                                            <Input
                                                id={`reason-title-${index}`}
                                                value={reason.title}
                                                onChange={(e) => setReason(index, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`reason-desc-${index}`}>Deskripsi Poin</Label>
                                            <Input
                                                id={`reason-desc-${index}`}
                                                value={reason.description}
                                                onChange={(e) => setReason(index, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={openImageModal}
                                    className="inline-flex items-center gap-2"
                                >
                                    <ImageUp className="h-4 w-4" />
                                    Ganti Gambar Section
                                </Button>
                            </div>

                            {showPreview && (
                                <div className="mt-2 space-y-2">
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Preview (tampilan di website) — klik gambarnya untuk mengganti
                                    </p>
                                    <div className="overflow-hidden rounded-xl border shadow-sm">
                                        <TamzisWhy
                                            data={data.why[locale]}
                                            image={sections.why?.image}
                                            onImageClick={openImageModal}
                                        />
                                    </div>
                                </div>
                            )}
                    </SectionCard>

                    <SectionCard
                        icon={<ShieldCheck className="h-5 w-5" />}
                        title="Section Standar Layanan"
                        description="Judul, subjudul, dan lima kartu standar layanan TAMZIS."
                        contentClassName="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="standards-title">Judul</Label>
                            <Input
                                id="standards-title"
                                value={data.standards[locale].title}
                                onChange={(e) => setStandardsField('title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="standards-subtitle">Subjudul</Label>
                            <RichTextEditor
                                value={data.standards[locale].subtitle}
                                onChange={(value) => setStandardsField('subtitle', value)}
                                className="overflow-hidden rounded-xl border border-slate-200"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {data.standards[locale].items.map((item, index) => (
                                <div key={index} className="space-y-3 rounded-xl border p-4">
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Kartu {index + 1}
                                    </p>
                                    <div className="space-y-2">
                                        <Label>Ikon</Label>
                                        <IconPicker
                                            value={item.icon ?? standardsDefaultIcons[index]}
                                            onChange={(name) => setStandardsItem(index, 'icon', name)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`standard-title-${index}`}>Judul Kartu</Label>
                                        <Input
                                            id={`standard-title-${index}`}
                                            value={item.title}
                                            onChange={(e) => setStandardsItem(index, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`standard-desc-${index}`}>Deskripsi</Label>
                                        <Input
                                            id={`standard-desc-${index}`}
                                            value={item.desc}
                                            onChange={(e) => setStandardsItem(index, 'desc', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showPreview && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">
                                    Preview (tampilan di website)
                                </p>
                                <div className="overflow-hidden rounded-xl border shadow-sm">
                                    <TamzisStandards data={data.standards[locale]} />
                                </div>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard
                        icon={<Wallet className="h-5 w-5" />}
                        title="Section Pilihan Produk"
                        description="Judul section dan tiga kartu produk pilihan (Simpanan & Pembiayaan Terbaik)."
                        contentClassName="space-y-4"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="choices-badge">Badge</Label>
                                <Input
                                    id="choices-badge"
                                    value={data.choices[locale].badge}
                                    onChange={(e) => setChoicesField('badge', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="choices-readmore">Teks Tombol Selengkapnya</Label>
                                <Input
                                    id="choices-readmore"
                                    value={data.choices[locale].readMore}
                                    onChange={(e) => setChoicesField('readMore', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="choices-title">Judul</Label>
                            <Input
                                id="choices-title"
                                value={data.choices[locale].title}
                                onChange={(e) => setChoicesField('title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="choices-description">Deskripsi</Label>
                            <RichTextEditor
                                value={data.choices[locale].description}
                                onChange={(value) => setChoicesField('description', value)}
                                className="overflow-hidden rounded-xl border border-slate-200"
                            />
                        </div>

                        <div className="grid gap-4 lg:grid-cols-3">
                            {data.choices[locale].cards.map((card, index) => (
                                <div key={index} className="space-y-3 rounded-xl border p-4">
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Kartu Produk {index + 1}
                                    </p>
                                    <div className="space-y-2">
                                        <Label htmlFor={`choice-title-${index}`}>Nama Produk</Label>
                                        <Input
                                            id={`choice-title-${index}`}
                                            value={card.title}
                                            onChange={(e) => setChoicesCard(index, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`choice-tag-${index}`}>Tag</Label>
                                        <Input
                                            id={`choice-tag-${index}`}
                                            value={card.tag}
                                            onChange={(e) => setChoicesCard(index, 'tag', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`choice-desc-${index}`}>Deskripsi</Label>
                                        <RichTextEditor
                                            value={card.description}
                                            onChange={(value) => setChoicesCard(index, 'description', value)}
                                            className="overflow-hidden rounded-xl border border-slate-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`choice-href-${index}`}>Link Halaman</Label>
                                        <Input
                                            id={`choice-href-${index}`}
                                            value={card.href}
                                            onChange={(e) => setChoicesCard(index, 'href', e.target.value)}
                                            placeholder="/simpanan-mudharabah"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showPreview && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">
                                    Preview (tampilan di website)
                                </p>
                                <div className="overflow-hidden rounded-xl border shadow-sm">
                                    <TamzisProductChoices data={data.choices[locale]} />
                                </div>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard
                        icon={<HandHeart className="h-5 w-5" />}
                        title="Section Baitul Maal"
                        description="Judul dan deskripsi section program sosial & keagamaan. Daftar programnya tetap mengikuti bawaan website."
                        contentClassName="space-y-4"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="baitulmaal-badge">Badge</Label>
                                <Input
                                    id="baitulmaal-badge"
                                    value={data.baitulmaal[locale].badge}
                                    onChange={(e) => setBaitulMaalField('badge', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="baitulmaal-showmore">Teks Tombol Lihat Semua</Label>
                                <Input
                                    id="baitulmaal-showmore"
                                    value={data.baitulmaal[locale].showMore}
                                    onChange={(e) => setBaitulMaalField('showMore', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="baitulmaal-title">Judul</Label>
                            <Input
                                id="baitulmaal-title"
                                value={data.baitulmaal[locale].title}
                                onChange={(e) => setBaitulMaalField('title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="baitulmaal-description">Deskripsi</Label>
                            <RichTextEditor
                                value={data.baitulmaal[locale].description}
                                onChange={(value) => setBaitulMaalField('description', value)}
                                className="overflow-hidden rounded-xl border border-slate-200"
                            />
                        </div>

                        {showPreview && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">
                                    Preview (tampilan di website)
                                </p>
                                <div className="overflow-hidden rounded-xl border shadow-sm">
                                    <TamzisBaitulMaal data={data.baitulmaal[locale]} />
                                </div>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard
                        icon={<Newspaper className="h-5 w-5" />}
                        title="Section Tamzis Highlight"
                        description="Judul section berita & kegiatan terkini. Isi feed-nya diambil otomatis dari akun Instagram TAMZIS."
                        contentClassName="space-y-4"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="highlights-badge">Badge</Label>
                                <Input
                                    id="highlights-badge"
                                    value={data.highlights[locale].badge}
                                    onChange={(e) => setHighlightsField('badge', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="highlights-viewall">Teks Tombol Lihat Semua</Label>
                                <Input
                                    id="highlights-viewall"
                                    value={data.highlights[locale].viewAll}
                                    onChange={(e) => setHighlightsField('viewAll', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="highlights-title">Judul</Label>
                            <Input
                                id="highlights-title"
                                value={data.highlights[locale].title}
                                onChange={(e) => setHighlightsField('title', e.target.value)}
                            />
                        </div>

                        {showPreview && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">
                                    Preview (tampilan di website)
                                </p>
                                <div className="overflow-hidden rounded-xl border shadow-sm">
                                    <TamzisHighlights data={data.highlights[locale]} />
                                </div>
                            </div>
                        )}
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

                <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Ganti Gambar Section Mengapa TAMZIS</DialogTitle>
                            <DialogDescription>
                                Unggah gambar baru. Gambar langsung tersimpan dan tampil di beranda website.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div
                                className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
                                    imageDragOver
                                        ? 'border-emerald-500 bg-emerald-100/50'
                                        : 'border-emerald-300 bg-emerald-50/50 hover:border-emerald-500'
                                }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => {
 e.preventDefault(); setImageDragOver(true); 
}}
                                onDragLeave={() => setImageDragOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setImageDragOver(false);
                                    const file = e.dataTransfer.files?.[0];

                                    if (file && file.type.startsWith('image/')) {
                                        handleImageSelect(file);
                                    }
                                }}
                            >
                                {imagePreviewUrl ? (
                                    <img
                                        src={imagePreviewUrl}
                                        alt="Preview gambar baru"
                                        className="max-h-64 w-full object-cover"
                                    />
                                ) : sections.why?.image ? (
                                    <div className="space-y-2 p-4 text-center">
                                        <img
                                            src={`/${sections.why.image}`}
                                            alt="Gambar saat ini"
                                            className="mx-auto max-h-48 rounded-lg object-cover"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Gambar saat ini — klik atau seret gambar baru untuk mengganti
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-emerald-800">
                                        <Upload className="h-8 w-8" />
                                        <p className="font-medium">Klik atau seret gambar ke sini</p>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG, atau WebP — maksimal 1MB
                                        </p>
                                    </div>
                                )}
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                className="hidden"
                                onChange={(e) => handleImageSelect(e.target.files?.[0] ?? null)}
                            />

                            {imageFile && (
                                <p className="text-sm text-muted-foreground">
                                    File dipilih: <span className="font-medium">{imageFile.name}</span>{' '}
                                    ({(imageFile.size / 1024).toFixed(0)} KB)
                                </p>
                            )}

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                                <p className="text-xs font-semibold text-blue-800">Rekomendasi Ukuran Gambar</p>
                                <p className="mt-1 text-xs text-blue-700">
                                    Untuk tampilan terbaik, gunakan gambar dengan resolusi <span className="font-semibold">1200 × 800 px</span> atau lebih tinggi dengan rasio 3:2.
                                </p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setImageModalOpen(false)}
                                disabled={uploading}
                            >
                                Batal
                            </Button>
                            <Button
                                type="button"
                                onClick={handleImageUpload}
                                disabled={uploading || !imageFile}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                {uploading ? 'Mengunggah...' : 'Simpan Gambar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={featuredImageModalOpen} onOpenChange={setFeaturedImageModalOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Ganti Gambar Produk</DialogTitle>
                            <DialogDescription>
                                Unggah gambar baru. Gambar langsung tersimpan dan tampil di beranda website.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div
                                className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
                                    featuredDragOver
                                        ? 'border-emerald-500 bg-emerald-100/50'
                                        : 'border-emerald-300 bg-emerald-50/50 hover:border-emerald-500'
                                }`}
                                onClick={() => featuredFileInputRef.current?.click()}
                                onDragOver={(e) => {
 e.preventDefault(); setFeaturedDragOver(true); 
}}
                                onDragLeave={() => setFeaturedDragOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setFeaturedDragOver(false);
                                    const file = e.dataTransfer.files?.[0];

                                    if (file && file.type.startsWith('image/')) {
                                        handleFeaturedImageSelect(file);
                                    }
                                }}
                            >
                                {featuredImagePreviewUrl ? (
                                    <img
                                        src={featuredImagePreviewUrl}
                                        alt="Preview gambar baru"
                                        className="max-h-64 w-full object-cover"
                                    />
                                ) : featuredImageTarget ? (() => {
                                    const ci = featuredImageTarget.ci;
                                    const pi = featuredImageTarget.pi;
                                    const currentImageUrl = data.featured[locale].categories?.[ci]?.products?.[pi]?.imageUrl
                                        || (tamzisFeaturedDefaults?.categories?.[ci]?.products?.[pi]?.imageUrl) || null;

                                    return currentImageUrl ? (
                                        <div className="space-y-2 p-4 text-center">
                                            <img
                                                src={currentImageUrl.startsWith('uploads/') ? `/${currentImageUrl}` : currentImageUrl}
                                                alt="Gambar saat ini"
                                                className="mx-auto max-h-48 rounded-lg object-cover"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Gambar saat ini — klik atau seret gambar baru untuk mengganti
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-emerald-800">
                                            <Upload className="h-8 w-8" />
                                            <p className="font-medium">Klik atau seret gambar ke sini</p>
                                            <p className="text-xs text-muted-foreground">
                                                JPG, PNG, atau WebP — maksimal 1MB
                                            </p>
                                        </div>
                                    );
                                })() : null}
                            </div>

                            <input
                                ref={featuredFileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                className="hidden"
                                onChange={(e) => handleFeaturedImageSelect(e.target.files?.[0] ?? null)}
                            />

                            {featuredImageFile && (
                                <p className="text-sm text-muted-foreground">
                                    File dipilih: <span className="font-medium">{featuredImageFile.name}</span>{' '}
                                    ({(featuredImageFile.size / 1024).toFixed(0)} KB)
                                </p>
                            )}

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                                <p className="text-xs font-semibold text-blue-800">Rekomendasi Ukuran Gambar</p>
                                <p className="mt-1 text-xs text-blue-700">
                                    Untuk tampilan terbaik, gunakan gambar dengan resolusi <span className="font-semibold">1200 × 768 px</span> atau lebih tinggi dengan rasio 3:2 (3545 × 2268 px).
                                </p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFeaturedImageModalOpen(false)}
                                disabled={featuredUploading}
                            >
                                Batal
                            </Button>
                            <Button
                                type="button"
                                onClick={handleFeaturedImageUpload}
                                disabled={featuredUploading || !featuredImageFile}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                {featuredUploading ? 'Mengunggah...' : 'Simpan Gambar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
