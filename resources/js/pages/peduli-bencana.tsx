import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function PeduliBencana() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Peduli Bencana - TAMZIS Bina Utama',
            heading: 'Peduli Bencana',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Peduli Bencana',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Peduli Bencana (Tanggap Bencana & Kemanusiaan)',
                hadits: '"Program tanggap darurat dan pemulihan pasca bencana."',
                haditsSource: '',
                content: `LATAR BELAKANG
Program Tanggap Bencana dan Kemanusiaan merupakan program kemanusiaan yang diselenggarakan sebagai bentuk kepedulian terhadap masyarakat yang terdampak bencana alam maupun bencana nonalam. Program ini bertujuan memberikan respons yang cepat, tepat, dan terkoordinasi dalam memenuhi kebutuhan dasar para penyintas, sekaligus mendukung proses pemulihan kehidupan mereka secara bertahap.

Pelaksanaan program dilakukan melalui beberapa tahapan, yaitu kesiapsiagaan, respons darurat, transisi menuju pemulihan, dan rehabilitasi. Bantuan yang diberikan tidak hanya berupa kebutuhan logistik seperti makanan, air bersih, pakaian, selimut, dan obat-obatan, tetapi juga mencakup layanan kesehatan, dukungan psikososial, layanan spiritual, penyediaan hunian sementara, perbaikan sarana umum, hingga pemberdayaan ekonomi masyarakat pascabencana.

Program ini dilaksanakan dengan mengedepankan prinsip kemanusiaan, profesionalisme, akuntabilitas, transparansi, kecepatan, kolaborasi, dan kebermanfaatan, serta melibatkan berbagai pihak, seperti pemerintah, BPBD, relawan, komunitas, dunia usaha, media, dan masyarakat sebagai mitra dalam aksi kemanusiaan.

Melalui Program Tanggap Bencana dan Kemanusiaan, diharapkan lembaga mampu menjadi garda terdepan dalam memberikan pelayanan kemanusiaan yang cepat tanggap, tepat sasaran, dan berkelanjutan, sehingga masyarakat terdampak dapat segera bangkit dan kembali menjalankan kehidupan secara mandiri.

TUJUAN
Program Tanggap Bencana dan Kemanusiaan bertujuan untuk:
• Memberikan respons cepat terhadap kejadian bencana guna meminimalkan dampak yang dialami masyarakat.
• Memenuhi kebutuhan dasar penyintas bencana secara cepat, layak, dan tepat sasaran.
• Menyelenggarakan penyaluran bantuan yang transparan, profesional, dan akuntabel.
• Memberikan perlindungan kepada kelompok rentan seperti anak-anak, lansia, ibu hamil, ibu menyusui, dan penyandang disabilitas.
• Mendukung proses pemulihan sosial, ekonomi, pendidikan, kesehatan, dan spiritual masyarakat terdampak.
• Membangun sinergi dengan pemerintah, lembaga kemanusiaan, dunia usaha, komunitas, dan relawan dalam penanggulangan bencana.
• Mengoptimalkan partisipasi masyarakat dan para donatur dalam aksi kemanusiaan.
• Meningkatkan ketangguhan masyarakat dalam menghadapi risiko bencana melalui kegiatan edukasi dan kesiapsiagaan.

SASARAN
A. Sasaran Penerima Manfaat
• Korban bencana alam, seperti gempa bumi, banjir, tanah longsor, angin puting beliung, tsunami, letusan gunung api, kebakaran hutan, dan kekeringan.
• Korban bencana nonalam, seperti wabah penyakit, kegagalan teknologi, dan kejadian luar biasa lainnya.
• Korban bencana sosial dan konflik kemanusiaan sesuai kebijakan lembaga.
• Masyarakat yang kehilangan tempat tinggal, mata pencaharian, atau akses terhadap kebutuhan dasar akibat bencana.

B. Kelompok Prioritas
• Anak-anak.
• Anak yatim/piatu terdampak bencana.
• Lansia.
• Ibu hamil dan ibu menyusui.
• Penyandang disabilitas.
• Kepala keluarga perempuan.
• Keluarga dhuafa yang terdampak bencana.

C. Sasaran Wilayah
Program dilaksanakan pada wilayah yang ditetapkan sebagai daerah terdampak bencana berdasarkan hasil asesmen lapangan dan/atau penetapan status bencana oleh pemerintah, baik di tingkat desa, kecamatan, kabupaten/kota, provinsi, maupun nasional, dengan mempertimbangkan tingkat kerusakan, jumlah penyintas, urgensi kebutuhan, serta kapasitas penanganan yang tersedia.`,
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
            title: 'Disaster Care - TAMZIS Bina Utama',
            heading: 'Disaster Care',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Disaster Care',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Disaster Care (Disaster Response & Humanitarian Aid)',
                hadits: '"An emergency response and post-disaster recovery program."',
                haditsSource: '',
                content: `BACKGROUND
The Disaster Response and Humanitarian Aid Program is a humanitarian initiative organized as a form of care for communities affected by natural and non-natural disasters. This program aims to provide rapid, accurate, and coordinated responses in meeting the basic needs of survivors, while simultaneously supporting the gradual process of restoring their lives.

Program implementation is carried out through several stages, namely preparedness, emergency response, transition toward recovery, and rehabilitation. Assistance provided is not limited to logistical needs such as food, clean water, clothing, blankets, and medicines, but also encompasses health services, psychosocial support, spiritual services, temporary shelter provision, public facility repairs, and post-disaster community economic empowerment.

This program is implemented with emphasis on the principles of humanity, professionalism, accountability, transparency, speed, collaboration, and usefulness, involving various parties such as the government, BPBD (Regional Disaster Management Agency), volunteers, communities, businesses, media, and the public as partners in humanitarian action.

Through the Disaster Response and Humanitarian Aid Program, the institution is expected to become the front line in providing humanitarian services that are responsive, well-targeted, and sustainable, so that affected communities can quickly recover and resume independent living.

OBJECTIVES
The Disaster Response and Humanitarian Aid Program aims to:
• Provide rapid response to disaster events to minimize the impact on communities.
• Fulfill the basic needs of disaster survivors quickly, adequately, and with accurate targeting.
• Organize transparent, professional, and accountable aid distribution.
• Provide protection to vulnerable groups such as children, the elderly, pregnant women, nursing mothers, and persons with disabilities.
• Support the social, economic, educational, health, and spiritual recovery processes of affected communities.
• Build synergy with the government, humanitarian institutions, businesses, communities, and volunteers in disaster management.
• Optimize community and donor participation in humanitarian action.
• Enhance community resilience in facing disaster risks through education and preparedness activities.

TARGETS
A. Beneficiary Targets
• Victims of natural disasters, such as earthquakes, floods, landslides, tornadoes, tsunamis, volcanic eruptions, forest fires, and droughts.
• Victims of non-natural disasters, such as disease outbreaks, technological failures, and other extraordinary events.
• Victims of social disasters and humanitarian conflicts according to institutional policy.
• Communities who have lost their homes, livelihoods, or access to basic needs due to disasters.

B. Priority Groups
• Children.
• Orphaned children affected by disasters.
• The elderly.
• Pregnant women and nursing mothers.
• Persons with disabilities.
• Female-headed households.
• Dhuafa families affected by disasters.

C. Regional Targets
The program is implemented in areas designated as disaster-affected regions based on field assessments and/or government disaster status declarations, at village, sub-district, district/city, provincial, or national levels, considering the level of damage, number of survivors, urgency of needs, and available response capacity.`,
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
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/assets/img/header/Cinta-masjid.webp')" }}
                    />
                    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight drop-shadow-md sm:text-4xl">
                            {t.heading}
                        </h1>
                        <nav className="flex items-center justify-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-emerald-100/50 uppercase">
                            <Link href="/" className="transition-colors hover:text-white">
                                {t.breadcrumb.home}
                            </Link>
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
                                    <h2 className="mb-3 text-[10px] font-bold tracking-[0.2em] text-emerald-300/80 uppercase">
                                        {t.hero.badge}
                                    </h2>
                                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
                                        {t.hero.title}
                                    </h3>
                                </div>
                                <div className="mb-8 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                                <picture>
                                    <source type="image/webp" srcSet="/assets/img/menu/gempa.webp" />
                                    <ImageWithFallback
                                        src="/assets/img/menu/gempa.png"
                                        alt={t.hero.title}
                                        aspectRatio="video"
                                    />
                                </picture>
                                </div>
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
                            <div className="min-h-[1px]" />
                        </div>

                        <div className="sticky top-24 space-y-8">
                            <SidebarMenuNav
                                group="baitul-maal"
                                locale={locale}
                                activeUrl="/peduli-bencana"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

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
                                    href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Peduli%20Bencana"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95"
                                >
                                    Chat WhatsApp
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
