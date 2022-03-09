<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>铁塔编码: </span>
                        <el-input
                            v-model="glttbh"
                            placeholder="请输入铁塔编码"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>电表号: </span>
                        <el-input
                            v-model="consno"
                            placeholder="请输入电表号"
                            clearable>
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
                    v-loading="metersLoading"
                    ref="table"
                    :class-name="['table-gray', 'medium']"
                    :data="metersInfo"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :total="Number(total)"
                    :max-height="tableHeight"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
                    @size-change="sizeChange"
                    @current-page-change="currentPageChange"
                >
                    <el-table-column
                        :show-overflow-tooltip="true"
                        :index="indexMethod"
                        fixed
                        type="index"
                        width="50"
                        label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="glttbh"
                        label="铁塔编码"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="consno"
                        fixed
                        label="电表号"
                        width="150"
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
                        prop="stationId"
                        label="站址ID"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ttqs"
                        label="铁塔权属"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="paymentType"
                        label="电费类别"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="isOnline"
                        label="电表状态"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.isOnline === 0 ? '停用' : '在用' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="agreementPrice"
                        label="协议价格"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop=""
                        label="是否专票"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.kicketType === 0 ? '否' : '是' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="meterCompany"
                        label="对方单位/个人名称"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="mTaxRate"
                        label="税率"
                    >
                        <template slot-scope="scope">
                            <span>{{ parseFloat(scope.row.mTaxRate ? scope.row.mTaxRate : 0)* 1000000 / 10000 + '%' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        prop="supplyMode"
                        width="100"
                        label="供电方式"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.supplyMode === 0 ? '直供' : '转供' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        width="100"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text"
                                       @click="goToDetail(scope.row)"
                            >
                                区块链溯源
                            </el-button>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>

<script>
import { Table } from 'hongxin-ui';
import { METERS_INFO, GET_METERS_TABLE, MODIFY_METER_ID, MODIFY_CONTENT_DISPLAY } from './vuex';
import { mapState } from 'vuex';

export default {
    components: {
        'hongxin-table': Table
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            glttbh: '',
            consno: '',
            fileUrl: window.BASE_URL + '/api/search/exportConsInformationData',
            fileName: '电表信息报表',
            toHistoryDisplayParams: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceLineShow',
                    value: true
                },
                {
                    key: 'historyTraceShow',
                    value: false
                }
            ]
        };
    },
    computed: {
        ...mapState(METERS_INFO, {
            metersLoading: state => state.metersLoading,
            metersInfo: state => state.metersInfo,
            total: state => state.metersTotal
        }),
        fileURL: function () {
            return `${this.fileUrl}?glttbh=${this.glttbh}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&consno=${this.consno}&ds=${this.ds}&qx=${this.qx}`;
        }
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            const params = {};
            params.pageNum = this.pageNum;
            params.pageSize = this.pageSize;
            params.glttbh = this.glttbh;
            params.consno = this.consno;
            if(this.$route.params.ds || this.$route.params.qx) {
                params.ds = this.$route.params.ds;
                params.qx = this.$route.params.qx;
            }
            this.$store.dispatch(`${METERS_INFO}/${GET_METERS_TABLE}`, params).then(() => {
                // this.getTableHeight();
            });
        },
        getTableHeight() {
            if (this.$refs.tableInfo.offsetHeight > 0) {
                this.tableHeight =
                    this.$refs.tableInfo.offsetHeight - 32 - 22 - 22;
            }
        },
        reset() {
            this.glttbh = '';
            this.consno = '';
            this.pageNum = 1;
            this.pageSize = 10;
            this.getTableData();
        },
        searchData() {
            this.getTableData();
        },
        sizeChange(pageSize) {
            this.pageSize = pageSize;
            this.pageNum = 1;
            this.getTableData();
        },
        currentPageChange(curPage) {
            this.pageNum = curPage;
            this.getTableData();
        },
        indexMethod(index) {
            const curpage = this.pageNum; 
            const pageSize = this.pageSize;
            return index+1 + (curpage-1)*pageSize;
        },
        goToDetail(res) {
            this.toHistoryDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
            this.$store.commit(`${METERS_INFO}/${MODIFY_METER_ID}`, {
                glttbh: res.glttbh,
                consno: res.consno
            });
        }
    }
};
</script>

<style lang="scss" scoped>
  @import '@a/css/common.scss';
  
</style>




