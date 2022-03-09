<template>
    <div class="info-content" v-loading="confirmDetailLoading">
        <el-form 
            ref="proportionDetail"
            :model="confirmDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" @click="back">返回</el-button>
                <el-button size="medium" type="primary" @click="submit">提交</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-form-item
                        label="投票结果: "
                        prop="voteResult"
                    >
                        <el-select v-model="confirmDetailData.voteResult" placeholder="请选择投票结果">
                            <el-option v-for="item in voteResultOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item :label="voteTextLabel" prop="opinion">
                        <el-input
                            v-model="confirmDetailData.opinion"
                            maxlength="140"
                            type="textarea"
                            :placeholder="voteTextPlac"
                        ></el-input>
                        <span
                            class="tip"
                        >{{ confirmDetailData.opinion.length }} / 140</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务类型:" prop="bussinessType">
                        <el-select v-model="confirmDetailData.operate" placeholder="请选择业务类型" :disabled="true">
                            <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="站址来源分类:" prop="towerAddrSource">
                        <el-input v-model="confirmDetailData.towerAddrSource" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="地市:" prop="ds">
                        <el-input v-model="confirmDetailData.ds" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="区县:" prop="qx">
                        <el-input v-model="confirmDetailData.qx" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="共享类型:" prop="shareType">
                        <el-input v-model="confirmDetailData.shareType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>电费分摊比例(固定比例)</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="chinaMobile">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaMobile" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaUnicom" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaTelecom" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-form-item label="投票意见:">
                    <el-col :span="24">
                        <tieda-suggess :suggess='confirmDetailData'></tieda-suggess>
                    </el-col>
                </el-form-item>
            </el-row> -->
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { VOTE,GET_VOTE_PROP_DETAIL,BREAD_SHOW,BATCH_VOTE_PROP  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { operateOptions,kicketTypeOptions,isOnlineOptions,supplyModeOptions } from '../../../commonData.js';

export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
            operateOptions: operateOptions,
            kicketTypeOptions: kicketTypeOptions,
            isOnlineOptions: isOnlineOptions,
            supplyModeOptions: supplyModeOptions,
            batchVoteInfo: {
                voteResult: '',
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
                    value: true
                },
                {
                    key: 'detailShow',
                    value: false
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
        ...mapState(VOTE, {
            confirmId: state => state.confirmId,
            confirmDetailData: state => state.confirmDetailData,
            confirmDetailLoading: state => state.confirmDetailLoading,
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
        this.getConfirmDetail();
    },
    methods: {
        getConfirmDetail() {
            this.$store.dispatch(`${VOTE}/${GET_VOTE_PROP_DETAIL}`,this.confirmId);
        },
        back() {
            this.$store.commit(`${VOTE}/${BREAD_SHOW}`,{
                key: 'searchInfo',
                value: {
                    pageNum: 1,
                    pageSize: 10,
                    taskName: '固定比例维护',
                    dataState: [],
                    payType: '',
                }
            });
            this.breadData.forEach(item => {
                this.$store.commit(`${VOTE}/${BREAD_SHOW}`,item);
            });
            this.$refs.merterDetail.resetFields();
            this.batchVoteInfoRules.opinion[0].required = false;
        },
        submit() {
            this.$store.dispatch(`${VOTE}/${BATCH_VOTE_PROP}`,[{
                id: this.confirmDetailData.id,
                seqId: this.confirmDetailData.seqId,
                version: this.confirmDetailData.version,
                ...this.confirmDetailData
            }]).then(() => {
                this.back();
            });
        },
    }
};
</script>
<style lang="scss" scoped>
    .info-content {
        margin: 20px;
        font-size: 16px;
        .back {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        .title {
            height: 40px;
            margin-left: 100px;
            font-size: 14px;
            font-weight: 400;
            color: #B0B0B0;
        }
        .priceTax {
            display: flex;
            .unit {
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #f4f8fb;
                display: inline-block;
                border: 1px solid #dcdfe6;
                border-left: none;
            }
        }
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
</style>
