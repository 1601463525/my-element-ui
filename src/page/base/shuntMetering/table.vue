<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>基站编码：</span>
                        <el-input
                            placeholder="请输入基站编码"
                            v-model="stationName"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>基站名称：</span>
                        <el-input
                            placeholder="请输入基站名称"
                            v-model="stationNo"
                            clearable>
                        </el-input>
                    </div>
                </div>
                <span class="filter-commit" @click="searchData">查询</span>
                <span class="filter-reset" @click="reset">重置</span>
            </div>
        </div>
        <div class="operate-box operate-box-bottom">
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
        <div class="select-box select-box-bottom">
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
                        prop="stationName"
                        label="基站名称"
                        width="150"
                        fixed
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationNo"
                        label="基站编码"
                        width="200"
                        fixed
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="cityName"
                        label="地市"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="countyName"
                        label="区县"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="operator"
                        label="运营商"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="machineRoomNo"
                        label="机房编码"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="machineRoomName"
                        label="机房名称"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="fsuid"
                        label="FSUID"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="userElectDate"
                        label="用电日期"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="userElectData"
                        label="用电参考值(度)"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="signRatio"
                        label="标杆环境系数"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="testRatio"
                        label="实测环境系数"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="offerElectWay"
                        label="供电方式"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="directElectSource"
                        label="直流电量来源"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="directElectData"
                        label="直流系统耗电量(度)"
                        width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ydElectData"
                        label="移动直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ltElectData"
                        label="联通直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="dxElectData"
                        label="电信直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="yd5gElectData"
                        label="移动5G直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="lt5gElectData"
                        label="联通5G直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="dx5gElectData"
                        label="电信5G直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="sourceData"
                        label="开关电源电量(度)"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="customData"
                        label="拓展客户直流系统耗电量(度)"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="averageData"
                        label="日均电流(A)"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="exchangeSource"
                        label="交流电量来源"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="checkData"
                        label="抄表电量"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="exchangeData"
                        label="交流电表耗电量(度)"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="machineRoomType"
                        label="机房类型"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="airCondiData"
                        label="空调电量(度)"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="airCondiConfig"
                        label="空调配置"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareRelation"
                        label="物业共享关系"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="equipStatus"
                        label="设备状态"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="changeMeterStatus"
                        label="换表状态"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        prop="nextFlowSeqId"
                        align="center"
                        label="数据状态"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.nextFlowSeqId === '02' ? '发起确认' : scope.row.nextFlowSeqId === '04' ? '发起回退' : '' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationAddrStatus"
                        label="站址状态"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationAddrType"
                        label="站址类型"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="exceptionMassage"
                        label="异常消息"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="createDate"
                        label="创建时间"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        fixed="right"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div class="operating" @click="deleteData(scope.row.id)">
                                删除
                            </div>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SITE,GET_SITE_INFO,CHANGE_SITE_ID,BREAD_SHOW,DELETE_SHUNT_DATA,CHANGE_CHECKED_OPTIONS,CHANGE_SHUNT_LIST,UPLOAD_EXECL_DATA } from './vuex.js';
import { Table,Message } from 'hongxin-ui';
import { MessageBox } from 'element-ui';
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
            stationName: '',
            stationNo: '',
            fileUrl: window.BASE_URL + '/api/baseInfo/importProportionByExcel',
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
            return `${this.fileUrl}?stationName=${this.stationName}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&stationNo=${this.stationNo}`;
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
            sendData.stationName = this.stationName;
            sendData.stationNo = this.stationNo;
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
            this.stationName = '';
            this.stationNo = '',
            this.getTableData();
        },
        deleteData(id) {
            MessageBox.confirm('确定要删除该条数据吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch(`${SITE}/${DELETE_SHUNT_DATA}`,[{
                        id: id
                    }]).then(() => {
                        this.getTableData();
                    });
                });
        },
        changeSelect(res) {
            const arr = [];
            res.forEach(v => {
                arr.push({
                    'id': v.id,
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
        clearSelect() {
            this.$refs.table.clearSelection();
            this.$store.commit(`${SITE}/${CHANGE_CHECKED_OPTIONS}`, []);
        }
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




