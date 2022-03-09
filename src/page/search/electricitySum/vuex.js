import * as api from '@/api/search/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_ELECTRICITY_INFO = 'GET_ELECTRICITY_INFO';
export const GET_ELECTRICITY_INFO_LOADING = 'GET_ELECTRICITY_INFO_LOADING';
export const GET_ELECTRICITY_INFO_SUCCESS = 'GET_ELECTRICITY_INFO_SUCCESS';
export const GET_ELECTRICITY_INFO_ERROR = 'GET_ELECTRICITY_INFO_ERROR';

export const POST_SEND_ACCOUNT = 'POST_SEND_ACCOUNT';
export const POST_SEND_ACCOUNT_LOADING = 'POST_SEND_ACCOUNT_LOADING';
export const POST_SEND_ACCOUNT_SUCCESS = 'POST_SEND_ACCOUNT_SUCCESS';
export const POST_SEND_ACCOUNT_ERROR = 'POST_SEND_ACCOUNT_ERROR';
export const CHANGE_ELECTRICITY_ID = 'CHANGE_ELECTRICITY_ID';

export const GET_ELECTRICITY_DETAIL = 'GET_ELECTRICITY_DETAIL';
export const GET_ELECTRICITY_DETAIL_LOADING = 'GET_ELECTRICITY_DETAIL_LOADING';
export const GET_ELECTRICITY_DETAIL_SUCCESS = 'GET_ELECTRICITY_DETAIL_SUCCESS';
export const GET_ELECTRICITY_DETAIL_ERROR = 'GET_ELECTRICITY_DETAIL_ERROR';

export const GET_TRACE_DATA = 'GET_TRACE_DATA';
export const GET_TRACE_DATA_LOADING = 'GET_TRACE_DATA_LOADING';
export const GET_TRACE_DATA_SUCCESS = 'GET_TRACE_DATA_SUCCESS';
export const GET_TRACE_DATA_ERROR = 'GET_TRACE_DATA_ERROR';

export const GET_TRACE_DETAIL = 'GET_TRACE_DETAIL';
export const GET_TRACE_DETAIL_LOADING = 'GET_TRACE_DETAIL_LOADING';
export const GET_TRACE_DETAIL_SUCCESS = 'GET_TRACE_DETAIL_SUCCESS';
export const GET_TRACE_DETAIL_ERROR = 'GET_TRACE_DETAIL_ERROR';

export const CHANGE_TRACE_DETAIL_ID = 'CHANGE_TRACE_DETAIL_ID';

export const BREAD_SHOW = 'BREAD_SHOW';
export const GET_QX_BY_DS = 'GET_QX_BY_DS';
export const GET_QX_BY_DS_SUCCESS = 'GET_QX_BY_DS_SUCCESS';
export const GET_QX_BY_DS_ERROR = 'GET_QX_BY_DS_ERROR';

const state = {
    lading: true,
    siteData: [],
    siteDataTotal: 0,
    traceabilityId: '',
    siteDetailData: [],
    siteDetailLoading: true,
    tableShow: true,
    detailShow: false,
    traceabilityLoading: true,
    traceabilityData: [],
    traceabilityShow: false,
    traceDetailLoading: true,
    traceDetailData: {},
    traceDetailShow: false,
    traceDetailId: '',
    qxData: [],
};

const mutations = {
    [CHANGE_TRACE_DETAIL_ID](state,res) {
        state.traceDetailId = res;
    },
    [CHANGE_ELECTRICITY_ID](state,res) {
        state.traceabilityId = res;
    },
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.siteData = [];
    },
    [GET_ELECTRICITY_INFO_LOADING](state) {
        state.lading = true;
    },
    [GET_ELECTRICITY_INFO_SUCCESS](state, res) {
        if (res) {
            res.map(item => {
                item.type = item.type === '01' ? '应收' : '应付';
            });
            state.siteData = res;
        }
        state.lading = false;
    },
    [GET_ELECTRICITY_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.lading = false;
    },
    [GET_ELECTRICITY_INFO_LOADING](state) {
        state.lading = true;
    },
    [POST_SEND_ACCOUNT_SUCCESS](state, res) {
        Message.success('发送报账成功！');
        state.lading = false;
    },
    [POST_SEND_ACCOUNT_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.lading = false;
    },
    [GET_ELECTRICITY_DETAIL_LOADING](state) {
        state.siteDetailLoading = true;
    },
    [GET_ELECTRICITY_DETAIL_SUCCESS](state, res) {
        if (res) {
            state.siteDetailData = res;
        }
        state.siteDetailLoading = false;
    },
    [GET_ELECTRICITY_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.siteDetailLoading = false;
    },
    [GET_TRACE_DATA_LOADING](state) {
        state.traceabilityLoading = true;
    },
    [GET_TRACE_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.traceabilityData = res.list;
        }
        state.traceabilityLoading = false;
    },
    [GET_TRACE_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.traceabilityLoading = false;
    },
    [GET_TRACE_DETAIL_LOADING](state) {
        state.traceDetailLoading = true;
    },
    [GET_TRACE_DETAIL_SUCCESS](state, res) {
        if (res) {
            state.traceDetailData = res;
        }
        state.traceDetailLoading = false;
    },
    [GET_TRACE_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.traceDetailLoading = false;
    },
    [GET_QX_BY_DS_SUCCESS](state, res) {
        if(res.length > 0) {
            const data = [];
            res.forEach(item => {
                data.push({
                    label: item,
                    value: item
                });
            });
            state.qxData = data;
        } else {
            state.qxData = [];
        }
    },
    [GET_QX_BY_DS_ERROR](state, res) {
        Message.error(res.msg || res.message);
    },
};

const actions = {
    // 获取首页列表数据
    async [GET_ELECTRICITY_INFO]({ commit }, params) {
        commit(GET_ELECTRICITY_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getElectricitySumData(params)
            );
            commit(GET_ELECTRICITY_INFO_SUCCESS, result);
            // return result;
        } catch(e) {
            commit(GET_ELECTRICITY_INFO_ERROR, e);
        }
    },
    // 发送报账
    async [POST_SEND_ACCOUNT]({ commit }, params) {
        commit(POST_SEND_ACCOUNT_LOADING);
        try {
            const result = await wrapResponse(
                api.postSendAccount(params)
            );
            commit(POST_SEND_ACCOUNT_SUCCESS, result);
            return result;
        } catch(e) {
            commit(POST_SEND_ACCOUNT_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_ELECTRICITY_DETAIL]({ commit }, params) {
        commit(GET_ELECTRICITY_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTraceDetail(params)
            );
            commit(GET_ELECTRICITY_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_ELECTRICITY_DETAIL_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [GET_TRACE_DATA]({ commit }, params) {
        commit(GET_TRACE_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.getTraceabilityData(params)
            );
            commit(GET_TRACE_DATA_SUCCESS, result);
        } catch(e) {
            commit(GET_TRACE_DATA_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [GET_TRACE_DETAIL]({ commit }, params) {
        commit(GET_TRACE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTraceDetail(params)
            );
            commit(GET_TRACE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_TRACE_DETAIL_ERROR, e);
        }
    },
     // 根据地市获取区县
     async [GET_QX_BY_DS]({ commit }, params) {
        try {
            const result = await wrapResponse(
                api.getQxByDs(params)
            );
            commit(GET_QX_BY_DS_SUCCESS, result);
        } catch(e) {
            commit(GET_QX_BY_DS_ERROR, e);
        }
    },
    
};

export const ELECTRICITY = 'electricitySum';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
