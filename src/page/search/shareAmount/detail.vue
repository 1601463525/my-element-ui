<template>
    <div class="info-content">
        <el-form 
            :model="shareDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back"  class="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="地市:" prop="city">
                        <el-input v-model="shareDetailData.city" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县:" prop="area">
                        <el-input v-model="shareDetailData.area" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="shareDetailData.towerCode" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="stadionName">
                        <el-input v-model="shareDetailData.stadionName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址ID:" prop="stationId">
                        <el-input v-model="shareDetailData.stationId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电表号:" prop="meterNumber">
                        <el-input v-model="shareDetailData.meterNumber" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分摊方式:" prop="shareType">
                        <el-input v-model="shareDetailData.shareType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算周期起:" prop="startTime">
                        <el-input v-model="shareDetailData.startTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结算周期止:" prop="endTime">
                        <el-input v-model="shareDetailData.endTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算税率:" prop="taxRate">
                        <div class="priceTax">
                            <el-input v-model="shareDetailData.taxRate" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会计账期:" prop="taxDate">
                        <el-input v-model="shareDetailData.taxDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="分摊税率:" prop="shareTaxRate">
                        <div class="priceTax">
                            <el-input v-model="shareDetailData.shareTaxRate" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="加成比例:" prop="additionRatio">
                        <div class="priceTax">
                            <el-input v-model="shareDetailData.additionRatio" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="价税合计:" prop="taxCount">
                        <el-input v-model="shareDetailData.taxCount" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>电费分摊比例(固定比例)</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="mobileValue">
                        <div class="priceTax">
                            <el-input v-model="shareDetailData.mobileValue" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="unicomValue">
                        <div class="priceTax">
                            <el-input v-model="shareDetailData.unicomValue" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="teleValue">
                        <div class="priceTax">
                            <el-input v-model="shareDetailData.teleValue" :disabled="true"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>分摊金额</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="mobileMoney">
                        <el-input v-model="shareDetailData.mobileMoney" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="unicomMoney">
                        <el-input v-model="shareDetailData.unicomMoney" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="teleMoney">
                        <el-input v-model="shareDetailData.teleMoney" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="结算附件:" prop="files">
                        <a v-for="(item,index) in shareDetailData.files" :key="index">
                            <span class="download" @click="downLoad(item)">{{ item.fileName }}</span>
                        </a>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="历史轨迹:">
                        <history-table ></history-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SHARE,GET_SHARE_DETAIL,BREAD_SHOW  } from './vuex.js';
import HistoryTable from './history';
import { get } from 'axios';

export default {
    components: {
        'history-table': HistoryTable,
    },
    data () {
        return {
            fileUrl: window.BASE_URL + '/api/task/confirm/downloadFile',
            breadData: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'detailShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(SHARE, {
            shareId: state => state.shareId,
            shareDetailData: state => state.shareDetailData,
        })
    },
    created() {
        this.getSHAREDetail();
    },
    methods: {
        getSHAREDetail() {
            this.$store.dispatch(`${SHARE}/${GET_SHARE_DETAIL}`,{
                id: this.shareId
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
    }
</style>
