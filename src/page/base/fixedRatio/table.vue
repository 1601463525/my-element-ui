<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>站址来源分类：</span>
                        <el-select v-model="towerAddrSource" placeholder="请选择站址来源分类" clearable>
                            <el-option v-for="item in towerAddrSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span style="width: 80px;">共享类型：</span>
                        <el-select v-model="shareType" multiple placeholder="请选择共享类型" clearable>
                            <el-option v-for="item in shareTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span class="filter-commit" @click="searchData">查询</span>
                <span class="filter-reset" @click="reset">重置</span>
            </div>
        </div>
        <div class="operate-box operate-box-bottom">
            <div class="add operate-btn" @click="addFixedRatioData">
                <i class="el-icon-plus"></i>
                新增    
            </div>
            <div class="add operate-btn">
                <el-upload
                    ref="upload"
                    :http-request="onUpload"
                    :auto-upload="true"
                    :on-change="onChange"
                    :file-list="fileList"
                    :multiple="false"
                    :show-file-list="false"
                    action=""
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                >
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="请上传10M以内的XLS或者XLSX文件"
                        placement="bottom"
                    >
                        <el-button size="medium" icon="el-icon-download" type="primary">Execl导入</el-button>
                    </el-tooltip>
                </el-upload>
            </div>
            <div class="add operate-btn" @click="batchDelete">
                <i class="el-icon-delete"></i>
                批量删除    
            </div>
        </div>
        <!-- <div class="content" >
        <div class="operate-box">
            <div>
                <span>站址来源分类：</span>
                <el-select v-model="towerAddrSource" placeholder="请选择站址来源分类" clearable>
                    <el-option v-for="item in towerAddrSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span style="width: 80px;">共享类型：</span>
                <el-select v-model="shareType" multiple placeholder="请选择共享类型" clearable>
                    <el-option v-for="item in shareTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="searchData">查询</el-button>
            </div>
            <div>
                <el-button size="medium" @click="reset">重置</el-button>
            </div>
        </div>
        <div class="operate-box"> 
            <div>
                <el-button size="medium" icon="el-icon-plus" type="primary" @click="addFixedRatioData">新增</el-button>
            </div>
            <div>
                <el-upload
                    ref="upload"
                    :http-request="onUpload"
                    :auto-upload="true"
                    :on-change="onChange"
                    :file-list="fileList"
                    :multiple="false"
                    :show-file-list="false"
                    action=""
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                >
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="请上传10M以内的XLS或者XLSX文件"
                        placement="bottom"
                    >
                        <el-button size="medium" icon="el-icon-download" type="primary">Execl导入</el-button>
                    </el-tooltip>
                </el-upload>
            </div>
            <div>
                <el-button size="medium" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
            </div>
        </div> -->
        <div class="select-box-bottom">
            <span><i class="el-icon-warning"></i></span>
            <span>已选择<span>{{ checkedOptions.length }}</span>项</span>
            <span @click="clearSelect">清空</span>
        </div>
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <hongxin-table
                    v-loading="siteLoading"
                    ref="table"
                    :class-name="['table-gray', 'medium']"
                    :data="siteData"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :total="Number(total)"
                    :max-height="tableHeight"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
                    @size-change="sizeChange"
                    @current-page-change="currentChange"
                    @selection-change="changeSelect"
                >
                    <el-table-column
                        fixed
                        align="center"
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="towerAddrSource"
                        label="站址来源分类"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareType"
                        label="共享类型"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ds"
                        label="地市"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="qx"
                        label="区县"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaMobile"
                        label="电费分摊比例（移动）"
                        width="180"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaMobile ? scope.row.chinaMobile : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaUnicom"
                        label="电费分摊比例（联通）"
                        width="180"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaUnicom ? scope.row.chinaUnicom : 0)* 1000000 / 10000 + '%'  }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaTelecom"
                        label="电费分摊比例（电信）"
                        width="180"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaTelecom ? scope.row.chinaTelecom : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span class="operating" @click="editData(scope.row)">
                                修改
                            </span>
                            <span class="operating" @click="deleteData(scope.row)">
                                删除
                            </span>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SITE,GET_SITE_INFO,CHANGE_SITE_ID,BREAD_SHOW,DELETE_SHUNT_DATA,CHANGE_CHECKED_OPTIONS,CHANGE_SHUNT_LIST,CHANGE_ADD_DATA,UPLOAD_EXECL_DATA } from './vuex.js';
import { Table,Message } from 'hongxin-ui';
import { MessageBox } from 'element-ui';
import { towerAddrSourceOptions } from '../../../commonData.js';
import { get,post } from 'axios';

