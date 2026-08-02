// Konten default halaman program-program Baitul Maal

export type BaitulMaalPageKey =
    | 'baitul-maal'
    | 'pusat-jajanan-ramadhan'
    | 'bahagia-1000-yatim-dhuafa'
    | 'peduli-bencana'
    | 'peduli-sosial-keagamaan'
    | 'peduli-yatim-dhuafa'
    | 'bedah-rumah-bahagia'
    | 'pemberdayaan-ekonomi'
    | 'berbasis-masjid-alquran'
    | 'beasiswa-ustadz'
    | 'cinta-masjid'
    | 'jumat-berkah'
    | 'tpq-ku'
    | 'pengembangan-amil-nadzir'
    | 'wakaf-mukena-alquran'
    | 'berbasis-mku'
    | 'bina-siswa-cerdas'
    | 'be-aktriyo'
    | 'mku'
    | 'peduli-kesehatan'
    | 'world-sight-day'
    | 'qurban'
    | 'khitan-ceria';

type DefaultContent = {
    id: {
        title: string;
        heading: string;
        breadcrumb: { home: string; baitulMaal: string; current: string };
        hero: { badge: string; title: string; content: string };
        features: Array<{ title: string; desc: string }>;
        contact: { title: string; desc: string; btn: string };
    };
    en: {
        title: string;
        heading: string;
        breadcrumb: { home: string; baitulMaal: string; current: string };
        hero: { badge: string; title: string; content: string };
        features: Array<{ title: string; desc: string }>;
        contact: { title: string; desc: string; btn: string };
    };
    images: Record<string, string>;
};

function createDefaults(name: string, slug: string, enName?: string): DefaultContent {
    return {
        id: {
            title: name,
            heading: name,
            breadcrumb: { home: 'Beranda', baitulMaal: 'Baitul Maal', current: name },
            hero: {
                badge: 'BAITUL MAAL TAMZIS',
                title: name,
                content: `Program ${name} dari Baitul Maal Tamzis untuk membantu masyarakat.`,
            },
            features: [
                { title: 'Program 1', desc: 'Deskripsi program pertama.' },
                { title: 'Program 2', desc: 'Deskripsi program kedua.' },
                { title: 'Program 3', desc: 'Deskripsi program ketiga.' },
            ],
            contact: {
                title: 'Hubungi Kami',
                desc: `Hubungi kami untuk informasi program ${name}.`,
                btn: 'Chat WhatsApp',
            },
        },
        en: {
            title: enName || name,
            heading: enName || name,
            breadcrumb: { home: 'Home', baitulMaal: 'Baitul Maal', current: enName || name },
            hero: {
                badge: 'BAITUL MAAL TAMZIS',
                title: enName || name,
                content: `${name} program from Baitul Maal Tamzis to help the community.`,
            },
            features: [
                { title: 'Program 1', desc: 'First program description.' },
                { title: 'Program 2', desc: 'Second program description.' },
                { title: 'Program 3', desc: 'Third program description.' },
            ],
            contact: {
                title: 'Contact Us',
                desc: `Contact us for more information about ${name}.`,
                btn: 'Chat WhatsApp',
            },
        },
        images: {
            hero: '/assets/img/header/profil-banner.webp',
            banner: '/assets/img/header/profil-banner.jpg',
        },
    };
}

