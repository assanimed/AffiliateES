<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialLink extends Model
{
    use HasFactory;

    protected $table = "social_links";

    protected $fillable = ['key', 'value', 'affiliate_id'];

    public function affiliate():BelongsTo {
        return $this->belongsTo(Affiliate::class);
    }

}