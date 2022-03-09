import * as api from '@/api/search/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_SHARE_INFO = 'GET_SHARE_INFO';
export const GET_SHARE_INFO_LOADING = 'GET_SHARE_INFO_LOADING';
export const GET_SHARE_INFO_SUCCESS = 'GET_SHARE_INFO_SUCCESS';
export const GET_SHARE_INFO_ERROR = 'GET_SHARE_INFO_ERROR';
export const CHANGE_SHARE_ID = 'CHANGE_SHARE_ID';

export const GET_SHARE_DETAIL = 'GET_SHARE_DETAIL';
export const GET_SHARE_DETAIL_LOADING = 'GET_SHARE_DETAIL_LOADING';
export const GET_SHARE_DETAIL_SUCCESS = 'GET_SHARE_DETAIL_SUCCESS';
export const GET_SHARE_DETAIL_ERROR = 'GET_SHARE_DETAIL_ERROR';

export const GET_HISTORY_DATA = 'GET_HISTORY_DATA';
export const GET_HISTORY_DATA_LOADING = 'GET_HISTORY_DATA_LOADING';
export const GET_HISTORY_DATA_SUCCESS = 'GET_HISTORY_DATA_SUCCESS';
export const GET_HISTORY_DATA_ERROR = 'GET_HISTORY_DATA_ERROR';
export const CHANGE_HISTORY_ID = 'CHANGE_HISTORY_ID';

export const GET_HISTORY_DETAIL = 'GET_HISTORY_DETAIL';
export const GET_HISTORY_DETAIL_LOADING = 'GET_HISTORY_DETAIL_LOADING';
export const GET_HISTORY_DETAIL_SUCCESS = 'GET_HISTORY_DETAIL_SUCCESS';
export const GET_HISTORY_DETAIL_ERROR = 'GET_HISTORY_DETAIL_ERROR';

export const GET_TRACE_DATA = 'GET_TRACE_DATA';
export const GET_TRACE_DATA_LOADING = 'GET_TRACE_DATA_LOADING';
export const GET_TRACE_DATA_SUCCESS = 'GET_TRACE_DATA_SUCCESS';
export const GET_TRACE_DATA_ERROR = 'GET_TRACE_DATA_ERROR';

export const CHANGE_TRACE_DETAIL_ID = 'CHANGE_TRACE_DETAIL_ID';

export const BREAD_SHOW = 'BREAD_SHOW';

const state = {
    shareLoading: true,
    shareData: [],
    shareDataTotal: 0,
    shareId: '',
    shareDetailData: [],
    shareDetailLoading: true,
    tableShow: true,
    detailShow: false,
    historyLoading: true,
    historyData: [],
    historyShow: false,
    historyId: '',
    historyDetailLoading: false,
    historyDetailData: [],
    historyDetailShow: false,

    traceabilityLoading: true,
    traceabilityData: [],
    traceabilityShow: false,
    traceDetailId: {},
};

