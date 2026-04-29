import React, { useEffect, useState } from 'react'
import { PostsAPI } from '../services/posts';

interface Post {
    id: string;
    caption: string;
    image: string | null;
}

const Posts = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        loadPosts()
    }, []);

    async function loadPosts() {
        try {
            const res = await PostsAPI.getPosts();
            setPosts(res.data.data);
            console.log(res.data);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h1>{post.caption}</h1>
                    {post.image && <img src={`http://localhost:8000/storage/uploads/${post.image}`} alt={post.caption} />}
                </div>
            ))}
        </div>
    )
}

export default Posts