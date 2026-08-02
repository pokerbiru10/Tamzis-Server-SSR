import { Head, usePage } from '@inertiajs/react';
import { Smartphone, Download, HelpCircle, Zap } from 'lucide-react';
import { useState } from 'react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

type SectionData = Record<string, any>;

type Sections = {
    header?: SectionData;
    tentang?: SectionData;
    fitur?: SectionData;
    panduan?: SectionData;
    bantuan?: SectionData;
    [key: string]: SectionData | undefined;
};

export default function LayananDigital() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const sections = (props.sections as Sections) || {};

    const t = {
        headTitle: `M-TAMZIS - ${sections.header?.[locale]?.badge || 'Layanan Digital'}`,
        badge: sections.header?.[locale]?.badge || 'Layanan Digital',
        heroTitle: sections.header?.[locale]?.title || 'M-TAMZIS',
        heroSubtitle: sections.header?.[locale]?.subtitle || 'Aplikasi Mobile untuk Pengelolaan Keuangan Syariah',
        backgroundImage: sections.header?.[locale]?.background_image || '/assets/img/header/Cinta-masjid.webp',
        downloadNow: locale === 'en' ? 'Download Now' : 'Download Sekarang',
        tabs: [
            { id: 'tentang', label: locale === 'en' ? 'About M-Tamzis' : 'Tentang M-Tamzis', icon: Smartphone },
            { id: 'fitur', label: locale === 'en' ? 'Features & Services' : 'Fitur & Layanan', icon: Zap },
            { id: 'panduan', label: locale === 'en' ? 'Guide & Download' : 'Panduan & Download', icon: Download },
            { id: 'bantuan', label: locale === 'en' ? 'Help & Contact' : 'Bantuan & Contact', icon: HelpCircle },
        ] as const,
        features: sections.fitur?.[locale]?.items || [
            'Cek Saldo & Mutasi Rekening',
            'Transfer & Pembayaran (PPOB, PLN, PDAM, dll)',
            'Setoran Simpanan Wajib',
            'Setor Zakat, Infaq, Sedekah',
            'Jadwal Shalat & Baca Qur\'an Digital',
        ],
        tentangTitle: sections.tentang?.[locale]?.title || 'Tentang M-Tamzis',
        tentangDesc: sections.tentang?.[locale]?.description || 'M-TAMZIS adalah aplikasi mobile yang dirancang khusus untuk memudahkan Anda dalam mengelola keuangan secara syariah. Dengan teknologi terkini dan antarmuka yang user-friendly, M-TAMZIS membawa solusi perbankan digital yang sesuai dengan nilai-nilai Islam.',
        screenshotTitle: locale === 'en' ? 'M-TAMZIS App Screenshots' : 'Tampilan Aplikasi M-TAMZIS',
        screenshots: [
            { src: '/assets/img/mtamzis/screenshot-1.png', label: locale === 'en' ? 'Login Page' : 'Halaman Masuk' },
            { src: '/assets/img/mtamzis/screenshot-2.png', label: locale === 'en' ? 'Home & Features' : 'Beranda & Fitur' },
            { src: '/assets/img/mtamzis/screenshot-3.png', label: locale === 'en' ? 'Purchase & Pay Bills' : 'Pembelian & Bayar Tagihan' },
            { src: '/assets/img/mtamzis/screenshot-4.png', label: locale === 'en' ? 'Transfer & QR Code' : 'Transfer & Kode QR' },
        ],
        screenshotFooter: locale === 'en' ? 'Official M-TAMZIS app screenshots from Google Play Store' : 'Tangkapan layar resmi aplikasi M-TAMZIS di Google Play Store',
        apaItuTitle: locale === 'en' ? 'What is M-Tamzis?' : 'Apa itu M-Tamzis?',
        apaItuDesc: locale === 'en' ? 'A trusted digital platform for all your sharia financial transaction needs in one easy-to-use application.' : 'Platform digital terpercaya untuk semua kebutuhan transaksi keuangan syariah Anda dalam satu aplikasi yang mudah digunakan.',
        keunggulanTitle: locale === 'en' ? 'Key Advantages' : 'Keunggulan Utama',
        keunggulanList: locale === 'en' ? ['Safe & Trusted', 'Sharia Compliant', 'Easy to Use'] : ['Aman & Terpercaya', 'Syariah Compliant', 'Mudah Digunakan'],
        manfaatTitle: locale === 'en' ? 'Benefits for TAMZIS Members' : 'Manfaat untuk Anggota TAMZIS',
        manfaatDesc: locale === 'en' ? 'Manage savings, transfer funds, pay bills, and donate zakat anytime, anywhere easily through one app fully integrated with the TAMZIS system.' : 'Kelola simpanan, lakukan transfer dana, bayar tagihan, dan setor zakat kapan saja, di mana saja dengan mudah melalui satu aplikasi yang terintegrasi penuh dengan sistem TAMZIS.',
        fiturTitle: sections.fitur?.[locale]?.title || (locale === 'en' ? 'Features & Services of M-Tamzis' : 'Fitur & Layanan M-Tamzis'),
        fiturDesc: sections.fitur?.[locale]?.description || (locale === 'en' ? 'M-Tamzis provides various features and services to meet your digital financial transaction needs:' : 'M-Tamzis menyediakan berbagai fitur dan layanan untuk memenuhi kebutuhan transaksi keuangan digital Anda:'),
        fitur247Title: locale === 'en' ? 'All Features Available 24/7' : 'Semua Fitur Tersedia 24/7',
        fitur247Desc: locale === 'en' ? 'Enjoy the convenience of transacting anytime without time limits. Our customer service team is ready to assist you anytime.' : 'Nikmati kemudahan bertransaksi kapan saja tanpa batasan waktu. Customer service kami siap membantu Anda setiap saat.',
        panduanTitle: sections.panduan?.[locale]?.title || (locale === 'en' ? 'Guide & Download' : 'Panduan & Download'),
        downloadTitle: sections.panduan?.[locale]?.download_title || (locale === 'en' ? 'Download M-Tamzis Now' : 'Download M-Tamzis Sekarang'),
        downloadDesc: sections.panduan?.[locale]?.download_description || (locale === 'en' ? 'Get access to all TAMZIS digital features and services by downloading the app from Play Store.' : 'Dapatkan akses ke semua fitur dan layanan digital TAMZIS dengan mengunduh aplikasi dari Play Store.'),
        downloadPlayStore: sections.panduan?.[locale]?.download_play_store || (locale === 'en' ? 'Download on Google Play' : 'Download di Google Play'),
        panduanUserTitle: sections.panduan?.[locale]?.panduan_user_title || (locale === 'en' ? 'User Guide' : 'Panduan Pengguna'),
        panduanSteps: sections.panduan?.[locale]?.panduan_steps || [
            { title: locale === 'en' ? 'Account Registration' : 'Registrasi Akun', desc: locale === 'en' ? 'Open the app and select the Registration menu. Fill in your personal data as registered with TAMZIS.' : 'Buka aplikasi dan pilih menu Registrasi. Isi data diri sesuai dengan data yang terdaftar di TAMZIS.' },
            { title: locale === 'en' ? 'First Time Account Activation' : 'Aktivasi Akun Pertama Kali', desc: locale === 'en' ? 'Verify your phone number with the OTP sent to you. Create a strong security PIN.' : 'Verifikasi nomor HP Anda dengan OTP yang telah dikirimkan. Buat PIN keamanan yang kuat.' },
            { title: locale === 'en' ? 'Transaction Security Tips' : 'Tips Keamanan Bertransaksi', desc: locale === 'en' ? 'Do not share your PIN, password, and OTP with anyone. Use a secure WiFi connection when transacting.' : 'Jangan bagikan PIN, password, dan OTP kepada siapa pun. Gunakan WiFi yang aman saat bertransaksi.' },
        ],
        bantuanTitle: sections.bantuan?.[locale]?.title || (locale === 'en' ? 'Help & Contact Center' : 'Bantuan & Contact Center'),
        hubungiTitle: sections.bantuan?.[locale]?.hubungi_title || (locale === 'en' ? 'Contact Our Team' : 'Hubungi Tim Kami'),
        hubungiDesc: sections.bantuan?.[locale]?.hubungi_desc || (locale === 'en' ? 'If you have questions or experience issues, our customer service team is ready to assist you.' : 'Jika Anda memiliki pertanyaan atau mengalami kendala, tim customer service kami siap membantu Anda.'),
        hubungiBtn: sections.bantuan?.[locale]?.hubungi_btn || (locale === 'en' ? 'Call: 0286 325303' : 'Hubungi: 0286 325303'),
        downloadMtamzisTitle: sections.bantuan?.[locale]?.download_mtamzis_title || (locale === 'en' ? 'Download M-Tamzis' : 'Download M-Tamzis'),
        downloadMtamzisDesc: sections.bantuan?.[locale]?.download_mtamzis_desc || (locale === 'en' ? 'Get the M-Tamzis app through the following link:' : 'Dapatkan aplikasi M-Tamzis melalui tautan berikut:'),
        openPlayStore: sections.bantuan?.[locale]?.open_play_store || (locale === 'en' ? 'Open on Google Play Store' : 'Buka di Google Play Store'),
        faqTitle: sections.bantuan?.[locale]?.faq_title || (locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum'),
        faqs: sections.bantuan?.[locale]?.faqs || [
            { q: locale === 'en' ? 'Is M-Tamzis free?' : 'Apakah M-Tamzis gratis?', a: locale === 'en' ? 'Yes, M-Tamzis can be downloaded and used for free by all TAMZIS members.' : 'Ya, M-Tamzis dapat diunduh dan digunakan secara gratis untuk semua anggota TAMZIS.' },
            { q: locale === 'en' ? 'What operating systems are supported?' : 'Sistem operasi apa yang didukung?', a: locale === 'en' ? 'M-Tamzis is available for Android. The iOS version is currently in development.' : 'M-Tamzis tersedia untuk Android. Versi iOS sedang dalam tahap pengembangan.' },
            { q: locale === 'en' ? 'What if I forget my PIN?' : 'Bagaimana jika lupa PIN?', a: locale === 'en' ? 'Contact our customer service at 0286 325303 for a secure PIN reset.' : 'Hubungi customer service kami di 0286 325303 untuk membantu reset PIN Anda dengan aman.' },
        ],
    };

    const [activeTab, setActiveTab] = useState('tentang');

    return (
        <>
            <Head title={t.headTitle} />
            <TamzisHeader />

            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
                {/* Hero Section with Background Image */}
                <div className="relative overflow-hidden border-b border-white/5 py-16 text-center text-white sm:py-20">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${t.backgroundImage}')`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-teal-600/85 to-emerald-700/90"></div>
                    </div>

                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm">
                            <Smartphone className="mr-2 h-5 w-5 text-white" />
                            <span className="text-sm font-medium text-white">{t.badge}</span>
                        </div>
                        
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {t.heroTitle}
                        </h1>
                        
                        <div
                            className="prose prose-invert prose-lg mx-auto mt-6 max-w-none text-xl text-emerald-50"
                            dangerouslySetInnerHTML={{ __html: t.heroSubtitle }}
                        />

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://play.google.com/store/apps/details?id=id.tamzis.mobile.apps"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-emerald-600 hover:bg-gray-50 transition shadow-lg"
                            >
                                <Download className="h-5 w-5" />
                                {t.downloadNow}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content Section */}
                <div id="content-section" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid items-start gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">

                    {/* Tabs */}
                    <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                        {t.tabs.map((tab) => {
                            const TabIcon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all sm:px-6 ${
                                        activeTab === tab.id
                                            ? 'bg-emerald-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    <TabIcon className="h-5 w-5" />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden text-sm">{tab.label.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                        {activeTab === 'tentang' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                        {t.tentangTitle}
                                    </h2>
                                    <div
                                        className="prose prose-slate mb-4 max-w-none leading-relaxed text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: t.tentangDesc }}
                                    />
                                </div>

                                <div className="rounded-xl bg-gradient-to-b from-emerald-50 to-white p-6 ring-1 ring-emerald-100 sm:p-8">
                                    <h3 className="mb-6 text-center text-lg font-semibold text-emerald-900">
                                        {t.screenshotTitle}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                                        {t.screenshots.map((shot, i) => (
                                            <figure key={shot.src} className="text-center">
                                                <div
                                                    className={`overflow-hidden rounded-2xl shadow-lg ring-1 ring-emerald-900/10 transition-transform duration-500 hover:rotate-0 hover:scale-105 ${
                                                        i % 2 === 0 ? '-rotate-2' : 'rotate-2'
                                                    }`}
                                                >
                                                    <img
                                                        src={shot.src}
                                                        alt={`M-TAMZIS — ${shot.label}`}
                                                        loading="lazy"
                                                        className="w-full object-contain"
                                                    />
                                                </div>
                                                <figcaption className="mt-3 text-xs font-semibold text-emerald-800">
                                                    {shot.label}
                                                </figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-center text-xs text-gray-400">
                                        {t.screenshotFooter}
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
                                        <h3 className="mb-3 text-lg font-semibold text-emerald-900">
                                            {t.apaItuTitle}
                                        </h3>
                                        <p className="text-emerald-800">
                                            {t.apaItuDesc}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
                                        <h3 className="mb-3 text-lg font-semibold text-blue-900">
                                            {t.keunggulanTitle}
                                        </h3>
                                        <ul className="space-y-2 text-blue-800">
                                            {t.keunggulanList.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-xl">✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
                                    <h3 className="mb-3 text-xl font-semibold">
                                        {t.manfaatTitle}
                                    </h3>
                                    <p className="leading-relaxed">
                                        {t.manfaatDesc}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'fitur' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                        {t.fiturTitle}
                                    </h2>
                                    <div
                                        className="prose prose-slate mb-8 max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: t.fiturDesc }}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {t.features.map((feature: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
                                        >
                                            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{feature}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                                    <h3 className="mb-3 text-xl font-semibold">
                                        {t.fitur247Title}
                                    </h3>
                                    <p>
                                        {t.fitur247Desc}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'panduan' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                        {t.panduanTitle}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8">
                                    <h3 className="mb-4 text-2xl font-bold text-white">
                                        {t.downloadTitle}
                                    </h3>
                                    <div
                                        className="prose prose-invert mb-6 max-w-none text-emerald-100"
                                        dangerouslySetInnerHTML={{ __html: t.downloadDesc }}
                                    />
                                    <a
                                        href="https://play.google.com/store/apps/details?id=id.tamzis.mobile.apps"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-600 hover:bg-gray-50 transition"
                                    >
                                        <Download className="h-5 w-5" />
                                        {t.downloadPlayStore}
                                    </a>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                                        {t.panduanUserTitle}
                                    </h3>
                                    <div className="space-y-3">
                                        {t.panduanSteps.map((step: { title: string; desc: string }, i: number) => (
                                            <div key={i} className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="text-2xl font-bold text-emerald-600">{i + 1}</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{step.title}</h4>
                                                    <div
                                                        className="prose prose-sm prose-slate mt-1 max-w-none text-sm text-gray-600"
                                                        dangerouslySetInnerHTML={{ __html: step.desc }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bantuan' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                        {t.bantuanTitle}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white">
                                    <h3 className="mb-4 text-2xl font-bold">{t.hubungiTitle}</h3>
                                    <div
                                        className="prose prose-invert mb-6 max-w-none"
                                        dangerouslySetInnerHTML={{ __html: t.hubungiDesc }}
                                    />
                                    <a
                                        href="tel:0286325303"
                                        className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 hover:bg-gray-50 transition"
                                    >
                                        <span>📞</span>
                                        {t.hubungiBtn}
                                    </a>
                                </div>

                                <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-8">
                                    <h3 className="mb-4 text-2xl font-semibold text-emerald-900">
                                        {t.downloadMtamzisTitle}
                                    </h3>
                                    <div
                                        className="prose prose-emerald mb-6 max-w-none text-emerald-800"
                                        dangerouslySetInnerHTML={{ __html: t.downloadMtamzisDesc }}
                                    />
                                    <a
                                        href="https://play.google.com/store/apps/details?id=id.tamzis.mobile.apps"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
                                    >
                                        <Download className="h-5 w-5" />
                                        {t.openPlayStore}
                                    </a>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-xl font-semibold text-gray-900">
                                        {t.faqTitle}
                                    </h3>
                                    <div className="space-y-3">
                                        {t.faqs.map((faq: { q: string; a: string }, i: number) => (
                                            <div key={i} className="rounded-lg border border-gray-200 p-4 bg-white">
                                                <h4 className="font-semibold text-gray-900">{faq.q}</h4>
                                                <div
                                                    className="prose prose-sm prose-slate mt-2 max-w-none text-sm text-gray-600"
                                                    dangerouslySetInnerHTML={{ __html: faq.a }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="sticky top-24 space-y-6">
                        <SidebarMenuNav
                            group="layanan-digital"
                            locale={locale}
                            activeUrl="/layanan-digital"
                            fallbackTitle={locale === 'en' ? 'Digital Services' : 'Layanan Digital'}
                            fallbackItems={[{ label: locale === 'en' ? 'M-TAMZIS' : 'M-TAMZIS', url: '/layanan-digital' }]}
                        />
                    </div>
                    </div>
                </div>
            </div>

            <TamzisFooter />
        </>
    );
}
