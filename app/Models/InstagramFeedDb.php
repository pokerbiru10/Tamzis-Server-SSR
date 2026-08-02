<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstagramFeedDb extends Model
{
    use HasFactory;

    protected $table = 'instagram_feed_db';

    protected $fillable = [
        'instagram_id',
        'caption',
        'excerpt',
        'media_type',
        'media_url',
        'image_path',
        'permalink',
        'likes_count',
        'comments_count',
        'is_published',
        'posted_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'posted_at' => 'datetime',
        'likes_count' => 'integer',
        'comments_count' => 'integer',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeLatest($query)
    {
        return $query->orderByDesc('posted_at');
    }

    public function getImageAttribute(): string
    {
        if ($this->image_path) {
            return $this->image_path;
        }

        $url = $this->media_url ?? '';

        if ($url !== '' && preg_match('#^https?://(?:www\.)?instagram\.com/(?:[A-Za-z0-9._]+/)?(p|reel|tv)/([A-Za-z0-9_-]+)#i', $url, $m)) {
            return "https://www.instagram.com/{$m[1]}/{$m[2]}/media/?size=l";
        }

        return $url;
    }
}