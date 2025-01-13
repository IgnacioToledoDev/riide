<?php

namespace App\Http\Controllers\apiV1;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\JsonResponse;

class PlanController extends Controller
{
    public function getPlans(): JsonResponse
    {
        $plans = Plan::with(['planPricing'])
            ->where(['is_public' => true])
            ->get()
            ->flatMap(function ($plan) {
                return $plan->planPricing->map(function ($pricing) use ($plan) {
                   return [
                       'id' => $plan->id,
                       'name' => $plan->name,
                       'description' => $plan->description,
                       'price' => $pricing->price,
                       'billingCycle' => $pricing->billing_cycle,
                       'isPopular' => (bool) $plan->is_popular,
                       'storageLimit' => $plan->storage_limit,
                       'bandwidthLimit' => $plan->bandwidth_limit,
                       'ramLimit' => $plan->ram_limit,
                   ];
                });
            });

        if (empty($plans)) {
            return $this->sendError('plans not found');
        }

        $success = [
            'plans' => $plans
        ];

        return $this->sendResponse($success, 'Plans retrieved successfully.');
    }
}
