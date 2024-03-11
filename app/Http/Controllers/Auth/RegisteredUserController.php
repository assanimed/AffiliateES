<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Affiliate;
use App\Models\Profile;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

use App\Rules\TrueValue;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        //return dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|lowercase|max:255|min:5|unique:'.User::class,
            'email' => 'required|string|lowercase|max:255|min:5|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'privacy_policy' => ['required', new TrueValue]
        ]);



        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->username,
            'password' => Hash::make($request->password),
            'role' => 'affiliate'
        ]);


        Affiliate::create(
                [
                'user_id' => $user->id,
                'status' => 'pending'
                ]);

        //event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}