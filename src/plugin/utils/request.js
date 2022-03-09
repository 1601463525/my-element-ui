import axios from 'axios';
import nprogress from 'nprogress';
import qs from 'qs';
const instance = axios.create({
    // baseURL: 'http://192.168.0.105:8080'
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    const { method, url, data, params } = config;
    const args = method === 'get' ? params : data;
    console.log(`${method}了${url}`, args ? `参数是${qs.stringify(args)}` : '');
    nprogress.start();
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
    nprogress.done();
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;