// Konten default halaman produk simpanan. Dipakai sebagai fallback di halaman
// publik dan sebagai struktur form di editor dashboard (Konten Halaman Simpanan).
// Override hasil edit admin disimpan di tabel profile_page_contents (generik).

export const simpananMutiaraDefaults = {
    id: {
        title: 'Simpanan Mutiara - TAMZIS Bina Utama',
        heading: 'Simpanan Mutiara',
        breadcrumb: {
            home: 'Beranda',
            savings: 'Simpanan',
            current: 'Mutiara',
        },
        hero: {
            badge: 'Produk Unggulan',
            title: 'Simpanan Harian Syariah',
            content:
                'Simpanan Mutiara adalah simpanan harian yang dikelola dengan akad Wadiah (titipan), memberikan kemudahan bertransaksi kapan saja dengan prinsip syariah yang murni dan menenangkan.',
        },
        features: [
            {
                title: 'Likuid Sempurna',
                desc: 'Setor dan tarik saldo kapan saja di seluruh jaringan kantor TAMZIS.',
            },
            {
                title: 'Biaya Admin Sangat Ringan',
                desc: 'Biaya administrasi bulanan sangat ringan, saldo Anda tetap utuh.',
            },
            {
                title: 'Bonus Wadiah',
                desc: 'Kesempatan mendapatkan bonus bulanan sesuai kebijakan lembaga.',
            },
        ],
        details: {
            title: 'Keunggulan Simpanan Mutiara',
            items: [
                'Setoran awal sangat ringan.',
                'Dapat digunakan untuk autodebet pembiayaan.',
                'Fasilitas layanan digital M-TAMZIS.',
                'Aman dan dijamin oleh pengelolaan yang profesional.',
            ],
        },
    },
    en: {
        title: 'Mutiara Savings - TAMZIS Bina Utama',
        heading: 'Mutiara Savings',
        breadcrumb: {
            home: 'Home',
            savings: 'Savings',
            current: 'Mutiara',
        },
        hero: {
            badge: 'Flagship Product',
            title: 'Daily Savings with Sharia Principles',
            content:
                'Mutiara Savings is a daily savings account managed with a Wadiah (deposit) contract, providing the convenience of transacting anytime with pure and calming sharia principles.',
        },
        features: [
            {
                title: 'Perfectly Liquid',
                desc: 'Deposit and withdraw balances anytime at all TAMZIS office networks.',
            },
            {
                title: 'Very Low Admin Fees',
                desc: 'Monthly admin fees are very affordable, your balance remains intact.',
            },
            {
                title: 'Wadiah Bonus',
                desc: 'Opportunity to get monthly bonuses according to institutional policy.',
            },
        ],
        details: {
            title: 'Mutiara Savings Advantages',
            items: [
                'Very light initial deposit.',
                'Can be used for financing autodebit.',
                'M-TAMZIS digital service facilities.',
                'Safe and guaranteed by professional management.',
            ],
        },
    },
    images: {
        hero: '/assets/img/menu/buku-simpanan-mutiara.webp',
        banner: '/assets/img/header/banner-tabungan.webp',
    },
};

