<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\CustomerController;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('locations', LocationController::class);
        Route::resource('customers', CustomerController::class);

        Route::prefix('/rooms')->group(function () {
            Route::get('/', [RoomController::class, 'index'])->name('rooms.index');
            Route::get('/create', [RoomController::class, 'create'])->name('rooms.create');
            Route::post('/', [RoomController::class, 'store'])->name('rooms.store');
            Route::get('/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
            Route::patch('/{room}', [RoomController::class, 'update'])->name('rooms.update');
            Route::delete('/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');
        });

        Route::prefix('/bookings')->group(function () {
            Route::get('/', [BookingController::class, 'index'])->name('bookings.index');
            Route::get('/create', [BookingController::class, 'create'])->name('bookings.create');
            Route::post('/', [BookingController::class, 'store'])->name('bookings.store');
            Route::get('/{booking}/edit', [BookingController::class, 'edit'])->name('bookings.edit');
            Route::patch('/{booking}', [BookingController::class, 'update'])->name('bookings.update');
            Route::delete('/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');
        });
    });
});
