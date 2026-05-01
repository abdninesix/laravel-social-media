import axiosClient from "../utils/axios";

export const UsersAPI = {

    getUserById: async (userId: string) => {
        return axiosClient.get(`/api/users/${userId}`);
    },
};