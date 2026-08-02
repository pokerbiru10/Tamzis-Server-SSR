import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    ChevronRight,
    Calculator,
    Info,
    TrendingUp,
    Wallet,
    Clock,
    BadgeCheck,
    LoaderCircle,
    Lock,
} from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
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
import { fetchSimulation } from '@/lib/simulation-api';
import { formatCurrencyIDR, formatNumberID } from '@/lib/utils';

const POLA_OPTIONS = [
    { value: 'H', label: 'Harian', labelEn: 'Daily' },
    { value: 'P', label: 'Pasaran', labelEn: 'Pasaran' },
    { value: 'M', label: 'Mingguan', labelEn: 'Weekly' },
    { value: 'B', label: 'Bulanan', labelEn: 'Monthly' },
];

const MAX_TENOR = 60;

type SimulasiResult = {
    status: boolean;
    result?: {
        plafond: number;
        jangka_waktu: number;
        nisbah_tamzis: number;
        nisbah_anggota: number;
        pola_angsur: string;
        data: {
            bulan_ke: number;
            angsuran_per_bulan: { pokok: number; bagi_hasil: number; total: number };
            titipan: { pokok: number; bagi_hasil: number; total: number };
            saldo_pokok: number;
        }[];
    };
    message?: string;
};

export default function SimulasiMudharabah() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const translations = {
        id: {
            title: 'Simulasi Pembiayaan Mudharabah - TAMZIS Bina Utama',
            heading: 'Simulasi Pembiayaan Mudharabah',
            breadcrumb: {
                home: 'Beranda',
                simulation: 'Simulasi',
                current: 'Mudharabah',
            },
            form: {
                title: 'Kalkulator Pembiayaan Mudharabah',
                desc: 'Perhitungan simulasi pembiayaan Mudharabah dengan pola angsuran fleksibel.',
                plafondLabel: 'Plafond Pembiayaan (Rp)',
                plafondPlaceholder: 'Contoh: 10.000.000',
                tenorLabel: 'Jangka Waktu',
                tenorPlaceholder: 'Pilih Tenor',
                polaLabel: 'Pola Angsuran',
                polaPlaceholder: 'Pilih Pola',
                calculateBtn: 'Hitung Simulasi',
            },
            results: {
                title: 'Hasil Simulasi Pembiayaan',
                plafond: 'PLAFOND',
                nisbah: 'NISBAH',
                anggota: 'Anggota',
                tamzis: 'Tamzis',
                angsuranBulan: 'ANGSURAN/BULAN',
                pokok: 'Pokok',
                bagiHasil: 'Bagi Hasil',
                total: 'Total',
                titipan: 'TITIPAN PER',
                note: 'Hasil simulasi bersifat indikatif. Realisasi bergantung pada kebijakan lembaga.',
                noteFull: '*Hasil simulasi ini merupakan estimasi awal. Perhitungan tepat akan disesuaikan dengan akad dan kebijakan kantor cabang.',
                waBtn: 'Ajukan Pembiayaan',
            },
            table: {
                title: 'Rincian Angsuran Bulanan',
                month: 'Bulan',
                pokok: 'Pokok',
                bagiHasil: 'Bagi Hasil',
                total: 'Total',
                saldoPokok: 'Saldo Pokok',
            },
            features: {
                title: 'Keunggulan Pembiayaan Mudharabah',
                items: [
                    'Pola angsuran fleksibel (Harian, Pasaran, Mingguan, Bulanan)',
                    'Bagi hasil sesuai nisbah yang disepakati',
                    'Sesuai prinsip syariah (DSN-MUI)',
                    'Proses mudah dan cepat',
                ],
            },
            error: 'Gagal menghitung simulasi. Silakan coba lagi.',
            loading: 'Menghitung...',
        },
        en: {
            title: 'Mudharabah Financing Simulation - TAMZIS Bina Utama',
            heading: 'Mudharabah Financing Simulation',
            breadcrumb: {
                home: 'Home',
                simulation: 'Simulation',
                current: 'Mudharabah',
            },
            form: {
                title: 'Mudharabah Financing Calculator',
                desc: 'Mudharabah financing simulation calculation with flexible installment patterns.',
                plafondLabel: 'Financing Plafond (Rp)',
                plafondPlaceholder: 'Example: 10,000,000',
                tenorLabel: 'Tenor',
                tenorPlaceholder: 'Select Tenor',
                polaLabel: 'Installment Pattern',
                polaPlaceholder: 'Select Pattern',
                calculateBtn: 'Calculate Simulation',
            },
            results: {
                title: 'Financing Simulation Results',
                plafond: 'PLAFOND',
                nisbah: 'NISBAH',
                anggota: 'Member',
                tamzis: 'Tamzis',
                angsuranBulan: 'MONTHLY INSTALLMENT',
                pokok: 'Principal',
                bagiHasil: 'Profit Share',
                total: 'Total',
                titipan: 'DEPOSIT PER',
                note: 'Simulation results are indicative. Realization depends on institutional policy.',
                noteFull: '*This simulation result is a preliminary estimate. The exact calculation will be adjusted according to the contract and branch office policy.',
                waBtn: 'Apply for Financing',
            },
            table: {
                title: 'Monthly Installment Details',
                month: 'Month',
                pokok: 'Principal',
                bagiHasil: 'Profit Share',
                total: 'Total',
                saldoPokok: 'Balance',
            },
            features: {
                title: 'Mudharabah Financing Advantages',
                items: [
                    'Flexible installment patterns (Daily, Pasaran, Weekly, Monthly)',
                    'Profit sharing according to agreed nisbah',
                    'Sharia-compliant (DSN-MUI)',
                    'Easy and fast process',
                ],
            },
            error: 'Failed to calculate simulation. Please try again.',
            loading: 'Calculating...',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    const [plafond, setPlafond] = useState<number>(0);
    const [tenor, setTenor] = useState<number>(0);
    const [polaAngsur, setPolaAngsur] = useState<string>('H');
    const [plafondInput, setPlafondInput] = useState<string>('');
    const [simulasiResult, setSimulasiResult] = useState<SimulasiResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = useCallback(async () => {
        if (plafond <= 0) {
            return;
        }

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
            plafond: plafond.toString(),
            jangkaWaktu: tenor.toString(),
            polaAngsur: polaAngsur,
        });

        const path = '/api/simulasi/mudharabah';

        try {
            const data = await fetchSimulation(path, params, controller.signal);

            if (data.status === false) {
                setError(data.message || t.error);
            } else {
                setSimulasiResult(data);
            }
        } catch (err) {
            if (!controller.signal.aborted) {
                setError(t.error);
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }

        return () => controller.abort();
    }, [plafond, tenor, polaAngsur, t.error]);

    useEffect(() => {
        if (plafond <= 0) {
return;
}

        const controller = new AbortController();
        let isMounted = true;

        const runCalculation = async () => {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                plafond: plafond.toString(),
                jangkaWaktu: tenor.toString(),
                polaAngsur: polaAngsur,
            });

            const path = '/api/simulasi/mudharabah';

            try {
                const data = await fetchSimulation(path, params, controller.signal);

                if (isMounted) {
                    if (data.status === false) {
                        setError(data.message || t.error);
                    } else {
                        setSimulasiResult(data);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(t.error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        runCalculation();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [plafond, tenor, polaAngsur, t.error]);

    const [hasSubmittedDataDiri, setHasSubmittedDataDiri] = useState(false);
    const [simulasiId, setSimulasiId] = useState<number | null>(null);
    const calculatorRef = React.useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        email: '',
        no_hp: '',
        jenis_simulasi: 'mudharabah',
        plafond: 0,
    });

    // Sinkronkan plafond terbaru ke form sebelum data diri dikirim
    useEffect(() => {
        setData('plafond', plafond);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plafond]);

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

    // Catat setiap perubahan plafond ke Administrator setelah data diri terkirim
    useEffect(() => {
        if (!hasSubmittedDataDiri || !simulasiId || plafond <= 0) {
            return;
        }

        const timeout = setTimeout(() => {
            const xsrfToken = decodeURIComponent(
                document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || '',
            );

            fetch(`/simulasi-simpanan/${simulasiId}/plafond`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ plafond }),
            }).catch(() => {
                // Gagal mencatat perubahan plafond tidak perlu mengganggu simulasi
            });
        }, 800);

        return () => clearTimeout(timeout);
    }, [plafond, hasSubmittedDataDiri, simulasiId]);

    const handleNumberChange = (
        value: string,
        setter: (n: number) => void,
        inputSetter: (s: string) => void,
    ) => {
        const raw = value.replace(/\D/g, '');
        const num = parseInt(raw) || 0;
        setter(num);
        inputSetter(formatNumberID(num));
    };

    const formatCurrency = (val: number) => formatCurrencyIDR(val);

    const result = simulasiResult?.result;
    const polaName = POLA_OPTIONS.find((p) => p.value === polaAngsur);

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/assets/img/header/Mudharabah.png')",
                        }}
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
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-12" suppressHydrationWarning>
                    <div className="flex flex-col gap-5 lg:grid lg:items-start lg:grid-cols-2">
                        <div className="space-y-5">
                            <div className="flex flex-col rounded-3xl border border-emerald-900/5 bg-white p-5 shadow-sm sm:p-6 lg:p-10">
                                <div className="mb-6 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                                    <div className="text-emerald-800">
                                        <Info className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {isEn ? 'Personal Information' : 'Informasi Data Diri'}
                                    </h2>
                                </div>
                                <p className="mb-6 text-sm font-medium text-gray-500">
                                    {isEn ? 'Please complete your personal information before running the simulation.' : 'Silakan lengkapi informasi data diri Anda sebelum melakukan simulasi.'}
                                </p>
                                <form onSubmit={submitDataDiri} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="mudharabah-nama">
                                            {isEn ? 'Full Name' : 'Nama Lengkap'}
                                        </Label>
                                        <Input
                                            id="mudharabah-nama"
                                            required
                                            value={data.nama_lengkap}
                                            onChange={(e) => setData('nama_lengkap', e.target.value)}
                                            placeholder={isEn ? 'Enter full name' : 'Masukkan nama lengkap'}
                                            disabled={hasSubmittedDataDiri || processing}
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                        {errors.nama_lengkap && (
                                            <span className="text-xs text-red-500">{errors.nama_lengkap}</span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="mudharabah-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="mudharabah-email"
                                            required
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder={isEn ? 'Enter email address' : 'Masukkan alamat email'}
                                            disabled={hasSubmittedDataDiri || processing}
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-red-500">{errors.email}</span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="mudharabah-nohp">
                                            {isEn ? 'Phone Number (WhatsApp)' : 'No HP (WhatsApp)'}
                                        </Label>
                                        <Input
                                            id="mudharabah-nohp"
                                            required
                                            type="tel"
                                            value={data.no_hp}
                                            onChange={(e) => setData('no_hp', e.target.value)}
                                            placeholder={isEn ? 'Example: 081234567890' : 'Contoh: 081234567890'}
                                            disabled={hasSubmittedDataDiri || processing}
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                        {errors.no_hp && (
                                            <span className="text-xs text-red-500">{errors.no_hp}</span>
                                        )}
                                    </div>
                                    {!hasSubmittedDataDiri && (
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-4 h-11 w-full rounded-md bg-emerald-600 text-sm font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
                                        >
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
                            <div
                                ref={calculatorRef}
                                className={`flex scroll-mt-24 flex-col rounded-3xl border border-emerald-900/5 bg-white p-5 shadow-sm transition-all sm:p-6 lg:p-10 ${!hasSubmittedDataDiri ? 'pointer-events-none blur-[2px] select-none' : ''}`}>
                                <div className="mb-6 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                                    <div className="text-emerald-800">
                                        <Calculator className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {t.form.title}
                                    </h2>
                                </div>

                                <p className="mb-8 text-sm leading-relaxed font-medium text-gray-500">
                                    {t.form.desc}
                                </p>

                                <div className="flex-1 space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="mudharabah-plafond">
                                            {t.form.plafondLabel}
                                        </Label>
                                        <div className="relative">
                                            <Wallet className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                id="mudharabah-plafond"
                                                value={plafondInput}
                                                onChange={(e) =>
                                                    handleNumberChange(e.target.value, setPlafond, setPlafondInput)
                                                }
                                                placeholder="0"
                                                className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="mudharabah-tenor">
                                            {t.form.tenorLabel}
                                        </Label>
                                        <div className="relative">
                                            <Clock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                id="mudharabah-tenor"
                                                type="number"
                                                min={1}
                                                max={MAX_TENOR}
                                                value={tenor === 0 ? '' : tenor}
                                                onChange={(e) => {
                                                    const raw = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                                                    setTenor(Math.min(raw, MAX_TENOR));
                                                }}
                                                placeholder={isEn ? `1-${MAX_TENOR} months` : `1-${MAX_TENOR} bulan`}
                                                className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="mudharabah-pola">
                                            {t.form.polaLabel}
                                        </Label>
                                        <div className="relative">
                                            <Select value={polaAngsur} onValueChange={(val) => setPolaAngsur(val)}>
                                                <SelectTrigger id="mudharabah-pola" className="h-11 border-slate-200 bg-slate-50/50 pl-4 font-bold text-emerald-900 transition-all focus:bg-white">
                                                    <SelectValue placeholder={t.form.polaPlaceholder} />
                                                </SelectTrigger>
                                                <SelectContent className="border-slate-200 bg-white">
                                                    {POLA_OPTIONS.map((p) => (
                                                        <SelectItem key={p.value} value={p.value} className="font-bold text-slate-700">
                                                            {isEn ? p.labelEn : p.label} ({p.value})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                        {error}
                                    </div>
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

                            <div className="rounded-2xl border border-emerald-900/5 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-emerald-700" />
                                    <h4 className="text-sm font-bold text-gray-800">
                                        {t.features.title}
                                    </h4>
                                </div>
                                <ul className="space-y-2">
                                    {t.features.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-2 text-xs font-medium text-gray-600"
                                        >
                                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="relative flex flex-col overflow-hidden rounded-3xl bg-[#004d26] p-5 text-white shadow-xl sm:p-6 lg:p-8 xl:p-10">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <TrendingUp className="h-40 w-40" />
                            </div>

                            <div className="relative z-10 flex-1">
                                <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold">
                                    {t.results.title}
                                </h3>

                                {loading && (
                                    <div className="flex items-center justify-center py-12">
                                        <LoaderCircle className="h-8 w-8 animate-spin text-emerald-300" />
                                        <span className="ml-3 text-sm text-emerald-300">{t.loading}</span>
                                    </div>
                                )}

                                {!loading && result && (
                                    <div className="space-y-6">
                                        <div>
                                    <div className="mb-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-emerald-400/70 uppercase">
                                        {t.results.plafond}
                                    </div>
                                    <div className="text-xl sm:text-2xl font-bold break-words">
                                        {formatCurrency(result.plafond)}
                                    </div>
                                </div>

                                        <div>
                                            <div className="mb-1 text-[10px] font-bold tracking-widest text-emerald-400/70 uppercase">
                                                {t.results.nisbah}
                                            </div>
                                            <div className="grid grid-cols-2 gap-1.5">
                                                <div className="min-w-0 rounded-lg bg-white/10 p-2 sm:p-3">
                                                    <span className="text-[10px] sm:text-xs text-emerald-300/70">{t.results.tamzis}</span>
                                                    <span className="ml-1 sm:ml-2 text-base sm:text-lg font-bold">{result.nisbah_tamzis}%</span>
                                                </div>
                                                <div className="min-w-0 rounded-lg bg-white/10 p-2 sm:p-3">
                                                    <span className="text-[10px] sm:text-xs text-emerald-300/70">{t.results.anggota}</span>
                                                    <span className="ml-1 sm:ml-2 text-base sm:text-lg font-bold">{result.nisbah_anggota}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {result.data.length > 0 && (
                                            <>
                                                <div>
                                                    <div className="mb-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-emerald-400/70 uppercase">
                                                    {t.results.angsuranBulan} ({isEn ? 'Month 1' : 'Bulan 1'})
                                                </div>
                                                <div className="grid grid-cols-3 gap-1 mt-2">
                                                    <div className="min-w-0 rounded-lg bg-white/10 p-1 text-center">
                                                        <div className="text-[7px] sm:text-[8px] text-emerald-300/60">{t.results.pokok}</div>
                                                        <div className="text-[10px] sm:text-xs md:text-sm font-bold break-words">{formatCurrency(result.data[0].angsuran_per_bulan.pokok)}</div>
                                                    </div>
                                                    <div className="min-w-0 rounded-lg bg-white/10 p-1 text-center">
                                                        <div className="text-[7px] sm:text-[8px] text-emerald-300/60">{t.results.bagiHasil}</div>
                                                        <div className="text-[10px] sm:text-xs md:text-sm font-bold text-emerald-300 break-words">{formatCurrency(result.data[0].angsuran_per_bulan.bagi_hasil)}</div>
                                                    </div>
                                                    <div className="min-w-0 rounded-lg bg-white/10 p-1 text-center">
                                                        <div className="text-[7px] sm:text-[8px] text-emerald-300/60">{t.results.total}</div>
                                                        <div className="text-[10px] sm:text-xs md:text-sm font-bold text-yellow-400 break-words">{formatCurrency(result.data[0].angsuran_per_bulan.total)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="mb-1 text-[9px] sm:text-[10px] font-bold tracking-widest text-emerald-400/70 uppercase">
                                                    {t.results.titipan} {polaName ? (isEn ? polaName.labelEn : polaName.label) : ''}
                                                </div>
                                                <div className="grid grid-cols-3 gap-1 mt-2">
                                                    <div className="min-w-0 rounded-lg bg-white/5 p-1 text-center">
                                                        <div className="text-[7px] sm:text-[8px] text-emerald-300/60">{t.results.pokok}</div>
                                                        <div className="text-[9px] sm:text-[10px] md:text-sm font-bold break-words">{formatCurrency(result.data[0].titipan.pokok)}</div>
                                                    </div>
                                                    <div className="min-w-0 rounded-lg bg-white/5 p-1 text-center">
                                                        <div className="text-[7px] sm:text-[8px] text-emerald-300/60">{t.results.bagiHasil}</div>
                                                        <div className="text-[9px] sm:text-[10px] md:text-sm font-bold text-emerald-300 break-words">{formatCurrency(result.data[0].titipan.bagi_hasil)}</div>
                                                    </div>
                                                    <div className="min-w-0 rounded-lg bg-white/5 p-1 text-center">
                                                        <div className="text-[7px] sm:text-[8px] text-emerald-300/60">{t.results.total}</div>
                                                        <div className="text-[9px] sm:text-[10px] md:text-sm font-bold break-words">{formatCurrency(result.data[0].titipan.total)}</div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {!loading && !result && !error && (
                                    <div className="flex items-center justify-center py-12 text-emerald-300/50 text-sm">
                                        {isEn ? 'Set parameters and results will appear here' : 'Atur parameter dan hasil akan tampil di sini'}
                                    </div>
                                )}

                                {!loading && error && (
                                    <div className="flex items-center justify-center py-12 text-red-300 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="mt-8">
                                    <p className="text-[10px] leading-relaxed text-white/50 italic">
                                        {t.results.note}
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/628112613134"
                                target="_blank"
                                rel="noreferrer"
                                className="relative z-10 mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#25d366] text-sm font-bold text-white shadow-lg shadow-green-900/40 transition-all hover:bg-[#20ba5a]"
                            >
                                {t.results.waBtn}
                            </a>
                        </div>
                    </div>

                    {result && result.data.length > 0 && (
                        <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-900/5 bg-white shadow-sm">
                            <div className="border-b border-emerald-900/5 p-4 sm:p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {t.table.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                    {isEn ? 'Pattern' : 'Pola'}: {polaName ? (isEn ? polaName.labelEn : polaName.label) : ''} | {t.results.plafond}: {formatCurrency(result.plafond)}
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs sm:text-sm">
                                    <thead>
                                        <tr className="border-b border-emerald-900/5 bg-emerald-50/50">
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[8px] sm:text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.month}
                                            </th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[8px] sm:text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.pokok}
                                            </th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[8px] sm:text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.bagiHasil}
                                            </th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[8px] sm:text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.total}
                                            </th>
                                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[8px] sm:text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.saldoPokok}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.data.map((row) => (
                                            <tr
                                                key={row.bulan_ke}
                                                className="border-b border-emerald-900/5 transition-colors hover:bg-emerald-50/30"
                                            >
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold text-emerald-900">
                                                    {row.bulan_ke}
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-medium text-gray-700">
                                                    {formatCurrency(row.angsuran_per_bulan.pokok)}
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-bold text-emerald-700">
                                                    {formatCurrency(row.angsuran_per_bulan.bagi_hasil)}
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-bold text-emerald-800">
                                                    {formatCurrency(row.angsuran_per_bulan.total)}
                                                </td>
                                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-medium text-gray-600">
                                                    {formatCurrency(row.saldo_pokok)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-20">
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
                        <Info className="h-5 w-5 shrink-0 text-emerald-600" />
                        <p className="text-xs leading-relaxed font-medium text-emerald-700">
                            {t.results.noteFull}
                        </p>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
