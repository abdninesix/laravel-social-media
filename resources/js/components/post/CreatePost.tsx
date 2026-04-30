import React, { useState } from "react";
import { PostsAPI } from "../../services/posts";

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.ChangeEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await PostsAPI.createPost({
                caption,
                image: image || undefined,
            });

            setCaption("");
            setImage(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's on your mind?"
                    className="border p-2 w-full"
                />
            </div>

            <div>
                <input
                    type="file"
                    onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                    }
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2"
            >
                {loading ? "Posting..." : "Create Post"}
            </button>
        </form>
    );
};

export default CreatePost;