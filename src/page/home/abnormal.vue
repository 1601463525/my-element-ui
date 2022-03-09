<template>
    <div class="fraction-box" @click="closeBox">
        <div class="check">
            <span class="back-commit" @click="back">返回</span>
        </div>
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>铁塔编码：</span>
                        <el-input v-model="searchInfo.glttbh" placeholder="请填写铁塔编码" clearable></el-input>
                    </div>
                    <div>
                        <span>电表号：</span>
                        <el-input v-model="searchInfo.consno" placeholder="请填写电表号" clearable></el-input>
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
                    v-loading="abnormalLoading"
                    ref="table"
                    :data="abnormalData"
                    :class-name="['table-gray', 'medium']"
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
                        fixed
                        :show-overflow-tooltip="true"
                        :index="indexMethod" 
                        type="index"
                        label="序号"
                        align="center"
                        width="50"
                    ></el-table-column>
                    <el-table-column
                        fixed
                        :show-overflow-tooltip="true"
                        prop="glttbh"
                        label="铁塔编码"
                        align="center"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="consno"
                        label="电表号"
                        align="center"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ds"
                        label="地市"
                        align="center"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="qx"
                        label="区县"
                        align="center"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationId"
                        label="站址ID"
                        align="center"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ttqs"
                        label="铁塔权属"
                        align="center"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="paymentType"
                        label="电费类别"
                        align="center"
                        width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="supplyMode"
                        label="供电方式"
                        align="center"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.supplyMode === 0 ? '直供':'转供' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="isOnline"
                        align="center"
                        label="电表状态"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.isOnline === 0 ? '停用':'在用' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="meterCompany"
                        label="对方单位/个人名称"
                        align="center"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="agreementPrice"
                        label="协议价格"
                        fixed='right'
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        align="center"
                        :show-overflow-tooltip="true"
                        prop="kicketType"
                        label="是否专票"
                        fixed='right'
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.kicketType === 0 ? '否':'是' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed='right'
                        :show-overflow-tooltip="true"
                        prop="mTaxRate"
                        label="税率"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ parseFloat(scope.row.mTaxRate ? scope.row.mTaxRate : 0)* 1000000 / 10000 + '%' }}</span>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { HOME, GET_ABNORMAL_DATA, BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';
export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            fileUrl: window.BASE_URL + '/api/homePage/exportConsExceptionData',
            fileName: '电表信息异常报表',
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            searchInfo: {
                glttbh: '',
                consno: '',
            },
            breadData: [
                {
                    key: 'abnormalShow',
                    value: false
                },
                {
                    key: 'metersShow',
                    value: false
                },
                {
                    key: 'stationShow',
                    value: false
                },
                {
                    key: 'homeShow',
                    value: true
                }
            ]
        };
    },
    computed: {
        ...mapState(HOME, {
            abnormalLoading: state => state.loading,
            abnormalData: state => state.abnormalData,
            total: state => state.abnormalTotal,
            ds: state => state.ds,
            qx: state => state.qx,
        }),
        fileURL: function () {
            return `${this.fileUrl}?glttbh=${this.glttbh}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&consno=${this.consno}&ds=${this.ds}&qx=${this.qx}`;
        }
    },
    mounted() {
        this.getHomeInfo();
    },
    methods: {
        getHomeInfo() {
            const sendData = {};
            sendData.pageNum = this.pageNum;
            sendData.pageSize = this.pageSize;
            sendData.ds = this.ds;
            sendData.qx = this.qx;
            this.$store.dispatch(`${HOME}/${GET_ABNORMAL_DATA}`,{
                ...sendData,
                ...this.searchInfo
            }).then(() => {
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
            this.getHomeInfo();
        },
        currentChange(res) {
            this.pageNum = res;
            this.getHomeInfo();
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${HOME}/${BREAD_SHOW}`,item);

            });
        },
        searchData() {
            this.getHomeInfo();
        },
        reset() {
            this.pageNum = 1;
            this.pageSize = 10;
            this.searchInfo = {
                glttbh: '',
                consno: '',
            };
            this.getHomeInfo();
        },
        indexMethod(index) {
            const curpage = this.pageNum; 
            const pageSize = this.pageSize;
            return index+1 + (curpage-1)*pageSize;
        },
        closeBox() {}
    }
};
</script>

<style lang="scss" scoped>
  @import '@a/css/common.scss';
</style>
