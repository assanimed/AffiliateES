<?php

use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use App\Models\Lead;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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

Route::get('/dashboard', [DashboardController::class, "index"])->middleware(['auth', 'approved'])->name('dashboard');


Route::get('/offers', function () {
    if (Auth()->user()->isAdmin()) {
        return Inertia::render('Admin/Offers');
    }
    return Inertia::render('Affiliate/Offers');
})->middleware(['auth', 'approved'])->name('offers');





Route::get('/settings', [SettingsController::class, "index"])->middleware(['auth', 'approved'])->name('settings');






Route::get('/users/{user}/avatar', [AvatarController::class, 'index'])
    ->name("avatar");

Route::middleware(['auth', 'approved', 'admin'])->prefix('users')->group(function () {


    Route::get('/', function () {
        if (!Auth()->user()->isAdmin()) {
            return redirect()->route('home');
        }
        return Inertia::render('Admin/Users');
    })->middleware(['auth', 'approved'])->name('users');

    Route::get('/{user}/edit', function (User $user) {

        $user = User::with(['affiliate', 'profile', 'links'])->find($user->id);
        return Inertia::render('Admin/UserEdit', ["user" => $user]);
    });


    Route::post('/users/{user}/edit', [UserController::class, 'store'])->name('user.edit');
    /*
    Route::get('/user/profile', function () {
    }); */
});


Route::middleware(['auth', 'approved'])->prefix('offers')->group(function () {

    Route::get('/', [OfferController::class, "index"])->middleware(['auth', 'approved'])->name('offers');
    Route::get('/new', [OfferController::class, "create"])->middleware(['auth', 'approved', 'admin'])
        ->middleware(['admin'])
        ->name('offers.edit');

    Route::post('/', [OfferController::class, "store"])->middleware(['auth', 'approved'])->middleware(['admin'])->name('offers.store');

    Route::get('/{offer}/download', [OfferController::class, "zip"])->middleware(['auth', 'approved'])->name('assets.zip');
});

Route::middleware(['auth', 'approved'])->prefix('leads')->group(function () {

    Route::get('/', [LeadController::class, "index"])->name('leads');
    Route::get('/new', [LeadController::class, "create"])->middleware(['admin'])->name('leads.new');
    Route::get('/{lead}/edit', [LeadController::class, "show"])->middleware(['admin'])->name('leads.show');
    /*   Route::get('/new', [OfferController::class, "create"])->middleware(['auth', 'approved', 'admin'])
        ->middleware(['admin'])
    ->name('offers.edit');

    Route::post('/', [OfferController::class, "store"])->middleware(['auth', 'approved'])->middleware(['admin'])->name('offers.store');

    Route::get('/{offer}/download', [OfferController::class, "zip"])->middleware(['auth', 'approved'])->name('assets.zip');

 */





    // Route::post('/users/{user}/edit', [UserController::class, 'store'])->name('user.edit');
    /*
    Route::get('/user/profile', function () {
    }); */
});


Route::middleware(['auth', 'approved'])->prefix('payouts')->group(function () {

    Route::get('/', [PayoutController::class, "index"])->middleware(['auth', 'approved'])->name('payouts');
    Route::get('/request', [PayoutController::class, "request"])->middleware(['auth', 'approved'])->name('payouts.request');
    Route::get('/{payout}/fulfill', [PayoutController::class, "fulfill"])->middleware(['auth', 'approved', 'admin'])->name('payouts.request');
});






Route::get('/waitlist', function () {


    if (Auth()->user()->isAdmin() || Auth()->user()->affiliate->status === "approved") {
        return redirect(RouteServiceProvider::HOME);
    }


    return Inertia::render("Waitlist");
})->middleware(['auth'])->name("waitlist");

Route::middleware(['auth', 'approved'])->group(function () {

    Route::get('/profile', [ProfileController::class, "index"])->middleware(['admin'])->name('profile');

    Route::get('/security', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/security', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/security', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';