export const simpananPendidikanDefaults = {
    id: {
        title: 'Simpanan Pendidikan - TAMZIS Bina Utama',
        heading: 'Simpanan Pendidikan',
        breadcrumb: {
            home: 'Beranda',
            savings: 'Simpanan',
            current: 'Pendidikan',
        },
        hero: {
            badge: 'Solusi Masa Depan',
            title: 'Rencanakan Pendidikan Terbaik',
            content:
                'Simpanan Pendidikan TAMZIS membantu Anda mempersiapkan biaya pendidikan putra-putri tercinta sejak dini dengan pengelolaan syariah yang aman dan memberikan ketenangan pikiran.',
        },
        features: [
            {
                title: 'Target Terarah',
                desc: 'Membantu Anda mencapai target dana pendidikan sesuai jenjang sekolah.',
            },
            {
                title: 'Biaya Admin Sangat Ringan',
                desc: 'Biaya administrasi bulanan sangat ringan, tabungan Anda tetap maksimal.',
            },
            {
                title: 'Mudah & Ringan',
                desc: 'Setoran bulanan yang dapat disesuaikan dengan kemampuan finansial.',
            },
        ],
        details: {
            title: 'Keunggulan Simpanan Pendidikan',
            items: [
                'Setoran rutin yang ringan.',
                'Penarikan hanya boleh dilakukan sekali dalam satu tahun saat pergantian tahun ajaran baru.',
                'Menyiapkan biaya pendidikan pada tahun ajaran berikutnya.',
                'Melatih siswa untuk hemat, dengan cara menabung.',
                'Mudah, siswa tidak harus datang ke kantor, petugas yang datang ke sekolah.',
            ],
        },
    },
    en: {
        title: 'Education Savings - TAMZIS Bina Utama',
        heading: 'Education Savings',
        breadcrumb: {
            home: 'Home',
            savings: 'Savings',
            current: 'Education',
        },
        hero: {
            badge: 'Future Solution',
            title: 'Plan the Best Education',
            content:
                'TAMZIS Education Savings helps you prepare the education costs of your beloved children from an early age with safe sharia management that provides peace of mind.',
        },
        features: [
            {
                title: 'Directed Target',
                desc: 'Helping you achieve education fund targets according to school levels.',
            },
            {
                title: 'Very Low Admin Fees',
                desc: 'Monthly admin fees are very affordable, your savings remain maximized.',
            },
            {
                title: 'Easy & Light',
                desc: 'Monthly deposits that can be adjusted to financial capability.',
            },
        ],
        details: {
            title: 'Education Savings Advantages',
            items: [
                'Light regular deposits.',
                'Withdrawals can only be done once a year at the change of the new school year.',
                'Prepare education costs for the next school year.',
                'Teach students to save by saving.',
                'Easy, students do not have to come to the office, officers come to the school.',
            ],
        },
    },
    images: {
        hero: '/assets/img/menu/buku-simpanan-pendidikan.webp',
        banner: '/assets/img/header/simpanan-pendidikan (1).webp',
    },
};

