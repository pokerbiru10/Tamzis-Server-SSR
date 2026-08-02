// Konten default halaman produk pembiayaan. Dipakai sebagai fallback di halaman
// publik dan sebagai struktur form di editor dashboard (Konten Halaman Pembiayaan).
// Override hasil edit admin disimpan di tabel profile_page_contents (generik).
// Catatan: kotak "Simulasi" di tiap halaman tetap hardcoded (tidak diedit dari sini).

export const ikhtiarUtamaDefaults = {
    id: {
        title: 'Mudharabah (Modal Usaha) - TAMZIS Bina Utama',
        heading: 'Mudharabah',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Pembiayaan',
            current: 'Mudharabah',
        },
        hero: {
            badge: 'Solusi Pembiayaan',
            title: 'Mudharabah (Modal Usaha)',
            content:
                'Pembiayaan TAMZIS yang dirancang khusus untuk memenuhi kebutuhan anggota sesuai syariah, aman, cepat, mudah dan menguntungkan, sehingga InsyaAllah memperoleh keberkahan.',
        },
        features: [
            {
                title: 'Tambahan Modal Usaha',
                desc: 'Apabila anggota menginginkan pengembangan usaha yang sudah berjalan dan membutuhkan tambahan modal, TAMZIS siap membantu menyediakan permodalan dengan sistem bagi hasil.',
            },
            {
                title: 'Akad Mudharabah-Musyarakah',
                desc: 'Akad kerja sama usaha antara dua pihak: TAMZIS (shahibul maal) menyediakan seluruh atau sebagian modal, sedangkan anggota menjadi pengelola. Keuntungan usaha dibagi sesuai nisbah yang dituangkan di dalam akad.',
            },
            {
                title: 'Pembagian Risiko yang Adil',
                desc: 'Kerugian ditanggung pemilik modal selama bukan akibat kelalaian pengelola. Bila kerugian karena kecurangan atau kelalaian pengelola, maka pengelola bertanggung jawab atas kerugian tersebut.',
            },
        ],
        details: {
            title: 'Keunggulan Pembiayaan TAMZIS',
            items: [
                "Semua pembiayaan dilindungi penjaminan Ta'awun untuk menjaga resiko usaha.",
                'Dirancang khusus sesuai kebutuhan anggota dengan proses dan syarat yang mudah sesuai syariah.',
                'Partner bisnis terpercaya yang sudah berpengalaman lebih dari 25 tahun.',
                'Plafond pembiayaan sampai dengan Rp 100 juta dengan jangka waktu sampai dengan 3 tahun.',
                'Pembayaran angsuran bisa dilayani online di semua Kantor cabang dengan margin yang sangat kompetitif.',
            ],
        },
        syarat: {
            title: 'Syarat dan Ketentuan',
            items: [
                'Anggota TAMZIS',
                'Mengisi Formulir Pengajuan Pembiayaan',
                'Menyerahkan FC KTP, FC Kartu Keluarga (KK), FC Agunan',
                'Memiliki usaha yang layak',
                'Bersedia disurvey',
                'Memiliki kemampuan angsur',
                'Jujur dan amanah',
            ],
        },
        contact: {
            title: 'Tanya Tentang Produk',
            desc: 'Konsultasikan kebutuhan modal usaha Anda dengan tim ahli kami.',
            btn: 'Hubungi Marketing',
        },
    },
    en: {
        title: 'Mudharabah (Business Capital) - TAMZIS Bina Utama',
        heading: 'Mudharabah',
        breadcrumb: {
            home: 'Home',
            financing: 'Financing',
            current: 'Mudharabah',
        },
        hero: {
            badge: 'Financing Solution',
            title: 'Mudharabah (Business Capital)',
            content:
                'TAMZIS financing designed specifically to meet member needs according to sharia, safe, fast, easy and profitable, so that InsyaAllah obtains blessings.',
        },
        features: [
            {
                title: 'Additional Business Capital',
                desc: 'If members want to develop an already running business and need additional capital, TAMZIS is ready to help provide capital with a profit-sharing system.',
            },
            {
                title: 'Mudharabah-Musyarakah Contract',
                desc: 'A business cooperation contract between two parties: TAMZIS (shahibul maal) provides all or part of the capital, while the member acts as the manager. Business profits are shared according to the nisbah stated in the contract.',
            },
            {
                title: 'Fair Risk Sharing',
                desc: "Losses are borne by the capital owner as long as they are not caused by the manager's negligence. If losses result from fraud or negligence, the manager is responsible for them.",
            },
        ],
        details: {
            title: 'Advantages of TAMZIS Financing',
            items: [
                "All financing is protected by Ta'awun guarantee to guard against business risks.",
                'Designed specifically according to member needs with easy and sharia-compliant process.',
                'Trusted business partner with more than 25 years of experience.',
                'Financing limit up to Rp 100 million with tenure up to 3 years.',
                'Installment payments can be served online at all branch offices with very competitive margins.',
            ],
        },
        syarat: {
            title: 'Terms and Conditions',
            items: [
                'TAMZIS member',
                'Fill out Financing Application Form',
                'Submit copies of ID Card, Family Card, Collateral',
                'Have a viable business',
                'Willing to be surveyed',
                'Have payment capability',
                'Honest and trustworthy',
            ],
        },
        contact: {
            title: 'Ask About Products',
            desc: 'Consult your business capital needs with our team of experts.',
            btn: 'Contact Marketing',
        },
    },
    images: {
        hero: '/images/modal.png',
        banner: '/assets/img/header/Mudharabah.png',
    },
};

