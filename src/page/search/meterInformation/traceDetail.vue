<template>
    <div class="meter-trace-detail-main" v-loading="historyLoading">
        <el-form
            :model="traceDetailInfo"
            :validate-on-rule-change="false"
            label-width="150px"
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务类型">
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
                        <el-select v-model="confirmDetailData.supplyMode" placeholder="请选择供电方式" :disabled="true">
                            <el-option v-for="item in supplyModeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电表状态: " prop="isOnline">
                        <el-select v-model="confirmDetailData.isOnline" placeholder="请选择电表状态" :disabled="true">
                            <el-option v-for="item in isOnlineOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="对方单位/个人名称: " prop="meterCompany">
                        <el-input v-model="confirmDetailData.meterCompany" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="协议价格: " prop="agreementPrice">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.agreementPrice" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
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
                <el-col :span="24">
                    <el-form-item label="投票意见:">
                        <tieda-suggess :suggess="confirmDetailData"></tieda-suggess>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_METER_TRACE_DETAIL, METERS_INFO, MODIFY_CONTENT_DISPLAY } from './vuex';
import Suggess from '~c/suggess/app';
import { operateOptions,kicketTypeOptions,isOnlineOptions,supplyModeOptions } from '../../../commonData.js';

export default {
    components: {
        'tieda-suggess': Suggess
    },
    computed: {
        ...mapState(METERS_INFO, {
            confirmDetailData: state => state.traceId,
            traceDetailLoading: state => state.traceDetailLoading,
            traceDetailInfo: state => state.traceDetailInfo
        })
    },
    data() {
        return {
            operateOptions: operateOptions,
            kicketTypeOptions: kicketTypeOptions,
            isOnlineOptions: isOnlineOptions,
            supplyModeOptions: supplyModeOptions,
            backDisplayParams: [
                {
                    key: 'tableShow',
                    value: false
                },
                // {
                //     key: 'historyShow',
                //     value: true
                // },
                {
                    key: 'traceLineShow',
                    value: true
                },
                {
                    key: 'historyTraceShow',
                    value: false
                }
            ]
        };
    },
    created() {
        // this.getTraceDetail();
    },
    methods: {
        getTraceDetail() {
            this.$store.dispatch(`${METERS_INFO}/${GET_METER_TRACE_DETAIL}`, {
                id: this.traceId
            });
        },
        back() {
            this.backDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.meter-trace-detail-main {
    margin: 20px;
    font-size: 16px;
    .back {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
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