export const simpananIjabahDefaults = {
    id: {
        title: 'Simpanan Ijabah - TAMZIS Bina Utama',
        heading: 'Simpanan Ijabah',
        breadcrumb: {
            home: 'Beranda',
            savings: 'Simpanan',
            current: 'Ijabah',
        },
        hero: {
            badge: 'Investasi Syariah Berjangka',
            title: 'Berinvestasi Sesuai Syariah dengan Mudharabah Mutlaqah',
            content:
                'Simpanan Ijabah adalah produk deposito yang diberi nama Simpanan Ijabah yaitu produk investasi berjangka yang menggunakan prinsip mudharabah mutlaqah (bagi hasil). Tamzis mengelola dana secara produktif dalam bentuk pembiayaan kepada masyarakat usaha kecil dan menengah secara profesional sesuai syariah. Kami menawarkan tingkat bagi hasil yang sangat menguntungkan dan kompetitif.',
        },
        features: [
            {
                title: 'Bagi Hasil Menguntungkan',
                desc: 'Tingkat bagi hasil kompetitif yang bisa diambil tunai, ditransfer, atau masuk ke Simpanan Mutiara.',
            },
            {
                title: 'Jangka Waktu Fleksibel',
                desc: 'Minimal tenor 3 bulan dengan fitur Automatic Roll Over (ARO) untuk perpanjangan otomatis.',
            },
            {
                title: 'Aman & Produktif',
                desc: 'Dikelola secara amanah untuk pembiayaan usaha kecil dan menengah yang halal.',
            },
        ],
        details: {
            title: 'Ketentuan Simpanan Ijabah',
            items: [
                'Menggunakan prinsip syariah Mudharabah Mutlaqah.',
                'Nominal penempatan investasi minimal Rp 1.000.000,- dan kelipatannya.',
                'Jangka waktu simpanan minimal 3 bulan.',
                'Bagi hasil dikenakan pajak 10% jika mencapai Rp 240.000,- per bulan.',
                'Pencairan sebelum jatuh tempo dikenakan Biaya Pembatalan Akad (BPA).',
                'Dana BPA sepenuhnya disalurkan untuk kegiatan sosial (Lembaga Tamaddun).',
                'Dapat diperpanjang secara otomatis (ARO).',
                'Bagi hasil dapat dikreditkan ke simpanan harian.',
            ],
        },
        advantages: {
            title: '7 Keunggulan Simpanan Ijabah',
            items: [
                'Dikelola berdasarkan prinsip adil.',
                'Disalurkan untuk membiayai para pedagang dan pengusaha kecil.',
                'Disalurkan hanya untuk kegiatan usaha yang halal.',
                'Perolehan bagi hasil yang menguntungkan dan kompetitif.',
                'Mudah dalam bertransaksi, kami siap datang ketempat Anda.',
                'Berpengalaman lebih dari 25 tahun.',
                'Memiliki jaringan tingkat nasional.',
            ],
        },
    },
    en: {
        title: 'Ijabah Savings - TAMZIS Bina Utama',
        heading: 'Ijabah Savings',
        breadcrumb: {
            home: 'Home',
            savings: 'Savings',
            current: 'Ijabah',
        },
        hero: {
            badge: 'Sharia Time Investment',
            title: 'Invest According to Sharia with Mudharabah Mutlaqah',
            content:
                'Ijabah Savings is a time investment product managed with the sharia profit-sharing principle (Mudharabah Mutlaqah). Your funds will be channeled productively to finance the real sector.',
        },
        features: [
            {
                title: 'Profitable Returns',
                desc: 'Competitive profit-sharing that can be withdrawn in cash, transferred, or credited to Mutiara Savings.',
            },
            {
                title: 'Flexible Term',
                desc: 'Minimum 3 months term with Automatic Roll Over (ARO) feature for seamless extensions.',
            },
            {
                title: 'Safe & Productive',
                desc: 'Managed responsibly to finance halal small and medium enterprises.',
            },
        ],
        details: {
            title: 'Ijabah Savings Terms',
            items: [
                'Uses the sharia principle of Mudharabah Mutlaqah.',
                'Minimum investment placement of Rp 1,000,000.- and multiples.',
                'Minimum savings term is 3 months.',
                'Profit sharing is subject to a 10% tax if it reaches Rp 240,000.- per month.',
                'Withdrawal before maturity incurs a Contract Cancellation Fee (BPA).',
                'BPA funds are entirely distributed to social religious activities.',
            ],
        },
        advantages: {
            title: '7 Advantages of Ijabah Savings',
            items: [
                'Managed based on fair principles.',
                'Channeled to finance traders and small businesses.',
                'Channeled only for halal business activities.',
                'Profitable and competitive profit sharing.',
                'Easy transactions, we are ready to come to your place.',
                'Experienced more than 25 years.',
                'Has a national level network.',
            ],
        },
    },
    images: {
        hero: '/assets/img/menu/buku-simpanan-ijabah.webp',
        banner: '/assets/img/header/simpanan-ijabah.webp',
    },
};

