<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', 'App\Http\Controllers\Api\BookingController@store');
});

Route::get('/locations/{id}', 'App\Http\Controllers\Api\LocationDayOverviewController@show');
