<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLikeRequest;
use App\Services\LikeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __construct(protected LikeService $likeService)
    {
    }


    public function createLike(CreateLikeRequest $req)
    {
        $validated = $req->validated();
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                "error" => "Unauthorized"
            ], status: 401);
        }

        $like = $this->likeService->createLike(
            userId: $user->id,
            postId: $validated["post_id"]
        );

        if ($like == null) {
            return response()->json([
                "error" => "Like already exists"
            ], status: 400);
        } else {
            return $like;
        }
    }

     public function deleteLike(string $id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                "error" => "Unauthorized"
            ], status: 401);
        }

        if ($this->likeService->deleteLike(userId: $user->id, likeId: $id)) {
            return response()->noContent(status: 200);
        } else {
            return response()->json([
                "error" => "Like not found"
            ], status: 404);
        }
    }
}
