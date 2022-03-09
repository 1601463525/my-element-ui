<template>
    <div class="table">
        <div class="title">
            <div>
                金额结算告警报表
            </div>
            <div>
                <el-button size="medium"  type="primary" icon="el-icon-upload2">导出Execl</el-button>
            </div>
        </div>
        <div ref="tableInfo" class="tableInfo-echarts-account">
            <el-table
                :data="tableData"
                border
                style="width: 100%;"
                :max-height="tableHeight"
            >
                <el-table-column prop="towerCode" width="180" fixed></el-table-column>
                <el-table-column
                    v-for="(item,index) of dates"
                    :prop="item"
                    :label="item"
                    align="center"
                    :key="index"
                >
                    <template slot-scope="scope">
                        <span :style="{color:(+scope.row[item] >= scope.row.total?'red':'#000')}">{{scope.row[item]}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="平均值" width="120" prop="total"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dates: {
            type: Array,
            default: () => []
        },
        tableData: {
            type: Array,
            default: () => []
        },
        rulesLoading: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            // tableData: {
            //     "code": 10000,
            //     "message": "机器人分单量统计成功",
            //     "result": {
            //         "dates": ["10-15", "10-16", "10-17", "10-18", "10-19", "10-20"],
            //         "list": [{
            //             "total": 1,
            //             "10-15": 1,
            //             "10-16": 1,
            //             "10-17": 1,
            //             "10-18": 1,
            //             "10-19": 1,
            //             "10-20": 1,
            //             "toscatNum": "11111111"
            //         }, {
            //             "total": 2,
            //             "10-15": 2,
            //             "10-16": 2,
            //             "10-17": 2,
            //             "10-18": 2,
            //             "10-19": 2,
            //             "10-20": 2,
            //             "toscatNum": "11111111"
            //         }, {
            //             "total": 3,
            //             "10-15": 3,
            //             "10-16": 3,
            //             "10-17": 3,
            //             "10-18": 3,
            //             "10-19": 3,
            //             "10-20": 3,
            //             "toscatNum": "11111111"
            //         }, {
            //             "total": 4,
            //             "10-15": 3,
            //             "10-16": 3,
            //             "10-17": 3,
            //             "10-18": 3,
            //             "10-19": 3,
            //             "10-20": 3,
            //             "toscatNum": "11111111"
            //         }, {
            //             "total": 5,
            //             "10-15": 4,
            //             "10-16": 4,
            //             "10-17": 4,
            //             "10-18": 4,
            //             "10-19": 4,
            //             "10-20": 4,
            //             "toscatNum": "11111111"
            //         }, {
            //             "total": 2,
            //             "10-15": 5,
            //             "10-16": 5,
            //             "10-17": 5,
            //             "10-18": 5,
            //             "10-19": 5,
            //             "10-20": 5,
            //             "toscatNum": "11111111"
            //         }, ]
            //     }
            // }
        };
    },
    watch: {
        xData(newVal) {
            this.chart.setOption({
                xAxis: {
                    data: newVal || []
                }
            });
        },
        yData(newVal) {
            this.chart.setOption({
                series: {
                    data: newVal || []
                }
            });
        }
    },
};
</script>
<style>
    .tableInfo-echarts-account .el-table thead th {
        background: #fff;
    }
    
    .tableInfo-echarts-account .el-table thead tr:first-of-type th:first-of-type:before {
        content: '铁塔编号';
        text-align: center;
        position: absolute;
        width: 270px;
        height: 1px;
        bottom: 30px;
        right: 0;
    }
    
    .tableInfo-echarts-account .el-table thead tr:first-of-type th:first-of-type:after {
        content: '日期';
        text-align: center;
        position: absolute;
        width: 270px;
        top: 10px;
        left: 0;
    }
    
    .tableInfo-echarts-account .el-table thead tr:first-of-type th:first-of-type .cell {
        position: absolute;
        top: 0;
        left: 0;
        width: 182px;
        height: 1px;
        background-color: #EBEEF5;
        display: block;
        text-align: center;
        transform: rotate(15deg);
        transform-origin: top left;
        -ms-transform: rotate(15deg);
        -ms-transform-origin: top left;
        -webkit-transform: rotate(15deg);
        -webkit-transform-origin: top left;
    }
</style>
<style lang="scss" scoped>
.table {
  .title {
    margin: 20px 20px 0px 20px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    color: #2d2d2d;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .tableInfo-echarts-account {
    margin: 20px;
  }
}
</style>




