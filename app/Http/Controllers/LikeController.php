<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLikeRequest;
use App\Services\LikeService;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct(protected LikeService $likeService)
    {
    }


    public function createLike(CreateLikeRequest $req)
    {
        $validated = $req->validated();
        $like = $this->likeService->createLike(
            userId: '019d908e-c672-7106-bc51-7bbe32a776ff',
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
        if ($this->likeService->deleteLike(userId:'019d908e-c672-7106-bc51-7bbe32a776ff', likeId: $id)) {
            return response()->noContent(status: 200);
        } else {
            return response()->json([
                "error" => "Like not found"
            ], status: 404);
        }
    }
}