export const simpananMudharabahDefaults = {
    id: {
        title: 'Simpanan Mudharabah - TAMZIS Bina Utama',
        heading: 'Simpanan Mudharabah',
        breadcrumb: {
            home: 'Beranda',
            savings: 'Simpanan',
            current: 'Mudharabah',
        },
        hero: {
            badge: 'Simpanan Mutiara Ibadah',
            title: 'Rencana Ibadah Umroh, Haji, Aqiqah, Qurban dan Walimah Jadi Lebih Mudah',
            content:
                'Simpanan Mutiara Ibadah adalah produk simpanan KSPPS TAMZIS Bina Utama dengan akad Mudharabah Mutlaqah untuk membantu anggota merencanakan dan mewujudkan ibadah haji, umroh, walimah, qurban, aqiqah, dan lainnya. Pilihan jangka waktu dan setoran variatif, aman, dengan keuntungan bagi hasil yang kompetitif. Penarikan dilakukan pada saat akan melaksanakan ibadah sesuai rencana.',
        },
        features: [
            {
                title: 'Kepastian Perencanaan Ibadah',
                desc: 'Rencana haji, umroh, aqiqah, qurban, dan walimah terwujud lebih pasti dan terarah.',
            },
            {
                title: 'Setoran Fleksibel',
                desc: 'Pola setoran bebas pilih: harian, mingguan, pasaran, atau bulanan. Setoran awal cukup Rp 200.000,-.',
            },
            {
                title: 'Bisa Jadi Agunan',
                desc: 'Simpanan layaknya investasi dan dapat dijadikan agunan pembiayaan di TAMZIS (back to back, lebih murah).',
            },
        ],
        details: {
            title: 'Karakteristik Simpanan Mutiara Ibadah',
            items: [
                'Menggunakan akad Mudharabah Mutlaqah.',
                'Jangka waktu 3 sampai dengan 5 tahun.',
                'Bagi hasil diperhitungkan setiap bulan berdasarkan pendapatan kotor dan diakumulasikan ke saldo simpanan.',
                'Nisbah bagi hasil anggota : TAMZIS sebesar 22%:78% (3 tahun), 24%:76% (4 tahun), dan 25%:75% (5 tahun).',
                'Setoran awal minimal Rp 200.000,- dengan komitmen setoran rutin sesuai kesepakatan.',
                'Penarikan dilakukan hanya pada saat akan melaksanakan ibadah yang telah direncanakan.',
            ],
        },
    },
    en: {
        title: 'Mudharabah Savings - TAMZIS Bina Utama',
        heading: 'Mudharabah Savings',
        breadcrumb: {
            home: 'Home',
            savings: 'Savings',
            current: 'Mudharabah',
        },
        hero: {
            badge: 'Mutiara Ibadah Savings',
            title: 'Planning Umrah, Hajj, Aqiqah, Qurban and Walimah Made Easier',
            content:
                'Mutiara Ibadah Savings is a KSPPS TAMZIS Bina Utama savings product under the Mudharabah Mutlaqah contract, helping members plan and realize hajj, umrah, walimah, qurban, aqiqah, and other worship goals. Flexible terms and deposits, safe, with competitive profit sharing. Withdrawals are made when the planned worship is about to take place.',
        },
        features: [
            {
                title: 'Certainty in Worship Planning',
                desc: 'Your hajj, umrah, aqiqah, qurban, and walimah plans become more certain and well-directed.',
            },
            {
                title: 'Flexible Deposits',
                desc: 'Choose your deposit pattern: daily, weekly, market-day, or monthly. Initial deposit only Rp 200,000.-.',
            },
            {
                title: 'Usable as Collateral',
                desc: 'Savings that work like an investment and can be used as financing collateral at TAMZIS (back to back, cheaper).',
            },
        ],
        details: {
            title: 'Mutiara Ibadah Savings Characteristics',
            items: [
                'Uses the Mudharabah Mutlaqah contract.',
                'Term of 3 up to 5 years.',
                'Profit sharing is calculated monthly based on gross income and accumulated into the savings balance.',
                'Member : TAMZIS profit-sharing ratio of 22%:78% (3 years), 24%:76% (4 years), and 25%:75% (5 years).',
                'Minimum initial deposit of Rp 200,000.- with a routine deposit commitment as agreed.',
                'Withdrawals are made only when the planned worship is about to take place.',
            ],
        },
    },
    images: {
        hero: '/assets/img/menu/cover-mutiara.webp',
        banner: '/assets/img/header/Mudharabah.webp',
    },
};

