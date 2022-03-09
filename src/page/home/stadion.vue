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
                    v-loading="stationLoading"
                    ref="table"
                    :data="stationData"
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
                        prop="towerName"
                        label="站址名称"
                        width="100"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="towerNo"
                        label="铁塔编码"
                        width="200"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="cityName"
                        label="地市"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="countyName"
                        label="区县"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="beginDate"
                        label="服务起始日期"
                        width="150"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endDate"
                        label="服务结束日期"
                        width="150"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareUser"
                        label="共享用户"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="orderUnit"
                        label="站址原产权方"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ifContain5g"
                        label="是否含5G"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ +scope.row.ifContain5g === 0 ? '否':'是' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="accountDate"
                        label="业务账期"
                        fixed='right'
                        align="center"
                    ></el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { HOME, GET_STATION_DATA, BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';
export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            fileUrl: window.BASE_URL + '/api/homePage/exportStationNoConsData',
            fileName: '有站址无电表报表',
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
            stationLoading: state => state.loading,
            stationData: state => state.stationData,
            total: state => state.stationTotal,
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
            this.$store.dispatch(`${HOME}/${GET_STATION_DATA}`,sendData).then(() => {
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

