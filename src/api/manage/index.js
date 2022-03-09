import {
    postJSON,
    getJSON,
  } from '@/utils/ajax';
  
  // 获取用户管理数据
  export function getPurchaseManageData(params) {
    return postJSON('/api/sysrole/list', params);
  }
  // 获取用户管理数据
  export function getSystemUserData(params) {
    return postJSON('/api/sysuser/list', params);
  }
  // 获取机构管理数据
  export function getSystemDeptData(params) {
    return postJSON('/api/sysdept/list', params);
  }
  export default {
    getPurchaseManageData,
    getSystemUserData,
    getSystemDeptData
  };
  