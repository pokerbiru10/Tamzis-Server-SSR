<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instagram_feed_db', function (Blueprint $table) {
            $table->id();
            $table->string('instagram_id')->unique()->nullable();
            $table->text('caption')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('media_type')->default('IMAGE');
            $table->text('media_url')->nullable();
            $table->string('image_path')->nullable();
            $table->text('permalink')->nullable();
            $table->integer('likes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();
            
            $table->index(['is_published', 'posted_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instagram_feed_db');
    }
};