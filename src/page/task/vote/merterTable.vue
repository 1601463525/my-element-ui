<template>
    <div class="content" >
        <div class="operate-box">
            <div>
                <el-button size="medium" @click="batchConfirm">批量投票</el-button>
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
                        prop="stationId"
                        align="center"
                        label="站址ID"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="supplyMode"
                        label="供电方式"
                        align="center"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.supplyMode === 0 ? '直供':'转供' }}</span>
                        </template>
                    </el-table-column>
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
                        width="150"
                        fixed="right"
                        prop="createDate"
                        align="center"
                        label="任务创建时间"
                    ></el-table-column>
                    <el-table-column
                        width="100"
                        align="center"
                        fixed="right"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <span class="operating" @click="goToDetail(scope.row)">
                                投票
                            </span>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
        <div>
            <el-dialog
                :v-loading="dialogLoading"
                :visible="showDig"
                :before-close="handleClose"
                title="批量处理"
                class="add-good-content"
            >
                <div class="content">
                    <el-scrollbar style="height: 100%">
                        <el-form
                            ref="batchVoteInfo"
                            :model="batchVoteInfo"
                            :rules="batchVoteInfoRules"
                            :validate-on-rule-change="false"
                            label-width="90px"
                        >
                            <el-row>
                                <el-col :span="22">
                                    <el-form-item
                                        label="投票结果: "
                                        prop="voteResult"
                                    >
                                        <el-select v-model="batchVoteInfo.voteResult" placeholder="请选择投票结果">
                                            <el-option v-for="item in voteResultOptions" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22">
                                    <el-form-item :label="voteTextLabel" prop="opinion">
                                        <el-input
                                            v-model="batchVoteInfo.opinion"
                                            maxlength="140"
                                            type="textarea"
                                            :placeholder="voteTextPlac"
                                        ></el-input>
                                        <span
                                            class="tip"
                                        >{{ batchVoteInfo.opinion.length }} / 140</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-scrollbar>
                    <div class="btns">
                        <hongxin-button
                            :type="'cancel'"
                            :size="'small'"
                            :class="'cancel btn'"
                            @click="handleClose"
                        >取消</hongxin-button>
                        <hongxin-button
                            :type="'sure'"
                            :size="'small'"
                            :class="'commit btn'"
                            @click="sureVote"
                        >提交</hongxin-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { VOTE,GET_VOTE_INFO,CHANGE_VOTE_ID,BREAD_SHOW,CHANGE_CHECKED_OPTIONS,BATCH_VOTE,REST_DATA } from './vuex.js';
import { Table,Message,Dialog, Button } from 'hongxin-ui';
import { MessageBox } from 'element-ui';

export default {
    components: {
        'hongxin-table': Table,
        'hongxin-button': Button,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            dialogLoading: false,
            showDig: false,
            batchVoteInfo: {
                voteResult: '同意',
                opinion: '',
            },
            voteTextLabel: '备注:',
            voteTextPlac: '请填写备注信息',
            voteResultOptions: [{
                label: '同意',
                value: '同意',
            },{
                label: '不同意',
                value: '不同意',
            }],
            batchVoteInfoRules: {
                voteResult: [
                    {
                        required: true,
                        message: '请选择投票结果',
                        trigger: 'blur',
                    },
                ],
                opinion: [
                    {
                        required: false,
                        message: '请填写备注信息',
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        max: 140,
                        message: '长度在 1 到 140 个字符',
                        trigger: 'blur',
                    },
                ],
            },
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
            ],
        };
    },
    computed: {
        ...mapState(VOTE, {
            loading: state => state.loading,
            confirmData: state => state.confirmData,
            confirmDataTotal: state => state.confirmDataTotal,
            checkedOptions: state => state.checkedOptions,
            searchInfo: state => state.searchInfo,
        })
    },
    watch: {
        'batchVoteInfo.voteResult': {
            deep:true,
            handler(newVal) {
                if(newVal === '同意'){
                    this.batchVoteInfoRules.opinion[0].required = false;
                    this.voteTextLabel = '备注:';
                    this.voteTextPlac = '请填写备注信息';
                } else {
                    this.batchVoteInfoRules.opinion[0].required = true;
                    this.voteTextLabel = '不同意原因:';
                    this.voteTextPlac = '请填写不同意原因';
                }
            },
        }
    },
    created() {
        this.getTableData();
    },
    beforeDestroy() {
        this.$store.commit(`${VOTE}/${REST_DATA}`);
    },
    methods: {
        getTableData() {
            const sendData = {};
            sendData.pageNum = this.searchInfo.pageNum;
            sendData.pageSize = this.searchInfo.pageSize;
            sendData.startTime = this.searchInfo.dataState[0];
            sendData.endTime =this.searchInfo.dataState[1];
            sendData.payType = this.searchInfo.payType;
            sendData.towerCode = this.searchInfo.towerCode;
            this.$store.dispatch(`${VOTE}/${GET_VOTE_INFO}`,sendData).then(() => {
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
            this.$store.commit(`${VOTE}/${CHANGE_CHECKED_OPTIONS}`, arr);
        },
        goToDetail(res) {
            this.breadData.forEach(item => {
                this.$store.commit(`${VOTE}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${VOTE}/${CHANGE_VOTE_ID}`,{
                id: res.id,
                seqId: res.seqId
            });
        },
        batchConfirm() {
            if(this.checkedOptions.length === 0) {
                Message.warning('请先选择需要投票的数据！');
            } else {
                this.showDig = true;
                this.$refs.batchVoteInfo.resetFields();
                this.batchVoteInfoRules.opinion[0].required = false;
                // MessageBox.confirm('请确认任务信息？', '提示', {
                //     type: 'warning',
                // })
                // .then(() => {
                //     this.$store.dispatch(`${VOTE}/${BATCH_VOTE}`,{
                //         id: this.checkedOptions.toString()
                //     }).then(() => {
                //         this.getTableData();
                //     });
                // });
            }
        },
        handleClose() {
            this.showDig = false;
            this.$refs.batchVoteInfo.resetFields();
            this.batchVoteInfoRules.opinion[0].required = false;
        },
        sureVote() {
            this.$refs.batchVoteInfo.validate(valid => {
                if (valid) {
                    const arr = [];
                    this.checkedOptions.forEach(v => {
                        arr.push({
                            ...v,
                            ...this.batchVoteInfo
                        });
                    });
                    this.$store.dispatch(`${VOTE}/${BATCH_VOTE}`,arr).then(() => {
                        this.handleClose();
                        this.getTableData();
                    });
                }
            });
        },
        singleConfirm(res) {
            MessageBox.confirm('请确认任务信息？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch(`${VOTE}/${BATCH_VOTE}`,{
                        id: res.id
                    }).then(() => {
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
    .add-good-content {
        height: calc(100% - 50px);
        .content {
            width: 100%;
            height: calc(100% - 59px);
            background: #fff;
            padding: 6px 30px 0;
            box-sizing: border-box;
            /deep/.el-textarea {
                .el-textarea__inner {
                    height: 92px;
                }
            }
            /deep/ .el-select {
                width: 100%;
            }
            .tip {
                position: absolute;
                right: 15px;
                bottom: 10px;
                font-size: 14px;
                color: #b3b3b3;
                line-height: 16px;
            }
        }
        .btns {
            width: 100%;
            height: 59px;
            text-align: center;
            background: #fff;
            .btn {
                width: 80px;
                height: 30px;
                font-size: 14px;
                margin-top: 14.5px;
            }
        }
    }
  }
</style>





