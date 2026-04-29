import axiosClient, { csrf } from "../utils/axios";

export const PostsAPI = {
    getPosts: async () => {
        return axiosClient.get("/api/posts");
    },
};