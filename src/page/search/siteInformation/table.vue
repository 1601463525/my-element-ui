<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>铁塔编码：</span>
                        <el-input
                            placeholder="请输入铁塔编码"
                            v-model="towerNo">
                        </el-input>
                    </div>
                    <div>
                        <span>站址名称：</span>
                        <el-input
                            placeholder="请输入站址名称"
                            v-model="towerName">
                        </el-input>
                    </div>
                </div>
                <span class="filter-commit" @click="searchData">查询</span>
                <span class="filter-reset" @click="reset">重置</span>
            </div>
            <a :href="fileURL" :download="fileName">
                <div class="add operate-btn">
                    <i class="el-icon-upload2"></i>
                    导出Execl
                </div>
            </a>
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
                >
                    <el-table-column
                        :show-overflow-tooltip="true"
                        :index="indexMethod" 
                        type="index"
                        width="50"
                        label="序号"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="towerName"
                        width="150"
                        label="站址名称"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="towerNo"
                        label="铁塔编码"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="cityName"
                        label="地市"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="countyName"
                        label="区县"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="beginDate"
                        label="服务起始日期"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endDate"
                        label="服务结束日期"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareUser"
                        label="共享用户"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="orderUnit"
                        label="站址原产权方"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ifContain5g"
                        label="是否含5G"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.ifContain5g === '1' ? '是' : '否' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="accountDate"
                        label="业务账期"
                    ></el-table-column>
                    <!-- <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <div class="operating" @click="goToDetail(scope.row.id)">
                                区块链溯源
                            </div>
                        </template>
                    </el-table-column> -->
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SITE,GET_SITE_INFO,CHANGE_SITE_ID,BREAD_SHOW } from './vuex.js';
import { Table,Message } from 'hongxin-ui';
import { get,post } from 'axios';

export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            towerNo: '',
            towerName: '',
            fileUrl: window.BASE_URL + '/api/search/exportSiteInformationData',
            fileName: '站址信息报表',
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
        }),
        fileURL: function () {
            return `${this.fileUrl}?towerNo=${this.towerNo}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&towerName=${this.towerName}`;
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
            sendData.towerNo = this.towerNo;
            sendData.towerName = this.towerName;
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
            this.towerNo = '';
            this.towerName = '',
            this.getTableData();
        },
        goToDetail(id) {
            this.breadData.forEach(item => {
                this.$store.commit(`${SITE}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${SITE}/${CHANGE_SITE_ID}`,id);
        },
        exportExeclData() {
            this.siteLoading = true;
            get(window.BASE_URL + this.fileUrl,{
                responseType: 'json'
            }).then(res => {
                if(res.status === 200){
                    this.siteLoading = false;
                    const a = document.createElement('a');
                    a.download =  this.baseInfo.examName + '.zip';
                    a.href = res.data.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }else{
                    Message.error('服务器返回错误！');
                    this.siteLoading = false;
                }
            }).catch(err => {
            });
        },
        indexMethod (index) {
            const curpage = this.pageNum; 
            const limitpage = this.pageSize;
            return index+1 + (curpage-1)*limitpage;
        }
    }
};
</script>


<style lang="scss" scoped>
  @import '@a/css/common.scss';
</style>
