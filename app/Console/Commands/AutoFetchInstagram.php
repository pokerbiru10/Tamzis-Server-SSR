<?php

namespace App\Console\Commands;

use App\Services\InstagramFeedDbService;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Throwable;

#[Signature('app:auto-fetch-instagram')]
#[Description('Fetch and warm Instagram feed cache')]
class AutoFetchInstagram extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(InstagramFeedDbService $service): int
    {
        try {
            $feed = $service->syncToDatabase();

            $this->info('Instagram feed synced: '.count($feed).' items');

            return self::SUCCESS;
        } catch (Throwable $e) {
            $this->error('Instagram feed sync failed: '.$e->getMessage());

            return self::FAILURE;
        }
    }
}
