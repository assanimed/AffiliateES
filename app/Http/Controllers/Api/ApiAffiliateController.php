<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

class ApiAffiliateController extends Controller
{
    public function getAll(Request $req){


        $status = null;
    $limit = (int) $req->get('limit') ? (int) $req->get('limit') : 5;
    $page = $req->get('page') ? (int) $req->get('page') : 1;
    $search = null;
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


       // return User::where('role', 'affiliate')->paginate($limit, $page);
    }
}