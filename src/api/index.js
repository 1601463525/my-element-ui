import {
    postJSON,
    postForm,
    getJSON,
} from '@/utils/ajax';

// 获取用户基本信息
export function getUserInfo(params) {
    return getJSON('/api/getUserInfo', params);
}
export default {};
