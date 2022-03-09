import * as api from '@/api/task/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_VOTE_INFO = 'GET_VOTE_INFO';
export const GET_VOTE_INFO_LOADING = 'GET_VOTE_INFO_LOADING';
export const GET_VOTE_INFO_SUCCESS = 'GET_VOTE_INFO_SUCCESS';
export const GET_VOTE_INFO_ERROR = 'GET_VOTE_INFO_ERROR';
export const CHANGE_VOTE_ID = 'CHANGE_VOTE_ID';

export const GET_PROP_INFO = 'GET_PROP_INFO';
export const GET_SETTI_INFO = 'GET_SETTI_INFO';

export const GET_VOTE_DETAIL = 'GET_VOTE_DETAIL';
export const GET_VOTE_DETAIL_LOADING = 'GET_VOTE_DETAIL_LOADING';
export const GET_VOTE_DETAIL_SUCCESS = 'GET_VOTE_DETAIL_SUCCESS';
export const GET_VOTE_DETAIL_ERROR = 'GET_VOTE_DETAIL_ERROR';

export const GET_VOTE_PROP_DETAIL = 'GET_VOTE_PROP_DETAIL';
export const GET_VOTE_SETTI_DETAIL = 'GET_VOTE_SETTI_DETAIL';

export const BATCH_VOTE = 'BATCH_VOTE';
export const BATCH_VOTE_LOADING = 'BATCH_VOTE_LOADING';
export const BATCH_VOTE_SUCCESS = 'BATCH_VOTE_SUCCESS';
export const BATCH_VOTE_ERROR = 'BATCH_VOTE_ERROR';
export const BATCH_VOTE_PROP = 'BATCH_VOTE_PROP';
export const BATCH_VOTE_PROP_LOADING = 'BATCH_VOTE_PROP_LOADING';
export const BATCH_VOTE_PROP_SUCCESS = 'BATCH_VOTE_PROP_SUCCESS';
export const BATCH_VOTE_PROP_ERROR = 'BATCH_VOTE_PROP_ERROR';
export const BATCH_VOTE_SETTI = 'BATCH_VOTE_SETTI';

export const SUBMIT_VOTE_SETTI_DETAIL = 'SUBMIT_VOTE_SETTI_DETAIL';
export const SUBMIT_VOTE_SETTI_DETAIL_LOADING = 'SUBMIT_VOTE_SETTI_DETAIL_LOADING';
export const SUBMIT_VOTE_SETTI_DETAIL_SUCCESS = 'SUBMIT_VOTE_SETTI_DETAIL_SUCCESS';
export const SUBMIT_VOTE_SETTI_DETAIL_ERROR = 'SUBMIT_VOTE_SETTI_DETAIL_ERROR';

export const CHANGE_TRACE_DETAIL_ID = 'CHANGE_TRACE_DETAIL_ID';

export const BREAD_SHOW = 'BREAD_SHOW';
export const CHANGE_CHECKED_OPTIONS  = 'CHANGE_CHECKED_OPTIONS ';
export const REST_DATA  = 'REST_DATA ';
export const GET_CONS_RESULT = 'GET_CONS_RESULT ';

const state = {
    loading: true,
    confirmData: [],
    confirmDataTotal: 0,
    confirmId: {},
    confirmDetailData: {
        voteResult: '同意',
        opinion: '',
    },
    confirmDetailLoading: true,
    tableShow: true,
    detailShow: false,
    proportionShow: false,
    settlementShow: false,
    searchInfo: {
        pageNum: 1,
        pageSize: 10,
        taskName: '金额结算投票',
        dataState: [],
        payType: '',
        towerCode: '',
    },
    traceabilityLoading: true,
    traceabilityData: [],
    traceabilityShow: false,
    traceDetailLoading: true,
    traceDetailData: [],
    traceDetailShow: false,
    traceDetailId: '',
    checkedOptions: [],
};

