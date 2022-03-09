import { getJSON,postJSON,postForm,upload } from '@/utils/ajax';

// 获取分路计量列表数据
export function getShuntMeteringData(params) {
    return getJSON('/api/baseInfo/getShuntMeteringData', params);
}
// 删除分路计量列表数据
export function deleteShuntData(params) {
    return postJSON('/api/baseInfo/batchDeleteElectCost', params);
}
// Execl导入
export function uploadExeclData(params) {
    return upload('/api/baseInfo/importElectCostByExcel', params);
}


