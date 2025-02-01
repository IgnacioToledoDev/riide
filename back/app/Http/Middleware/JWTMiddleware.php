<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $excludedRoutes = [
            'api/auth/login',
            'api/auth/register',
            'api/auth/forgot-password',
            'api/auth/reset-password',
            'api/auth/get-user',
        ];

        if (in_array($request->path(), $excludedRoutes)) {
            return $next($request);
        }

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token not valid' . $e->getMessage()], 401);
        }

        return $next($request);
    }
}
