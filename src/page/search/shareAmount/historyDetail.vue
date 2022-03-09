<template>
    <div class="info-content" v-loading="historyDetailLoading">
        <el-form 
            :model="historyDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back"  class="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务类型:" prop="operate">
                        <el-select v-model="historyDetailData.operate" placeholder="请选择业务类型" :disabled="true">
                            <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="地市:" prop="ds">
                        <el-input v-model="historyDetailData.ds" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县:" prop="qx">
                        <el-input v-model="historyDetailData.qx" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="historyDetailData.towerCode" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="towerName">
                        <el-input v-model="historyDetailData.towerName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址ID:" prop="stationId">
                        <el-input v-model="historyDetailData.stationId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电表号:" prop="consno">
                        <el-input v-model="historyDetailData.consno" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分摊方式: " prop="shareType">
                        <el-select v-model="historyDetailData.shareType" placeholder="请选择分摊方式" :disabled="true">
                            <el-option v-for="item in shareTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算周期起:" prop="beginDate">
                        <el-input v-model="historyDetailData.beginDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结算周期止:" prop="endDate">
                        <el-input v-model="historyDetailData.endDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算税率:" prop="endTax">
                        <div class="priceTax">
                            <el-input v-model="historyDetailData.endTax" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会计账期:" prop="accountMonth">
                        <el-input v-model="historyDetailData.accountMonth" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="分摊税率:" prop="shareTax">
                        <div class="priceTax">
                            <el-input v-model="historyDetailData.shareTax" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="加成比例:" prop="addScale">
                        <div class="priceTax">
                            <el-input v-model="historyDetailData.addScale" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="价税合计:" prop="priceTax">
                        <el-input v-model="historyDetailData.priceTax" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>电费分摊比例</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="chinaMobile">
                        <div class="priceTax">
                            <el-input v-model="historyDetailData.chinaMobile" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <div class="priceTax">
                            <el-input v-model="historyDetailData.chinaUnicom" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <div class="priceTax">
                            <el-input v-model="historyDetailData.chinaTelecom" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <div class="title">
                <span>分摊金额</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="chinaMobile">
                        <el-input v-model="historyDetailData.mobileMoney" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="unicomMoney">
                        <el-input v-model="historyDetailData.unicomMoney" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="teleMoney">
                        <el-input v-model="historyDetailData.teleMoney" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="24">
                    <el-form-item label="结算附件:" prop="files">
                        <a v-for="(item,index) in historyDetailData.files" :key="index">
                            <span class="download" @click="downLoad(item)">{{ item.fileName }}</span>
                        </a>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="投票意见:">
                    <el-col :span="24">
                        <tieda-suggess :suggess='historyDetailData'></tieda-suggess>
                    </el-col>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SHARE,GET_HISTORY_DETAIL,BREAD_SHOW  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { operateOptions,kicketTypeOptions,shareTypeOptions } from '../../../commonData.js';
import { get } from 'axios';
export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
            operateOptions: operateOptions,
            kicketTypeOptions: kicketTypeOptions,
            shareTypeOptions: shareTypeOptions,
            fileUrl: window.BASE_URL + '/api/task/confirm/downloadFile',
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceabilityShow',
                    value: true
                },
                {
                    key: 'historyDetailShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(SHARE, {
            historyId: state => state.historyId,
            historyDetailData: state => state.traceDetailId,
            historyDetailLoading: state => state.historyDetailLoading,
        })
    },
    created() {
        // this.getHistoryDetail();
    },
    methods: {
        getHistoryDetail() {
            this.$store.dispatch(`${SHARE}/${GET_HISTORY_DETAIL}`,{
                id: this.historyId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
        },
        downLoad(item) {
            get(`${this.fileUrl}?mainId=${item.mainId}&mainSeqId=${item.mainSeqId}&fileName=${item.fileName}&fileLocation=${item.fileLocation}&filePage=${item.filePage}&fileState=${item.fileState}`, {
                responseType: 'blob'
            }).then(res => {
                
                if(res.status === 200){
                    const blob = new Blob([res.data]);
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                        const a = document.createElement('a');
                        a.download = item.fileName;
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                }
            }).catch(err => {
                console.log(err.message);
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
