import React, { useEffect, useRef, useState } from 'react'
import { PostsAPI } from '../../services/posts';
import PostCard from './PostCard';
import { PostResponse } from '../../types/post';
import CreatePost from './CreatePost';
import { FaSpinner } from 'react-icons/fa';

const PostList = ({ canPost, filter, userId }: { canPost: boolean, filter?: 'followed', userId?: string }) => {

    const [posts, setPosts] = useState<PostResponse[]>([]);

    const currentPage = useRef(1);
    const lastPage = useRef(0);
    const fetching = useRef(false);

    useEffect(() => {
        setPosts([]);
        currentPage.current = 1;
        lastPage.current = 0;
        loadPosts(1);
        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        }
    }, [filter, userId]);

    async function onScroll() {
        if (fetching.current) return;
        if (currentPage.current >= lastPage.current) return;
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollY / maxScroll > 0.7) {
            fetching.current = true;
            const nextPage = currentPage.current + 1;
            await loadPosts(nextPage);
            fetching.current = false;
        }
    }

    async function loadPosts(page: number) {
        try {
            const res = await PostsAPI.getPosts(page, filter, userId);
            currentPage.current = res.data.current_page;
            lastPage.current = res.data.last_page;
            setPosts((prev) => {
                const existingIds = new Set(prev.map((p) => p.post.id));
                const newPosts = res.data.data.filter(
                    (p: PostResponse) => !existingIds.has(p.post.id)
                );
                return [...prev, ...newPosts];
            });
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <div>
            {canPost && !userId && <div className="mt-10"><CreatePost /></div>}
            <div className="flex flex-col gap-6 py-10">
                {posts.length == 0 ? <FaSpinner className='animate-spin mx-auto' /> :
                    posts.map((p) => (
                        <PostCard key={p.post.id}
                            post={p} />
                    ))}
            </div>
        </div>
    )
}

export default PostList