export const murabahahDefaults = {
    id: {
        title: 'Murabahah (Jual Beli) - TAMZIS Bina Utama',
        heading: 'Murabahah (Jual Beli)',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Pembiayaan',
            current: 'Murabahah',
        },
        hero: {
            badge: 'Produk Pembiayaan',
            title: 'Pembiayaan Murabahah',
            content:
                'Pembiayaan dengan prinsip jual beli barang pada harga asal dengan tambahan keuntungan (margin) yang telah disepakati bersama. TAMZIS membelikan barang kebutuhan Anda dan menjualnya kepada Anda dengan harga jual yang jelas dan transparan.',
        },
        features: [
            {
                title: 'Transparan',
                desc: 'Harga beli (modal) dan margin keuntungan disampaikan secara terbuka di awal akad.',
            },
            {
                title: 'Angsuran Tetap',
                desc: 'Jumlah angsuran tetap (tidak berubah) hingga masa pembiayaan selesai.',
            },
            {
                title: 'Bebas Riba',
                desc: 'Transaksi murni jual beli sehingga terhindar dari praktik riba dan bunga berbunga.',
            },
        ],
        details: {
            title: 'Keunggulan Pembiayaan Murabahah',
            items: [
                'Sangat cocok untuk pembelian aset produktif (alat usaha) maupun konsumtif (kendaraan, renovasi rumah).',
                'Proses pengajuan yang mudah, cepat, dan sesuai dengan prinsip Syariah Islam.',
                'Harga jual dan besaran cicilan sudah dikunci sejak awal kesepakatan.',
                'Terhindar dari fluktuasi bunga pasar karena cicilan bersifat tetap.',
            ],
        },
        contact: {
            title: 'Tanya Tentang Produk',
            desc: 'Ingin tahu lebih lanjut tentang Pembiayaan Murabahah? Tim kami siap membantu.',
            btn: 'Hubungi Marketing',
        },
    },
    en: {
        title: 'Murabahah (Buying & Selling) - TAMZIS Bina Utama',
        heading: 'Murabahah (Buying & Selling)',
        breadcrumb: {
            home: 'Home',
            financing: 'Financing',
            current: 'Murabahah',
        },
        hero: {
            badge: 'Financing Product',
            title: 'Murabahah Financing',
            content:
                'Financing based on the principle of buying and selling goods at the original price with an agreed additional profit (margin). TAMZIS buys the goods you need and sells them to you at a clear and transparent selling price.',
        },
        features: [
            {
                title: 'Transparent',
                desc: 'The purchase price (capital) and profit margin are disclosed openly at the beginning of the contract.',
            },
            {
                title: 'Fixed Installments',
                desc: 'The installment amount is fixed (unchanged) until the end of the financing period.',
            },
            {
                title: 'Riba-Free',
                desc: 'Pure buying and selling transactions, avoiding riba and compounding interest practices.',
            },
        ],
        details: {
            title: 'Advantages of Murabahah Financing',
            items: [
                'Highly suitable for purchasing productive assets (business equipment) or consumptive ones (vehicles, home renovations).',
                'Easy, fast application process that complies with Islamic Sharia principles.',
                'The selling price and installment amount are locked in from the initial agreement.',
                'Avoids market interest rate fluctuations because the installments are fixed.',
            ],
        },
        contact: {
            title: 'Ask About Products',
            desc: 'Want to know more about Murabahah Financing? Our team is ready to help.',
            btn: 'Contact Marketing',
        },
    },
    images: {
        hero: '/assets/img/pembiayaan/murabahah-utama.jpg',
        banner: '/assets/img/header/Murabahah.jpg',
    },
};

