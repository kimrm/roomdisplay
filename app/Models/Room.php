<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'slug',
        'description',
        'display_message',
        'calendar_id',
        'service',
    ];

    public static function generateUniqueSlug($name, $locationId)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (self::where('slug', $slug)->where('location_id', $locationId)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function bookingsToDay()
    {
        return $this->bookings()
            ->where('start', '>=', now()->startOfDay()->toDateTimeString()) // UTC basert
            ->where('end', '<=', now()->endOfDay()->toDateTimeString())
            ->where('end', '>=', now()->toDateTimeString())
            ->orderBy('start');
    }
}
