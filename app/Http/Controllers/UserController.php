<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request, User $user){


        // dd($request->all());

        // $user = User::find();

        // UpDATE USER INFO
        try {
            $user->name = $request->name;
        $user->username = $request->username;
        $user->role = $request->role;



        // UPDATE AFFILIATE STATUS
        $user->affiliate->status = $request->status;
        $user->affiliate->coupon = $request->coupon;

        if($user->affiliate())
            $user->affiliate->save();


            /* dd($user->profile->phone_number);

        // UPDATE PROFILE INFO
        $user->profile->email = ;
        $user->profile()-> = ;
        $user->profile()-> = ;
        $user->profile()-> = ;
        $user->profile()-> = ; */

        Profile::updateOrCreate(['user_id' => $user->id], [
            'email' => $request->email,
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

        $newLinks = Link::updateOrCreate(['user_id' => $user->id],[
            'user_id' => $user->id,
            'instagram' => $request->has('links.instagram') ? $request->links['instagram'] : "",
            'tiktok' => $request->has('links.tiktok') ? $request->links['tiktok'] : "",
            'facebook' => $request->has('links.facebook') ? $request->links['facebook'] : "",
            'others' => $request->has('links.others') ? $request->links['others'] : ""
        ]);



        // $user->affiliate->links->save();


        $user->save();

        return redirect()->to("/users");
        } catch(Exception $err){
            dd($err);
            return redirect()->back()->with('error','Fail to Update User');
        }
    }
}