export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 350,
            pageNum: 1,
            pageSize: 10,
            towerAddrSource: '',
            shareType: [],
            shareTypeOptions: [
                {
                    label: '移动',
                    value: '移动',
                },
                {
                    label: '联通',
                    value: '联通',
                },
                {
                    label: '电信',
                    value: '电信',
                },
            ],
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
            fileUrl: window.BASE_URL + '/api/baseInfo/importElectCostByExcel',
            fileName: '站址信息报表',
            fileList: [],
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'detailShow',
                    value: true
                },
            ]
        };
    },
    computed: {
        ...mapState(SITE, {
            siteLoading: state => state.siteLoading,
            siteData: state => state.siteData,
            total: state => state.siteDataTotal,
            checkedOptions: state => state.checkedOptions,
        }),
        fileURL: function () {
            return `${this.fileUrl}?towerAddrSource=${this.towerAddrSource}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&shareType=${this.getShareTypeData()}`;
        }
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            const sendData = {};
            sendData.pageNum = this.pageNum;
            sendData.pageSize = this.pageSize;
            sendData.towerAddrSource = this.towerAddrSource;
            sendData.shareType = this.shareType.length === 0 ? '' : this.getShareTypeData();
            this.$store.dispatch(`${SITE}/${GET_SITE_INFO}`,sendData).then(() => {
                // this.getTableHeight();
            });
        },
        getTableHeight() {
            if (this.$refs.tableInfo.offsetHeight > 0) {
                this.tableHeight =
                    this.$refs.tableInfo.offsetHeight - 32 - 22 - 22;
            }
        },
        getShareTypeData() {
            let shareType = '';
            if(this.shareType.length === 1) {
                shareType = this.shareType[0];
            } else if(this.shareType.length === 2) {
                shareType = `${this.shareType[0]}+${this.fixedRatioData.shareType[1]}`;
            } else if(this.shareType.length === 3) {
                shareType = `${this.shareType[0]}+${this.shareType[1]}+${this.shareType[2]}`;
            }
            return shareType;
        },
        sizeChange(res) {
            this.pageSize = res;
            this.pageNum = 1;
            this.getTableData();
        },
        currentChange(res) {
            this.pageNum = res;
            this.getTableData();
        },
        searchData() {
            this.pageNum = 1;
            this.getTableData();
        },
        reset(){
            this.pageNum = 1;
            this.pageSize = 10;
            this.towerAddrSource = '';
            this.shareType = '',
            this.getTableData();
        },
        deleteData(res) {
            MessageBox.confirm('确定要删除该条数据吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch(`${SITE}/${DELETE_SHUNT_DATA}`,[{
                        id: res.id,
                        seqId: res.seqId,
                        version: res.version
                    }]).then(() => {
                        this.getTableData();
                    });
                });
        },
        editData(data) {
            this.breadData.forEach(item => {
                this.$store.commit(`${SITE}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${SITE}/${CHANGE_ADD_DATA}`, data);
        },
        changeSelect(res) {
            const arr = [];
            res.forEach(v => {
                arr.push({
                    'id': v.id,
                    'seqId': v.seqId,
                    'version': v.version
                });
            });
            this.$store.commit(`${SITE}/${CHANGE_CHECKED_OPTIONS}`, arr);
        },
        batchDelete() {
            if(this.checkedOptions.length === 0) {
                Message.warning('请先选择需要删除的数据！');
            } else {
                MessageBox.confirm('确定要删除选择的数据吗？', '提示', {
                    type: 'warning',
                })
                    .then(() => {
                        console.log(this.checkedOptions);
                        this.$store.dispatch(`${SITE}/${DELETE_SHUNT_DATA}`,this.checkedOptions).then(() => {
                            this.getTableData();
                        });
                    });
            }
        },
        onChange(file){
            const typeArr = ['XLS','XLSX'];
            const arr = file.name.split('.');
            const temType = arr[arr.length-1].toUpperCase();
            const isType = typeArr.indexOf(temType)>=0;
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isType) {
                Message.error('请上传xls或xlsx格式的文件!');
            }
            if (!isLt10M) {
                Message.error('上传附件大小不能超过 10MB!');
            }
            if(isType && isLt10M){
                this.siteLoading = true;
                
            }else{
                this.fileList = [];
            }
            return isType && isLt10M;
        },
        onUpload({file}) {
            if(this.onChange(file)){
                const formData = new window.FormData();
                formData.append('excelFile', file);
                this.$store.dispatch(`${SITE}/${UPLOAD_EXECL_DATA}`,formData).then(() => {
                    this.getTableData();
                });
            }

        },
        addFixedRatioData() {
            this.breadData.forEach(item => {
                this.$store.commit(`${SITE}/${BREAD_SHOW}`,item);
            });
        },
        clearSelect() {
            this.$refs.table.clearSelection();
            this.$store.commit(`${SITE}/${CHANGE_CHECKED_OPTIONS}`, []);
        },
        download() {

        },
    }
};
</script>
<style lang="scss" scoped>
  @import '@a/css/common.scss';
  .fraction-box { 
      height: calc(100% - 52px - 50px - 50px);
  }
  .select-box {
      div {
          span {
              width: 110px !important;
          }
      }
  }
  .select-box-bottom {
        display: flex;
        margin: 10px 20px 10px 0px;
        background: #E6F7FF;
        border-radius: 2px;
        span {
            margin: 10px 0px 10px 10px;
            &:nth-child(1) {
                i {
                    color: #2B90F7;
                }
            }
            &:nth-child(2) {
                span {
                    color: #2B90F7;
                    margin: 10px;
                }
            }
            &:nth-child(3) {
                color: #2B90F7;
                cursor: pointer;
            }
        }
    }
    .operate-box-bottom {
        text-align: left !important;
        display: flex;
    }
</style>





