import * as api from '@/api/warn/index';
import { wrapResponse } from '@/utils/ajax';
import { Message } from 'hongxin-ui';

export const CLEAR_DATA = 'CLEAR_DATA';

export const GET_RULES_INFO = 'GET_RULES_INFO';
export const GET_RULES_INFO_LOADING = 'GET_RULES_INFO_LOADING';
export const GET_RULES_INFO_SUCCESS = 'GET_RULES_INFO_SUCCESS';
export const GET_RULES_INFO_ERROR = 'GET_RULES_INFO_ERROR';

export const GET_RULES_TABLE = 'GET_RULES_TABLE';
export const GET_RULES_TABLE_LOADING = 'GET_RULES_TABLE_LOADING';
export const GET_RULES_TABLE_SUCCESS = 'GET_RULES_TABLE_SUCCESS';
export const GET_RULES_TABLE_ERROR = 'GET_RULES_TABLE_ERROR';

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
    [GET_RULES_INFO_LOADING](state) {
        state.loading = true;
    },
    [GET_RULES_INFO_SUCCESS](state, res) {
        if (res) {
           const result = res.yData.map(element => {
               element = element * 100;
               return element;
            });
            state.ruleInfo = {
                xData: res.xData,
                yData: result,
            };
        }
        state.loading = false;
    },
    [GET_RULES_INFO_ERROR](state, res) {
        Message.error(res.msg || res.message);
        state.loading = false;
    },
    [GET_RULES_TABLE_LOADING](state) {
        // state.loading = true;
    },
    [GET_RULES_TABLE_SUCCESS](state, res) {
        if (res) {
            const dates = res.date;
            const result = res.list.map((item,index) => {
                const values = item.value;
                const total = (values.reduce((prev, next) => prev + next) / values.length).toFixed(2);
                const obj = {
                     towerCode: item.towerCode
                };
                dates.map( (v,i) => {
                     obj[dates[i]] = values[i];
                });
                obj.total = total ;
                return obj;
            });
            state.tableData = result;
            state.dates = dates;
         }
        // state.loading = false;
    },
    [GET_RULES_TABLE_ERROR](state, res) {
        Message.error(res.msg || res.message);
        // state.loading = false;
    },
    
};

const actions = {
    // 获取首页列表数据
    async [GET_RULES_INFO]({ commit }, params) {
        commit(GET_RULES_INFO_LOADING);
        try {
            // const result = await wrapResponse(
            //     api.getApportionmentRulesData(params)
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
                  0.1,
                  0.5,
                  0.6,
                  0.5,
                  0.7,
                  0.4
                ]
              };
            commit(GET_RULES_INFO_SUCCESS, result);
        } catch(e) {
            commit(GET_RULES_INFO_ERROR, e);
        }
    },
    // 获取首页列表数据
    async [GET_RULES_TABLE]({ commit }, params) {
        commit(GET_RULES_TABLE_LOADING);
        try {
            // const result = await wrapResponse(
            //     api.getApportionmentRulesTableData(params)
            // );
            const result = {
                'list': [
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
                    ]
                  },
                  {
                    'towerCode': '铁塔编码',
                    'value': [
                      0.1,
                      0.5,
                      0.6,
                      0.5,
                      0.7,
                      0.4
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
            commit(GET_RULES_TABLE_SUCCESS, result);
        } catch(e) {
            commit(GET_RULES_TABLE_ERROR, e);
        }
    },
    
};

export const RULES = 'apportionmentRules';
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
