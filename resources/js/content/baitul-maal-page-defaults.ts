// Konten default halaman Baitul Maal. Dipakai sebagai fallback di halaman
// publik dan sebagai struktur form di editor dashboard (Konten Halaman Baitul Maal).
// Override hasil edit admin disimpan di tabel profile_page_contents (generik).

export const baitulMaalDefaults = {
    id: {
        title: 'Baitul Maal - TAMZIS Bina Utama',
        heading: 'Baitul Maal',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Baitul Maal',
            current: 'Baitul Maal',
        },
        hero: {
            badge: 'Lembaga Zakat & Sedekah',
            title: 'Baitul Maal TAMZIS Bina Utama',
            content:
                'Baitul Maal adalah lembaga pengelolaan zakat, infaq, shadaqah, dan wakaf di TAMZIS yang bertujuan untuk meningkatan kesejahteraan umat melalui pendistribusian dana sosial sesuai dengan prinsip-prinsip syariah Islam.',
        },
        features: [
            {
                title: 'Pengelolaan Zakat',
                desc: 'Mengelola dan mendistribusikan zakat dari anggota dan masyarakat sesuai perintah Allah SWT dan sunnah Rasulullah SAW.',
            },
            {
                title: 'Infaq & Shadaqah',
                desc: 'Menghimpun dan mengelola infaq dan shadaqah untuk kemasalahatan umat yang membutuhkan.',
            },
            {
                title: 'Wakaf & Hibah',
                desc: 'Mengelola wakaf dan hibah untuk kepentingan umat dalam jangka panjang.',
            },
        ],
        programUtama: {
            title: 'Program Utama Baitul Maal',
            items: [
                {
                    name: 'Berbagi 1000 Yatim & Dhuafa',
                    desc: 'Program kepedulian terhadap 1000 anak yatim dan dhuafa melalui bantuan pendidikan, kesehatan, dan kebutuhan sehari-hari.',
                },
                {
                    name: 'Cinta Masjid',
                    desc: 'Program pengembangan dan perawatan masjid-masjid di sekitar lingkungan dampingan TAMZIS.',
                },
                {
                    name: 'Bedah Rumah Bahagia',
                    desc: 'Program renovasi rumah untuk keluarga kurang mampu agar memiliki hunian yang layak dan nyaman.',
                },
                {
                    name: 'Jumat Berkah',
                    desc: 'Program berbagi setiap hari Jumat untuk masyarakat kurang mampu di sekitar kantor cabang TAMZIS.',
                },
            ],
        },
        cintaMasjid: {
            title: 'Cinta Masjid',
            desc: 'Program pengembangan dan perawatan masjid untuk meningkatkan kualitas ibadah umat Islam.',
            items: [
                'Perbaikan dan renovasi masjid',
                'Pemasangan fasilitas masjid',
                'Pengadaan perlengkapan ibadah',
                'Santunan imam dan muazin',
            ],
        },
        bahagiaYatim: {
            title: 'Bahagia 1000 Yatim & Dhuafa',
            desc: 'Program peduli anak yatim dan dhuafa untuk masa depan yang lebih cerah.',
            items: [
                'Bantuan pendidikan anak yatim',
                'Bantuan kesehatan dan nutrisi',
                'Bantuan perlengkapan sekolah',
                'Pembinaan karakter dan keislaman',
            ],
        },
        bedahRumah: {
            title: 'Bedah Rumah Bahagia',
            desc: 'Program renovasi rumah untuk keluarga prasejahtera.',
            items: [
                'Perbaikan struktur rumah',
                'Pemasangan atap dan dinding',
                'Perbaikan sanitasi',
                'Pemberian perlengkapan rumah tangga',
            ],
        },
        jumatBerkah: {
            title: 'Jumat Berkah',
            desc: 'Program berbagi makanan dan kebutuhan setiap hari Jumat.',
            items: [
                'Pembagian paket daging saat hari raya',
                'Santunan bulanan untuk mustahik',
                'Bantuan kesehatan darurat',
                'Bantuan pendidikan anak kurang mampu',
            ],
        },
        peduliBencana: {
            title: 'Peduli Bencana',
            desc: 'Respons cepat untuk korban bencana alam.',
            items: [
                'Bantuan darurat bencana',
                'Relawan kemanusiaan',
                'Rekonstruksi pasca bencana',
                'Bantuan psikososial',
            ],
        },
        peduliSosial: {
            title: 'Peduli Sosial Keagamaan',
            desc: 'Program sosial keagamaan untuk membangun ukhuwah Islamiyah.',
            items: [
                'Bantuan untuk mustahik baru',
                'Program pemberdayaan ekonomi',
                'Santunan hari raya',
                'Ziarah wali dan ulama',
            ],
        },
        peduliYatim: {
            title: 'Peduli Yatim & Dhuafa',
            desc: 'Perhatian khusus untuk anak-anak yatim dan keluarga dhuafa.',
            items: [
                'Penguatan ekonomi keluarga',
                'Pendampingan pendidikan',
                'Bimbingan rohani',
                'Pelatihan keterampilan',
            ],
        },
        peduliKesehatan: {
            title: 'Peduli Kesehatan',
            desc: 'Program kesehatan untuk masyarakat kurang mampu.',
            items: [
                'Bantuan biaya pengobatan',
                'Khitan massal',
                'Pemeriksaan kesehatan gratis',
                'Bantuan alat kesehatan',
            ],
        },
        qurban: {
            title: 'Qurban TAMZIS',
            desc: 'Penyembelihan hewan qurban untuk dibagikan kepada yang membutuhkan.',
            items: [
                'Qurban sapi dan kambing',
                'Distribusi daging qurban',
                'Penyembelihan sesuai syariat',
                'Laporan distribusi transparan',
            ],
        },
        khitanMassal: {
            title: 'Khitan Ceria',
            desc: 'Program khitan massal untuk anak-anak kurang mampu.',
            items: [
                'Pelayanan khitan gratis',
                'Paket khitan lengkap',
                'Pendampingan orang tua',
                'Bimbingan pasca khitan',
            ],
        },
        details: {
            title: 'Keunggulan Baitul Maal TAMZIS',
            items: [
                'Terpercaya dan amanah dalam pengelolaan dana sosial.',
                'Transparan dalam pendistribusian dan pelaporan.',
                'Sesuai dengan prinsip-prinsip Syariah Islam.',
                'Jangkauan luas ke seluruh wilayah dampingan TAMZIS.',
                'Pelaporan keuangan audit setiap tahun.',
                'Mendapat dukungan dari manajemen dan anggota TAMZIS.',
            ],
        },
        contact: {
            title: 'Hubungi Kami',
            desc: 'Ingin berdonasi atau membutuhkan bantuan? Hubungi tim Baitul Maal kami.',
            btn: 'Hubungi Baitul Maal',
        },
    },
    en: {
        title: 'Baitul Maal - TAMZIS Bina Utama',
        heading: 'Baitul Maal',
        breadcrumb: {
            home: 'Home',
            financing: 'Baitul Maal',
            current: 'Baitul Maal',
        },
        hero: {
            badge: 'Zakat & Sadaqah Institution',
            title: 'TAMZIS Bina Utama Baitul Maal',
            content:
                'Baitul Maal is an institution managing zakat, infaq, shadaqah, and waqf at TAMZIS aimed at improving community welfare through social fund distribution in accordance with Islamic Sharia principles.',
        },
        features: [
            {
                title: 'Zakat Management',
                desc: 'Managing and distributing zakat from members and the public according to Allah SWT commands and Prophet Muhammad SAW teachings.',
            },
            {
                title: 'Infaq & Shadaqah',
                desc: 'Collecting and managing infaq and shadaqah for the welfare of those in need.',
            },
            {
                title: 'Waqf & Grants',
                desc: 'Managing waqf and grants for long-term community benefits.',
            },
        ],
        programUtama: {
            title: 'Main Programs of Baitul Maal',
            items: [
                {
                    name: 'Sharing with 1000 Orphans & Underprivileged',
                    desc: 'Care program for 1000 orphans and underprivileged children through education, health, and daily needs assistance.',
                },
                {
                    name: 'Love the Mosque',
                    desc: 'Mosque development and maintenance program in TAMZIS-assisted areas.',
                },
                {
                    name: 'Happy Home Renovation',
                    desc: 'House renovation program for underprivileged families.',
                },
                {
                    name: 'Blessed Friday',
                    desc: 'Sharing program every Friday for underprivileged people near TAMZIS branches.',
                },
            ],
        },
        cintaMasjid: {
            title: 'Love the Mosque',
            desc: 'Mosque development and maintenance program to improve Muslim worship quality.',
            items: [
                'Mosque repairs and renovation',
                'Facility installation',
                'Worship equipment procurement',
                'Imam and muazin allowances',
            ],
        },
        bahagiaYatim: {
            title: 'Happy 1000 Orphans & Underprivileged',
            desc: 'Care program for orphans and underprivileged children for a brighter future.',
            items: [
                'Orphan education assistance',
                'Health and nutrition assistance',
                'School equipment assistance',
                'Character and Islamic coaching',
            ],
        },
        bedahRumah: {
            title: 'Happy Home Renovation',
            desc: 'House renovation program for pre-prosperous families.',
            items: [
                'House structure repair',
                'Roof and wall installation',
                'Sanitation improvement',
                'Household equipment provision',
            ],
        },
        jumatBerkah: {
            title: 'Blessed Friday',
            desc: 'Food and necessities sharing program every Friday.',
            items: [
                'Meat packages distribution on holidays',
                'Monthly allowances for beneficiaries',
                'Emergency health assistance',
                'Education assistance for underprivileged children',
            ],
        },
        peduliBencana: {
            title: 'Disaster Care',
            desc: 'Quick response for natural disaster victims.',
            items: [
                'Emergency disaster assistance',
                'Humanitarian volunteers',
                'Post-disaster reconstruction',
                'Psychosocial assistance',
            ],
        },
        peduliSosial: {
            title: 'Social Religious Care',
            desc: 'Social religious programs to build Islamic ukhuwah.',
            items: [
                'New beneficiary assistance',
                'Economic empowerment program',
                'Holiday allowances',
                'Scholar and cleric visits',
            ],
        },
        peduliYatim: {
            title: 'Orphan & Underprivileged Care',
            desc: 'Special attention for orphans and underprivileged families.',
            items: [
                'Family economic strengthening',
                'Education accompaniment',
                'Spiritual guidance',
                'Skills training',
            ],
        },
        peduliKesehatan: {
            title: 'Health Care',
            desc: 'Health programs for underprivileged communities.',
            items: [
                'Medical treatment cost assistance',
                'Mass circumcision',
                'Free health check-ups',
                'Medical equipment assistance',
            ],
        },
        qurban: {
            title: 'TAMZIS Qurban',
            desc: 'Qurban animal slaughter for distribution to those in need.',
            items: [
                'Cattle and goat qurban',
                'Qurban meat distribution',
                'Slaughter according to sharia',
                'Transparent distribution reports',
            ],
        },
        khitanMassal: {
            title: 'Cheerful Circumcision',
            desc: 'Mass circumcision program for underprivileged children.',
            items: [
                'Free circumcision service',
                'Complete circumcision package',
                'Parent accompaniment',
                'Post-circumcision guidance',
            ],
        },
        details: {
            title: 'Advantages of TAMZIS Baitul Maal',
            items: [
                'Trusted and amanah in social fund management.',
                'Transparent in distribution and reporting.',
                'In accordance with Islamic Sharia principles.',
                'Wide reach to all TAMZIS-assisted areas.',
                'Annual audited financial reports.',
                'Supported by TAMZIS management and members.',
            ],
        },
        contact: {
            title: 'Contact Us',
            desc: 'Want to donate or need assistance? Contact our Baitul Maal team.',
            btn: 'Contact Baitul Maal',
        },
    },
    images: {
        hero: '/assets/img/header/profil-banner.webp',
        banner: '/assets/img/header/ZISWAF (1).jpg',
    },
};