export const kafalahDefaults = {
    id: {
        title: 'Kafalah (Sosial) - TAMZIS Bina Utama',
        heading: 'Kafalah (Sosial)',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Pembiayaan',
            current: 'Kafalah',
        },
        hero: {
            badge: 'Layanan Sosial',
            title: 'Pembiayaan Kafalah (Sosial)',
            content:
                "Kafalah adalah layanan jaminan atau tanggungan yang diberikan oleh KSPPS TAMZIS Bina Utama untuk membantu anggota dalam hal penyelesaian suatu kewajiban. Dilandasi oleh semangat saling tolong menolong (Ta'awun) yang sangat dianjurkan dalam Islam.",
        },
        features: [
            {
                title: 'Tolok Ukur Kepedulian',
                desc: "Berbasis akad tabarru' (sosial) untuk membantu sesama anggota koperasi yang sedang membutuhkan jaminan.",
            },
            {
                title: 'Jaminan Terpercaya',
                desc: 'TAMZIS bertindak sebagai penjamin yang amanah atas kewajiban yang ditanggung oleh anggota.',
            },
            {
                title: 'Proses Mudah',
                desc: 'Persyaratan yang transparan, mudah, dan sangat mengedepankan asas kekeluargaan.',
            },
        ],
        details: {
            title: 'Keunggulan Layanan Kafalah',
            items: [
                'Memberikan rasa aman bagi pihak-pihak yang sedang bertransaksi.',
                'Dikelola sesuai dengan prinsip-prinsip Syariah murni (tanpa unsur riba).',
                'Dukungan penuh dari institusi keuangan terpercaya (TAMZIS).',
                'Solusi perlindungan finansial berbasis nilai-nilai sosial Islami.',
            ],
        },
        contact: {
            title: 'Tanya Tentang Layanan',
            desc: 'Ingin tahu lebih lanjut tentang layanan Kafalah Sosial? Tim kami siap membantu Anda.',
            btn: 'Hubungi Kami',
        },
    },
    en: {
        title: 'Kafalah (Social) - TAMZIS Bina Utama',
        heading: 'Kafalah (Social Guarantee)',
        breadcrumb: {
            home: 'Home',
            financing: 'Financing',
            current: 'Kafalah',
        },
        hero: {
            badge: 'Social Service',
            title: 'Kafalah (Social) Financing',
            content:
                "Kafalah is a guarantee or underwriting service provided by KSPPS TAMZIS Bina Utama to help members fulfill a specific obligation. It is based on the spirit of mutual assistance (Ta'awun) which is highly recommended in Islam.",
        },
        features: [
            {
                title: 'Symbol of Care',
                desc: "Based on the tabarru' (social/charity) contract to help fellow cooperative members who need a guarantee.",
            },
            {
                title: 'Trusted Guarantee',
                desc: 'TAMZIS acts as a trustworthy guarantor for the obligations borne by the member.',
            },
            {
                title: 'Easy Process',
                desc: 'Transparent, easy requirements that highly prioritize the principle of kinship.',
            },
        ],
        details: {
            title: 'Advantages of Kafalah Services',
            items: [
                'Provides a sense of security for transacting parties.',
                'Managed in accordance with pure Sharia principles (without riba).',
                'Full support from a trusted financial institution (TAMZIS).',
                'Financial protection solution based on Islamic social values.',
            ],
        },
        contact: {
            title: 'Ask About Services',
            desc: 'Want to know more about Social Kafalah services? Our team is ready to help you.',
            btn: 'Contact Us',
        },
    },
    images: {
        hero: '/assets/img/pembiayaan/kafalah-utama.jpg',
        banner: '/assets/img/header/kafalah.jpg',
    },
};

