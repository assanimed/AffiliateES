<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;



class AffiliateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = database_path('/seeders/affiliate.json');

        $file = File::get($path);
        $users = json_decode($file);

        foreach ($users as $usr) {
            $usr = (array) $usr;

            $usr['password'] = Hash::make($usr['password']);
            $createUser = User::create([
                "name" =>  $usr['name'],
                "username" =>  $usr['username'],
                "password" =>$usr['password'] ,
                "role" => $usr['role'],
            ]);
            if ($usr['role'] == 'affiliate') {
                $createUser->profile()->create((array) $usr['profile']);
                $createUser->affiliate()->create(["status" => "pending"]);
            }
        }
    }
}
