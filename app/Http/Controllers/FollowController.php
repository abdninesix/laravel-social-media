<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowController extends Controller
{
     public function getFollows()
    {
        $follows = $this->followService->getFollowsFrom(userId: '019d908e-c672-7106-bc51-7bbe32a776ff');
        $res = [];

        foreach ($follows as $follow) {
            array_push($res, new FollowResponse(
                follow: $follow,
                user: $this->userService->getUserMetaById($follow->to_id)
            ));
        }

        return $res;
    }
}