export const porsiHajiUmrohDefaults = {
    id: {
        title: 'Porsi Haji - TAMZIS Bina Utama',
        heading: 'Porsi Haji',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Simpanan',
            current: 'Haji',
        },
        hero: {
            badge: 'Niat Suci ke Tanah Suci',
            title: 'Wujudkan Ibadah Impian Anda',
            content:
                'Pembiayaan yang dikhususkan untuk talangan porsi haji. Besar Pembiayaan maksimal senilai Rp 20 juta. Uang muka (Urbun) senilai Rp 5 juta. Akad yang digunakan Qordh dan Ijaroh.',
        },
        features: [
            {
                title: 'Talangan Porsi Haji',
                desc: 'Pembiayaan khusus untuk mendapatkan porsi haji dengan cicilan ringan.',
            },
            {
                title: 'Pembiayaan Maksimal Rp 20 Juta',
                desc: 'Besar pembiayaan maksimal senilai Rp 20.000.000,- untuk kebutuhan porsi haji Anda.',
            },
            {
                title: 'Urbun Rp 5 Juta',
                desc: 'Uang muka (Urbun) senilai Rp 5.000.000,- untuk memulai pembiayaan.',
            },
        ],
        tujuan: {
            title: 'Tujuan dan Manfaat',
            items: [
                'Memberikan kemudahan kepada anggota TAMZIS dalam melaksanakan ibadah haji.',
                'Memberikan kepastian keberangkatan Ibadah Haji tanpa dibayang-bayangi kekhawatiran kehabisan quota porsi haji.',
                'Memudahkan dalam hal pembayaran cicilan dana talangan, karena jangka waktu sampai tiga tahun.',
            ],
        },
        akad: {
            title: 'Akad',
            intro: 'Pembiayaan Talangan Haji TAMZIS ini menggunakan akad Ijaroh wal Qordh.',
            items: [
                {
                    name: 'Ijaroh',
                    desc: 'Akad pemindahan hak guna (manfaat) atas suatu barang atau jasa dalam waktu tertentu melalui pembayaran sewa/upah, tanpa diikuti dengan pemindahan kepemilikan barang itu sendiri. Dalam akad ijaroh tidak ada perubahan kepemilikan, hanya pemindahan hak guna dari yang menyewakan kepada penyewa.',
                },
                {
                    name: 'Qordh',
                    desc: 'Akad perjanjian pinjam-meminjam dari seseorang atau lembaga (muqtaridh) yang wajib dikembalikan dengan jumlah yang sama selama jangka waktu yang telah ditentukan, dengan tujuan saling tolong-menolong tanpa mengharapkan imbalan (non-profit oriented transaction).',
                },
            ],
        },
        details: {
            title: 'Ketentuan Pembiayaan',
            items: [
                'Akad yang digunakan adalah Qordh dan Ijaroh.',
                'Pembiayaan dikhususkan untuk talangan porsi haji.',
                'Besar pembiayaan maksimal senilai Rp 20.000.000,-.',
                'Uang muka (Urbun) senilai Rp 5.000.000,-.',
                'Cicilan dapat disesuaikan dengan kemampuan anggota.',
                'Pembiayaan dapat dicairkan saat pendaftaran porsi haji.',
            ],
        },
    },
    en: {
        title: 'Hajj Portion - TAMZIS Bina Utama',
        heading: 'Hajj Portion',
        breadcrumb: {
            home: 'Home',
            financing: 'Savings',
            current: 'Hajj',
        },
        hero: {
            badge: 'Sacred Intention to Holy Land',
            title: 'Realize Your Dream Worship',
            content:
                'Financing specifically designated for hajj portion advances. Maximum financing amount of Rp 20 million. Down payment (Urbun) of Rp 5 million. Contracts used are Qordh and Ijaroh.',
        },
        features: [
            {
                title: 'Hajj Portion Advance',
                desc: 'Specific financing to obtain hajj portion with easy installments.',
            },
            {
                title: 'Maximum Financing Rp 20 Million',
                desc: 'Maximum financing amount of Rp 20,000,000,- for your hajj portion needs.',
            },
            {
                title: 'Urbun Rp 5 Million',
                desc: 'Down payment (Urbun) of Rp 5,000,000,- to start financing.',
            },
        ],
        tujuan: {
            title: 'Purpose and Benefits',
            items: [
                'Providing convenience for TAMZIS members in performing the hajj pilgrimage.',
                'Providing certainty of Hajj departure without worrying about running out of hajj portion quota.',
                'Easing the installment payments of the advance funds, with a term of up to three years.',
            ],
        },
        akad: {
            title: 'Contract',
            intro: 'This TAMZIS Hajj Advance Financing uses the Ijaroh wal Qordh contract.',
            items: [
                {
                    name: 'Ijaroh',
                    desc: 'A contract transferring the right of use (benefit) of goods or services for a certain period through rental/fee payments, without transferring ownership of the goods themselves. In an ijaroh contract there is no change of ownership, only a transfer of the right of use from the lessor to the lessee.',
                },
                {
                    name: 'Qordh',
                    desc: 'A lending agreement from a person or institution (muqtaridh) that must be repaid in the same amount within a specified period, with the aim of mutual help without expecting any reward (non-profit oriented transaction).',
                },
            ],
        },
        details: {
            title: 'Financing Terms',
            items: [
                'Contracts used are Qordh and Ijaroh.',
                'Financing is specifically designated for hajj portion advances.',
                'Maximum financing amount of Rp 20,000,000,-.',
                'Down payment (Urbun) of Rp 5,000,000,-.',
                'Installments can be adjusted to member capabilities.',
                'Financing can be disbursed when registering for hajj portion.',
            ],
        },
    },
    images: {
        hero: '/assets/img/menu/porsi-haji.png',
        banner: '/assets/img/header/Pembiayaan Umroh.jpg',
    },
};

