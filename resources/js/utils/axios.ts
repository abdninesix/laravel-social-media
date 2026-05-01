import axios from "axios";

export const base_url = import.meta.env.VITE_APP_URL

const axiosClient = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

export async function csrf() {
    await axiosClient.get("/sanctum/csrf-cookie");
}

export default axiosClient;