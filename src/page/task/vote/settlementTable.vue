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
                        prop="towerCode"
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
                        prop="chinaMobile"
                        align="center"
                        width="160"
                        label="电费分摊比例（移动）"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaMobile ? scope.row.chinaMobile : 0)* 100000000 / 1000000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaUnicom"
                        align="center"
                        width="160"
                        label="电费分摊比例（联通）"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaUnicom ? scope.row.chinaUnicom : 0)* 1000000 / 10000 + '%'}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaTelecom"
                        align="center"
                        width="160"
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
                            <span class="operating" @click="editData(scope.row)">
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
                            label-width="110px"
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
import { VOTE,GET_SETTI_INFO,CHANGE_VOTE_ID,BREAD_SHOW,CHANGE_CHECKED_OPTIONS,GET_CONS_RESULT,BATCH_VOTE_SETTI,REST_DATA } from './vuex.js';
import { Table,Message,Dialog, Button } from 'hongxin-ui';
import { MessageBox } from 'element-ui';

export default {
    name: 'settlementTable',
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
            voteResultOptions: [{
                label: '同意',
                value: '同意',
            },{
                label: '不同意',
                value: '不同意',
            }],
            voteTextLabel: '备注:',
            voteTextPlac: '请填写备注信息',
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
            ],
        };
    },
    computed: {
        ...mapState(VOTE, {
            loading: state => state.loading,
            confirmData: state => state.confirmData,
            confirmDataTotal: state => state.confirmDataTotal,
            checkedOptions: state => state.checkedOptions,
            searchInfo: state => state.searchInfo
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
            sendData.endTime = this.searchInfo.dataState[1];
            sendData.payType = this.searchInfo.payType;
            sendData.towerCode = this.searchInfo.towerCode;
            this.$store.dispatch(`${VOTE}/${GET_SETTI_INFO}`,sendData).then(() => {
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
            this.$store.commit(`${VOTE}/${CHANGE_CHECKED_OPTIONS}`, arr);
        },
        editData(res) {
            this.$store.commit(`${VOTE}/${CHANGE_VOTE_ID}`,{
                id: res.id,
                seqId: res.seqId
            });
            this.$store.dispatch(`${VOTE}/${GET_CONS_RESULT}`,{
                glttbh: res.towerCode,
                consno: res.consno,
            }).then(res => {
                if(res.msg === '01') {
                    this.breadData.forEach(item => {
                        this.$store.commit(`${VOTE}/${BREAD_SHOW}`,item);
                    });
                   
                } else {
                    Message.warning('电表信息未上链，暂不能进行投票！');
                }
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
                //     this.$store.dispatch(`${VOTE}/${BATCH_VOTE_SETTI}`,{
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
                    this.$store.dispatch(`${VOTE}/${BATCH_VOTE_SETTI}`,arr).then(() => {
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
                    this.$store.dispatch(`${VOTE}/${BATCH_VOTE_SETTI}`,{
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





