<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Payout;
use App\Models\User;
use App\Services\AdminDashboardService;
use App\Services\AffiliateDashboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Request as FacadesRequest;

class DashboardController extends Controller
{


    public function __construct(
        private AffiliateDashboardService $affiliateService,
        private AdminDashboardService $adminService,
    ){
        // dd(Auth::user());

        // $this->affiliateService = new AffiliateDashboardService();
    }

    public function index(){



        if(Auth()->user()->isAdmin()){
            $data = [
                "users" => ['total'=> User::where('role', 'affiliate')->count(), 'lastMonth' => $this->lastMonthUsers(), 'currentMonth' => $this->currentMonthUsers()],
                "leads" => ['total'=> Lead::all()->count(), 'lastMonth' => $this->lastMonthLeads(), 'currentMonth' => $this->currentMonthLeads()],
                "notShipped" => ['total'=> Lead::where('status', 'pending')->count(), 'lastMonth' => $this->lastMonthNotShipped(), 'currentMonth' => $this->currentMonthNotShipped()],
                "payouts" => ['total'=> Payout::where('status', 'paid')->sum("amount"), 'lastMonth' => $this->lastMonthPayouts(), "currentMonth" => $this->currentMonthPayouts() ],
            ];
            return Inertia::render('Admin/Dashboard', ["data" => $data]);
        }



        $this->affiliateService->user = Auth::user();


        // return $this->affiliateService->lastMonthEarning();


        $performance = $this->affiliateService->getPerformance();

        $data = [
            "leads" => ['total'=> $this->affiliateService->totalLeads(), 'lastMonth' => $this->affiliateService->lastMonthLeads(), 'currentMonth' => $this->affiliateService->currentMonthLeads()],
            "notShipped" => ['total'=> $this->affiliateService->totalNotShipped(), 'lastMonth' => $this->affiliateService->lastMonthNotShipped(), 'currentMonth' => $this->affiliateService->currentMonthNotShipped()],
            "earning" => ['total'=> $this->affiliateService->totalEarning(), 'lastMonth' => $this->affiliateService->lastMonthEarning(), 'currentMonth' => $this->affiliateService->currentMonthEarning()],
            "performance" => ['total'=> $this->affiliateService->getPerformance(), 'lastMonth' => $this->affiliateService->lastMonthPerformance(), 'currentMonth' => $this->affiliateService->currentMonthPerformance()],

        ];

        $data['balance'] = (double) Auth::user()->affiliate->balance;


        return Inertia::render('Affiliate/Dashboard', [
            'data' => $data
        ]);
    }



    private function currentMonthUsers() {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return User::where('role', 'affiliate')
                   ->whereBetween('created_at', [$start_date, $end_date])
                   ->count();
    }

    private function lastMonthUsers(){
        $now = Carbon::now();
            $lastMonth = $now->subMonth();

            $start_date = $lastMonth->startOfMonth()->toDateTimeString();
            $end_date = $lastMonth->endOfMonth()->toDateTimeString();

            return User::where('role', 'affiliate')->whereBetween('created_at', [$start_date, $end_date])->count();
    }

    private function currentMonthLeads() {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return Lead::whereBetween('created_at', [$start_date, $end_date])->count();
    }

    private function lastMonthLeads(){
        $now = Carbon::now();
            $lastMonth = $now->subMonth();

            $start_date = $lastMonth->startOfMonth()->toDateTimeString();
            $end_date = $lastMonth->endOfMonth()->toDateTimeString();

            return Lead::whereBetween('created_at', [$start_date, $end_date])->count();
    }

    private function currentMonthNotShipped() {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return Lead::where('status', 'pending')
                   ->whereBetween('created_at', [$start_date, $end_date])
                   ->count();
    }


    private function lastMonthNotShipped(){
        $now = Carbon::now();
            $lastMonth = $now->subMonth();

            $start_date = $lastMonth->startOfMonth()->toDateTimeString();
            $end_date = $lastMonth->endOfMonth()->toDateTimeString();

            return Lead::where('status', 'pending')->whereBetween('created_at', [$start_date, $end_date])->count();
    }


    private function currentMonthPayouts() {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return Payout::where('status', 'paid')
                     ->whereBetween('created_at', [$start_date, $end_date])
                     ->sum("amount");
    }


    private function lastMonthPayouts(){
        $now = Carbon::now();
            $lastMonth = $now->subMonth();

            $start_date = $lastMonth->startOfMonth()->toDateTimeString();
            $end_date = $lastMonth->endOfMonth()->toDateTimeString();

            return Payout::where('status', 'paid')->whereBetween('created_at', [$start_date, $end_date])->sum("amount");
    }


}