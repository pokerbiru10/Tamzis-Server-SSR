import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    ChevronRight,
    Info,
    Home,
    Wallet,
    Calendar,
    Percent,
    LoaderCircle,
    Lock,
} from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useSimulasiPlafondTracker } from '@/hooks/use-simulasi-plafond-tracker';
import { fetchSimulation } from '@/lib/simulation-api';
import { formatCurrencyIDR, formatNumberID } from '@/lib/utils';

const TAHUN_OPTIONS = [4, 5, 7, 8, 10, 11, 12, 15];

type GTBResult = {
    status: boolean;
    result?: {
        harga_objek: number;
        uang_muka_persen: number;
        uang_muka_nominal: number;
        plafond: number;
        margin_per_bulan: number;
        margin_per_tahun: number;
        margin_total: number;
        harga_jual: number;
        harga_angsur: number;
        jangka_waktu: number;
        angsuran_per_bulan: number;
        perhitungan: string;
        data: {
            bulan_ke: number;
            angsuran_pokok: number;
            angsuran_margin: number;
            total_angsuran: number;
            saldo_pokok: number;
            saldo_margin?: number;
            total_saldo?: number;
        }[];
    };
    message?: string;
};

export default function SimulasiGTB() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const translations = {
        id: {
            title: 'Simulasi GTB - TAMZIS Bina Utama',
            heading: 'Simulasi Griya Tumbuh Bahagia',
            breadcrumb: {
                home: 'Beranda',
                simulation: 'Simulasi',
                current: 'GTB',
            },
            form: {
                title: 'Simulasi Griya Tumbuh Bahagia',
                desc: 'Hitung estimasi angsuran pembiayaan properti syariah dengan metode Flat.',
                priceLabel: 'Harga Objek (Rp)',
                pricePlaceholder: 'Contoh: 600.000.000',
                dpLabel: 'Uang Muka (%)',
                tenorLabel: 'Jangka Waktu (Bulan)',
                tenorPlaceholder: 'Pilih Tenor',
            },
            results: {
                title: 'Hasil Simulasi',
                metode: 'METODE',
                hargaObjek: 'Harga Objek',
                uangMuka: 'Uang Muka',
                plafond: 'Plafond',
                marginBulan: 'Margin/Bulan',
                marginTahun: 'Margin/Tahun',
                marginTotal: 'Total Margin',
                hargaJual: 'Harga Jual',
                hargaAngsur: 'Harga Angsur',
                angsuranBulan: 'Angsuran/Bulan',
                jangkaWaktu: 'Jangka Waktu',
                bulan: 'Bulan',
                note: 'Hasil simulasi bersifat indikatif dan bukan jaminan. Realisasi tergantung kebijakan lembaga.',
                waBtn: 'Ajukan Pembiayaan',
            },
            table: {
                title: 'Tabel Amortisasi',
                bulan: 'Bulan',
                total: 'ANGSURAN',
                saldo: 'Saldo Pembiayaan',
            },
            warning: 'Pilih metode terlebih dahulu untuk melihat perbandingan.',
            errorApi: 'Gagal menghitung simulasi. Silakan coba lagi.',
            loading: 'Menghitung...',
        },
        en: {
            title: 'GTB Simulation - TAMZIS Bina Utama',
            heading: 'Griya Tumbuh Bahagia Simulation',
            breadcrumb: {
                home: 'Home',
                simulation: 'Simulation',
                current: 'GTB',
            },
            form: {
                title: 'Griya Tumbuh Bahagia Simulation',
                desc: 'Calculate your sharia property financing installments with the Flat method.',
                priceLabel: 'Object Price (Rp)',
                pricePlaceholder: 'Example: 600,000,000',
                dpLabel: 'Down Payment (%)',
                tenorLabel: 'Tenor (Months)',
                tenorPlaceholder: 'Select Tenor',
            },
            results: {
                title: 'Simulation Results',
                metode: 'METHOD',
                hargaObjek: 'Object Price',
                uangMuka: 'Down Payment',
                plafond: 'Plafond',
                marginBulan: 'Margin/Month',
                marginTahun: 'Margin/Year',
                marginTotal: 'Total Margin',
                hargaJual: 'Selling Price',
                hargaAngsur: 'Installment Price',
                angsuranBulan: 'Monthly Installment',
                jangkaWaktu: 'Tenor',
                bulan: 'Months',
                note: 'Simulation results are indicative and not guaranteed. Realization depends on institutional policy.',
                waBtn: 'Apply for Financing',
            },
            table: {
                title: 'Amortization Table',
                bulan: 'Month',
                total: 'INSTALLMENT',
                saldo: 'Financing Balance',
            },
            warning: 'Select a method to see comparison.',
            errorApi: 'Failed to calculate simulation. Please try again.',
            loading: 'Calculating...',
        },
    };

    const t = translations[locale as keyof typeof translations] || translations.id;

    const [hargaObjek, setHargaObjek] = useState<number>(0);
    const [uangMuka, setUangMuka] = useState<number>(0);
    const [jangkaWaktu, setJangkaWaktu] = useState<number>(0);
    const [hargaInput, setHargaInput] = useState<string>('');

    const [resultFlat, setResultFlat] = useState<GTBResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchSimulasi = useCallback(async () => {
        const params = new URLSearchParams({
            hargaObjek: hargaObjek.toString(),
            uangMuka: uangMuka.toString(),
            jangkaWaktu: jangkaWaktu.toString(),
        });

        return fetchSimulation('/api/simulasi/gtb/flat', params);
    }, [hargaObjek, uangMuka, jangkaWaktu]);

    const calculate = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const flatData = await fetchSimulasi();

            if (flatData.status === false) {
                setError(flatData.message || t.errorApi);
            } else {
                setResultFlat(flatData);
            }
        } catch {
            setError(t.errorApi);
        } finally {
            setLoading(false);
        }
    }, [fetchSimulasi, t.errorApi]);

    useEffect(() => {
        if (hargaObjek <= 0) {
return;
}

        let isMounted = true;

        calculate().catch(() => {
            // error handled in calculate
        });

        return () => {
            isMounted = false;
        };
    }, [calculate, hargaObjek]);

    const [hasSubmittedDataDiri, setHasSubmittedDataDiri] = useState(false);
    const [simulasiId, setSimulasiId] = useState<number | null>(null);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        email: '',
        no_hp: '',
        jenis_simulasi: 'gtb',
        plafond: 0,
    });

    // Sinkronkan harga objek terbaru ke form sebelum data diri dikirim
    useEffect(() => {
        setData('plafond', hargaObjek);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hargaObjek]);

    // Catat setiap perubahan plafond ke Administrator setelah data diri terkirim
    useSimulasiPlafondTracker(hargaObjek, hasSubmittedDataDiri, simulasiId);

    const submitDataDiri = (e: React.FormEvent) => {
        e.preventDefault();
        post('/simulasi-simpanan', {
            preserveScroll: true,
            onSuccess: (page) => {
                setHasSubmittedDataDiri(true);

                const flash = page.props.flash as { simulasiId?: number } | undefined;

                if (flash?.simulasiId) {
                    setSimulasiId(flash.simulasiId);
                }

                if (calculatorRef.current) {
                    calculatorRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            },
        });
    };

    const handleNumberChange = (
        value: string,
        setter: (n: number) => void,
        inputSetter?: (s: string) => void,
    ) => {
        const raw = value.replace(/\D/g, '');
        const num = parseInt(raw) || 0;
        setter(num);

        if (inputSetter) {
inputSetter(formatNumberID(num));
}
    };

    const formatCurrency = (val: number) => formatCurrencyIDR(val);

    const methodLabel = (method?: string) => {
        if (!isEn || !method) {
            return method;
        }

        const map: Record<string, string> = {
            ANUITAS: 'ANNUITY',
            FLAT: 'FLAT',
        };

        return map[method] ?? method;
    };

    const result = resultFlat;

    const rightColumnContent = (
        <div className="space-y-6 sticky top-24">
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-[#004d26] p-8 text-white shadow-xl sm:p-10">
                <div className="relative z-10 flex-1">
                    <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold">{t.results.title}</h3>

                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <LoaderCircle className="h-8 w-8 animate-spin text-emerald-300" />
                            <span className="ml-3 text-sm text-emerald-300">{t.loading}</span>
                        </div>
                    )}

                    {!loading && result?.result && (
                        <div className="space-y-5">
                            <div>
                                <div className="mb-1 text-[10px] font-bold tracking-widest text-emerald-400/70 uppercase">{t.results.metode}</div>
                                <div className="text-base font-bold text-yellow-400 sm:text-xl">{methodLabel(result.result.perhitungan)}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.hargaObjek}</div>
                                    <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(result.result.harga_objek)}</div>
                                </div>
                                <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.uangMuka}</div>
                                    <div className="break-words text-[11px] font-bold sm:text-sm">{result.result.uang_muka_persen}%</div>
                                    <div className="break-words text-[9px] text-emerald-300/70">{formatCurrency(result.result.uang_muka_nominal)}</div>
                                </div>
                                <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.plafond}</div>
                                    <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(result.result.plafond)}</div>
                                </div>
                                <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.marginBulan}</div>
                                    <div className="break-words text-[11px] font-bold sm:text-sm">{result.result.margin_per_bulan}%</div>
                                </div>
                            </div>

                            <div className="min-w-0">
                                <div className="text-[9px] font-bold tracking-widest text-emerald-400/70 uppercase mb-2">{t.results.angsuranBulan}</div>
                                <div className="break-words text-lg font-bold text-yellow-400 sm:text-2xl md:text-3xl">{formatCurrency(result.result.angsuran_per_bulan)}</div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="min-w-0">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.marginTotal}</div>
                                    <div className="break-words text-[10px] font-bold text-emerald-300 sm:text-xs">{formatCurrency(result.result.margin_total)}</div>
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.hargaJual}</div>
                                    <div className="break-words text-[10px] font-bold sm:text-xs">{formatCurrency(result.result.harga_jual)}</div>
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[9px] text-emerald-300/60">{t.results.jangkaWaktu}</div>
                                    <div className="break-words text-[10px] font-bold sm:text-xs">{result.result.jangka_waktu} {isEn ? 'Mo' : 'Bln'}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && !result?.result && !error && (
                        <div className="flex items-center justify-center py-12 text-emerald-300/50 text-sm">{t.warning}</div>
                    )}

                    {!loading && error && (
                        <div className="flex items-center justify-center py-12 text-red-300 text-sm">{error}</div>
                    )}

                    <div className="mt-8">
                        <p className="text-[10px] leading-relaxed text-white/50 italic">{t.results.note}</p>
                    </div>
                </div>

                <a href="https://wa.me/628112613134" target="_blank" rel="noreferrer" className="relative z-10 mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#25d366] text-sm font-bold text-white shadow-lg shadow-green-900/40 transition-all hover:bg-[#20ba5a]">
                    {t.results.waBtn}
                </a>
            </div>
        </div>
    );

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/assets/img/header/Rumah-Tumbuh-Bahagia.jpg')" }}
                    />
                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase drop-shadow-md sm:text-4xl">
                            {t.heading}
                        </h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/50 uppercase">
                            <Link href="/" className="transition-colors hover:text-white">
                                {t.breadcrumb.home}
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <span>{t.breadcrumb.simulation}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="tracking-widest text-white">{t.breadcrumb.current}</span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12" suppressHydrationWarning>
                    <div className="grid items-start gap-8 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="flex flex-col rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
                                <div className="mb-6 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                                    <div className="text-emerald-800">
                                        <Info className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">{isEn ? 'Personal Information' : 'Informasi Data Diri'}</h2>
                                </div>
                                <p className="mb-6 text-sm font-medium text-gray-500">
                                    {isEn ? 'Please complete your personal information before running the simulation.' : 'Silakan lengkapi informasi data diri Anda sebelum melakukan simulasi.'}
                                </p>
                                <form onSubmit={submitDataDiri} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="gtb-nama">{isEn ? 'Full Name' : 'Nama Lengkap'}</Label>
                                        <Input id="gtb-nama" required value={data.nama_lengkap} onChange={(e) => setData('nama_lengkap', e.target.value)} placeholder={isEn ? 'Enter full name' : 'Masukkan nama lengkap'} disabled={hasSubmittedDataDiri || processing} className="h-11 border-slate-200 bg-slate-50" />
                                        {errors.nama_lengkap && <span className="text-xs text-red-500">{errors.nama_lengkap}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="gtb-email">Email</Label>
                                        <Input id="gtb-email" required type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder={isEn ? 'Enter email address' : 'Masukkan alamat email'} disabled={hasSubmittedDataDiri || processing} className="h-11 border-slate-200 bg-slate-50" />
                                        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="gtb-nohp">{isEn ? 'Phone Number (WhatsApp)' : 'No HP (WhatsApp)'}</Label>
                                        <Input id="gtb-nohp" required type="tel" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} placeholder={isEn ? 'Example: 081234567890' : 'Contoh: 081234567890'} disabled={hasSubmittedDataDiri || processing} className="h-11 border-slate-200 bg-slate-50" />
                                        {errors.no_hp && <span className="text-xs text-red-500">{errors.no_hp}</span>}
                                    </div>
                                    {!hasSubmittedDataDiri && (
                                        <button type="submit" disabled={processing} className="mt-4 h-11 w-full rounded-md bg-emerald-600 text-sm font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50">
                                            {processing ? (isEn ? 'Saving...' : 'Menyimpan...') : (isEn ? 'Continue to Simulation' : 'Lanjutkan ke Simulasi')}
                                        </button>
                                    )}
                                    {hasSubmittedDataDiri && (
                                        <div className="mt-4 w-full rounded-md bg-emerald-100 p-3 text-center text-sm font-bold text-emerald-800">
                                            ✓ {isEn ? 'Personal Information Saved Successfully' : 'Data Diri Berhasil Disimpan'}
                                        </div>
                                    )}
                                </form>
                            </div>

                            <div className="relative">
                            <div ref={calculatorRef} className={`flex scroll-mt-24 flex-col rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm transition-all sm:p-10 ${!hasSubmittedDataDiri ? 'pointer-events-none blur-[2px] select-none' : ''}`}>
                                <div className="mb-6 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                                    <div className="text-emerald-800"><Home className="h-6 w-6" /></div>
                                    <h2 className="text-lg font-bold text-gray-800">{t.form.title}</h2>
                                </div>
                                <p className="mb-8 text-sm leading-relaxed font-medium text-gray-500">{t.form.desc}</p>

                                <div className="flex-1 space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="gtb-harga">{t.form.priceLabel}</Label>
                                        <div className="relative">
                                            <Wallet className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input id="gtb-harga" value={hargaInput} onChange={(e) => handleNumberChange(e.target.value, setHargaObjek, setHargaInput)} placeholder="0" className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="gtb-dp">{t.form.dpLabel}</Label>
                                        <div className="relative">
                                            <Percent className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input id="gtb-dp" type="number" step="0.1" min="10" max="75" value={uangMuka || ''} onChange={(e) => setUangMuka(parseFloat(e.target.value) || 0)} placeholder="0" className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="gtb-tenor">{t.form.tenorLabel}</Label>
                                        <div className="relative">
                                            <Calendar className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Select value={jangkaWaktu.toString()} onValueChange={(val) => setJangkaWaktu(Number(val))}>
                                                <SelectTrigger id="gtb-tenor" className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white">
                                                    <SelectValue placeholder={t.form.tenorPlaceholder} />
                                                </SelectTrigger>
                                                <SelectContent className="border-slate-200 bg-white">
                                                    {TAHUN_OPTIONS.map((y) => {
                                                        const months = y * 12;

                                                        return (
                                                            <SelectItem key={y} value={months.toString()} className="font-bold text-slate-700">
                                                                {months} {isEn ? 'Months' : 'Bulan'} ({y} {isEn ? 'Yr' : 'Thn'})
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
                                )}
                            </div>

                            {!hasSubmittedDataDiri && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/70 p-8 text-center">
                                    <Lock className="h-8 w-8 text-emerald-700" />
                                    <p className="max-w-xs text-sm font-bold text-emerald-950">
                                        {isEn
                                            ? 'Please fill in Personal Information first to unlock the calculator'
                                            : 'Lengkapi Informasi Data Diri terlebih dahulu untuk membuka kalkulator'}
                                    </p>
                                </div>
                            )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {rightColumnContent}
                        </div>
                    </div>

                    {result?.result && result.result.data.length > 0 && (
                        <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-900/5 bg-white shadow-sm">
                            <div className="border-b border-emerald-900/5 p-6 sm:p-8">
                                <h3 className="text-lg font-bold text-gray-800">{t.table.title} ({methodLabel(result.result.perhitungan)})</h3>
                            </div>
                            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-emerald-50/95">
                                        <tr className="border-b border-emerald-900/5">
                                            <th className="px-4 py-3 text-left text-[10px] font-bold tracking-wider text-emerald-700 uppercase">{t.table.bulan}</th>
                                            <th className="px-4 py-3 text-right text-[10px] font-bold tracking-wider text-emerald-700 uppercase">{t.table.total}</th>
                                            <th className="px-4 py-3 text-right text-[10px] font-bold tracking-wider text-emerald-700 uppercase">{t.table.saldo}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.result.data.filter((d) => d.bulan_ke > 0).map((row) => (
                                            <tr key={row.bulan_ke} className="border-b border-emerald-900/5 transition-colors hover:bg-emerald-50/30">
                                                <td className="px-4 py-2.5 font-bold text-emerald-900">{row.bulan_ke}</td>
                                                <td className="px-4 py-2.5 text-right font-bold text-emerald-800">{formatCurrency(row.total_angsuran)}</td>
                                                <td className="px-4 py-2.5 text-right font-medium text-gray-600">{formatCurrency(row.total_saldo)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mx-auto max-w-7xl px-6 pb-12 sm:pb-20">
                    <div className="flex gap-4 rounded-md border border-blue-200 bg-blue-50 p-6">
                        <Info className="h-6 w-6 shrink-0 text-blue-500" />
                        <p className="text-xs leading-relaxed font-bold text-blue-800">{t.results.note}</p>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
