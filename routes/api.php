<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ApiAffiliateController;
use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StatsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::middleware('auth:sanctum')->group(function () {

    Route::get('/affiliates', [ApiAffiliateController::class, 'getAll'])
        ->middleware(['admin']);


    Route::post('/settings', [SettingsController::class, 'store'])
        ->middleware(['admin']);


    Route::get('/leads/stats', [StatsController::class, 'index']);

    Route::patch('/users', [UserController::class, 'updateUser']);
    Route::post('/avatar', [AvatarController::class, 'store']);
    Route::delete('/avatar', [AvatarController::class, 'destroy']);

    // Get User Leads
    Route::get('/{affiliate}/leads', [LeadController::class, 'getUseLeads']);



    Route::post('/assets', [AssetsController::class, 'store'])
        ->middleware(['admin']);


    Route::delete('/assets/{asset}', [AssetsController::class, 'destroy'])
        ->middleware(['admin']);

    // GET ALL LEAD

    Route::get('/leads', [LeadController::class, 'getAll']);
    Route::post('/leads', [LeadController::class, 'addLead'])->middleware(['admin']);
    Route::get('/leads/{lead}', [LeadController::class, 'getLead'])->middleware(['admin']);
    Route::patch('/leads/{lead}', [LeadController::class, 'updateLead'])->middleware(['admin']);
    // ->middleware(['admin']);
    // GET ALL OFFER

    Route::get('/offers', [OfferController::class, 'getAll']);

    Route::delete('/logo', [SettingsController::class, 'deleteLogo'])->middleware(['admin']);

    /// Payouts Endpoints
    // Route::get('/{user}/payouts/', [PayoutController::class, 'userPayouts']);
    Route::post('/{user}/payouts', [PayoutController::class, 'requestPayout']);
    Route::get('/{user}/payouts', [PayoutController::class, 'getUserPayouts']);

    Route::get('/payouts', [PayoutController::class, 'allPayouts'])->middleware(['admin']);
    Route::get('/payouts/requests', [PayoutController::class, 'allPayoutsRequests'])->middleware(['admin']);
    Route::patch('/payouts/{payout}', [PayoutController::class, 'updatePayout'])->middleware(['admin']);
});