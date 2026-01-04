<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Models\Progress;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/Dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/task', [DashboardController::class, 'store'])->name('task.store');
    Route::put('/task/{id}', [DashboardController::class, 'update'])->name('task.update');
    Route::patch('/task/{id}/toggle', [DashboardController::class, 'toggleStatus'])->name('task.toggle');
    Route::delete('/task/{id}', [DashboardController::class, 'destroy'])->name('task.destroy');
});

require __DIR__.'/settings.php';
