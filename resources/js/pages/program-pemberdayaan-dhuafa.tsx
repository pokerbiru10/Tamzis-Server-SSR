import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function ProgramPemberdayaanDhuafa() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Program Pemberdayaan Ekonomi - TAMZIS Bina Utama',
            heading: 'Program Pemberdayaan Ekonomi',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Program Pemberdayaan Ekonomi',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Program Pemberdayaan Ekonomi',
                hadits: '"Program pengembangan usaha produktif untuk meningkatkan kemandirian ekonomi masyarakat dhuafa."',
                haditsSource: '',
                content: `LATAR BELAKANG
Kemiskinan masih menjadi persoalan utama yang dihadapi sebagian masyarakat di berbagai daerah. Keterbatasan akses terhadap modal usaha, kurangnya keterampilan, dan rendahnya tingkat pendidikan menjadi faktor yang menyebabkan kelompok dhuafa sulit keluar dari lingkaran kemiskinan. Oleh karena itu, diperlukan intervensi yang tidak hanya bersifat karitatif sesaat, tetapi juga bersifat pemberdayaan yang berkelanjutan.

Program pemberdayaan ekonomi untuk dhuafa hadir sebagai salah satu solusi strategis dalam membantu masyarakat miskin agar mampu mandiri secara ekonomi. Melalui pemberian pelatihan, bantuan modal usaha, dan pendampingan yang sistematis, diharapkan penerima manfaat mampu mengembangkan usaha kecil secara produktif dan meningkatkan kualitas hidup mereka.

TUJUAN
• Meningkatkan pendapatan dan kemandirian ekonomi dhuafa.
• Menciptakan model pemberdayaan yang berkelanjutan dan terukur.
• Menurunkan angka kemiskinan melalui pendekatan usaha produktif.

SASARAN
• Masyarakat miskin dan dhuafa yang memiliki potensi, motivasi, dan kemauan kuat untuk menjalankan usaha produktif.
• Pelaku usaha mikro yang belum bankable namun memiliki semangat wirausaha.`,
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
            title: 'Economic Empowerment Program - TAMZIS Bina Utama',
            heading: 'Economic Empowerment Program',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Economic Empowerment Program',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Economic Empowerment Program',
                hadits: '"A productive business development program to improve the economic independence of dhuafa communities."',
                haditsSource: '',
                content: `BACKGROUND
Poverty remains a major issue faced by segments of society in various regions. Limited access to business capital, lack of skills, and low education levels are factors that make it difficult for dhuafa groups to escape the cycle of poverty. Therefore, intervention is needed that is not only momentarily charitable but also sustainably empowering.

The economic empowerment program for dhuafa serves as one strategic solution in helping impoverished communities become economically independent. Through the provision of training, business capital assistance, and systematic mentoring, beneficiaries are expected to be able to develop small businesses productively and improve their quality of life.

OBJECTIVES
• Increase income and economic independence of dhuafa.
• Create a sustainable and measurable empowerment model.
• Reduce poverty rates through a productive business approach.

TARGETS
• Impoverished and dhuafa communities who have potential, motivation, and strong willingness to run productive businesses.
• Micro-business actors who are not yet bankable but have entrepreneurial spirit.`,
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
                                        <source type="image/webp" srcSet="/assets/img/menu/Program-Pemberdayaan-Ekonomi.webp" />
                                        <ImageWithFallback src="/assets/img/menu/Program-Pemberdayaan-Ekonomi.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/program-pemberdayaan-dhuafa"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Program%20Pemberdayaan%20Ekonomi" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