export const cintaMasjidDefaults = {
    id: {
        title: 'Cinta Masjid - TAMZIS Bina Utama',
        heading: 'Cinta Masjid',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Baitul Maal',
            current: 'Cinta Masjid',
        },
        hero: {
            badge: 'Program Bina Masjid',
            title: 'Cinta Masjid',
            content:
                'Program pengembangan dan perawatan masjid untuk meningkatkan kualitas ibadah umat Islam di lingkungan dampingan TAMZIS.',
        },
        features: [
            {
                title: 'Renovasi Masjid',
                desc: 'Perbaikan dan renovasi masjid agar layak menjadi tempat ibadah.',
            },
            {
                title: 'Fasilitas Masjid',
                desc: 'Pemasangan AC, sound system, dan perlengkapan masjid lainnya.',
            },
            {
                title: 'Santunan Imam & Muazin',
                desc: 'Bantuan honor untuk imam dan muazin masjid.',
            },
        ],
        details: {
            title: 'Cakupan Program Cinta Masjid',
            items: [
                'Perbaikan struktur bangunan masjid',
                'Penggantian atap dan lantai',
                'Pemasangan listrik dan lampu',
                'Pengadaan karpet dan mukena',
                'Fasilitas kamar mandi',
                'Taman masjid',
            ],
        },
        contact: {
            title: 'Dukung Program Cinta Masjid',
            desc: 'Bantu kami memperbaiki dan mengembangkan masjid-masjid di sekitar kita.',
            btn: 'Hubungi Kami',
        },
    },
    en: {
        title: 'Love the Mosque - TAMZIS Bina Utama',
        heading: 'Love the Mosque',
        breadcrumb: {
            home: 'Home',
            financing: 'Baitul Maal',
            current: 'Love the Mosque',
        },
        hero: {
            badge: 'Mosque Development Program',
            title: 'Love the Mosque',
            content:
                'Mosque development and maintenance program to improve Muslim worship quality in TAMZIS-assisted areas.',
        },
        features: [
            {
                title: 'Mosque Renovation',
                desc: 'Mosque repairs and renovation to make it a worthy place of worship.',
            },
            {
                title: 'Mosque Facilities',
                desc: 'Installation of AC, sound system, and other mosque equipment.',
            },
            {
                title: 'Imam & Muazin Allowances',
                desc: 'Honorarium assistance for mosque imams and muazin.',
            },
        ],
        details: {
            title: 'Love the Mosque Program Coverage',
            items: [
                'Mosque building structure repairs',
                'Roof and floor replacement',
                'Electricity and lighting installation',
                'Carpet and prayer equipment procurement',
                'Bathroom facilities',
                'Mosque garden',
            ],
        },
        contact: {
            title: 'Support Love the Mosque Program',
            desc: 'Help us improve and develop mosques around us.',
            btn: 'Contact Us',
        },
    },
    images: {
        hero: '/assets/img/header/profil-banner.webp',
        banner: '/assets/img/header/Cinta-masjid.jpg',
    },
};

