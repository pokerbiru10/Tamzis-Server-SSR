<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';

    protected $fillable = [
        'name',
        'slug',
    ];

    public $timestamps = false;

    public function instagramFeeds()
    {
        return $this->belongsToMany(InstagramFeed::class, 'instagram_feed_tag', 'tag_id', 'instagram_feed_id');
    }
}
