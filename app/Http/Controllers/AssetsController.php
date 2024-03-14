<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Str;


class AssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

        $request->validate([
            'file' => 'required|mimes:jpg,webp,jpeg,png,mp4,avi,mkv|max:10240' // 10MB limit
        ]);

        $file = $request->file('file');

        if ($file->isValid()) {


            $extension = $file->getClientOriginalExtension();
            $type = in_array($extension, ['mp4', 'avi', 'mkv']) ? 'video' : 'image';


            $storePath = ($type === 'video') ? 'assets/videos' : 'assets/images';
            $code = Str::random(30);
            $fileName = $code . '.' . $extension;

            // $path = $file->storeAs($storePath, $fileName, 'public');

            $path = Storage::putFileAs($storePath, $request->file, $fileName);

            // STORE IN DB

            // return [
            //     "type" => $type,
            //     "code" => $code,
            //     "path" => $storePath,
            //     "extension" =>  $extension,
            // ];

            $asset =  Assets::create([
                "type" => $type,
                "code" => $code,
                "path" => $path,
                "extension" =>  $extension,
            ]);

            return response()->json(["asset" => $asset, 'path' => $path]);
        } else {
            return response()->json(['error' => 'Archivo inválido'], 422);
        }
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assets $assets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Assets $assets)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assets $asset)
    {
        $cp = $asset;

        $filePath = $asset->path;
        if (!Storage::exists($filePath)) {
            return response()->json(["error" => "Archivo no encontrado"], 404);
        }

        if (Storage::delete($filePath)) {
            $asset->delete();
            return response()->json(["success" => "Eliminar archivo", 'asset' => $asset], 200);
        } else {
            return response()->json(["error" => "Archivo no encontrado", "asset" => $cp], 400);
        }
    }
}