<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span style="width: 76px;">任务名称：</span>
                        <el-select v-model="searchInfo.taskName" placeholder="请选择任务名称" style='width: 60%;'>
                            <el-option v-for="item in taskOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="searchInfo.taskName === '电表信息维护' || searchInfo.taskName === '金额结算投票'">
                        <span style="width: 76px;">铁塔编码:</span>
                        <el-input v-model="searchInfo.towerCode" placeholder="请输入铁塔编码" clearable ></el-input>
                    </div>
                    <div>
                        <span style="width: 105px;">任务创建时间：</span>
                        <el-date-picker
                            v-model="searchInfo.dataState"
                            type="datetimerange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width: 80%;">
                        </el-date-picker>
                    </div>
                    <div v-if="searchInfo.taskName === '电表信息维护' || searchInfo.taskName === '金额结算投票'">
                        <span style="width: 76px;">支付方式：</span>
                        <el-select v-model="searchInfo.payType" placeholder="请选择支付方式" clearable >
                            <el-option v-for="item in payTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span class="filter-commit" @click="searchData">查询</span>
                <span class="filter-reset" @click="reset">重置</span>
            </div>
        </div>
        <merter-table ref='merterTable' v-if="searchInfo.taskName === '电表信息维护'" ></merter-table>
        <proportion-table ref='proportionTable' v-if="searchInfo.taskName === '固定比例维护'" ></proportion-table>
        <settlement-table ref='settlementTable' v-if="searchInfo.taskName === '金额结算投票'" ></settlement-table>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex';
import {
    VOTE,
    CHANGE_VOTE_ID
} from './vuex.js';
import merterTable from './merterTable';
import proportionTable from './proportionTable';
import settlementTable from './settlementTable';
    
export default {
    components: {
        'merter-table': merterTable,
        proportionTable,
        settlementTable,
    },
    data() {
        return {
            taskOptions: [{
                              label: '电表信息维护',
                              value: '电表信息维护',
                          },
                          {
                              label: '固定比例维护',
                              value: '固定比例维护',
                          },
                          {
                              label: '金额结算投票',
                              value: '金额结算投票',
                          },
            ],
            payTypeOptions: [{
                                 label: '独享应付',
                                 value: '01',
                             },
                             {
                                 label: '共享应付',
                                 value: '02',
                             },
                             {
                                 label: '共享应收',
                                 value: '04',
                             },
            ],
            tableHeight: window.innerHeight - 280,
            breadData: [{
                            key: 'tableShow',
                            value: false
                        },
                        {
                            key: 'detailShow',
                            value: true
                        },
            ]
        };
    },
    computed: {
        ...mapState(VOTE, {
            searchInfo: state => state.searchInfo,
        })
    },
    beforeDestroy() {
        this.searchInfo.taskName = '金额结算投票';
    },
    methods: {
        searchData() {
            // this.searchInfo.pageNum = 1;
            if(this.searchInfo.taskName === '电表信息维护'){
                this.$refs.merterTable.getTableData();
            } else if(this.searchInfo.taskName === '固定比例维护') {
                this.$refs.proportionTable.getTableData();
            } else if(this.searchInfo.taskName === '金额结算投票') {
                this.$refs.settlementTable.getTableData();
            }
        },
        reset() {
            this.searchInfo.pageNum = 1;
            this.searchInfo.pageSize = 10;
            this.searchInfo.taskName = '金额结算投票';
            this.searchInfo.dataState = [];
            this.searchInfo.payType = '';
            this.searchData();
        },
    }
};
</script>

<style lang="scss" scoped>
  @import '@a/css/common.scss';
    /deep/.el-select {
    width: 145px !important;
    .el-input__inner {
        height: 30px;
        line-height: 30px;
    }
    .el-input__suffix-inner {
        i {
            line-height: 30px;
        }
    }
}
/deep/ .el-input {
    width: 145px !important;
    .el-input__inner {
        height: 30px;
        line-height: 30px;
    }
    .el-input__suffix {
        i {
            line-height: 30px !important;
        }
    }
}
</style>




