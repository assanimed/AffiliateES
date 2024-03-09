<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = ['code','status','shipped_at', 'affiliate_id','user_id'];


    public function affiliate(): BelongsTo {
        return $this->BelongsTo(Affiliate::class);
    }
}
