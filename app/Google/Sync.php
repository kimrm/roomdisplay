<?php

namespace App\Google;

use Spatie\GoogleCalendar\Event;
use Carbon\Carbon;
use App\Models\Room;
use App\Models\Booking;

class Sync
{

    public static function handle()
    {
        self::googleSync();
    }

    public static function googleSync()
    {

        $dt1 =  Carbon::now()->add(-1, 'month');
        $dt2 =  Carbon::now()->add(1, 'month');


        $f_yr = $dt1->year;
        $f_md = $dt1->month;
        $f_dy = $dt1->day;

        $t_yr = $dt2->year;
        $t_md = $dt2->month;
        $t_dy = $dt2->day;

        $dt_start = Carbon::create($f_yr, $f_md, $f_dy, 0, 0, 1);
        $dt_end = Carbon::create($t_yr, $t_md, $t_dy, 23, 59, 59);

        $config = config('google-calendar');

        $events = [];

        $rooms = Room::all();
        foreach ($rooms as $room) {
            $id = $room->calendar_id;
            if (!$id) {
                continue;
            }
            $ext_events = self::getEvents($dt_start, $dt_end, $id);

            foreach ($ext_events as $event) {
                if ($booking = Booking::where('sync_identifier', $event['id'])->first()) {
                    $booking->room_id = $room->id;
                    $booking->name = $event['who'];
                    $booking->start = $event['fromDate'];
                    $booking->end = $event['toDate'];
                    $booking->sync_identifier = $event['id'];
                    $booking->save();
                } else {
                    $booking = new Booking([
                        'room_id' => $room->id,
                        'name' => $event['who'],
                        'start' => $event['fromDate'],
                        'end' => $event['toDate'],
                        'sync_identifier' => $event['id'],
                    ]);
                    $booking->save();
                }

                $events[] = $event;
            }
        }

        // go thru bookings in database and check if it should be deleted
        $db_bookings = Booking::whereBetween('start', [$dt_start, $dt_end])->get();
        foreach ($db_bookings as $booking) {
            $found = false;
            foreach ($events as $item) {
                if ($item['id'] == $booking->sync_identifier) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $booking->delete();
            }
        }

        return $events;
    }

    public static function getEvents(Carbon $start, Carbon $end, $calendarId)
    {

        $cal_events = [];

        $cal_events = Event::get($start, $end, [], $calendarId);

        $events_array = [];
        foreach ($cal_events as $event) {

            $timezone = new \DateTimeZone('GMT+1');
            $dt_start = new \DateTime($event->start->dateTime);
            $dt_end = new \DateTime($event->end->dateTime);

            $eventarr = array(
                'id' => $event->id,
                'room' => $event->organizer->displayName,
                'where' => $event->location,
                'who' => $event->summary,
                'from' => $dt_start->format('H:i'),
                'fromDate' => $dt_start,
                'to' => $dt_end->format('H:i'),
                'toDate' => $dt_end
            );

            $events_array[] = $eventarr;
        }

        return $events_array;
    }
}
