<?php

namespace App\Http\Controllers;

use App\Models\Affiliate;
use App\Models\Lead;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth()->user()->isAdmin()) {
            return Inertia::render('Admin/Leads');
        }
        return Inertia::render('Affiliate/Leads', [
            'affiliate' => Auth()->user()->affiliate
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/NewLead');
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        return Inertia::render('Admin/UpdateLead', ["lead" => $lead]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lead $lead)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        //
    }

    public function getAll(Request $request)
    {

        $limit = (int) $request->get('limit') ? (int) $request->get('limit') : 2;
        $page = $request->get('page') ? (int) $request->get('page') : 1;
        $search = null;

        if ($request->user()->isAdmin()) {


            if ($request->has('search')) {
                $search = $request->get('search');
            }

            $query = Lead::with(['affiliate.user']);

            if ($search !== null) {
                $query->where(function ($searchQuery) use ($search) {
                    $searchQuery->whereHas('affiliate', function ($profileQuery) use ($search) {
                        $profileQuery->where('coupon', 'like', '%' . $search . '%');
                    })

                        ->orWhereHas('affiliate.user', function ($profileQuery) use ($search) {
                            $profileQuery->where('username', 'like', '%' . $search . '%');
                        });;
                });
            }
            //
            ///
            return $query->orderBy('created_at', "desc")->paginate($limit, ['*'], 'page', $page);;
        }
        $affiliate = $request->user()->affiliate;
        $leads = Lead::where('affiliate_id', $affiliate->id)->orderBy('created_at')->paginate($limit, ['*'], 'page', $page);
        return $leads;
    }

    public function getLead(Request $request, Lead $lead)
    {
        return response()->json([
            'lead' => $lead
        ], 200);;
    }

    public function addLead(Request $request)
    {


        $username  = $request->username;
        $coupon = $request->coupon;

        $commission = Settings::where('key', 'commission')->first();

        if (!$commission) {
            return response()->json([
                'error' => 'Por favor, establece la comisión en la configuración global del sitio'
            ], 403);
        } else {
            $commission = (float) $commission['value'];
        }



        if (!$coupon && !$username) {
            return response()->json([
                'error' => 'Se necesita el nombre de usuario o cupón para identificar al usuario'
            ], 403);
        }

        if (!$request->status || !in_array($request->status, ['shipped', 'pending'])) {
            return response()->json([
                'error' => 'El estado del cliente potencial no es válido'
            ], 403);
        }


        $user = null;


        if ($username) {
            $user = User::where('username', $username)->first();
        }

        if (!$user) {
            $affiliate = Affiliate::where('coupon', $coupon)->first();

            if ($affiliate) {
                $user = $affiliate->user;
            }
        }

        if (!$user) {
            return response()->json([
                'error' => 'No se encontró ningún usuario'
            ], 403);
        }


        $lead = Lead::create([
            'status' => $request->status,
            'affiliate_id' => $user->affiliate->id,
            'code' => Str::random(15)
        ]);

        if ($lead->status == "shipped") {
            $user->affiliate->earning = (int) $user->affiliate->earning + (int) $commission;
            $user->affiliate->balance = (int) $user->affiliate->balance + (int) $commission;
            $user->affiliate->save();
        }

        return response()->json([
            'success' => "Cliente potencial creado con éxito",
            'lead' => $lead
        ], 201);
    }

    public function updateLead(Request $request, Lead $lead)
    {



        $prevStatus = $lead->status;

        $commission = Settings::where('key', 'commission')->first();

        if (!$commission) {
            return response()->json([
                'error' => 'Por favor, establece la comisión en la configuración global del sitio'
            ], 403);
        } else {
            $commission = (float) $commission['value'];
        }
        if (!$request->status || !in_array($request->status, ['shipped', 'pending'])) {
            return response()->json([
                'error' => 'El estado del cliente potencial no es válido'
            ], 403);
        }




        $lead->update([
            'status' => $request->status,
        ]);

        $lead->save();

        $affiliate = $lead->affiliate;

        if ($lead->status == "shipped" && $prevStatus === "pending") {
            $affiliate->earning = (int) $affiliate->earning + (int) $commission;
            $affiliate->balance = (int) $affiliate->balance + (int) $commission;
            $affiliate->save();
        }

        return response()->json([
            'success' => "Cliente potencial actualizado con éxito",
            'lead' => $lead
        ], 201);
    }

    public function getUseLeads(Request $request, Affiliate $affiliate)
    {


        $limit = (int) $request->get('limit') ? (int) $request->get('limit') : 10;
        $page = $request->get('page') ? (int) $request->get('page') : 1;

        $leads = Lead::where('affiliate_id', $affiliate->id)->orderBy('created_at')->paginate($limit, ['*'], 'page', $page);
        return $leads;
    }
}