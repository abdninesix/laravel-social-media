import React from 'react'
import { PostsAPI } from '../services/posts';
import { useAuth } from '../context/AuthContext';
import PostList from '../components/post/PostList';

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