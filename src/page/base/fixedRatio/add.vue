<template>
    <div class="info-content" v-loading="fixedRatioDataLoading">
        <el-form 
            ref="fixedRatioDataForm"
            :model="fixedRatioData" 
            :validate-on-rule-change="false"
            :rules="fixedRatioDataRules"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back"  class="back">返回</el-button>
                <el-button size="medium" type="primary" @click="submit"  class="back">提交</el-button>
            </div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="地市:" prop="ds">
                        <el-select v-model="userInfo.ds" placeholder="请选择地市" :disabled="userInfo.ds !== ''" >
                            <!-- <el-option v-for="item in towerAddrSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option> -->
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="区县:" prop="qx">
                        <el-select v-model="fixedRatioData.qx" placeholder="请选择区县" @click.native="getQxByDs">
                            <el-option v-for="item in qxData" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址来源分类:" prop="towerAddrSource">
                        <el-select v-model="fixedRatioData.towerAddrSource" placeholder="请选择站址来源分类" >
                            <el-option v-for="item in towerAddrSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="共享类型:" prop="shareType">
                        <el-checkbox-group v-model="fixedRatioData.shareType">
                            <el-checkbox label="移动"></el-checkbox>
                            <el-checkbox label="联通"></el-checkbox>
                            <el-checkbox label="电信"></el-checkbox>
                        </el-checkbox-group>
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
                            <el-input v-model="fixedRatioData.chinaMobile" ></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <div class="priceTax">
                            <el-input v-model="fixedRatioData.chinaUnicom" ></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <div class="priceTax">
                            <el-input v-model="fixedRatioData.chinaTelecom" ></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SITE,ADD_FIXED_RATIO,EDIT_FIXED_RATIO,GET_QX_BY_DS,BREAD_SHOW,RESEAT_DATA  } from './vuex.js';
export default {
    data () {
        return {
            towerAddrSourceOptions: [{
                label: '移动',
                value: '移动',
            },{
                label: '联通',
                value: '联通',
            },{
                label: '电信',
                value: '电信',
            },{
                label: '铁塔',
                value: '铁塔',
            }],
            breadData: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'detailShow',
                    value: false
                },
            ],
            fixedRatioDataRules: {
                ds: [
                    {
                        required: false,
                        message: '请选择地市',
                        trigger: 'blur',
                    },
                ],
                qx: [
                    {
                        required: false,
                        message: '请选择区县',
                        trigger: 'blur',
                    },
                ],
                towerAddrSource: [
                    {
                        required: true,
                        message: '请选择站址来源分类',
                        trigger: 'blur',
                    },
                ],
                shareType: [
                    {
                        required: true,
                        message: '请选择共享类型',
                        trigger: 'blur',
                    },
                ],
                chinaMobile: [
                    {
                        required: true,
                        message: '请填写电费分摊比例（移动）',
                        trigger: 'blur',
                    },
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '电费分摊比例（移动）为1~100之间的数字',
                        trigger: 'blur',
                    },
                ],
                chinaUnicom: [
                    {
                        required: true,
                        message: '请填写电费分摊比例（联通）',
                        trigger: 'blur',
                    },
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '电费分摊比例（联通）为1~100之间的数字',
                        trigger: 'blur',
                    },
                ],
                chinaTelecom: [
                    {
                        required: true,
                        message: '请填写电费分摊比例（电信）',
                        trigger: 'blur',
                    },
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '电费分摊比例（电信）为1~100之间的数字',
                        trigger: 'blur',
                    },
                ],
            }
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        ...mapState(SITE, {
            historyId: state => state.historyId,
            fixedRatioData: state => state.fixedRatioData,
            fixedRatioDataLoading: state => state.fixedRatioDataLoading,
            qxData: state => state.qxData,
        })
    },
    created() {
    },
    beforeDestroy () {
        this.$store.commit(`${SITE}/${RESEAT_DATA}`);
    },
    methods: {
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${SITE}/${BREAD_SHOW}`,item);
            });
        },
        submit() {
            this.$refs.fixedRatioDataForm.validate(valid => {
                if(valid) {
                    if(this.fixedRatioData.id) {
                        const shareType = this.getShareTypeData();
                        this.$store.dispatch(`${SITE}/${EDIT_FIXED_RATIO}`,{
                            id: this.fixedRatioData.id,
                            seqId: this.fixedRatioData.seqId,
                            version: this.fixedRatioData.version,
                            ds: this.userInfo.ds,
                            qx: this.fixedRatioData.qx,
                            chinaMobile: this.fixedRatioData.chinaMobile / 100,
                            chinaTelecom: this.fixedRatioData.chinaTelecom / 100,
                            chinaUnicom: this.fixedRatioData.chinaUnicom / 100,
                            towerAddrSource: this.fixedRatioData.towerAddrSource,
                            shareType: shareType,
                        }).then(() => {
                            this.back();
                        });
                    } else {
                        const shareType = this.getShareTypeData();
                        this.$store.dispatch(`${SITE}/${ADD_FIXED_RATIO}`,{
                            ds: this.userInfo.ds,
                            qx: this.fixedRatioData.qx,
                            chinaMobile: this.fixedRatioData.chinaMobile,
                            chinaTelecom: this.fixedRatioData.chinaTelecom,
                            chinaUnicom: this.fixedRatioData.chinaUnicom,
                            towerAddrSource: this.fixedRatioData.towerAddrSource,
                            shareType: shareType,
                        }).then(() => {
                            this.back();
                        });
                    }
                }
            });
        },
        getShareTypeData() {
            let shareType = '';
            if(this.fixedRatioData.shareType.length === 1) {
                shareType = this.fixedRatioData.shareType[0];
            } else if(this.fixedRatioData.shareType.length === 2) {
                shareType = `${this.fixedRatioData.shareType[0]}+${this.fixedRatioData.shareType[1]}`;
            } else if(this.fixedRatioData.shareType.length === 3) {
                shareType = `${this.fixedRatioData.shareType[0]}+${this.fixedRatioData.shareType[1]}+${this.fixedRatioData.shareType[2]}`;
            }
            return shareType;
        },
        getQxByDs() {
            this.$store.dispatch(`${SITE}/${GET_QX_BY_DS}`,{
                ds: this.userInfo.ds
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
        /deep/ .el-select {
            width: 100%;
        }
        
    }
</style>
