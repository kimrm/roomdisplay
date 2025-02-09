<?php

use App\Http\Controllers\View\LocationController;
use App\Http\Controllers\View\RoomController;
use Illuminate\Support\Facades\Route;

Route::get('/{location:slug}', [LocationController::class, 'show'])->name('locations.show');
Route::get('/{location:slug}/{room:slug}', [RoomController::class, 'show'])->name('room.show');
