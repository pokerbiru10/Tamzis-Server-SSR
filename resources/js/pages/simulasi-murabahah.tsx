import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    ChevronRight,
    Calculator,
    Phone,
    Wallet,
    Info,
    Lock,
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { useSimulasiPlafondTracker } from '@/hooks/use-simulasi-plafond-tracker';
import { fetchSimulation } from '@/lib/simulation-api';
import { formatCurrencyIDR, formatNumberID } from '@/lib/utils';

interface SimulasiResult {
    harga_beli: number;
    margin: number;
    harga_jual: number;
    uang_muka: number;
    harga_angsur: number;
    pola_angsur: string;
    jangka_waktu: number;
    data: {
        angsuran_ke: number;
        angsuran: { pokok: number; margin: number; total: number };
        saldo: { pokok: number; margin: number; total: number };
    }[];
}

const MAX_TENOR = 60;
const POLA_ANGSUR_DEFAULT = 'B';

export default function SimulasiMurabahah() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    // State for calculator
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState('');
    const [tenor, setTenor] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [downPaymentInput, setDownPaymentInput] = useState('');
    const [simulasiResult, setSimulasiResult] = useState<SimulasiResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAbortRef = useRef<AbortController | null>(null);

    // Uang muka tidak boleh melebihi harga beli agar hasil tidak minus
    useEffect(() => {
        if (amount > 0 && downPayment > amount) {
            setDownPayment(amount);
            setDownPaymentInput(formatNumberID(amount));
        }
    }, [amount, downPayment]);

    const handleNumberChange = (
        value: string,
        setter: (n: number) => void,
        inputSetter: (s: string) => void,
        maxValue?: number,
    ) => {
        const raw = value.replace(/\D/g, '');
        let num = parseInt(raw) || 0;

        if (maxValue && maxValue > 0) {
            num = Math.min(num, maxValue);
        }

        setter(num);
        inputSetter(num === 0 ? '' : formatNumberID(num));
    };

    useEffect(() => {
        if (amount <= 0) {
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

            const params = new URLSearchParams({
                hargaBeli: amount.toString(),
                jangkaWaktu: tenor.toString(),
                uangMuka: Math.min(downPayment, amount).toString(),
                polaAngsur: POLA_ANGSUR_DEFAULT,
            });

            const path = '/api/simulasi/murobahah';

            try {
                const data = await fetchSimulation(path, params, controller.signal);

                if (isMounted) {
                    if (data.status === false) {
                        setError(data.message || (isEn ? 'Failed to calculate simulation' : 'Gagal menghitung simulasi'));
                    } else {
                        setSimulasiResult(data.result ?? null);
                    }
                }
            } catch {
                if (isMounted) {
                    setError(isEn ? 'Failed to connect to server' : 'Gagal menghubungi server');
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
    }, [amount, tenor, downPayment]);

    const [hasSubmittedDataDiri, setHasSubmittedDataDiri] = useState(false);
    const [simulasiId, setSimulasiId] = useState<number | null>(null);
    const calculatorRef = React.useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        email: '',
        no_hp: '',
        jenis_simulasi: 'murabahah',
        plafond: 0,
    });

    // Sinkronkan harga beli terbaru ke form sebelum data diri dikirim
    useEffect(() => {
        setData('plafond', amount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount]);

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
    useSimulasiPlafondTracker(amount, hasSubmittedDataDiri, simulasiId);

    const formatIdr = (val: number) => formatCurrencyIDR(val);

    const translations = {
        id: {
            title: 'Simulasi Murabahah - TAMZIS Bina Utama',
            heading: 'Kalkulator Simulasi Murabahah',
            breadcrumb: {
                home: 'Beranda',
                financing: 'Pembiayaan',
                current: 'Simulasi Murabahah',
            },
            calculator: {
                amountLabel: 'Harga Beli Objek Pembiayaan',
                tenorLabel: 'Jangka Waktu (Bulan)',
                tenorPlaceholder: `1-${MAX_TENOR} bulan`,
                downPaymentLabel: 'Uang Muka',
                resultLabel: 'Estimasi Angsuran per Bulan',
                note: '*Hasil simulasi ini merupakan estimasi awal. Perhitungan tepat akan disesuaikan dengan akad dan kebijakan kantor cabang.',
            },
            cta: 'Konsultasikan Sekarang',
            result: {
                purchasePrice: 'Harga Barang',
                margin: 'Margin',
                downPayment: 'Uang Muka',
                plafond: 'Plafond Pembiayaan',
            },
            table: {
                title: 'Rincian Angsuran Bulanan',
                month: 'Bulan',
                angsuran: 'Angsuran',
                saldo: 'Saldo Pembiayaan',
            },
        },
        en: {
            title: 'Murabahah Simulation - TAMZIS Bina Utama',
            heading: 'Murabahah Simulation Calculator',
            breadcrumb: {
                home: 'Home',
                financing: 'Financing',
                current: 'Murabahah Simulation',
            },
            calculator: {
                amountLabel: 'Purchase Price',
                tenorLabel: 'Period (Months)',
                tenorPlaceholder: `1-${MAX_TENOR} months`,
                downPaymentLabel: 'Down Payment',
                resultLabel: 'Estimated Monthly Installment',
                note: '*This simulation result is an initial estimate. Precise calculations will be adjusted according to the contract and branch office policies.',
            },
            cta: 'Consult Now',
            result: {
                purchasePrice: 'Item Price',
                margin: 'Margin',
                downPayment: 'Down Payment',
                plafond: 'Financing Plafond',
            },
            table: {
                title: 'Monthly Installment Details',
                month: 'Month',
                angsuran: 'Installment',
                saldo: 'Remaining Balance',
            },
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    const monthlyInstallment = Math.max(
        0,
        simulasiResult?.data?.[0]?.angsuran.total ?? 0,
    );
    const downPaymentPercent = simulasiResult && simulasiResult.harga_beli > 0
        ? Math.min(
              100,
              Math.round(
                  (simulasiResult.uang_muka / simulasiResult.harga_beli) * 100,
              ),
          )
        : 0;

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
                                "url('/assets/img/header/Murabahah.jpg')",
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

                <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
                    <div className="grid items-start gap-12 lg:grid-cols-2">
                        {/* Calculator Card */}
                        <div className="space-y-6">
                            {/* Form Data Diri */}
                            <div className="rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-xl sm:p-10">
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
                                        <label htmlFor="murabahah-nama" className="text-sm font-bold text-gray-700">
                                            {isEn ? 'Full Name' : 'Nama Lengkap'}
                                        </label>
                                        <input
                                            id="murabahah-nama"
                                            name="murabahah-nama"
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
                                            className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                                        />
                                        {errors.nama_lengkap && (
                                            <span className="text-xs text-red-500">
                                                {errors.nama_lengkap}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="murabahah-email" className="text-sm font-bold text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            id="murabahah-email"
                                            name="murabahah-email"
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
                                            className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-red-500">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="murabahah-nohp" className="text-sm font-bold text-gray-700">
                                            {isEn ? 'Phone Number (WhatsApp)' : 'No HP (WhatsApp)'}
                                        </label>
                                        <input
                                            id="murabahah-nohp"
                                            name="murabahah-nohp"
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
                                            className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
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
                                className={`scroll-mt-24 rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-xl transition-all sm:p-10 ${!hasSubmittedDataDiri ? 'pointer-events-none blur-[2px] select-none' : ''}`}
                            >
                                <div className="mb-8 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                        <Calculator className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-emerald-950">
                                        {isEn ? 'Calculator' : 'Kalkulator'}
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="murabahah-amount" className="mb-3 block text-sm font-bold text-emerald-950">
                                            {t.calculator.amountLabel}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-emerald-900/40">
                                                Rp
                                            </div>
                                            <input
                                                id="murabahah-amount"
                                                name="murabahah-amount"
                                                type="text"
                                                inputMode="numeric"
                                                value={amountInput}
                                                onChange={(e) =>
                                                    handleNumberChange(
                                                        e.target.value,
                                                        setAmount,
                                                        setAmountInput,
                                                    )
                                                }
                                                placeholder="0"
                                                className="w-full rounded-xl border border-emerald-900/10 py-4 pr-4 pl-12 font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>
                                        <input
                                            id="murabahah-amount-range"
                                            name="murabahah-amount-range"
                                            type="range"
                                            min="1000000"
                                            max="1000000000"
                                            step="1000000"
                                            value={amount}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setAmount(val);
                                                setAmountInput(val === 0 ? '' : formatNumberID(val));
                                            }}
                                            className="mt-4 w-full accent-emerald-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="murabahah-downpayment" className="mb-3 block text-sm font-bold text-emerald-950">
                                            {t.calculator.downPaymentLabel}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-emerald-900/40">
                                                Rp
                                            </div>
                                            <input
                                                id="murabahah-downpayment"
                                                name="murabahah-downpayment"
                                                type="text"
                                                    inputMode="numeric"
                                                    value={downPaymentInput}
                                                    onChange={(e) =>
                                                        handleNumberChange(
                                                            e.target.value,
                                                            setDownPayment,
                                                            setDownPaymentInput,
                                                            amount,
                                                        )
                                                    }
                                                    placeholder="0"
                                                    className="w-full rounded-xl border border-emerald-900/10 py-4 pr-4 pl-12 font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="murabahah-tenor" className="mb-3 block text-sm font-bold text-emerald-950">
                                            {t.calculator.tenorLabel}
                                        </label>
                                        <input
                                            id="murabahah-tenor"
                                            name="murabahah-tenor"
                                            type="number"
                                            min={1}
                                            max={MAX_TENOR}
                                            value={tenor === 0 ? '' : tenor}
                                            onChange={(e) => {
                                                const raw = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                                                setTenor(Math.min(raw, MAX_TENOR));
                                            }}
                                            placeholder={t.calculator.tenorPlaceholder}
                                            className="w-full rounded-xl border border-emerald-900/10 py-4 px-4 font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {loading && (
                                        <div className="flex items-center justify-center py-4">
                                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                                            <span className="ml-2 text-sm text-emerald-600">
                                                {isEn ? 'Calculating...' : 'Menghitung...'}
                                            </span>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                        <p className="text-[11px] leading-relaxed font-semibold text-emerald-900/70">
                                            {t.calculator.note}
                                        </p>
                                    </div>
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
                        </div>

                        {/* Result Card */}
                        <div className="space-y-6">
                            <div className="relative overflow-hidden rounded-3xl bg-emerald-800 p-6 text-white shadow-2xl sm:p-10">
                                <div className="relative z-10">
                                    <div className="text-center">
                                        <h4 className="mb-4 text-xs font-bold tracking-widest text-emerald-300/80 uppercase">
                                            {t.calculator.resultLabel}
                                        </h4>
                                        <div className="mb-8 text-2xl font-black break-words tracking-tighter text-white sm:text-4xl">
                                            {formatIdr(monthlyInstallment)}
                                        </div>
                                    </div>

                                    <div className="mb-6 h-px w-full bg-white/10" />

                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs sm:text-sm">
                                            <span className="font-medium text-emerald-300/70">
                                                {t.result.purchasePrice} :
                                            </span>
                                            <span className="font-bold break-words text-white">
                                                {formatIdr(simulasiResult?.harga_beli ?? 0)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs sm:text-sm">
                                            <span className="font-medium text-emerald-300/70">
                                                {t.result.margin} :
                                            </span>
                                            <span className="font-bold break-words text-white">
                                                {formatIdr(simulasiResult?.margin ?? 0)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs sm:text-sm">
                                            <span className="font-medium text-emerald-300/70">
                                                {t.result.downPayment} :
                                            </span>
                                            <span className="font-bold text-white">
                                                {downPaymentPercent}%
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs sm:text-sm">
                                            <span className="font-medium text-emerald-300/70">
                                                {t.result.plafond} :
                                            </span>
                                            <span className="font-bold break-words text-white">
                                                {formatIdr(Math.max(0, simulasiResult?.harga_angsur ?? 0))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Wallet className="absolute -right-10 -bottom-10 h-48 w-48 text-white opacity-5" />
                            </div>

                            <div className="rounded-3xl border border-emerald-900/5 bg-white p-8 shadow-sm">
                                <h4 className="mb-6 text-base font-bold text-emerald-950">
                                    {isEn
                                        ? 'Ready to move forward?'
                                        : 'Siap melangkah bersama?'}
                                </h4>
                                <a
                                    href={`https://wa.me/628112613134?text=${encodeURIComponent(
                                        isEn
                                            ? 'Hello TAMZIS, I have tried the financing simulation and am interested in further consultation.'
                                            : 'Halo TAMZIS, saya sudah mencoba simulasi pembiayaan dan tertarik untuk konsultasi lebih lanjut.',
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 text-sm font-black text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    <Phone className="h-5 w-5" />
                                    {t.cta}
                                </a>
                            </div>
                        </div>
                    </div>

                    {simulasiResult && simulasiResult.data.length > 0 && (
                        <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-900/5 bg-white shadow-sm">
                            <div className="border-b border-emerald-900/5 p-6 sm:p-8">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {t.table.title}
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-emerald-900/5 bg-emerald-50/50">
                                            <th className="px-4 py-3 text-left text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                                                {t.table.month}
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
                                                <td className="px-4 py-3 font-bold text-emerald-900">
                                                    {row.angsuran_ke}
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-emerald-700">
                                                    {formatIdr(Math.max(0, row.angsuran.total))}
                                                </td>
                                                <td className="px-4 py-3 text-right font-medium text-gray-600">
                                                    {formatIdr(Math.max(0, row.saldo.total))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
