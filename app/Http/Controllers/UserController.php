<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
     public function __construct(protected UserService $userService)
    {
    }

    public function register() {}
    
    public function login() {}
}
