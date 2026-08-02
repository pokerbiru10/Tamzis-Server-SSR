<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('simulasi_simpanans', function (Blueprint $table) {
            $table->unsignedBigInteger('plafond')->nullable()->after('jenis_simulasi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('simulasi_simpanans', function (Blueprint $table) {
            $table->dropColumn('plafond');
        });
    }
};
