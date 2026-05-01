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

    public function createFollow(string $fromId, string $toId): Follow|null
    {
        // Check if already following
        $existing = Follow::query()->where([
            "user_id" => $fromId, 
            "followed_user_id" => $toId,
        ])->first();

        if ($existing) {
            return null;
        }

        $follow = Follow::create([
            "user_id" => $fromId,
            "followed_user_id" => $toId,
        ]);
        return $follow;
    }

    public function deleteFollow(string $fromId, string $toId): bool
    {
        $follow = Follow::query()->where([
            "user_id" => $fromId, 
            "followed_user_id" => $toId,
        ])->first();

        if ($follow == null) {
            return false;
        }

        $follow->delete($toId);
        return true;
    }
}