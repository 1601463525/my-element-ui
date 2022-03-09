import axios from 'axios';
import qs from 'qs';

//const BASE_URL = '';

function handleUrl(baseUrl,url){//处理url前缀可能不一致
    let _url = url.replace(baseUrl,'');
    if(_url.indexOf('/') !== 0){
        _url = '/' + _url;
    }
    return _url;
}

const pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// const cancelToken = axios.CancelToken;
const removePending = config => {
    for (const i in pending) {
        const params = '&params='+ (config.params?JSON.stringify(config.params):'');
        const data = '&data='+ (config.data?JSON.stringify(config.data):'');
        const requestUrl = handleUrl(config.baseURL,config.url) + '&' + config.method + params + data;
        if (pending[i].u === requestUrl) {
            //当当前请求在数组中存在时执行函数体
            pending[i].cancelFun(); //执行取消操作
            pending.splice(i, 1); //把这条记录从数组中移除
            break;
        }
    }
};
axios.defaults.withCredentials = true ;
//添加请求拦截器
axios.interceptors.request.use(
    config => {
        removePending(config); //在一个ajax发送前执行一下取消操作
        // config.cancelToken = new cancelToken(cancel => {
        //     // 这里的ajax标识我是用请求地址&请求方式&请求参数拼接的字符串
        //     const params = '&params='+ (config.params?JSON.stringify(config.params):'');
        //     const data = '&data='+ (config.data?JSON.stringify(config.data):'');
        //     const requestUrl = handleUrl(config.baseURL,config.url) + '&' + config.method + params + data;
        //     pending.push({ u: requestUrl, cancelFun: cancel });
        // });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//添加响应拦截器
axios.interceptors.response.use(
    response => {
        removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        return response;
    },
    error => {
        console.log(error);
        if(error.response){
            return error.response;
        }else{
            return {
                data:{msg:'cancel'}
            };
        }
    }
);

const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: function(params) {
        return qs.stringify(params, {
            arrayFormat: 'indices',
        });
    },
    timeout: 1000 * 60,
};

function request(options = {}) {
    const headers = {
        ...defaultOptions.headers,
        ...options.headers,
    };

    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    const opt = {
        ...defaultOptions,
        ...options,
        baseURL: window.BASE_URL || '',
        headers,
        method: options.method || 'get',
        //cancelToken: source.token,
    };

    const p = axios(opt);
    // 可通过调用p.source.cancel()取消请求
    //p.source = source;
    return p;
}

export function postJSON(url, data, options) {
    const opt = {
        ...options,
        url,
        data,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return request(opt);
}

export function formUpload(url, data, options) {
    const opt = {
        ...options,
        method: 'post',
        url,
        data,
        headers: {
            'Content-Type':'multipart/form-data',
        },
    };
    return request(opt);
}

export function postForm(url, data, options) {
    const opt = {
        ...options,
        method: 'post',
        url,
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        transformRequest: [
            function(data) {
                const ret = qs.stringify(data, {
                    arrayFormat: 'indices',
                });
                return ret;
            },
        ],
    };
    return request(opt);
}

export function getJSON(url, params, options) {
    const opt = {
        ...options,
        url,
        params,
        method: 'get',
    };
    return request(opt);
}

export function upload(url, data, options) {
    const opt = {
        ...options,
        method: 'post',
        url,
        data,
    };
    return request(opt);
}

export function del(url, params, options) {
    const opt = {
        ...options,
        url,
        params,
        method: 'delete',
    };

    return request(opt);
}

export function put(url, params, options) {
    const opt = {
        ...options,
        url,
        params,
        method: 'put',
    };

    return request(opt);
}
/**
 * @description 对response进行处理
 * @return {Promise} 经过处理后的Promise
 */
export function wrapResponse(p,login) {
    return p.then(response => {
        if(login === 'login') {
            if(response.status && +response.status === 200) {
                return '登录成功';
            } else {
                throw new Error('登录失败,请检查用户名或者密码是否正确！');
            }
        } else {
            if (typeof response.data !== 'object') {
                throw new Error('返回格式错误');
            }
            if (response.data.code === 10000 || response.data.code === 4000  || response.data.success) {
                // 4000代表无数据
                if(response.data.result === 0){
                    return response.data.result;
                }else {
                    return response.data.result || response.data;
                }
            }else if(response.data.status === 401) {
                sessionStorage.setItem('isAuth',false);
                window.location.href = `${window.location.origin}/blockchain/`;
                throw new Error('请求超时,请重新登录');
            } else if(response.data.code === -1) {
                throw new Error('处理失败');
            } else {
                throw new Error(
                    response.data.result || '服务器处理错误'
                );
            }
        }
    }).catch(e => {
        console.log(e);
        
        if (e.response) {
            throw new Error('服务器处理错误');
        } else if (e.request) {
            // 超时
            if (e.code === 'ECONNABORTED') {
                throw new Error('请求超时错误');
            }
            throw new Error('请求处理错误');
        } else {
            throw e;
        }
    });
}
