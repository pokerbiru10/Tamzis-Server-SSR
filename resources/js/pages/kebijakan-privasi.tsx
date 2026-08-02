import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

export default function KebijakanPrivasi() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const t = isEn
        ? {
              title: 'Privacy Policy - TAMZIS Bina Utama',
              heading: 'Privacy Policy',
              breadcrumb: { home: 'Home', current: 'Privacy Policy' },
              updated: 'Last updated: January 2026',
              sections: [
                  {
                      title: '1. Information We Collect',
                      body: 'We collect personal information you provide directly to us, such as your full name, email address, phone number, and other information submitted through forms on this website (e.g. financing simulations, savings simulations, and job applications).',
                  },
                  {
                      title: '2. How We Use Your Information',
                      body: 'Information collected is used to process your requests, provide financing/savings simulation services, respond to inquiries, and improve our products and services. We do not sell your personal data to third parties.',
                  },
                  {
                      title: '3. Data Storage and Security',
                      body: 'We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, alteration, disclosure, or destruction.',
                  },
                  {
                      title: '4. Sharing of Information',
                      body: 'We may share your information with authorized TAMZIS branch offices for the purpose of following up on your financing or savings inquiry. We do not share your data with unrelated third parties without your consent, except where required by law.',
                  },
                  {
                      title: '5. Cookies',
                      body: 'This website may use cookies to improve your browsing experience. You may disable cookies through your browser settings, though some features may not function properly as a result.',
                  },
                  {
                      title: '6. Your Rights',
                      body: 'You have the right to access, correct, or request deletion of your personal data held by us. Please contact our Contact Center to exercise these rights.',
                  },
                  {
                      title: '7. Changes to This Policy',
                      body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.',
                  },
                  {
                      title: '8. Contact Us',
                      body: 'If you have questions about this Privacy Policy, please contact us at info@tamzis.id or through our official Contact Center channels.',
                  },
              ],
          }
        : {
              title: 'Kebijakan Privasi - TAMZIS Bina Utama',
              heading: 'Kebijakan Privasi',
              breadcrumb: { home: 'Beranda', current: 'Kebijakan Privasi' },
              updated: 'Terakhir diperbarui: Januari 2026',
              sections: [
                  {
                      title: '1. Informasi yang Kami Kumpulkan',
                      body: 'Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung, seperti nama lengkap, alamat email, nomor telepon, dan informasi lain yang dikirimkan melalui formulir di website ini (misalnya simulasi pembiayaan, simulasi simpanan, dan lamaran kerja).',
                  },
                  {
                      title: '2. Bagaimana Kami Menggunakan Informasi Anda',
                      body: 'Informasi yang dikumpulkan digunakan untuk memproses permintaan Anda, memberikan layanan simulasi pembiayaan/simpanan, menanggapi pertanyaan, serta meningkatkan produk dan layanan kami. Kami tidak menjual data pribadi Anda kepada pihak ketiga.',
                  },
                  {
                      title: '3. Penyimpanan dan Keamanan Data',
                      body: 'Kami menerapkan langkah-langkah pengamanan administratif, teknis, dan fisik yang wajar untuk melindungi informasi pribadi Anda dari akses, perubahan, pengungkapan, atau perusakan yang tidak sah.',
                  },
                  {
                      title: '4. Pembagian Informasi',
                      body: 'Kami dapat membagikan informasi Anda kepada kantor cabang TAMZIS yang berwenang untuk keperluan menindaklanjuti permintaan pembiayaan atau simpanan Anda. Kami tidak membagikan data Anda kepada pihak ketiga yang tidak terkait tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.',
                  },
                  {
                      title: '5. Cookies',
                      body: 'Website ini dapat menggunakan cookies untuk meningkatkan pengalaman berselancar Anda. Anda dapat menonaktifkan cookies melalui pengaturan browser, meskipun beberapa fitur mungkin tidak berfungsi dengan baik akibatnya.',
                  },
                  {
                      title: '6. Hak Anda',
                      body: 'Anda berhak untuk mengakses, memperbaiki, atau meminta penghapusan data pribadi Anda yang kami simpan. Silakan hubungi Contact Center kami untuk menggunakan hak-hak tersebut.',
                  },
                  {
                      title: '7. Perubahan Kebijakan Ini',
                      body: 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diumumkan di halaman ini beserta tanggal revisi terbaru.',
                  },
                  {
                      title: '8. Hubungi Kami',
                      body: 'Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui info@tamzis.id atau kanal Contact Center resmi kami.',
                  },
              ],
          };

    // Override dari dashboard admin (Kelola Halaman > Kebijakan & Syarat), jika sudah pernah disimpan.
    const savedSections = (
        props.siteSections as Record<string, { id?: typeof t.sections; en?: typeof t.sections }> | undefined
    )?.['kebijakan-privasi']?.[locale];

    if (savedSections && savedSections.length > 0) {
        t.sections = savedSections;
    }

    const headerImage = (
        props.siteSections as Record<string, { headerImage?: string | null }> | undefined
    )?.['kebijakan-privasi']?.headerImage;

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    {headerImage ? (
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('${headerImage}')` }}
                        />
                    ) : (
                        <div className="absolute inset-0 z-0 bg-emerald-900" />
                    )}
                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <ShieldCheck className="mb-4 h-10 w-10 text-emerald-300" />
                        <h1 className="mb-4 text-2xl font-bold tracking-tight uppercase drop-shadow-md sm:text-4xl">
                            {t.heading}
                        </h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/50 uppercase">
                            <Link href="/" className="transition-colors hover:text-white">
                                {t.breadcrumb.home}
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <span className="tracking-widest text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
                    <p className="mb-10 text-xs font-bold tracking-widest text-slate-400 uppercase">
                        {t.updated}
                    </p>

                    <div className="space-y-10">
                        {t.sections.map((section, index) => (
                            <div key={index}>
                                <h2 className="mb-3 text-lg font-bold text-emerald-950">
                                    {section.title}
                                </h2>
                                <div
                                    className="prose prose-sm prose-emerald max-w-none text-sm leading-relaxed font-medium text-slate-600"
                                    dangerouslySetInnerHTML={{ __html: section.body }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
