import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function ProgramMembangunKeluargaUtamaMku() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Membangun Keluarga Utama (Mku) - TAMZIS Bina Utama',
            heading: 'Membangun Keluarga Utama (MKU)',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Mku',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Membangun Keluarga Utama (MKU)',
                hadits: '"Program pembinaan keluarga berdasarkan nilai-nilai maqashid syariah."',
                haditsSource: '',
                content: `PROGRAM MKU
MKU merupakan upaya yang diinisiasi gerakan BMT dalam rangka membangun keluarga Indonesia yang bahagia melalui serangkaian kegiatan dan pembiasaan aktifitas hidup yang baik dan mulia sesuai tuntunan Islam. Aktifitas tersebut antara lain: majlis ta'lim, qiyamullail, sholat berjamaah di masjid, bersedekah, membaca Al-Qur'an dan berta'awun. Program MKU dapat dilihat dari sisi keluarga peserta, MKU merupakan pembinaan, pendidikan dan pembiasaan amal sholeh sehingga menjadi keluarga utama. Sebagaimana iman diri pribadi, pencapaian indikator keluarga utama juga bersifat dinamis, perlu upaya yang sungguh-sungguh untuk mencapai tingkat yang tinggi, serta amal dan tindakan lanjutan untuk mempertahankan, apalagi meningkatkan pencapaian indikator.

MKU Tamzis adalah suatu kegiatan pembinaan dan pemberdayaan melalui materi fisik maupun non fisik dengan lima pilar sehat MKU dan sebagai sarana silaturahmi antar keluarga karyawan. Pilar lima sehat MKU mengacu pada tujuan syariah (maqashid syariah), yaitu khifdu Dien (menjaga agama), khifdu Nafs (menjaga diri/rohani), khifdu Aql (menjaga akal), khifdu Nasl (menjaga keturunan) dan khifdu Maal (menjaga harta). Kelima penjagaan dalam dakwah yang ingin dicapai diterjemahkan dalam program Membangun Keluarga Utama (MKU) yang dibahasasederhanakan menjadi Sehat Ruhani, Sehat Jasmani, Sehat Intelektual, dan Sehat Finansial.

MAKSUD DAN TUJUAN
Program Membangun Keluarga Utama bertujuan untuk memperkuat ketahanan keluarga sebagai fondasi utama dalam membentuk masyarakat yang harmonis, sejahtera, dan berakhlak mulia. Melalui program ini diharapkan setiap anggota keluarga memiliki pemahaman yang baik mengenai peran, tanggung jawab, dan fungsi masing-masing, sehingga tercipta hubungan yang saling menghargai, mendukung, dan bekerja sama dalam membangun kehidupan keluarga yang berkualitas. Selain itu, program ini bertujuan menanamkan nilai-nilai agama, moral, komunikasi yang sehat, pola pengasuhan yang positif, serta pengelolaan ekonomi keluarga yang bijaksana. Dengan demikian, keluarga diharapkan mampu menjadi lingkungan pertama yang mendidik, melindungi, dan membentuk generasi yang beriman, berkarakter, mandiri, serta memiliki kepedulian sosial yang tinggi.

SASARAN/OBYEK
Program Membangun Keluarga Utama ditujukan kepada karyawan Tamzis beserta keluarganya dan masyarakat umum sebagai upaya memperkuat ketahanan keluarga serta meningkatkan kualitas kehidupan rumah tangga. Sasaran program meliputi pasangan suami istri, calon pasangan suami istri, orang tua, serta anggota keluarga yang ingin meningkatkan pemahaman mengenai peran dan tanggung jawab dalam membangun keluarga yang harmonis, sakinah, mawaddah, wa rahmah. Melalui kegiatan pembinaan, edukasi, dan pendampingan, program ini diharapkan dapat membentuk keluarga yang memiliki nilai-nilai keislaman, komunikasi yang sehat, pola pengasuhan yang positif, serta kemandirian ekonomi, sehingga mampu menjadi teladan di lingkungan kerja maupun masyarakat.

MANFAAT PROGRAM
Program Membangun Keluarga Utama diharapkan memberikan manfaat sebagai berikut:
• Meningkatkan ketahanan dan keharmonisan keluarga melalui penguatan nilai-nilai keagamaan, komunikasi yang efektif, dan saling menghargai antaranggota keluarga.
• Meningkatkan pemahaman suami, istri, dan anak mengenai peran, hak, dan tanggung jawab masing-masing dalam membangun keluarga yang sakinah, mawaddah, wa rahmah.
• Membentuk pola pengasuhan (parenting) yang positif sehingga mendukung tumbuh kembang anak yang berakhlak mulia, mandiri, dan berprestasi.
• Meningkatkan kemampuan keluarga dalam mengelola keuangan rumah tangga secara bijaksana, produktif, dan berkelanjutan.
• Mengurangi potensi konflik dalam keluarga melalui penguatan komunikasi, penyelesaian masalah secara musyawarah, dan penanaman nilai-nilai moral serta spiritual.
• Menumbuhkan budaya saling peduli, saling mendukung, dan memperkuat hubungan antaranggota keluarga sehingga tercipta lingkungan keluarga yang sehat dan harmonis.
• Meningkatkan kualitas kehidupan karyawan Tamzis beserta keluarganya serta masyarakat umum, sehingga mampu menciptakan keluarga yang tangguh, produktif, dan berkontribusi positif bagi lingkungan sekitar.
• Mewujudkan keluarga yang menjadi teladan dalam kehidupan bermasyarakat serta mampu melahirkan generasi yang beriman, berakhlakul karimah, berkarakter, dan memiliki kepedulian sosial.`,
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
            title: 'Building Prime Family (MKU) - TAMZIS Bina Utama',
            heading: 'Building Prime Family (MKU)',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'MKU',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Building Prime Family (MKU)',
                hadits: '"Family development program based on maqashid sharia values."',
                haditsSource: '',
                content: `MKU PROGRAM
MKU is an initiative by the BMT movement to build happy Indonesian families through a series of activities and habituation of good and noble living activities according to Islamic guidance. These activities include: majlis ta'lim, qiyamullail, congregational prayers at the mosque, giving charity, reading the Qur'an, and mutual cooperation. The MKU program can be viewed from the participants' family perspective; MKU is guidance, education, and habituation of righteous deeds to become a prime family. Just like personal faith, achieving prime family indicators is also dynamic, requiring sincere effort to reach higher levels, and continued deeds and actions to maintain or even improve indicator achievements.

MKU Tamzis is a guidance and empowerment activity through physical and non-physical materials with five MKU health pillars and as a means of fostering relationships among employee families. The five MKU health pillars refer to the objectives of sharia (maqashid sharia), namely khifdu Dien (protecting religion), khifdu Nafs (protecting self/spiritual), khifdu Aql (protecting intellect), khifdu Nasl (protecting lineage), and khifdu Maal (protecting wealth). The five protections in da'wah that are aimed to be achieved are translated into the Building Prime Family (MKU) program, which is simplified into Spiritual Health, Physical Health, Intellectual Health, and Financial Health.

PURPOSE AND OBJECTIVES
The Building Prime Family Program aims to strengthen family resilience as the main foundation in forming a harmonious, prosperous, and noble-character society. Through this program, it is hoped that every family member will have a good understanding of their roles, responsibilities, and functions, thereby creating relationships of mutual respect, support, and cooperation in building a quality family life. Additionally, this program aims to instill religious values, morals, healthy communication, positive parenting patterns, and wise family economic management. Thus, families are expected to become the first environment that educates, protects, and shapes a generation that is faithful, characterized, independent, and has high social concern.

TARGETS/OBJECTS
The Building Prime Family Program is aimed at Tamzis employees and their families and the general public as an effort to strengthen family resilience and improve the quality of household life. Program targets include married couples, prospective married couples, parents, and family members who want to improve their understanding of roles and responsibilities in building a harmonious, sakinah, mawaddah, wa rahmah family. Through guidance, education, and mentoring activities, this program is expected to form families that have Islamic values, healthy communication, positive parenting patterns, and economic independence, so they can become role models in the workplace and community.

PROGRAM BENEFITS
The Building Prime Family Program is expected to provide the following benefits:
• Improve family resilience and harmony through strengthening religious values, effective communication, and mutual respect among family members.
• Increase understanding of husbands, wives, and children regarding their respective roles, rights, and responsibilities in building a sakinah, mawaddah, wa rahmah family.
• Form positive parenting patterns that support the growth of children with noble character, independence, and achievement.
• Improve families' ability to manage household finances wisely, productively, and sustainably.
• Reduce potential conflicts within families through communication strengthening, problem-solving through deliberation, and instilling moral and spiritual values.
• Foster a culture of mutual care, mutual support, and strengthening relationships among family members to create a healthy and harmonious family environment.
• Improve the quality of life of Tamzis employees and their families as well as the general public, so they can create resilient, productive families that contribute positively to the surrounding environment.
• Realize families that become role models in community life and are able to produce a generation that is faithful, has noble character, is characterized, and has social concern.`,
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
                    <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/img/menu/keluarga.webp')" }} />
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
                                        <source type="image/webp" srcSet="/assets/img/menu/keluarga.webp" />
                                        <ImageWithFallback src="/assets/img/menu/keluarga.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/program-membangun-keluarga-utama-mku"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Membangun%20Keluarga%20Utama%20(MKU)" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
