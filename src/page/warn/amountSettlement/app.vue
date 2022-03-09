<template>
    <div v-loading="rulesLoading" class="search-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >异常告警</el-breadcrumb-item>
                <el-breadcrumb-item >金额结算告警</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="main">
            <div class="search">
                <div class="title">金额结算异常告警</div>
                <div class="content">
                    <el-row>
                        <el-col :span="4" class="search-col">
                            <el-select v-model="operator" placeholder="请选择运营商" clearable >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" class="search-col">
                            <el-input
                                placeholder="请输入铁塔编码"
                                v-model="towerCode"
                                clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="4" class="search-col">
                            <el-input
                                placeholder="请输入电表号"
                                v-model="meterNumber"
                                clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6" class="search-col">
                            <el-date-picker
                                v-model="time"
                                type="daterange"
                                range-separator="~"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width: 90%;"
                                clearable>
                            </el-date-picker>
                        </el-col>
                        <el-col :span="2">
                            <div>
                                <el-button size="medium" type="primary" @click="searchData">查询</el-button>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div>
                                <el-button size="medium" @click="reset">重置</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <rule-echarts :xData="ruleInfo.xData" :yData="ruleInfo.yData" :rule-loading="rulesLoading" ></rule-echarts>
            <rule-table :tableData="tableData" :dates="dates"></rule-table>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { ACCOUNT,GET_ACCOUNT_INFO,GET_ACCOUNT_TABLE } from './vuex.js';
import RuleEcharts from './echarts';
import RuleTable from './table';

export default {
    components: {
        'rule-echarts': RuleEcharts,
        'rule-table': RuleTable,
    },
    data() {
        return {
            operator: '',
            options: [
                {
                    label: '移动',
                    value: '移动',
                },
                {
                    label: '联通',
                    value: '联通',
                },
                {
                    label: '电信',
                    value: '电信',
                },
            ],
            towerCode: '',
            meterNumber: '',
            time: [],
        };
    },
    computed: {
        ...mapState(ACCOUNT, {
            rulesLoading: state => state.rulesLoading,
            ruleInfo: state => state.ruleInfo,
            tableData: state => state.tableData,
            dates: state => state.dates,
        })
    },
    created() {
        this.time = [moment().startOf('day').subtract(10, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')];
        this.getApportionmentRulesData();
        this.getApportionmentRulesTableData();
    },
    methods: {
        getApportionmentRulesTableData() {
            const sendData = {};
            sendData.operator = this.operator;
            sendData.towerCode = this.towerCode;
            sendData.meterNumber = this.meterNumber;
            sendData.startTime = this.time[0];
            sendData.endTime = this.time[1];
            this.$store.dispatch(`${ACCOUNT}/${GET_ACCOUNT_TABLE}`,sendData);
        },
        getApportionmentRulesData() {
            const sendData = {};
            sendData.operator = this.operator;
            sendData.towerCode = this.towerCode;
            sendData.meterNumber = this.meterNumber;
            sendData.startTime = this.time[0];
            sendData.endTime = this.time[1];
            this.$store.dispatch(`${ACCOUNT}/${GET_ACCOUNT_INFO}`,sendData);
        },
        searchData() {
            this.getApportionmentRulesData();
            this.getApportionmentRulesTableData();
        },
        reset() {
            this.operator = '';
            this.towerCode = '';
            this.meterNumber = '';
            this.time = [];
            this.getApportionmentRulesData();
            this.getApportionmentRulesTableData();
        }
    }
};
</script>

<style lang="scss" scoped>
.search-manage {
  height: calc(100% - 52px);
  .bread-crumb {
    height: 47px;
    background: #ffffff;
    box-shadow: 0px 1px 7px 0px rgba(104, 113, 158, 0.17);
    display: flex;
    align-items: center;
    i {
      margin: 0 20px;
    }
  }
  .back {
      position: absolute;
      right: 20px;
  }
  .main {
        height: calc(100% - 30px);
        overflow: auto;
        .search {
            margin: 10px 0px 0px 30px;
            .title {
                height: 50px;
                font-size: 16px;
                font-weight: 600;
                color: #2D2D2D;
                line-height: 50px;
    
            }
            .search-col {
                margin: 0 10px;
            }
        }
  }
}
</style>


