import React, { useEffect, useState } from 'react'
import { PostsAPI } from '../../services/posts';
import PostCard from './PostCard';

export interface Post {
    id: string;
    caption: string;
    image: string | null;
}

const PostList = ({ canPost }: { canPost: boolean }) => {

    const base_url = import.meta.env.VITE_APP_URL

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
            {/* {canPost && <div className="mt-4"><CreatePost onPostCreated={onPostCreated} /></div>} */}

            <div className="flex flex-col gap-2 mt-2 pb-4">
                {posts.map((p) => (
                    <PostCard key={p.id}
                        // onUnlike={() => onPostUnlike(p)}
                        // onLike={(l) => onPostLike(p, l)}
                        // onComment={(comments) => onPostComment(p, comments)}
                        post={p} />
                ))}
            </div>
        </div>
    )
}

export default PostList