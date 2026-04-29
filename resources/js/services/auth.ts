import axiosClient, { csrf } from "../utils/axios";

export const AuthAPI = {
    // Register
    // register: async (data: {
    //     name: string;
    //     email: string;
    //     password: string;
    //     password_confirmation: string;
    // }) => {
    //     await csrf();
    //     return axiosClient.post("/auth/register", data);
    // },

    // Login
    login: async (data: {
        email: string;
        password: string;
    }) => {
        await csrf();
        return axiosClient.post("/auth/login", data);
    },

    // Logout
    logout: async () => {
        return axiosClient.post("/auth/logout");
    },

    // Get current user
    me: async () => {
        return axiosClient.get("/auth/user");
    },
};