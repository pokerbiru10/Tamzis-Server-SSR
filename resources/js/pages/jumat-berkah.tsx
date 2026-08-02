import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function JumatBerkah() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Jumat Berkah - TAMZIS Bina Utama',
            heading: 'Jumat Berkah',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Jumat Berkah',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Jumat Berkah',
                hadits: '"Program berbagi makanan dan bantuan sosial untuk kaum dhuafa serta masyarakat sekitar masjid dan pasar."',
                haditsSource: '',
                content: `LATAR BELAKANG
Kebutuhan pangan merupakan kebutuhan dasar setiap manusia yang wajib dipenuhi. Namun, kenyataannya masih banyak masyarakat di sekitar kita, khususnya kaum dhuafa, pekerja informal, tunawisma, lansia terlantar, dan anak jalanan yang mengalami kesulitan dalam memenuhi kebutuhan makan harian.

Sebagai bentuk kepedulian sosial dan pengamalan nilai-nilai kemanusiaan serta ajaran agama, maka dibutuhkan program yang langsung menyentuh kebutuhan dasar tersebut secara praktis dan bermanfaat. Salah satu bentuk aksi nyata adalah kegiatan berbagi nasi bungkus, yaitu menyediakan makanan siap santap yang layak dan bergizi kepada mereka yang membutuhkan.

Program ini tidak hanya menjadi sarana untuk membantu sesama, tetapi juga sebagai wadah membangun semangat berbagi, gotong royong, serta menumbuhkan rasa empati di kalangan masyarakat. Pelaksanaan program berbagi nasi bungkus dapat dilakukan secara rutin, khususnya pada hari-hari tertentu seperti hari Jumat, bulan Ramadhan, atau saat terjadi bencana dan kondisi darurat.

Dengan adanya SOP ini, diharapkan pelaksanaan program berbagi nasi bungkus dapat berjalan lebih terorganisir, terukur, dan berkelanjutan sehingga manfaatnya dapat dirasakan secara maksimal oleh para penerima manfaat.

TUJUAN
• Menumbuhkan empati sosial melalui aksi nyata berbagi makanan.
• Membantu masyarakat dhuafa dan yang membutuhkan.
• Menghidupkan semangat berbagi di hari yang penuh berkah.
• Membangun kedekatan antara lembaga dan masyarakat.
• Mengajak partisipasi publik dalam kegiatan sosial.

SASARAN
Prosedur ini ditujukan kepada masyarakat yang tergolong 8 asnaf di wilayah kerja Tamzis, baik di sekitar cabang, pasar, dan masjid.`,
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
            title: 'Blessed Friday - TAMZIS Bina Utama',
            heading: 'Blessed Friday',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Blessed Friday',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Blessed Friday',
                hadits: '"A program for sharing meals and social assistance for dhuafa and communities around mosques and markets."',
                haditsSource: '',
                content: `BACKGROUND
Food needs are a basic human necessity that must be fulfilled. However, the reality is that many people around us, particularly the dhuafa, informal workers, homeless individuals, abandoned elderly, and street children, experience difficulties in meeting their daily food needs.

As a form of social care and the practice of humanitarian values and religious teachings, a program is needed that directly addresses these basic needs in a practical and beneficial way. One form of concrete action is the distribution of packed meals, providing ready-to-eat food that is decent and nutritious to those in need.

This program is not only a means to help others but also a platform to build a spirit of sharing, mutual cooperation, and fostering empathy among communities. The implementation of the packed meal distribution program can be carried out regularly, especially on certain days such as Fridays, during the month of Ramadhan, or when disasters and emergency conditions occur.

With this SOP, it is hoped that the packed meal distribution program can run in a more organized, measurable, and sustainable manner so that its benefits can be maximally felt by the recipients.

OBJECTIVES
• Foster social empathy through concrete action of sharing meals.
• Help dhuafa communities and those in need.
• Revive the spirit of sharing on a blessed day.
• Build closeness between the institution and the community.
• Encourage public participation in social activities.

TARGETS
This procedure is aimed at communities classified within the 8 asnaf categories in the Tamzis working area, both around branches, markets, and mosques.`,
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
                                    <source type="image/webp" srcSet="/assets/img/menu/jumat-berkah.webp" />
                                    <ImageWithFallback src="/assets/img/menu/jumat-berkah.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/jumat-berkah"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Jumat%20Berkah" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
