<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\View\LocationController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\View\RoomController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

route::get('/phpinfo', function () {
    return now()->toDateTimeString();
});

Route::prefix('/locations')->group(function () {
    Route::get('/{location:slug}', [LocationController::class, 'show'])->name('locations.show');
    Route::get('/{location:slug}/room/{room:slug}', [RoomController::class, 'show'])->name('room.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('bookings', BookingController::class)->only(['index', 'store', 'destroy']);
});

require __DIR__ . '/dashboard.php';
require __DIR__ . '/auth.php';
