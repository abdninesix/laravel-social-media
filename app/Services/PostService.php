<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PostService
{
    public function getPosts()
    {
        $posts = Post::with('user')->latest()->paginate(5);

        $posts->getCollection()->transform(function ($post) {
            return [
                'post' => $post,
                // 'likes' => $post->likes()->count(),
                // 'comments' => $post->comments()->count(),
                // 'liked' => null,
                'author' => [
                    'id' => $post->user->id,
                    'name' => $post->user->name,
                    'avatar' => $post->user->avatar,
                ],
            ];
        });

        return $posts;
    }

    public function createPost(string $userId, string $caption, ?string $image = null): Post
    {
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

        $post->delete($userId);
        return true;
    }
}