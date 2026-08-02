import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    ChevronRight,
    Info,
    Plane,
    Wallet,
    Calendar,
    BadgeCheck,
    LoaderCircle,
    Lock,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSimulasiPlafondTracker } from '@/hooks/use-simulasi-plafond-tracker';
import { fetchSimulation } from '@/lib/simulation-api';
import { formatCurrencyIDR, formatNumberID } from '@/lib/utils';

const MIN_SETOR = 5000000;
const MAX_SETOR = 15000000;
const MIN_TENOR = 6;
const MAX_TENOR = 36;

type HajiResult = {
    porsiHaji: number;
    ujrah: number;
    plafond: number;
    setor_pertama: number;
    total_piutang: number;
    pola_angsur: string;
    angsuran: number;
    jangka_waktu: number;
    data: {
        angsuran_ke: number;
        angsuran: { pokok: number; ujrah: number; total: number };
        saldo: { pokok: number; ujrah: number; total: number };
    }[];
};

export default function SimulasiHaji() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const translations = {
        id: {
            title: 'Simulasi Porsi Haji - TAMZIS Bina Utama',
            heading: 'Simulasi Pembiayaan Porsi Haji',
            breadcrumb: {
                home: 'Beranda',
                financing: 'Pembiayaan',
                current: 'Porsi Haji',
            },
            form: {
                title: 'Kalkulator Porsi Haji',
                desc: 'Hitung estimasi angsuran pembiayaan Porsi Haji. Porsi haji tetap Rp 25.000.000 dan ujrah tetap Rp 9.000.000.',
                setorLabel: 'Setoran Pertama (Rp)',
                setorHint: `Antara ${formatNumberID(MIN_SETOR)} hingga ${formatNumberID(MAX_SETOR)}`,
                tenorLabel: 'Jangka Waktu (Bulan)',
                tenorPlaceholder: `${MIN_TENOR}-${MAX_TENOR} bulan`,
            },
            results: {
                title: 'Hasil Simulasi',
                angsuranBulan: 'ANGSURAN/BULAN',
                porsiHaji: 'Porsi Haji',
                ujrah: 'Ujrah',
                plafond: 'Plafond',
                setorPertama: 'Setoran Pertama',
                totalPiutang: 'Total Piutang',
                jangkaWaktu: 'Jangka Waktu',
                bulan: 'Bulan',
                note: '*Hasil simulasi bersifat indikatif. Realisasi bergantung pada kebijakan lembaga.',
                waBtn: 'Konsultasi Porsi Haji',
            },
            table: {
                title: 'Rincian Angsuran Bulanan',
                bulan: 'Bulan',
                angsuran: 'Angsuran',
                saldo: 'Saldo Pembiayaan',
            },
            milestones: {
                title: 'Tahapan Dana Haji',
                portion: 'Porsi Awal (SISKOHAT)',
                portionAmount: 'Rp 25.000.000',
                bipih: 'Pelunasan BPIH',
                bipihAmount: '± Rp 40-50 Juta',
            },
            disclaimer:
                'Pendaftaran porsi Haji dilakukan melalui SISKOHAT setelah dana minimal porsi tercapai. Biaya Haji ditentukan pemerintah setiap tahun dan dapat berubah. Tim TAMZIS siap mendampingi proses administrasi Anda.',
            error: 'Gagal menghitung simulasi. Silakan coba lagi.',
            loading: 'Menghitung...',
        },
        en: {
            title: 'Hajj Portion Simulation - TAMZIS Bina Utama',
            heading: 'Hajj Portion Financing Simulation',
            breadcrumb: {
                home: 'Home',
                financing: 'Financing',
                current: 'Hajj Portion',
            },
            form: {
                title: 'Hajj Portion Calculator',
                desc: 'Calculate the estimated installment for Hajj Portion financing. Hajj portion is fixed at Rp 25,000,000 and fee is fixed at Rp 9,000,000.',
                setorLabel: 'First Deposit (Rp)',
                setorHint: `Between ${formatNumberID(MIN_SETOR)} and ${formatNumberID(MAX_SETOR)}`,
                tenorLabel: 'Period (Months)',
                tenorPlaceholder: `${MIN_TENOR}-${MAX_TENOR} months`,
            },
            results: {
                title: 'Simulation Results',
                angsuranBulan: 'MONTHLY INSTALLMENT',
                porsiHaji: 'Hajj Portion',
                ujrah: 'Fee',
                plafond: 'Plafond',
                setorPertama: 'First Deposit',
                totalPiutang: 'Total Receivable',
                jangkaWaktu: 'Period',
                bulan: 'Months',
                note: 'Simulation results are indicative. Realization depends on institutional policy.',
                waBtn: 'Consult Hajj Portion',
            },
            table: {
                title: 'Monthly Installment Details',
                bulan: 'Month',
                angsuran: 'Installment',
                saldo: 'Remaining Balance',
            },
            milestones: {
                title: 'Hajj Fund Stages',
                portion: 'Initial Portion (SISKOHAT)',
                portionAmount: 'Rp 25,000,000',
                bipih: 'BPIH Settlement',
                bipihAmount: '± Rp 40-50 Million',
            },
            disclaimer:
                'Hajj portion registration is done through SISKOHAT after the minimum portion fund is reached. Hajj costs are determined by the government annually and may change. The TAMZIS team is ready to assist your administrative process.',
            error: 'Failed to calculate simulation. Please try again.',
            loading: 'Calculating...',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    const [setorPertama, setSetorPertama] = useState<number>(0);
    const [setorInput, setSetorInput] = useState<string>('');
    const [tenor, setTenor] = useState<number>(0);
    const [simulasiResult, setSimulasiResult] = useState<HajiResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAbortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (setorPertama <= 0 && tenor <= 0) {
            return;
        }

        if (fetchAbortRef.current) {
            fetchAbortRef.current.abort();
        }

        const controller = new AbortController();
        fetchAbortRef.current = controller;
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();

            if (setorPertama > 0) {
                params.set('setorPertama', setorPertama.toString());
            }

            if (tenor > 0) {
                params.set('jangkaWaktu', tenor.toString());
            }

            try {
                const data = await fetchSimulation('/api/simulasi/haji', params, controller.signal);

                if (isMounted) {
                    if (data.status === false) {
                        setError(data.message || t.error);
                        setSimulasiResult(null);
                    } else {
                        setSimulasiResult(data.result ?? null);
                    }
                }
            } catch {
                if (isMounted) {
                    setError(t.error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [setorPertama, tenor, t.error]);

    const [hasSubmittedDataDiri, setHasSubmittedDataDiri] = useState(false);
    const [simulasiId, setSimulasiId] = useState<number | null>(null);
    const calculatorRef = React.useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        email: '',
        no_hp: '',
        jenis_simulasi: 'haji',
        plafond: 0,
    });

    // Sinkronkan setoran terbaru ke form sebelum data diri dikirim
    useEffect(() => {
        setData('plafond', setorPertama);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setorPertama]);

    // Catat setiap perubahan plafond ke Administrator setelah data diri terkirim
    useSimulasiPlafondTracker(setorPertama, hasSubmittedDataDiri, simulasiId);

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

    const handleSetorChange = (value: string) => {
        const raw = value.replace(/\D/g, '');
        const num = parseInt(raw) || 0;
        setSetorPertama(num);
        setSetorInput(formatNumberID(num));
    };

    const formatCurrency = (val: number) => formatCurrencyIDR(val);

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                {/* Page Title */}
                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/Pembiayaan Umroh.jpg')",
                        }}
                    />

                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase drop-shadow-md sm:text-4xl">
                            {t.heading}
                        </h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/50 uppercase">
                            <Link
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                {t.breadcrumb.home}
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <span>{t.breadcrumb.financing}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12" suppressHydrationWarning>
                    <div className="flex flex-col gap-8 lg:grid lg:items-start lg:grid-cols-2">
                        {/* Form Column */}
                        <div className="space-y-6">
                            {/* Form Data Diri */}
                            <div className="flex flex-col rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm sm:p-10">
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

                                <form
                                    onSubmit={submitDataDiri}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="haji-nama">
                                            {isEn ? 'Full Name' : 'Nama Lengkap'}
                                        </Label>
                                        <Input
                                            id="haji-nama"
                                            required
                                            value={data.nama_lengkap}
                                            onChange={(e) =>
                                                setData(
                                                    'nama_lengkap',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={isEn ? 'Enter full name' : 'Masukkan nama lengkap'}
                                            disabled={
                                                hasSubmittedDataDiri ||
                                                processing
                                            }
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                        {errors.nama_lengkap && (
                                            <span className="text-xs text-red-500">
                                                {errors.nama_lengkap}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="haji-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="haji-email"
                                            required
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            placeholder={isEn ? 'Enter email address' : 'Masukkan alamat email'}
                                            disabled={
                                                hasSubmittedDataDiri ||
                                                processing
                                            }
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-red-500">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="haji-nohp">
                                            {isEn ? 'Phone Number (WhatsApp)' : 'No HP (WhatsApp)'}
                                        </Label>
                                        <Input
                                            id="haji-nohp"
                                            required
                                            type="tel"
                                            value={data.no_hp}
                                            onChange={(e) =>
                                                setData('no_hp', e.target.value)
                                            }
                                            placeholder={isEn ? 'Example: 081234567890' : 'Contoh: 081234567890'}
                                            disabled={
                                                hasSubmittedDataDiri ||
                                                processing
                                            }
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                        {errors.no_hp && (
                                            <span className="text-xs text-red-500">
                                                {errors.no_hp}
                                            </span>
                                        )}
                                    </div>
                                    {!hasSubmittedDataDiri && (
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-4 h-11 w-full rounded-md bg-emerald-600 text-sm font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
                                        >
                                            {processing
                                                ? (isEn ? 'Saving...' : 'Menyimpan...')
                                                : (isEn ? 'Continue to Simulation' : 'Lanjutkan ke Simulasi')}
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
                                className={`flex scroll-mt-24 flex-col rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm transition-all sm:p-10 ${!hasSubmittedDataDiri ? 'pointer-events-none blur-[2px] select-none' : ''}`}
                            >
                                <div className="mb-6 flex items-center gap-3 border-b border-emerald-900/5 pb-4">
                                    <div className="text-emerald-800">
                                        <Plane className="h-6 w-6" />
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
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="haji-setor">
                                            {t.form.setorLabel}
                                        </Label>
                                        <div className="relative">
                                            <Wallet className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                id="haji-setor"
                                                value={setorInput}
                                                onChange={(e) => handleSetorChange(e.target.value)}
                                                placeholder="5.000.000"
                                                className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white"
                                            />
                                        </div>
                                        <p className="text-[10px] font-medium text-emerald-600">
                                            {t.form.setorHint}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700" htmlFor="haji-tenor">
                                            {t.form.tenorLabel}
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                id="haji-tenor"
                                                type="number"
                                                min={MIN_TENOR}
                                                max={MAX_TENOR}
                                                value={tenor === 0 ? '' : tenor}
                                                onChange={(e) => {
                                                    const raw = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                                                    setTenor(Math.min(raw, MAX_TENOR));
                                                }}
                                                placeholder={t.form.tenorPlaceholder}
                                                className="h-11 border-slate-200 bg-slate-50/50 pl-10 font-bold text-emerald-900 transition-all focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {loading && (
                                        <div className="flex items-center justify-center py-4">
                                            <LoaderCircle className="h-5 w-5 animate-spin text-emerald-600" />
                                            <span className="ml-2 text-sm text-emerald-600">{t.loading}</span>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}
                                </div>
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

                            {/* Milestones */}
                            <div className="rounded-2xl border border-emerald-900/5 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-2">
                                    <BadgeCheck className="h-5 w-5 text-emerald-700" />
                                    <h4 className="text-sm font-bold text-gray-800">
                                        {t.milestones.title}
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-emerald-900/5 py-2">
                                        <span className="text-xs font-medium text-gray-600">
                                            {t.milestones.portion}
                                        </span>
                                        <span className="text-xs font-bold text-emerald-800">
                                            {t.milestones.portionAmount}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-xs font-medium text-gray-600">
                                            {t.milestones.bipih}
                                        </span>
                                        <span className="text-xs font-bold text-emerald-800">
                                            {t.milestones.bipihAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Result Column */}
                        <div className="relative flex flex-col overflow-hidden rounded-3xl bg-[#004d26] p-8 text-white shadow-xl sm:p-10">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Plane className="h-40 w-40" />
                            </div>

                            <div className="relative z-10 flex-1">
                                <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold">
                                    {t.results.title}
                                </h3>

                                {!loading && simulasiResult && (
                                    <div className="space-y-5">
                                        <div>
                                            <div className="mb-1 text-[10px] font-bold tracking-widest text-emerald-400/70 uppercase">
                                                {t.results.angsuranBulan}
                                            </div>
                                            <div className="text-2xl font-bold text-yellow-400 sm:text-4xl">
                                                {formatCurrency(simulasiResult.angsuran)}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                                <div className="text-[9px] text-emerald-300/60">{t.results.porsiHaji}</div>
                                                <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(simulasiResult.porsiHaji)}</div>
                                            </div>
                                            <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                                <div className="text-[9px] text-emerald-300/60">{t.results.ujrah}</div>
                                                <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(simulasiResult.ujrah)}</div>
                                            </div>
                                            <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                                <div className="text-[9px] text-emerald-300/60">{t.results.plafond}</div>
                                                <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(simulasiResult.plafond)}</div>
                                            </div>
                                            <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                                <div className="text-[9px] text-emerald-300/60">{t.results.setorPertama}</div>
                                                <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(simulasiResult.setor_pertama)}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                                <div className="text-[9px] text-emerald-300/60">{t.results.totalPiutang}</div>
                                                <div className="break-words text-[11px] font-bold sm:text-sm">{formatCurrency(simulasiResult.total_piutang)}</div>
                                            </div>
                                            <div className="min-w-0 rounded-lg bg-white/10 p-3">
                                                <div className="text-[9px] text-emerald-300/60">{t.results.jangkaWaktu}</div>
                                                <div className="break-words text-[11px] font-bold sm:text-sm">{simulasiResult.jangka_waktu} {t.results.bulan}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!loading && !simulasiResult && !error && (
                                    <div className="flex items-center justify-center py-12 text-sm text-emerald-300/50">
                                        {isEn ? 'Set parameters and results will appear here' : 'Atur parameter dan hasil akan tampil di sini'}
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

                    {simulasiResult && simulasiResult.data.length > 0 && (
                        <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-900/5 bg-white shadow-sm">
                            <div className="border-b border-emerald-900/5 p-6 sm:p-8">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {t.table.title}
                                </h3>
                            </div>
                            <div className="max-h-[500px] overflow-x-auto overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-emerald-50/95">
                                        <tr className="border-b border-emerald-900/5">
                                            <th className="px-4 py-3 text-left text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.bulan}
                                            </th>
                                            <th className="px-4 py-3 text-right text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.angsuran}
                                            </th>
                                            <th className="px-4 py-3 text-right text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.saldo}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {simulasiResult.data.map((row) => (
                                            <tr
                                                key={row.angsuran_ke}
                                                className="border-b border-emerald-900/5 transition-colors hover:bg-emerald-50/30"
                                            >
                                                <td className="px-4 py-2.5 font-bold text-emerald-900">
                                                    {row.angsuran_ke}
                                                </td>
                                                <td className="px-4 py-2.5 text-right font-bold text-emerald-700">
                                                    {formatCurrency(row.angsuran.total)}
                                                </td>
                                                <td className="px-4 py-2.5 text-right font-medium text-gray-600">
                                                    {formatCurrency(row.saldo.total)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Disclaimer */}
                <div className="mx-auto max-w-7xl px-6 pb-12 sm:pb-20">
                    <div className="flex gap-4 rounded-md border border-emerald-100 bg-emerald-50 p-6">
                        <Info className="h-6 w-6 shrink-0 text-emerald-600" />
                        <p className="text-xs leading-relaxed font-bold text-emerald-800">
                            {t.disclaimer}
                        </p>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
