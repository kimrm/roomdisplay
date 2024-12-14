<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/bookings', 'App\Http\Controllers\Api\BookingController@store');

Route::get('/locations/{id}', 'App\Http\Controllers\Api\LocationDayOverviewController@show');
