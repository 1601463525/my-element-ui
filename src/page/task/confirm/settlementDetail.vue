<template>
    <div class="info-content" v-loading="confirmDetailLoading">
        <el-form 
            ref="confirmDetailForm"
            :model="confirmDetailData" 
            :validate-on-rule-change="false"
            :rules="confirmDetailDataRules"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium"  @click="back">返回</el-button>
                <el-button size="medium" type="primary" @click="submit">提交</el-button>
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
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="confirmDetailData.towerCode" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="towerName">
                        <el-input v-model="confirmDetailData.towerName" :disabled="true"></el-input>
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
                    <el-form-item label="电表号: " prop="consno">
                        <el-input v-model="confirmDetailData.consno" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分摊方式: " prop="shareType">
                        <el-select v-model="confirmDetailData.shareType" placeholder="请选择分摊方式">
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
                            <el-input v-model="confirmDetailData.endTax" :disabled="true"></el-input>
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
                <el-col :span="12">
                    <el-form-item label="分摊税率: " prop="shareTax">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.shareTax" :disabled="true"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="加成比例: " prop="addScale">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.addScale" :disabled="false"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="价税合计: " prop="priceTax">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.priceTax" :disabled="false"></el-input>
                            <span class="unit">元</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>{{ labelText }}</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="chinaMobile">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaMobile" :disabled="chinaDisable"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="chinaUnicom">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaUnicom" :disabled="chinaDisable"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="chinaTelecom">
                        <div class="priceTax">
                            <el-input v-model="confirmDetailData.chinaTelecom" :disabled="chinaDisable"></el-input>
                            <span class="unit">%</span>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="上传文件: " prop="chinaTelecom">
                        <el-upload
                            class="upload-demo"
                            :http-request="onUpload"
                            action=""
                            :before-upload="checkfile"
                            :on-change="handleChange"
                            :on-success="uploadSuccess"
                            :on-remove="removeFile"
                            :on-error="uploadError"
                            multiple
                            :limit="3"
                            :file-list="filesInfo.fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">支持文件格式：PNG，JPG，JPEG，PDF，PPT，PPTX，DOC，DOCX，XLS，XLSX，.RAR，.ZIP大小限制10M</div>
                        </el-upload>
                        <!-- <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" accept=".docx,.doc,.pdf,.png,.jpg,.jpeg,.ppt,.pptx,.xls">
                        <div class="tip">支持文件格式：PNG，JPG，JPEG，PDF，PPT，PPTX，DOC，DOCX，XLS，大小限制50M</div> -->
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { CONFIRM,GET_CONFIRM_SETTI_DETAIL,BREAD_SHOW,SUBMIT_CONFIRM_SETTI_DETAIL  } from './vuex.js';
import Suggess from '~c/suggess/app';
import { Message } from 'hongxin-ui';
import { operateOptions,kicketTypeOptions,shareTypeOptions } from '../../../commonData.js';

