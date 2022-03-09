import * as api from '@/api/search/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const GET_METERS_TABLE = 'GET_METERS_TABLE';
export const GET_METERS_TABLE_LOADING = 'GET_METERS_TABLE_LOADING';
export const GET_METERS_TABLE_SUCCESS = 'GET_METERS_TABLE_SUCCESS';
export const GET_METERS_TABLE_ERROR = 'GET_METERS_TABLE_ERROR';

export const GET_METER_DETAIL = 'GET_METER_DETAIL';
export const GET_METER_DETAIL_LOADING = 'GET_METER_DETAIL_LOADING';
export const GET_METER_DETAIL_SUCCESS = 'GET_METER_DETAIL_SUCCESS';
export const GET_METER_DETAIL_ERROR = 'GET_METER_DETAIL_ERROR';

export const GET_METER_TRACE_LIST = 'GET_METER_TRACE_LIST';
export const GET_METER_TRACE_LIST_LOADING = 'GET_METER_TRACE_LIST_LOADING';
export const GET_METER_TRACE_LIST_SUCCESS = 'GET_METER_TRACE_LIST_SUCCESS';
export const GET_METER_TRACE_LIST_ERROR = 'GET_METER_TRACE_LIST_ERROR';

export const GET_METER_TRACE_DETAIL = 'GET_METER_TRACE_DETAIL';
export const GET_METER_TRACE_DETAIL_LOADING = 'GET_METER_TRACE_DETAIL_LOADING';
export const GET_METER_TRACE_DETAIL_SUCCESS = 'GET_METER_TRACE_DETAIL_SUCCESS';
export const GET_METER_TRACE_DETAIL_ERROR = 'GET_METER_TRACE_DETAIL_ERROR';

export const GET_METER_TRACE_LINE = 'GET_METER_TRACE_LINE';
export const GET_METER_TRACE_LINE_LOADING = 'GET_METER_TRACE_LINE_LOADING';
export const GET_METER_TRACE_LINE_SUCCESS = 'GET_METER_TRACE_LINE_SUCCESS';
export const GET_METER_TRACE_LINE_ERROR = 'GET_METER_TRACE_LINE_ERROR';

export const MODIFY_CONTENT_DISPLAY = 'MODIFY_CONTENT_DISPLAY';
export const MODIFY_METER_ID = 'MODIFY_METER_ID';
export const MODIFY_TRACE_ID = 'MODIFY_TRACE_ID';

const state = {
    metersInfoLoading: false,
    historyLoading: false,
    traceListLoading: false,
    traceDetailLoading: false,
    traceLineLoading: false,
    metersInfo: [],
    metersTotal: 0,
    tableShow: true,
    historyShow: false,
    historyTraceShow: false,
    traceLineShow: false,
    meterId: {},
    meterDetail: {},
    traceList: [],
    traceDetailInfo: {},
    traceId: {},
    traceLineInfo: []
};

const mutations = {
    // 电表信息mutation
    [GET_METERS_TABLE_LOADING](state) {
        state.metersInfoLoading = true;
    },
    [GET_METERS_TABLE_SUCCESS](state, res) {
        if (res && res.list) {
            state.metersInfo = res.list;
            state.metersTotal = res.total;
        }
        state.metersInfoLoading = false;
    },
    [GET_METERS_TABLE_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.metersInfoLoading = false;
    },

    // 历史信息mutation
    [GET_METER_DETAIL_LOADING](state) {
        state.historyLoading = true;
    },
    [GET_METER_DETAIL_SUCCESS](state, res) {
        if (res) {
            state.meterDetail = res;
        }
        state.historyLoading = false;
    },
    [GET_METER_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.historyLoading = false;
    },

    // 历史轨迹列表mutation
    [GET_METER_TRACE_LIST_LOADING](state) {
        state.traceListLoading = true;
    },
    [GET_METER_TRACE_LIST_SUCCESS](state, res) {
        if (res && res.list) {
            state.traceList = res.list;
        }
        state.traceListLoading = false;
    },
    [GET_METER_TRACE_LIST_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.traceListLoading = false;
    },

    // 历史轨迹详情mutation
    [GET_METER_TRACE_DETAIL_LOADING](state) {
        state.traceDetailLoading = true;
    },
    [GET_METER_TRACE_DETAIL_SUCCESS](state, res) {
        if (res) {
            state.traceDetailInfo = res;
        }
        state.traceDetailLoading = false;
    },
    [GET_METER_TRACE_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.traceDetailLoading = false;
    },

    // 区块溯源信息
    [GET_METER_TRACE_LINE_LOADING](state) {
        state.traceLineLoading = true;
    },
    [GET_METER_TRACE_LINE_SUCCESS](state, res) {
        if (res && res.length > 0) {
            state.traceLineInfo = res;
        } else {
            state.traceLineInfo = [];
        }
        state.traceLineLoading = false;
    },
    [GET_METER_TRACE_LINE_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.traceLineLoading = false;
    },

    // 修改页面显示
    [MODIFY_CONTENT_DISPLAY](state, dict) {
        state[dict.key] = dict.value;
    },

    // 修改电表id
    [MODIFY_METER_ID](state, id) {
        state.meterId = id;
    },

    // 修改轨迹id
    [MODIFY_TRACE_ID](state, id) {
        id.mTaxRate = parseFloat(id.mTaxRate ? id.mTaxRate : 0 )* 1000000 / 10000;
        state.traceId = id;
    }
};

const actions = {
    // 获取电表信息列表数据
    async [GET_METERS_TABLE]({ commit }, params) {
        commit(GET_METERS_TABLE_LOADING);
        try {
            const result = await wrapResponse(
                api.getMetersInfo(params)
            );
            commit(GET_METERS_TABLE_SUCCESS, result);
        } catch(e) {
            commit(GET_METERS_TABLE_ERROR, e);
        }
    },

    // 获取历史信息数据
    async [GET_METER_DETAIL]({ commit }, params) {
        commit(GET_METER_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getMeterDetail(params)
            );
            commit(GET_METER_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_METER_DETAIL_ERROR, e);
        }
    },

    // 获取历史轨迹列表
    async [GET_METER_TRACE_LIST]({ commit }, params) {
        commit(GET_METER_TRACE_LIST_LOADING);
        try {
            const result = await wrapResponse(
                api.getMeterTraceList(params)
            );
            commit(GET_METER_TRACE_LIST_SUCCESS, result);
        } catch(e) {
            commit(GET_METER_TRACE_LIST_ERROR, e);
        }
    },

    // 获取历史轨迹详情
    async [GET_METER_TRACE_DETAIL]({ commit }, params) {
        commit(GET_METER_TRACE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getMeterTraceDetail(params)
            );
            commit(GET_METER_TRACE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_METER_TRACE_DETAIL_ERROR, e);
        }
    },

    async [GET_METER_TRACE_LINE]({ commit }, params) {
        commit(GET_METER_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getMeterTraceLine(params)
            );
            commit(GET_METER_TRACE_LINE_SUCCESS, result);
        } catch(e) {
            commit(GET_METER_TRACE_LINE_ERROR, e);
        }
    }
};

export const METERS_INFO = 'metersInfo';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
