import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.APP_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

export async function csrf() {
    await axiosClient.get("/sanctum/csrf-cookie");
}

export default axiosClient;