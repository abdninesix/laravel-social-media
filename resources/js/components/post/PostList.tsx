import React, { useEffect, useState } from 'react'
import { PostsAPI } from '../../services/posts';
import PostCard from './PostCard';
import { PostResponse } from '../../types/post';
import CreatePost from './CreatePost';

const PostList = ({ canPost }: { canPost: boolean }) => {

    const base_url = import.meta.env.VITE_APP_URL

    const [posts, setPosts] = useState<PostResponse[]>([]);

    let currentPage = 1;
    let lastPage = 0;
    let fetching = false;

    useEffect(() => {
        loadPosts(1);

        document.addEventListener("wheel", onScroll);

        return () => {
            document.removeEventListener("wheel", onScroll);
        }
    }, []);

    async function onScroll() {
        if (fetching) return;

        if (currentPage == lastPage) return;

        let currentScroll = window.scrollY;
        let maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight;


        if (currentScroll / maxScrollHeight > 0.7 || maxScrollHeight == 0) {
            fetching = true;
            currentPage++;
            await loadPosts(currentPage);
            fetching = false;
        }
    }

    async function loadPosts(page: number) {
        try {
            const res = await PostsAPI.getPosts(page);
            currentPage = res.data.current_page;
            lastPage = res.data.last_page;

            setPosts((p) => [...p, ...res.data.data]);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <div>
            {canPost && <div className="mt-4"><CreatePost /></div>}

            <div className="flex flex-col gap-2 mt-2 pb-4">
                {posts.map((p) => (
                    <PostCard key={p.post.id}
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