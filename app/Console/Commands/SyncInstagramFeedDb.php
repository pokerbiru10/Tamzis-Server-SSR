<?php

namespace App\Console\Commands;

use App\Services\InstagramFeedDbService;
use Illuminate\Console\Command;

class SyncInstagramFeedDb extends Command
{
    protected $signature = 'instagram:sync-db {--limit=8 : Number of posts to sync}';
    protected $description = 'Sync Instagram feed to instagram_feed_db table';

    public function handle(InstagramFeedDbService $service): int
    {
        $this->info('Starting Instagram feed sync to instagram_feed_db...');

        try {
            $items = $service->syncToDatabase();
            
            $count = count($items);
            
            if ($count > 0) {
                $this->info("Successfully synced {$count} Instagram posts to instagram_feed_db table.");
                
                foreach ($items as $item) {
                    $this->line("- {$item['caption'] ? substr($item['caption'], 0, 60) . '...' : 'No caption'} ({$item['media_type']})");
                }
            } else {
                $this->warn('No Instagram posts found to sync.');
            }

            return self::SUCCESS;
        } catch (\Throwable $e) {
            $this->error('Failed to sync Instagram feed: ' . $e->getMessage());
            return self::FAILURE;
        }
    }
}