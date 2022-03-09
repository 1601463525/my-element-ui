<template>
    <div class="fraction-box">
        <div class="check">
            <span class="back-commit" @click="back">返回</span>
        </div>
        <div class="operate-box">
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
                    :data="metersData"
                    :class-name="['table-gray', 'medium']"
                    :max-height="tableHeight"
                    :total="Number(total)"
                    :current-page="pageNum"
                    :page-size="pageSize"
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
                        prop="consno"
                        label="电表号"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="paymentType"
                        align="center"
                        label="电费类别"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="supplyMode"
                        label="供电方式"
                        align="center"
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
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.isOnline === 0 ? '停用':'在用' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="meterCompany"
                        label="对方单位/个人名称"
                        width="150"
                        align="center"
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
import { HOME, GET_METERS_DATA, BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';
export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            fileUrl: window.BASE_URL + '/api/homePage/exportConsNoStationData',
            fileName: '有电表无站址报表',
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
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
            metersLoading: state => state.metersLoading,
            metersData: state => state.metersData,
            total: state => state.metersTotal,
            ds: state => state.ds,
            qx: state => state.qx,
        }),
        fileURL: function () {
            return `${this.fileUrl}?pageNum=${this.pageNum}&pageSize=${this.pageSize}&ds=${this.ds}&qx=${this.qx}`;
        }
    },
    created() {
        this.getHomeInfo();
    },
    methods: {
        getHomeInfo() {
            const sendData = {};
            sendData.pageNum = this.pageNum;
            sendData.pageSize = this.pageSize;
            sendData.ds = this.ds;
            sendData.qx = this.qx;
            this.$store.dispatch(`${HOME}/${GET_METERS_DATA}`,sendData).then(() => {
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
        indexMethod(index) {
            const curpage = this.pageNum; 
            const pageSize = this.pageSize;
            return index+1 + (curpage-1)*pageSize;
        },
    }
};
</script>

<style lang="scss" scoped>
  @import '@a/css/common.scss';
</style>

