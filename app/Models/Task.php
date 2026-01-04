<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $table = 'tasks';
    protected $fillable = ['user_id', 'title', 'category_id', 'priority', 'status', 'due_date' ];

    public function category(): BelongsTo // What happens if BelongsTo is not here
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
