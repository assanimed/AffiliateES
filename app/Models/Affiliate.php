<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\User;

class Affiliate extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status'];

    public function user(): belongsTo {
        return $this->BelongsTo(User::class);
    }
}
