<template>
    <div class="info-content" v-loading="confirmDetailLoading">
        <el-form 
            ref="settlementTable"
            :model="confirmDetailData" 
            :rules="confirmDetailDataRules"
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium"  @click="back">返回</el-button>
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
                    <el-form-item label="业务类型:" prop="operate">
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
                        <el-input v-model="confirmDetailData.ds" :disabled='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县:" prop="qx">
                        <el-input v-model="confirmDetailData.qx" :disabled='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="confirmDetailData.towerCode" :disabled='true'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="towerName">
                        <el-input v-model="confirmDetailData.towerName" :disabled='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址ID:" prop="stationId">
                        <el-input v-model="confirmDetailData.stationId" :disabled='true'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电表号: " prop="consno">
                        <el-input v-model="confirmDetailData.consno" :disabled='true'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分摊方式: " prop="shareType">
                        <el-select v-model="confirmDetailData.shareType" placeholder="请选择分摊方式" :disabled='true'>
                            <el-option v-for="item in shareTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算周期起: " prop="beginDate">
                        <el-date-picker
                            v-model="confirmDetailData.beginDate"
                            type="date"
                            placeholder="选择结算周期起"
                            :disabled='true'>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结算周期止: " prop="endDate">
                        <el-date-picker
                            v-model="confirmDetailData.endDate"
                            type="date"
                            placeholder="选择结算周期止"
                            :disabled='true'>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算税率: " prop="endTax">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.endTax" :disabled='true'></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会计账期: " prop="accountMonth">
                        <el-date-picker
                            v-model="confirmDetailData.accountMonth"
                            type="month"
                            placeholder="请选择会计账期"
                            :disabled='true'>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="价税合计: " prop="priceTax">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.priceTax" :disabled='true'></el-input>
                            <span class="unit">元</span>
                        </div>
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
                            <el-input v-model="confirmDetailData.chinaMobile" :disabled='true'></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaUnicom" :disabled='true'></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaTelecom" :disabled='true'></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文件: " prop="files">
                        <a v-for="(item,index) in confirmDetailData.files" :key="index">
                            <span class="download" @click="downLoad(item)">{{ item.fileName }}</span>
                        </a>
                        <!-- <el-upload
                            class="upload-demo"
                            action="/api/upload"
                            :before-upload="checkfile"
                            :on-change="handleChange"
                            :on-success="uploadSuccess"
                            :on-remove="removeFile"
                            :on-error="uploadError"
                            multiple
                            :limit="3"
                            :file-list="filesInfo.fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">支持文件格式：PNG，JPG，JPEG，PDF，PPT，PPTX，DOC，DOCX，大小限制50M</div>
                        </el-upload> -->
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { VOTE,GET_VOTE_SETTI_DETAIL,BREAD_SHOW,SUBMIT_VOTE_SETTI_DETAIL  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { Message } from 'hongxin-ui';
import { regionData, CodeToText, TextToCode } from 'element-china-area-data';
import { operateOptions,voteResultOptions,shareTypeOptions } from '../../../commonData.js';
import { get } from 'axios';

export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
            voteResultOptions: voteResultOptions,
            operateOptions: operateOptions,
            shareTypeOptions: shareTypeOptions,
            options: regionData,
            selectedOptions: ['110000','110100','110102'],
            fileUrl: window.BASE_URL + '/api/task/confirm/downloadFile',
            voteTextLabel: '备注:',
            voteTextPlac: '请填写备注信息',
            confirmDetailDataRules: {
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
            filesInfo: {
                link: [],
                fileList: []
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
        'confirmDetailData.voteResult': {
            deep:true,
            handler(newVal) {
                if(newVal === '同意'){
                    this.confirmDetailDataRules.opinion[0].required = false;
                    this.voteTextLabel = '备注:';
                    this.voteTextPlac = '请填写备注信息';
                } else {
                    this.confirmDetailDataRules.opinion[0].required = true;
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
            this.$store.dispatch(`${VOTE}/${GET_VOTE_SETTI_DETAIL}`, {
                ...this.confirmId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${VOTE}/${BREAD_SHOW}`,item);
            });
        },
        submit() {
            this.confirmDetailData.shareTax = this.confirmDetailData.shareTax / 100;
            this.confirmDetailData.addScale = this.confirmDetailData.addScale / 100;
            this.confirmDetailData.endTax = this.confirmDetailData.endTax / 100;
            this.confirmDetailData.chinaMobile = this.confirmDetailData.chinaMobile / 100;
            this.confirmDetailData.chinaUnicom = this.confirmDetailData.chinaUnicom / 100;
            this.confirmDetailData.chinaTelecom = this.confirmDetailData.chinaTelecom / 100;
            this.$store.dispatch(`${VOTE}/${SUBMIT_VOTE_SETTI_DETAIL}`,[{
                id: this.confirmDetailData.id,
                seqId: this.confirmDetailData.seqId,
                version: this.confirmDetailData.version,
                ...this.confirmDetailData
            }]).then(() => {
                this.back();
            });
        },
        handleChangeAddress(val) {
            console.log(CodeToText[val[0]], CodeToText[val[1]], CodeToText[val[2]]);
            let loc = '';
            for (let i = 0; i < this.selectedOptions.length; i++) {
                loc += CodeToText[this.selectedOptions[i]];
            }
            alert(loc);
        },
        removeFile(file, fileList) {
            this.offLineInfo.fileList = [].concat(fileList);
            if (fileList.length > 0) {
                let index = -1;
                this.offLineInfo.link.forEach((v, k) => {
                    if (file.status === 'success') {
                        if (v.name + '.' + v.path.split('.').pop().toLowerCase() === file.name) {
                            index = k;
                        }
                    }
                });
                if (index >= 0) {
                    this.offLineInfo.link.splice(index, 1);
                }
            } else {
                this.offLineInfo.link = [];
            }
        },
        uploadError(){
            Message.error('上传失败!');
            this.confirmDetailLoading = false;
        },
        uploadSuccess(res){
            this.filesInfo.link.push({
                path: res.result.filePath,
                name: res.result.fileSourceName
            });
            this.confirmDetailLoading = false;
        },
        handleChange(file, fileList) {
            this.filesInfo.fileList = [].concat(fileList);
        },
        checkfile(file){
            const typeArr = ['PNG','JPG','JPEG','PDF','PPT','PPTX','DOC','DOCX'];
            let temType = file.type.split('/')[1].toUpperCase(), isExist = false;
            const temStr = file.type.toUpperCase();
            if(
                temStr.indexOf('PPT') >= 0 ||
                temStr.indexOf('PPTX') >= 0 ||
                temStr.indexOf('DOC') >=0 ||
                temStr.indexOf('DOCX') >=0 ||
                temStr.indexOf('VND.OPENXMLFORMATS-OFFICEDOCUMENT') >= 0
            ){
                temType = 'PPTX';
            }
            if (this.filesInfo.fileList.length > 0) {
                this.filesInfo.fileList.forEach(v => {
                    if (v.status === 'success') {
                        if (v.name === file.name) {
                            isExist = true;
                        }
                    }
                });
            }
            const arr = file.name.split('.');
            temType = arr[arr.length-1].toUpperCase();
            const isType = typeArr.indexOf(temType)>=0;
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (isExist) {
                Message.error('该文件已存在，请重新上传!');
            }
            if (!isType) {
                Message.error('请上传指定格式的文件!');
            }
            if (!isLt50M) {
                Message.error('上传附件大小不能超过 50MB!');
            }

            if(isType && isLt50M && !isExist){
                this.confirmDetailLoading = true;
            }
            return isType && isLt50M && !isExist;
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
        .tip {
            position: absolute;
            right: 15px;
            bottom: 10px;
            font-size: 14px;
            color: #b3b3b3;
            line-height: 16px;
        }
        .download {
            cursor: pointer;
        }
    }
</style>
