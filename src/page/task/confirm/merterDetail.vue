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
                    <el-form-item label="业务类型:" prop="bussinessType">
                        <el-select v-model="confirmDetailData.operate" placeholder="请选择业务类型" :disabled="true">
                            <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="地市:" prop="ds">
                        <el-input v-model="confirmDetailData.ds" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县:" prop="qx">
                        <el-input v-model="confirmDetailData.qx" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址ID:" prop="stationId">
                        <el-input v-model="confirmDetailData.stationId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="glttbh">
                        <el-input v-model="confirmDetailData.glttbh" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="铁塔权属:" prop="ttqs">
                        <el-input v-model="confirmDetailData.ttqs" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电费类别:" prop="paymentType">
                        <el-input v-model="confirmDetailData.paymentType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电表号:" prop="consno">
                        <el-input v-model="confirmDetailData.consno" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="供电方式: " prop="supplyMode">
                        <el-select v-model="confirmDetailData.supplyMode" placeholder="请选择供电方式" disabled="true">
                            <el-option v-for="item in supplyModeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电表状态: " prop="isOnline">
                        <el-select v-model="confirmDetailData.isOnline" placeholder="请选择电表状态" disabled="true">
                            <el-option v-for="item in isOnlineOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="协议价格: " prop="agreementPrice">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.agreementPrice" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="对方单位/个人名称: " prop="meterCompany">
                        <el-input v-model="confirmDetailData.meterCompany" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否专票: " prop="kicketType">
                        <el-select v-model="confirmDetailData.kicketType" placeholder="请选择是否专票" :disabled="true">
                            <el-option v-for="item in kicketTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="税率: " prop="mTaxRate">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.mTaxRate" :disabled="true"></el-input>
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
import { CONFIRM,GET_CONFIRM_DETAIL,BREAD_SHOW  } from './vuex.js';
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
            this.$store.dispatch(`${CONFIRM}/${GET_CONFIRM_DETAIL}`,this.confirmId);
        },
        back() {
            this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,{
                key: 'searchInfo',
                value: {
                    pageNum: 1,
                    pageSize: 10,
                    taskName: '电表信息维护',
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
