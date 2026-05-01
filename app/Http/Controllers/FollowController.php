<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFollowRequest;
use App\Services\FollowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{

    public function __construct(protected FollowService $followService)
    {
    }

    public function getFollows()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(["error" => "Unauthenticated"], 401);
        }
        return $this->followService->getFollowsFrom($user->id);
    }

    public function createFollow(CreateFollowRequest $req)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(["error" => "Unauthenticated"], 401);
        }
        
        $validated = $req->validated();
        $follow = $this->followService->createFollow(
            fromId: $user->id,
            toId: $validated["followed_user_id"]
        );

        if ($follow == null) {
            return response()->json(["error" => "You are already following this user!"], 400);
        }

        return $follow;
    }

    public function deleteFollow(string $id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(["error" => "Unauthenticated"], 401);
        }
        
        if (
            $this->followService->deleteFollow(
                fromId: $user->id,
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
