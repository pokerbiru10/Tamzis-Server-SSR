<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilePageContent extends Model
{
    public const PAGE_KEYS = [
        // Halaman profil
        'company-profile',
        'legalitas',
        'visi-misi',
        'corporate-culture',
        'penghargaan',
        // Halaman produk simpanan
        'simpanan-mutiara',
        'simpanan-pendidikan',
        'simpanan-ijabah',
        'simpanan-mudharabah',
        'simpanan-berjangka',
        // Halaman produk pembiayaan
        'ikhtiar-utama',
        'murabahah',
        'kafalah',
        'porsi-haji',
        'rumah-tumbuh-bahagia',
        // Halaman Baitul Maal
        'baitul-maal',
        'cinta-masjid',
        'peduli-bencana',
        'peduli-yatim',
        // Program Baitul Maal
        'pusat-jajanan-ramadhan',
        'bahagia-1000-yatim-dhuafa',
        'peduli-sosial-keagamaan',
        'peduli-yatim-dhuafa',
        'bedah-rumah-bahagia',
        'pemberdayaan-ekonomi',
        'berbasis-masjid-alquran',
        'beasiswa-ustadz',
        'jumat-berkah',
        'tpq-ku',
        'pengembangan-amil-nadzir',
        'wakaf-mukena-alquran',
        'berbasis-mku',
        'bina-siswa-cerdas',
        'be-aktriyo',
        'mku',
        'peduli-kesehatan',
        'world-sight-day',
        'qurban',
        'khitan-ceria',
    ];

    protected $fillable = [
        'page_key',
        'data',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }
}
