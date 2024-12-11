<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\Room;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Booking::query()->delete();
        Room::query()->delete();
        Location::query()->delete();

        $location = Location::factory()->create([
            'name' => 'Test Location',
            'slug' => 'test-location',
        ]);
        $room1 = Room::factory()->create([
            'location_id' => $location->id,
            'name' => 'Test Room 1',
            'slug' => Room::generateUniqueSlug('Test Room 1', $location->id),
        ]);
        $startFrom = now()->startOfDay();
        $endIn = $startFrom->copy()->addHour();
        for ($i = 0; $i < 20; $i++) {
            Booking::factory()->create([
                'room_id' => $room1->id,
                'start' => $startFrom,
                'end' => $endIn,
                'name' => 'Test Booking 1',
            ]);
            $startFrom = $startFrom->addHour();
            $endIn = $startFrom->copy()->addHour();
        }
    }
}
