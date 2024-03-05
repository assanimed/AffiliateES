<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payout extends Model
{
    use HasFactory;


    protected $fillable = ['code','amount','status','user_id'];


    public function user(): BelongsTo {
        return $this->BelongsTo(User::class);
    }
}