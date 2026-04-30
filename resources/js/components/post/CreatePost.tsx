import React, { useState } from "react";
import { PostsAPI } from "../../services/posts";
import { GoImage } from "react-icons/go";

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
        <form onSubmit={handleSubmit} className="flex gap-4">

            <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                className="border p-2 w-full"
                required
            />

            <input
                type="file"
                onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                }
                id="imageUpload"
                className="hidden"
            />

            <div className="space-y-2">
                <label htmlFor="imageUpload" className="text-blue-400 cursor-pointer"> <GoImage size={25} /></label>
                <button
                    type="submit"
                    disabled={loading}
                    className="h-fit bg-blue-500 text-white px-4 py-2 cursor-pointer"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>

        </form>
    );
};

export default CreatePost;