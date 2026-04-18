<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PostService
{
    public function getPosts()
    {
        return Post::all();
    }

    public function createPost(string $userId, string $caption, string $image): Post
    {

        // $user = User::create([
        //     "name" => "Muhammad Abdullah",
        //     "description" => "Hi! I'm the developer of this website.",
        //     "email" => "abs2@example.com",
        //     "password" => Hash::make("password123"),
        // ]);

        $post = Post::create([
            "caption" => $caption,
            "user_id" => $userId,
            "image" => $image,
        ]);

        return $post;
    }

    public function updatePost(string $userId, string $id, string $caption): Post|null
    {
        $post = Post::query()
            ->where("id", $id)
            ->where("user_id", $userId)
            ->first();

        if ($post == null) {
            return null;
        }

        $post->caption = $caption;
        $post->save();
        return $post;
    }

    public function deletePost(string $userId, string $postId): bool
    {
        $post = Post::query()
            ->where("user_id", $userId)
            ->where("id", $postId)
            ->first();

        if ($post == null) {
            return false;
        }

        $post->delete();
        return true;
    }
}