<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }
    private const PROVIDER_NAME = "google";

    public function callback()
    {
        $user = Socialite::driver('google')->user();
        $email = $user->getEmail();
        $avatar = $user->getAvatar();

        if (!$this->userService->onThirdPartyCallback($this::PROVIDER_NAME, $email, $avatar)) {
            return response()->json(["error" => "Account already exists"], status: 400);
        }

        return redirect("http://localhost:8000");

        // var_dump($user);
    }
}
