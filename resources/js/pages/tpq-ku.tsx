import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Phone } from 'lucide-react';
import { SidebarMenuNav } from '@/components/marketing/sidebar-menu-nav';
import { TamzisFooter } from '@/components/marketing/tamzis-footer';
import { TamzisHeader } from '@/components/marketing/tamzis-header';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { baitulMaalMenuFallback } from '@/content/baitul-maal-page-defaults';

export default function TPQKu() {
    const { props } = usePage();
    const locale = (props.locale as string) || 'id';
    const isEn = locale === 'en';
    const lang = isEn ? 'en' : 'id';
    const menuFallback = baitulMaalMenuFallback[lang];

    const translations = {
        id: {
            title: 'TPQ-Ku - TAMZIS Bina Utama',
            heading: 'TPQ-Ku',
            breadcrumb: {
                home: 'Beranda',
                baitulMaal: 'Baitul Maal',
                current: 'TPQ-Ku',
            },
            hero: {
                badge: 'Program Baitul Maal',
                title: 'TPQ-Ku',
                hadits: '"Program dukungan untuk pendidikan Al-Qur’an di lingkungan masjid, mushola, dan masyarakat sekitar."',
                haditsSource: '',
                content: `LATAR BELAKANG
Program Tata Kelola dan Manajemen TPQ/TPA merupakan tindak lanjut dari Program Beasiswa Ustadz dan Ustadzah yang diinisiasi oleh ULAZ MKU Tamzis sebagai upaya meningkatkan kualitas sumber daya manusia di bidang pendidikan Al-Qur'an. Program beasiswa ini tidak hanya memberikan dukungan pendidikan kepada para ustadz dan ustadzah, tetapi juga mendorong mereka untuk mengimplementasikan ilmu dan kompetensi yang dimiliki melalui pengabdian di lembaga pendidikan Al-Qur'an, khususnya Taman Pendidikan Al-Qur'an (TPQ/TPA).

TPQ/TPA merupakan lembaga pendidikan Islam nonformal yang memiliki peran strategis dalam membentuk generasi Qur'ani sejak usia dini. Selain menjadi tempat belajar membaca dan memahami Al-Qur'an, TPQ/TPA juga berfungsi sebagai sarana pembinaan akidah, ibadah, akhlakul karimah, serta pembentukan karakter Islami. Keberadaan TPQ/TPA menjadi salah satu pilar penting dalam membangun masyarakat yang religius, berakhlak mulia, dan memiliki kepedulian terhadap nilai-nilai keislaman.

Dalam pelaksanaannya, ULAZ MKU Tamzis telah melakukan pendampingan kepada dua lembaga TPQ/TPA sebagai tahap awal pengembangan program. Pendampingan tersebut mencakup penguatan tata kelola kelembagaan, peningkatan kapasitas ustadz dan ustadzah, penataan administrasi, penyusunan program pembelajaran, pengelolaan kegiatan santri, serta pembinaan manajemen organisasi. Pendampingan dilakukan secara berkelanjutan agar setiap lembaga mampu berkembang menjadi pusat pendidikan Al-Qur'an yang tertib, berkualitas, dan mampu memberikan pelayanan pendidikan terbaik kepada masyarakat.

Pengalaman selama proses pendampingan menunjukkan bahwa masih terdapat berbagai tantangan dalam pengelolaan TPQ/TPA, di antaranya belum optimalnya sistem administrasi, belum tersusunnya standar pengelolaan kelembagaan, keterbatasan kapasitas sumber daya manusia, serta perlunya penguatan perencanaan program dan evaluasi kegiatan. Kondisi tersebut menjadi dasar penting untuk membangun sistem tata kelola yang lebih profesional, efektif, transparan, dan berkelanjutan.

Melalui program ini, diharapkan setiap TPQ/TPA memiliki arah pengelolaan yang jelas, sistem administrasi yang tertata, proses pembelajaran yang berkualitas, serta kemampuan mengembangkan lembaga secara mandiri. Selain itu, program ini juga diharapkan mampu memperkuat kompetensi para ustadz dan ustadzah sebagai pendidik sekaligus penggerak masyarakat dalam membangun generasi yang mencintai Al-Qur'an, berakhlakul karimah, dan memiliki karakter kepemimpinan yang baik.

Ke depan, pendampingan yang saat ini telah berjalan pada dua TPQ/TPA akan terus dikembangkan secara bertahap ke lembaga-lembaga lainnya di wilayah binaan ULAZ MKU Tamzis. Dengan demikian, diharapkan terbentuk jaringan TPQ/TPA binaan yang memiliki tata kelola yang baik, kualitas pembelajaran yang unggul, serta mampu menjadi pusat pendidikan Al-Qur'an yang berdaya, mandiri, dan memberikan manfaat yang luas bagi umat.

TUJUAN
• Menyusun sistem tata kelola TPQ/TPA yang efektif dan efisien.
• Meningkatkan mutu pembelajaran dan manajemen kelembagaan.
• Menjamin keberlangsungan dan keberkahan TPQ/TPA dalam jangka panjang.

SASARAN
• Ustadz dan Ustadzah TPQ/TPA — agar memiliki pedoman dalam melaksanakan tugas mengajar, mendidik, dan membina santri secara profesional dan islami.
• Pengelola dan Manajemen TPQ/TPA — untuk menjalankan fungsi tata kelola, administrasi, pelaporan, dan pengembangan lembaga sesuai standar yang ditetapkan.
• Santri TPQ/TPA — sebagai penerima manfaat utama agar mendapatkan proses pembelajaran yang berkualitas, terarah, dan konsisten.
• Orang Tua/Wali Santri — agar dapat memahami dan mendukung proses pendidikan anaknya di TPQ/TPA secara aktif dan positif.
• Yayasan/Masjid/Donatur — memberikan transparansi, akuntabilitas, dan kejelasan pengelolaan program sebagai bentuk pertanggungjawaban lembaga.`,
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
            title: 'TPQ-Ku - TAMZIS Bina Utama',
            heading: 'TPQ-Ku',
            breadcrumb: {
                home: 'Home',
                baitulMaal: 'Baitul Maal',
                current: 'TPQ-Ku',
            },
            hero: {
                badge: 'Baitul Maal Program',
                title: 'TPQ-Ku',
                hadits: '"A support program for Quran education around mosques, mushola, and surrounding communities."',
                haditsSource: '',
                content: `BACKGROUND
The TPQ/TPA Governance and Management Program is a follow-up to the Ustadz and Ustadzah Scholarship Program initiated by ULAZ MKU Tamzis as an effort to improve human resource quality in the field of Qur'an education. This scholarship program not only provides educational support to ustadz and ustadzah but also encourages them to implement the knowledge and competencies they possess through service at Qur'an educational institutions, particularly Taman Pendidikan Al-Qur'an (TPQ/TPA).

TPQ/TPA is a non-formal Islamic educational institution that plays a strategic role in shaping a Qur'anic generation from an early age. In addition to being a place to learn to read and understand the Qur'an, TPQ/TPA also serves as a means of developing faith, worship, noble character, and Islamic character formation. The existence of TPQ/TPA is one of the important pillars in building a religious society with noble character and concern for Islamic values.

In its implementation, ULAZ MKU Tamzis has provided mentoring to two TPQ/TPA institutions as an initial stage of program development. This mentoring includes institutional governance strengthening, capacity building for ustadz and ustadzah, administrative arrangement, learning program development, student activity management, and organizational management guidance. Mentoring is carried out sustainably so that each institution can develop into a well-organized, quality Qur'an education center that provides the best educational services to the community.

Experience during the mentoring process shows that there are still various challenges in TPQ/TPA management, including suboptimal administrative systems, unarranged institutional management standards, limited human resource capacity, and the need for program planning strengthening and activity evaluation. These conditions form an important basis for building a more professional, effective, transparent, and sustainable governance system.

Through this program, it is hoped that each TPQ/TPA will have clear management direction, well-organized administrative systems, quality learning processes, and the ability to develop institutions independently. Additionally, this program is also expected to strengthen the competencies of ustadz and ustadzah as educators and community drivers in building a generation that loves the Qur'an, has noble character, and good leadership character.

In the future, mentoring that is currently running at two TPQ/TPA institutions will continue to be developed gradually to other institutions in ULAZ MKU Tamzis fostered areas. Thus, it is hoped that a network of fostered TPQ/TPA institutions with good governance, excellent learning quality, and the ability to become empowered, independent Qur'an education centers that provide broad benefits to the ummah will be formed.

OBJECTIVES
• Develop an effective and efficient TPQ/TPA governance system.
• Improve learning quality and institutional management.
• Ensure the sustainability and blessings of TPQ/TPA in the long term.

TARGETS
• TPQ/TPA Ustadz and Ustadzah — so they have guidelines in carrying out their duties of teaching, educating, and guiding students professionally and Islamically.
• TPQ/TPA Managers and Management — to carry out governance, administration, reporting, and institutional development functions according to established standards.
• TPQ/TPA Students — as the main beneficiaries to receive quality, directed, and consistent learning processes.
• Parents/Guardians of Students — so they can understand and actively and positively support their children's education process at TPQ/TPA.
• Foundation/Mosque/Donors — providing transparency, accountability, and clarity in program management as a form of institutional accountability.`,
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
                                    <source type="image/webp" srcSet="/assets/img/menu/tpq.webp" />
                                    <ImageWithFallback src="/assets/img/menu/tpq.png" alt={t.hero.title} aspectRatio="video" />
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
                                activeUrl="/tpq-ku"
                                fallbackTitle={menuFallback.title}
                                fallbackItems={menuFallback.menu}
                            />

                            <div className="rounded-2xl border border-emerald-900/10 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <h4 className="border-b border-emerald-950/5 pb-3 text-xs font-bold tracking-widest text-emerald-950 uppercase">{t.sidebar.contact.title}</h4>
                                <p className="mt-4 mb-8 text-sm leading-relaxed text-emerald-950/60">{t.sidebar.contact.desc}</p>
                                <a href="https://wa.me/6281236290808?text=Halo%20TAMZIS%2C%20saya%20ingin%20bertanya%20tentang%20TPQ-Ku" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#128C7E] active:scale-95">{t.sidebar.contact.btn}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <TamzisFooter />
            </div>
        </>
    );
}
