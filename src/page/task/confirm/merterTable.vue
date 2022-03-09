<template>
    <div class="content" >
        <div class="operate-box">
            <div>
                <el-button size="medium" @click="batchConfirm">批量确认</el-button>
            </div>
        </div>
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <hongxin-table
                    v-loading="loading"
                    ref="table"
                    :class-name="['table-gray', 'medium']"
                    :data="confirmData"
                    :current-page="searchInfo.pageNum"
                    :page-size="searchInfo.pageSize"
                    :total="Number(confirmDataTotal)"
                    :max-height="tableHeight"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
                    @size-change="sizeChange"
                    @current-page-change="currentChange"
                    @selection-change="changeSelect"
                >
                    <el-table-column
                        fixed
                        align="center"
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="taskName"
                        label="任务名称"
                        align="center"
                        width="100"
                    >
                        <template>
                            <span>{{ searchInfo.taskName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="operate"
                        label="业务类型"
                        align="center"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.operate === 'A' ? '新增' : scope.row.operate === 'M' ? '修改' : '删除' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ds"
                        align="center"
                        label="地市"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="qx"
                        align="center"
                        label="区县"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="glttbh"
                        align="center"
                        label="铁塔编码"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="consno"
                        align="center"
                        label="电表号"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationId"
                        align="center"
                        label="站址ID"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ttqs"
                        align="center"
                        label="铁塔权属"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="paymentType"
                        align="center"
                        label="电费类别"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="isOnline"
                        align="center"
                        label="电表状态"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.isOnline === 0 ? '停用':'在用' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="agreementPrice"
                        align="center"
                        label="协议价格"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="kicketType"
                        align="center"
                        label="是否专票"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.kicketType === 0 ? '否':'是' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="meterCompany"
                        align="center"
                        width="150"
                        label="对方单位/个人名称"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="mTaxRate"
                        align="center"
                        label="税率"
                    >
                        <template slot-scope="scope">
                            <span>{{ parseFloat(scope.row.mTaxRate ? scope.row.mTaxRate : 0)* 1000000 / 10000 + '%' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        prop="nextFlowSeqId"
                        align="center"
                        label="数据状态"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.nextFlowSeqId === '03' ? '发起回退' : '发起确认' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        prop="payType"
                        align="center"
                        label="支付方式"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.payType === '01' ? '独享应付' : scope.row.payType === '02' ? '共享应付' : scope.row.payType === '04' ? '共享应收' : '' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        prop="opinion"
                        align="center"
                        label="退回原因"
                    ></el-table-column>
                    <el-table-column
                        width="150"
                        align="center"
                        fixed="right"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <span class="operating" @click="goToDetail(scope.row)">
                                详情
                            </span>
                            <span class="operating" @click="singleConfirm(scope.row)">
                                确认
                            </span>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { CONFIRM,GET_CONFIRM_INFO,CHANGE_CONFIRM_ID,BREAD_SHOW,CHANGE_CHECKED_OPTIONS,BATCH_CONFIRM,REST_DATA } from './vuex.js';
import { Table,Message } from 'hongxin-ui';
import { MessageBox } from 'element-ui';

export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'detailShow',
                    value: true
                },
                {
                    key: 'proportionShow',
                    value: false
                },
                {
                    key: 'settlementShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(CONFIRM, {
            loading: state => state.loading,
            confirmData: state => state.confirmData,
            confirmDataTotal: state => state.confirmDataTotal,
            checkedOptions: state => state.checkedOptions,
            searchInfo: state => state.searchInfo,
        })
    },
    created() {
        this.getTableData();
    },
    beforeDestroy() {
        this.$store.commit(`${CONFIRM}/${REST_DATA}`);
    },
    methods: {
        getTableData() {
            const sendData = {};
            sendData.pageNum = this.searchInfo.pageNum;
            sendData.pageSize = this.searchInfo.pageSize;
            sendData.nextFlowSeqId = this.searchInfo.nextFlowSeqId;
            sendData.payType = this.searchInfo.payType;
            sendData.towerCode = this.searchInfo.towerCode;
            this.$store.dispatch(`${CONFIRM}/${GET_CONFIRM_INFO}`,sendData).then(() => {
                // this.getTableHeight();
            });
        },
        getTableHeight() {
            if (this.$refs.tableInfo.offsetHeight > 0) {
                this.tableHeight =
                    this.$refs.tableInfo.offsetHeight - 32 - 22 - 22;
            }
        },
        sizeChange(res) {
            this.searchInfo.pageSize = res;
            this.searchInfo.pageNum = 1;
            this.getTableData();
        },
        currentChange(res) {
            this.searchInfo.pageNum = res;
            this.getTableData();
        },
        changeSelect(res) {
            const arr = [];
            res.forEach(v => {
                arr.push({
                    'id': v.id,
                    'seqId': v.seqId,
                    'version': v.version,
                });
            });
            this.$store.commit(`${CONFIRM}/${CHANGE_CHECKED_OPTIONS}`, arr);
        },
        goToDetail(res) {
            this.breadData.forEach(item => {
                this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${CONFIRM}/${CHANGE_CONFIRM_ID}`,{
                id: res.id,
                seqId: res.seqId
            });
        },
        batchConfirm() {
            if(this.checkedOptions.length === 0) {
                Message.warning('请先选择需要确认的数据！');
            } else {
                MessageBox.confirm('请确认任务信息？', '提示', {
                    type: 'warning',
                })
                    .then(() => {
                        console.log(this.checkedOptions);
                        this.$store.dispatch(`${CONFIRM}/${BATCH_CONFIRM}`,this.checkedOptions).then(() => {
                            this.getTableData();
                        });
                    });
            }
        },
        singleConfirm(res) {
            MessageBox.confirm('请确认任务信息？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch(`${CONFIRM}/${BATCH_CONFIRM}`,[{
                        id: res.id,
                        seqId: res.seqId,
                        version: res.version
                    }]).then(() => {
                        this.getTableData();
                    });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
  .content {
    .table-box {
        .operating {
            color: #2B90F7;
            font-size: 14px;
            margin: 0 10px;
            cursor: pointer;
            &:hover {
                color: #4c85ff;
            }
        }
    }
    .operate-box {
        display: flex;
        margin: 0px 0px 10px 0px;
        div {
            display: flex;
            margin: 0 2px;
            span {
                width: 100px;
                height: 40px;
                line-height: 40px;
            }
        }
    }
  }
</style>