const mutations = {
    [REST_DATA](state,res) {
        if(res){
            state.searchInfo = res;
        } else {
            state.searchInfo = {
                pageNum: 1,
                pageSize: 10,
                dataState: '',
                taskName: state.searchInfo.taskName
            };
        }
    },
    [CHANGE_TRACE_DETAIL_ID](state,res) {
        state.traceDetailId = res;
    },
    [CHANGE_VOTE_ID](state,res) {
        state.confirmId = res;
    },
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.confirmData = [];
    },
    [GET_VOTE_INFO_LOADING](state) {
        state.loading = true;
    },
    [GET_VOTE_INFO_SUCCESS](state, res) {
        if (res && res.list) {
            state.confirmData = res.list;
            state.confirmDataTotal = res.total;
        }
        state.loading = false;
    },
    [GET_VOTE_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [GET_VOTE_DETAIL_LOADING](state) {
        state.confirmDetailLoading = true;
    },
    [GET_VOTE_DETAIL_SUCCESS](state, res) {
        if (res) {
            res.chinaMobile = parseFloat(res.chinaMobile ? res.chinaMobile : 0 )* 1000000 / 10000;
            res.chinaUnicom =  parseFloat(res.chinaUnicom? res.chinaUnicom: 0 )* 1000000 / 10000;
            res.chinaTelecom = parseFloat(res.chinaTelecom? res.chinaTelecom: 0 )* 1000000 / 10000;
            res.shareTax = parseFloat(res.shareTax? res.shareTax: 0 )* 1000000 / 10000; // 分摊税率
            res.addScale = parseFloat(res.addScale? res.addScale: 0 )* 1000000 / 10000; // 加成比例
            res.endTax = parseFloat(res.endTax? res.endTax: 0 )* 1000000 / 10000; // 结算税率
            res.mTaxRate = parseFloat(res.mTaxRate? res.mTaxRate: 0 )* 1000000 / 10000; // 税率
            res.voteResult = '同意';
            res.opinion = '';
            state.confirmDetailData = res;
        }
        state.confirmDetailLoading = false;
    },
    [GET_VOTE_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.confirmDetailLoading = false;
    },
    [BATCH_VOTE_LOADING](state) {
        state.loading = true;
    },
    [BATCH_VOTE_SUCCESS](state, res) {
        Message.success('投票成功');
    },
    [BATCH_VOTE_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [BATCH_VOTE_PROP_LOADING](state) {
        state.loading = true;
    },
    [BATCH_VOTE_PROP_SUCCESS](state, res) {
        Message.success('投票成功');
    },
    [BATCH_VOTE_PROP_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [SUBMIT_VOTE_SETTI_DETAIL_LOADING](state) {
        state.confirmDetailLoading = true;
    },
    [SUBMIT_VOTE_SETTI_DETAIL_SUCCESS](state, res) {
        Message.success('提交成功');
        state.confirmDetailLoading = false;
    },
    [SUBMIT_VOTE_SETTI_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.confirmDetailLoading = false;
    },
    [CHANGE_CHECKED_OPTIONS](state, res) {
        state.checkedOptions = res;
    },
};

const actions = {
    // 获取首页列表数据
    async [GET_VOTE_INFO]({ commit }, params) {
        commit(GET_VOTE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskVoteMeterData(params)
            );
            commit(GET_VOTE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_VOTE_INFO_ERROR, e);
        }
    },
    // 获取首页列表数据
    async [GET_PROP_INFO]({ commit }, params) {
        commit(GET_VOTE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskVotePropData(params)
            );
            commit(GET_VOTE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_VOTE_INFO_ERROR, e);
        }
    },
    // 获取首页列表数据
    async [GET_SETTI_INFO]({ commit }, params) {
        commit(GET_VOTE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskVoteSettiData(params)
            );
            commit(GET_VOTE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_VOTE_INFO_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_VOTE_DETAIL]({ commit }, params) {
        commit(GET_VOTE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskVoteDetail(params)
            );
            commit(GET_VOTE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_VOTE_DETAIL_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_VOTE_PROP_DETAIL]({ commit }, params) {
        commit(GET_VOTE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskVotePropDetail(params)
            );
            commit(GET_VOTE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_VOTE_DETAIL_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_VOTE_SETTI_DETAIL]({ commit }, params) {
        commit(GET_VOTE_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskVoteSettiDetail(params)
            );
            commit(GET_VOTE_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_VOTE_DETAIL_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [BATCH_VOTE_PROP]({ commit }, params) {
        commit(BATCH_VOTE_PROP_LOADING);
        try {
            const result = await wrapResponse(
                api.batchVoteProp(params)
            );
            commit(BATCH_VOTE_PROP_SUCCESS, result);
        } catch(e) {
            commit(BATCH_VOTE_PROP_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [BATCH_VOTE]({ commit }, params) {
        commit(BATCH_VOTE_LOADING);
        try {
            const result = await wrapResponse(
                api.batchVote(params)
            );
            commit(BATCH_VOTE_SUCCESS, result);
        } catch(e) {
            commit(BATCH_VOTE_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [BATCH_VOTE_SETTI]({ commit }, params) {
        commit(BATCH_VOTE_LOADING);
        try {
            const result = await wrapResponse(
                api.batchVoteSetti(params)
            );
            commit(BATCH_VOTE_SUCCESS, result);
        } catch(e) {
            commit(BATCH_VOTE_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [SUBMIT_VOTE_SETTI_DETAIL]({ commit }, params) {
        commit(SUBMIT_VOTE_SETTI_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.batchVoteSetti(params)
            );
            commit(SUBMIT_VOTE_SETTI_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(SUBMIT_VOTE_SETTI_DETAIL_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [GET_CONS_RESULT]({ commit }, params) {
        try {
            const result = await wrapResponse(
                api.existInConsResult(params)
            );
            return result;
        } catch(e) {
            commit(SUBMIT_VOTE_SETTI_DETAIL_ERROR, e);
        }
    },
    
};

export const VOTE = 'vote';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
