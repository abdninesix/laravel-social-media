<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/welcome', function () {
//     return view('welcome');
// });


Route::prefix("/auth")->group(function () {
    Route::post("/register", [UserController::class, "register"]);
    Route::post("/login", [UserController::class, "login"]);
    Route::get("/user", [UserController::class, "getUserDetails"]);
    Route::post("/logout", [UserController::class, "logout"]);

    Route::get("/redirect/google", [GoogleAuthController::class, "redirect"]);
    Route::get("/callback/google", [GoogleAuthController::class, "callback"]);
});

Route::prefix("/api")->group(function () {
    Route::prefix("/posts")->group(function () {
        Route::get("/", [PostController::class, "getPosts"]);
        Route::post("/", [PostController::class, "createPost"])->middleware("auth:sanctum");
        Route::put("/{id}", [PostController::class, "updatePost"]);
        Route::delete("/{id}", [PostController::class, "deletePost"]);
    });

    Route::prefix("/likes")->middleware("auth:sanctum")->group(function () {
        Route::post("/", [LikeController::class, "createLike"]);
        Route::delete("/{id}", [LikeController::class, "deleteLike"]);
    });

    Route::prefix("/comments")->group(function () {
        Route::post("/", [CommentController::class, "createComment"]);
        Route::put("/{id}", [CommentController::class, "updateComment"]);
        Route::delete("/{id}", [CommentController::class, "deleteComment"]);
    });

    Route::prefix("/follows")->middleware("auth:sanctum")->group(function () {
        Route::get("/", [FollowController::class, "getFollows"]);
        Route::post("/", [FollowController::class, "createFollow"]);
        Route::delete("/{id}", [FollowController::class, "deleteFollow"]);
    });

    Route::get("/users/{id}", [UserController::class, 'getUserById']);

    Route::prefix("/users")->middleware("auth:sanctum")->group(function () {
        Route::post("/avatar", [UserController::class, "setAvatar"]);
    });
});

Route::view('/{any}', 'index')->where('any', '.*');