export const rumahTumbuhBahagiaDefaults = {
    id: {
        title: 'Griya Tumbuh Bahagia (GTB) - TAMZIS Bina Utama',
        heading: 'Griya Tumbuh Bahagia',
        breadcrumb: {
            home: 'Beranda',
            financing: 'Pembiayaan',
            current: 'Griya Tumbuh Bahagia',
        },
        hero: {
            badge: 'Solusi Rumah Syariah',
            title: 'Mau Punya Rumah Mudah Tanpa Ribet? Bisa!',
            content:
                'Griya Tumbuh Bahagia adalah pembiayaan syariah untuk renovasi rumah, pembelian rumah baru, kapling tanah, konstruksi bangunan, atau full tanah & bangunan. Syariah, Mudah, Berkah.',
        },
        features: [
            {
                title: 'Renovasi Rumah',
                desc: 'Pembiayaan untuk memperbaiki, menambah, atau memperbarui bagian rumah agar lebih kuat, nyaman, aman, dan layak huni.',
            },
            {
                title: 'Kapling Tanah',
                desc: 'Pembiayaan untuk pembelian tanah siap bangun untuk investasi atau hunian masa depan.',
            },
            {
                title: 'Konstruksi Bangunan',
                desc: 'Pembiayaan untuk membangun rumah baru sesuai kebutuhan dan impian keluarga Anda.',
            },
            {
                title: 'Full Tanah & Bangunan',
                desc: 'Pembiayaan kepemilikan tanah sekaligus bangunannya, rumah lama maupun baru (Full GTB).',
            },
        ],
        details: {
            title: 'Keunggulan Griya Tumbuh Bahagia',
            items: [
                'Menggunakan akad-akad syariah (Murobahah, Istisna).',
                'Tidak ada floating rate/step up. Fix rate dari awal sampai akhir.',
                'Tidak ada biaya provisi (biaya real cost).',
                'DP ringan dan fleksibel.',
                'Jangka waktu sampai 15 tahun.',
                'Bagi karyawan pembayaran per tanggal 20.',
                'Margin ringan, start from 0,68% per bulan.',
                'Rumah lama/baru.',
                'Rumah bangun.',
                'Diskon pelunasan tidak ada pinalti pelunasan.',
            ],
        },
        peruntukan: {
            title: 'Peruntukan Pembiayaan',
            items: [
                'Renovasi Rumah',
                'Kapling Tanah',
                'Konstruksi Bangunan',
                'Full Tanah & Bangunan',
            ],
        },
        renovasi: {
            title: 'Renovasi Rumah',
            desc: 'Pembiayaan untuk memperbaiki, menambah, atau meningkatkan kualitas rumah yang sudah dimiliki seperti:',
            items: [
                'Tambah kamar',
                'Perbaikan atap, dapur, kamar mandi',
                'Rumah lebih nyaman dan bernilai',
                'Dan renovasi lainnya',
            ],
            ilustrasi: {
                title: 'Ilustrasi Untuk Renovasi Rumah',
                items: [
                    'Nilai pembiayaan: Rp 100.000.000',
                    'Jangka waktu: 5 tahun (60 bulan)',
                    'Angsuran per bulan: ± Rp 2.417.000',
                    'Setara hanya: ± Rp 120.850 per hari',
                ],
                note: 'Artinya, dengan angsuran harian yang ringan, Anda sudah bisa memperbaiki rumah, menambah ruang, dan meningkatkan kenyamanan keluarga — tanpa riba, tanpa ribet, dan sesuai prinsip syariah.',
            },
        },
        contact: {
            title: 'Info Selengkapnya',
            desc: 'Silahkan Hubungi Customer Service kami.',
            btn: '0812-8461-8561',
        },
    },
    en: {
        title: 'Griya Tumbuh Bahagia (GTB) - TAMZIS Bina Utama',
        heading: 'Griya Tumbuh Bahagia',
        breadcrumb: {
            home: 'Home',
            financing: 'Financing',
            current: 'Griya Tumbuh Bahagia',
        },
        hero: {
            badge: 'Sharia House Solution',
            title: 'Want to Own a House Easily Without Hassle? You Can!',
            content:
                'Griya Tumbuh Bahagia is sharia financing for house renovation, new house purchase, land plots, construction, or full land & building. Sharia, Easy, Blessed.',
        },
        features: [
            {
                title: 'House Renovation',
                desc: 'Financing to repair, add, or renew parts of the house to be stronger, comfortable, safe, and habitable.',
            },
            {
                title: 'Land Plots',
                desc: 'Financing for purchasing ready-to-build land for investment or future dwelling.',
            },
            {
                title: 'Building Construction',
                desc: 'Financing to build a new house according to your family needs and dreams.',
            },
            {
                title: 'Full Land & Building',
                desc: 'Financing for owning land along with its building, whether an old or new house (Full GTB).',
            },
        ],
        details: {
            title: 'Advantages of Griya Tumbuh Bahagia',
            items: [
                'Uses sharia contracts (Murobahah, Istisna).',
                'No floating rate/step up. Fixed rate from start to finish.',
                'No provision fees (real cost).',
                'Light and flexible down payment.',
                'Tenure up to 15 years.',
                'For employees, payment on the 20th.',
                'Light margin, starting from 0.68% per month.',
                'Old/new house.',
                'Build house.',
                'Discount on early settlement, no penalty.',
            ],
        },
        peruntukan: {
            title: 'Financing Purposes',
            items: [
                'House Renovation',
                'Land Plots',
                'Building Construction',
                'Full Land & Building',
            ],
        },
        renovasi: {
            title: 'House Renovation',
            desc: 'Financing to repair, add, or improve the quality of existing houses such as:',
            items: [
                'Add rooms',
                'Repair roof, kitchen, bathroom',
                'More comfortable and valuable house',
                'And other renovations',
            ],
            ilustrasi: {
                title: 'House Renovation Illustration',
                items: [
                    'Financing amount: Rp 100,000,000',
                    'Term: 5 years (60 months)',
                    'Monthly installment: ± Rp 2,417,000',
                    'Equivalent to only: ± Rp 120,850 per day',
                ],
                note: "This means that with light daily installments, you can repair your house, add rooms, and improve your family's comfort — without riba, without hassle, and in accordance with sharia principles.",
            },
        },
        contact: {
            title: 'More Information',
            desc: 'Please Contact Our Customer Service.',
            btn: '0812-8461-8561',
        },
    },
    images: {
        hero: '/assets/img/produk-unggulan/griya-tumbuh-bahagia.webp',
        banner: '/assets/img/header/Rumah-Tumbuh-Bahagia.jpg',
    },
};

