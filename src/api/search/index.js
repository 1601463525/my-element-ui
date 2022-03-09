import { getJSON,postJSON } from '@/utils/ajax';
import bilingInfo from '@/api/search/functionAPI/bilingInfo';


// 获取查询系统站点信息查询表格数据
export function getSiteInformationData(params) {
    return getJSON('/api/search/getSiteInformationData', params);
}
// 获取查询系统站点信息查询表格数据
export function getSiteDetailData(params) {
    return getJSON('/api/search/getSiteDetailData', params);
}

// 获取查询系统分摊比例查询表格数据
export function getShareData(params) {
    return getJSON('/api/search/getShareRateInformationData', params);
}
// 获取查询系统分摊比例查询详情数据
export function getShareDetailData(params) {
    return getJSON('/api/search/getShareTraceabilityData', params);
}
// 获取查询系统分摊比例查询历史轨迹数据
export function getShareHistoryData(params) {
    return getJSON('/api/search/getShareHistoryData', params);
}
// 获取查询系统分摊比例查询历史轨迹查看
export function getHistoryDetail(params) {
    return getJSON('/api/search/getHistoryDetail', params);
}
// 获取查询系统分摊比例区块链数据
export function getShareTraceabilityData(params) {
    return getJSON('/api/search/getShareRateQklHistory', params);
}

// 获取查询系统结算结果查询表格数据
export function getShareAccountData(params) {
    return getJSON('/api/search/getShareMoneyInformationData', params);
}
// 获取查询系统结算结果查询详情数据
export function getShareAccountDetailData(params) {
    return getJSON('/api/search/getShareAccountTraceabilityData', params);
}
// 获取查询系统结算结果查询历史轨迹数据
export function getShareAccountHistoryData(params) {
    return getJSON('/api/search/getShareAccountHistoryData', params);
}
// 获取查询系统结算结果查询历史轨迹查看
export function getShareAccountHistoryDetail(params) {
    return getJSON('/api/search/getShareAccountHistoryDetail', params);
}

// 获取电表信息表格数据
export function getMetersInfo(params) {
    return getJSON('/api/search/getConsInformationData', params);
}
// 获取电表详情数据
export function getMeterDetail(params) {
    return getJSON('/api/search/getMeterTraceLine', params);
}
// 获取电表信息历史轨迹列表数据
export function getMeterTraceList(params) {
    return getJSON('/api/search/getMeterTraceList', params);
}
// 获取电表信息历史轨迹详情
export function getMeterTraceDetail(params) {
    return getJSON('/api/search/getMeterTraceDetail', params);
}
// 获取电表信息溯源数据
export function getMeterTraceLine(params) {
    return getJSON('/api/search/getConsInfoQklHistory', params);
}

// 获取查询系统分摊金额区块链数据
export function getShareAccountTraceabilityData(params) {
    return getJSON('/api/search/getShareMoneyQklHistory', params);
}

// 获取电费汇报总账列表
export function getElectricitySumData(params) {
    return getJSON('/api/search/getAccountAtom', params);
}
// 获取电费汇报总账详情
export function getTraceDetail(params) {
    return getJSON('/api/search/getTraceDetail', params);
}
// 获取电费汇报总账区块链数据
export function getTraceabilityData(params) {
    return getJSON('/api/search/getTraceabilityData', params);
}
// 根据区县获取地市
export function getQxByDs(params) {
    return getJSON('/api/sysdept/getQxByDs', params);
}
// 发送报账
export function postSendAccount(params) {
    return postJSON('/api/search/sendAccount', params);
}
export default Object.assign({
    getSiteInformationData,
    getSiteDetailData,
    getShareData,
    getShareDetailData,
    getShareHistoryData,
    getShareAccountData,
    getShareAccountDetailData,
    getShareAccountHistoryData,
    getShareAccountHistoryDetail,
    getElectricitySumData,
    getTraceDetail,
    getTraceabilityData,
    getShareTraceabilityData,
    getShareAccountTraceabilityData,
    getMetersInfo
}, bilingInfo);
