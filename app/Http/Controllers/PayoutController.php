<?php

namespace App\Http\Controllers;

use App\Models\Payout;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PayoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth()->user()->isAdmin()) {

            $minPayout = Settings::where('key', "minPayout")->first();
            $minPayout = $minPayout ? (float) $minPayout->value : 0;

            return Inertia::render('Affiliate/Payouts', [
                "affiliate" => Auth()->user()->affiliate,
                "minPayout" => $minPayout
            ]);
        }
        return Inertia::render('Admin/Payouts');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function request()
    {


        $minPayout = Settings::where('key', "minPayout")->first();
        $minPayout = $minPayout ? (float) $minPayout->value : 0;


        if ((float) Auth()->user()->affiliate->balance < $minPayout) {

            return redirect()->to('payouts');
        }
        return Inertia::render('Affiliate/RequestPayout', [
            "affiliate" => Auth()->user()->affiliate,
            "minPayout" => $minPayout
        ]);
    }

    /**
     * Full Request
     */
    public function fulfill(Request $request, Payout $payout)
    {
        $payoutRequest = Payout::with('user', 'user.affiliate')->where('id', $payout->id)->first();

        return Inertia::render('Admin/FulfillPayout', [
            'payout' => $payoutRequest
        ]);
    }

    public function updatePayout(Request $request, Payout $payout)
    {

        $amount = (float) $request->amount;

        if (!$amount) {
            return response()->json([
                'error' => 'El monto es requerido',
            ], 403);
        }




        if ($amount != (float) $payout->amount) {
            return response()->json([
                'error' => 'El monto debe ser igual al monto solicitado para cumplir con la solicitud',
            ], 403);
        }

        $payout->status = "paid";
        $payout->save();

        return response()->json([
            'success' => "Solicitud de pago completada exitosamente",
        ], 201);
    }



    public function requestPayout(Request $req, User $user)
    {

        $balance  = (float) $user->affiliate->balance;
        $amount = (float) $req->amount;

        $minPayout = Settings::where('key', "minPayout")->first();
        $minPayout = $minPayout ? (float) $minPayout->value : 0;



        if ($amount < $minPayout) {
            return response()->json([
                'error' => 'El monto debe ser mayor que el pago mínimo',
            ], 403);
        }


        if (!$amount) {
            return response()->json([
                'error' => 'El monto es requerido',
            ], 403);
        }

        if ($amount > $balance) {
            return response()->json([
                'error' => 'Tu saldo es bajo',
            ], 403);
        }


        if ($balance >= $amount) {

            Payout::create([
                "user_id" => $user->id,
                "code" => Str::random(10),
                "amount" => $amount,
                "status" => "request"
            ]);

            $user->affiliate->balance =  $balance -  $amount;

            $user->affiliate->save();

            return response()->json([
                'success' => "Solicitud enviada con éxito",
            ], 201);
        }


        return $user;
    }

    public function getUserPayouts(Request $request, User $user)
    {
        $limit = (int) $request->get('limit') ? (int) $request->get('limit') : 10;
        $page = $request->get('page') ? (int) $request->get('page') : 1;

        $payouts = Payout::where('user_id', $user->id)->orderBy('created_at')->paginate($limit, ['*'], 'page', $page);
        return $payouts;
    }

    public function allPayouts(Request $request)
    {

        $limit = (int) $request->get('limit') ? (int) $request->get('limit') : 10;
        $page = $request->get('page') ? (int) $request->get('page') : 1;

        $payouts = Payout::with('user')->where('status', "paid")->orderBy('created_at')->paginate($limit, ['*'], 'page', $page);
        return $payouts;
    }

    public function allPayoutsRequests(Request $request)
    {

        $limit = (int) $request->get('limit') ? (int) $request->get('limit') : 10;
        $page = $request->get('page') ? (int) $request->get('page') : 1;

        $payouts = Payout::with('user')->where('status', "request")->orderBy('created_at')->paginate($limit, ['*'], 'page', $page);
        return $payouts;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payout $payout)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payout $payout)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payout $payout)
    {
        //
    }
}