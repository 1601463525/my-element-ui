import * as api from '@/api/task/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_CONFIRM_INFO = 'GET_CONFIRM_INFO';
export const GET_CONFIRM_INFO_LOADING = 'GET_CONFIRM_INFO_LOADING';
export const GET_CONFIRM_INFO_SUCCESS = 'GET_CONFIRM_INFO_SUCCESS';
export const GET_CONFIRM_INFO_ERROR = 'GET_CONFIRM_INFO_ERROR';
export const CHANGE_CONFIRM_ID = 'CHANGE_CONFIRM_ID';

export const GET_PROP_INFO = 'GET_PROP_INFO';
export const GET_SETTI_INFO = 'GET_SETTI_INFO';

export const GET_CONFIRM_DETAIL = 'GET_CONFIRM_DETAIL';
export const GET_CONFIRM_DETAIL_LOADING = 'GET_CONFIRM_DETAIL_LOADING';
export const GET_CONFIRM_DETAIL_SUCCESS = 'GET_CONFIRM_DETAIL_SUCCESS';
export const GET_CONFIRM_DETAIL_ERROR = 'GET_CONFIRM_DETAIL_ERROR';

export const GET_CONFIRM_PROP_DETAIL = 'GET_CONFIRM_PROP_DETAIL';
export const GET_CONFIRM_SETTI_DETAIL = 'GET_CONFIRM_SETTI_DETAIL';

export const BATCH_CONFIRM = 'BATCH_CONFIRM';
export const BATCH_CONFIRM_LOADING = 'BATCH_CONFIRM_LOADING';
export const BATCH_CONFIRM_SUCCESS = 'BATCH_CONFIRM_SUCCESS';
export const BATCH_CONFIRM_ERROR = 'BATCH_CONFIRM_ERROR';
export const BATCH_CONFIRM_PROP = 'BATCH_CONFIRM_PROP';
export const BATCH_CONFIRM_SETTI = 'BATCH_CONFIRM_SETTI';

export const SUBMIT_CONFIRM_SETTI_DETAIL = 'SUBMIT_CONFIRM_SETTI_DETAIL';
export const SUBMIT_CONFIRM_SETTI_DETAIL_LOADING = 'SUBMIT_CONFIRM_SETTI_DETAIL_LOADING';
export const SUBMIT_CONFIRM_SETTI_DETAIL_SUCCESS = 'SUBMIT_CONFIRM_SETTI_DETAIL_SUCCESS';
export const SUBMIT_CONFIRM_SETTI_DETAIL_ERROR = 'SUBMIT_CONFIRM_SETTI_DETAIL_ERROR';

export const CHANGE_TRACE_DETAIL_ID = 'CHANGE_TRACE_DETAIL_ID';

export const BREAD_SHOW = 'BREAD_SHOW';
export const CHANGE_CHECKED_OPTIONS  = 'CHANGE_CHECKED_OPTIONS ';
export const REST_DATA  = 'REST_DATA ';

