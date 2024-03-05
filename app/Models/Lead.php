<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = ['code','status','shipped_at','user_id'];


    public function user(): BelongsTo {
        return $this->BelongsTo(User::class);
    }
}