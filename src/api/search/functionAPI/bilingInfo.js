import { getJSON } from '@/utils/ajax';

// 获取查询系统站点信息查询表格数据
function getTowerCodeListAPI(params) {
    return Promise.resolve({
            data: {
                code: 10000,
                message: '',
                result: {
                    list: [{
                        value: '铁塔1',
                        label: '铁塔1'
                        }, {
                        value: '铁塔2',
                        label: '铁塔2'
                        }]
                }
            }
        });
    // return getJSON('/api/search/getTowerCodeListAPI', params);
}
// 电号表下拉列表选项
function getElecNumberListAPI(params) {
    return Promise.resolve({
        data: {
            code: 10000,
            message: '',
            result: {
                list: [{
                    value: '电号表1',
                    label: '电号表1'
                }, {
                    value: '电号表2',
                    label: '电号表2'
                },{
                    value: '电号表3',
                    label: '电号表3'
                }]
            }
        }
    });
}
function getTableDataListAPI(params) {
    return Promise.resolve({
        data: {
            code: 10000,
            message: '',
            result: {
                list: [{
                    number: 1,
                    city: '上海',
                    region: '徐汇区',
                    towerCode: '12345567',
                    address: '上海市普陀区金沙江路 1518 弄',
                    elecNumber: '2016-05-03'
                },{
                    number: 2,
                    city: '南京',
                    region: '徐汇区',
                    towerCode: '12345567',
                    address: '上海市普陀区金沙江路 1518 弄',
                    elecNumber: '2016-05-03'
                },{
                    number: 3,
                    city: '杭州',
                    region: '徐汇区',
                    towerCode: '12345567',
                    address: '上海市普陀区金沙江路 1518 弄',
                    elecNumber: '2016-05-03'
                },{
                    number: 4,
                    city: '北京',
                    region: '徐汇区',
                    towerCode: '12345567',
                    address: '上海市普陀区金沙江路 1518 弄',
                    elecNumber: '2016-05-03'
                }]
            }
        }
    });
}

export default {
    getTowerCodeListAPI,
    getElecNumberListAPI,
    getTableDataListAPI
};
