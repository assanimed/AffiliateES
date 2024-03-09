<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assets extends Model
{
    use HasFactory;

    protected $fillable = ["type","path","code", "extension"];

    public function offers()
    {
        return $this->belongsToMany(Offer::class);
    }
}
