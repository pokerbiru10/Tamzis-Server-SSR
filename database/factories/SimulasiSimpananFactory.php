<?php

namespace Database\Factories;

use App\Models\SimulasiSimpanan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SimulasiSimpanan>
 */
class SimulasiSimpananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_lengkap' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'no_hp' => fake()->phoneNumber(),
        ];
    }
}
