<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarMenu extends Model
{
    protected $fillable = [
        'group_key',
        'name',
        'title',
        'items',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'items' => 'array',
        ];
    }
}
