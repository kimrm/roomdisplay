<?php

use App\Models\Location;

test('single location api endpoint returns 200', function () {

    $location = Location::factory()->create([
        'name' => 'Location test',
        'slug' => 'location-test',
    ]);

    $response = $this->get('/api/locations/' . $location->id);

    $response->assertStatus(200)->assertJson([
        'id' => $location->id,
        'slug' => 'location-test',
        'name' => 'Location test',
        'description' => $location->description,
        'displayMessage' => $location->display_message,
        'createdAt' => $location->created_at->toISOString(),
        'updatedAt' => $location->updated_at->toISOString(),
        'bookingsToDay' => [],
    ]);
});
