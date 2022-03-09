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
                    <el-form-item label="业务类型:" prop="bussinessType">
                        <el-select v-model="historyDetailData.operate" placeholder="请选择业务类型" :disabled="true">
                            <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址来源分类:" prop="towerAddrSource">
                        <el-input v-model="historyDetailData.towerAddrSource" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="共享类型:" prop="shareType">
                        <el-input v-model="historyDetailData.shareType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>电费分摊比例</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="chinaMobile">
                        <el-input v-model="historyDetailData.chinaMobile" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <el-input v-model="historyDetailData.chinaUnicom" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <el-input v-model="historyDetailData.chinaTelecom" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="投票意见:">
                        <tieda-suggess :suggess='historyDetailData'></tieda-suggess>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SHARE,GET_HISTORY_DETAIL,BREAD_SHOW  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { operateOptions, } from '../../../commonData.js';
export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
            operateOptions: operateOptions,
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
            // historyId: state => state.historyId,
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
