import axios from 'axios';

const api = axios.create({
    baseURL: "https://threed-root.onrender.com/auth",
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);