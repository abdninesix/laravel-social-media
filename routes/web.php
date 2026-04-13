<?php

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/createUser', function () {
    $user = User::create([
        'name' => 'M Abdullah',
        'email' => 'abs@example.com',
        'password' => Hash::make('password123'),
    ]);
    return response()->json($user);
});

Route::get('/posts', function () {
    $posts = Post::with(['user', 'comments'])->get();
    return response()->json($posts);
});

Route::get('/createPost', function () {
    $post = new Post([
        'caption' => 'Hello World',
    ]);
    $post->user_id = '019d874e-9c9a-7254-8595-344d60882eef';
    $post->save();

    return response()->json($post);
});

Route::get('updatePost/{id}', function ($req, $id) {
    $caption = $req->query('caption');
    $post = Post::find($id);
    $post->caption = $caption;
    $post->save();

    return response()->json($post);
});

Route::get('/createComment', function () {
    $comment = Comment::Create([
        'post_id' => '019d8751-6091-7200-b05b-0f5f4acb7b3e',
        'user_id' => '019d874e-9c9a-7254-8595-344d60882eef',
        'content' => 'This is another comment...',
    ]);

    return response()->json($comment);
});
