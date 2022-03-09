import * as api from '@/api/system/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_SYSTEM_MANAGE_INFO = 'GET_SYSTEM_MANAGE_INFO';
export const GET_SYSTEM_MANAGE_INFO_LOADING = 'GET_SYSTEM_MANAGE_INFO_LOADING';
export const GET_SYSTEM_MANAGE_INFO_SUCCESS = 'GET_SYSTEM_MANAGE_INFO_SUCCESS';
export const GET_SYSTEM_MANAGE_INFO_ERROR = 'GET_SYSTEM_MANAGE_INFO_ERROR';

export const DELETE_SYSTEM_MANAGE_INFO = 'DELETE_SYSTEM_MANAGE_INFO';
export const DELETE_SYSTEM_MANAGE_INFO_LOADING = 'DELETE_SYSTEM_MANAGE_INFO_LOADING';
export const DELETE_SYSTEM_MANAGE_INFO_SUCCESS = 'DELETE_SYSTEM_MANAGE_INFO_SUCCESS';
export const DELETE_SYSTEM_MANAGE_INFO_ERROR = 'DELETE_SYSTEM_MANAGE_INFO_ERROR';

export const ADD_SYSTEM_MANAGE_INFO = 'ADD_SYSTEM_MANAGE_INFO';
export const ADD_SYSTEM_MANAGE_INFO_LOADING = 'ADD_SYSTEM_MANAGE_INFO_LOADING';
export const ADD_SYSTEM_MANAGE_INFO_SUCCESS = 'ADD_SYSTEM_MANAGE_INFO_SUCCESS';
export const ADD_SYSTEM_MANAGE_INFO_ERROR = 'ADD_SYSTEM_MANAGE_INFO_ERROR';

export const GET_METERS_DATA = 'GET_METERS_DATA';
export const GET_METERS_DATA_LOADING = 'GET_METERS_DATA_LOADING';
export const GET_METERS_DATA_SUCCESS = 'GET_METERS_DATA_SUCCESS';
export const GET_METERS_DATA_ERROR = 'GET_METERS_DATA_ERROR';

export const GET_ROLE_LIST = 'GET_ROLE_LIST';
export const GET_ROLE_LIST_SUCCESS = 'GET_ROLE_LIST_SUCCESS';
export const GET_ROLE_LIST_ERROR = 'GET_ROLE_LIST_ERROR';

export const GET_DEPT_LIST = 'GET_DEPT_LIST';
export const GET_DEPT_LIST_SUCCESS = 'GET_DEPT_LIST_SUCCESS';
export const GET_DEPT_LIST_ERROR = 'GET_DEPT_LIST_ERROR';

export const BREAD_SHOW = 'BREAD_SHOW';

const state = {
    userData: [],
    loading: true,
    userDataTotal: 0,
    abnormalData: [],
    abnormalLoading: true,
    homeShow: true,
    abnormalShow: false,
    addUserLoading: false,
    stationData: [],
    stationShow: false,
    metersLoading: true,
    metersData: [],
    metersShow: false,
    roleList: [],
    deptList: [],
};

const mutations = {
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.userData = [];
    },
    [GET_SYSTEM_MANAGE_INFO_LOADING](state) {
        state.loading = true;
    },
    [GET_SYSTEM_MANAGE_INFO_SUCCESS](state, res) {
        if (res && res.list) {
            state.userData = res.list;
            state.userDataTotal = res.total;
        }
        state.loading = false;
    },
    [GET_SYSTEM_MANAGE_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [DELETE_SYSTEM_MANAGE_INFO_LOADING](state) {
        state.loading = true;
    },
    [DELETE_SYSTEM_MANAGE_INFO_SUCCESS](state, res) {
        Message.success('删除成功');
        state.loading = false;
    },
    [DELETE_SYSTEM_MANAGE_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [ADD_SYSTEM_MANAGE_INFO_LOADING](state) {
        state.addUserLoading = true;
    },
    [ADD_SYSTEM_MANAGE_INFO_SUCCESS](state, res) {
        Message.success('用户添加成功');
        state.addUserLoading = false;
    },
    [ADD_SYSTEM_MANAGE_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.addUserLoading = false;
    },
    [GET_METERS_DATA_LOADING](state) {
        state.metersLoading = true;
    },
    [GET_METERS_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.metersData = res.list;
        }
        state.metersLoading = false;
    },
    [GET_METERS_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.metersLoading = false;
    },

    // role
    [GET_ROLE_LIST_SUCCESS](state, res) {
        if (res) {
            res.map(item => {
                item.label = item.roleId === 1 ? '超级管理员' : item.roleId === 2 ? '管理员' : '员工';
                item.value = item.roleId;
            });
            state.roleList = res;
        }
    },
    [GET_ROLE_LIST_ERROR](state, res) {
        Message.error(res.msg || res.message || '获取用户权限失败');
    },
    // dept
    [GET_DEPT_LIST_SUCCESS](state, res) {
        if (res) {
            res.map(item => {
                item.label = `${item.name}-${item.delFlag}`;
                item.value = item.deptId;
            });
            state.deptList = res;
        }
    },
    [GET_DEPT_LIST_ERROR](state, res) {
        Message.error(res.msg || res.message || '获取用户部门失败');
    },
};

const actions = {
    // 获取用户数据
    async [GET_SYSTEM_MANAGE_INFO]({ commit }, params) {
        commit(GET_SYSTEM_MANAGE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getSystemUserData(params)
            );
            commit(GET_SYSTEM_MANAGE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_SYSTEM_MANAGE_INFO_ERROR, e);
        }
    },
    // 删除用户
    async [DELETE_SYSTEM_MANAGE_INFO]({ commit }, params) {
        commit(DELETE_SYSTEM_MANAGE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.deleteSystemUserData(params)
            );
            commit(DELETE_SYSTEM_MANAGE_INFO_SUCCESS, result);
        } catch(e) {
            commit(DELETE_SYSTEM_MANAGE_INFO_ERROR, e);
        }
    },
    // 添加用户
    async [ADD_SYSTEM_MANAGE_INFO]({ commit }, params) {
        commit(ADD_SYSTEM_MANAGE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.addSystemUserData(params)
            );
            commit(ADD_SYSTEM_MANAGE_INFO_SUCCESS, result);
        } catch(e) {
            commit(ADD_SYSTEM_MANAGE_INFO_ERROR, e);
        }
    },
    // 获取Role
    async [GET_ROLE_LIST]({ commit }, params) {
        try {
            const result = await wrapResponse(
                api.getRoleList(params)
            );
            commit(GET_ROLE_LIST_SUCCESS, result);
        } catch(e) {
            commit(GET_ROLE_LIST_ERROR, e);
        }
    },
    // 获取Dept
    async [GET_DEPT_LIST]({ commit }, params) {
        try {
            const result = await wrapResponse(
                api.getDeptList(params)
            );
            commit(GET_DEPT_LIST_SUCCESS, result);
        } catch(e) {
            commit(GET_DEPT_LIST_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [GET_METERS_DATA]({ commit }, params) {
        commit(GET_METERS_DATA_LOADING);
        // try {
        //     const result = await wrapResponse(
        //         api.getMerersData(params)
        //     );
        //     commit(GET_METERS_DATA_SUCCESS, result);
        // } catch(e) {
        //     commit(GET_METERS_DATA_ERROR, e);
        // }
    },
    
};

export const SYSTEMMANAGE = 'systemManage';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
