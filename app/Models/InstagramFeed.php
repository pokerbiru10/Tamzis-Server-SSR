<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstagramFeed extends Model
{
    protected $table = 'instagram_feeds';

    protected $fillable = [
        'instagram_id',
        'media_type',
        'caption',
        'excerpt',
        'media_url',
        'image_path',
        'permalink',
        'posted_at',
        'is_published',
    ];

    protected $casts = [
        'posted_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'instagram_feed_tag', 'instagram_feed_id', 'tag_id');
    }
}
