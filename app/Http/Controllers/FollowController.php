<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFollowRequest;
use App\Services\FollowService;
use Illuminate\Http\Request;

class FollowController extends Controller
{

    public function __construct(protected FollowService $followService)
    {
    }

    public function getFollows()
    {
        return $this->followService->getFollowsFrom('019d908e-c672-7106-bc51-7bbe32a776ff');
    }

    public function createFollow(CreateFollowRequest $req)
    {
        $validated = $req->validated();
        $follow = $this->followService->createFollow(
            fromId: '019d908e-c672-7106-bc51-7bbe32a776ff',
            toId: $validated["followed_user_id"]
        );

        if ($follow == null) {
            return response()->json(["error" => "You are already following this user!"], 400);
        }

        return $follow;
    }

    public function deleteFollow(string $id)
    {
        if (
            $this->followService->deleteFollow(
                fromId: '019d908e-c672-7106-bc51-7bbe32a776ff',
                toId: $id
            )
        ) {
            return response()->noContent(status: 200);
        } else {
            return response()->json([
                "error" => "You are not following this user."
            ], status: 404);
        }
    }
}
