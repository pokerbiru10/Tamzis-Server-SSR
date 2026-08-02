import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    ChevronRight,
    Calculator,
    Phone,
    Wallet,
    Info,
    Lock,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { formatCurrencyIDR } from '@/lib/utils';

export default function SimulasiPembiayaan() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // State for calculator
    const [amount, setAmount] = useState(10000000);
    const [tenor, setTenor] = useState(12);
    const margin = 1.5; // per month

    const totalMargin = (amount * margin * tenor) / 100;
    const totalPayment = amount + totalMargin;
    const installment = Math.round(totalPayment / tenor);

    const [hasSubmittedDataDiri, setHasSubmittedDataDiri] = useState(false);
    const calculatorRef = React.useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        email: '',
        no_hp: '',
        jenis_simulasi: 'pembiayaan',
    });

    const submitDataDiri = (e: React.FormEvent) => {
        e.preventDefault();
        post('/simulasi-simpanan', {
            preserveScroll: true,
            onSuccess: () => {
                setHasSubmittedDataDiri(true);

                if (calculatorRef.current) {
                    calculatorRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            },
        });
    };

    const formatIdr = (val: number) => formatCurrencyIDR(val);

    const translations = {
        id: {
            title: 'Simulasi Pembiayaan - TAMZIS Bina Utama',
            heading: 'Kalkulator Simulasi Pembiayaan',
            breadcrumb: {
                home: 'Beranda',
                financing: 'Pembiayaan',
                current: 'Simulasi',
            },
            calculator: {
                amountLabel: 'Jumlah Pembiayaan',
                tenorLabel: 'Jangka Waktu (Bulan)',
                marginLabel: 'Estimasi Margin per Bulan (%)',
                resultLabel: 'Estimasi Angsuran per Bulan',
                note: '*Hasil simulasi ini merupakan estimasi awal. Perhitungan tepat akan disesuaikan dengan akad dan kebijakan kantor cabang.',
            },
            result: {
                totalMargin: 'Total Margin',
                sellingPrice: 'Harga Jual',
                tenor: 'Tenor',
            },
            cta: 'Konsultasikan Sekarang',
        },
        en: {
            title: 'Financing Simulation - TAMZIS Bina Utama',
            heading: 'Financing Simulation Calculator',
            breadcrumb: {
                home: 'Home',
                financing: 'Financing',
                current: 'Simulation',
            },
            calculator: {
                amountLabel: 'Financing Amount',
                tenorLabel: 'Period (Months)',
                marginLabel: 'Estimated Monthly Margin (%)',
                resultLabel: 'Estimated Monthly Installment',
                note: '*This simulation result is an initial estimate. Precise calculations will be adjusted according to the contract and branch office policies.',
            },
            result: {
                totalMargin: 'Total Margin',
                sellingPrice: 'Selling Price',
                tenor: 'Tenor',
            },
            cta: 'Consult Now',
        },
    };

    const t =
        translations[locale as keyof typeof translations] || translations.id;

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                {/* Page Title */}
                <div className="border-b border-white/5 bg-emerald-900 py-10 text-center text-white sm:py-14">
                    <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase sm:text-4xl">
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

                <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-12 lg:py-16">
                    <div className="grid items-start gap-6 lg:gap-12 lg:grid-cols-2">
                        {/* Calculator Card */}
                        <div className="space-y-6">
                            {/* Form Data Diri */}
                            <div className="rounded-3xl border border-emerald-900/5 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
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
                                        <label htmlFor="pembiayaan-nama" className="text-sm font-bold text-gray-700">
                                            {isEn ? 'Full Name' : 'Nama Lengkap'}
                                        </label>
                                        <input
                                            id="pembiayaan-nama"
                                            name="pembiayaan-nama"
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
                                        <label htmlFor="pembiayaan-email" className="text-sm font-bold text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            id="pembiayaan-email"
                                            name="pembiayaan-email"
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
                                        <label htmlFor="pembiayaan-nohp" className="text-sm font-bold text-gray-700">
                                            {isEn ? 'Phone Number (WhatsApp)' : 'No HP (WhatsApp)'}
                                        </label>
                                        <input
                                            id="pembiayaan-nohp"
                                            name="pembiayaan-nohp"
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
                                className={`scroll-mt-24 rounded-3xl border border-emerald-900/5 bg-white p-6 shadow-xl transition-all sm:p-8 lg:p-10 ${!hasSubmittedDataDiri ? 'pointer-events-none blur-[2px] select-none' : ''}`}
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
                                        <label htmlFor="pembiayaan-amount" className="mb-3 block text-sm font-bold text-emerald-950">
                                            {t.calculator.amountLabel}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-emerald-900/40">
                                                Rp
                                            </div>
                                            <input
                                                id="pembiayaan-amount"
                                                name="pembiayaan-amount"
                                                type="number"
                                                value={amount}
                                                onChange={(e) =>
                                                    setAmount(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full rounded-xl border border-emerald-900/10 py-4 pr-4 pl-12 font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>
                                        <input
                                            id="pembiayaan-amount-range"
                                            name="pembiayaan-amount-range"
                                            type="range"
                                            min="1000000"
                                            max="500000000"
                                            step="1000000"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="mt-4 w-full accent-emerald-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="pembiayaan-tenor" className="mb-3 block text-sm font-bold text-emerald-950">
                                            {t.calculator.tenorLabel}
                                        </label>
                                        <select
                                            value={tenor}
                                            onChange={(e) =>
                                                setTenor(Number(e.target.value))
                                            }
                                            className="w-full appearance-none rounded-xl border border-emerald-900/10 bg-white px-4 py-4 font-bold text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            {[6, 11, 12, 18, 24, 36, 48, 60].map(
                                                (m) => (
                                                    <option key={m} value={m}>
                                                        {m}{mounted ? (isEn ? ' Months' : ' Bulan') : ''}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>

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
                            <div className="relative overflow-hidden rounded-3xl bg-emerald-800 p-6 text-white shadow-2xl sm:p-8 lg:p-10">
                                <div className="relative z-10">
                                    <div className="text-center">
                                        <h4 className="mb-4 text-[10px] font-bold tracking-widest text-emerald-300/80 uppercase">
                                            {t.calculator.resultLabel}
                                        </h4>
                                        <div className="mb-8 text-2xl font-black break-words tracking-tighter text-white sm:text-4xl">
                                            {formatIdr(installment)}
                                        </div>
                                    </div>

                                    <div className="mb-6 h-px w-full bg-white/10" />

                                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                        <div className="min-w-0 text-center">
                                            <div className="mb-1 text-[8px] sm:text-[10px] font-bold text-emerald-300/60 uppercase">
                                                {t.result.totalMargin}
                                            </div>
                                            <div className="text-sm sm:text-base font-bold text-emerald-300 break-words">
                                                {formatIdr(totalMargin)}
                                            </div>
                                        </div>
                                        <div className="min-w-0 text-center">
                                            <div className="mb-1 text-[8px] sm:text-[10px] font-bold text-emerald-300/60 uppercase">
                                                {t.result.sellingPrice}
                                            </div>
                                            <div className="text-sm sm:text-base font-bold text-white break-words">
                                                {formatIdr(totalPayment)}
                                            </div>
                                        </div>
                                        <div className="min-w-0 text-center">
                                            <div className="mb-1 text-[8px] sm:text-[10px] font-bold text-emerald-300/60 uppercase">
                                                {t.result.tenor}
                                            </div>
                                            <div className="text-sm sm:text-base font-bold text-white">
                                                {tenor}{isEn ? ' Mo' : ' Bln'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Wallet className="absolute -right-10 -bottom-10 h-48 w-48 text-white opacity-5" />
                            </div>

                            <div className="rounded-3xl border border-emerald-900/5 bg-white p-6 shadow-sm sm:p-8">
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
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
