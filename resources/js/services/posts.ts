import axiosClient, { csrf } from "../utils/axios";

export const PostsAPI = {

    getPosts: async (page: Number) => {
        return axiosClient.get(`/api/posts?page=${page}`);
    },

    createPost: async (data: {
        caption: string;
        image?: File | null;
    }) => {
        await csrf();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, value as any);
        });

        return (await axiosClient.post("/api/posts", formData)).data;
    },
};