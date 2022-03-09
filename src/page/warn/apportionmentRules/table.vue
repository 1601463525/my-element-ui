<template>
    <div class="table">
        <div class="title">
            <div>
                分摊规则异常告警报表
            </div>
            <div>
                <el-button size="medium" type="primary" icon="el-icon-upload2">导出Execl</el-button>
            </div>
        </div>
        <div ref="tableInfo" class="tableInfo-echarts">
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
                        <span :style="{color:(+scope.row[item] >= scope.row.total?'red':'#000')}">{{ scope.row[item]* 1000000 / 10000 + '%'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="平均值（元）" width="120" prop="total"></el-table-column>
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
    .tableInfo-echarts .el-table thead.is-group th {
        background: #fff;
    }
    
    .tableInfo-echarts .el-table thead tr:first-of-type th:first-of-type:before {
        content: '铁塔编号';
        text-align: center;
        position: absolute;
        width: 270px;
        height: 1px;
        bottom: 30px;
        right: 0;
    }
    
    .tableInfo-echarts .el-table thead tr:first-of-type th:first-of-type:after {
        content: '日期';
        text-align: center;
        position: absolute;
        width: 270px;
        top: 10px;
        left: 0;
    }
    
    .tableInfo-echarts .el-table thead tr:first-of-type th:first-of-type .cell {
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
    .tableInfo-echarts-account .el-table thead th {
            color: #7f8fa4;
            background-color: #f4f8fb;
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
  .tableInfo-echarts {
    margin: 20px;
  }
}
 /deep/ .el-table th {
    color: #7f8fa4;
    background-color: #f4f8fb;
}
</style>


