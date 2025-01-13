<?php

namespace App\Http\Controllers\apiV1;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\JsonResponse;

class PlanController extends Controller
{
    public function getPlans(): JsonResponse
    {
        $plans = Plan::all();

        if (empty($plans)) {
            return $this->sendError('plans not found');
        }

        $success = [
            'plans' => $plans
        ];

        return $this->sendResponse($success, 'Plans retrieved successfully.');
    }
}
