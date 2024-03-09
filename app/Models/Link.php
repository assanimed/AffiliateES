<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Link extends Model
{
    use HasFactory;

    protected $fillable = ['instagram','tiktok' ,'facebook','others','user_id'];



    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}