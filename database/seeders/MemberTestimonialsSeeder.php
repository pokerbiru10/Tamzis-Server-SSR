<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class MemberTestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'locale' => 'id',
                'name' => 'Iin Lestari',
                'occupation' => 'Pedagang Sayur',
                'location' => 'Jalan Imogiri Timur Bantul Yogyakarta',
                'quote' => 'Tamzis mempunyai prioritas – prioritas tertentu untuk mengembangkan usaha mikro seperti saya',
                'photo_url' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'locale' => 'id',
                'name' => 'Ibu Sutarti',
                'occupation' => 'Pedagang Jajanan dan Snack',
                'location' => 'Condong Catur Yogyakarta',
                'quote' => 'Pelayanannya bagus, karyawannya enak enak, mau tanya apa saja enak, jika tanya yang belum jelas jadinya enak',
                'photo_url' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'locale' => 'id',
                'name' => 'Ibu Wahyuningsih',
                'occupation' => 'Pedagang Kelonton',
                'location' => 'Jalan Ahmadi Parakan Temanggung',
                'quote' => 'Ketika menabung ataupun menggambil langsung diantar ke toko, Saya tidak perlu repot-repot ke kantor TAMZIS, cukup menunggu di toko saja',
                'photo_url' => null,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'locale' => 'id',
                'name' => 'Bapak Romadhon',
                'occupation' => 'Petani Kentang',
                'location' => 'Serangsari Kejajar Wonosobo',
                'quote' => 'Kita sangat terbantu dengan adanya Koperasi TAMZIS, sehingga usaha saya dapat berjalan kecil kecilan dan dapat merasakan kenikmatan atas terbantunya TAMZIS',
                'photo_url' => null,
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name'], 'quote' => $testimonial['quote']],
                $testimonial,
            );
        }
    }
}
