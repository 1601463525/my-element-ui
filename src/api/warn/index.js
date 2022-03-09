import {
  getJSON,
} from '@/utils/ajax';

// 获取分摊规则告警数据
export function getApportionmentRulesData(params) {
  return getJSON('/api/warn/getApportionmentRulesData', params);
}
// 获取分摊规则告警表格数据
export function getApportionmentRulesTableData(params) {
  return getJSON('/api/warn/getApportionmentRulesTableData', params);
}
// 获取金额结算告警数据
export function getApportionmentAccountData(params) {
  return getJSON('/api/warn/getApportionmentAccountData', params);
}
// 获取金额结算告警表格数据
export function getApportionmentAccountTableData(params) {
  return getJSON('/api/warn/getApportionmentAccountTableData', params);
}

export default {
    getApportionmentRulesData,
    getApportionmentRulesTableData,
    getApportionmentAccountData,
    getApportionmentAccountTableData,
};
