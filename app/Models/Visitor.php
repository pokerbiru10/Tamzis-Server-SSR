<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = [
        'device_id',
        'ip_address',
        'user_agent',
        'page_url',
        'visited_at',
        'visit_date',
    ];

    public $timestamps = false;
}
