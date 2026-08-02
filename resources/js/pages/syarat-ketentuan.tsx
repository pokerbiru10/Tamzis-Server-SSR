import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, FileText } from 'lucide-react';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';

export default function SyaratKetentuan() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';

    const t = isEn
        ? {
              title: 'Terms & Conditions - TAMZIS Bina Utama',
              heading: 'Terms & Conditions',
              breadcrumb: { home: 'Home', current: 'Terms & Conditions' },
              updated: 'Last updated: January 2026',
              sections: [
                  {
                      title: '1. Acceptance of Terms',
                      body: 'By accessing and using this website, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of this website.',
                  },
                  {
                      title: '2. Nature of Simulation Results',
                      body: 'All financing and savings simulation results displayed on this website (including GTB, Mudharabah, and Murabahah simulations) are indicative estimates only. Final figures are subject to verification, contract terms, and the applicable policies of the relevant TAMZIS branch office.',
                  },
                  {
                      title: '3. No Guarantee of Approval',
                      body: 'Submitting a simulation or personal data form does not constitute an application for financing or savings, nor does it guarantee approval. Formal applications are subject to a separate assessment and approval process by TAMZIS.',
                  },
                  {
                      title: '4. User Responsibilities',
                      body: 'You are responsible for providing accurate and truthful information when using forms on this website. TAMZIS is not liable for losses arising from inaccurate information provided by users.',
                  },
                  {
                      title: '5. Intellectual Property',
                      body: 'All content on this website, including text, logos, images, and design, is the property of TAMZIS Bina Utama and is protected by applicable intellectual property laws. Reproduction without written permission is prohibited.',
                  },
                  {
                      title: '6. Limitation of Liability',
                      body: 'TAMZIS is not liable for any direct or indirect losses arising from the use of, or inability to use, this website, including but not limited to technical errors, service interruptions, or inaccuracies in displayed information.',
                  },
                  {
                      title: '7. Sharia Compliance',
                      body: 'All financing and savings products referenced on this website are structured in accordance with sharia principles and are subject to the applicable fatwa of the National Sharia Board (DSN-MUI).',
                  },
                  {
                      title: '8. Changes to Terms',
                      body: 'TAMZIS reserves the right to modify these Terms & Conditions at any time. Continued use of this website after changes are posted constitutes acceptance of the revised terms.',
                  },
                  {
                      title: '9. Contact Us',
                      body: 'For questions regarding these Terms & Conditions, please contact us at info@tamzis.id or through our official Contact Center channels.',
                  },
              ],
          }
        : {
              title: 'Syarat & Ketentuan - TAMZIS Bina Utama',
              heading: 'Syarat & Ketentuan',
              breadcrumb: { home: 'Beranda', current: 'Syarat & Ketentuan' },
              updated: 'Terakhir diperbarui: Januari 2026',
              sections: [
                  {
                      title: '1. Penerimaan Ketentuan',
                      body: 'Dengan mengakses dan menggunakan website ini, Anda setuju untuk terikat dengan Syarat & Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak melanjutkan penggunaan website ini.',
                  },
                  {
                      title: '2. Sifat Hasil Simulasi',
                      body: 'Seluruh hasil simulasi pembiayaan dan simpanan yang ditampilkan di website ini (termasuk simulasi GTB, Mudharabah, dan Murabahah) bersifat estimasi indikatif. Angka final akan disesuaikan melalui verifikasi, ketentuan akad, dan kebijakan kantor cabang TAMZIS yang bersangkutan.',
                  },
                  {
                      title: '3. Tidak Ada Jaminan Persetujuan',
                      body: 'Pengiriman formulir simulasi atau data diri bukan merupakan pengajuan pembiayaan atau simpanan, dan tidak menjamin persetujuan. Pengajuan resmi akan melalui proses penilaian dan persetujuan tersendiri oleh TAMZIS.',
                  },
                  {
                      title: '4. Tanggung Jawab Pengguna',
                      body: 'Anda bertanggung jawab untuk memberikan informasi yang akurat dan benar saat menggunakan formulir di website ini. TAMZIS tidak bertanggung jawab atas kerugian yang timbul akibat informasi yang tidak akurat dari pengguna.',
                  },
                  {
                      title: '5. Hak Kekayaan Intelektual',
                      body: 'Seluruh konten di website ini, termasuk teks, logo, gambar, dan desain, adalah milik TAMZIS Bina Utama dan dilindungi oleh hukum kekayaan intelektual yang berlaku. Penggandaan tanpa izin tertulis dilarang.',
                  },
                  {
                      title: '6. Batasan Tanggung Jawab',
                      body: 'TAMZIS tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan, atau ketidakmampuan menggunakan, website ini, termasuk namun tidak terbatas pada kesalahan teknis, gangguan layanan, atau ketidakakuratan informasi yang ditampilkan.',
                  },
                  {
                      title: '7. Kepatuhan Syariah',
                      body: 'Seluruh produk pembiayaan dan simpanan yang dirujuk di website ini disusun sesuai prinsip syariah dan tunduk pada fatwa Dewan Syariah Nasional (DSN-MUI) yang berlaku.',
                  },
                  {
                      title: '8. Perubahan Ketentuan',
                      body: 'TAMZIS berhak mengubah Syarat & Ketentuan ini sewaktu-waktu. Penggunaan berkelanjutan atas website ini setelah perubahan diumumkan dianggap sebagai persetujuan atas ketentuan yang telah direvisi.',
                  },
                  {
                      title: '9. Hubungi Kami',
                      body: 'Untuk pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami melalui info@tamzis.id atau kanal Contact Center resmi kami.',
                  },
              ],
          };

    // Override dari dashboard admin (Kelola Halaman > Kebijakan & Syarat), jika sudah pernah disimpan.
    const savedSections = (
        props.siteSections as Record<string, { id?: typeof t.sections; en?: typeof t.sections }> | undefined
    )?.['syarat-ketentuan']?.[locale];

    if (savedSections && savedSections.length > 0) {
        t.sections = savedSections;
    }

    const headerImage = (
        props.siteSections as Record<string, { headerImage?: string | null }> | undefined
    )?.['syarat-ketentuan']?.headerImage;

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
                        <FileText className="mb-4 h-10 w-10 text-emerald-300" />
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
