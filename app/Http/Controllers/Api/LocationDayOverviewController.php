<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocationResource;
use App\Models\Location;

class LocationDayOverviewController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $location = Location::find($id);

        if (! $location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->load('bookingsToDay.room');

        return response()->json(new LocationResource($location));
    }
}
