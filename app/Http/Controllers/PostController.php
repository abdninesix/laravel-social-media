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


    public function getPosts()
    {
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
        $validatedData = $request->validated();
        $caption = $validatedData['caption'];
        $post = $this->postService->updatePost(userId: '019d908e-c672-7106-bc51-7bbe32a776ff', id: $id, caption: $caption);
        if ($post == null) {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
        return $post;
    }

    public function deletePost(string $id)
    {
        if ($this->postService->deletePost(userId: '019d8b7c-bb17-7213-ac7c-bb4e2ce65426', postId: $id)) {
            return response()->noContent(status: 204);
        } else {
            return response()->json([
                "message" => "Post not found"
            ], 404);
        }
    }
}
