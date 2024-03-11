<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request, User $user)
    {
        // $user = User::find();

        // UpDATE USER INFO
        try {
            $user->name = $request->name;
            $user->username = $request->username;
            $user->role = $request->role;
            $user->email = $request->email;



            // UPDATE AFFILIATE STATUS
            $user->affiliate->status = $request->status;
            $user->affiliate->coupon = $request->coupon;



            if ($user->affiliate())
                $user->affiliate->save();


            /* dd($user->profile->phone_number);

        // UPDATE PROFILE INFO
        $user->profile->email = ;
        $user->profile()-> = ;
        $user->profile()-> = ;
        $user->profile()-> = ;
        $user->profile()-> = ; */

            Profile::updateOrCreate(['user_id' => $user->id], [
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'country' => $request->country,
                'city' => $request->city,
            ]);





            // UPDATE LINKS

            $links = [];


            /* if($request->has('links.instagram')){
            // $user->links->instagram = $request->links['instagram'];
            $links[] = ['instagram' => $request->links['instagram']];
        }
        if(){
            // $user->links->facebook = $request->links['facebook'];
            $links[] = ['facebook' => $request->links['facebook']];
        }
        if($request->has('links.tiktok')){
            // $user->links->tiktok = $request->links['tiktok'];
            $links[] = ['tiktok' => $request->links['tiktok']];
        }
        if($request->has('links.others')){
            // $user->links->others = $request->links['others'];
            $links[] = ['others' => $request->links['others']];

        } */

            /* dd($request->links);

        $links[] = ['instagram' => $request->links['instagram']];
        $links[] = ['user_id' => $user->id]; */

            $newLinks = Link::updateOrCreate(['user_id' => $user->id], [
                'user_id' => $user->id,
                'instagram' => $request->has('links.instagram') ? $request->links['instagram'] : "",
                'tiktok' => $request->has('links.tiktok') ? $request->links['tiktok'] : "",
                'facebook' => $request->has('links.facebook') ? $request->links['facebook'] : "",
                'others' => $request->has('links.others') ? $request->links['others'] : ""
            ]);



            // $user->affiliate->links->save();


            $user->save();

            return redirect()->to("/users");
        } catch (Exception $err) {
            return redirect()->back()->with('error', 'Fail to Update User');
        }
    }


    public function updateUser(Request $request)
    {


        $user =  $request->user();



        $request->validate([
            'username' => ['string', 'max:255'],
            'name' => ['string', 'max:255'],
            'email' => ['string', 'max:255', 'email'],
            'address' => ['string', 'max:255'],
            'phone_number' => ['string', 'max:255'],
            'address' => ['string', 'max:255'],
            'country' => ['string', 'max:255'],
            'city' => ['string', 'max:255'],
            "links.others" => ['string', 'max:255'],
            "links.instagram" => ['string', 'max:255'],
            "links.tiktok" => ['string', 'max:255'],
            "links.tiktok" => ['string', 'max:255'],
            "links.facebook" => ['string', 'max:255']
        ]);

        // return $request->all();

        try {


            if ($request->has('name')) $user->name = $request->name;
            if ($request->has('username'))  $user->username = $request->username;
            if ($request->has('email'))  $user->email = $request->email;


            $profile = [];
            if ($request->has('phone_number')) $profile['phone_number'] = $request->phone_number;
            if ($request->has('address')) $profile['address'] = $request->address;
            if ($request->has('country')) $profile['country'] = $request->country;
            if ($request->has('city')) $profile['city'] = $request->city;



            Profile::updateOrCreate(['user_id' => $user->id], $profile);
            if ($user->hasRole('affiliate')) {
                $links = [];

                if ($request->has('links.instagram')) $links['instagram'] = $request->links['instagram'];
                if ($request->has('links.tiktok')) $links['tiktok'] = $request->links['tiktok'];
                if ($request->has('links.facebook')) $links['facebook'] = $request->links['facebook'];
                if ($request->has('links.others')) $links['others'] = $request->links['others'];



                $newLinks = Link::updateOrCreate(['user_id' => $user->id], $links);
            }

            $user->save();

            return response()->json([
                "success" => "Information Updated Successfull"
            ], 201);
        } catch (Exception $err) {
            dd($err);
            return response()->json([
                "error" => "Fail to Update User Information"
            ], 201);
        }
    }
}