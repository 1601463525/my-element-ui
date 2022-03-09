import { getJSON,postForm,postJSON } from '@/utils/ajax';

// 获取用户列表
export function getSystemUserData(params) {
    return getJSON('/api/sysuser/list', params);
}
// 删除用户
export function deleteSystemUserData(params) {
    return postForm('/api/sysuser/delete', params);
}
// 添加用户
export function addSystemUserData(params) {
    return postJSON('/api/sysuser/add', params);
}
// 获取role
export function getRoleList(params) {
    return getJSON('/api/sysuser/getRoleList', params);
}
// 获取Dept
export function getDeptList(params) {
    return getJSON('/api/sysuser/getDeptList', params);
}
export default{
    getSystemUserData,
    deleteSystemUserData,
    addSystemUserData,
};
