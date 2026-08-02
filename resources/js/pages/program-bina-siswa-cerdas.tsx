import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function ProgramBinaSiswaCerdas() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Bina Siswa Cerdas - TAMZIS Bina Utama',
            heading: 'Bina Siswa Cerdas',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Bina Siswa Cerdas',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Bina Siswa Cerdas',
                hadits: '"Program pendidikan bagi siswa dhuafa berprestasi agar memperoleh akses pendidikan yang berkualitas."',
                haditsSource: '',
                content: `LATAR BELAKANG
Program Bina Siswa Cerdas merupakan program pemberdayaan pendidikan yang diselenggarakan oleh ULAZ MKU Tamzis sebagai bentuk komitmen dalam meningkatkan kualitas sumber daya manusia melalui dukungan pendidikan bagi siswa dari keluarga dhuafa yang memiliki semangat belajar dan potensi untuk berprestasi. Program ini bertujuan memastikan bahwa keterbatasan ekonomi tidak menjadi penghalang bagi anak-anak untuk memperoleh pendidikan yang layak dan berkualitas.

Pendidikan dasar merupakan hak setiap anak sebagaimana diamanatkan dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945. Namun, hingga saat ini masih banyak siswa dari keluarga kurang mampu yang menghadapi berbagai kendala dalam melanjutkan pendidikan. Keterbatasan biaya sering kali menyebabkan mereka kesulitan memenuhi kebutuhan sekolah, seperti seragam, perlengkapan belajar, buku, alat tulis, transportasi, uang kegiatan sekolah, hingga biaya penunjang pendidikan lainnya. Kondisi tersebut berpotensi menurunkan motivasi belajar, menghambat perkembangan akademik, bahkan meningkatkan risiko putus sekolah.

Melalui Program Bina Siswa Cerdas, ULAZ MKU Tamzis tidak hanya memberikan bantuan beasiswa sebagai dukungan finansial, tetapi juga menghadirkan pembinaan yang menyeluruh melalui pendampingan karakter, pembinaan keislaman, penguatan akhlak, motivasi belajar, serta pengembangan potensi diri. Pendekatan ini dilakukan agar para penerima manfaat tidak hanya mampu mempertahankan keberlangsungan pendidikannya, tetapi juga tumbuh menjadi pribadi yang beriman, berakhlakul karimah, berprestasi, mandiri, dan memiliki kepedulian sosial.

Program ini dilaksanakan secara berkelanjutan melalui proses seleksi, verifikasi, penetapan penerima manfaat, penyaluran beasiswa, pembinaan rutin, monitoring perkembangan akademik, serta evaluasi berkala. Pelaksanaannya melibatkan sinergi antara ULAZ MKU Tamzis, orang tua, sekolah, relawan, dan para donatur sehingga tercipta ekosistem pendidikan yang mampu mendukung perkembangan peserta didik secara optimal.

Melalui Program Bina Siswa Cerdas, ULAZ MKU Tamzis berharap dapat melahirkan generasi muda yang cerdas, berkarakter, berprestasi, serta memiliki kepedulian terhadap sesama. Program ini juga menjadi bagian dari upaya memutus rantai kemiskinan melalui pendidikan yang berkualitas, sehingga para penerima manfaat kelak mampu menjadi insan yang mandiri, produktif, dan memberikan kontribusi positif bagi agama, masyarakat, dan bangsa.

TUJUAN
Program Bina Siswa Cerdas bertujuan untuk:
• Meningkatkan akses pendidikan yang layak bagi siswa dari keluarga dhuafa dan prasejahtera agar dapat melanjutkan pendidikan tanpa terkendala keterbatasan ekonomi.
• Mengurangi angka putus sekolah pada jenjang Sekolah Dasar (SD) dan Sekolah Menengah Pertama (SMP) melalui pemberian bantuan biaya pendidikan dan kebutuhan penunjang belajar.
• Meningkatkan prestasi akademik maupun nonakademik serta motivasi belajar siswa melalui pembinaan, pendampingan, dan evaluasi secara berkala.
• Membentuk karakter siswa yang beriman, bertakwa, berakhlakul karimah, disiplin, mandiri, bertanggung jawab, dan memiliki kepedulian sosial.
• Membantu memenuhi kebutuhan pendidikan, seperti perlengkapan sekolah, seragam, buku, alat tulis, transportasi, dan kebutuhan penunjang lainnya sesuai dengan kondisi penerima manfaat.
• Mendorong keterlibatan orang tua, sekolah, dan masyarakat dalam menciptakan lingkungan belajar yang mendukung perkembangan peserta didik.
• Mengoptimalkan penyaluran dana zakat, infak, sedekah, dan dana sosial keagamaan lainnya untuk mendukung peningkatan kualitas pendidikan masyarakat.
• Mempersiapkan generasi muda yang cerdas, berprestasi, berkarakter, dan memiliki daya saing sehingga mampu menjadi insan yang mandiri serta memberikan kontribusi positif bagi agama, masyarakat, dan bangsa.

SASARAN
Program Bina Siswa Cerdas ditujukan kepada siswa dan siswi dhuafa berprestasi yang memiliki semangat belajar tinggi namun menghadapi keterbatasan ekonomi dalam memenuhi kebutuhan pendidikannya. Sasaran penerima manfaat program meliputi:
• Siswa dan siswi jenjang Sekolah Dasar (SD/MI) dan Sekolah Menengah Pertama (SMP/MTs) yang berasal dari keluarga dhuafa atau prasejahtera.
• Memiliki prestasi akademik maupun nonakademik, atau menunjukkan potensi, semangat belajar, dan komitmen yang baik untuk terus melanjutkan pendidikan.
• Berasal dari keluarga yang mengalami keterbatasan ekonomi, dibuktikan melalui hasil survei dan verifikasi kelayakan oleh tim ULAZ MKU Tamzis.
• Memiliki perilaku yang baik, disiplin, serta bersedia mengikuti pembinaan karakter, keagamaan, dan kegiatan pendampingan yang diselenggarakan oleh ULAZ MKU Tamzis.
• Diprioritaskan bagi siswa yang berisiko putus sekolah akibat kendala ekonomi, anak yatim/piatu, atau berasal dari keluarga dengan kondisi sosial ekonomi yang rentan.`,
            },
            sidebar: {
                title: 'Program Baitul Maal',
                menu: [
                    { label: 'Ramadhan Snack Center', url: '/pusat-jajanan-selama-ramadhan' },
                    { label: 'Happiness for 1000 Orphans & Needy', url: '/bahagia-1000-yatim-dan-dhuafa' },
                    { label: 'Disaster Relief', url: '/peduli-bencana' },
                    { label: 'Social & Religious Care', url: '/peduli-sosial-keagamaan' },
                    { label: 'Orphan & Needy Care', url: '/peduli-yatim-dan-dhuafa' },
                    { label: 'Happy House Renovation', url: '/bedah-rumah-bahagia' },
                    { label: 'Economic Empowerment Program', url: '/program-pemberdayaan-dhuafa' },
                    { label: 'Ustadz & Ustadzah Scholarship', url: '/beasiswa-ustadz' },
                    { label: 'Love Mosque', url: '/cinta-masjid' },
                    { label: 'Blessed Friday', url: '/jumat-berkah' },
                    { label: 'My TPQ', url: '/tpq-ku' },
                    { label: 'Amil & Nadzir Development', url: '/prog-pengembangan-pembinaan-amil-nadzir' },
                    { label: "Mukena & Quran endowment", url: '/wakaf-mukena-al-quran' },
                    { label: 'Smart Student Program', url: '/program-bina-siswa-cerdas' },
                    { label: 'Be-aktriyo', url: '/program-be-aktriyo' },
                    { label: 'Building Prime Family (MKU)', url: '/program-membangun-keluarga-utama-mku' },
                    { label: 'Health Care', url: '/program-peduli-kesehatan' },
                    { label: 'World Sight Day / Desama', url: '/program-world-sight-day-desama' },
                    { label: 'Qurban On Tamzis', url: '/qurban-tamzis' },
                    { label: 'Joyful Circumcision', url: '/program-khitan-ceria' },
                ],
                contact: {
                    title: 'Hubungi Kami',
                    desc: 'Ingin mengusulkan program ini? Hubungi kami!',
                    btn: 'Chat WhatsApp',
                },
            },
        },
        en: {
            title: 'Smart Student Program - TAMZIS Bina Utama',
            heading: 'Smart Student Program',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Smart Student Program',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Smart Student Program',
                hadits: '"An education program for high-achieving dhuafa students to obtain quality education access."',
                haditsSource: '',
                content: `BACKGROUND
The Smart Student Development Program is an educational empowerment program organized by ULAZ MKU Tamzis as a commitment to improving human resource quality through educational support for students from dhuafa families who have learning spirit and potential to achieve. This program aims to ensure that economic limitations do not become an obstacle for children to obtain decent and quality education.

Basic education is every child's right as mandated in the 1945 Constitution of the Republic of Indonesia. However, to date, many students from underprivileged families still face various obstacles in continuing their education. Financial limitations often make it difficult for them to meet school needs, such as uniforms, learning supplies, books, stationery, transportation, school activity fees, and other educational support costs. These conditions can potentially decrease learning motivation, hinder academic development, and even increase the risk of dropping out.

Through the Smart Student Development Program, ULAZ MKU Tamzis not only provides scholarship assistance as financial support but also presents comprehensive guidance through character mentoring, Islamic guidance, moral strengthening, learning motivation, and self-potential development. This approach is taken so that beneficiaries can not only sustain their education but also grow into faithful individuals with noble character, achievement, independence, and social concern.

This program is implemented sustainably through selection processes, verification, beneficiary determination, scholarship distribution, regular mentoring, academic progress monitoring, and periodic evaluation. Its implementation involves synergy between ULAZ MKU Tamzis, parents, schools, volunteers, and donors to create an educational ecosystem that optimally supports student development.

Through the Smart Student Development Program, ULAZ MKU Tamzis hopes to produce young generations who are intelligent, characterized, high-achieving, and caring for others. This program is also part of efforts to break the chain of poverty through quality education, so that beneficiaries will eventually become independent, productive individuals who contribute positively to religion, society, and the nation.

OBJECTIVES
The Smart Student Development Program aims to:
• Increase access to decent education for students from dhuafa and underprivileged families so they can continue their education without being hindered by economic limitations.
• Reduce dropout rates at the Elementary School (SD) and Junior High School (SMP) levels through educational cost assistance and learning support needs.
• Improve academic and non-academic achievements and student learning motivation through regular mentoring, guidance, and evaluation.
• Shape students' character who are faithful, pious, have noble character, are disciplined, independent, responsible, and have social concern.
• Help meet educational needs, such as school supplies, uniforms, books, stationery, transportation, and other support needs according to beneficiary conditions.
• Encourage the involvement of parents, schools, and the community in creating a learning environment that supports student development.
• Optimize the distribution of zakat, infak, sedekah, and other religious social funds to support improvements in community education quality.
• Prepare a young generation that is intelligent, high-achieving, characterized, and competitive so they can become independent individuals and contribute positively to religion, society, and the nation.

TARGETS
The Smart Student Development Program is aimed at high-achieving dhuafa students who have high learning spirit but face economic limitations in meeting their educational needs. Beneficiary targets of the program include:
• Male and female students at the Elementary School (SD/MI) and Junior High School (SMP/MTs) levels from dhuafa or underprivileged families.
• Have academic or non-academic achievements, or show potential, learning spirit, and good commitment to continue their education.
• Come from families experiencing economic limitations, proven through survey results and eligibility verification by the ULAZ MKU Tamzis team.
• Have good behavior, discipline, and are willing to follow character building, religious guidance, and mentoring activities organized by ULAZ MKU Tamzis.
• Prioritized for students at risk of dropping out due to economic constraints, orphans, or from families with vulnerable socio-economic conditions.`,
            },
            sidebar: {
                title: 'Baitul Maal Program',
                menu: [
                    { label: 'Ramadhan Snack Center', url: '/pusat-jajanan-selama-ramadhan' },
                    { label: 'Happiness for 1000 Orphans & Needy', url: '/bahagia-1000-yatim-dan-dhuafa' },
                    { label: 'Disaster Relief', url: '/peduli-bencana' },
                    { label: 'Social & Religious Care', url: '/peduli-sosial-keagamaan' },
                    { label: 'Orphan & Needy Care', url: '/peduli-yatim-dan-dhuafa' },
                    { label: 'Happy House Renovation', url: '/bedah-rumah-bahagia' },
                    { label: 'Economic Empowerment Program', url: '/program-pemberdayaan-dhuafa' },
                    { label: 'Ustadz & Ustadzah Scholarship', url: '/beasiswa-ustadz' },
                    { label: 'Love Mosque', url: '/cinta-masjid' },
                    { label: 'Blessed Friday', url: '/jumat-berkah' },
                    { label: 'My TPQ', url: '/tpq-ku' },
                    { label: 'Amil & Nadzir Development', url: '/prog-pengembangan-pembinaan-amil-nadzir' },
                    { label: "Mukena & Quran endowment", url: '/wakaf-mukena-al-quran' },
                    { label: 'Smart Student Program', url: '/program-bina-siswa-cerdas' },
                    { label: 'Be-aktriyo', url: '/program-be-aktriyo' },
                    { label: 'Building Prime Family (MKU)', url: '/program-membangun-keluarga-utama-mku' },
                    { label: 'Health Care', url: '/program-peduli-kesehatan' },
                    { label: 'World Sight Day / Desama', url: '/program-world-sight-day-desama' },
                    { label: 'Qurban On Tamzis', url: '/qurban-tamzis' },
                    { label: 'Joyful Circumcision', url: '/program-khitan-ceria' },
                ],
                contact: {
                    title: 'Contact Us',
                    desc: 'Want to propose this program? Contact us!',
                    btn: 'Chat WhatsApp',
                },
            },
        },
    };

    const t = translations[locale as keyof typeof translations] || translations.id;

    return (
        <>
            <Head title={t.title} />
            <div className="min-h-screen bg-[#f8f9fa] font-sans text-emerald-950">
                <TamzisHeader />

                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/img/menu/bina-siswa-cerdas.webp')" }} />
                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight drop-shadow-md sm:text-4xl">{t.heading}</h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/50 uppercase">
                            <Link href="/" className="transition-colors hover:text-white">{t.breadcrumb.home}</Link>
                            <ChevronRight className="h-3 w-3" />
                            <span>{t.breadcrumb.baitulMaal}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-white">{t.breadcrumb.current}</span>
                        </nav>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
                    <div className="grid items-start gap-12 lg:grid-cols-3">
                        <div className="space-y-10 lg:col-span-2">
                            <div className="rounded-2xl border-l-[8px] border-emerald-500 bg-emerald-800 p-8 text-white shadow-xl sm:p-12">
                                <div className="mb-8">
                                    <h2 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">{t.hero.badge}</h2>
                                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl">{t.hero.title}</h3>
                                </div>
                                <div className="mb-8 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                                    <picture>
                                        <source type="image/webp" srcSet="/assets/img/menu/bina-siswa-cerdas.webp" />
                                        <ImageWithFallback src="/assets/img/menu/bina-siswa-cerdas.png" alt={t.hero.title} aspectRatio="video" />
                                    </picture>
                                </div>
                                <blockquote className="mb-6 border-l-4 border-emerald-400 py-2 pl-6">
                                    <p className="text-lg leading-snug font-bold text-white italic sm:text-xl">{t.hero.hadits}</p>
                                    <footer className="mt-2 text-[10px] font-semibold tracking-wide text-emerald-300">{t.hero.haditsSource}</footer>
                                </blockquote>
                                <p className="text-sm leading-relaxed font-medium whitespace-pre-line text-white/80">{t.hero.content}</p>
                            </div>
                        </div>

                        <div className="sticky top-24 space-y-8">
                            <SidebarMenuNav
                                group="baitul-maal"
                                locale={locale}
                                activeUrl="/program-bina-siswa-cerdas"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Bina%20Siswa%20Cerdas" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
