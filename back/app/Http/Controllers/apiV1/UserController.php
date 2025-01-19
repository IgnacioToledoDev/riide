<?php

namespace App\Http\Controllers\apiV1;

use App\Helpers\UserHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    private UserHelper $userHelper;
    public function __construct(UserHelper $userHelper) {
        $this->userHelper = $userHelper;
    }
    public function loginAction(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->sendError('Invalid Credentials', 401);
            }

            $user = auth()->user();
            $token = JWTAuth::fromUser($user);
            $success['user'] = $user;
            $success['token'] = $token;

            return $this->sendResponse($success, 'user login in successfully');
        } catch (JWTException $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    public function registerAction(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);
        $user->assignRole($this->userHelper->roles['user']);

        $token = JWTAuth::fromUser($user);
        $success = compact('user', 'token');

        return $this->sendResponse($success, 'User register successfully.');
    }

    public function forgotPasswordAction(): JsonResponse
    {
        // function not implemented yet

        return $this->sendResponse([], 'Password reset successfully.');
    }

    public function recoverPassword(): JsonResponse
    {
        // function not implemented yet

        return $this->sendResponse([], 'Password reset successfully.');
    }

    public function verifiedUser(): JsonResponse
    {
        // function not implemented yet

        return $this->sendResponse([], 'Password reset successfully.');
    }

    public function logoutAction(): JsonResponse
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return $this->sendResponse([], 'user logout successfully.');
    }
}
