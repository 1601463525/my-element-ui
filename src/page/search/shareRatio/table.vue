<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span style="width: 80px;">共享类型：</span>
                        <el-select v-model="shareType" multiple placeholder="请选择共享类型" clearable>
                            <el-option v-for="item in shareTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>站址来源分类：</span>
                        <el-select v-model="towerAddrSource" placeholder="请选择站址来源分类" clearable>
                            <el-option v-for="item in towerAddrSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
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
                    v-loading="shareLoading"
                    ref="table"
                    :class-name="['table-gray', 'medium']"
                    :data="shareData"
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
                        prop="towerAddrSource"
                        label="站址来源分类"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareType"
                        label="共享类型"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ds"
                        align="center"
                        label="地市"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="qx"
                        align="center"
                        label="区县"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaMobile"
                        label="电费分摊比例（移动）"
                    >
                        <template slot-scope="scope">
                            <span>{{ parseFloat(scope.row.chinaMobile ? scope.row.chinaMobile : 0)  * 1000000 / 10000 + '%' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaUnicom"
                        label="电费分摊比例（联通）"
                    >
                        <template slot-scope="scope">
                            <span>{{ parseFloat(scope.row.chinaUnicom ? scope.row.chinaUnicom : 0) * 1000000/ 10000 + '%' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaTelecom"
                        label="电费分摊比例（电信）"
                    >
                        <template slot-scope="scope">
                            <span>{{ parseFloat(scope.row.chinaTelecom ? scope.row.chinaTelecom : 0) * 1000000/ 10000 + '%' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <div class="operating" @click="goToDetail(scope.row)">
                                区块链溯源
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
import { SHARE,GET_SHARE_INFO,CHANGE_SHARE_ID,BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';
import { towerAddrSourceOptions } from '../../../commonData.js';

export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
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
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            shareType: [],
            towerAddrSource: '',
            fileUrl: window.BASE_URL + '/api/search/exportShareRateInformationData',
            fileName: '分摊比例报表',
            options: [
                {
                    label: '铁塔',
                    value: '铁塔',
                },
                {
                    label: '电信',
                    value: '铁塔',
                },
            ],
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceabilityShow',
                    value: true
                },
            ]
        };
    },
    computed: {
        ...mapState(SHARE, {
            shareLoading: state => state.shareLoading,
            shareData: state => state.shareData,
            total: state => state.shareDataTotal,
        }),
        fileURL: function () {
            return `${this.fileUrl}?shareType=${this.getShareTypeData()}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&towerAddrSource=${this.towerAddrSource}`;
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
            sendData.shareType = this.shareType.length === 0 ? '' : this.getShareTypeData();
            sendData.towerAddrSource = this.towerAddrSource;
            this.$store.dispatch(`${SHARE}/${GET_SHARE_INFO}`,sendData).then(() => {
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
            let text = '';
            if(this.shareType.length === 1) {
                text = this.shareType[0];
            } else if(this.shareType.length === 2) {
                text = `${this.shareType[0]}+${this.shareType[1]}`;
            } else if(this.shareType.length === 3) {
                text = `${this.shareType[0]}+${this.shareType[1]}+${this.shareType[2]}`;
            }
            return text;
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
            this.shareType = '';
            this.towerAddrSource = '',
            this.getTableData();
        },
        goToDetail(res) {
            this.breadData.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${SHARE}/${CHANGE_SHARE_ID}`, {
                ...res
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
  .operating {
        color: #2B90F7;
        font-size: 14px;
        margin: 0 2px;
        cursor: pointer;
        &:hover {
            color: #4c85ff;
        }
    }
</style>
