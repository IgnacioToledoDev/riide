<?php

namespace App\Http\Controllers\apiV1;

use App\Helpers\UserHelper;
use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMailable;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
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

            // todo check if the user have a active plan?
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
            'billingCycle' => 'required|string|max:255',
            'planId' => 'required|string',
            'recaptchaToken' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error. ' . $validator->errors(), 400);
        }

        $isValidRecaptcha = $this->isValidRecaptcha($request->all()['recaptchaToken']);
        if($isValidRecaptcha){
            return $this->sendError('reCaptcha not valid', 422);
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

    public function forgotPasswordAction(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->email;
        // todo only if the user no have a active token
        try {
            $user = $user = User::where('email', $email)->first();
            if (!$user) {
                return $this->sendError('Email does not exist.');
            }

            $token = Password::createToken($user);
            Mail::to($email)->send(new ResetPasswordMailable($token, $email));

            return $this->sendResponse([], 'send link successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to send recovery email.', 400);
        }
    }

    public function resetPasswordAction(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error. ' . $validator->errors(), 400);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60)); // todo change this
                $user->save();

                event(new PasswordReset($user));
            }
        );
        if ($status === Password::PASSWORD_RESET) {
            $response = $this->sendResponse(['status' => $status], 'Password reset successfully.');
        } else {
            $response = $this->sendError($status, 400);
        }

        return $response;
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

    public function getUserAction(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        $user = auth()->user();
        $token = JWTAuth::fromUser($user);
        $success['user'] = $user;
        $success['token'] = $token;

        return $this->sendResponse($success, 'get user successfully.');
    }

    /**
     * @throws ConnectionException
     */
    private function isValidRecaptcha(string $recaptchaToken): bool
    {
        try {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => env('RECAPTCHA_SECRET'),
                'response' => $recaptchaToken,
            ]);

            $httpResponse = $response->json();
            if (!$httpResponse['success'] || $httpResponse['score'] < 0.5) {
                return false;
            }
            var_dump($httpResponse);

            return true;
        } catch (ConnectionException $connectionException) {
            throw new ConnectionException($connectionException->getMessage());
        }

    }
}
