<template>
    <div class="info-content" v-loading="traceDetailLoading">
        <el-form 
            :model="traceDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="业务类型:" prop="bussinessType">
                        <el-input v-model="traceDetailData.bussinessType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="地市:" prop="city">
                        <el-input v-model="traceDetailData.city" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县:" prop="area">
                        <el-input v-model="traceDetailData.area" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="traceDetailData.towerCode" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="stationName">
                        <el-input v-model="traceDetailData.stationName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址ID:" prop="stationId">
                        <el-input v-model="traceDetailData.stationId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电表号: " prop="merterNum">
                        <el-input v-model="traceDetailData.merterNum" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分摊方式: " prop="shareType">
                        <el-input v-model="traceDetailData.originalUnit" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="服务起始日期: " prop="startTime">
                        <el-input v-model="traceDetailData.startTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="服务结束日期: " prop="endTime">
                        <el-input v-model="traceDetailData.endTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="结算汇率: " prop="endTax">
                        <el-input v-model="traceDetailData.endTax" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="会计账期: " prop="accountMonth">
                        <el-input v-model="traceDetailData.accountMonth" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="分摊税率: " prop="shareTax">
                        <el-input v-model="traceDetailData.shareTax" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="加成比例: " prop="addScale">
                        <el-input v-model="traceDetailData.addScale" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="价税合计: " prop="priceTax">
                        <el-input v-model="traceDetailData.priceTax" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>电费分摊比例(固定比例)</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="chinaMobile">
                        <el-input v-model="traceDetailData.chinaMobile" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <el-input v-model="traceDetailData.chinaUnicom" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <el-input v-model="traceDetailData.chinaTelecom" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="结算附件: " prop="files">
                        <a v-for="(item,index) in traceDetailData.files" :key="index">
                            <span class="download" @click="downLoad(item)">{{ item.fileName }}</span>
                        </a>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="投票意见:">
                    <el-col :span="24">
                        <tieda-suggess :suggess='traceDetailData'></tieda-suggess>
                    </el-col>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { ELECTRICITY,GET_TRACE_DETAIL,BREAD_SHOW  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { get } from 'axios';

export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
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
                    key: 'traceDetailShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(ELECTRICITY, {
            traceDetailId: state => state.traceDetailId,
            traceDetailData: state => state.traceDetailData,
            traceDetailLoading: state => state.traceDetailLoading,
        })
    },
    created() {
        this.getSiteDetail();
    },
    methods: {
        getSiteDetail() {
            this.$store.dispatch(`${ELECTRICITY}/${GET_TRACE_DETAIL}`,{
                id: this.traceDetailId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${ELECTRICITY}/${BREAD_SHOW}`,item);
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
    }
</style>
