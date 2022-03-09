import * as api from '@/api/base/shuntMetering/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_SITE_INFO = 'GET_SITE_INFO';
export const GET_SITE_INFO_LOADING = 'GET_SITE_INFO_LOADING';
export const GET_SITE_INFO_SUCCESS = 'GET_SITE_INFO_SUCCESS';
export const GET_SITE_INFO_ERROR = 'GET_SITE_INFO_ERROR';
export const CHANGE_SITE_ID = 'CHANGE_SITE_ID';

export const DELETE_SHUNT_DATA = 'DELETE_SHUNT_DATA';
export const DELETE_SHUNT_DATA_LOADING = 'DELETE_SHUNT_DATA_LOADING';
export const DELETE_SHUNT_DATA_SUCCESS = 'DELETE_SHUNT_DATA_SUCCESS';
export const DELETE_SHUNT_DATA_ERROR = 'DELETE_SHUNT_DATA_ERROR';

export const UPLOAD_EXECL_DATA = 'UPLOAD_EXECL_DATA';
export const UPLOAD_EXECL_DATA_LOADING = 'UPLOAD_EXECL_DATA_LOADING';
export const UPLOAD_EXECL_DATA_SUCCESS = 'UPLOAD_EXECL_DATA_SUCCESS';
export const UPLOAD_EXECL_DATA_ERROR = 'UPLOAD_EXECL_DATA_ERROR';

export const GET_METERS_DATA = 'GET_METERS_DATA';
export const GET_METERS_DATA_LOADING = 'GET_METERS_DATA_LOADING';
export const GET_METERS_DATA_SUCCESS = 'GET_METERS_DATA_SUCCESS';
export const GET_METERS_DATA_ERROR = 'GET_METERS_DATA_ERROR';

export const BREAD_SHOW = 'BREAD_SHOW';
export const CHANGE_CHECKED_OPTIONS = 'CHANGE_CHECKED_OPTIONS';
export const CHANGE_SHUNT_LIST = 'CHANGE_SHUNT_LIST';

const state = {
    siteLoading: true,
    siteData: [],
    siteDataTotal: 0,
    siteId: '',
    siteDetailData: {},
    siteDetailLoading: true,
    tableShow: true,
    detailShow: false,
    stationLoading: true,
    stationData: [],
    stationShow: false,
    metersLoading: true,
    metersData: [],
    metersShow: false,
    checkedOptions: [],
};

const mutations = {
    [CHANGE_SITE_ID](state,res) {
        state.siteId = res;
    },
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.siteData = [];
    },
    [GET_SITE_INFO_LOADING](state) {
        state.siteLoading = true;
    },
    [CHANGE_SHUNT_LIST](state, res) {
        if (res.length > 0) {
            state.siteData = res;
        } else {
            state.siteData = [];
        }
    },
    [GET_SITE_INFO_SUCCESS](state, res) {
        if (res && res.list) {
            state.siteData = res.list;
            state.siteDataTotal = res.total;
        }
        state.siteLoading = false;
    },
    [GET_SITE_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.siteLoading = false;
    },
    [DELETE_SHUNT_DATA_LOADING](state) {
        state.siteLoading = true;
    },
    [DELETE_SHUNT_DATA_SUCCESS](state, res) {
        Message.success('删除成功！');
        state.siteLoading = false;
    },
    [DELETE_SHUNT_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.siteLoading = false;
    },
    [UPLOAD_EXECL_DATA_LOADING](state) {
        state.siteLoading = true;
    },
    [UPLOAD_EXECL_DATA_SUCCESS](state, res) {
        Message.success('导入成功！');
        state.siteLoading = false;
    },
    [UPLOAD_EXECL_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.siteLoading = false;
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
    [CHANGE_CHECKED_OPTIONS](state, res) {
        state.checkedOptions = res;
    },
};

const actions = {
    // 获取首页列表数据
    async [GET_SITE_INFO]({ commit }, params) {
        commit(GET_SITE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getShuntMeteringData(params)
            );
            commit(GET_SITE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_SITE_INFO_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [DELETE_SHUNT_DATA]({ commit }, params) {
        commit(DELETE_SHUNT_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.deleteShuntData(params)
            );
            commit(DELETE_SHUNT_DATA_SUCCESS, result);
        } catch(e) {
            commit(DELETE_SHUNT_DATA_ERROR, e);
        }
    },
    async [UPLOAD_EXECL_DATA]({ commit }, params) {
        commit(UPLOAD_EXECL_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.uploadExeclData(params)
            );
            commit(UPLOAD_EXECL_DATA_SUCCESS, result);
        } catch(e) {
            commit(UPLOAD_EXECL_DATA_ERROR, e);
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

export const SITE = 'shuntMetering';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
