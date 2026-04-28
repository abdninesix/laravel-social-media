import React, { useEffect, useState } from 'react'

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
        await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
            credentials: "include",
        });
        let body = await fetch(
            `http://127.0.0.1:8000/api/posts`,
            {
                credentials: "include",
            },
        );
        let json = await body.json();
        setPosts(json.data)
        console.log(json)
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