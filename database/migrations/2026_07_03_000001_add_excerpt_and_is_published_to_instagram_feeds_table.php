<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('instagram_feeds', function (Blueprint $table): void {
            $table->text('excerpt')->nullable()->after('caption');
            $table->boolean('is_published')->default(true)->after('posted_at');
        });
    }

    public function down(): void
    {
        Schema::table('instagram_feeds', function (Blueprint $table): void {
            $table->dropColumn(['excerpt', 'is_published']);
        });
    }
};
