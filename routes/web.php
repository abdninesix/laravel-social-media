<?php

use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/posts', function () {
    $posts = Post::all();
    return response()->json($posts);
});

Route::get('/create', function () {
    $post = Post::create([
        'caption' => 'Hello World',
    ]);

    return response()->json($post);
});