export default {
    components: {
        'tieda-suggess': Suggess,
    },
    data () {
        return {
            operateOptions: operateOptions,
            kicketTypeOptions: kicketTypeOptions,
            shareTypeOptions: shareTypeOptions,
            filesInfo: {
                link: [],
                fileList: []
            },
            labelText: '',
            chinaDisable: true,
            confirmDetailDataRules: {
                shareType: [
                    {
                        required: true,
                        message: '请选择分摊方式',
                        trigger: 'blur',
                    },
                ],
                addScale: [
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '加成比例为0~100之间的数字',
                        trigger: 'blur',
                    },
                ],
                priceTax: [
                    {
                        required: true,
                        message: '请填写价税合计',
                        trigger: 'blur',
                    },
                    {
                        pattern: /\d/,
                        message: '价税合计为数字',
                        trigger: 'blur',
                    },
                ],
                chinaMobile: [
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '移动分摊比例为0~100之间的数字',
                        trigger: 'blur',
                    },
                ],
                chinaUnicom: [
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '联通分摊比例为0~100之间的数字',
                        trigger: 'blur',
                    },
                ],
                chinaTelecom: [
                    {
                        pattern: /\b(0*(?:[1-9][0-9]?|100))\b/,
                        message: '电信分摊比例为0~100之间的数字',
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
                {
                    key: 'settlementData',
                    value: false
                },
            ],
            xlsxFile: '',
        };
    },
    computed: {
        ...mapState(CONFIRM, {
            confirmId: state => state.confirmId,
            confirmDetailData: state => state.confirmDetailData,
            confirmDetailLoading: state => state.confirmDetailLoading,
        })
    },
    watch: {
        'confirmDetailData.shareType': {
            deep:true,
            handler(newVal) {
                const text = newVal === '01' ? '固定比例' : newVal === '02' ? '分路计量' : '个性比例';
                this.labelText = `电费分摊比例(${text})`;
                if(newVal === '01') {
                    this.chinaDisable = true;
                } else if(newVal === '02'){
                    this.chinaDisable = false;
                } else if(newVal === '03'){
                    this.chinaDisable = false;
                }
            },
        }
    },
    created() {
        this.getConfirmDetail();
    },
    methods: {
        getConfirmDetail() {
            this.$store.dispatch(`${CONFIRM}/${GET_CONFIRM_SETTI_DETAIL}`,this.confirmId).then(res => {
                if(res.files.length > 0) {
                    this.filesInfo.fileList.push();
                }
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${CONFIRM}/${BREAD_SHOW}`,item);
            });
        },
        onUpload({file}) {
            
            const formData = new window.FormData(); 
            formData.append('files', file);
            this.confirmDetailData.shareTax = this.confirmDetailData.shareTax / 100;
            this.confirmDetailData.addScale = this.confirmDetailData.addScale / 100;
            this.confirmDetailData.endTax = this.confirmDetailData.endTax / 100;
            formData.append('jsonData', JSON.stringify(this.confirmDetailData));
            console.log(`onUpload=${JSON.stringify(this.confirmDetailData)}`);
            this.$store.dispatch(`${CONFIRM}/${SUBMIT_CONFIRM_SETTI_DETAIL}`,formData);
        },
        submit() {
            if(!this.confirmDetailData.chinaMobile && !this.confirmDetailData.chinaUnicom && !this.confirmDetailData.chinaTelecom && this.confirmDetailData.shareType !== '01' ) {
                Message.warning('移动、联通、电信分摊比例至少填写一项！');
            } else {
                const formData = new window.FormData(); 
                formData.append('files', this.xlsxFile);
                this.confirmDetailData.shareTax = this.confirmDetailData.shareTax / 100;
                this.confirmDetailData.addScale = this.confirmDetailData.addScale / 100;
                this.confirmDetailData.endTax = this.confirmDetailData.endTax / 100;
                this.confirmDetailData.chinaMobile = this.confirmDetailData.chinaMobile / 100;
                this.confirmDetailData.chinaUnicom = this.confirmDetailData.chinaUnicom / 100;
                this.confirmDetailData.chinaTelecom = this.confirmDetailData.chinaTelecom / 100;
                formData.append('jsonData', JSON.stringify(this.confirmDetailData));
                console.log(`summit=${JSON.stringify(this.confirmDetailData)}`);
                this.$store.dispatch(`${CONFIRM}/${SUBMIT_CONFIRM_SETTI_DETAIL}`,formData).then(() => {
                    this.back();
                });
            }
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
            
            const typeArr = ['PNG','JPG','JPEG','PDF','PPT','PPTX','DOC','DOCX','XLS','XLSX'];
            let temType = file.type.split('/')[1].toUpperCase(), isExist = false;
            const temStr = file.type.toUpperCase();
            if(
                temStr.indexOf('PPT') >= 0 ||
                temStr.indexOf('PPTX') >= 0 ||
                temStr.indexOf('DOC') >=0 ||
                temStr.indexOf('DOCX') >=0 ||
                temStr.indexOf('XLS') >=0 ||
                temStr.indexOf('XLSX') >=0 ||
                temStr.indexOf('VND.OPENXMLFORMATS-OFFICEDOCUMENT') >= 0
            ){
                temType = 'PPTX';
            }
            if (this.filesInfo.fileList.length > 0) {
                this.filesInfo.fileList.forEach(v => {
                    console.log('XLSXXLSXXLSXXLSXXLSX'+JSON.stringify(v));
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
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (isExist) {
                Message.error('该文件已存在，请重新上传!');
            }
            if (!isType) {
                Message.error('请上传指定格式的文件!');
            }
            if (!isLt10M) {
                Message.error('上传附件大小不能超过 10MB!');
            }

            if(isType && isLt10M && !isExist){
                this.confirmDetailLoading = true;
            }
            return isType && isLt10M && !isExist;
        },
        getFile(event){
            
            //获取file内容
            const files = this.$refs.clearFile.files[0];
            // let isIE = /msie/i.test(navigator.userAgent) && !window.opera;
            // let fileSize = 0;
            // let filetypes =[".jpg",".png",".rar",".txt",".zip",".doc",".ppt",".xls",".pdf",".docx",".xlsx"];
            // let filepath = event.target.value;
            // let filemaxsize = 1024*2;//2M
            // if(filepath){
            //     let isnext = false;
            //     let fileend = filepath.substring(filepath.lastIndexOf("."));
            //     if(filetypes && filetypes.length>0){
            //         for(let i =0; i<filetypes.length;i++){
            //             if(filetypes[i]==fileend){
            //                 isnext = true;
            //                 break;
            //             }
            //         }
            //     }
            //     if(!isnext){
            //         alert("不接受此文件类型！");
            //         event.target.value ="";
            //         return false;
            //     }
            // }else{
            //     return false;
            // }
            // if (isIE && !event.target.files) {
            //     let filePath = event.target.value;
            //     let fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            //     if(!fileSystem.FileExists(filePath)){
            //         alert("附件不存在，请重新输入！");
            //         return false;
            //     }
            //     let file = fileSystem.GetFile (filePath);
            //     fileSize = file.Size;
            // } else {
            //     fileSize = event.target.files[0].size;
            // }
    
            // let size = fileSize / 1024;
            // if(size>filemaxsize){
            //     alert("附件大小不能大于"+filemaxsize/1024+"M！");
            //     event.target.value ="";
            //     return false;
            // }
            // if(size<=0){
            //     alert("附件大小不能为0M！");
            //     event.target.value ="";
            //     return false;
            // }
            this.xlsxFile = files;
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
        .tip {
            font-size: 12px;
            color: #606266;
            margin-top: 7px;
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
