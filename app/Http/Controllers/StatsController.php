<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class StatsController extends Controller
{
    public function index(Request $request)
    {

        $period = $request->period;

        if (!$period) $period = "month";


        if ($period === "month") {
            return response()->json([
                "data" => $this->getCurrentMonthLeads()
            ], 200);
        }
        if ($period === "year") {
            return response()->json([
                "data" => $this->getCurrentYearLeads()
            ], 200);
        }


        if ($period === "week") {
            return response()->json([
                "data" => $this->getCurrentWeekLeads()
            ], 200);
        }
    }


    private function getCurrentYearLeads()
    {
        $commission = Settings::where('key', 'commission')->first();

        if ($commission) {
            $commission = (float) $commission['value'];
        } else {
            $commission  = 0;
        }

        $now = Carbon::now();
        $startOfYear = $now->startOfYear()->format('Y-m-d');
        $endOfYear = $now->endOfYear()->format('Y-m-d');

        $leadsData = Lead::where('status', 'shipped')
            ->whereDate('created_at', '>=', $startOfYear)
            ->whereDate('created_at', '<=', $endOfYear)
            ->selectRaw('MONTHNAME(created_at) as month, COUNT(*) as totalLeadsValue')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->toArray();




        return collect($leadsData)->map(function ($item) use ($commission) {
            $item['totalLeadsValue'] =  $item['totalLeadsValue'] * $commission;

            return $item;
        });
    }

    private function getCurrentMonthLeads()
    {



        $commission = Settings::where('key', 'commission')->first();

        if ($commission) {
            $commission = (float) $commission['value'];
        } else {
            $commission  = 0;
        }

        $now = Carbon::now();
        $startOfMonth = $now->startOfMonth()->format('Y-m-d');
        $endOfMonth = $now->endOfMonth()->format('Y-m-d');

        /* return $leadsData = Lead::where('status', 'shipped')
            ->whereDate('created_at', '>=', $startOfMonth)
            ->whereDate('created_at', '<=', $endOfMonth)
            ->selectRaw('DATE(created_at) as date, SUM(1) as totalLeadsValue') // Sum the count
            ->groupBy('date')
            ->orderBy('date') // Order by date (ascending)
            ->get()
            ->toArray(); */

        $leadsData = Lead::where('status', 'shipped')
            ->whereDate('created_at', '>=', $startOfMonth)
            ->whereDate('created_at', '<=', $endOfMonth)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as totalLeadsValue')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();


        return collect($leadsData)->map(function ($item) use ($commission) {
            $item['totalLeadsValue'] =  $item['totalLeadsValue'] * $commission;

            return $item;
        });
    }
    private function getCurrentWeekLeads()
    {
        $commission = Settings::where('key', 'commission')->first();

        if ($commission) {
            $commission = (float) $commission['value'];
        } else {
            $commission  = 0;
        }

        $now = Carbon::now();
        $startOfWeek = $now->startOfWeek()->format('Y-m-d');
        $endOfWeek = $now->endOfWeek()->format('Y-m-d');


        $leadsData = Lead::whereDate('created_at', '>=', $startOfWeek)
            ->whereDate('created_at', '<=', $endOfWeek)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as totalLeadsValue')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();

        return collect($leadsData)->map(function ($item) use ($commission) {
            $item['totalLeadsValue'] =  $item['totalLeadsValue'] * $commission;

            return $item;
        });



        /* return collect($leadsData)->map(function($item) use ($commission){
        $item['totalLeadsValue'] =  $item['totalLeadsValue']* $commission;

        return $item;

    }); */
    }
}