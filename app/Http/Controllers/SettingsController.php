<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Settings::where('key', "logoText")
                            ->orWhere('key', "logoImage")
                            ->orWhere('key', "commission")->get();



        if(Auth()->user()->isAdmin()){
            return Inertia::render('Admin/Settings', ["settingsData" => $settings]);
        }
        return Inertia::render('Affiliate/Settings');



    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // dd($request->logoFile);
//
        // $this->validate($request, ['comission' => "numeric"]);

        $logoFile = $request->logoFile;
        $logoText = $request->logoText;
        $commission  = (int) $request->commission;


        $sett = [];

        if($logoFile)  {


                $extension = $logoFile->getClientOriginalExtension();


                $storePath =  'assets/images';
                $fileName = "affiliate_logo" . '.' . $extension;

                // $path = $file->storeAs($storePath, $fileName, 'public');

                $path = Storage::putFileAs($storePath, $logoFile, $fileName);

                $sett[] = ['key' => 'logoImage', "value" => $path];
        }

        if($logoText){
            $sett[] = ['key' => 'logoText', "value" => $logoText];
        }

        if($commission){
            $sett[] = ['key' => 'commission', "value" => $commission];
        }

        foreach($sett as $item){
            Settings::updateOrCreate(["key" => $item['key']],$item);
        }

        return response()->json(["success" => 'Settings Updated']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Settings $settings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Settings $settings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Settings $settings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Settings $settings)
    {
        //
    }
}
