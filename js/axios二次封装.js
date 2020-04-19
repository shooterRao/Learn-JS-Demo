import axios from "axios";
const TIME = 10000; // 10s
const URL = "/";
export default class MicroHttp {
    constructor({ baseUrl = URL, timeout = TIME, useInterceptors = true, withCredentials = false, errorHook = () => { } }) {
        this.config = {
            baseURL: baseUrl,
            timeout,
            withCredentials
        };
        this.errorHook = errorHook;
        this.axiosInstance = axios.create(this.config);
        // 安装拦截器
        useInterceptors && this.interceptors();
        // return this.instance;
    }
    // 拦截器
    interceptors(instance = this.axiosInstance) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            return config;
        }, error => {
            // 请求失败
            return Promise.reject(error);
        });
        // 响应拦截
        instance.interceptors.response.use(response => {
            const { status } = response;
            if (status === 200) {
                const { data } = response;
                const { code, message, error } = data; // error 兼容soe
                if (code !== 1000) {
                    this.errorHook(response);
                    return Promise.reject(message);
                }
                if (error) {
                    this.errorHook(response);
                    return Promise.reject(error.message);
                }
                return Promise.resolve(data);
            }
            else {
                this.errorHook(response);
                return Promise.reject(status);
            }
        }, error => {
            this.errorHook(error);
            return Promise.reject(error.response);
        });
    }
    static get(url, config) {
        return axios.get(url, config);
    }
}
