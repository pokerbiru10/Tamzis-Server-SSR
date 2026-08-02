<?php

namespace Database\Seeders;

use App\Models\SimulasiSimpanan;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin TAMZIS',
                'password' => bcrypt('admin123'),
            ]
        );

        SimulasiSimpanan::factory(10)->create();

        $this->call(HeroBannerSeeder::class);
        $this->call(NavigationMenuSeeder::class);
        $this->call(SocialMediaAccountSeeder::class);
        $this->call(TestimonialSeeder::class);
        $this->call(MemberTestimonialsSeeder::class);
        $this->call(LayananDigitalSectionSeeder::class);
        $this->call(InfoKarirSectionSeeder::class);
        $this->call(BeritaSeeder::class);
    }
}
