<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
        });

        Schema::create('instagram_feed_tag', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('instagram_feed_id')->constrained('instagram_feeds')->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained('tags')->cascadeOnDelete();
            $table->unique(['instagram_feed_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instagram_feed_tag');
        Schema::dropIfExists('tags');
    }
};