export const peduliBencanaDefaults = {
    id: {
        title: 'Peduli Bencana - TAMZIS Bina Utama',
        heading: 'Peduli Bencana',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Baitul Maal',
            current: 'Peduli Bencana',
        },
        hero: {
            badge: 'Respons Bencana',
            title: 'Peduli Bencana',
            content:
                'Program respons cepat untuk korban bencana alam dengan pendampingan dan pemulihan.',
        },
        features: [
            {
                title: 'Bantuan Darurat',
                desc: 'Penyaluran bantuan logistik dan finansial segera setelah bencana.',
            },
            {
                title: 'Relawan',
                desc: 'Tim relawan terlatih untuk membantu proses evakuasi dan distribusi.',
            },
            {
                title: 'Pemulihan',
                desc: 'Program pemulihan pasca bencana untuk korban.',
            },
        ],
        contact: {
            title: 'Laporkan Kebutuhan Bencana',
            desc: 'Hubungi kami jika ada daerah yang membutuhkan bantuan bencana.',
            btn: 'Hubungi Kami',
        },
    },
    en: {
        title: 'Disaster Care - TAMZIS Bina Utama',
        heading: 'Disaster Care',
        breadcrumb: {
            home: 'Home',
            financing: 'Baitul Maal',
            current: 'Disaster Care',
        },
        hero: {
            badge: 'Disaster Response',
            title: 'Disaster Care',
            content:
                'Quick response program for natural disaster victims with assistance and recovery.',
        },
        features: [
            {
                title: 'Emergency Aid',
                desc: 'Immediate logistics and financial assistance distribution after disasters.',
            },
            {
                title: 'Volunteers',
                desc: 'Trained volunteer team to assist evacuation and distribution.',
            },
            {
                title: 'Recovery',
                desc: 'Post-disaster recovery program for victims.',
            },
        ],
        contact: {
            title: 'Report Disaster Needs',
            desc: 'Contact us if there are areas that need disaster assistance.',
            btn: 'Contact Us',
        },
    },
    images: {
        hero: '/assets/img/header/profil-banner.webp',
        banner: '/assets/img/header/profil-banner.jpg',
    },
};

