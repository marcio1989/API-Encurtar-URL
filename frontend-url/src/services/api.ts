import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_URL_BACKEND || 'http://localhost:3001'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;