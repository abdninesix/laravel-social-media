<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string'
        ]);

        if (!$this->userService->register(email: $validatedData['email'], password: $validatedData['password'])) {
            return response()->json(["error" => "Account already exists"], status: 400);
        }

        return response('');
    }

    public function setAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png|max:2048',
        ]);
        $image = $request->file("avatar");
        if (!$image->isValid()) {
            return;
        }
        if (!$image->store("avatars", "public")) {
            return;
        }
        $hash = $image->hashName();
        $this->userService->setUserAvatar(user: Auth::id(), avatar: $hash);
        return response('');
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (!$this->userService->login(email: $validatedData['email'], password: $validatedData['password'])) {
            return response()->json(["error" => "Incorrect email or password"], status: 401);
        }

        $request->session()->regenerate();

        return response('');
    }

    public function logout()
    {
        Auth::logout();
    }
}
