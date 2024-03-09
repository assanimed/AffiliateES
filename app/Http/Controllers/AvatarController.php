<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {

        if(!$user->avatar){
            $contents = Storage::get("avatar/default.png");

            return response($contents, 200)
                    ->header('Content-Type', 'image/png');
        }

        $contents = Storage::get("avatar/".$user->id.".jpg");

            return response($contents, 200)
                    ->header('Content-Type', 'image/png');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // return  "mrow";

        $request->validate([
            'avatar' => ['file', 'required']
        ]);

        $user = $request->user();


        $path = Storage::putFileAs('avatar', $request->avatar, $user->id.".jpg");

        $user->avatar()->create(["url" => "/users/".$user->id."/avatar"]);


        return response()->json(['message' => "Avatar has been added", "url" => "/users/".$user->id."/avatar"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Avatar $avatar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avatar $avatar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Avatar $avatar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avatar $avatar)
    {
        //
    }
}