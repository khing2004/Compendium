<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Journal;

class JournalController extends Controller
{
    public function index()
    {
        $entries = Journal::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('journal', [
            'entries' => $entries
        ]);
    }
}
