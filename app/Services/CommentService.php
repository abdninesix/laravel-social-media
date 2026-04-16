<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{


    public function createComment(string $userId, string $postId, string $content): Comment
    {
        $comment = Comment::create([
            "user_id" => $userId,
            "post_id" => $postId,
            "content" => $content,
        ]);
        return $comment;
    }

    public function updateComment(string $userId, string $id, string $content): Comment|null
    {
        $comment = Comment::query()
            ->where("id", $id)
            ->where("user_id", $userId)
            ->first();

        if ($comment == null) {
            return null;
        }

        $comment->content = $content;
        $comment->save();
        return $comment;
    }

    public function deleteComment(string $userId, string $commentId): bool
    {
        $comment = Comment::query()
            ->where("user_id", $userId)
            ->where("id", $commentId)
            ->first();

        if ($comment == null) {
            return false;
        }

        $comment->delete();
        return true;
    }
}