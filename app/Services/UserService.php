<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function register(string $email, string $password): bool
    {
        $normalizedEmail = strtolower($email);
        $user = User::query()
            ->where('email', $normalizedEmail)
            ->first();
        if ($user != null) {
            return false;
        }
        User::create([
            'email' => $normalizedEmail,
            'name' => "Abdullah",
            'password' => Hash::make($password),
            'description' => "A cool new user",
        ]);
        return true;
    }

    public function login(string $email, string $password)
    {
        return Auth::attempt([
            'email' => $email,
            'password' => $password,
        ]);
    }

}