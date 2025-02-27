<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'start',
        'end',
        'name',
        'sync_identifier',
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function scopeSearch($query, $search)
    {
        if (empty($search)) {
            return $query;
        }

        return $query->where('name', 'like', "%$search%");
    }

    public function scopePeriode($query, $start, $end = null)
    {
        if (is_null($end)) {
            switch ($start) {
                case 'today':
                    $start = Carbon::today();
                    $end = Carbon::tomorrow();
                    break;
                case 'tomorrow':
                    $start = Carbon::tomorrow();
                    $end = Carbon::tomorrow()->addDay();
                    break;
                case 'week':
                    $start = Carbon::now()->startOfWeek();
                    $end = Carbon::now()->endOfWeek();
                    break;
                case 'month':
                    $start = Carbon::now()->startOfMonth();
                    $end = Carbon::now()->endOfMonth();
                    break;
                default:
                    throw new \InvalidArgumentException('Start date is not valid');
            }
        }

        return $query->where('start', '>=', $start)
            ->where('end', '<=', $end);
    }
}
