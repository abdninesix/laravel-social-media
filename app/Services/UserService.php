<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function register(string $email, string $password): bool
    {
        $normalizedEmail = $this->normalizeEmail($email);
        $user = $this->getUserByEmail($normalizedEmail);
        if ($user != null) {
            return false;
        }
        User::create([
            'email' => $normalizedEmail,
            'name' => "Abdullah",
            'auth_type' => "password",
            'password' => Hash::make($password),
            'description' => "A cool new user",
        ]);
        return true;
    }

    public function login(string $email, string $password)
    {
        return Auth::attempt([
            'email' => $email,
            'auth_type' => "password",
            'password' => $password,
        ]);
    }

    public function onThirdPartyCallback(string $provider, string $email, string $avatar)
    {
        $normalizedEmail = $this->normalizeEmail($email);
        $user = $this->getUserByEmail($normalizedEmail);

        if ($user != null && $user->auth_type != $provider) {
            return false;
        }

        if ($user == null) {
            $user = $this->registerThirdParty($provider, $email, $avatar);
        }
        Auth::login($user);
        return true;
    }

    public function registerThirdParty(string $provider, string $email, string $avatar)
    {
        return User::create([
            'email' => $email,
            'name' => $email,
            'auth_type' => $provider,
            'password' => "",
            'description' => "",
        ]);
    }

    private function normalizeEmail(string $email): string
    {
        return strtolower($email);
    }

    public function getUserByEmail(string $email): User|null
    {
        return User::query()
            ->where("email", $email)
            ->first();
    }

}