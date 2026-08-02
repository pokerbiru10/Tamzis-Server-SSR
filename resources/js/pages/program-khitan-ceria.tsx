import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function KhitanCeria() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Khitan Ceria - TAMZIS Bina Utama',
            heading: 'Khitan Ceria',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Khitan Ceria',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Khitan Ceria',
                hadits: '"Khitamlah anak-anakmu, karena itu adalah kebersihan."',
                haditsSource: '',
                content: `PROGRAM
Program Khitan Ceria merupakan program pelayanan khitan gratis yang diselenggarakan oleh ULAZ MKU Tamzis sebagai bentuk kepedulian terhadap kesehatan anak sekaligus mendukung pelaksanaan syariat Islam. Program ini ditujukan bagi anak-anak dari keluarga dhuafa dan masyarakat kurang mampu agar dapat melaksanakan khitan secara aman, nyaman, dan sesuai dengan standar medis tanpa terkendala biaya.

Pelaksanaan Khitan Ceria dikemas dalam suasana yang menyenangkan dan ramah anak melalui berbagai kegiatan edukatif, hiburan, serta pemberian bingkisan sebagai bentuk apresiasi kepada peserta. Dengan pendekatan tersebut, diharapkan anak-anak merasa lebih tenang, percaya diri, dan tidak mengalami trauma selama proses khitan. Program ini juga melibatkan tenaga medis profesional serta didukung oleh relawan dan mitra kesehatan untuk memastikan pelayanan yang berkualitas, aman, dan higienis.

Selain memberikan layanan khitan, program ini menjadi sarana edukasi kepada orang tua mengenai pentingnya menjaga kesehatan reproduksi, kebersihan diri, serta perawatan pascakhitan. Melalui program ini, ULAZ MKU Tamzis berupaya menghadirkan pelayanan kesehatan yang bermanfaat sekaligus memperkuat nilai kepedulian sosial dan kebersamaan di tengah masyarakat.

MAKSUD DAN TUJUAN
Program Khitan Ceria bertujuan untuk memberikan layanan khitan gratis bagi anak-anak dari keluarga dhuafa dan masyarakat kurang mampu sebagai upaya meningkatkan kesehatan, kebersihan, dan kualitas hidup anak. Program ini juga bertujuan membantu orang tua dalam memenuhi kewajiban pelaksanaan khitan sesuai syariat Islam, memberikan pelayanan medis yang aman dan berkualitas, serta menciptakan pengalaman khitan yang menyenangkan sehingga anak tidak merasa takut atau trauma. Selain itu, program ini diharapkan dapat meningkatkan kepedulian sosial masyarakat serta mengoptimalkan pemanfaatan dana zakat, infak, sedekah, dan dana sosial keagamaan lainnya dalam bidang kesehatan dan kemanusiaan.

SASARAN/OBYEK
Program Khitan Ceria ditujukan kepada anak-anak dari keluarga dhuafa dan masyarakat kurang mampu, khususnya anak-anak yang telah memenuhi usia atau kondisi kesehatan yang direkomendasikan untuk menjalani khitan. Prioritas penerima manfaat diberikan kepada anak yatim, piatu, yatim piatu, keluarga prasejahtera, serta masyarakat di wilayah binaan maupun wilayah lain yang memenuhi kriteria berdasarkan hasil pendataan dan verifikasi. Program juga dapat dilaksanakan bekerja sama dengan sekolah, masjid, musala, pondok pesantren, pemerintah desa, dan komunitas sebagai mitra penyelenggara.

MANFAAT PROGRAM
Program Khitan Ceria memberikan manfaat bagi anak, keluarga, dan masyarakat melalui tersedianya layanan khitan yang aman, berkualitas, dan tanpa biaya bagi keluarga yang membutuhkan. Program ini membantu meningkatkan kesehatan dan kebersihan anak, mendukung pelaksanaan syariat Islam, serta mengurangi beban ekonomi keluarga. Selain itu, suasana kegiatan yang ramah anak dan penuh keceriaan diharapkan mampu menghilangkan rasa takut terhadap proses khitan, sekaligus mempererat kepedulian sosial, semangat gotong royong, dan kolaborasi antara ULAZ MKU Tamzis, tenaga kesehatan, relawan, donatur, dan masyarakat dalam memberikan pelayanan yang bermanfaat bagi umat.`,
            },
            sidebar: {
                title: 'Program Baitul Maal',
                menu: [
                    { label: 'Pusat Jajanan Selama Ramadhan', url: '/pusat-jajanan-selama-ramadhan' },
                    { label: 'Bahagia 1000 Yatim dan Dhuafa', url: '/bahagia-1000-yatim-dan-dhuafa' },
                    { label: 'Peduli Bencana', url: '/peduli-bencana' },
                    { label: 'Peduli Sosial Keagamaan', url: '/peduli-sosial-keagamaan' },
                    { label: 'Peduli Yatim dan Dhuafa', url: '/peduli-yatim-dan-dhuafa' },
                    { label: 'Bedah Rumah Bahagia', url: '/bedah-rumah-bahagia' },
                    { label: 'Program Pemberdayaan Ekonomi', url: '/program-pemberdayaan-dhuafa' },
                    { label: 'Beasiswa Ustadz dan Ustadzah', url: '/beasiswa-ustadz' },
                    { label: 'Cinta Masjid', url: '/cinta-masjid' },
                    { label: 'Jumat Berkah', url: '/jumat-berkah' },
                    { label: 'TPQ-Ku', url: '/tpq-ku' },
                    { label: 'Prog. Pengembangan Amil dan Nadzir', url: '/prog-pengembangan-pembinaan-amil-nadzir' },
                    { label: "Wakaf Mukena dan Al-Qur'an", url: '/wakaf-mukena-al-quran' },
                    { label: 'Bina Siswa Cerdas', url: '/program-bina-siswa-cerdas' },
                    { label: 'Be-aktriyo', url: '/program-be-aktriyo' },
                    { label: 'Membangun Keluarga Utama (MKU)', url: '/program-membangun-keluarga-utama-mku' },
                    { label: 'Peduli Kesehatan', url: '/program-peduli-kesehatan' },
                    { label: 'World Sight Day / Desama', url: '/program-world-sight-day-desama' },
                    { label: 'Qurban On Tamzis', url: '/qurban-tamzis' },
                    { label: 'Khitan Ceria', url: '/program-khitan-ceria' },
                ],
                contact: {
                    title: 'Hubungi Kami',
                    desc: 'Ingin mengusulkan program ini? Hubungi kami!',
                    btn: 'Chat WhatsApp',
                },
            },
        },
        en: {
            title: 'Joyful Circumcision - TAMZIS Bina Utama',
            heading: 'Joyful Circumcision',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Joyful Circumcision',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Joyful Circumcision',
                hadits: '"Circumcise your children, for it is cleanliness."',
                haditsSource: '',
                content: `PROGRAM
The Joyful Circumcision Program is a free circumcision service program organized by ULAZ MKU Tamzis as a form of care for children's health while supporting the implementation of Islamic sharia. This program is aimed at children from dhuafa families and underprivileged communities so they can undergo circumcision safely, comfortably, and according to medical standards without financial constraints.

The implementation of Joyful Circumcision is packaged in a fun and child-friendly atmosphere through various educational activities, entertainment, and gift giving as a form of appreciation to participants. With this approach, children are expected to feel calmer, more confident, and not experience trauma during the circumcision process. This program also involves professional medical personnel and is supported by health volunteers and partners to ensure quality, safe, and hygienic services.

In addition to providing circumcision services, this program serves as an educational platform for parents regarding the importance of maintaining reproductive health, personal hygiene, and post-circumcision care. Through this program, ULAZ MKU Tamzis strives to provide beneficial health services while strengthening social care values and togetherness in the community.

PURPOSE AND OBJECTIVES
The Joyful Circumcision Program aims to provide free circumcision services for children from dhuafa families and underprivileged communities as an effort to improve children's health, cleanliness, and quality of life. This program also aims to help parents fulfill the obligation of circumcision according to Islamic sharia, provide safe and quality medical services, and create a joyful circumcision experience so children do not feel afraid or traumatized. Additionally, this program is expected to increase community social care and optimize the utilization of zakat, infak, sedekah, and other religious social funds in the health and humanitarian fields.

TARGETS/OBJECTS
The Joyful Circumcision Program is aimed at children from dhuafa families and underprivileged communities, particularly children who have reached the recommended age or health condition for circumcision. Priority beneficiaries are given to orphans, children who have lost one or both parents, underprivileged families, and communities in fostered areas or other regions that meet criteria based on data collection and verification. The program can also be implemented in cooperation with schools, mosques, musalas, Islamic boarding schools, village governments, and communities as implementing partners.

PROGRAM BENEFITS
The Joyful Circumcision Program provides benefits for children, families, and the community through the availability of safe, quality, and free circumcision services for families in need. This program helps improve children's health and hygiene, supports the implementation of Islamic sharia, and reduces the economic burden on families. Additionally, the child-friendly and joyful atmosphere of the activity is expected to eliminate fear of the circumcision process, while strengthening social care, mutual cooperation spirit, and collaboration between ULAZ MKU Tamzis, health workers, volunteers, donors, and the community in providing beneficial services for the ummah.`,
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

                {/* Page Title - Astra Style */}
                <div className="relative overflow-hidden border-b border-white/5 py-10 text-center text-white sm:py-14">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/assets/img/header/Cinta-masjid.webp')",
                        }}
                    />

                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight drop-shadow-md sm:text-4xl">
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
                            <span>{t.breadcrumb.baitulMaal}</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-white">
                                {t.breadcrumb.current}
                            </span>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
                    <div className="grid items-start gap-12 lg:grid-cols-3">
                        {/* Main Column */}
                        <div className="space-y-10 lg:col-span-2">
                            {/* Hero Box */}
                            <div className="rounded-2xl border-l-[8px] border-emerald-500 bg-emerald-800 p-8 text-white shadow-xl sm:p-12">
                                <div className="mb-8">
                                    <h2 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                                        {t.hero.badge}
                                    </h2>
                                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
                                        {t.hero.title}
                                    </h3>
                                </div>

                                {/* Illustration */}
                                <div className="mb-8 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                                    <picture>
                                        <source type="image/webp" srcSet="/assets/img/menu/khitan-ceria.webp" />
                                        <ImageWithFallback
                                            src="/assets/img/menu/khitan-ceria.png"
                                            alt={t.heading}
                                            aspectRatio="video"
                                        />
                                    </picture>
                                </div>
                                
                                <blockquote className="mb-6 border-l-4 border-emerald-400 py-2 pl-6">
                                    <p className="text-lg leading-snug font-bold text-white italic sm:text-xl">
                                        {t.hero.hadits}
                                    </p>
                                    {t.hero.haditsSource && (
                                        <footer className="mt-2 text-[10px] font-semibold tracking-wide text-emerald-300">
                                            {t.hero.haditsSource}
                                        </footer>
                                    )}
                                </blockquote>

                                <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-white/80">
                                    {t.hero.content}
                                </p>
                            </div>
                            <div className="min-h-[1px]" />
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            <SidebarMenuNav
                                group="baitul-maal"
                                locale={locale}
                                activeUrl="/program-khitan-ceria"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            {/* CTA */}
                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">
                                    {t.sidebar.contact.title}
                                </h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">
                                    {t.sidebar.contact.desc}
                                </p>
                                <a
                                    href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Khitan%20Ceria"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    {t.sidebar.contact.btn}
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
