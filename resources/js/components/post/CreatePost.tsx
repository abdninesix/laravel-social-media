import React, { useEffect, useState } from "react";
import { PostsAPI } from "../../services/posts";
import { GoImage } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import Avatar from "../base/Avatar";
import { useAuth } from "../../context/AuthContext";
import { base_url } from "../../utils/axios";

const CreatePost = () => {

    const { user } = useAuth();

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

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
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Avatar image={`${base_url}/storage/avatars/${user?.image}`} customClass="w-16 h-16" />
            <div className="w-full bg-white rounded-xl shadow-md flex gap-2 p-2">
                <div className="w-full flex flex-col">
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Talk about something..."
                        className="p-2 w-full outline-none"
                        required
                    />
                    {image && (
                        <div className="flex items-start gap-1">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="max-h-40 rounded-lg object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => setImage(null)}
                                className="cursor-pointer"
                            >
                               X
                            </button>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                    }
                    id="imageUpload"
                    className="hidden"
                />
                <label htmlFor="imageUpload" className="text-blue-500 cursor-pointer"> <GoImage size={25} /></label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="size-fit bg-blue-500 text-white rounded-full p-2 cursor-pointer"
            >
                <FiSend size={25} />
            </button>

        </form>
    );
};

export default CreatePost;