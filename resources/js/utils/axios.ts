import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.APP_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

function getCookieValue(name: string) {
    const regex = new RegExp(`(^|)${name}=([^:]+)`);
    const match = decodeURIComponent(document.cookie).match(regex);
    if (match) {
        return match[2];
    }
    return null;
}

// Add CSRF token to requests
axiosClient.interceptors.request.use((config) => {
    const token = getCookieValue("XSRF-TOKEN");
    if (token) {
        config.headers["X-XSRF-TOKEN"] = token;
    }
    return config;
});

export async function csrf() {
    await axiosClient.get("/sanctum/csrf-cookie");
}

export default axiosClient;