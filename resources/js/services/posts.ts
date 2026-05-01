import axiosClient, { csrf } from "../utils/axios";

export const PostsAPI = {

    getPosts: async (page: number, filter?: 'followed', userId?: string) => {
        let url = `/api/posts?page=${page}`;
        if (filter === 'followed') {
            url += `&filter=followed`;
        }
        if (userId) {
            url += `&user_id=${userId}`;
        }
        return axiosClient.get(url);
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