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
            'entries' => Journal::where('user_id', Auth::id())
            ->latest()
            ->paginate(7)
            ->map(function ($entry) {
                return [
                    'id'=>$entry->id,
                    'learning_journal'=>$entry->learning_journal,
                    'heart_journal'=>$entry->heart_journal,
                    'questions'=>$entry->questions,
                    'quotes'=>$entry->quotes,
                    'display_date' => date('M d , Y - D', strtotime($entry->created_at))
                ];
            })
        ]);
    }
}
