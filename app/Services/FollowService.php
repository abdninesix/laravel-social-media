<?php

namespace App\Services;

use App\Models\Follow;

class FollowService
{

    public function getFollowsFrom(string $userId)
    {
        return Follow::query()
            ->where("user_id", $userId)
            ->get();
    }

    public function createFollow(string $userId, string $followedUserId): Follow
    {
        $follow = Follow::create([
            "user_id" => $userId,
            "followed_user_id" => $followedUserId,
        ]);
        return $follow;
    }

    public function deleteFollow(string $userId, string $followId): bool
    {
        $follow = Follow::find([
            "id" => $followId,
            "user_id" => $userId,
        ])->first();

        if ($follow == null) {
            return false;
        }

        $follow->delete();
        return true;
    }
}