// Fallback menu sidebar pembiayaan (dipakai SidebarMenuNav bila fetch API gagal).
export const pembiayaanMenuFallback = {
    id: {
        title: 'Produk Pembiayaan',
        menu: [
            { label: 'Mudharabah (Modal Usaha)', url: '/ikhtiar-utama' },
            { label: 'Murabahah (Jual Beli)', url: '/murabahah' },
            { label: 'Kafalah (Sosial)', url: '/kafalah' },
            { label: 'Porsi Haji', url: '/porsi-haji' },
            { label: 'Griya Tumbuh Bahagia', url: '/rumah-tumbuh-bahagia' },
        ],
    },
    en: {
        title: 'Financing Products',
        menu: [
            { label: 'Mudharabah (Business Capital)', url: '/ikhtiar-utama' },
            { label: 'Murabahah (Buying & Selling)', url: '/murabahah' },
            { label: 'Kafalah (Social)', url: '/kafalah' },
            { label: 'Hajj Portion', url: '/porsi-haji' },
            { label: 'Griya Tumbuh Bahagia', url: '/rumah-tumbuh-bahagia' },
        ],
    },
};

export type PembiayaanPageKey =
    | 'ikhtiar-utama'
    | 'murabahah'
    | 'kafalah'
    | 'porsi-haji'
    | 'rumah-tumbuh-bahagia';

// Registry untuk editor dashboard.
export const pembiayaanPageDefaults: Record<
    PembiayaanPageKey,
    { name: string; defaults: { id: unknown; en: unknown; images: Record<string, string> } }
> = {
    'ikhtiar-utama': { name: 'Mudharabah (Modal Usaha)', defaults: ikhtiarUtamaDefaults },
    murabahah: { name: 'Murabahah (Jual Beli)', defaults: murabahahDefaults },
    kafalah: { name: 'Kafalah (Sosial)', defaults: kafalahDefaults },
    'porsi-haji': { name: 'Porsi Haji', defaults: porsiHajiUmrohDefaults },
    'rumah-tumbuh-bahagia': { name: 'Griya Tumbuh Bahagia', defaults: rumahTumbuhBahagiaDefaults },
};
