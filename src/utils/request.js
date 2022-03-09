import axios from 'axios';
//请求拦截器
axios.interceptors.request.use((param) => {
    return param;
}, (error) => {
    // 请求错误
    return Promise.reject(error);
});
 
// 添加响应拦截器
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    // 响应错误
    return Promise.reject(error);
});
 
// 封装axios-----------------------------------
function apiAxios(url, params, method) {
    const httpDefault = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: method,
        baseURL: window.BASE_URL || '',
        url: url,
        // data: params,
        data: JSON.stringify(params),
        dataType:'json'
    };
    console.log('-----', httpDefault);
 
    return new Promise((resolve, reject) => {
        axios(httpDefault)
            // 此处的.then属于axios
            .then((res) => {
                resolve(res);
            }).catch((response) => {
                reject(response);
            });
    });
}
 
export default {
    install: function (Vue) {
        Vue.prototype.$axios = (url, params, method) => apiAxios(url, params, method);
    }
};
