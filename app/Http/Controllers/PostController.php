<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(protected PostService $postService)
    {
    }

    public function createPost(Request $request)
    {
        $validatedData = $request->validate([
            'caption' => 'required|max:100',
        ]);

        $caption = $validatedData['caption'];
        return $this->postService->createPost(caption: $caption);
    }
}
