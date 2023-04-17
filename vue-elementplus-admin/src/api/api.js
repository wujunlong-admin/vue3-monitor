import axios from "axios";
import utils from "../utils/utils.js";

// 数据加载api
const api = axios.create({
    timeout: 30 * 1000, //请求超时时间
    baseURL: import.meta.env.DEV,
    withCredentials: true, //是否允许跨域
    // cancelToken: source.token,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

// 请求拦截器
api.interceptors.request.use(config => {
        let token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
// 响应拦截
api.interceptors.response.use(response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    });

export default api;