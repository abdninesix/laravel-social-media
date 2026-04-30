import React, { useEffect, useState } from 'react'
import { PostsAPI } from '../services/posts';
import { useAuth } from '../context/AuthContext';
import PostList from '../components/post/PostList';

interface Post {
    id: string;
    caption: string;
    image: string | null;
}

const Posts = () => {

    const { user } = useAuth();

    return (
        <div className="main-center">
            <PostList
                canPost={user != null}
            />
        </div>
    )
}

export default Posts