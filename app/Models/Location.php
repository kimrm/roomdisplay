<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Str;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'display_message',
        'slug'
    ];

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

    public static function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (self::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }
}
