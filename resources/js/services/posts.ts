import axiosClient, { csrf } from "../utils/axios";

export const PostsAPI = {
    getPosts: async () => {
        return axiosClient.get("/api/posts");
    },

    createPost: async (data: {
        caption: string;
        image?: string;
    }) => {
        return axiosClient.post("/auth/register", data);
    },
};