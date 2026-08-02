import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function ProgramPeduliKesehatan() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Peduli Kesehatan - TAMZIS Bina Utama',
            heading: 'Peduli Kesehatan',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Peduli Kesehatan',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Peduli Kesehatan',
                hadits: '"Program pelayanan kesehatan bagi masyarakat dhuafa agar memperoleh akses kesehatan yang layak."',
                haditsSource: '',
                content: `PROGRAM
Program Peduli Kesehatan merupakan program pelayanan sosial yang bertujuan untuk meningkatkan derajat kesehatan masyarakat, khususnya fakir, miskin, dhuafa, dan kelompok rentan, melalui pemberian bantuan kesehatan, layanan promotif, preventif, kuratif, serta dukungan rehabilitatif sesuai kebutuhan. Program ini hadir sebagai bentuk kepedulian ULAZ MKU Tamzis dalam membantu masyarakat memperoleh akses terhadap layanan kesehatan yang layak sehingga dapat menjalani kehidupan yang lebih sehat dan produktif.

Pelaksanaan program dilakukan melalui berbagai kegiatan, seperti bantuan biaya pengobatan, pemeriksaan kesehatan gratis, penyuluhan kesehatan, bantuan alat kesehatan, pemberian makanan tambahan bagi kelompok rentan, aksi donor darah, khitan massal, layanan ambulans, serta kegiatan kesehatan lainnya yang memberikan manfaat bagi masyarakat. Selain itu, program ini juga mendorong pola hidup bersih dan sehat melalui edukasi serta kolaborasi dengan fasilitas kesehatan, tenaga medis, pemerintah, dan berbagai mitra strategis.

Program Peduli Kesehatan dilaksanakan berdasarkan prinsip kemanusiaan, kepedulian, profesionalisme, amanah, transparansi, akuntabilitas, dan tepat sasaran, sehingga setiap bantuan yang diberikan mampu memberikan manfaat yang optimal bagi penerima.

MAKSUD DAN TUJUAN
Program Peduli Kesehatan bertujuan untuk meningkatkan akses masyarakat terhadap layanan kesehatan yang berkualitas, membantu meringankan beban biaya kesehatan bagi masyarakat dhuafa, meningkatkan kesadaran akan pentingnya perilaku hidup bersih dan sehat, serta mendukung upaya pencegahan dan penanganan masalah kesehatan melalui pelayanan kesehatan yang mudah diakses, tepat sasaran, dan berkelanjutan. Program ini juga bertujuan memperkuat kolaborasi dengan berbagai pihak dalam mewujudkan masyarakat yang sehat, mandiri, dan produktif.

SASARAN/OBYEK
Program Peduli Kesehatan ditujukan kepada:
• Fakir, miskin, dan dhuafa yang membutuhkan bantuan layanan kesehatan.
• Anak-anak, balita, ibu hamil, ibu menyusui, dan lansia.
• Penyandang disabilitas dan kelompok rentan lainnya.
• Pasien yang membutuhkan bantuan biaya pengobatan atau alat kesehatan.
• Masyarakat di wilayah binaan ULAZ MKU Tamzis maupun masyarakat umum yang memerlukan layanan kesehatan.
• Masjid, musala, sekolah, pondok pesantren, dan komunitas yang menjadi lokasi penyelenggaraan kegiatan kesehatan masyarakat.

MANFAAT PROGRAM
Program Peduli Kesehatan memberikan manfaat dalam meningkatkan akses masyarakat, khususnya fakir, miskin, dhuafa, dan kelompok rentan, terhadap layanan kesehatan yang layak dan berkualitas. Melalui program ini, masyarakat memperoleh dukungan dalam memenuhi kebutuhan kesehatan, baik berupa bantuan biaya pengobatan, layanan pemeriksaan kesehatan, edukasi kesehatan, maupun bentuk bantuan lainnya, sehingga dapat meringankan beban ekonomi keluarga dan meningkatkan kualitas hidup.

Selain itu, program ini berperan dalam menumbuhkan kesadaran masyarakat akan pentingnya menjaga kesehatan melalui penerapan perilaku hidup bersih dan sehat, pencegahan penyakit, serta pemeriksaan kesehatan secara berkala. Program ini juga memperkuat kepedulian sosial dan semangat gotong royong dengan melibatkan berbagai pihak, seperti tenaga kesehatan, relawan, mitra, dan masyarakat dalam memberikan pelayanan kesehatan yang lebih luas.

Bagi ULAZ MKU Tamzis, Program Peduli Kesehatan menjadi salah satu wujud optimalisasi penyaluran dana zakat, infak, sedekah, dan dana sosial keagamaan lainnya secara amanah, profesional, transparan, dan tepat sasaran. Dengan demikian, program ini diharapkan mampu menciptakan masyarakat yang lebih sehat, mandiri, produktif, serta memiliki kualitas hidup yang lebih baik sehingga dapat berkontribusi secara optimal bagi keluarga, lingkungan, dan masyarakat.`,
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
            },
        },
        en: {
            title: 'Health Care - TAMZIS Bina Utama',
            heading: 'Health Care',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Health Care',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Health Care',
                hadits: '"Healthcare services for underprivileged communities so they can access proper medical care."',
                haditsSource: '',
                content: `PROGRAM
The Health Care Program is a social service program aimed at improving public health, particularly for the poor, impoverished, dhuafa, and vulnerable groups, through health assistance, promotive, preventive, curative services, and rehabilitative support according to needs. This program serves as a form of care from ULAZ MKU Tamzis in helping communities obtain access to decent health services so they can lead healthier and more productive lives.

Program implementation is carried out through various activities, such as medical cost assistance, free health check-ups, health counseling, medical equipment assistance, supplementary food provision for vulnerable groups, blood donation drives, mass circumcisions, ambulance services, and other health activities that benefit the community. Additionally, this program also promotes clean and healthy living patterns through education and collaboration with health facilities, medical personnel, government, and various strategic partners.

The Health Care Program is implemented based on the principles of humanity, care, professionalism, trustworthiness, transparency, accountability, and accurate targeting, so that every assistance provided can provide optimal benefits to recipients.

PURPOSE AND OBJECTIVES
The Health Care Program aims to improve community access to quality health services, help ease the health cost burden for dhuafa communities, increase awareness of the importance of clean and healthy living behavior, and support prevention and handling of health problems through easily accessible, well-targeted, and sustainable health services. This program also aims to strengthen collaboration with various parties in realizing a healthy, independent, and productive society.

TARGETS/OBJECTS
The Health Care Program is aimed at:
• The poor, impoverished, and dhuafa who need health service assistance.
• Children, toddlers, pregnant women, nursing mothers, and the elderly.
• Persons with disabilities and other vulnerable groups.
• Patients who need medical cost assistance or medical equipment.
• Communities in ULAZ MKU Tamzis fostered areas and the general public who need health services.
• Mosques, musalas, schools, Islamic boarding schools, and communities that become locations for community health activities.

PROGRAM BENEFITS
The Health Care Program provides benefits in improving community access, particularly the poor, impoverished, dhuafa, and vulnerable groups, to decent and quality health services. Through this program, communities obtain support in meeting health needs, whether in the form of medical cost assistance, health check-up services, health education, or other forms of assistance, thereby reducing the economic burden on families and improving quality of life.

Additionally, this program plays a role in raising community awareness about the importance of maintaining health through the implementation of clean and healthy living behavior, disease prevention, and regular health check-ups. This program also strengthens social care and mutual cooperation spirit by involving various parties, such as health workers, volunteers, partners, and the community in providing broader health services.

For ULAZ MKU Tamzis, the Health Care Program is one form of optimizing the distribution of zakat, infak, sedekah, and other religious social funds in a trustworthy, professional, transparent, and well-targeted manner. Thus, this program is expected to create a healthier, more independent, and more productive society with better quality of life so they can contribute optimally to their families, environment, and community.`,
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
                    <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/img/menu/peduli-masyarakat.webp')" }} />
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
                                    <source type="image/webp" srcSet="/assets/img/menu/peduli-masyarakat.webp" />
                                    <ImageWithFallback src="/assets/img/menu/peduli-masyarakat.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/program-peduli-kesehatan"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
