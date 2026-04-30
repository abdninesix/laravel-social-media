import React from 'react'
import Avatar from '../base/Avatar'
import { useAuth } from '../../context/AuthContext';
import { PostResponse } from '../../types/post';
import { Link } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import { GrLike } from 'react-icons/gr';
import Button from '../base/Button';


const PostCard = ({ post }: { post: PostResponse }) => {

    const { user } = useAuth();

    const base_url = import.meta.env.VITE_APP_URL

    return (
        <div className="bg-white p-4 shadow-md rounded-3xl">
            <div className="flex items-center gap-4">
                <Avatar image={`${base_url}/storage/avatars/${post.author.avatar}`} />
                <div>
                    <p className="text-xl">{post.author.name}</p>
                    <Link className="text-sm text-blue-700" to={`/profile/${post.author.id}`}>@{post.author.email}</Link>
                </div>
            </div>
            <p className="mt-2">{post.post.caption}</p>
            {post.post.image &&
                <img className="mx-auto h-100 mt-2 rounded-2xl" src={`${base_url}/storage/uploads/${post.post.image}`} />
            }


            {user && (
                < div className="flex gap-2 items-center mt-4">
                    <Button onClick={() => alert("Hi")} size="small" bold={false} >
                        <GoComment className="text-white" />
                        Comment (20)
                    </Button>

                    <Button onClick={() => alert("Hi")} size="small" bold={false}  >
                        <GrLike className="text-white" />
                        Like (20)
                    </Button>
                </div>
            )}
            {/* 
            {
                commentSection ? <CommentSection comments={comments} createComment={createComment} /> : null
            } */}
        </div >
    )
}

export default PostCard