<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentRequest;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct(protected CommentService $commentService)
    {
    }

    public function createComment(CreateCommentRequest $request)
    {
        $validatedData = $request->validated();

        return response()->json(
            $this->commentService->createComment(
                userId: '019d908e-c672-7106-bc51-7bbe32a776ff',
                postId: $validatedData['post_id'],
                content: $validatedData['content']
            ),
            status: 201
        );
    }

    public function updateComment(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'content'=>'required|string|max:100'
        ]);
        $comment = $this->commentService->updateComment(
            userId: '019d908e-c672-7106-bc51-7bbe32a776ff',
            id: $id,
            content: $validatedData['content']
        );

        if ($comment == null) {
            return response()->json([
                'message' => 'Comment not found'
            ], 404);
        }

        return $comment;
    }

    public function deleteComment(string $id)
    {
        if ($this->commentService->deleteComment(
            userId: '019d908e-c672-7106-bc51-7bbe32a776ff',
            commentId: $id
        )) {
            return response()->noContent(status: 204);
        }

        return response()->json([
            'message' => 'Comment not found'
        ], 404);
    }
}
