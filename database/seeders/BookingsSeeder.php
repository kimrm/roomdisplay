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
        $location = Location::factory()->create([
            'name' => 'Test Location',
            'slug' => 'test-location',
        ]);
        $room1 = Room::factory()->create([
            'location_id' => $location->id,
            'name' => 'Test Room 1',
            'slug' => 'test-room-1',
        ]);
        $room2 = Room::factory()->create([
            'location_id' => $location->id,
            'name' => 'Test Room 2',
            'slug' => 'test-room-2',
        ]);
        $room3 = Room::factory()->create([
            'location_id' => $location->id,
            'name' => 'Test Room 3',
            'slug' => 'test-room-3',
        ]);
        $startFrom = now();
        Booking::factory()->create([
            'room_id' => $room1->id,
            'start' => $startFrom,
            'end' => $startFrom->addHour(),
            'name' => 'Test Booking 1',
        ]);
        $startFrom = $startFrom->addHour();
        Booking::factory()->create([
            'room_id' => $room2->id,
            'start' => $startFrom,
            'end' => $startFrom->addHour(),
            'name' => 'Test Booking 2',
        ]);
        $startFrom = $startFrom->addHour();
        Booking::factory()->create([
            'room_id' => $room3->id,
            'start' => $startFrom,
            'end' => $startFrom->addHour(),
            'name' => 'Test Booking 3',
        ]);
    }
}
