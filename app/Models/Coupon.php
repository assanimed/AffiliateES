<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['coupon', 'user_id'];

    public function affiliate(): BelongsTo {
        return $this->BelongsTo(Affiliate::class);
    }
}