import Vue from 'vue';
import Vuex from 'vuex';
import { Loading } from 'element-ui';

Vue.use(Vuex);


import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

import { getUserInfo } from '@/api/index';


import { getMenuList } from './menuList';
import { getRole } from './role';


export const REQUEST_USERINFO = 'REQUEST_USERINFO';
export const REQUEST_USERINFO_SUCCESS = 'REQUEST_USERINFO_SUCCESS';
export const REQUEST_USERINFO_ERROR = 'REQUEST_USERINFO_ERROR';

export const ACTION_REQUEST_USERINFO = 'ACTION_REQUEST_USERINFO';


export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SAVE_ROUTER = 'SAVE_ROUTER';
export const REQUEST_EXAMID = 'REQUEST_EXAMID';

import home from '~p/home/vuex';
import siteInformation from '~p/search/siteInformation/vuex';
import shareRatio from '~p/search/shareRatio/vuex';
import shareAmount from '~p/search/shareAmount/vuex';
import metersInfo from '~p/search/meterInformation/vuex';
import electricitySum from '~p/search/electricitySum/vuex';
import apportionmentRules from '~p/warn/apportionmentRules/vuex';
import amountSettlement from '~p/warn/amountSettlement/vuex';
import confirm from '~p/task/confirm/vuex';
import vote from '~p/task/vote/vuex';
import systemManage from '~p/system/systemManage/vuex';
import shuntMetering from '~p/base/shuntMetering/vuex';
import fixedRatio from '~p/base/fixedRatio/vuex';

const state = {
    router:null,
    userInfo:{
        userName:'', // 用户名
        avatar:'', // 用户头像
        role:'', // 角色信息
        roleList:[], // 角色列表
        phone:'', // 手机号,
        entId: '', //企业id
    }, // 用户信息
    menuList:[], // 菜单列表
    userInfoLoading:false, // 用户信息遮罩
    examId: '',
};

const mutations = {
    [SAVE_ROUTER](state, router) {
        state.router = router;
    },
    [REQUEST_USERINFO](state){
        state.userInfoLoading = true;
    },
    [REQUEST_EXAMID](state,data){
        state.examId = data.examId;
    },
    [REQUEST_USERINFO_SUCCESS](state,res){
        state.userInfoLoading = false;
        state.userInfo = {
            userName : res.username,
            role: res.msp === 'ChinaTelecom' ? '电信用户' : '铁塔用户',
            ds: res.ds,
            qx: res.qx
        };
        window.golobalConfig.userInfo = state.userInfo;
        state.menuList = getMenuList(state.userInfo);
    },
    [REQUEST_USERINFO_ERROR](state,e){
        state.userInfoLoading = false;
        Message.error(e.message || '获取用户基本信息失败');
    }
};

const actions = {
    async [ACTION_REQUEST_USERINFO]({ commit }) {
        commit(REQUEST_USERINFO);
        const params = {
            // userId:window.globalConfig.userInfo.userId
        };
        try {
            const res = await wrapResponse(getUserInfo(params));
            commit(REQUEST_USERINFO_SUCCESS, res);
        } catch (e) {
            commit(REQUEST_USERINFO_ERROR, e);
        }
    },
};

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        home,
        siteInformation,
        shareRatio,
        shareAmount,
        apportionmentRules,
        amountSettlement,
        metersInfo,
        electricitySum,
        confirm,
        vote,
        systemManage,
        shuntMetering,
        fixedRatio
    },
});

export default store;
