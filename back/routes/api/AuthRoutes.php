<?php


use App\Http\Controllers\apiV1\UserController;
use App\Http\Middleware\JWTMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [UserController::class, 'loginAction']);
    Route::post('register', [UserController::class, 'registerAction']);
    Route::post('logout', [UserController::class, 'logoutAction']);
});
