<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct(protected PostService $postService)
    {
    }


    public function getPosts(Request $request)
    {
        $user = Auth::user();
        $filter = $request->query('filter');
        $userId = $request->query('user_id');

        if ($filter === 'followed' && $user) {
            return $this->postService->getFollowedUsersPosts($user->id);
        }

        if ($userId) {
            return $this->postService->getPosts($userId);
        }

        return $this->postService->getPosts();
    }

    public function createPost(CreatePostRequest $request)
    {
        $validatedData = $request->validated();
        $caption = $validatedData['caption'];
        $file = $request->file('image');
        $image = null;
        if ($file != null && $file->isValid()) {
            if ($file->store("uploads", "public")) {
                $image = $file->hashName();
            }
        }

        return $this->postService->createPost(userId: Auth::id(), caption: $caption, image: $image);
    }

    public function updatePost(CreatePostRequest $request, string $id): Post|JsonResponse
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(["error" => "Unauthenticated"], 401);
        }
        
        $validatedData = $request->validated();
        $caption = $validatedData['caption'];
        $post = $this->postService->updatePost(userId: $user->id, id: $id, caption: $caption);
        if ($post == null) {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
        return $post;
    }

    public function deletePost(string $id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(["error" => "Unauthenticated"], 401);
        }
        
        if ($this->postService->deletePost(userId: $user->id, postId: $id)) {
            return response()->noContent(status: 204);
        } else {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }
}
