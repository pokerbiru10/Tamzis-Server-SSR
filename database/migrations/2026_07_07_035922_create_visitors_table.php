<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visitors', function (Blueprint $table): void {
            $table->id();
            $table->string('device_id', 36)->nullable();
            $table->string('ip_address', 45);
            $table->string('user_agent')->nullable();
            $table->string('page_url')->nullable();
            $table->timestamp('visited_at')->useCurrent();
            $table->date('visit_date');

            $table->index('device_id');
            $table->index('ip_address');
            $table->index('visit_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visitors');
    }
};
