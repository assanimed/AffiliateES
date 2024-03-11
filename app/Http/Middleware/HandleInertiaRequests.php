<?php

namespace App\Http\Middleware;

use App\Models\Settings;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        // dd($request->session()->get('token'));

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'info' => function () use ($request) {

                $telegram = Settings::where('key', "telegram")->first();
                $logoText = Settings::where('key', "logoText")->first();
                $logoImage = Settings::where('key', "logoImage")->first();
                return [
                    'telegram' => $telegram ? $telegram->value : "#" ,
                    "logoImage" => $logoImage ? $logoImage->value : null,
                    "logoText" => $logoText ? $logoText->value : env('APP_NAME', 'AffiliateES'),
                ];
            },
        ];
    }
}
