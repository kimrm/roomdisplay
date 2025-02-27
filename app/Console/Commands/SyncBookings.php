<?php

namespace App\Console\Commands;

use App\Google\Sync;
use Illuminate\Console\Command;

class SyncBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-bookings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Sync::handle();
    }
}