const state = {
    loading: true,
    confirmData: [],
    confirmDataTotal: 0,
    confirmId: '',
    confirmDetailData: {},
    confirmDetailLoading: true,
    tableShow: true,
    detailShow: false,
    proportionShow: false,
    settlementShow: false,
    settlementData: false,
    searchInfo: {
        pageNum: 1,
        pageSize: 10,
        taskName: '金额结算投票',
        nextFlowSeqId: '',
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
    edit: true,
};

const mutations = {
    [REST_DATA](state,res) {
        if(res){
            state.searchInfo = res;
        } else {
            state.searchInfo = {
                pageNum: 1,
                pageSize: 10,
                nextFlowSeqId: '',
                taskName: state.searchInfo.taskName
            };
        }
    },
    [CHANGE_TRACE_DETAIL_ID](state,res) {
        state.traceDetailId = res;
    },
    [CHANGE_CONFIRM_ID](state,res) {
        state.confirmId = res;
    },
    [BREAD_SHOW](state,res) {
        state[res.key] = res.value;
    },
    [CLEAR_DATA](state) {
        state.confirmData = [];
    },
    [GET_CONFIRM_INFO_LOADING](state) {
        state.loading = true;
    },
    [GET_CONFIRM_INFO_SUCCESS](state, res) {
        if (res && res.list) {
            state.confirmData = res.list;
            state.confirmDataTotal = res.total;
        }
        state.loading = false;
    },
    [GET_CONFIRM_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [GET_CONFIRM_DETAIL_LOADING](state) {
        state.confirmDetailLoading = true;
    },
    [GET_CONFIRM_DETAIL_SUCCESS](state, res) {
        if (res) {
            res.chinaMobile = parseFloat(res.chinaMobile ? res.chinaMobile : 0 )* 1000000 / 10000;
            res.chinaUnicom = parseFloat(res.chinaUnicom? res.chinaUnicom: 0 )* 1000000 / 10000;
            res.chinaTelecom = parseFloat(res.chinaTelecom? res.chinaTelecom: 0 )* 1000000 / 10000;
            res.shareTax = parseFloat(res.shareTax? res.shareTax: 0 )* 1000000 / 10000; // 分摊税率
            res.addScale = parseFloat(res.addScale? res.addScale: 0 )* 1000000 / 10000; // 加成比例
            res.endTax = parseFloat(res.endTax? res.endTax: 0 )* 1000000 / 10000; // 结算税率
            state.confirmDetailData = res;
        }
        state.confirmDetailLoading = false;
    },
    [GET_CONFIRM_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.confirmDetailLoading = false;
    },
    [BATCH_CONFIRM_LOADING](state) {
        state.loading = true;
    },
    [BATCH_CONFIRM_SUCCESS](state, res) {
        Message.success('确认成功');
    },
    [BATCH_CONFIRM_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [SUBMIT_CONFIRM_SETTI_DETAIL_LOADING](state) {
        state.confirmDetailLoading = true;
    },
    [SUBMIT_CONFIRM_SETTI_DETAIL_SUCCESS](state, res) {
        Message.success('提交成功');
        state.confirmDetailLoading = false;
    },
    [SUBMIT_CONFIRM_SETTI_DETAIL_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.confirmDetailLoading = false;
    },
    [CHANGE_CHECKED_OPTIONS](state, res) {
        state.checkedOptions = res;
    },
  
};

const actions = {
    // 获取首页列表数据
    async [GET_CONFIRM_INFO]({ commit }, params) {
        commit(GET_CONFIRM_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskConfirmMeterData(params)
            );
            commit(GET_CONFIRM_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_CONFIRM_INFO_ERROR, e);
        }
    },
    // 获取首页列表数据
    async [GET_PROP_INFO]({ commit }, params) {
        commit(GET_CONFIRM_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskConfirmPropData(params)
            );
            commit(GET_CONFIRM_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_CONFIRM_INFO_ERROR, e);
        }
    },
    // 获取首页列表数据
    async [GET_SETTI_INFO]({ commit }, params) {
        commit(GET_CONFIRM_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskConfirmSettiData(params)
            );
            commit(GET_CONFIRM_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_CONFIRM_INFO_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_CONFIRM_DETAIL]({ commit }, params) {
        commit(GET_CONFIRM_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskConfirmDetail(params)
            );
            commit(GET_CONFIRM_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_CONFIRM_DETAIL_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_CONFIRM_PROP_DETAIL]({ commit }, params) {
        commit(GET_CONFIRM_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskConfirmPropDetail(params)
            );
            commit(GET_CONFIRM_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(GET_CONFIRM_DETAIL_ERROR, e);
        }
    },
    // 获取首页异常告警数据
    async [GET_CONFIRM_SETTI_DETAIL]({ commit }, params) {
        commit(GET_CONFIRM_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.getTaskConfirmSettiDetail(params)
            );
            commit(GET_CONFIRM_DETAIL_SUCCESS, result);
            return result;
        } catch(e) {
            commit(GET_CONFIRM_DETAIL_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [BATCH_CONFIRM]({ commit }, params) {
        commit(BATCH_CONFIRM_LOADING);
        try {
            const result = await wrapResponse(
                api.batchConfirm(params)
            );
            commit(BATCH_CONFIRM_SUCCESS, result);
        } catch(e) {
            commit(BATCH_CONFIRM_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [BATCH_CONFIRM_SETTI]({ commit }, params) {
        commit(BATCH_CONFIRM_LOADING);
        try {
            const result = await wrapResponse(
                api.batchConfirmSetti(params)
            );
            commit(BATCH_CONFIRM_SUCCESS, result);
        } catch(e) {
            commit(BATCH_CONFIRM_ERROR, e);
        }
    },
    // 获取首页有站址无电表数据
    async [BATCH_CONFIRM_PROP]({ commit }, params) {
        commit(BATCH_CONFIRM_LOADING);
        try {
            const result = await wrapResponse(
                api.batchConfirmProp(params)
            );
            commit(BATCH_CONFIRM_SUCCESS, result);
        } catch(e) {
            commit(BATCH_CONFIRM_ERROR, e);
        }
    },
    // 获取首页有电表无站址数据
    async [SUBMIT_CONFIRM_SETTI_DETAIL]({ commit }, params) {
        commit(SUBMIT_CONFIRM_SETTI_DETAIL_LOADING);
        try {
            const result = await wrapResponse(
                api.submitConfirmSettiDetail(params)
            );
            commit(SUBMIT_CONFIRM_SETTI_DETAIL_SUCCESS, result);
        } catch(e) {
            commit(SUBMIT_CONFIRM_SETTI_DETAIL_ERROR, e);
        }
    },
    
};

export const CONFIRM = 'confirm';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
