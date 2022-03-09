import { getJSON } from '@/utils/ajax';

// 获取首页基本信息
export function getHomeData(params) {
    return getJSON('/api/homePage/getHomeData', params);
}
// 获取首页异常告警数据
export function getAbnormalData(params) {
    return getJSON('/api/homePage/getConsException', params);
}
// 获取首页有站址无电表数据
export function getStationData(params) {
    return getJSON('/api/homePage/getStationNoCons', params);
}
// 获取首页有站址无电表数据
export function getMerersData(params) {
    return getJSON('/api/homePage/getConsNoStation', params);
}
export default{
    getHomeData,
    getAbnormalData,
    getStationData,
    getMerersData
};