export const peduliYatimDefaults = {
    id: {
        title: 'Peduli Yatim & Dhuafa - TAMZIS Bina Utama',
        heading: 'Peduli Yatim & Dhuafa',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Baitul Maal',
            current: 'Peduli Yatim & Dhuafa',
        },
        hero: {
            badge: 'Peduli Sesama',
            title: 'Peduli Yatim & Dhuafa',
            content:
                'Program pendampingan dan bantuan untuk anak-anak yatim dan keluarga dhuafa.',
        },
        features: [
            {
                title: 'Bantuan Pendidikan',
                desc: 'Beasiswa dan perlengkapan sekolah untuk anak yatim.',
            },
            {
                title: 'Bantuan Kesehatan',
                desc: 'Pemeriksaan kesehatan dan pengobatan gratis.',
            },
            {
                title: 'Penguatan Ekonomi',
                desc: 'Bantuan modal dan pelatihan keterampilan untuk keluarga.',
            },
        ],
        contact: {
            title: 'Bantu Yatim & Dhuafa',
            desc: 'Dukung program kami untuk masa depan anak-anak yatim.',
            btn: 'Hubungi Kami',
        },
    },
    en: {
        title: 'Care for Orphans & Underprivileged - TAMZIS Bina Utama',
        heading: 'Care for Orphans & Underprivileged',
        breadcrumb: {
            home: 'Home',
            financing: 'Baitul Maal',
            current: 'Care for Orphans',
        },
        hero: {
            badge: 'Care for Others',
            title: 'Care for Orphans & Underprivileged',
            content:
                'Assistance and support program for orphaned children and underprivileged families.',
        },
        features: [
            {
                title: 'Education Assistance',
                desc: 'Scholarships and school supplies for orphaned children.',
            },
            {
                title: 'Health Assistance',
                desc: 'Free health check-ups and medical treatment.',
            },
            {
                title: 'Economic Strengthening',
                desc: 'Capital assistance and skills training for families.',
            },
        ],
        contact: {
            title: 'Help Orphans & Underprivileged',
            desc: 'Support our program for the future of orphaned children.',
            btn: 'Contact Us',
        },
    },
    images: {
        hero: '/assets/img/header/profil-banner.webp',
        banner: '/assets/img/header/profil-banner.jpg',
    },
};

