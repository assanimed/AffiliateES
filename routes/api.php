<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ApiAffiliateController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\SettingsController;

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



Route::middleware('auth:sanctum')->group(function(){

    Route::get('/affiliates', [ApiAffiliateController::class, 'getAll'])
        ->middleware(['admin']);


        Route::post('/settings', [SettingsController::class, 'store'])
        ->middleware(['admin']);



    Route::post('/users/{user}/avatar', [AvatarController::class, 'store']);



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

});