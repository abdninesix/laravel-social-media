import React from 'react'
import { useAuth } from '../context/AuthContext';
import PostList from '../components/post/PostList';

const Posts = () => {

    const { user } = useAuth();

    return (
        <div className="main-center">
            <PostList
                canPost={user != null}
                filter="followed"
            />
        </div>
    )
}

export default Posts