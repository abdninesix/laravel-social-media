import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

axiosClient.defaults.withXSRFToken = true;

export async function csrf() {
    await axiosClient.get("/sanctum/csrf-cookie");
}

export default axiosClient;