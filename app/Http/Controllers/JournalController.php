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

    public function store(Request $request)
    {
        // Validate data coming from the form
        $validated = $request->validate([
            'learning_journal' => 'string',
            'heart_journal' => 'string',
            'questions' => 'string',
            'quotes' => 'string',
        ]);

        //Create
        Journal::create([
            'user_id' => Auth::id(), // Assigning id securely for this seesion
            'learning_journal' => $validated['learning_journal'],
            'heart_journal' => $validated['heart_journal'],
            'questions' => $validated['questions'],
            'quotes' => $validated['quotes']
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $entry = Journal::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'learning_journal' => 'string',
            'heart_journal' => 'string',
            'questions' => 'string',
            'quotes' => 'string',
        ]);

        $entry->update([
            'learning_journal' => $validated['learning_journal'],
            'heart_journal' => $validated['heart_journal'],
            'questions' => $validated['questions'],
            'quotes' => $validated['quotes']
        ]);

        return redirect()->back();
        
    }

    public function destroy($id)
    {
        $entry = Journal::where('user_id', Auth::id())->findOrFail($id)->delete();
        
        return redirect()->back();
    }
}
