<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    return redirect(RouteServiceProvider::HOME);

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'approved'])->name("home");

Route::get('/dashboard', function (Request $request) {


    if(Auth()->user()->isAdmin()){
        return Inertia::render('Admin/Dashboard');
    }
    return Inertia::render('Affiliate/Dashboard');


})->middleware(['auth', 'approved'])->name('dashboard');


Route::get('/offers', function () {
    if(Auth()->user()->isAdmin()){
        return Inertia::render('Admin/Offers');
    }
    return Inertia::render('Affiliate/Offers');
})->middleware(['auth', 'approved'])->name('offers');

Route::get('/leads', function () {
    if(Auth()->user()->isAdmin()){
        return Inertia::render('Admin/Leads');
    }
    return Inertia::render('Affiliate/Leads');


})->middleware(['auth', 'approved'])->name('leads');

Route::get('/users', function (Request $request) {



    if(Auth()->user()->isAdmin()){
        return Inertia::render('Admin/Users');
    }
    return Inertia::render('Affiliate/Users');

})->middleware(['auth', 'approved'])->name('users');

Route::get('/settings', function () {
    if(Auth()->user()->isAdmin()){
        return Inertia::render('Admin/Settings');
    }
    return Inertia::render('Affiliate/Settings');


})->middleware(['auth', 'approved'])->name('settings');


Route::get('/profile', function () {
    if(Auth()->user()->isAdmin()){
        return Inertia::render('Admin/Profile');
    }
    return Inertia::render('Affiliate/Profile');


})->middleware(['auth', 'approved'])->name('settings');



Route::get('/check', function () {
    return Inertia::render('Check');
});



Route::get('/waitlist', function(){
    if(Auth()->user()->isAdmin() || Auth()->user()->affiliate->status === "approved"){
        return redirect(RouteServiceProvider::HOME);
    }


    return Inertia::render("Waitlist");

})->middleware(['auth'])->name("waitlist");

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';