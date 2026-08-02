<?php

namespace App\Models;

use Database\Factories\SimulasiSimpananFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimulasiSimpanan extends Model
{
    /** @use HasFactory<SimulasiSimpananFactory> */
    use HasFactory;

    protected $fillable = ['nama_lengkap', 'email', 'no_hp', 'jenis_simulasi', 'plafond'];
}