export const baitulMaalPageDefaults: Record<BaitulMaalPageKey, { name: string; slug: string; defaults: DefaultContent }> = {
    'baitul-maal': { name: 'Baitul Maal', slug: 'baitul-maal', defaults: createDefaults('Baitul Maal', 'baitul-maal', 'Baitul Maal') },
    'pusat-jajanan-ramadhan': { name: 'Pusat Jajanan Ramadhan', slug: 'pusat-jajanan-selama-ramadhan', defaults: createDefaults('Pusat Jajanan Ramadhan', 'pusat-jajanan-selama-ramadhan', 'Ramadhan Food Center') },
    'bahagia-1000-yatim-dhuafa': { name: 'Bahagia 1000 Yatim dan Dhuafa', slug: 'bahagia-1000-yatim-dan-dhuafa', defaults: createDefaults('Bahagia 1000 Yatim dan Dhuafa', 'bahagia-1000-yatim-dan-dhuafa', 'Happy 1000 Orphans') },
    'peduli-bencana': { name: 'Peduli Bencana', slug: 'peduli-bencana', defaults: createDefaults('Peduli Bencana', 'peduli-bencana', 'Disaster Care') },
    'peduli-sosial-keagamaan': { name: 'Peduli Sosial Keagamaan', slug: 'peduli-sosial-keagamaan', defaults: createDefaults('Peduli Sosial Keagamaan', 'peduli-sosial-keagamaan', 'Religious Social Care') },
    'peduli-yatim-dhuafa': { name: 'Peduli Yatim dan Dhuafa', slug: 'peduli-yatim-dan-dhuafa', defaults: createDefaults('Peduli Yatim dan Dhuafa', 'peduli-yatim-dan-dhuafa', 'Care for Orphans') },
    'bedah-rumah-bahagia': { name: 'Bedah Rumah Bahagia', slug: 'bedah-rumah-bahagia', defaults: createDefaults('Bedah Rumah Bahagia', 'bedah-rumah-bahagia', 'Happy Home Renovation') },
    'pemberdayaan-ekonomi': { name: 'Pemberdayaan Ekonomi', slug: 'pemberdayaan-ekonomi', defaults: createDefaults('Pemberdayaan Ekonomi', 'pemberdayaan-ekonomi', 'Economic Empowerment') },
    'berbasis-masjid-alquran': { name: 'Berbasis Masjid dan Al-Quran', slug: 'program-berbasis-masjid-dan-al-quran', defaults: createDefaults('Berbasis Masjid dan Al-Quran', 'program-berbasis-masjid-dan-al-quran', 'Mosque Based Program') },
    'beasiswa-ustadz': { name: 'Beasiswa Ustadz', slug: 'beasiswa-ustadz', defaults: createDefaults('Beasiswa Ustadz', 'beasiswa-ustadz', 'Scholarship for Ustadz') },
    'cinta-masjid': { name: 'Cinta Masjid', slug: 'cinta-masjid', defaults: createDefaults('Cinta Masjid', 'cinta-masjid', 'Love the Mosque') },
    'jumat-berkah': { name: 'Jumat Berkah', slug: 'jumat-berkah', defaults: createDefaults('Jumat Berkah', 'jumat-berkah', 'Blessed Friday') },
    'tpq-ku': { name: 'TPQ-Ku', slug: 'tpq-ku', defaults: createDefaults('TPQ-Ku', 'tpq-ku', 'TPQ-Ku') },
    'pengembangan-amil-nadzir': { name: 'Pengembangan Amil Nadzir', slug: 'prog-pengembangan-pembinaan-amil-nadzir', defaults: createDefaults('Pengembangan Amil Nadzir', 'prog-pengembangan-pembinaan-amil-nadzir', 'Amil Nadzir Development') },
    'wakaf-mukena-alquran': { name: 'Wakaf Mukena dan Al-Qur\'an', slug: 'wakaf-mukena-al-quran', defaults: createDefaults('Wakaf Mukena dan Al-Qur\'an', 'wakaf-mukena-al-quran', 'Waqf Mukena Al-Quran') },
    'berbasis-mku': { name: 'Berbasis MKU', slug: 'program-berbasis-membangun-keluarga-utama', defaults: createDefaults('Berbasis MKU', 'program-berbasis-membangun-keluarga-utama', 'MKU Based Program') },
    'bina-siswa-cerdas': { name: 'Bina Siswa Cerdas', slug: 'program-bina-siswa-cerdas', defaults: createDefaults('Bina Siswa Cerdas', 'program-bina-siswa-cerdas', 'Smart Student Development') },
    'be-aktriyo': { name: 'Be-aktriyo', slug: 'program-be-aktriyo', defaults: createDefaults('Be-aktriyo', 'program-be-aktriyo', 'Be-aktriyo') },
    'mku': { name: 'Membangun Keluarga Utama (MKU)', slug: 'program-membangun-keluarga-utama-mku', defaults: createDefaults('Membangun Keluarga Utama (MKU)', 'program-membangun-keluarga-utama-mku', 'Building Excellent Family') },
    'peduli-kesehatan': { name: 'Peduli Kesehatan', slug: 'program-peduli-kesehatan', defaults: createDefaults('Peduli Kesehatan', 'program-peduli-kesehatan', 'Health Care') },
    'world-sight-day': { name: 'World Sight Day / Desama', slug: 'program-world-sight-day-desama', defaults: createDefaults('World Sight Day / Desama', 'program-world-sight-day-desama', 'World Sight Day / Desama') },
    'qurban': { name: 'Qurban On Tamzis', slug: 'qurban-tamzis', defaults: createDefaults('Qurban On Tamzis', 'qurban-tamzis', 'Qurban On Tamzis') },
    'khitan-ceria': { name: 'Khitan Ceria', slug: 'program-khitan-ceria', defaults: createDefaults('Khitan Ceria', 'program-khitan-ceria', 'Cheerful Circumcision') },
};

export const simpleDefaults: DefaultContent = createDefaults('Baitul Maal', 'baitul-maal', 'Baitul Maal');
