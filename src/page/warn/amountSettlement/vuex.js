import * as api from '@/api/warn/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';
export const GET_ACCOUNT_INFO_LOADING = 'GET_ACCOUNT_INFO_LOADING';
export const GET_ACCOUNT_INFO_SUCCESS = 'GET_ACCOUNT_INFO_SUCCESS';
export const GET_ACCOUNT_INFO_ERROR = 'GET_ACCOUNT_INFO_ERROR';

export const GET_ACCOUNT_TABLE = 'GET_ACCOUNT_TABLE';
export const GET_ACCOUNT_TABLE_LOADING = 'GET_ACCOUNT_TABLE_LOADING';
export const GET_ACCOUNT_TABLE_SUCCESS = 'GET_ACCOUNT_TABLE_SUCCESS';
export const GET_ACCOUNT_TABLE_ERROR = 'GET_ACCOUNT_TABLE_ERROR';

const state = {
    ruleInfo: {},
    loading: true,
    tableData: [],
    dates: [],
};

const mutations = {
    [CLEAR_DATA](state) {
        state.ruleInfo = [];
    },
    [GET_ACCOUNT_INFO_LOADING](state) {
        state.loading = true;
    },
    [GET_ACCOUNT_INFO_SUCCESS](state, res) {
        if (res) {
            state.ruleInfo = res;
        }
        state.loading = false;
    },
    [GET_ACCOUNT_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [GET_ACCOUNT_TABLE_LOADING](state) {
        // state.loading = true;
    },
    [GET_ACCOUNT_TABLE_SUCCESS](state, res) {
        if (res) {
           const dates = res.date;
           const result = res.list.map((item,index) => {
               const values = item.value;
               const total = Math.round(values.reduce((prev, next, index, array) => prev + next) / values.length);
               const obj = {
                    towerCode: item.towerCode
               };
               dates.map( (v,i) => {
                    obj[dates[i]] = values[i];
               });
               obj.total = total;
               return obj;
           });
           state.tableData = result;
           state.dates = dates;
        }
        // state.loading = false;
    },
    [GET_ACCOUNT_TABLE_ERROR](state, res) {
        Message.error(res.msg || res.message);
        // state.loading = false;
    },
    
};

const actions = {
    // 获取首页列表数据
    async [GET_ACCOUNT_INFO]({ commit }, params) {
        commit(GET_ACCOUNT_INFO_LOADING);
        try {
            // const result = await wrapResponse(
            //     api.getApportionmentAccountData(params)
            // );
            const result = {
                'xData': [
                  '07-01',
                  '07-02',
                  '07-03',
                  '07-04',
                  '07-05',
                  '07-06'
                ],
                'yData': [
                  100,
                  500,
                  600,
                  57,
                  77,
                  45
                ]
              };
            commit(GET_ACCOUNT_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_ACCOUNT_INFO_ERROR, e);
        }
    },
    // 获取首页列表数据
    async [GET_ACCOUNT_TABLE]({ commit }, params) {
        commit(GET_ACCOUNT_TABLE_LOADING);
        try {
            // const result = await wrapResponse(
            //     api.getApportionmentAccountTableData(params)
            // );
            const result = {
                'list': [
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      30,
                      40,
                      60,
                      80,
                      90,
                      89
                    ]
                  }
                ],
                'date': [
                  '07-01',
                  '07-02',
                  '07-03',
                  '07-04',
                  '07-05',
                  '07-06'
                ]
              };
            commit(GET_ACCOUNT_TABLE_SUCCESS, result);
        } catch(e) {
            commit(GET_ACCOUNT_TABLE_ERROR, e);
        }
    },
    
};

export const ACCOUNT = 'amountSettlement';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
