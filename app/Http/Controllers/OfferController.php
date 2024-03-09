<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use ZipArchive;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
            if(!Auth()->user()->isAdmin()){
                return Inertia::render('Affiliate/Offers');
            }
            return Inertia::render('Admin/Offers');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Admin/NewOffer');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            "title" => "required|string",
            "description" => "required|string",
            "assets" => 'required|array',
        ]);


        try {
            $offer = Offer::create([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            foreach($request->assets as $asset){
                $offer->assets()->attach($asset['id']);
            }

            $offer->save();

            return redirect()->route('offers');
        } catch (\Exception $e){
            return dd($e);
        }
        // return "good"
    }

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offer $offer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        //
    }

    public function getAll(Request $req){


        $search = null;
        $limit = (int) $req->get('limit') ? (int) $req->get('limit') : 20;
        $page = $req->get('page') ? (int) $req->get('page') : 1;

        // return Offer::first();

        $query = Offer::with('assets');

        if ($req->has('search')) {
            $search = $req->get('search');
        }

        if ($search !== null) {
            $query->where(function ($searchQuery) use ($search) {
                $searchQuery->where('title', 'like', '%' . $search . '%')
                            ->orWhere('description', 'like', '%' . $search . '%');
            });
        }


        return $query ->orderBy('created_at', "desc")->paginate($limit, ['*'], 'page', $page);

       /* $status = null;



    $sortBy = $req->get('sortBy') ?  $req->get('sortBy') : 'created_at';
    $sortType = 'desc';

    if ($req->has('status')) {
        $status = $req->get('status');
        if($status == "all" || $status === "All" ) $status = null;
    }
    if ($req->has('search')) {
        $search = $req->get('search');
    }
    if ($req->has('sortBy')) {
        $sortBy = $req->get('sortBy');
    }
    if ($req->has('sortType') && in_array($req->get('sortType'), ['asc', 'desc'])) {
        $sortType = $req->get('sortType');
    }else {
        $sortType = "asc";
    }


    $query = User::where('role', 'affiliate')
                 ->with(['affiliate', 'profile']);



    if ($status !== null) {
        $query->whereHas('affiliate', function ($affiliateQuery) use ($status) {
            $affiliateQuery->where('status', $status);
        });
    }

     if ($search !== null) {
        $query->where(function ($searchQuery) use ($search) {
            $searchQuery->where('name', 'like', '%' . $search . '%')
                        ->orWhere('username', 'like', '%' . $search . '%')
                        ->orWhereHas('profile', function ($profileQuery) use ($search) {
                            $profileQuery->where('email', 'like', '%' . $search . '%');
                        });
        });
    }


    if (in_array($sortBy, ['name', 'created_at', 'status', 'earning'])) {
        if ($sortBy === 'earning' || $sortBy === 'status')  {
            $query->orderBy(function ($joinQuery) use($sortBy) {
               $joinQuery->select($sortBy)
                         ->from('affiliates')
                         ->whereColumn('affiliates.user_id', 'users.id')
                         ->limit(1);
            }, $sortType);
        }

        else {
            $query->orderBy($sortBy, $sortType);
        }
    }

    return $query->paginate($limit, ['*'], 'page', $page);
        return "meown";*/
    }


    public function zip(Offer $offer)
    {
        //dd($offer->assets);



        $str = implode('-', array_slice(explode(' ', $offer->title),0, 4));



        $zip = new ZipArchive();
        $zipFileName = $str.'.zip';

        $directory =public_path('zippedOffers');

        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }



        $zipFilePath = public_path('zippedOffers/' . $zipFileName);
        //dd($zipFileName);




        $files = [];
        foreach($offer -> assets as $asset){
            $files[] = $asset->path;
        }
        if ($zip->open($zipFilePath, ZipArchive::CREATE) === TRUE) {
            // Add files to the zip (change paths accordingly)

            foreach ($files as $file) {
                $zip->addFile($file, basename($file));
            }

            $zip->close();
        }


        return response()->download(public_path($zipFileName));
    }

}