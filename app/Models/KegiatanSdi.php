<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KegiatanSdi extends Model
{
    use HasFactory;

    protected $table = 'kegiatan_sdi';

    protected $fillable = [
        'title',
        'content',
        'image_path',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
