import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    Phone,
    Target,
    Building2,
    Heart,
    Sparkles,
} from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function PusatJajananSelamaRamadhan() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Pusat Jajanan Selama Ramadhan - TAMZIS Bina Utama',
            heading: 'Pusat Jajanan Selama Ramadhan',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Pusat Jajanan Selama Ramadhan',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Pusat Jajanan Selama Ramadhan',
                hadits: '"Program syiar Ramadhan sekaligus pemberdayaan ekonomi pedagang kecil."',
                haditsSource: '',
                content: `PENDAHULUAN
Bulan Ramadhan merupakan momentum istimewa bagi umat Islam untuk menguatkan iman, meningkatkan kepedulian sosial, serta memperluas manfaat bagi sesama. Nilai-nilai spiritual yang tumbuh di bulan suci ini seharusnya tidak hanya berhenti pada aspek ibadah personal, tetapi juga terwujud dalam upaya nyata membangun kemandirian ekonomi masyarakat, khususnya kelompok dhuafa dan pelaku usaha kecil.

Di tengah tantangan ekonomi yang masih dirasakan sebagian masyarakat, pelaku usaha mikro terutama dari kalangan dhuafa sering menghadapi keterbatasan akses permodalan, pemasaran, dan ruang usaha yang layak. Kondisi ini menuntut adanya ikhtiar bersama untuk menghadirkan wadah pemberdayaan yang tidak hanya bersifat konsumtif, tetapi juga edukatif dan berkelanjutan.

Berangkat dari semangat tersebut, kegiatan PUJASERA Tamzis diselenggarakan sebagai bentuk integrasi antara penguatan nilai keimanan dan pemberdayaan ekonomi. Melalui konsep pasar kuliner dan UMKM yang tertata, halal, dan berorientasi pada kemaslahatan, PUJASERA Tamzis menjadi ruang tumbuh bagi pelaku usaha kecil untuk mengembangkan usahanya, meningkatkan pendapatan, serta melatih kemandirian secara bertahap.

Tema "Menguatkan Iman, Menumbuhkan Usaha & Kemandirian" menjadi landasan utama kegiatan ini. Setiap transaksi yang terjadi tidak hanya bernilai ekonomi tetapi juga mengandung nilai ibadah, solidaritas, dan kepedulian sosial. Dengan demikian PUJASERA Tamzis diharapkan mampu menjadi sarana dakwah ekonomi, menghadirkan keberkahan, menumbuhkan usaha, dan mendorong terwujudnya kemandirian ekonomi masyarakat secara bermartabat.

Melalui kegiatan ini, diharapkan terbangun ekosistem usaha yang sehat, inklusif, dan berkelanjutan, sekaligus memperkuat peran lembaga dalam mendampingi dan mengangkat ekonomi dhuafa menuju kehidupan yang lebih mandiri dan sejahtera.

BENTUK KEGIATAN
Kegiatan Utama: Bazar kuliner Pujasera.
Kegiatan Penunjang:
• Obrolan Ngabuburit (Dakwah On The Street)
• Bahagia Bersama 1.000 anak yatim dan dhuafa
• Jumat Berkah
• Pentas Nasyid
• Lomba Video
• Musik Akustik Islami

TUJUAN KEGIATAN
• Pemberdayaan UMKM dhuafa.
• Menguatkan iman dan nilai keagamaan masyarakat melalui aktivitas ekonomi Ramadhan yang halal, tertib, dan bernilai ibadah.
• Menumbuhkan usaha mikro khususnya pelaku UMKM dhuafa dengan menyediakan ruang usaha yang layak dan produktif.
• Mendorong kemandirian ekonomi pelaku usaha dhuafa melalui peningkatan pendapatan dan pengalaman berusaha.

TARGET KEGIATAN
Kegiatan utama: terhimpunnya 80 pedagang super mikro dengan jumlah pengunjung 1.000 orang per hari, selama bulan Ramadhan 1447 H/2026 M.
Kegiatan penunjang:
• Obrolan Ngabuburit (Dakwah on The Street) — obrolan ringan di lokasi Pujasera tentang masalah-masalah agama dan kemasyarakatan.
• Bahagia bersama 1.000 Anak Yatim dan Dhuafa — santunan yang dilaksanakan di beberapa panti asuhan di Wonosobo, Kedu, Yogyakarta, Kendal, Purworejo, Kebumen, Soloraya, Banyumas, Bandung, dan Jakarta.
• Takjil Gratis/Pasar Murah — program berbagi takjil gratis untuk pengunjung atau yang membutuhkan.
• Pentas Nasyid Islami — unjuk seni dari para santri TPQ/TPA maupun siswa SD di sekitar Wonosobo.
• Lomba Pedagang Pujasera — wadah memfasilitasi anak muda yang kreatif dalam dunia grafis.
• Musik Akustik — penampilan anak muda yang berbakat dalam nuansa Ramadhan dengan lagu religi.

WAKTU KEGIATAN
• Bazar Kuliner Pujasera 18 berlangsung mulai 18 Februari s/d 13 Maret 2026, atau 1 s/d 24 Ramadhan 1447 H, setiap hari sekitar pukul 15.00 hingga maghrib.
• Bahagia Bersama 1.000 anak yatim dan dhuafa: setiap hari Senin dan Kamis selama Ramadhan 1447 H.
• Takjil Gratis: setiap hari Jumat.
• Pentas Nasyid Cilik: 1 Maret 2026.
• Live Musik Akustik: 22 Februari dan 18 Maret 2026.
• Lomba video Pujasera 18: s/d 13 Maret 2026.
• Obrolan Ngabuburit (Dakwah on The Street): Selasa dan Sabtu selama Ramadhan 1447 H.

TEMPAT KEGIATAN
Kegiatan bazar, obrolan ngabuburit, pentas nasyid, lomba video, dan live musik religi menggunakan tempat di trotoar sepanjang Jalan Mayor Mu'in Wonosobo, sedangkan santunan 1.000 anak yatim dan dhuafa dilaksanakan di asrama panti asuhan.

SASARAN/PEMANFAAT KEGIATAN
• Pemanfaat dari program ini yaitu para ibu rumah tangga yang memiliki waktu luang, diharapkan dari kalangan kaum dhuafa kota Wonosobo dan sekitarnya.
• Obrolan ngabuburit memberi manfaat bagi semua pengunjung Pujasera di Jalan Mayor Mu'in dan masyarakat sekitarnya.
• Santunan 1.000 anak yatim dan dhuafa dilakukan bersama anak-anak panti asuhan di area-area TAMZIS seluruh Indonesia.
• Pentas rebana/nasyid cilik menampilkan seni dari para santri TPQ/TPA maupun siswa SD di sekitar Wonosobo.
• Musik Akustik menampilkan pemuda hobi musik di sekitar Wonosobo dengan melibatkan pedagang, pengunjung Pujasera, dan masyarakat sekitar.

FASILITAS KEGIATAN
Dalam program pemberdayaan ini Panitia Pujasera 18 menyediakan kaos, payung besar, tenda, dan meja jualan. Selain itu, bagi peserta pemberdayaan di Pujasera yang berkeinginan untuk menambah modal dapat mengajukan pinjaman ke Baitul Maal TAMZIS (ULAZ MKU TAMZIS) dengan menggunakan akad Qordul Hasan.`,
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
            title: 'Ramadhan Food Center - TAMZIS Bina Utama',
            heading: 'Ramadhan Food Center',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Ramadhan Food Center',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Ramadhan Food Center',
                hadits: '"Ramadhan outreach program and small trader economic empowerment."',
                haditsSource: '',
                content: `INTRODUCTION
The month of Ramadhan is a special moment for Muslims to strengthen faith, increase social care, and expand benefits for others. The spiritual values that grow during this holy month should not only stop at personal worship aspects but also be realized in concrete efforts to build community economic independence, particularly dhuafa groups and small business actors.

Amid economic challenges still felt by segments of society, micro-business actors, especially from dhuafa circles, often face limitations in access to capital, marketing, and decent business space. This condition demands collective effort to provide an empowerment platform that is not only consumptive but also educational and sustainable.

Based on this spirit, the PUJASERA Tamzis activity is organized as a form of integration between strengthening faith values and economic empowerment. Through the concept of a well-organized, halal culinary and MSME market oriented toward public welfare, PUJASERA Tamzis becomes a growing space for small business actors to develop their businesses, increase income, and gradually train independence.

The theme "Strengthening Faith, Growing Businesses & Independence" becomes the main foundation of this activity. Every transaction that occurs not only has economic value but also contains worship value, solidarity, and social care. Thus, PUJASERA Tamzis is expected to become a means of economic da'wah, bringing blessings, growing businesses, and encouraging the realization of dignified community economic independence.

Through this activity, it is hoped that a healthy, inclusive, and sustainable business ecosystem will be built, while strengthening the institution's role in mentoring and lifting dhuafa economics toward a more independent and prosperous life.

ACTIVITY FORM
Main Activity: Pujasera Culinary Bazaar.
Supporting Activities:
• Ngabuburit Talks (Dakwah On The Street)
• Happiness with 1,000 Orphan and Dhuafa Children
• Blessed Friday
• Nasyid Performance
• Video Competition
• Islamic Acoustic Music

ACTIVITY OBJECTIVES
• Empowering dhuafa MSMEs.
• Strengthening faith and religious values of the community through halal, orderly, and worship-valued Ramadhan economic activities.
• Growing micro-businesses, particularly dhuafa MSME actors by providing decent and productive business space.
• Encouraging economic independence of dhuafa business actors through increased income and business experience.

ACTIVITY TARGETS
Main activity: gathering 80 super micro traders with 1,000 visitors per day, during Ramadhan 1447 H/2026 M.
Supporting activities:
• Ngabuburit Talks (Dakwah on The Street) — light conversations at the Pujasera location about religious and community issues.
• Happiness with 1,000 Orphan and Dhuafa Children — assistance carried out in several orphanages in Wonosobo, Kedu, Yogyakarta, Kendal, Purworejo, Kebumen, Soloraya, Banyumas, Bandung, and Jakarta.
• Free Takjil/Low-Cost Market — a free takjil sharing program for visitors or those in need.
• Islamic Nasyid Performance — art performances from TPQ/TPA students and elementary students around Wonosobo.
• Pujasera Trader Competition — a platform to facilitate creative youth in the graphic design world.
• Acoustic Music — performances by talented youth in Ramadhan nuances with religious songs.

ACTIVITY TIME
• Pujasera 18 Culinary Bazaar runs from February 18 to March 13, 2026, or 1 to 24 Ramadhan 1447 H, every day around 15:00 until maghrib.
• Happiness with 1,000 Orphan and Dhuafa Children: every Monday and Thursday during Ramadhan 1447 H.
• Free Takjil: every Friday.
• Children's Nasyid Performance: March 1, 2026.
• Live Acoustic Music: February 22 and March 18, 2026.
• Pujasera 18 Video Competition: until March 13, 2026.
• Ngabuburit Talks (Dakwah on The Street): Tuesday and Saturday during Ramadhan 1447 H.

ACTIVITY LOCATION
The bazaar, ngabuburit talks, nasyid performances, video competition, and live religious music activities use the sidewalk space along Jalan Mayor Mu'in Wonosobo, while the assistance for 1,000 orphan and dhuafa children is carried out at orphanage dormitories.

TARGETS/BENEFICIARIES OF THE ACTIVITY
• Beneficiaries of this program are housewives who have free time, expected to come from dhuafa circles in Wonosobo city and surrounding areas.
• Ngabuburit talks benefit all Pujasera visitors on Jalan Mayor Mu'in and surrounding communities.
• Assistance for 1,000 orphan and dhuafa children is carried out together with orphanage children in TAMZIS areas throughout Indonesia.
• Children's rebana/nasyid performances showcase art from TPQ/TPA students and elementary students around Wonosobo.
• Acoustic Music features youth with music hobbies around Wonosobo involving traders, Pujasera visitors, and surrounding communities.

ACTIVITY FACILITIES
In this empowerment program, the Pujasera 18 Committee provides t-shirts, large umbrellas, tents, and sales tables. Additionally, for empowerment participants at Pujasera who wish to add capital, they can apply for a loan from Baitul Maal TAMZIS (ULAZ MKU TAMZIS) using a Qordul Hasan contract.`,
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

    const t =
        translations[locale as keyof typeof translations] || translations.id;

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
                                    <source type="image/webp" srcSet="/assets/img/menu/pusat-jajanan.webp" />
                                    <ImageWithFallback
                                        src="/assets/img/menu/pusat-jajanan.png"
                                        alt={t.hero.title}
                                        aspectRatio="video"
                                    />
                                </picture>
                                </div>

                                {/* Hadits Quote */}
                                <blockquote className="mb-6 border-l-4 border-emerald-400 py-2 pl-6">
                                    <p className="text-lg leading-snug font-bold text-white italic sm:text-xl">
                                        {t.hero.hadits}
                                    </p>
                                    <footer className="mt-2 text-[10px] font-semibold tracking-wide text-emerald-300">
                                        {t.hero.haditsSource}
                                    </footer>
                                </blockquote>

                                <p className="text-sm leading-relaxed font-medium whitespace-pre-line text-white/80">
                                    {t.hero.content}
                                </p>
                            </div>

                            {/* Main content intentionally limited to hero and sidebar */}
                        </div>

                        {/* Sidebar */}
                        <div className="sticky top-24 space-y-8">
                            {/* Program List */}
                            <SidebarMenuNav
                                group="baitul-maal"
                                locale={locale}
                                activeUrl="/pusat-jajanan-selama-ramadhan"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            {/* Contact Box */}
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
                                    href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Cinta%20Masjid"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    <svg
                                        className="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
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
