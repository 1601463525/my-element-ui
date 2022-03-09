<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span style="width: 50px;">地市：</span>
                        <el-select v-model="userInfo.ds" placeholder="请选择地市" :disabled="userInfo.ds !== ''" >
                        </el-select>
                    </div>
                    <div>
                        <span style="width: 50px;">区县：</span>
                        <el-select v-model="searchInfo.qx" placeholder="请选择区县" @click.native="getQxByDs">
                            <el-option v-for="item in qxData" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span style="width: 50px;">类型：</span>
                        <el-select v-model="searchInfo.dataSource" placeholder="请选择类型" clearable>
                            <el-option v-for="item in typesOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span style="width: 50px;">状态：</span>
                        <el-select v-model="searchInfo.sendState" placeholder="请选择状态" clearable >
                            <el-option v-for="item in statesOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span class="filter-commit" @click="searchData">查询</span>
                <span class="filter-reset" @click="reset">重置</span>
                <el-button class="send-botton" @click="sendAccount" :disabled="sendAccountDisable">发送报账</el-button>
            </div>
            <!-- <a :href="fileURL" :download="fileName">
                <div class="add operate-btn">
                    <i class="el-icon-upload2"></i>
                    导出Execl
                </div>
            </a> -->
        </div>
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <el-table
                    v-loading="siteLoading"
                    ref="table"
                    border
                    :summary-method="getSummaries"
                    show-summary
                    :class-name="['table-gray', 'medium']"
                    :data="siteData"
                    :max-height="tableHeight"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
                    :showPagination="false"
                    :span-method="objectSpanMethod"
                    :cell-class-name="tableRowClassName"
                >
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="ds"
                        label="地市"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="qx"
                        label="区县"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="type"
                        label="类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationNo"
                        label="站址数"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="price"
                        label="含税电费（元）"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="tax"
                        label="税额（元）"
                        align="center"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { ELECTRICITY,GET_ELECTRICITY_INFO,CHANGE_ELECTRICITY_ID,GET_QX_BY_DS,POST_SEND_ACCOUNT,BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';

export default {
    components: {
        'el-table': Table,
    },
    data() {
        return {
            searchInfo: {
                unit: '',
                dataSource: '',
                sendState: '01',
                qx: '',
            },
            unitOptions: [
                {
                    label: '地市',
                    value: '01',
                },
                {
                    label: '区县',
                    value: '02',
                },
            ],
            typesOptions: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '应付',
                    value: '02',
                },
                {
                    label: '应收',
                    value: '01',
                },
            ],
            statesOptions: [
                {
                    label: '已发送',
                    value: '02',
                },
                {
                    label: '未发送',
                    value: '01',
                },
                {
                    label: '全部',
                    value: '',
                },
            ],
            sendAccountDisable: false,
            fileUrl: window.BASE_URL + '/api/search/exportShareMoneyInformationData',
            fileName: '结算信息报表',
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            towerCode: '',
            merterNum: '',
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceabilityShow',
                    value: true
                },
            ],
            OrderIndexDsArr: [],
            hoverOrderArr: [],
            OrderIndexQxArr: [],
            // siteData: [],
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        ...mapState(ELECTRICITY, {
            siteLoading: state => state.siteLoading,
            siteData: state => state.siteData,
            total: state => state.siteDataTotal,
            qxData: state => state.qxData,
        }),
        fileURL: function () {
            return `${this.fileUrl}?dataSource=${this.searchInfo.dataSource}&sendState=${this.searchInfo.sendState}&ds=${this.userInfo.ds}&qx=${this.userInfo.qx}`;
        }
    },
    watch: {
        'searchInfo.sendState': {
            deep:true,
            handler(newVal) {
                if (newVal === '01') {
                    this.sendAccountDisable = false;
                } else {
                    this.sendAccountDisable = true;
                }
            }
        }
    },
    created() {
        this.getTableData();
    },
    mounted() {
    //   this.getOrderNumber()
    },
    methods: {
        // 获取相同编号的数组
        getOrderNumber() {
            const OrderObjDs = {};
            const OrderObjQx = {};
            const OrderObjType = {};
            this.siteData.forEach((element, index) => {
                element.rowIndex = index;
                if (OrderObjDs[element.ds]) {
                    OrderObjDs[element.ds].push(index);
                } else {
                    OrderObjDs[element.ds] = [];
                    OrderObjDs[element.ds].push(index);
                }
                if (OrderObjQx[element.qx]) {
                    OrderObjQx[element.qx].push(index);
                } else {
                    OrderObjQx[element.qx] = [];
                    OrderObjQx[element.qx].push(index);
                }
            });

            // 将数组长度大于1的值 存储到this.OrderIndexDsArr（也就是需要合并的项）
            for (const k in OrderObjDs) {
                if (OrderObjDs[k].length > 1) {
                    this.OrderIndexDsArr.push(OrderObjDs[k]);
                }
            }
            // 将数组长度大于1的值 存储到this.OrderIndexQxArr
            for (const k in OrderObjQx) {
                if (OrderObjQx[k].length > 1) {
                    this.OrderIndexQxArr.push(OrderObjQx[k]);
                }
            }
        },
        getTableData() {
            const sendData = {};
            sendData.dataSource = this.searchInfo.dataSource;
            sendData.sendState = this.searchInfo.sendState;
            sendData.ds = this.userInfo.ds;
            sendData.qx = this.searchInfo.qx;
            this.$store.dispatch(`${ELECTRICITY}/${GET_ELECTRICITY_INFO}`,{
                ...sendData,
            }).then(res => {
                // res.map(item => {
                //     item.type = item.type === '01' ? '应收' : '应付';
                // });
                // this.siteData = res;
                this.getOrderNumber();
            });
        },
        sizeChange(res) {
            this.pageSize = res;
            this.pageNum = 1;
            this.getTableData();
        },
        currentChange(res) {
            this.pageNum = res;
            this.getTableData();
        },
        searchData() {
            this.pageNum = 1;
            this.getTableData();
        },
        reset(){
            this.pageNum = 1;
            this.pageSize = 10;
            this.searchInfo = {
                types: '',
                unit: '',
                states: '',
            };
            this.getTableData();
        },
        goToDetail(id) {
            this.breadData.forEach(item => {
                this.$store.commit(`${ELECTRICITY}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${ELECTRICITY}/${CHANGE_ELECTRICITY_ID}`,id);
        },
        indexMethod (index) {
            const curpage = this.pageNum; 
            const limitpage = this.pageSize;
            return index+1 + (curpage-1)*limitpage;
        },
        objectSpanMethod({row,column,rowIndex,columnIndex}) {
            console.log(rowIndex);
            if (columnIndex === 0) {
                for (let i = 0; i < this.OrderIndexDsArr.length; i++) {
                    const element = this.OrderIndexDsArr[i];
                    for (let j = 0; j < element.length; j++) {
                        const item = element[j];
                        if (rowIndex === item) {
                            if (j === 0) {
                                return {
                                    rowspan: element.length,
                                    colspan: 1
                                };
                            } else if (j !== 0) {
                                return {
                                    rowspan: 0,
                                    colspan: 0
                                };
                            }
                        }
                    }
                }
            } else if(columnIndex === 1){
                for (let i = 0; i < this.OrderIndexQxArr.length; i++) {
                    const element = this.OrderIndexQxArr[i];
                    for (let j = 0; j < element.length; j++) {
                        const item = element[j];
                        if (rowIndex === item) {
                            if (j === 0) {
                                return {
                                    rowspan: element.length,
                                    colspan: 1
                                };
                            } else if (j !== 0) {
                                return {
                                    rowspan: 0,
                                    colspan: 0
                                };
                            }
                        }
                    }
                }
            }
        },
        tableRowClassName({row,rowIndex}) {
            return 'hovered-row-new';
        },


        cellMouseEnter(row, column, cell, event) {
            this.rowIndex = row.rowIndex;
            this.hoverOrderArr = [];
            this.OrderIndexDsArr[0].forEach(element => {
                if (element.indexOf(this.rowIndex) >= 0) {
                    this.hoverOrderArr = element;
                }
            });
        },

        cellMouseLeave(row, column, cell, event) {
            this.rowIndex = '-1';
            this.hoverOrderArr = [];
        },
        getQxByDs() {
            this.$store.dispatch(`${ELECTRICITY}/${GET_QX_BY_DS}`,{
                ds: this.userInfo.ds
            });
        },
        sendAccount() {
            const sendData = {};
            sendData.dataSource = this.searchInfo.dataSource;
            sendData.sendState = this.searchInfo.sendState;
            sendData.ds = this.userInfo.ds;
            sendData.qx = this.searchInfo.qx;
            this.$store.dispatch(`${ELECTRICITY}/${POST_SEND_ACCOUNT}`,sendData).then(() => {
                this.getTableData();
            });
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0 ) {
                    sums[index] = '合计';
                    return;
                } else if (index === 3) {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    }
                } else if (index === 4) {
                    const yingfu = [];
                    const yingshou = [];
                    data.forEach(item => {
                        if(item.type === '应付') {
                            yingfu.push(item.price * 1000000);
                        } else if (item.type === '应收') {
                            yingshou.push(item.price * 1000000);
                        }
                    });
                    sums[index] = (yingfu.reduce((prev, curr) => {
                        return prev + curr;
                    }) - yingshou.reduce((prev, curr) => {
                        return prev + curr;
                    })) / 1000000;
                } else if (index === 5) {
                    const yingfu = [];
                    const yingshou = [];
                    data.forEach(item => {
                        if(item.type === '应付') {
                            yingfu.push(item.tax * 1000000);
                        } else if (item.type === '应收') {
                            yingshou.push(item.tax * 1000000);
                        }
                    });
                    sums[index] = (yingfu.reduce((prev, curr) => {
                        return prev + curr;
                    }) - yingshou.reduce((prev, curr) => {
                        return prev + curr;
                    })) / 1000000;
                }
            });
            return sums;
        }
    }
};
</script>

<style lang="scss" scoped>
  @import '@a/css/common.scss';
  .send-botton {
    width: 90px !important;
    display: inline-block;
    height: 30px;
    line-height: 7px;
    border: 1px solid #6696ff;
    border-radius: 2px;
    color: #6696ff;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
  }
  .send-botton-disable {
        display: inline-block;
        height: 30px;
        line-height: 7px;
        border: 1px solid #C0C4CC;
        border-radius: 2px;
        color: #C0C4CC;
        font-size: 14px;
        cursor: not-allowed;
        text-align: center;
        box-sizing: border-box;
  }
  /deep/.el-select {
    width: 120px !important;
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
    width: 120px !important;
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
<style >
.hovered-row-new {
    background-color: #ffffff !important;
}

</style>



