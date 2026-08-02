<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\Dashboard\BaitulMaalController;
use App\Http\Controllers\Dashboard\BeritaContentController;
use App\Http\Controllers\Dashboard\HeroBannerController;
use App\Http\Controllers\Dashboard\HomeSectionController;
use App\Http\Controllers\Dashboard\InfoKarirController;
use App\Http\Controllers\Dashboard\PageContentController;
use App\Http\Controllers\Dashboard\ProfilePageContentController;
use App\Http\Controllers\Dashboard\SettingsController;
use App\Http\Controllers\Dashboard\SidebarMenuController;
use App\Http\Controllers\Dashboard\SiteSectionController;
use App\Http\Controllers\Dashboard\TestimonialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IjabahRateController;
use App\Http\Controllers\InstagramFeedController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\LayananDigitalController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SimulasiGTBController;
use App\Http\Controllers\SimulasiHajiController;
use App\Http\Controllers\SimulasiKafalahController;
use App\Http\Controllers\SimulasiMudharabahController;
use App\Http\Controllers\SimulasiMurobahahController;
use App\Http\Controllers\SimulasiSimpananController;
use App\Http\Controllers\SocialMediaAccountController;
use App\Http\Controllers\UserController;
use App\Models\HeroBanner;
use App\Models\HomeSection;
use App\Models\PageContent;
use App\Models\Testimonial;
use App\Services\InstagramFeedService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $banners = HeroBanner::where('is_active', true)
        ->where('page_slug', 'homepage')
        ->orderBy('order')
        ->take(4)
        ->get();

    $testimonials = Testimonial::where('is_active', true)
        ->orderBy('order')
        ->orderBy('created_at', 'desc')
        ->get();

    // Galeri Instagram menggunakan tabel instagram_feed_db yang terpisah
    $instagramItems = app(\App\Services\InstagramFeedDbService::class)->latestForHome(4);

    return inertia('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'heroBanners' => $banners,
        'testimonials' => $testimonials,
        'homeSections' => HomeSection::all()->pluck('data', 'key'),
        'instagramFeed' => $instagramItems,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/simulasi/{jenis}', [DashboardController::class, 'simulasi'])->name('dashboard.simulasi');
    Route::resource('dashboard/users', UserController::class)->except(['create', 'show', 'edit']);
    Route::resource('dashboard/karir', CareerController::class)->except(['create', 'show', 'edit'])->parameters(['karir' => 'karir']);
    Route::post('dashboard/karir/kegiatan-sdi', [CareerController::class, 'storeKegiatan'])->name('dashboard.karir.kegiatan-sdi.store');
    Route::put('dashboard/karir/kegiatan-sdi/{kegiatanSdi}', [CareerController::class, 'updateKegiatan'])->name('dashboard.karir.kegiatan-sdi.update');
    Route::delete('dashboard/karir/kegiatan-sdi/{kegiatanSdi}', [CareerController::class, 'destroyKegiatan'])->name('dashboard.karir.kegiatan-sdi.destroy');
    Route::resource('dashboard/alamat', OfficeController::class)->except(['create', 'show', 'edit'])->parameters(['alamat' => 'alamat']);
    Route::resource('dashboard/sosmed', SocialMediaAccountController::class)->except(['create', 'show', 'edit'])->parameters(['sosmed' => 'sosmed']);
    Route::patch('dashboard/sosmed/{sosmed}/toggle', [SocialMediaAccountController::class, 'toggleActive'])->name('dashboard.sosmed.toggle');

    // Hero Banner Management
    Route::resource('dashboard/pages/banners/hero', HeroBannerController::class)->except(['show'])->names([
        'index' => 'dashboard.pages.banners.hero.index',
        'create' => 'dashboard.pages.banners.hero.create',
        'store' => 'dashboard.pages.banners.hero.store',
        'edit' => 'dashboard.pages.banners.hero.edit',
        'update' => 'dashboard.pages.banners.hero.update',
        'destroy' => 'dashboard.pages.banners.hero.destroy',
    ])->parameters(['hero' => 'banner']);
    Route::patch('dashboard/pages/banners/hero/{banner}/toggle', [HeroBannerController::class, 'toggleActive'])->name('dashboard.pages.banners.hero.toggle');

    Route::resource('dashboard/pages/testimonials', TestimonialController::class)
        ->except(['show'])
        ->names([
            'index' => 'dashboard.pages.testimonials.index',
            'create' => 'dashboard.pages.testimonials.create',
            'store' => 'dashboard.pages.testimonials.store',
            'edit' => 'dashboard.pages.testimonials.edit',
            'update' => 'dashboard.pages.testimonials.update',
            'destroy' => 'dashboard.pages.testimonials.destroy',
        ])
        ->parameters(['testimonials' => 'testimonial']);

    // Navbar & Footer Management
    Route::get('dashboard/pages/navigation', [SiteSectionController::class, 'edit'])->name('dashboard.pages.navigation.edit');
    Route::put('dashboard/pages/navigation', [SiteSectionController::class, 'update'])->name('dashboard.pages.navigation.update');

    // Legal Pages Management (Kebijakan Privasi & Syarat Ketentuan)
    Route::get('dashboard/pages/legal', [App\Http\Controllers\Dashboard\LegalPageController::class, 'edit'])->name('dashboard.pages.legal.edit');
    Route::put('dashboard/pages/legal/{page}', [App\Http\Controllers\Dashboard\LegalPageController::class, 'update'])->name('dashboard.pages.legal.update');

    // Page Content Management (WordPress-like page editor)
    Route::get('dashboard/pages/content/beranda', [HomeSectionController::class, 'edit'])->name('dashboard.pages.content.beranda.edit');
    Route::put('dashboard/pages/content/beranda', [HomeSectionController::class, 'update'])->name('dashboard.pages.content.beranda.update');
    Route::post('dashboard/pages/content/beranda/why-image', [HomeSectionController::class, 'uploadWhyImage'])->name('dashboard.pages.content.beranda.why-image');
    Route::post('dashboard/pages/content/beranda/featured-image', [HomeSectionController::class, 'uploadFeaturedImage'])->name('dashboard.pages.content.beranda.featured-image');
    Route::get('dashboard/pages/content/menus', [SidebarMenuController::class, 'edit'])->name('dashboard.pages.content.menus.edit');
    Route::put('dashboard/pages/content/menus/{menu}', [SidebarMenuController::class, 'update'])->name('dashboard.pages.content.menus.update');
    Route::get('dashboard/pages/content/profil', [ProfilePageContentController::class, 'edit'])->name('dashboard.pages.content.profil.edit');
    Route::get('dashboard/pages/content/simpanan', [ProfilePageContentController::class, 'editSimpanan'])->name('dashboard.pages.content.simpanan.edit');
    Route::get('dashboard/pages/content/pembiayaan', [ProfilePageContentController::class, 'editPembiayaan'])->name('dashboard.pages.content.pembiayaan.edit');
    Route::get('dashboard/pages/content/baitul-maal', [ProfilePageContentController::class, 'editBaitulMaal'])->name('dashboard.pages.content.baitul-maal.edit');
    Route::put('dashboard/pages/content/baitul-maal/{page}', [ProfilePageContentController::class, 'updateBaitulMaal'])->name('dashboard.pages.content.baitul-maal.update');
    Route::post('dashboard/pages/content/profil/upload', [ProfilePageContentController::class, 'uploadImage'])->name('dashboard.pages.content.profil.upload');
    Route::put('dashboard/pages/content/profil/{page}', [ProfilePageContentController::class, 'update'])->name('dashboard.pages.content.profil.update');

    // Layanan Digital Management
    Route::get('dashboard/pages/content/layanan-digital', [App\Http\Controllers\Dashboard\LayananDigitalController::class, 'edit'])->name('dashboard.pages.content.layanan-digital.edit');
    Route::put('dashboard/pages/content/layanan-digital', [App\Http\Controllers\Dashboard\LayananDigitalController::class, 'update'])->name('dashboard.pages.content.layanan-digital.update');
    Route::post('dashboard/pages/content/layanan-digital/upload-background', [App\Http\Controllers\Dashboard\LayananDigitalController::class, 'uploadBackgroundImage'])->name('dashboard.pages.content.layanan-digital.upload-background');

    // Kantor Layanan Content Management
    Route::get('dashboard/pages/content/kantor-layanan', [App\Http\Controllers\Dashboard\KantorLayananContentController::class, 'edit'])->name('dashboard.pages.content.kantor-layanan.edit');
    Route::put('dashboard/pages/content/kantor-layanan', [App\Http\Controllers\Dashboard\KantorLayananContentController::class, 'update'])->name('dashboard.pages.content.kantor-layanan.update');

    // Info Karir Management
    Route::get('dashboard/pages/content/info-karir', [InfoKarirController::class, 'edit'])->name('dashboard.pages.content.info-karir.edit');
    Route::put('dashboard/pages/content/info-karir', [InfoKarirController::class, 'update'])->name('dashboard.pages.content.info-karir.update');
    Route::post('dashboard/pages/content/info-karir/upload-background', [InfoKarirController::class, 'uploadBackgroundImage'])->name('dashboard.pages.content.info-karir.upload-background');
    Route::post('dashboard/pages/content/info-karir/upload-program-image', [InfoKarirController::class, 'uploadProgramImage'])->name('dashboard.pages.content.info-karir.upload-program-image');

    Route::resource('dashboard/pages/content', PageContentController::class)
        ->except(['show'])
        ->names([
            'index' => 'dashboard.pages.content.index',
            'create' => 'dashboard.pages.content.create',
            'store' => 'dashboard.pages.content.store',
            'edit' => 'dashboard.pages.content.edit',
            'update' => 'dashboard.pages.content.update',
            'destroy' => 'dashboard.pages.content.destroy',
        ])
        ->parameters(['content' => 'content']);
    Route::post('dashboard/pages/content/upload-image', [PageContentController::class, 'uploadImage'])->name('dashboard.pages.content.upload-image');
    Route::patch('dashboard/pages/content/{content}/toggle', [PageContentController::class, 'togglePublish'])->name('dashboard.pages.content.toggle');

    // API Settings Management
    Route::get('dashboard/settings/api', [SettingsController::class, 'index'])->name('dashboard.settings.api');
    Route::put('dashboard/settings/api', [SettingsController::class, 'update'])->name('dashboard.settings.api.update');
    Route::post('dashboard/settings/api/clear-config', [SettingsController::class, 'clearConfig'])->name('dashboard.settings.api.clear-config');

    // Kelola Berita (Instagram feed management)
    Route::get('dashboard/pages/content/berita', [BeritaContentController::class, 'index'])->name('dashboard.pages.content.berita.index');

    // Admin: Kelola Berita
    Route::resource('dashboard/berita', App\Http\Controllers\Dashboard\BeritaController::class)->parameters([
        'berita' => 'berita',
    ])->names([
        'index' => 'dashboard.berita.index',
        'create' => 'dashboard.berita.create',
        'store' => 'dashboard.berita.store',
        'show' => 'dashboard.berita.show',
        'edit' => 'dashboard.berita.edit',
        'update' => 'dashboard.berita.update',
        'destroy' => 'dashboard.berita.destroy',
    ]);

    // Baitul Maal Programs Management
    Route::get('dashboard/baitul-maal/pusat-jajanan-ramadhan', [BaitulMaalController::class, 'pusatJajananRamadhan'])->name('dashboard.baitul-maal.pusat-jajanan-ramadhan');
    Route::put('dashboard/baitul-maal/pusat-jajanan-ramadhan', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.pusat-jajanan-ramadhan.save');
    Route::get('dashboard/baitul-maal/bahagia-1000-yatim-dhuafa', [BaitulMaalController::class, 'bahagia1000YatimDhuafa'])->name('dashboard.baitul-maal.bahagia-1000-yatim-dhuafa');
    Route::put('dashboard/baitul-maal/bahagia-1000-yatim-dhuafa', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.bahagia-1000-yatim-dhuafa.save');
    Route::get('dashboard/baitul-maal/peduli-bencana', [BaitulMaalController::class, 'peduliBencana'])->name('dashboard.baitul-maal.peduli-bencana');
    Route::put('dashboard/baitul-maal/peduli-bencana', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.peduli-bencana.save');
    Route::get('dashboard/baitul-maal/peduli-sosial-keagamaan', [BaitulMaalController::class, 'peduliSosialKeagamaan'])->name('dashboard.baitul-maal.peduli-sosial-keagamaan');
    Route::put('dashboard/baitul-maal/peduli-sosial-keagamaan', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.peduli-sosial-keagamaan.save');
    Route::get('dashboard/baitul-maal/peduli-yatim-dhuafa', [BaitulMaalController::class, 'peduliYatimDhuafa'])->name('dashboard.baitul-maal.peduli-yatim-dhuafa');
    Route::put('dashboard/baitul-maal/peduli-yatim-dhuafa', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.peduli-yatim-dhuafa.save');
    Route::get('dashboard/baitul-maal/bedah-rumah-bahagia', [BaitulMaalController::class, 'bedahRumahBahagia'])->name('dashboard.baitul-maal.bedah-rumah-bahagia');
    Route::put('dashboard/baitul-maal/bedah-rumah-bahagia', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.bedah-rumah-bahagia.save');
    Route::get('dashboard/baitul-maal/pemberdayaan-ekonomi', [BaitulMaalController::class, 'pemberdayaanEkonomi'])->name('dashboard.baitul-maal.pemberdayaan-ekonomi');
    Route::put('dashboard/baitul-maal/pemberdayaan-ekonomi', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.pemberdayaan-ekonomi.save');
    Route::get('dashboard/baitul-maal/berbasis-masjid-alquran', [BaitulMaalController::class, 'berbasisMasjidAlquran'])->name('dashboard.baitul-maal.berbasis-masjid-alquran');
    Route::put('dashboard/baitul-maal/berbasis-masjid-alquran', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.berbasis-masjid-alquran.save');
    Route::get('dashboard/baitul-maal/beasiswa-ustadz', [BaitulMaalController::class, 'beasiswaUstadz'])->name('dashboard.baitul-maal.beasiswa-ustadz');
    Route::put('dashboard/baitul-maal/beasiswa-ustadz', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.beasiswa-ustadz.save');
    Route::get('dashboard/baitul-maal/cinta-masjid', [BaitulMaalController::class, 'cintaMasjid'])->name('dashboard.baitul-maal.cinta-masjid');
    Route::put('dashboard/baitul-maal/cinta-masjid', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.cinta-masjid.save');
    Route::get('dashboard/baitul-maal/jumat-berkah', [BaitulMaalController::class, 'jumatBerkah'])->name('dashboard.baitul-maal.jumat-berkah');
    Route::put('dashboard/baitul-maal/jumat-berkah', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.jumat-berkah.save');
    Route::get('dashboard/baitul-maal/tpq-ku', [BaitulMaalController::class, 'tpqKu'])->name('dashboard.baitul-maal.tpq-ku');
    Route::put('dashboard/baitul-maal/tpq-ku', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.tpq-ku.save');
    Route::get('dashboard/baitul-maal/pengembangan-amil-nadzir', [BaitulMaalController::class, 'pengembanganAmilNadzir'])->name('dashboard.baitul-maal.pengembangan-amil-nadzir');
    Route::put('dashboard/baitul-maal/pengembangan-amil-nadzir', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.pengembangan-amil-nadzir.save');
    Route::get('dashboard/baitul-maal/wakaf-mukena-alquran', [BaitulMaalController::class, 'wakafMukenaAlquran'])->name('dashboard.baitul-maal.wakaf-mukena-alquran');
    Route::put('dashboard/baitul-maal/wakaf-mukena-alquran', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.wakaf-mukena-alquran.save');
    Route::get('dashboard/baitul-maal/berbasis-mku', [BaitulMaalController::class, 'berbasisMku'])->name('dashboard.baitul-maal.berbasis-mku');
    Route::put('dashboard/baitul-maal/berbasis-mku', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.berbasis-mku.save');
    Route::get('dashboard/baitul-maal/bina-siswa-cerdas', [BaitulMaalController::class, 'binaSiswaCerdas'])->name('dashboard.baitul-maal.bina-siswa-cerdas');
    Route::put('dashboard/baitul-maal/bina-siswa-cerdas', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.bina-siswa-cerdas.save');
    Route::get('dashboard/baitul-maal/be-aktriyo', [BaitulMaalController::class, 'beAktriyo'])->name('dashboard.baitul-maal.be-aktriyo');
    Route::put('dashboard/baitul-maal/be-aktriyo', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.be-aktriyo.save');
    Route::get('dashboard/baitul-maal/mku', [BaitulMaalController::class, 'mku'])->name('dashboard.baitul-maal.mku');
    Route::put('dashboard/baitul-maal/mku', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.mku.save');
    Route::get('dashboard/baitul-maal/peduli-kesehatan', [BaitulMaalController::class, 'peduliKesehatan'])->name('dashboard.baitul-maal.peduli-kesehatan');
    Route::put('dashboard/baitul-maal/peduli-kesehatan', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.peduli-kesehatan.save');
    Route::get('dashboard/baitul-maal/world-sight-day', [BaitulMaalController::class, 'worldSightDay'])->name('dashboard.baitul-maal.world-sight-day');
    Route::put('dashboard/baitul-maal/world-sight-day', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.world-sight-day.save');
    Route::get('dashboard/baitul-maal/qurban', [BaitulMaalController::class, 'qurban'])->name('dashboard.baitul-maal.qurban');
    Route::put('dashboard/baitul-maal/qurban', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.qurban.save');
    Route::get('dashboard/baitul-maal/khitan-ceria', [BaitulMaalController::class, 'khitanCeria'])->name('dashboard.baitul-maal.khitan-ceria');
    Route::put('dashboard/baitul-maal/khitan-ceria', [BaitulMaalController::class, 'save'])->name('dashboard.baitul-maal.khitan-ceria.save');
});

Route::inertia('company-profile', 'company-profile')->name('company-profile');
Route::inertia('legalitas', 'legalitas')->name('legalitas');
Route::inertia('kebijakan-privasi', 'kebijakan-privasi')->name('kebijakan-privasi');
Route::inertia('syarat-ketentuan', 'syarat-ketentuan')->name('syarat-ketentuan');
Route::inertia('visi-misi', 'visi-misi')->name('visi-misi');
Route::inertia('corporate-culture', 'corporate-culture')->name('corporate-culture');
Route::inertia('penghargaan', 'penghargaan')->name('penghargaan');
Route::inertia('baitul-maal', 'baitul-maal')->name('baitul-maal');
Route::inertia('cinta-masjid', 'cinta-masjid')->name('cinta-masjid');
Route::inertia('pusat-jajanan-selama-ramadhan', 'pusat-jajanan-selama-ramadhan')->name('pusat-jajanan-selama-ramadhan');
Route::inertia('bahagia-1000-yatim-dan-dhuafa', 'bahagia-1000-yatim-dan-dhuafa')->name('bahagia-1000-yatim-dan-dhuafa');
Route::inertia('peduli-bencana', 'peduli-bencana')->name('peduli-bencana');
Route::inertia('peduli-sosial-keagamaan', 'peduli-sosial-keagamaan')->name('peduli-sosial-keagamaan');
Route::inertia('peduli-yatim-dan-dhuafa', 'peduli-yatim-dan-dhuafa')->name('peduli-yatim-dan-dhuafa');
Route::inertia('bedah-rumah-bahagia', 'bedah-rumah-bahagia')->name('bedah-rumah-bahagia');
Route::inertia('jumat-berkah', 'jumat-berkah')->name('jumat-berkah');
Route::inertia('tpq-ku', 'tpq-ku')->name('tpq-ku');
Route::inertia('prog-pengembangan-pembinaan-amil-nadzir', 'prog-pengembangan-pembinaan-amil-nadzir')->name('prog-pengembangan-pembinaan-amil-nadzir');
Route::inertia('program-bina-siswa-cerdas', 'program-bina-siswa-cerdas')->name('program-bina-siswa-cerdas');
Route::inertia('program-be-aktriyo', 'program-be-aktriyo')->name('program-be-aktriyo');
Route::inertia('program-membangun-keluarga-utama-mku', 'program-membangun-keluarga-utama-mku')->name('program-membangun-keluarga-utama-mku');
Route::inertia('program-peduli-kesehatan', 'program-peduli-kesehatan')->name('program-peduli-kesehatan');
Route::inertia('program-world-sight-day-desama', 'program-world-sight-day-desama')->name('program-world-sight-day-desama');
Route::inertia('wakaf-mukena-al-quran', 'wakaf-mukena-al-quran')->name('wakaf-mukena-al-quran');
Route::inertia('program-pemberdayaan-dhuafa', 'program-pemberdayaan-dhuafa')->name('program-pemberdayaan-dhuafa');
Route::inertia('qurban-tamzis', 'qurban-tamzis')->name('qurban-tamzis');
Route::inertia('program-khitan-ceria', 'program-khitan-ceria')->name('program-khitan-ceria');
Route::inertia('ziswaf', 'ziswaf')->name('ziswaf');
Route::inertia('simpanan-mutiara', 'simpanan-mutiara')->name('simpanan-mutiara');

// New Routes
Route::get('kantor-layanan', [OfficeController::class, 'publicIndex'])->name('kantor-layanan');
Route::get('api/ijabah-rate', [IjabahRateController::class, 'index'])->name('api.ijabah-rate');
Route::get('api/simulasi/murobahah', [SimulasiMurobahahController::class, 'index'])->name('api.simulasi.murobahah');
Route::get('api/simulasi/kafalah', [SimulasiKafalahController::class, 'index'])->name('api.simulasi.kafalah');
Route::get('api/simulasi/haji', [SimulasiHajiController::class, 'index'])->name('api.simulasi.haji');
Route::get('api/simulasi/mudharabah', [SimulasiMudharabahController::class, 'index'])->name('api.simulasi.mudharabah');
Route::get('api/simulasi/gtb/anuitas', [SimulasiGTBController::class, 'anuitas'])->name('api.simulasi.gtb.anuitas');
Route::get('api/simulasi/gtb/flat', [SimulasiGTBController::class, 'flat'])->name('api.simulasi.gtb.flat');
Route::get('layanan-digital', [LayananDigitalController::class, 'index'])->name('layanan-digital');
Route::inertia('beasiswa-ustadz', 'beasiswa-ustadz')->name('beasiswa-ustadz');
Route::inertia('simpanan-pendidikan', 'simpanan-pendidikan')->name('simpanan-pendidikan');
Route::inertia('simpanan-berjangka', 'simpanan-berjangka')->name('simpanan-berjangka');
Route::inertia('simpanan-ijabah', 'simpanan-ijabah')->name('simpanan-ijabah');
Route::inertia('simpanan-mudharabah', 'simpanan-mudharabah')->name('simpanan-mudharabah');
Route::inertia('ikhtiar-utama', 'ikhtiar-utama')->name('ikhtiar-utama');
Route::inertia('murabahah', 'murabahah')->name('murabahah');
Route::inertia('kafalah', 'kafalah')->name('kafalah');
Route::inertia('porsi-haji', 'porsi-haji')->name('porsi-haji');
Route::redirect('porsi-haji-umroh', '/porsi-haji', 301);
Route::inertia('rumah-tumbuh-bahagia', 'rumah-tumbuh-bahagia')->name('rumah-tumbuh-bahagia');
Route::inertia('simulasi-gtb', 'simulasi-gtb')->name('simulasi-gtb');
Route::inertia('simulasi-pembiayaan', 'simulasi-pembiayaan')->name('simulasi-pembiayaan');
Route::inertia('simulasi-haji', 'simulasi-haji')->name('simulasi-haji');
Route::inertia('simulasi-mudharabah', 'simulasi-mudharabah')->name('simulasi-mudharabah');
Route::inertia('simulasi-murabahah', 'simulasi-murabahah')->name('simulasi-murabahah');
Route::inertia('simulasi-kafalah', 'simulasi-kafalah')->name('simulasi-kafalah');
Route::post('simulasi-simpanan', [SimulasiSimpananController::class, 'store'])->name('simulasi-simpanan.store');
Route::patch('simulasi-simpanan/{simulasiSimpanan}/plafond', [SimulasiSimpananController::class, 'updatePlafond'])->name('simulasi-simpanan.update-plafond');
Route::get('berita', [BeritaController::class, 'index'])->name('berita');
Route::get('berita/{id}', [BeritaController::class, 'show'])->name('berita.show')->whereNumber('id');
Route::get('berita/feed/instagram', [InstagramFeedController::class, 'index'])->name('berita.feed.instagram');
Route::domain('karir.tamzis.id')->group(function () {
    Route::get('/', [JobVacancyController::class, 'index'])->name('karir.home');
});

Route::get('info-karir', [JobVacancyController::class, 'index'])->name('info-karir');
Route::post('info-karir/lowongan', [JobVacancyController::class, 'store'])->name('info-karir.store')->middleware(['auth', 'verified']);
Route::get('api/search', [SearchController::class, 'index'])->name('api.search');
Route::get('api/sidebar-menu/{group}', [SidebarMenuController::class, 'show'])->name('api.sidebar-menu');
Route::get('api/profile-content/{page}', [ProfilePageContentController::class, 'show'])->name('api.profile-content');
Route::get('api/social-media-accounts', function () {
    return response()->json(
        \App\Models\SocialMediaAccount::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'name', 'icon', 'url', 'button_color'])
    );
})->name('api.social-media-accounts');

Route::get('language/{locale}', function ($locale) {
    if (! in_array($locale, ['en', 'id'])) {
        abort(400);
    }

    session()->put('locale', $locale);

    return redirect()->back();
})->name('language.switch');

// RSS Feed Proxy - untuk绕过 CORS限制
Route::get('/api/proxy-rss', function (Request $request) {
    $url = $request->query('url');
    
    if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
        return response('Invalid URL', 400);
    }

    try {
        $response = Http::timeout(30)->get($url);
        
        return response($response->body(), 200, [
            'Content-Type' => 'application/xml',
            'Access-Control-Allow-Origin' => '*',
        ]);
    } catch (\Throwable $e) {
        return response('Failed to fetch feed: ' . $e->getMessage(), 500);
    }
})->name('api.proxy-rss');

require __DIR__.'/settings.php';

// Halaman dinamis dari Konten Halaman (dashboard) — wajib paling akhir agar route statis menang.
Route::get('{slug}', function (string $slug) {
    $locale = app()->getLocale();

    $page = PageContent::where('slug', $slug)
        ->where('is_published', true)
        ->where('locale', $locale)
        ->first()
        ?? PageContent::where('slug', $slug)
            ->where('is_published', true)
            ->first();

    abort_unless($page, 404);

    return inertia('page-view', [
        'pageContent' => $page,
    ]);
})->where('slug', '[a-zA-Z0-9\-]+')->name('page.show');
