import * as api from '@/api/base/fixedRatio/index';
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

export const ADD_FIXED_RATIO = 'ADD_FIXED_RATIO';
export const ADD_FIXED_RATIO_LOADING = 'ADD_FIXED_RATIO_LOADING';
export const ADD_FIXED_RATIO_SUCCESS = 'ADD_FIXED_RATIO_SUCCESS';
export const ADD_FIXED_RATIO_ERROR = 'ADD_FIXED_RATIO_ERROR';

export const EDIT_FIXED_RATIO = 'EDIT_FIXED_RATIO';
export const EDIT_FIXED_RATIO_LOADING = 'EDIT_FIXED_RATIO_LOADING';
export const EDIT_FIXED_RATIO_SUCCESS = 'EDIT_FIXED_RATIO_SUCCESS';
export const EDIT_FIXED_RATIO_ERROR = 'EDIT_FIXED_RATIO_ERROR';


export const GET_QX_BY_DS = 'GET_QX_BY_DS';
export const GET_QX_BY_DS_LOADING = 'GET_QX_BY_DS_LOADING';
export const GET_QX_BY_DS_SUCCESS = 'GET_QX_BY_DS_SUCCESS';
export const GET_QX_BY_DS_ERROR = 'GET_QX_BY_DS_ERROR';

export const UPLOAD_EXECL_DATA = 'UPLOAD_EXECL_DATA';
export const UPLOAD_EXECL_DATA_LOADING = 'UPLOAD_EXECL_DATA_LOADING';
export const UPLOAD_EXECL_DATA_SUCCESS = 'UPLOAD_EXECL_DATA_SUCCESS';
export const UPLOAD_EXECL_DATA_ERROR = 'UPLOAD_EXECL_DATA_ERROR';

export const BREAD_SHOW = 'BREAD_SHOW';
export const CHANGE_CHECKED_OPTIONS = 'CHANGE_CHECKED_OPTIONS';
export const CHANGE_SHUNT_LIST = 'CHANGE_SHUNT_LIST';
export const RESEAT_DATA  = 'RESEAT_DATA';
export const CHANGE_ADD_DATA  = 'CHANGE_ADD_DATA';

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
    fixedRatioData: {
        id: '',
        towerAddrSource: '',
        shareType: [],
        chinaMobile: '',
        chinaUnicom: '',
        chinaTelecom: '',
    },
    fixedRatioDataLoading: false,
    qxData: [],
};

const mutations = {
    [CHANGE_ADD_DATA](state,res) {
        state.fixedRatioData = {
            towerAddrSource: res.towerAddrSource,
            shareType: res.shareType.split('+'),
            chinaMobile: parseFloat(res.chinaMobile ? res.chinaMobile : 0 )* 1000000 / 10000,
            chinaUnicom: parseFloat(res.chinaUnicom ? res.chinaUnicom : 0 )* 1000000 / 10000,
            chinaTelecom: parseFloat(res.chinaTelecom ? res.chinaTelecom : 0 )* 1000000 / 10000,
            ds: res.ds,
            qx: res.qx,
            id: res.id,
        };
    },
    [RESEAT_DATA](state,res) {
        state.fixedRatioData = {
            towerAddrSourceOptions: '',
            shareType: [],
            chinaMobile: '',
            chinaUnicom: '',
            chinaTelecom: '',
            id: '',
        };
    },
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
        Message.success('???????????????');
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
        Message.success('???????????????');
        state.siteLoading = false;
    },
    [UPLOAD_EXECL_DATA_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.siteLoading = false;
    },
    [ADD_FIXED_RATIO_LOADING](state) {
        state.fixedRatioDataLoading = true;
    },
    [ADD_FIXED_RATIO_SUCCESS](state, res) {
        Message.success('???????????????');
        state.fixedRatioDataLoading = false;
    },
    [ADD_FIXED_RATIO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.fixedRatioDataLoading = false;
    },
    [EDIT_FIXED_RATIO_LOADING](state) {
        state.metersLoading = true;
    },
    [EDIT_FIXED_RATIO_SUCCESS](state, res) {
        Message.success('???????????????');
        state.fixedRatioDataLoading = false;
    },
    [EDIT_FIXED_RATIO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.fixedRatioDataLoading = false;
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
    [CHANGE_CHECKED_OPTIONS](state, res) {
        state.checkedOptions = res;
    },
};

const actions = {
    // ????????????????????????
    async [GET_SITE_INFO]({ commit }, params) {
        commit(GET_SITE_INFO_LOADING);
        try {
            const result = await wrapResponse(
                api.getFixedRatioData(params)
            );
            commit(GET_SITE_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_SITE_INFO_ERROR, e);
        }
    },
    // ??????????????????????????????
    async [DELETE_SHUNT_DATA]({ commit }, params) {
        commit(DELETE_SHUNT_DATA_LOADING);
        try {
            const result = await wrapResponse(
                api.deleteFixedRatioData(params)
            );
            commit(DELETE_SHUNT_DATA_SUCCESS, result);
        } catch(e) {
            commit(DELETE_SHUNT_DATA_ERROR, e);
        }
    },
    // ????????????????????????????????????
    async [ADD_FIXED_RATIO]({ commit }, params) {
        commit(ADD_FIXED_RATIO_LOADING);
        try {
            const result = await wrapResponse(
                api.addFixedRatioData(params)
            );
            commit(ADD_FIXED_RATIO_SUCCESS, result);
        } catch(e) {
            commit(ADD_FIXED_RATIO_ERROR, e);
        }
    },
    // ????????????????????????????????????
    async [EDIT_FIXED_RATIO]({ commit }, params) {
        commit(EDIT_FIXED_RATIO_LOADING);
        try {
            const result = await wrapResponse(
                api.editFixedRatioData(params)
            );
            commit(EDIT_FIXED_RATIO_SUCCESS, result);
        } catch(e) {
            commit(EDIT_FIXED_RATIO_ERROR, e);
        }
    },
    // ????????????????????????
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
    
};

export const SITE = 'fixedRatio';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