export const simpananBerjangkaDefaults = {
    id: {
        title: 'Simpanan Berjangka Syariah - TAMZIS Bina Utama',
        heading: 'Simpanan Berjangka',
        breadcrumb: {
            home: 'Beranda',
            savings: 'Simpanan',
            current: 'Berjangka',
        },
        hero: {
            badge: 'Investasi Syariah',
            title: 'Investasi Aman dan Berkah',
            content:
                'Simpanan Berjangka TAMZIS adalah pilihan investasi tepat bagi Anda yang menginginkan imbal hasil optimal dengan prinsip bagi hasil syariah (Mudharabah) yang transparan dan amanah.',
        },
        features: [
            {
                title: 'Bagi Hasil Optimal',
                desc: 'Nisbah bagi hasil yang kompetitif dibandingkan simpanan biasa.',
            },
            {
                title: 'Pilihan Tenor',
                desc: 'Tersedia jangka waktu fleksibel: 1, 3, 6, hingga 12 bulan.',
            },
            {
                title: 'Dijamin Aman',
                desc: 'Dana dikelola secara profesional untuk pembiayaan sektor riil.',
            },
        ],
        details: {
            title: 'Ketentuan Investasi',
            items: [
                'Setoran minimal yang terjangkau.',
                'Dapat diperpanjang secara otomatis (ARO).',
                'Sertifikat simpanan sebagai bukti kepemilikan sah.',
                'Bagi hasil dapat dikreditkan ke simpanan harian.',
            ],
        },
    },
    en: {
        title: 'Sharia Time Deposit - TAMZIS Bina Utama',
        heading: 'Time Deposit',
        breadcrumb: {
            home: 'Home',
            savings: 'Savings',
            current: 'Time Deposit',
        },
        hero: {
            badge: 'Sharia Investment',
            title: 'Safe and Blessed Investment',
            content:
                'TAMZIS Time Deposit is the right investment choice for those who want optimal returns with transparent and trustworthy sharia profit-sharing principles (Mudharabah).',
        },
        features: [
            {
                title: 'Optimal Profit Sharing',
                desc: 'Competitive profit-sharing ratio compared to regular savings.',
            },
            {
                title: 'Tenor Options',
                desc: 'Flexible time periods available: 1, 3, 6, to 12 months.',
            },
            {
                title: 'Guaranteed Safe',
                desc: 'Funds are managed professionally for real sector financing.',
            },
        ],
        details: {
            title: 'Investment Terms',
            items: [
                'Affordable minimum deposit.',
                'Can be automatically extended (ARO).',
                'Certificate of deposit as valid proof of ownership.',
                'Profit sharing can be credited to daily savings.',
            ],
        },
    },
    images: {
        hero: '/assets/img/header/tabungan-tamzis-test.png',
        banner: '/assets/img/header/simpanan-berjangka.webp',
    },
};

// Fallback menu sidebar simpanan (dipakai SidebarMenuNav bila fetch API gagal).
export const simpananMenuFallback = {
    id: {
        title: 'Produk Simpanan',
        menu: [
            { label: 'Simpanan Mutiara', url: '/simpanan-mutiara' },
            { label: 'Simpanan Pendidikan', url: '/simpanan-pendidikan' },
            { label: 'Simpanan Ijabah', url: '/simpanan-ijabah' },
            { label: 'Simpanan Mudharabah', url: '/simpanan-mudharabah' },
        ],
    },
    en: {
        title: 'Savings Products',
        menu: [
            { label: 'Mutiara Savings', url: '/simpanan-mutiara' },
            { label: 'Education Savings', url: '/simpanan-pendidikan' },
            { label: 'Ijabah Savings', url: '/simpanan-ijabah' },
            { label: 'Mudharabah Savings', url: '/simpanan-mudharabah' },
        ],
    },
};

export type SimpananPageKey =
    | 'simpanan-mutiara'
    | 'simpanan-pendidikan'
    | 'simpanan-ijabah'
    | 'simpanan-mudharabah'
    | 'simpanan-berjangka';

// Registry untuk editor dashboard.
export const simpananPageDefaults: Record<
    SimpananPageKey,
    { name: string; defaults: { id: unknown; en: unknown; images: Record<string, string> } }
> = {
    'simpanan-mutiara': { name: 'Simpanan Mutiara', defaults: simpananMutiaraDefaults },
    'simpanan-pendidikan': { name: 'Simpanan Pendidikan', defaults: simpananPendidikanDefaults },
    'simpanan-ijabah': { name: 'Simpanan Ijabah', defaults: simpananIjabahDefaults },
    'simpanan-mudharabah': { name: 'Simpanan Mudharabah', defaults: simpananMudharabahDefaults },
    'simpanan-berjangka': { name: 'Simpanan Berjangka', defaults: simpananBerjangkaDefaults },
};
