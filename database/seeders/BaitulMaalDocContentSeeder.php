<?php

namespace Database\Seeders;

use App\Models\ProfilePageContent;
use Illuminate\Database\Seeder;

class BaitulMaalDocContentSeeder extends Seeder
{
    /**
     * Deskripsi hero.content per program, diambil dari dokumen resmi
     * (folder Drive "BAITUL MAAL" yang diberikan admin, Juli 2026).
     * Hanya field hero.content (locale id) yang diperbarui; field lain
     * (title, heading, breadcrumb, badge, en, images) dipertahankan.
     */
    public function run(): void
    {
        $defaultTitles = [
            'bina-siswa-cerdas' => 'Bina Siswa Cerdas',
            'be-aktriyo' => 'Be-aktriyo',
            'world-sight-day' => 'World Sight Day / Desama',
            'khitan-ceria' => 'Khitan Ceria',
            'mku' => 'Membangun Keluarga Utama (MKU)',
            'peduli-kesehatan' => 'Peduli Kesehatan',
            'cinta-masjid' => 'Cinta Masjid',
            'jumat-berkah' => 'Jumat Berkah',
            'tpq-ku' => 'TPQ-Ku',
            'wakaf-mukena-alquran' => 'Wakaf Mukena dan Al-Qur\'an',
            'bedah-rumah-bahagia' => 'Bedah Rumah Bahagia',
            'peduli-sosial-keagamaan' => 'Peduli Sosial Keagamaan',
            'peduli-yatim-dhuafa' => 'Peduli Yatim dan Dhuafa',
            'pemberdayaan-ekonomi' => 'Pemberdayaan Ekonomi',
            'peduli-bencana' => 'Peduli Bencana',
            'pusat-jajanan-ramadhan' => 'Pusat Jajanan Ramadhan',
        ];

        $heroContent = [
            'bina-siswa-cerdas' => [
                'Program Bina Siswa Cerdas merupakan program pemberdayaan pendidikan yang diselenggarakan oleh ULAZ MKU Tamzis sebagai bentuk komitmen dalam meningkatkan kualitas sumber daya manusia melalui dukungan pendidikan bagi siswa dari keluarga dhuafa yang memiliki semangat belajar dan potensi untuk berprestasi.',
                'Pendidikan dasar merupakan hak setiap anak. Namun, masih banyak siswa dari keluarga kurang mampu yang menghadapi kendala seperti biaya seragam, perlengkapan belajar, buku, alat tulis, transportasi, hingga uang kegiatan sekolah — kondisi yang berpotensi menurunkan motivasi belajar dan meningkatkan risiko putus sekolah.',
                'Melalui program ini, ULAZ MKU Tamzis tidak hanya memberikan beasiswa sebagai dukungan finansial, tetapi juga pendampingan karakter, pembinaan keislaman, penguatan akhlak, motivasi belajar, serta pengembangan potensi diri secara berkelanjutan.',
            ],
            'be-aktriyo' => [
                'Program BE-AKTRIYO (Beasiswa Akademi Optometri Yogyakarta) diselenggarakan oleh Baitul Maal Tamzis selaku Nazhir Wakaf Uang Badan Wakaf Indonesia, melalui Yayasan Bina Cendekia Utama Jogja yang mendirikan Akademi Optometri Yogyakarta (AKTRIYO).',
                'AKTRIYO menyelenggarakan program pendidikan diploma tiga yang mempersiapkan tenaga siap pakai di bidang kesehatan mata (optometri) — bidang yang masih terbilang langka di Indonesia sehingga lulusannya memiliki peluang kerja yang luas, baik di rumah sakit, klinik mata, perusahaan lensa/frame, maupun wirausaha di bidang optik.',
                'Beasiswa diberikan sampai lulus program diploma tiga, dengan tujuan mencetak tenaga ahli profesional di bidang optik sekaligus wujud kepedulian terhadap pendidikan dan wirausaha bagi lulusan SMA/SMK sederajat.',
            ],
            'world-sight-day' => [
                'Program DESAMA (Desa Sehat Mata) merupakan program kesehatan masyarakat yang berfokus pada peningkatan kesehatan mata serta pencegahan gangguan penglihatan melalui kegiatan promotif, preventif, kuratif, dan edukatif.',
                'Melalui program ini, ULAZ MKU Tamzis bekerja sama dengan tenaga kesehatan, rumah sakit, dan klinik mata untuk memberikan layanan pemeriksaan kesehatan mata, edukasi pola hidup sehat, deteksi dini gangguan penglihatan, bantuan kacamata, serta rujukan pengobatan lebih lanjut.',
                'Program ini menyasar masyarakat umum, khususnya kelompok dhuafa dan rentan — anak-anak usia sekolah, santri, lansia, guru, pekerja, penyandang disabilitas, hingga masyarakat di desa-desa binaan ULAZ MKU Tamzis.',
            ],
            'khitan-ceria' => [
                'Program Khitan Ceria merupakan program pelayanan khitan gratis yang diselenggarakan oleh ULAZ MKU Tamzis sebagai bentuk kepedulian terhadap kesehatan anak sekaligus mendukung pelaksanaan syariat Islam, ditujukan bagi anak-anak dari keluarga dhuafa dan masyarakat kurang mampu.',
                'Pelaksanaan Khitan Ceria dikemas dalam suasana yang menyenangkan dan ramah anak melalui kegiatan edukatif, hiburan, serta pemberian bingkisan, dengan melibatkan tenaga medis profesional agar anak-anak merasa tenang, percaya diri, dan tidak mengalami trauma.',
                'Selain layanan khitan, program ini juga menjadi sarana edukasi kepada orang tua mengenai kesehatan reproduksi, kebersihan diri, dan perawatan pascakhitan.',
            ],
            'mku' => [
                'MKU (Membangun Keluarga Utama) merupakan upaya yang diinisiasi gerakan BMT dalam rangka membangun keluarga Indonesia yang bahagia melalui serangkaian kegiatan dan pembiasaan hidup yang baik sesuai tuntunan Islam — seperti majelis ta\'lim, qiyamullail, sholat berjamaah, bersedekah, membaca Al-Qur\'an, dan berta\'awun.',
                'MKU Tamzis adalah kegiatan pembinaan dan pemberdayaan melalui lima pilar sehat MKU yang mengacu pada maqashid syariah: khifdu Dien (menjaga agama), khifdu Nafs (menjaga diri/rohani), khifdu Aql (menjaga akal), khifdu Nasl (menjaga keturunan), dan khifdu Maal (menjaga harta) — disederhanakan menjadi Sehat Ruhani, Sehat Jasmani, Sehat Intelektual, dan Sehat Finansial.',
            ],
            'peduli-kesehatan' => [
                'Program Peduli Kesehatan merupakan program pelayanan sosial yang bertujuan meningkatkan derajat kesehatan masyarakat, khususnya fakir, miskin, dhuafa, dan kelompok rentan, melalui bantuan kesehatan serta layanan promotif, preventif, kuratif, dan rehabilitatif.',
                'Pelaksanaan program mencakup bantuan biaya pengobatan, pemeriksaan kesehatan gratis, penyuluhan kesehatan, bantuan alat kesehatan, pemberian makanan tambahan bagi kelompok rentan, aksi donor darah, khitan massal, layanan ambulans, dan kegiatan kesehatan lainnya.',
                'Program ini dilaksanakan berdasarkan prinsip kemanusiaan, kepedulian, profesionalisme, amanah, transparansi, dan akuntabilitas, sehingga setiap bantuan memberikan manfaat optimal bagi penerima.',
            ],
            'cinta-masjid' => [
                'Masjid merupakan pusat peribadatan, pembinaan umat, dan kegiatan sosial keagamaan. Keberadaan masjid yang bersih dan nyaman mencerminkan penghormatan kepada tempat suci serta bagian dari ajaran Islam yang menekankan kebersihan sebagai bagian dari iman.',
                'Namun, tidak semua masjid memiliki sistem pengelolaan kebersihan yang baik dan berkelanjutan, sementara banyak masyarakat prasejahtera, dhuafa, atau lansia sehat membutuhkan pekerjaan tetap yang layak secara syar\'i dan sosial.',
                'Program Cinta Masjid hadir sebagai SOP terstruktur yang menjadi panduan rekrutmen, pelatihan, penugasan, pendampingan, hingga pemberdayaan tenaga kebersihan masjid secara terpadu, profesional, dan bernilai ibadah.',
            ],
            'jumat-berkah' => [
                'Kebutuhan pangan merupakan kebutuhan dasar setiap manusia. Namun, masih banyak masyarakat di sekitar kita — kaum dhuafa, pekerja informal, tunawisma, lansia terlantar, dan anak jalanan — yang mengalami kesulitan memenuhi kebutuhan makan harian.',
                'Program Jumat Berkah hadir sebagai bentuk kepedulian sosial melalui kegiatan berbagi nasi bungkus, menyediakan makanan siap santap yang layak dan bergizi kepada mereka yang membutuhkan.',
                'Program ini tidak hanya membantu sesama, tetapi juga membangun semangat berbagi, gotong royong, dan empati di kalangan masyarakat, dilaksanakan rutin khususnya pada hari Jumat, bulan Ramadhan, atau saat kondisi darurat.',
            ],
            'tpq-ku' => [
                'Program TPQ-Ku merupakan tindak lanjut dari Program Beasiswa Ustadz dan Ustadzah yang diinisiasi ULAZ MKU Tamzis sebagai upaya meningkatkan kualitas sumber daya manusia di bidang pendidikan Al-Qur\'an, mendorong para penerima beasiswa mengabdi di lembaga pendidikan Al-Qur\'an (TPQ/TPA).',
                'TPQ/TPA merupakan lembaga pendidikan Islam nonformal yang berperan strategis membentuk generasi Qur\'ani sejak usia dini — tempat belajar membaca Al-Qur\'an sekaligus sarana pembinaan akidah, ibadah, dan akhlakul karimah.',
                'ULAZ MKU Tamzis telah mendampingi dua lembaga TPQ/TPA sebagai tahap awal, mencakup penguatan tata kelola kelembagaan, peningkatan kapasitas ustadz/ustadzah, penataan administrasi, dan pembinaan manajemen organisasi, yang akan terus dikembangkan ke lembaga-lembaga lain di wilayah binaan.',
            ],
            'wakaf-mukena-alquran' => [
                'Program Pembagian Wakaf Al-Qur\'an, Mukena, dan Sarung merupakan program sosial keagamaan yang bertujuan meningkatkan akses masyarakat terhadap sarana ibadah yang layak, disalurkan dari para donatur kepada masjid, musala, TPQ/TPA, pondok pesantren, majelis taklim, mualaf, serta masyarakat yang membutuhkan.',
                'Masih banyak masyarakat, khususnya di wilayah pelosok, yang belum memiliki Al-Qur\'an, mukena, maupun sarung yang layak untuk beribadah, sementara tidak sedikit masjid dan lembaga pendidikan Al-Qur\'an mengalami keterbatasan fasilitas ibadah.',
                'Penyaluran dilakukan secara tepat sasaran berdasarkan hasil pendataan dan asesmen kebutuhan di lapangan, dengan mengedepankan prinsip amanah, transparansi, dan akuntabilitas — menjadi bentuk investasi amal jariyah yang memberikan manfaat berkelanjutan bagi para wakif.',
            ],
            'bedah-rumah-bahagia' => [
                'Rumah adalah kebutuhan dasar setiap manusia untuk hidup aman, nyaman, dan bermartabat. Namun, masih banyak keluarga dhuafa yang hidup di rumah tidak layak huni — berdinding anyaman bambu rapuh, berlantaikan tanah, beratap bocor, dan tanpa sanitasi memadai.',
                'Keterbatasan ekonomi membuat mereka tidak mampu memperbaiki atau membangun rumah yang layak, sementara bantuan pemerintah masih terbatas. Situasi ini membutuhkan kepedulian dan peran aktif masyarakat luas, lembaga sosial, dan para dermawan.',
                'Program "Bedah Rumah Bahagia untuk Dhuafa" hadir sebagai aksi nyata menghadirkan tempat tinggal yang layak, tidak hanya memperbaiki fisik bangunan tetapi juga menumbuhkan harapan, semangat hidup, dan keberdayaan sosial bagi penerima manfaat.',
            ],
            'peduli-sosial-keagamaan' => [
                'Program Peduli Sosial Keagamaan merupakan program kepedulian masyarakat yang mendukung berbagai kegiatan sosial, keagamaan, kemanusiaan, serta pengembangan sarana dan prasarana umum yang bermanfaat luas bagi masyarakat, khususnya kelompok dhuafa dan lembaga keagamaan.',
                'Pelaksanaan program dilakukan melalui bantuan dana, barang, maupun fasilitas yang mendukung kegiatan ibadah, pendidikan keagamaan, kegiatan sosial kemasyarakatan, serta pembangunan atau perbaikan sarana umum — termasuk santunan, bakti sosial, dan layanan masyarakat.',
                'Program ini dilaksanakan berdasarkan prinsip amanah, profesional, transparan, akuntabel, dan tepat sasaran, mengedepankan kolaborasi bersama masyarakat, pemerintah, lembaga pendidikan, pengurus masjid, dan mitra strategis lainnya.',
            ],
            'peduli-yatim-dhuafa' => [
                'Program Peduli Yatim dan Dhuafa merupakan bagian dari upaya lembaga sosial untuk meringankan beban ekonomi keluarga kurang mampu serta memberikan dukungan moral dan spiritual kepada anak-anak yatim dan dhuafa.',
                'Anak yatim dan dhuafa membutuhkan perhatian dan uluran tangan bersama karena hidup dalam keterbatasan ekonomi maupun sosial yang dapat memengaruhi tumbuh kembang dan masa depan mereka.',
                'Program ini memberikan bantuan kebutuhan dasar seperti makanan dan perlengkapan sekolah, sekaligus menumbuhkan semangat dan dukungan bagi anak yatim dan dhuafa agar tetap bersemangat dalam belajar dan menjalani kehidupan.',
            ],
            'pemberdayaan-ekonomi' => [
                'Kemiskinan masih menjadi persoalan utama sebagian masyarakat. Keterbatasan akses modal usaha, kurangnya keterampilan, dan rendahnya tingkat pendidikan menjadi faktor yang menyebabkan kelompok dhuafa sulit keluar dari lingkaran kemiskinan.',
                'Program Pemberdayaan Ekonomi hadir sebagai solusi strategis membantu masyarakat miskin agar mandiri secara ekonomi, melalui pelatihan, bantuan modal usaha, dan pendampingan sistematis agar penerima manfaat mampu mengembangkan usaha kecil secara produktif.',
            ],
            'peduli-bencana' => [
                'Program Tanggap Bencana dan Kemanusiaan diselenggarakan sebagai bentuk kepedulian terhadap masyarakat yang terdampak bencana alam maupun nonalam, memberikan respons cepat, tepat, dan terkoordinasi dalam memenuhi kebutuhan dasar para penyintas.',
                'Pelaksanaan program dilakukan melalui tahapan kesiapsiagaan, respons darurat, transisi menuju pemulihan, dan rehabilitasi — mencakup bantuan logistik (makanan, air bersih, pakaian, obat-obatan), layanan kesehatan, dukungan psikososial, hunian sementara, hingga pemberdayaan ekonomi pascabencana.',
                'Program ini melibatkan pemerintah, BPBD, relawan, komunitas, dunia usaha, dan masyarakat sebagai mitra, dengan prioritas perlindungan bagi kelompok rentan seperti anak-anak, lansia, ibu hamil, ibu menyusui, dan penyandang disabilitas.',
            ],
            'pusat-jajanan-ramadhan' => [
                'Pusat Jajanan Selama Ramadhan (PUJASERA) adalah kegiatan pemberdayaan ekonomi yang diselenggarakan Baitul Maal TAMZIS (ULAZ MKU TAMZIS) dengan tema "Menguatkan Iman, Menumbuhkan Usaha & Kemandirian", berlokasi di sepanjang Jl. Mayor Mu\'in Wonosobo.',
                'Di tengah tantangan ekonomi, pelaku usaha mikro terutama dari kalangan dhuafa sering menghadapi keterbatasan akses permodalan, pemasaran, dan ruang usaha yang layak. PUJASERA hadir sebagai wadah pemberdayaan yang edukatif dan berkelanjutan melalui konsep pasar kuliner dan UMKM yang tertata dan halal.',
                'Selain bazar kuliner sebagai kegiatan utama, PUJASERA juga diramaikan kegiatan penunjang seperti Obrolan Ngabuburit (Dakwah on the Street), santunan 1.000 anak yatim dan dhuafa, takjil gratis setiap Jumat, pentas nasyid, lomba video, dan musik akustik islami.',
            ],
        ];

        // Fitur (Tujuan / Sasaran / Manfaat) per program, diambil dari
        // bagian TUJUAN, SASARAN, dan MANFAAT PROGRAM di dokumen resmi.
        $features = [
            'bina-siswa-cerdas' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan akses pendidikan yang layak bagi siswa dari keluarga dhuafa dan prasejahtera agar dapat melanjutkan pendidikan tanpa terkendala keterbatasan ekonomi.'],
                ['title' => 'Sasaran', 'desc' => 'Siswa dan siswi jenjang SD/MI dan SMP/MTs dari keluarga dhuafa atau prasejahtera yang memiliki prestasi dan semangat belajar tinggi namun terkendala ekonomi.'],
                ['title' => 'Manfaat', 'desc' => 'Membentuk karakter siswa yang beriman, bertakwa, berakhlakul karimah, disiplin, mandiri, bertanggung jawab, dan memiliki kepedulian sosial.'],
            ],
            'be-aktriyo' => [
                ['title' => 'Tujuan', 'desc' => 'Memberikan bantuan beasiswa sampai lulus program diploma tiga di bidang optometri, untuk menjadi tenaga ahli profesional di bidang optik.'],
                ['title' => 'Sasaran', 'desc' => 'Siswa lulus SMA/SMK sederajat.'],
                ['title' => 'Manfaat', 'desc' => 'Beasiswa diberikan sampai lulus dengan kebermanfaatan optimal, sekaligus membantu jika mempunyai kendala pembiayaan.'],
            ],
            'world-sight-day' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan derajat kesehatan mata masyarakat melalui edukasi, deteksi dini, dan pelayanan kesehatan mata yang mudah diakses.'],
                ['title' => 'Sasaran', 'desc' => 'Masyarakat umum, khususnya dhuafa dan kelompok rentan — anak usia sekolah, santri, lansia, guru, pekerja, dan penyandang disabilitas.'],
                ['title' => 'Manfaat', 'desc' => 'Meningkatnya kesadaran masyarakat, tersedianya layanan pemeriksaan mata yang mudah dijangkau, serta terdeteksinya gangguan penglihatan sejak dini.'],
            ],
            'khitan-ceria' => [
                ['title' => 'Tujuan', 'desc' => 'Memberikan layanan khitan gratis bagi anak-anak dari keluarga dhuafa sebagai upaya meningkatkan kesehatan, kebersihan, dan kualitas hidup anak.'],
                ['title' => 'Sasaran', 'desc' => 'Anak-anak dari keluarga dhuafa dan masyarakat kurang mampu, dengan prioritas anak yatim, piatu, dan keluarga prasejahtera.'],
                ['title' => 'Manfaat', 'desc' => 'Layanan khitan yang aman, berkualitas, dan tanpa biaya, membantu meningkatkan kesehatan anak dan mengurangi beban ekonomi keluarga.'],
            ],
            'mku' => [
                ['title' => 'Tujuan', 'desc' => 'Memperkuat ketahanan keluarga sebagai fondasi utama dalam membentuk masyarakat yang harmonis, sejahtera, dan berakhlak mulia.'],
                ['title' => 'Sasaran', 'desc' => 'Karyawan Tamzis beserta keluarganya dan masyarakat umum, termasuk pasangan suami istri, calon pasangan, dan orang tua.'],
                ['title' => 'Manfaat', 'desc' => 'Meningkatkan ketahanan dan keharmonisan keluarga melalui penguatan nilai-nilai keagamaan, komunikasi efektif, dan saling menghargai.'],
            ],
            'peduli-kesehatan' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan akses masyarakat terhadap layanan kesehatan yang berkualitas serta meringankan beban biaya kesehatan bagi masyarakat dhuafa.'],
                ['title' => 'Sasaran', 'desc' => 'Fakir, miskin, dan dhuafa yang membutuhkan bantuan layanan kesehatan, termasuk anak-anak, ibu hamil, lansia, dan penyandang disabilitas.'],
                ['title' => 'Manfaat', 'desc' => 'Meningkatkan akses masyarakat terhadap layanan kesehatan yang layak, meringankan beban ekonomi keluarga, dan meningkatkan kualitas hidup.'],
            ],
            'cinta-masjid' => [
                ['title' => 'Tujuan', 'desc' => 'Menjaga kebersihan, kenyamanan, dan kehormatan masjid.'],
                ['title' => 'Sasaran', 'desc' => 'Masyarakat yang tergolong miskin dan fisabilillah.'],
                ['title' => 'Manfaat', 'desc' => 'Memberikan pekerjaan layak kepada dhuafa serta mendorong pemberdayaan ekonomi melalui pelatihan dan pembinaan tenaga kebersihan.'],
            ],
            'jumat-berkah' => [
                ['title' => 'Tujuan', 'desc' => 'Menumbuhkan empati sosial melalui aksi nyata berbagi makanan dan membantu masyarakat dhuafa yang membutuhkan.'],
                ['title' => 'Sasaran', 'desc' => 'Masyarakat yang tergolong 8 asnaf di wilayah kerja Tamzis, baik di sekitar cabang, pasar, maupun masjid.'],
                ['title' => 'Manfaat', 'desc' => 'Menghidupkan semangat berbagi di hari yang penuh berkah serta membangun kedekatan antara lembaga dan masyarakat.'],
            ],
            'tpq-ku' => [
                ['title' => 'Tujuan', 'desc' => 'Menyusun sistem tata kelola TPQ/TPA yang efektif dan efisien serta meningkatkan mutu pembelajaran dan manajemen kelembagaan.'],
                ['title' => 'Sasaran', 'desc' => 'Ustadz dan ustadzah, pengelola TPQ/TPA, serta santri sebagai penerima manfaat utama.'],
                ['title' => 'Manfaat', 'desc' => 'Menjamin keberlangsungan dan keberkahan TPQ/TPA dalam jangka panjang melalui tata kelola yang tertib dan berkualitas.'],
            ],
            'wakaf-mukena-alquran' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan kualitas ibadah dan syiar Islam melalui penyediaan sarana ibadah yang layak bagi masyarakat dan lembaga keagamaan.'],
                ['title' => 'Sasaran', 'desc' => 'Masjid, musala, TPQ/TPA, pondok pesantren, majelis taklim, mualaf, dan masyarakat dhuafa yang belum memiliki Al-Qur\'an atau perlengkapan ibadah yang layak.'],
                ['title' => 'Manfaat', 'desc' => 'Menjadi amal jariyah berkelanjutan bagi para wakif serta mendukung kegiatan pendidikan Al-Qur\'an dan pembinaan keagamaan.'],
            ],
            'bedah-rumah-bahagia' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan kualitas hidup kaum dhuafa melalui penyediaan rumah layak huni.'],
                ['title' => 'Sasaran', 'desc' => 'Keluarga dalam kondisi ekonomi lemah yang tinggal di rumah tidak layak huni, khususnya yang memenuhi kriteria mustahik (fakir/miskin).'],
                ['title' => 'Manfaat', 'desc' => 'Mengurangi risiko kesehatan dan keselamatan akibat kondisi rumah yang tidak memadai serta menumbuhkan semangat gotong royong masyarakat.'],
            ],
            'peduli-sosial-keagamaan' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan kepedulian sosial dan semangat berbagi kepada masyarakat yang membutuhkan.'],
                ['title' => 'Sasaran', 'desc' => 'Masyarakat dhuafa, masjid, musala, TPQ/TPA, pondok pesantren, yayasan sosial, panti asuhan, dan komunitas keagamaan.'],
                ['title' => 'Manfaat', 'desc' => 'Mendukung penyelenggaraan kegiatan keagamaan serta membantu penyediaan dan perbaikan sarana keagamaan dan fasilitas umum.'],
            ],
            'peduli-yatim-dhuafa' => [
                ['title' => 'Tujuan', 'desc' => 'Memberikan bantuan kebutuhan dasar seperti makanan dan perlengkapan sekolah bagi anak yatim dan dhuafa.'],
                ['title' => 'Sasaran', 'desc' => 'Anak-anak dari keluarga miskin atau kurang mampu secara ekonomi.'],
                ['title' => 'Manfaat', 'desc' => 'Memberikan semangat dan dukungan kepada anak yatim dan dhuafa agar tetap semangat dalam belajar dan menjalani kehidupan.'],
            ],
            'pemberdayaan-ekonomi' => [
                ['title' => 'Tujuan', 'desc' => 'Meningkatkan pendapatan dan kemandirian ekonomi dhuafa.'],
                ['title' => 'Sasaran', 'desc' => 'Masyarakat miskin dan dhuafa yang memiliki potensi dan motivasi kuat untuk menjalankan usaha produktif, termasuk pelaku usaha mikro yang belum bankable.'],
                ['title' => 'Manfaat', 'desc' => 'Menciptakan model pemberdayaan yang berkelanjutan dan terukur serta menurunkan angka kemiskinan melalui pendekatan usaha produktif.'],
            ],
            'peduli-bencana' => [
                ['title' => 'Tujuan', 'desc' => 'Memberikan respons cepat terhadap kejadian bencana guna meminimalkan dampak yang dialami masyarakat.'],
                ['title' => 'Sasaran', 'desc' => 'Korban bencana alam dan nonalam, dengan prioritas anak-anak, lansia, ibu hamil, ibu menyusui, dan penyandang disabilitas.'],
                ['title' => 'Manfaat', 'desc' => 'Memenuhi kebutuhan dasar penyintas bencana secara cepat, layak, dan tepat sasaran, serta mendukung proses pemulihan sosial dan ekonomi.'],
            ],
            'pusat-jajanan-ramadhan' => [
                ['title' => 'Tujuan', 'desc' => 'Pemberdayaan UMKM dhuafa serta menumbuhkan usaha mikro dengan menyediakan ruang usaha yang layak dan produktif.'],
                ['title' => 'Sasaran', 'desc' => 'Target 80 pedagang super mikro dengan jumlah pengunjung 1.000 orang per hari selama bulan Ramadhan.'],
                ['title' => 'Manfaat', 'desc' => 'Mendorong kemandirian ekonomi pelaku usaha dhuafa melalui peningkatan pendapatan dan pengalaman berusaha.'],
            ],
        ];

        foreach ($heroContent as $pageKey => $paragraphs) {
            $html = collect($paragraphs)->map(fn ($p) => '<p>'.$p.'</p>')->implode('');

            $existing = ProfilePageContent::where('page_key', $pageKey)->first();
            $data = $existing?->data ?? [];

            $data['id'] = $data['id'] ?? [];
            $data['id']['title'] = $data['id']['title'] ?? $defaultTitles[$pageKey];
            $data['id']['heading'] = $data['id']['heading'] ?? $defaultTitles[$pageKey];
            $data['id']['hero'] = $data['id']['hero'] ?? [];
            $data['id']['hero']['badge'] = $data['id']['hero']['badge'] ?? 'BAITUL MAAL TAMZIS';
            $data['id']['hero']['title'] = $data['id']['hero']['title'] ?? $defaultTitles[$pageKey];
            $data['id']['hero']['content'] = $html;

            if (isset($features[$pageKey])) {
                $data['id']['features'] = $features[$pageKey];
            }

            ProfilePageContent::updateOrCreate(
                ['page_key' => $pageKey],
                ['data' => $data],
            );
        }
    }
}
