<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckAffiliateStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

            if (Auth::check() && Auth::user()->isAffiliate()) {
                $affiliate = Auth::user()->affiliate; // Assuming you have an 'affiliate' relationship

                if ($affiliate->status === 'pending') {
                    return redirect()->route('waitlist');
                }
            }

            return $next($request);

    }
}
