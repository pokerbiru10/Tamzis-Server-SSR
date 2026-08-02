import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function PeduliSosialKeagamaan() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'Peduli Sosial Keagamaan - TAMZIS Bina Utama',
            heading: 'Peduli Sosial Keagamaan',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'Peduli Sosial Keagamaan',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'Peduli Sosial Keagamaan',
                hadits: '"Program partisipasi sosial untuk mendukung kegiatan keagamaan, kemanusiaan dan sarana umum masyarakat."',
                haditsSource: '',
                content: `LATAR BELAKANG
Program Peduli Sosial Keagamaan merupakan program kepedulian masyarakat yang bertujuan untuk mendukung berbagai kegiatan sosial, keagamaan, kemanusiaan, serta pengembangan sarana dan prasarana umum yang memberikan manfaat luas bagi masyarakat. Program ini menjadi wujud nyata semangat gotong royong, kepedulian, dan solidaritas sosial dalam membantu memenuhi kebutuhan masyarakat, khususnya bagi kelompok dhuafa, lembaga keagamaan, dan komunitas yang membutuhkan dukungan.

Pelaksanaan program dilakukan melalui pemberian bantuan baik dalam bentuk dana, barang, maupun fasilitas yang mendukung kegiatan ibadah, pendidikan keagamaan, kegiatan sosial kemasyarakatan, serta pembangunan atau perbaikan sarana umum yang memiliki nilai kemanfaatan bersama. Selain itu, program ini juga mendukung berbagai kegiatan sosial kemanusiaan seperti santunan, bakti sosial, layanan masyarakat, bantuan fasilitas umum, dan kegiatan keagamaan pada momen-momen tertentu.

Program Peduli Sosial Keagamaan dilaksanakan berdasarkan prinsip amanah, profesional, transparan, akuntabel, tepat sasaran, dan berkelanjutan, dengan mengedepankan kolaborasi bersama masyarakat, pemerintah, lembaga pendidikan, pengurus masjid, organisasi kemasyarakatan, komunitas, serta mitra strategis lainnya.

Melalui program ini diharapkan tercipta masyarakat yang lebih peduli, saling membantu, memperkuat ukhuwah Islamiyah, serta meningkatkan kualitas kehidupan sosial dan keagamaan secara berkelanjutan.

TUJUAN
Program Peduli Sosial Keagamaan bertujuan untuk:
• Meningkatkan kepedulian sosial dan semangat berbagi kepada masyarakat yang membutuhkan.
• Mendukung penyelenggaraan kegiatan keagamaan yang memberikan manfaat bagi masyarakat luas.
• Membantu penyediaan, pembangunan, atau perbaikan sarana dan prasarana keagamaan serta fasilitas umum.
• Mendorong terciptanya lingkungan sosial yang harmonis, peduli, dan saling menguatkan.
• Memperkuat peran lembaga dalam pelayanan sosial dan keagamaan kepada masyarakat.
• Menjalin sinergi dengan pemerintah, komunitas, lembaga pendidikan, organisasi kemasyarakatan, dan mitra lainnya dalam pelaksanaan kegiatan sosial keagamaan.
• Meningkatkan kemanfaatan dana zakat, infak, sedekah, dan dana sosial keagamaan lainnya secara tepat sasaran dan berkelanjutan.

SASARAN
A. Sasaran Penerima Manfaat
• Masyarakat dhuafa dan rentan.
• Masjid, musala, TPQ/TPA, pondok pesantren, dan lembaga pendidikan Islam.
• Yayasan sosial dan lembaga keagamaan.
• Panti asuhan, panti sosial, dan rumah singgah.
• Majelis taklim dan kelompok pengajian.
• Komunitas sosial dan keagamaan.
• Masyarakat yang membutuhkan dukungan kegiatan sosial dan kemanusiaan.
• Pengelola sarana umum yang memberikan manfaat bagi masyarakat.

B. Sasaran Kegiatan
• Kegiatan keagamaan (pengajian, tabligh akbar, dakwah, peringatan hari besar Islam, pembinaan umat, dan kegiatan ibadah lainnya).
• Kegiatan sosial kemasyarakatan (bakti sosial, santunan, pelayanan masyarakat, bantuan kemanusiaan, dan aksi sosial lainnya).
• Pembangunan, renovasi, atau penyediaan sarana dan prasarana keagamaan.
• Penyediaan fasilitas umum yang menunjang kesejahteraan masyarakat.
• Program pemberdayaan sosial berbasis komunitas dan keagamaan.

C. Sasaran Wilayah
Program dilaksanakan di wilayah binaan maupun wilayah lain yang memenuhi kriteria penerima manfaat berdasarkan hasil survei, usulan masyarakat, atau rekomendasi dari mitra, dengan mempertimbangkan tingkat kebutuhan, manfaat, dan ketersediaan anggaran program.`,
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
            title: 'Social Religious Care - TAMZIS Bina Utama',
            heading: 'Social Religious Care',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'Social Religious Care',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'Social Religious Care',
                hadits: '"A social participation program to support religious activities, humanitarian efforts, and community facilities."',
                haditsSource: '',
                content: `BACKGROUND
The Social Religious Care Program is a community care initiative aimed at supporting various social, religious, humanitarian activities, and the development of public facilities and infrastructure that provide broad benefits to the community. This program is a concrete manifestation of the spirit of mutual cooperation, care, and social solidarity in helping meet community needs, particularly for dhuafa groups, religious institutions, and communities in need of support.

Program implementation is carried out through assistance in the form of funds, goods, or facilities that support worship activities, religious education, community social activities, as well as the construction or repair of public facilities that have shared beneficial value. Additionally, this program also supports various humanitarian social activities such as assistance, social services, community services, public facility assistance, and religious activities at certain moments.

The Social Religious Care Program is implemented based on the principles of trustworthiness, professionalism, transparency, accountability, accurate targeting, and sustainability, prioritizing collaboration with the community, government, educational institutions, mosque administrators, community organizations, communities, and other strategic partners.

Through this program, it is hoped to create a more caring community that helps each other, strengthens Islamic brotherhood, and improves the quality of social and religious life sustainably.

OBJECTIVES
The Social Religious Care Program aims to:
• Increase social care and the spirit of sharing to communities in need.
• Support the organization of religious activities that benefit the broader community.
• Help provide, construct, or repair religious infrastructure and public facilities.
• Encourage the creation of a harmonious, caring, and mutually strengthening social environment.
• Strengthen the institution's role in social and religious services to the community.
• Build synergy with the government, communities, educational institutions, community organizations, and other partners in implementing social religious activities.
• Optimize the utilization of zakat, infak, sedekah, and other religious social funds with accurate targeting and sustainability.

TARGETS
A. Beneficiary Targets
• Dhuafa and vulnerable communities.
• Mosques, musalas, TPQ/TPA, Islamic boarding schools, and Islamic educational institutions.
• Social foundations and religious institutions.
• Orphanages, social shelters, and community centers.
• Islamic study groups and recitation groups.
• Social and religious communities.
• Communities in need of social and humanitarian activity support.
• Public facility managers that provide benefits to the community.

B. Activity Targets
• Religious activities (recitations, grand tabligh, da'wah, Islamic holiday commemorations, community guidance, and other worship activities).
• Community social activities (social services, assistance, community services, humanitarian aid, and other social actions).
• Construction, renovation, or provision of religious infrastructure and facilities.
• Provision of public facilities that support community welfare.
• Community and religion-based social empowerment programs.

C. Regional Targets
The program is implemented in fostered areas and other regions that meet beneficiary criteria based on survey results, community proposals, or partner recommendations, considering the level of need, benefits, and program budget availability.`,
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
                                    <source type="image/webp" srcSet="/assets/img/menu/peduli-agama.webp" />
                                    <ImageWithFallback src="/assets/img/menu/peduli-agama.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/peduli-sosial-keagamaan"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20Peduli%20Sosial%20Keagamaan" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
