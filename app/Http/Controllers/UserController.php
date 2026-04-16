<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

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

        if ($this->userService->register(email: $validatedData['email'], password: $validatedData['password'])) {
            return response()->json(["error" => "Account already exists"], status:400);
        }

        return response();
    }

    public function login(Request $request)
    {
    }
}
