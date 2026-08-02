<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('visitors', 'device_id')) {
            return;
        }

        Schema::table('visitors', function (Blueprint $table): void {
            $table->string('device_id', 36)->nullable()->after('id');
            $table->index('device_id');
        });
    }

    public function down(): void
    {
        Schema::table('visitors', function (Blueprint $table): void {
            $table->dropIndex(['device_id']);
            $table->dropColumn('device_id');
        });
    }
};
