import { getJSON,postJSON,postForm,upload } from '@/utils/ajax';

// 根据区县获取地市
export function getQxByDs(params) {
    return getJSON('/api/sysdept/getQxByDs', params);
}
// 获取分路计量列表数据
export function getFixedRatioData(params) {
    return getJSON('/api/baseInfo/getFixedRatioData', params);
}
// 删除分路计量列表数据
export function deleteFixedRatioData(params) {
    return postJSON('/api/baseInfo/batchDeleteProportion', params);
}
// 添加分路计量列表数据
export function addFixedRatioData(params) {
    return postJSON('/api/baseInfo/addProportionInfo', params);
}
// 修改分路计量列表数据
export function editFixedRatioData(params) {
    return postJSON('/api/baseInfo/updatePorportionInfo', params);
}
// Execl导入
export function uploadExeclData(params) {
    return upload('/api/baseInfo/importProportionByExcel', params);
}
