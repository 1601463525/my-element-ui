import * as api from '@/api/home/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_HOME_INFO = 'GET_HOME_INFO';
export const GET_HOME_INFO_LOADING = 'GET_HOME_INFO_LOADING';
export const GET_HOME_INFO_SUCCESS = 'GET_HOME_INFO_SUCCESS';
export const GET_HOME_INFO_ERROR = 'GET_HOME_INFO_ERROR';

export const GET_ABNORMAL_DATA = 'GET_ABNORMAL_DATA';
export const GET_ABNORMAL_DATA_LOADING = 'GET_ABNORMAL_DATA_LOADING';
export const GET_ABNORMAL_DATA_SUCCESS = 'GET_ABNORMAL_DATA_SUCCESS';
export const GET_ABNORMAL_DATA_ERROR = 'GET_ABNORMAL_DATA_ERROR';

export const GET_STATION_DATA = 'GET_STATION_DATA';
export const GET_STATION_DATA_LOADING = 'GET_STATION_DATA_LOADING';
export const GET_STATION_DATA_SUCCESS = 'GET_STATION_DATA_SUCCESS';
export const GET_STATION_DATA_ERROR = 'GET_STATION_DATA_ERROR';

export const GET_METERS_DATA = 'GET_METERS_DATA';
export const GET_METERS_DATA_LOADING = 'GET_METERS_DATA_LOADING';
export const GET_METERS_DATA_SUCCESS = 'GET_METERS_DATA_SUCCESS';
export const GET_METERS_DATA_ERROR = 'GET_METERS_DATA_ERROR';

export const BREAD_SHOW = 'BREAD_SHOW';

const state = {
    homeInfo: [],
    loading: true,
    abnormalData: [],
    abnormalTotal: [],
    abnormalLoading: true,
    homeShow: true,
    abnormalShow: false,
    stationLoading: true,
    stationData: [],
    stationTotal: [],
    stationShow: false,
    metersLoading: true,
    metersData: [],
    metersTotal: [],
    metersShow: false,
    ds: '',
    qx: '',
};

const mutations = {
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.homeInfo = [];
    },
    [GET_HOME_INFO_LOADING](state) {
        state.loading = true;
    },
    [GET_HOME_INFO_SUCCESS](state, res) {
        if (res) {
            state.homeInfo = res;
        }
        state.loading = false;
    },
    [GET_HOME_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [GET_ABNORMAL_DATA_LOADING](state) {
        state.abnormalLoading = true;
    },
    [GET_ABNORMAL_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.abnormalData = res.list;
            state.abnormalTotal = res.total;
        }
        state.abnormalLoading = false;
    },
    [GET_ABNORMAL_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.abnormalLoading = false;
    },
    [GET_STATION_DATA_LOADING](state) {
        state.stationLoading = true;
    },
    [GET_STATION_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.stationData = res.list;
            state.stationTotal = res.total;
        }
        state.stationLoading = false;
    },
    [GET_STATION_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.stationLoading = false;
    },
    [GET_METERS_DATA_LOADING](state) {
        state.metersLoading = true;
    },
    [GET_METERS_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.metersData = res.list;
            state.metersTotal = res.total;
        }
        state.metersLoading = false;
    },
    [GET_METERS_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.metersLoading = false;
    },
};

const actions = {
    // 获取首页列表数据
    async [GET_HOME_INFO]({ commit }, params) {
        commit(GET_HOME_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getHomeData(params)
            );
            commit(GET_HOME_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_HOME_INFO_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_ABNORMAL_DATA]({ commit }, params) {
        commit(GET_ABNORMAL_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.getAbnormalData(params)
            );
            commit(GET_ABNORMAL_DATA_SUCCESS, result);
        } catch(e) {
            commit(GET_ABNORMAL_DATA_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [GET_STATION_DATA]({ commit }, params) {
        commit(GET_STATION_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.getStationData(params)
            );
            commit(GET_STATION_DATA_SUCCESS, result);
        } catch(e) {
            commit(GET_STATION_DATA_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [GET_METERS_DATA]({ commit }, params) {
        commit(GET_METERS_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.getMerersData(params)
            );
            commit(GET_METERS_DATA_SUCCESS, result);
        } catch(e) {
            commit(GET_METERS_DATA_ERROR, e);
        }
    },
    
};

export const HOME = 'home';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
