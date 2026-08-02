import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function ProgramWorldSightDayDesama() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'World Sight Day / Desama - TAMZIS Bina Utama',
            heading: 'World Sight Day / Desama',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'World Sight Day / Desama',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'World Sight Day / Desama',
                hadits: '"Program kesehatan mata dan pencegahan gangguan penglihatan."',
                haditsSource: '',
                content: `PROGRAM
Program DESAMA (Desa Sehat Mata) merupakan program kesehatan masyarakat yang berfokus pada upaya peningkatan kesehatan mata serta pencegahan gangguan penglihatan melalui kegiatan promotif, preventif, kuratif, dan edukatif. Program ini diselenggarakan sebagai bentuk kepedulian terhadap masih tingginya kasus gangguan penglihatan yang disebabkan oleh kurangnya kesadaran masyarakat akan pentingnya menjaga kesehatan mata, keterbatasan akses terhadap layanan pemeriksaan mata, serta rendahnya deteksi dini terhadap berbagai penyakit mata.

Melalui Program DESAMA, ULAZ MKU Tamzis bekerja sama dengan tenaga kesehatan, rumah sakit, klinik mata, dan berbagai mitra untuk memberikan layanan pemeriksaan kesehatan mata, edukasi mengenai pola hidup sehat bagi kesehatan mata, deteksi dini gangguan penglihatan, pemberian bantuan kacamata bagi masyarakat yang membutuhkan, serta rujukan pengobatan bagi masyarakat yang memerlukan penanganan lebih lanjut.

Program ini diharapkan mampu meningkatkan kesadaran masyarakat tentang pentingnya menjaga kesehatan mata sejak dini, mengurangi risiko gangguan penglihatan yang dapat dicegah, serta meningkatkan kualitas hidup masyarakat melalui kemampuan melihat yang lebih baik. Dengan pendekatan berbasis desa dan komunitas, Program DESAMA menjadi bagian dari upaya menciptakan masyarakat yang sehat, produktif, dan memiliki akses yang lebih luas terhadap pelayanan kesehatan mata.

MAKSUD DAN TUJUAN
Program DESAMA bertujuan untuk meningkatkan derajat kesehatan mata masyarakat melalui edukasi, deteksi dini, dan pelayanan kesehatan mata yang mudah diakses. Program ini juga bertujuan meningkatkan kesadaran masyarakat akan pentingnya menjaga kesehatan mata, mencegah terjadinya gangguan penglihatan yang dapat dicegah, memperluas akses pemeriksaan dan layanan kesehatan mata bagi masyarakat, khususnya kelompok dhuafa dan rentan, serta membantu meningkatkan kualitas hidup masyarakat melalui penglihatan yang sehat.

SASARAN/OBYEK
Program DESAMA ditujukan kepada masyarakat umum, khususnya masyarakat dhuafa dan kelompok rentan yang memiliki keterbatasan akses terhadap layanan kesehatan mata. Sasaran program meliputi anak-anak usia sekolah, santri, lansia, guru, pekerja, penyandang disabilitas, serta masyarakat di desa-desa binaan ULAZ MKU Tamzis. Program juga menyasar lembaga pendidikan, pondok pesantren, komunitas, dan wilayah yang membutuhkan layanan pemeriksaan kesehatan mata berdasarkan hasil pendataan dan asesmen lapangan.

MANFAAT PROGRAM
Program DESAMA memberikan manfaat berupa meningkatnya kesadaran masyarakat akan pentingnya menjaga kesehatan mata, tersedianya layanan pemeriksaan mata yang lebih mudah dijangkau, serta terdeteksinya gangguan penglihatan sejak dini sehingga dapat segera ditangani. Program ini juga membantu masyarakat memperoleh akses terhadap bantuan kacamata maupun rujukan pengobatan apabila diperlukan. Melalui pelaksanaan program ini diharapkan kualitas kesehatan mata masyarakat semakin baik, produktivitas meningkat, dan risiko kebutaan yang dapat dicegah dapat diminimalkan, sehingga masyarakat mampu menjalankan aktivitas sehari-hari dengan lebih optimal.`,
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
            title: 'World Sight Day / Desama - TAMZIS Bina Utama',
            heading: 'World Sight Day / Desama',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'World Sight Day / Desama',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'World Sight Day / Desama',
                hadits: '"An eye health program and prevention of vision disorders."',
                haditsSource: '',
                content: `PROGRAM
The DESAMA (Desa Sehat Mata / Healthy Eye Village) Program is a community health program focused on improving eye health and preventing vision disorders through promotive, preventive, curative, and educational activities. This program is organized as a form of care for the still high number of vision disorder cases caused by lack of community awareness about the importance of maintaining eye health, limited access to eye examination services, and low early detection of various eye diseases.

Through the DESAMA Program, ULAZ MKU Tamzis collaborates with health workers, hospitals, eye clinics, and various partners to provide eye health examination services, education on healthy living patterns for eye health, early detection of vision disorders, provision of glasses assistance for communities in need, and medical referrals for communities requiring further treatment.

This program is expected to increase community awareness about the importance of maintaining eye health from an early age, reduce the risk of preventable vision disorders, and improve community quality of life through better vision ability. With a village and community-based approach, the DESAMA Program becomes part of efforts to create a healthy, productive society with broader access to eye health services.

PURPOSE AND OBJECTIVES
The DESAMA Program aims to improve community eye health through education, early detection, and easily accessible eye health services. This program also aims to increase community awareness about the importance of maintaining eye health, prevent preventable vision disorders, expand access to eye examinations and health services for communities, particularly dhuafa and vulnerable groups, and help improve community quality of life through healthy vision.

TARGETS/OBJECTS
The DESAMA Program is aimed at the general public, particularly dhuafa communities and vulnerable groups who have limited access to eye health services. Program targets include school-age children, students, the elderly, teachers, workers, persons with disabilities, and communities in ULAZ MKU Tamzis fostered villages. The program also targets educational institutions, Islamic boarding schools, communities, and areas that need eye health examination services based on data collection and field assessments.

PROGRAM BENEFITS
The DESAMA Program provides benefits in the form of increased community awareness about the importance of maintaining eye health, more accessible eye examination services, and early detection of vision disorders so they can be promptly addressed. This program also helps communities obtain access to glasses assistance or medical referrals when needed. Through program implementation, it is hoped that community eye health quality will improve, productivity will increase, and the risk of preventable blindness can be minimized, enabling communities to carry out daily activities more optimally.`,
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
                    <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/img/menu/World.webp')" }} />
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
                                        <source type="image/webp" srcSet="/assets/img/menu/World.webp" />
                                        <ImageWithFallback src="/assets/img/menu/World.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/program-world-sight-day-desama"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20World%20Sight%20Day%20%2F%20Desama" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
