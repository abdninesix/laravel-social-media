import axiosClient, { csrf } from "../utils/axios";

export const followAPI = {
    createFollow: async (followedUserId: string) => {
        await csrf();
        return axiosClient.post("/api/follows", { followed_user_id: followedUserId });
    },

    deleteFollow: async (followedUserId: string) => {
        await csrf();
        return axiosClient.delete(`/api/follows/${followedUserId}`);
    },
    
    getFollows: async () => {
        return axiosClient.get("/api/follows");
    },
};