export const baitulMaalMenuFallback = {
    id: {
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
    },
    en: {
        title: 'Baitul Maal Programs',
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
            { label: "Mukena & Quran Endowment", url: '/wakaf-mukena-al-quran' },
            { label: 'Smart Student Program', url: '/program-bina-siswa-cerdas' },
            { label: 'Be-aktriyo', url: '/program-be-aktriyo' },
            { label: 'Building Prime Family (MKU)', url: '/program-membangun-keluarga-utama-mku' },
            { label: 'Health Care', url: '/program-peduli-kesehatan' },
            { label: 'World Sight Day / Desama', url: '/program-world-sight-day-desama' },
            { label: 'Qurban On Tamzis', url: '/qurban-tamzis' },
            { label: 'Joyful Circumcision', url: '/program-khitan-ceria' },
        ],
    },
};

export type BaitulMaalPageKey =
    | 'baitul-maal'
    | 'cinta-masjid'
    | 'peduli-bencana'
    | 'peduli-yatim';

// Registry untuk editor dashboard.
export const baitulMaalPageDefaults: Record<
    BaitulMaalPageKey,
    { name: string; defaults: { id: unknown; en: unknown; images: Record<string, string> } }
> = {
    'baitul-maal': { name: 'Baitul Maal', defaults: baitulMaalDefaults },
    'cinta-masjid': { name: 'Cinta Masjid', defaults: cintaMasjidDefaults },
    'peduli-bencana': { name: 'Peduli Bencana', defaults: peduliBencanaDefaults },
    'peduli-yatim': { name: 'Peduli Yatim & Dhuafa', defaults: peduliYatimDefaults },
};
