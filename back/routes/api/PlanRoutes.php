<?php

use App\Http\Controllers\apiV1\PlanController;
use Illuminate\Support\Facades\Route;

Route::prefix('/plan')->group(function () {
    Route::get('/', [PlanController::class, 'getPlans']);
});
