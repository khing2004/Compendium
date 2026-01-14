<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\JournalController;
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
    // Dashboard 
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/task', [DashboardController::class, 'store'])->name('task.store');
    Route::put('/task/{id}', [DashboardController::class, 'update'])->name('task.update');
    Route::patch('/task/{id}/toggle', [DashboardController::class, 'toggleStatus'])->name('task.toggle');
    Route::delete('/task/{id}', [DashboardController::class, 'destroy'])->name('task.destroy');

    // Journal
    Route::get('/journal', [JournalController::class, 'index'])->name('journal.index');
    Route::post('/journal-entry', [JournalController::class, 'store'])->name('journal.store');
    Route::put('/journal-entry/{id}/', [JournalController::class, 'update'])->name('journal.update');
    Route::delete('journal-entry/{id}/', [JournalController::class, 'destroy'])->name('journal.destroy');
});

require __DIR__.'/settings.php';
