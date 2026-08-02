<?php

use App\Http\Controllers\Settings\BeritaSourceController;
use App\Http\Controllers\Settings\CareerLinkController;
use App\Http\Controllers\Settings\LayananLinkController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\Settings\TentangLinkController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');

    Route::get('settings/career-link', [CareerLinkController::class, 'edit'])->name('career-link.edit');
    Route::patch('settings/career-link', [CareerLinkController::class, 'update'])->name('career-link.update');

    Route::get('settings/layanan-link', [LayananLinkController::class, 'edit'])->name('layanan-link.edit');
    Route::patch('settings/layanan-link', [LayananLinkController::class, 'update'])->name('layanan-link.update');

    Route::get('settings/tentang-link', [TentangLinkController::class, 'edit'])->name('tentang-link.edit');
    Route::patch('settings/tentang-link', [TentangLinkController::class, 'update'])->name('tentang-link.update');

    Route::get('settings/berita-source', [BeritaSourceController::class, 'edit'])->name('berita-source.edit');
    Route::patch('settings/berita-source', [BeritaSourceController::class, 'update'])->name('berita-source.update');
});
