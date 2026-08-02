<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instagram_feeds', function (Blueprint $table): void {
            $table->id();
            $table->string('instagram_id')->unique();
            $table->text('caption')->nullable();
            $table->text('media_url')->nullable();
            $table->text('permalink')->nullable();
            $table->timestamp('posted_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instagram_feeds');
    }
};
