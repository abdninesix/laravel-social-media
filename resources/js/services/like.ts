import axiosClient, { csrf } from "../utils/axios";

export const LikeAPI = {
    createLike: async (postId: string) => {
        await csrf();
        return axiosClient.post("/api/likes", { post_id: postId });
    },

    deleteLike: async (likeId: string) => {
        await csrf();
        return axiosClient.delete(`/api/likes/${likeId}`);
    },
};