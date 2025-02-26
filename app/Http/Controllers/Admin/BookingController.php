<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Resources\BookingResource;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search  = request()->get('search');
        $periode = $search ? 'all' : request()->get('periode') ?? 'today';


        if ($periode == 'all' || $periode == null) {
            $bookings = Booking::with('room')
                ->with('room.location')
                ->with('customer')
                ->orderBy('created_at', 'desc');
        } else {
            $bookings = Booking::with('room')
                ->with('room.location')
                ->with('customer')
                ->periode($periode)
                ->orderBy('start', 'asc');
        }

        $bookings = $bookings
            ->search($search)
            ->paginate();

        return inertia('Admin/Bookings/Index', [
            'bookingsPaginate' => BookingResource::collection($bookings),
            'periode' => $periode,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Bookings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
