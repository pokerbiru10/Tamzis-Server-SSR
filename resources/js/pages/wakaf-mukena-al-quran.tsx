import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function WakafMukenaAlQuran() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: "Wakaf Mukena dan Al-Qur'an - TAMZIS Bina Utama",
            heading: "Wakaf Mukena dan Al-Qur'an",
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: "Wakaf Mukena dan Al-Qur'an",
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: "Wakaf Mukena dan Al-Qur'an",
                hadits: '"Program wakaf untuk mendukung sarana ibadah dan memperluas manfaat Al-Qur’an bagi masyarakat."',
                haditsSource: '',
                content: `LATAR BELAKANG
Program Pembagian Wakaf Al-Qur'an, Mukena, dan Sarung merupakan program sosial keagamaan yang bertujuan untuk meningkatkan akses masyarakat terhadap sarana ibadah yang layak serta mendukung peningkatan kualitas ibadah dan pembelajaran Al-Qur'an. Program ini diwujudkan melalui penghimpunan dan penyaluran wakaf dari para donatur kepada masyarakat, masjid, musala, TPQ/TPA, pondok pesantren, majelis taklim, mualaf, serta kelompok masyarakat yang membutuhkan.

Masih banyak masyarakat, khususnya di wilayah pelosok dan daerah dengan keterbatasan ekonomi, yang belum memiliki Al-Qur'an yang layak, mukena, maupun sarung untuk digunakan dalam beribadah. Di sisi lain, tidak sedikit masjid, musala, dan lembaga pendidikan Al-Qur'an yang mengalami keterbatasan fasilitas ibadah sehingga proses pembelajaran dan pelaksanaan ibadah belum dapat berjalan secara optimal. Kondisi tersebut menjadi dasar pelaksanaan program ini sebagai bentuk kepedulian terhadap pemenuhan kebutuhan sarana ibadah umat.

Melalui program ini, ULAZ MKU Tamzis menyalurkan wakaf Al-Qur'an, mukena, dan sarung secara tepat sasaran berdasarkan hasil pendataan dan asesmen kebutuhan di lapangan. Penyaluran dilakukan dengan mengedepankan prinsip amanah, transparansi, akuntabilitas, dan pemerataan manfaat, sehingga setiap bantuan benar-benar diterima oleh pihak yang membutuhkan.

Selain menyediakan sarana ibadah, program ini juga diharapkan mampu meningkatkan semangat masyarakat dalam membaca, mempelajari, menghafal, dan mengamalkan Al-Qur'an, serta mendorong terciptanya lingkungan yang lebih religius. Dengan adanya dukungan perlengkapan ibadah yang memadai, diharapkan kualitas pelaksanaan ibadah berjamaah, kegiatan pendidikan Al-Qur'an, dan pembinaan keagamaan di masyarakat dapat semakin meningkat.

Program Pembagian Wakaf Al-Qur'an, Mukena, dan Sarung merupakan salah satu bentuk investasi amal jariyah yang memberikan manfaat berkelanjutan. Setiap Al-Qur'an yang dibaca, mukena dan sarung yang digunakan untuk beribadah, serta aktivitas keagamaan yang berlangsung dengan memanfaatkan bantuan tersebut diharapkan menjadi pahala yang terus mengalir bagi para wakif dan seluruh pihak yang berkontribusi dalam menyukseskan program ini.

TUJUAN
Program Pembagian Wakaf Al-Qur'an, Mukena, dan Sarung bertujuan untuk meningkatkan kualitas ibadah dan syiar Islam melalui penyediaan sarana ibadah yang layak bagi masyarakat dan lembaga keagamaan yang membutuhkan. Program ini juga bertujuan mendukung kegiatan pendidikan Al-Qur'an, memperluas manfaat wakaf kepada umat, serta membantu memenuhi kebutuhan perlengkapan ibadah bagi masyarakat kurang mampu. Selain itu, program ini diharapkan dapat menumbuhkan semangat berbagi, memperkuat kepedulian sosial, serta mengoptimalkan pemanfaatan dana wakaf secara amanah, tepat sasaran, dan berkelanjutan sehingga memberikan manfaat yang luas bagi penerima manfaat dan menjadi amal jariyah bagi para wakif.

SASARAN
Program Pembagian Wakaf Al-Qur'an, Mukena, dan Sarung ditujukan kepada lembaga keagamaan dan masyarakat yang membutuhkan, dengan sasaran sebagai berikut:
• Masjid dan musala yang membutuhkan penambahan atau penggantian Al-Qur'an, mukena, dan sarung untuk mendukung kegiatan ibadah berjamaah.
• Taman Pendidikan Al-Qur'an (TPQ/TPA) yang memerlukan sarana pembelajaran Al-Qur'an bagi para santri.
• Madrasah Diniyah Takmiliyah Awaliyah (MDTA) dan Madrasah Diniyah (Madin) sebagai lembaga pendidikan keagamaan nonformal.
• Pondok pesantren yang membutuhkan dukungan sarana ibadah dan pembelajaran Al-Qur'an bagi para santri.
• Majelis taklim, rumah tahfiz, dan lembaga pendidikan Islam lainnya yang aktif menyelenggarakan kegiatan pembinaan keagamaan.
• Mualaf dan kelompok masyarakat yang sedang mendapatkan pembinaan keislaman.
• Masyarakat dhuafa, fakir miskin, lansia, penyandang disabilitas, serta keluarga kurang mampu yang belum memiliki Al-Qur'an atau perlengkapan ibadah yang layak.
• Wilayah binaan, daerah terpencil, dan komunitas yang memiliki keterbatasan akses terhadap sarana ibadah dan pembelajaran Al-Qur'an.`,
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
            title: "Prayer Mats and Qur'an Endowment - TAMZIS Bina Utama",
            heading: "Prayer Mats and Qur'an Endowment",
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: "Prayer Mats and Qur'an Endowment",
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: "Prayer Mats and Qur'an Endowment",
                hadits: '"A waqf program to support worship facilities and expand the benefit of the Quran for the community."',
                haditsSource: '',
                content: `BACKGROUND
The Distribution of Qur'an Waqf, Mukena, and Sarong Program is a social religious program aimed at increasing community access to decent worship facilities and supporting the improvement of worship quality and Qur'an learning. This program is realized through the collection and distribution of waqf from donors to the community, mosques, musalas, TPQ/TPA, Islamic boarding schools, Islamic study groups, new Muslims (mualaf), and community groups in need.

There are still many communities, particularly in remote areas and regions with economic limitations, who do not yet have decent Qur'ans, mukenas, or sarongs for use in worship. On the other hand, not a few mosques, musalas, and Qur'an educational institutions experience limitations in worship facilities so that the learning process and worship implementation cannot run optimally. These conditions form the basis for implementing this program as a form of care for fulfilling the ummah's worship facility needs.

Through this program, ULAZ MKU Tamzis distributes Qur'an waqf, mukenas, and sarongs with accurate targeting based on data collection and field needs assessments. Distribution is carried out with emphasis on the principles of trustworthiness, transparency, accountability, and equitable distribution of benefits, so that every assistance is truly received by those in need.

In addition to providing worship facilities, this program is also expected to increase community spirit in reading, studying, memorizing, and practicing the Qur'an, as well as encouraging the creation of a more religious environment. With adequate worship equipment support, it is hoped that the quality of congregational worship implementation, Qur'an education activities, and religious guidance in the community can continue to improve.

The Distribution of Qur'an Waqf, Mukena, and Sarong Program is one form of perpetual charity investment that provides sustainable benefits. Every Qur'an that is read, mukena and sarong used for worship, and religious activities that take place utilizing this assistance are hoped to become continuous rewards for the waqfs and all parties who contributed to the success of this program.

OBJECTIVES
The Distribution of Qur'an Waqf, Mukena, and Sarong Program aims to improve the quality of worship and Islamic outreach through the provision of decent worship facilities for communities and religious institutions in need. This program also aims to support Qur'an education activities, expand the benefits of waqf to the ummah, and help meet worship equipment needs for underprivileged communities. Additionally, this program is expected to foster a spirit of sharing, strengthen social care, and optimize the use of waqf funds in a trustworthy, well-targeted, and sustainable manner so as to provide broad benefits to beneficiaries and become perpetual charity for the waqfs.

TARGETS
The Distribution of Qur'an Waqf, Mukena, and Sarong Program is aimed at religious institutions and communities in need, with the following targets:
• Mosques and musalas that need additional or replacement Qur'ans, mukenas, and sarongs to support congregational worship activities.
• Taman Pendidikan Al-Qur'an (TPQ/TPA) that need Qur'an learning facilities for students.
• Madrasah Diniyah Takmiliyah Awaliyah (MDTA) and Madrasah Diniyah (Madin) as non-formal religious education institutions.
• Islamic boarding schools that need support for worship facilities and Qur'an learning for students.
• Islamic study groups, tahfiz houses, and other Islamic educational institutions that actively organize religious guidance activities.
• New Muslims (mualaf) and community groups receiving Islamic guidance.
• Dhuafa communities, the poor, the elderly, persons with disabilities, and underprivileged families who do not yet have decent Qur'ans or worship equipment.
• Fostered areas, remote regions, and communities with limited access to worship facilities and Qur'an learning.`,
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
                    <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/img/header/Cinta-masjid.webp')" }} />
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
                                        <source type="image/webp" srcSet="/assets/img/menu/wakaf.webp" />
                                        <ImageWithFallback src="/assets/img/menu/wakaf.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/wakaf-mukena-al-quran"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Wakaf%20Mukena%20dan%20Al-Quran" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