const mutations = {
    [CHANGE_TRACE_DETAIL_ID](state,res) {
        res.chinaMobile = parseFloat(res.chinaMobile ? res.chinaMobile : 0 )* 1000000 / 10000; // 分摊税率
        res.chinaUnicom = parseFloat(res.chinaUnicom ? res.chinaUnicom: 0 )* 1000000 / 10000; // 加成比例
        res.chinaTelecom = parseFloat(res.chinaTelecom ? res.chinaTelecom: 0 )* 1000000 / 10000; // 结算税率
        res.shareTax = parseFloat(res.shareTax ? res.shareTax: 0 )* 1000000 / 10000; // 分摊税率
        res.addScale = parseFloat(res.addScale ? res.addScale: 0 )* 1000000 / 10000; // 加成比例
        res.endTax = parseFloat(res.endTax ? res.endTax: 0 )* 1000000 / 10000; // 结算税率
        res.mTaxRate = parseFloat(res.mTaxRate ? res.mTaxRate: 0 )* 1000000 / 10000; // 税率
        state.traceDetailId = res;
    },
    [CHANGE_SHARE_ID](state,res) {
        state.shareId = res;
    },
    [CHANGE_HISTORY_ID](state,res) {
        state.historyId = res;
    },
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.shareData = [];
    },
    [GET_SHARE_INFO_LOADING](state) {
        state.shareLoading = true;
    },
    [GET_SHARE_INFO_SUCCESS](state, res) {
        if (res && res.list) {
            // res.list.map(item => {
            //     item.chinaMobile = item.chinaMobile * 10000 / 100 + '%';
            //     item.chinaUnicom = item.chinaUnicom * 10000 / 100 + '%';
            //     item.chinaTelecom = item.chinaTelecom * 10000 / 100 + '%';
            // });
            state.shareData = res.list;
            state.shareDataTotal = res.total;
        }
        state.shareLoading = false;
    },
    [GET_SHARE_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.shareLoading = false;
    },
    [GET_SHARE_DETAIL_LOADING](state) {
        state.shareDetailLoading = true;
    },
    [GET_SHARE_DETAIL_SUCCESS](state, res) {
        if (res) {
            res.shareTax = parseFloat(res.shareTax? res.shareTax: 0 )* 1000000 / 10000; // 分摊税率
            res.addScale = parseFloat(res.addScale? res.addScale: 0 )* 1000000 / 10000; // 加成比例
            res.endTax = parseFloat(res.endTax? res.endTax: 0 )* 1000000 / 10000; // 结算税率
            res.mTaxRate = parseFloat(res.mTaxRate? res.mTaxRate: 0 )* 1000000 / 10000; // 税率
            state.shareDetailData = res;
        }
        state.shareDetailLoading = false;
    },
    [GET_SHARE_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.shareDetailLoading = false;
    },
    [GET_HISTORY_DATA_LOADING](state) {
        state.historyLoading = true;
    },
    [GET_HISTORY_DATA_SUCCESS](state, res) {
        if (res && res.list) {
            state.historyData = res.list;
        }
        state.historyLoading = false;
    },
    [GET_HISTORY_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.historyLoading = false;
    },
    [GET_HISTORY_DETAIL_LOADING](state) {
        state.historyDetailLoading = true;
    },
    [GET_HISTORY_DETAIL_SUCCESS](state, res) {
        if (res) {
            res.chinaMobile = parseFloat(res.chinaMobile ? res.chinaMobile : 0 )* 1000000 / 10000; // 分摊税率
            res.chinaUnicom = parseFloat(res.chinaUnicom ? res.chinaUnicom: 0 )* 1000000 / 10000; // 加成比例
            res.chinaTelecom = parseFloat(res.chinaTelecom ? res.chinaTelecom: 0 )* 1000000 / 10000; // 结算税率
            res.shareTax = parseFloat(res.shareTax? res.shareTax: 0 )* 1000000 / 10000; // 分摊税率
            res.addScale = parseFloat(res.addScale? res.addScale: 0 )* 1000000 / 10000; // 加成比例
            res.endTax = parseFloat(res.endTax? res.endTax: 0 )* 1000000 / 10000; // 结算税率
            res.mTaxRate = parseFloat(res.mTaxRate? res.mTaxRate: 0 )* 1000000 / 10000; // 税率
            res.addScale = parseFloat(res.addScale? res.addScale: 0 )* 1000000 / 10000; // 加成比例
            state.historyDetailData = res;
        }
        state.historyDetailLoading = false;
    },
    [GET_HISTORY_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.historyDetailLoading = false;
    },

    [GET_TRACE_DATA_LOADING](state) {
        state.traceabilityLoading = true;
    },
    [GET_TRACE_DATA_SUCCESS](state, res) {
        if (res) {
            res.shareTax = parseFloat(res.shareTax? res.shareTax: 0 )* 1000000 / 10000; // 分摊税率
            res.addScale = parseFloat(res.addScale? res.addScale: 0 )* 1000000 / 10000; // 加成比例
            res.endTax = parseFloat(res.endTax? res.endTax: 0 )* 1000000 / 10000; // 结算税率
            res.mTaxRate = parseFloat(res.mTaxRate? res.mTaxRate: 0 )* 1000000 / 10000; // 税率
            state.traceabilityData = res;
        }
        state.traceabilityLoading = false;
    },
    [GET_TRACE_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.traceabilityLoading = false;
    },
};

const actions = {
    // 获取首页列表数据
    async [GET_SHARE_INFO]({ commit }, params) {
        commit(GET_SHARE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getShareAccountData(params)
            );
            commit(GET_SHARE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_SHARE_INFO_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_SHARE_DETAIL]({ commit }, params) {
        commit(GET_SHARE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getShareAccountDetailData(params)
            );
            commit(GET_SHARE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_SHARE_DETAIL_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [GET_HISTORY_DATA]({ commit }, params) {
        commit(GET_HISTORY_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.getShareAccountHistoryData(params)
            );
            commit(GET_HISTORY_DATA_SUCCESS, result);
        } catch(e) {
            commit(GET_HISTORY_DATA_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [GET_HISTORY_DETAIL]({ commit }, params) {
        commit(GET_HISTORY_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getShareAccountHistoryDetail(params)
            );
            commit(GET_HISTORY_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_HISTORY_DETAIL_ERROR, e);
        }
    },
    // 获取区块链溯源数据
    async [GET_TRACE_DATA]({ commit }, params) {
        commit(GET_TRACE_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.getShareAccountTraceabilityData(params)
            );
            commit(GET_TRACE_DATA_SUCCESS, result);
        } catch(e) {
            commit(GET_TRACE_DATA_ERROR, e);
        }
    },
    
};

export const SHARE = 'shareAmount';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
