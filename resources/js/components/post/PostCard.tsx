import React from 'react'
import Avatar from '../base/Avatar'
import { useAuth } from '../../context/AuthContext';
import { PostResponse } from '../../types/post';
import { Link } from 'react-router-dom';


const PostCard = ({ post }: { post: PostResponse }) => {

    const base_url = import.meta.env.VITE_APP_URL

    return (
        <div className="bg-white p-2 border rounded-md">
            <div className="flex items-center gap-4">
                <Avatar image={`${base_url}/storage/avatars/${post.author.avatar}`} />
                <div>
                    <p className="text-xl">{post.author.name}</p>
                    <Link className="text-sm text-blue-700" to={`/profile/${post.author.username}`}>@{post.author.username}</Link>
                </div>
            </div>
            {post.post.image &&
                <img className="mx-auto mt-2" src={`${base_url}/storage/uploads/${post.post.image}`}/>
            }

            <p className="mt-2">{post.post.caption}</p>

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