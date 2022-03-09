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
                        prop="towerCode"
                        align="center"
                        label="铁塔编码"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="consno"
                        align="center"
                        width="150"
                        label="电表号"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="towerName"
                        align="center"
                        label="站址名称"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationId"
                        align="center"
                        label="站址ID"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="beginDate"
                        align="center"
                        label="结算周期起"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endDate"
                        align="center"
                        label="结算周期止"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endTax"
                        align="center"
                        label="结算税率"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.endTax ? scope.row.endTax : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="accountMonth"
                        align="center"
                        label="会计账期"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareTax"
                        align="center"
                        label="分摊税率"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.shareTax ? scope.row.shareTax : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="addScale"
                        align="center"
                        label="加成比例"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.addScale ? scope.row.addScale : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="priceTax"
                        align="center"
                        label="价税合计"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareType"
                        label="分摊方式"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.shareType === '01' ? '固定比例' : scope.row.shareType === '02' ? '分路计量' : '个性比例' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaMobile"
                        align="center"
                        label="电费分摊比例（移动）"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaMobile ? scope.row.chinaMobile : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaUnicom"
                        align="center"
                        label="电费分摊比例（联通）"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaUnicom ? scope.row.chinaUnicom : 0)* 1000000 / 10000 }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaTelecom"
                        align="center"
                        label="电费分摊比例（电信）"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaTelecom ? scope.row.chinaTelecom : 0)* 1000000 / 10000 + '%' }}
                            </span>
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
                            <span>{{ scope.row.nextFlowSeqId === '02' ? '发起确认' : '发起退回' }}</span>
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
                            <span v-if="scope.row.nextFlowSeqId === '02'" class="operating" @click="editData(scope.row)">
                                修改
                            </span>
                            <span v-if="scope.row.nextFlowSeqId === '04'" class="operating" @click="goToDetail(scope.row)">
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
import { CONFIRM,GET_SETTI_INFO,CHANGE_CONFIRM_ID,BREAD_SHOW,CHANGE_CHECKED_OPTIONS,BATCH_CONFIRM_SETTI,REST_DATA } from './vuex.js';
import { Table,Message } from 'hongxin-ui';
import { MessageBox } from 'element-ui';

export default {
    name: 'settlementTable',
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
                    value: false
                },
                {
                    key: 'settlementShow',
                    value: true
                },
                {
                    key: 'proportionShow',
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
            searchInfo: state => state.searchInfo
        })
    },
    mounted () {
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
            this.$store.dispatch(`${CONFIRM}/${GET_SETTI_INFO}`,sendData).then(() => {
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
                    id: v.id,
                    seqId: v.seqId,
                    version: v.version,
                });
            });
            this.$store.commit(`${CONFIRM}/${CHANGE_CHECKED_OPTIONS}`, arr);
        },
        editData(res) {
            this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,{
                key: 'settlementData',
                value: false
            });
            this.breadData.forEach(item => {
                this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${CONFIRM}/${CHANGE_CONFIRM_ID}`,{
                id: res.id,
                seqId: res.seqId
            });
        },
        goToDetail(res) {
            this.breadData.forEach(item => {
                this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,{
                key: 'settlementData',
                value: true
            });
            this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,{
                key: 'settlementShow',
                value: false
            });
            this.$store.commit(`${CONFIRM}/${CHANGE_CONFIRM_ID}`,{
                id: res.id,
                seqId: res.seqId,
                version: res.version
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
                        this.$store.dispatch(`${CONFIRM}/${BATCH_CONFIRM_SETTI}`,this.checkedOptions).then(() => {
                            this.getTableData();
                        });
                    });
            }
        },
        singleConfirm(res) {
            let message = '';
            if(res.nextFlowSeqId === '02') {
                message = '确认发起投票?';
            } else {
                message = '确认发起退回?';
            }
            MessageBox.confirm(`${message}`, '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch(`${CONFIRM}/${BATCH_CONFIRM_SETTI}`,[{
                        id: res.id,
                        seqId: res.seqId,
                        version: res.version,
                        payType: res.payType
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





