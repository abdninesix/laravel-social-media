<?php

namespace App\Services;

use App\Models\Like;

class LikeService
{

    public function createLike(string $userId, string $postId): Like
    {
        $like = Like::create([
            "user_id" => $userId,
            "post_id" => $postId,
        ]);
        return $like;
    }

    public function deleteLike(string $userId, string $likeId): bool
    {
        $like = Like::query()
            ->where("user_id", $userId)
            ->where("id", $likeId)
            ->first();

        if ($like == null) {
            return false;
        }

        $like->delete();
        return true;
    }
}