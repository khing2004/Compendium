<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ProductivityLogChart;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// This controller is responsible for getting the necessary data for the Dashboard page.
class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            // Mapping the data matching exactly what the frontend expects
            'initialTasks' => Task::with('category')
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($task) {
                return [
                    'id'=> $task->id,
                    'title' => $task->title,
                    'category' => $task->category->name,
                    'priority' => $task->priority,
                    'status' => $task->status,
                    'dueDate' => $task->due_date
                ];
            }),
            'chartData' => ProductivityLogChart::where('user_id', Auth::id())
            ->latest('date')
            ->take(7)
            ->get()
            ->map(fn($log) => [
                'name' => date('D', strtotime($log->date)), // Converts '2023-10-25' to 'Mon'

            ])
            ->reverse()
            ->values()
        ]);
    }

    public function store(Request $request)
    {
        // Validate only data incoming from the form
        $validated = $request->validate([
            'title' => 'required|string|max:50',
            'category' => 'required|string',
            'priority' => 'required|string',
            'dueDate' => 'required|date',
        ]);

        //Look up the Category ID (since Frontend sends "Academic", Health, etc.)
        $category = Category::where('name', $request->category)->firstOrFail();

        // Create Task securely
        Task::create([
            'user_id' => Auth::id(), // Assign id here securely from the session
            'category_id' => $category->id,
            'title' => $validated['title'],
            'priority' => $validated['priority'],
            'status' => 'Todo',
            'due_date' => $validated['dueDate'],
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'priority' => 'required|string',
            'dueDate' => 'required|date',
        ]);

        $category = Category::where('name', $request->category)->firstOrFail();

        $task->update([
            'category_id' => $category->id,
            'title' => $validated['title'],
            'priority' => $validated['priority'],
            'due_date' => $validated['dueDate'],
        ]);

        return redirect()->back();
    }

    public function toggleStatus($id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->update([
            'status' => $task->status === 'Done' ? 'Todo' : 'Done'
        ]);

        // Productivity Logic heree


        return redirect()->back();
    }


    public function destroy($id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id)->delete();
        return redirect()->back();
    }
}
