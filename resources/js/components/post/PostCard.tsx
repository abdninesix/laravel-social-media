import React, { useEffect, useState } from 'react'
import Avatar from '../base/Avatar'
import { useAuth } from '../../context/AuthContext';
import { PostsAPI } from '../../services/posts';
import { Post } from './PostList';


const PostCard = ({ post }: { post: Post }) => {


    const { user } = useAuth();

    const base_url = import.meta.env.VITE_APP_URL

    return (
        <div className="bg-white p-2 border rounded-md">
            <div className="flex items-center gap-4">
                <Avatar image={`${base_url}/storage/avatars/${user?.image}`} />
                {/* <div>
                    <p className="text-xl">{post.author.name}</p>
                    <Link className="text-sm text-blue-700" to={`/profile/${post.author.username}`}>@{post.author.username}</Link>
                </div> */}
            </div>
            {post.image &&
                <img className="h-52 object-cover w-full mt-2" src={`${base_url}/storage/uploads/${post.image}`}></img>
            }

            <p className="mt-2">{post.caption}</p>

            {/* {user && (
                < div className="flex gap-2 items-center mt-4">
                    <Button onClick={toggleCommentSection} size="small" bold={false} color="white">
                        <FontAwesomeIcon icon={faComment} className="text-blue-400" />
                        Comment ({post.comments})
                    </Button>

                    <Button onClick={like} size="small" bold={false} color={post.liked != null ? "blue" : "white"} >
                        <FontAwesomeIcon icon={faThumbsUp} className={post.liked ? "text-white" : "text-blue-400"} />
                        Like ({post.likes})
                    </Button>
                </div>
            )}

            {
                commentSection ? <CommentSection comments={comments} createComment={createComment} /> : null
            } */}
        </div >
    )
}

export default PostCard