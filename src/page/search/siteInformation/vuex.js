import * as api from '@/api/search/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_SITE_INFO = 'GET_SITE_INFO';
export const GET_SITE_INFO_LOADING = 'GET_SITE_INFO_LOADING';
export const GET_SITE_INFO_SUCCESS = 'GET_SITE_INFO_SUCCESS';
export const GET_SITE_INFO_ERROR = 'GET_SITE_INFO_ERROR';
export const CHANGE_SITE_ID = 'CHANGE_SITE_ID';

export const GET_SITE_DETAIL = 'GET_SITE_DETAIL';
export const GET_SITE_DETAIL_LOADING = 'GET_SITE_DETAIL_LOADING';
export const GET_SITE_DETAIL_SUCCESS = 'GET_SITE_DETAIL_SUCCESS';
export const GET_SITE_DETAIL_ERROR = 'GET_SITE_DETAIL_ERROR';

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
    [GET_SITE_DETAIL_LOADING](state) {
        state.siteDetailLoading = true;
    },
    [GET_SITE_DETAIL_SUCCESS](state, res) {
        if (res) {
            state.siteDetailData = res;
        }
        state.siteDetailLoading = false;
    },
    [GET_SITE_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.siteDetailLoading = false;
    },
    [GET_STATION_DATA_LOADING](state) {
        state.stationLoading = true;
    },
    [GET_STATION_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.stationData = res.list;
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
    async [GET_SITE_INFO]({ commit }, params) {
        commit(GET_SITE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getSiteInformationData(params)
            );
            commit(GET_SITE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_SITE_INFO_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_SITE_DETAIL]({ commit }, params) {
        commit(GET_SITE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getSiteDetailData(params)
            );
            commit(GET_SITE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_SITE_DETAIL_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [GET_STATION_DATA]({ commit }, params) {
        commit(GET_STATION_DATA_LOADING);
        // try {
        //     const result = await wrapResponse(
        //         api.getStationData(params)
        //     );
        //     commit(GET_STATION_DATA_SUCCESS, result);
        // } catch(e) {
        //     commit(GET_STATION_DATA_ERROR, e);
        // }
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

export const SITE = 'siteInformation';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
