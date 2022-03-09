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
                        prop="towerAddrSource"
                        align="center"
                        label="站址来源分类"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareType"
                        align="center"
                        label="共享类型"
                    ></el-table-column>
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
                            <span>{{ scope.row.nextFlowSeqId === '03' ? '发起回退' : '发起确认' }}</span>
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
import { CONFIRM,GET_PROP_INFO,CHANGE_CONFIRM_ID,BREAD_SHOW,CHANGE_CHECKED_OPTIONS,BATCH_CONFIRM_PROP,REST_DATA } from './vuex.js';
import { Table,Message } from 'hongxin-ui';
import { MessageBox } from 'element-ui';

export default {
    name: 'proportionTable',
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
                    value: false,
                },
                {
                    key: 'proportionShow',
                    value: true,
                },
                {
                    key: 'settlementShow',
                    value: false,
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
            this.$store.dispatch(`${CONFIRM}/${GET_PROP_INFO}`,sendData).then(() => {
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
                        this.$store.dispatch(`${CONFIRM}/${BATCH_CONFIRM_PROP}`,this.checkedOptions).then(() => {
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
                    this.$store.dispatch(`${CONFIRM}/${BATCH_CONFIRM_PROP}`,[{
                        id: res.id,
                        seqId: res.seqId,
                        version: res.version,
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
                width: auto;
                height: 40px;
                line-height: 40px;
            }
        }
    }
  }
</style>





