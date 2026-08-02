<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('app:auto-fetch-instagram')
    ->hourly()
    ->withoutOverlapping()
    ->onOneServer();

// Regenerate public/instagram.json (dipakai section Tamzis Highlight di beranda) setiap 1 jam
Schedule::command('instagram:fetch-json --limit=12')
    ->hourly()
    ->withoutOverlapping()
    ->onOneServer();
