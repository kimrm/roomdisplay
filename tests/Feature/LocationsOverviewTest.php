<?php

use App\Models\Location;

test('single location api endpoint returns 200', function () {

    $location = Location::factory()->create([
        'name' => 'Location test',
        'slug' => 'location-test',
    ]);

    $response = $this->get('/api/locations/' . $location->id);

    $response->assertStatus(200);
});
