<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            [
                'name' => 'Area Wonosobo',
                'offices' => [
                    ['name' => 'Kantor Pusat', 'phone' => '628112613134', 'address' => 'Jl. Ahmad Yani No. 12, Wonosobo', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                    ['name' => 'Cabang Kertek', 'phone' => '628112613134', 'address' => 'Pasar Kertek, Wonosobo', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                    ['name' => 'Cabang Selomerto', 'phone' => '628112613134', 'address' => 'Jl. Raya Selomerto, Wonosobo', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                ],
            ],
            [
                'name' => 'Area Yogyakarta',
                'offices' => [
                    ['name' => 'Cabang Kota', 'phone' => '628112613134', 'address' => 'Jl. Kusumanegara, Yogyakarta', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                    ['name' => 'Cabang Sleman', 'phone' => '628112613134', 'address' => 'Jl. Magelang, Sleman', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                    ['name' => 'Cabang Bantul', 'phone' => '628112613134', 'address' => 'Jl. Bantul Km 5, Bantul', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                ],
            ],
            [
                'name' => 'Area Banyumas',
                'offices' => [
                    ['name' => 'Cabang Purwokerto', 'phone' => '628112613134', 'address' => 'Purwokerto', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                    ['name' => 'Cabang Ajibarang', 'phone' => '628112613134', 'address' => 'Ajibarang', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                    ['name' => 'Cabang Cilacap', 'phone' => '628112613134', 'address' => 'Jl. Gatot Subroto, Cilacap', 'maps' => 'https://maps.app.goo.gl/hGf2E6VvV6vV6vV6v'],
                ],
            ],
        ];

        foreach ($areas as $area) {
            foreach ($area['offices'] as $office) {
                Office::create([
                    'area' => $area['name'],
                    'name' => $office['name'],
                    'phone' => $office['phone'],
                    'address' => $office['address'],
                    'maps_link' => $office['maps'],
                ]);
            }
        }
    }
}
