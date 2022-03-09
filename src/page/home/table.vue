<template>
    <div class="content">
        <div class="base-info">基本信息统计</div>
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <hongxin-table
                    v-loading="loading"
                    ref="table"
                    :data="tableData"
                    :class-name="['table-gray', 'medium']"
                    :max-height="tableHeight"
                    :showPagination="false"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
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
                        prop="consNum"
                        label="电表数量"
                    >
                        <template slot-scope="scope">
                            <span @click="toSearchData(scope.row,'meterInformationSearch')" class="span">{{ scope.row.consNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="settlementNum"
                        label="结算次数"
                    >
                        <template slot-scope="scope">
                            <span @click="toSearchData(scope.row,'shareAmount')" class="span">{{ scope.row.settlementNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationNoConsNum"
                        label="有站址无电表"
                    >
                        <template slot-scope="scope">
                            <span @click="toStation(scope.row)" class="span">{{ scope.row.stationNoConsNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="consNoStationNum"
                        label="有电表无站址"
                    >
                        <template slot-scope="scope">
                            <span @click="toMeters(scope.row)" class="span">{{ scope.row.consNoStationNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="consExceptionNum"
                        label="电表信息异常"
                    >
                        <template slot-scope="scope">
                            <span @click="toAbnormal(scope.row)" class="span">{{ scope.row.consExceptionNum }}</span>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { HOME, GET_HOME_INFO,BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';
export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            breadAbnormal: [
                {
                    key: 'abnormalShow',
                    value: true
                },
                {
                    key: 'metersShow',
                    value: false
                },
                {
                    key: 'homeShow',
                    value: false
                }
            ],
            breadStation: [
                {
                    key: 'stationShow',
                    value: true
                },
                {
                    key: 'metersShow',
                    value: false
                },
                {
                    key: 'homeShow',
                    value: false
                }
            ],
            breadMeters: [
                {
                    key: 'metersShow',
                    value: true
                },
                {
                    key: 'stationShow',
                    value: false
                },
                {
                    key: 'homeShow',
                    value: false
                }
            ],
        };
    },
    computed: {
        ...mapState(HOME, {
            loading: state => state.loading,
            tableData: state => state.homeInfo
        })
    },
    created() {
        this.getHomeInfo();
    },
    methods: {
        getHomeInfo() {
            this.$store.dispatch(`${HOME}/${GET_HOME_INFO}`);
        },
        toSearchData(row,type) {
            this.$router.push(
                {
                    name:`${type}`,
                    params: {
                        ds: row.cityName,
                        qx: row.countyName
                    }
                }); 
        },
        toAbnormal(row) {
            this.$store.commit(`${HOME}/${BREAD_SHOW}`,{
                key: 'ds',
                value: row.cityName
            });
            this.$store.commit(`${HOME}/${BREAD_SHOW}`,{
                key: 'qx',
                value: row.countyName
            });
            this.breadAbnormal.forEach(item => {
                this.$store.commit(`${HOME}/${BREAD_SHOW}`,item);
            });
        },
        toStation(row) {
            this.$store.commit(`${HOME}/${BREAD_SHOW}`,{
                key: 'ds',
                value: row.cityName
            });
            this.$store.commit(`${HOME}/${BREAD_SHOW}`,{
                key: 'qx',
                value: row.countyName
            });
            this.breadStation.forEach(item => {
                this.$store.commit(`${HOME}/${BREAD_SHOW}`,item);
            });
        },
        toMeters(row) {
            this.$store.commit(`${HOME}/${BREAD_SHOW}`,{
                key: 'ds',
                value: row.cityName
            });
            this.$store.commit(`${HOME}/${BREAD_SHOW}`,{
                key: 'qx',
                value: row.countyName
            });
            this.breadMeters.forEach(item => {
                this.$store.commit(`${HOME}/${BREAD_SHOW}`,item);
            });
        },
        indexMethod(index) {
            return index + 1;
        }
    }
};
</script>

<style lang="scss" scoped>
  .content {
    .base-info {
      font-size: 16px;
      font-weight: 500;
      color: #2d2d2d;
      margin: 20px 0 20px 20px;
    }
    .table-box {
        margin: 0 20px;
        .span {
            color: #2B90F7;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: #4c85ff;
            }
        }
    }
  }
</style>

