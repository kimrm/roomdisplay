<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Location extends Model
{
    use HasFactory;

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function bookingsToDay(): HasManyThrough
    {
        return $this->hasManyThrough(Booking::class, Room::class)
            ->where('start', '>=', now()->startOfDay()->toDateTimeString()) // UTC basert
            ->where('end', '<=', now()->endOfDay()->toDateTimeString())
            ->where('end', '>=', now()->toDateTimeString())
            ->orderBy('start');
    }

    public function activeBookings(): HasManyThrough
    {
        return $this->hasManyThrough(Booking::class, Room::class)
            ->where('end', '>=', now());
    }

    public function bookings(): HasManyThrough
    {
        return $this->hasManyThrough(Booking::class, Room::class);
    }
}
