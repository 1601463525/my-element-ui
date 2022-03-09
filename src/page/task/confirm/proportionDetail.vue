<template>
    <div class="info-content" v-loading="confirmDetailLoading">
        <el-form 
            :model="confirmDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务类型:" prop="operate">
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
            <el-row>
                <el-form-item label="投票意见:">
                    <el-col :span="24">
                        <tieda-suggess :suggess='confirmDetailData'></tieda-suggess>
                    </el-col>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { CONFIRM,GET_CONFIRM_PROP_DETAIL,BREAD_SHOW  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { operateOptions,kicketTypeOptions } from '../../../commonData.js';

export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
            operateOptions: operateOptions,
            kicketTypeOptions: kicketTypeOptions,
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
                {
                    key: 'settlementData',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(CONFIRM, {
            confirmId: state => state.confirmId,
            confirmDetailData: state => state.confirmDetailData,
            confirmDetailLoading: state => state.confirmDetailLoading,
        })
    },
    created() {
        this.getConfirmDetail();
    },
    methods: {
        getConfirmDetail() {
            this.$store.dispatch(`${CONFIRM}/${GET_CONFIRM_PROP_DETAIL}`,this.confirmId);
        },
        back() {
            this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,{
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
                this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,item);
            });
        }
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
        /deep/ .el-date-editor {
             width: 100%;
        }
        /deep/ .el-cascader {
             width: 100%;
        }
    }
</style>
