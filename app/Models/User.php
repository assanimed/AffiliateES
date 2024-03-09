<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Affiliate;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $with = ['avatar', 'token'];

    public function isAffiliate(){
        return $this->role == "affiliate";
    }

    public function isAdmin(){
        return $this->role == "admin";
    }


    public function affiliate(): hasOne{
        return $this->hasOne(Affiliate::class);
       }

    public function profile(): hasOne{
        return $this->hasOne(Profile::class);
       }

       public function token(): hasOne{
        return $this->hasOne(ApiToken::class);
       }

       public function avatar(): hasOne{
        return $this->hasOne(Avatar::class);
       }


       public function links(): HasOne{
        return $this->HasOne(Link::class);
       }






       public function payouts(): HasMany{
        return $this->hasMany(Payout::class);
       }

       public function hasRole(string $role){
        return $this->role === $role;
       }

       public function  getTotalLeads(){
        return $this->leads()->count();
       }
}
