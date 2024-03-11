<?php


namespace App\Services;

use App\Models\Lead;
use App\Models\Payout;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Support\Carbon;

class AffiliateDashboardService
{

    public User $user;
    public function __construct()
    {
    }

    public function currentMonthUsers()
    {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return User::where('role', 'affiliate')
            ->whereBetween('created_at', [$start_date, $end_date])
            ->count();
    }

    public function lastMonthUsers()
    {
        $now = Carbon::now();
        $lastMonth = $now->subMonth();

        $start_date = $lastMonth->startOfMonth()->toDateTimeString();
        $end_date = $lastMonth->endOfMonth()->toDateTimeString();

        return User::where('role', 'affiliate')->whereBetween('created_at', [$start_date, $end_date])->count();
    }


    public function totalLeads()
    {
        return Lead::where('affiliate_id', $this->user->affiliate->id)->count();
    }
    public function currentMonthLeads()
    {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return Lead::where('affiliate_id', $this->user->affiliate->id)->whereBetween('created_at', [$start_date, $end_date])->count();
    }

    public function lastMonthLeads()
    {
        $now = Carbon::now();
        $lastMonth = $now->subMonth();

        $start_date = $lastMonth->startOfMonth()->toDateTimeString();
        $end_date = $lastMonth->endOfMonth()->toDateTimeString();

        return Lead::where('affiliate_id', $this->user->affiliate->id)->whereBetween('created_at', [$start_date, $end_date])->count();
    }



    public function totalNotShipped()
    {
        return Lead::where('status', 'pending')->where('affiliate_id', $this->user->affiliate->id)->count();
    }
    public function currentMonthNotShipped()
    {
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return Lead::where('affiliate_id', $this->user->affiliate->id)->where('status', 'pending')
            ->whereBetween('created_at', [$start_date, $end_date])
            ->count();
    }


    public function lastMonthNotShipped()
    {
        $now = Carbon::now();
        $lastMonth = $now->subMonth();

        $start_date = $lastMonth->startOfMonth()->toDateTimeString();
        $end_date = $lastMonth->endOfMonth()->toDateTimeString();

        return Lead::where('affiliate_id', $this->user->affiliate->id)->where('status', 'pending')->whereBetween('created_at', [$start_date, $end_date])->count();
    }

    public function totalEarning()
    {
        $earning = 0;
        if ($this->user->affiliate) {
            $earning = $this->user->affiliate->earning;
        }

        return $earning;
    }


    public function currentMonthEarning()
    {
        $commission = Settings::where('key', 'commission')->first();

        if ($commission) {
            $commission = (float) $commission['value'];
        } else {
            $commission  = 0;
        }
        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        return Lead::where('affiliate_id', $this->user->affiliate->id)->where('status', 'shipped')
            ->whereBetween('created_at', [$start_date, $end_date])
            ->count() * $commission;
    }


    public function lastMonthEarning()
    {

        $commission = Settings::where('key', 'commission')->first();

        if ($commission) {
            $commission = (float) $commission['value'];
        } else {
            $commission  = 0;
        }
        $now = Carbon::now();
        $lastMonth = $now->subMonth();

        $start_date = $lastMonth->startOfMonth()->toDateTimeString();
        $end_date = $lastMonth->endOfMonth()->toDateTimeString();

        // return [$start_date, $end_date];
        return Lead::where('affiliate_id', $this->user->affiliate->id)->where('status', 'shipped')->whereBetween('created_at', [$start_date, $end_date])->count() * $commission;
    }

    public function getPerformance()
    {

        if ($this->totalLeads() === 0) return 0;

        $shipped = $this->totalLeads() - $this->totalNotShipped();

        $performance = $shipped * 100 / $this->totalLeads();
        return $performance;
    }


    public function currentMonthPerformance()
    {


        $now = Carbon::now();

        $start_date = $now->startOfMonth()->toDateTimeString();
        $end_date = $now->endOfMonth()->toDateTimeString();

        $totaCurrentMonth =  Lead::where('affiliate_id', $this->user->affiliate->id)
            ->whereBetween('created_at', [$start_date, $end_date])
            ->count();


        if ($totaCurrentMonth === 0) return 0;

        $shipped = $totaCurrentMonth - $this->currentMonthNotShipped();

        $performance = $shipped * 100 / $totaCurrentMonth;
        return $performance;
    }

    public function lastMonthPerformance()
    {

        $now = Carbon::now();
        $lastMonth = $now->subMonth();

        $start_date = $lastMonth->startOfMonth()->toDateTimeString();
        $end_date = $lastMonth->endOfMonth()->toDateTimeString();

        $totaLastMonth =  Lead::where('affiliate_id', $this->user->affiliate->id)
            ->whereBetween('created_at', [$start_date, $end_date])
            ->count();

        if ($totaLastMonth === 0) return 0;

        $shipped = $totaLastMonth - $this->lastMonthNotShipped();

        $performance = $shipped * 100 / $totaLastMonth;
        return $performance;
    }
}