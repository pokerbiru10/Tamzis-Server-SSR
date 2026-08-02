import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function ProgramBeAktriyo() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Be-aktriyo - TAMZIS Bina Utama',
            heading: 'Be-aktriyo',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Be-aktriyo',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Be-aktriyo',
                hadits: '"Program beasiswa Diploma III Optometri untuk mencetak tenaga profesional di bidang optik."',
                haditsSource: '',
                content: `PROGRAM BEASISWA AKADEMI OPTOMETRI YOGYAKARTA
Dalam Undang-Undang Dasar tahun 1945 dinyatakan bahwa salah satu tujuan dari kemerdekaan kita adalah mencerdaskan kehidupan bangsa. Namun sejak beberapa dekade, tujuan itu telah mengalami pergeseran. Setidaknya terlihat dari agenda pembangunan yang telah digariskan oleh para pemimpin-pemimpin bangsa, dimana penciptaan sumber daya manusia melalui pendidikan masih sangat lemah jika dibandingkan dengan sektor-sektor lainnya.

Dalam hal ikut mewarnai perkembangan Pendidikan di Indonesia, khususnya yang berbasis pengembangan wakaf, maka Baitul Maal Tamzis selaku Nazhir Wakaf Uang Badan Wakaf Indonesia mendirikan Yayasan Bina Cendekia Utama Jogja, untuk selanjutnya mendirikan Akademi Optometri Yogyakarta (AKTRIYO). Dalam hal pendidikan, salah satu peran Akademi Optometri Yogyakarta (AKTRIYO) adalah penyelenggara program pendidikan diploma tiga yang mempersiapkan tenaga siap pakai dibidang kesehatan mata khususnya optometri, yaitu ilmu bidang optik atau penglihatan yang mempelajari perawatan kesehatan mata, mendeteksi cacat dalam penglihatan, tanda-tanda cedera mata, penyakit mata atau kelainan dan masalah kesehatan mata pada umumnya.

Program studi ini terbilang masih langka di Indonesia sehingga seorang optometris memiliki peluang kerja yang terbuka lebar, misalnya bekerja di rumah sakit pemerintah atau swasta, klinik mata atau fasilitas kesehatan lainnya, perusahaan frame atau lensa kacamata, perusahaan lensa kontak, teknisi laboratorium oftalmik, institusi pendidikan, penanggung jawab optik, maupun wirausaha di bidang optik.

MAKSUD DAN TUJUAN
Memberikan bantuan beasiswa sampai lulus program diploma tiga di bidang optometri, dengan tujuan untuk menjadi tenaga ahli yang profesional di bidang optik, dan sebagai wujud kepedulian terhadap pendidikan dan wirausaha khususnya di bidang optik.

SASARAN/OBYEK
Siswa lulus SMA/SMK sederajat.

MANFAAT PROGRAM
Beasiswa diberikan sampai lulus dengan kebermanfaatan yang optimal, supaya tetap mencari ilmu pada bidang yang diinginkan sekaligus membantu jika mempunyai kendala pembiayaan.`,
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
            title: 'Be-aktriyo - TAMZIS Bina Utama',
            heading: 'Be-aktriyo',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Be-aktriyo',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Be-aktriyo',
                hadits: '"A Diploma III Optometry scholarship program to produce professional optical talent."',
                haditsSource: '',
                content: `OPTOMETRY ACADEMY OF YOGYAKARTA SCHOLARSHIP PROGRAM
In the 1945 Constitution, it is stated that one of the goals of our independence is to educate the nation's life. However, over several decades, this goal has shifted. This is at least evident from the development agenda set by the nation's leaders, where human resource creation through education is still very weak compared to other sectors.

In contributing to the development of education in Indonesia, particularly those based on waqf development, Baitul Maal Tamzis as the Nazhir of Cash Waqf from the Indonesian Waqf Board established the Bina Cendekia Utama Jogja Foundation, which subsequently founded the Optometry Academy of Yogyakarta (AKTRIYO). In education, one of the roles of the Optometry Academy of Yogyakarta (AKTRIYO) is as an organizer of a diploma three education program that prepares ready-to-work personnel in the field of eye health, specifically optometry, which is the science of optics or vision that studies eye health care, detects vision defects, signs of eye injuries, eye diseases, or abnormalities and eye health problems in general.

This study program is still rare in Indonesia, so an optometrist has wide-open employment opportunities, for example working in public or private hospitals, eye clinics or other health facilities, frame or eyeglass lens companies, contact lens companies, ophthalmic laboratory technicians, educational institutions, optical managers, or entrepreneurship in the optical field.

PURPOSE AND OBJECTIVES
Providing scholarship assistance until graduation from the diploma three program in optometry, with the aim of becoming professional experts in the optical field, and as a form of care for education and entrepreneurship specifically in the optical field.

TARGETS/OBJECTS
High school/vocational school graduates or equivalent.

PROGRAM BENEFITS
Scholarships are provided until graduation with optimal benefits, so that recipients continue to pursue knowledge in their desired field while helping those who have financial constraints.`,
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
                                activeUrl="/program-be-aktriyo"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Be-aktriyo" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
