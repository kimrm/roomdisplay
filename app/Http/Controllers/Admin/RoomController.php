<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Rooms/Index', [
            'rooms' => Room::with('location')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Rooms/Create', [
            'locations' => Location::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'location_id' => 'required|exists:locations,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'display_message' => 'nullable|string',
            'calendar_id' => 'nullable|string',
            'sync' => 'nullable|string'
        ]);

        Room::create([
            'location_id' => $request->location_id,
            'name' => $request->name,
            'slug' => Room::generateUniqueSlug($request->name, $request->location_id),
            'description' => $request->description,
            'display_message' => $request->display_message,
            'calendar_id' => $request->calendar_id,
            'service' => $request->sync
        ]);

        return redirect()->route('rooms.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        return inertia('Admin/Rooms/Edit', [
            'room' => $room,
            'locations' => Location::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
