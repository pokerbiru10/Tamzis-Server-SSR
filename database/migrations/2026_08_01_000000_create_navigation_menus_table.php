<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('navigation_menus', function (Blueprint $table) {
            $table->id();
            $table->enum('location', ['top_header_left', 'top_header_right', 'main_navbar']);
            $table->foreignId('parent_id')->nullable()->constrained('navigation_menus')->onDelete('cascade');
            $table->enum('type', ['link', 'dropdown', 'mega'])->default('link');
            $table->string('icon_type', 50)->nullable();
            $table->string('label');
            $table->string('label_en')->nullable();
            $table->string('url');
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['location', 'parent_id', 'order']);
        });

        // Seed default navigation menus
        $now = Carbon::now();
        $navigationMenus = [
            [
                'id' => 3,
                'location' => 'top_header_left',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'phone',
                'label' => 'Call Center Tamzis',
                'label_en' => 'Tamzis Call Center',
                'url' => 'tel:+62286325303',
                'is_active' => true,
                'order' => 0,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 4,
                'location' => 'top_header_left',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'whatsapp',
                'label' => 'WhatsApp',
                'label_en' => 'WhatsApp',
                'url' => 'https://wa.me/628112613134',
                'is_active' => true,
                'order' => 1,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 5,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => null,
                'label' => 'Tentang Kami',
                'label_en' => 'About Us',
                'url' => '/company-profile',
                'is_active' => true,
                'order' => 1,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 6,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => null,
                'label' => 'Layanan',
                'label_en' => 'Services',
                'url' => '/simulasi-gtb',
                'is_active' => true,
                'order' => 2,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 7,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'instagram',
                'label' => 'Instagram',
                'label_en' => 'Instagram',
                'url' => 'https://www.instagram.com/tamzis_id/',
                'is_active' => true,
                'order' => 3,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 8,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'facebook',
                'label' => 'Facebook',
                'label_en' => 'Facebook',
                'url' => 'https://www.facebook.com/TamzisBinaUtama/',
                'is_active' => true,
                'order' => 4,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 9,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => 'youtube',
                'label' => 'YouTube',
                'label_en' => 'YouTube',
                'url' => 'https://www.youtube.com/@tamzisbinautama',
                'is_active' => true,
                'order' => 5,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 10,
                'location' => 'top_header_right',
                'parent_id' => null,
                'type' => 'link',
                'icon_type' => null,
                'label' => 'Info Karir',
                'label_en' => 'Career Info',
                'url' => '/info-karir',
                'is_active' => true,
                'order' => 6,
                'metadata' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('navigation_menus')->insert($navigationMenus);
    }

    public function down(): void
    {
        Schema::dropIfExists('navigation_menus');
    }
};