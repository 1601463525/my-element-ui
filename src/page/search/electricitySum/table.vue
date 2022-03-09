<template>
    <div class="content" >
        <div class="operate-box">
            <div>
                <span>地市：</span>
                <el-select v-model="userInfo.ds" placeholder="请选择地市" :disabled="userInfo.ds !== ''" >
                    <!-- <el-option v-for="item in towerAddrSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option> -->
                </el-select>
            </div>
            <div>
                <span>区县：</span>
                <el-select v-model="searchInfo.qx" placeholder="请选择区县" @click.native="getQxByDs">
                    <el-option v-for="item in qxData" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>类型：</span>
                <el-select v-model="searchInfo.dataSource" placeholder="请选择类型" clearable>
                    <el-option v-for="item in typesOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>状态：</span>
                <el-select v-model="searchInfo.sendState" placeholder="请选择状态" clearable>
                    <el-option v-for="item in statesOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="searchData">查询</el-button>
            </div>
            <div>
                <el-button size="medium" @click="reset">重置</el-button>
            </div>
            <div>
                <el-button size="medium" @click="sendAccount">发送报账</el-button>
            </div>
        </div>
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <hongxin-table
                    v-loading="siteLoading"
                    ref="table"
                    :class-name="['table-gray', 'medium']"
                    :data="siteData"
                    :total="Number(total)"
                    :showPagination="false"
                    :max-height="tableHeight"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
                    @size-change="sizeChange"
                    @current-page-change="currentChange"
                >
                    <el-table-column
                        :show-overflow-tooltip="true"
                        :index="indexMethod" 
                        width="40"
                        fixed
                        type="index"
                        label="序号"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="towerCode"
                        label="铁塔编码"
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="merterNum"
                        label="电表号"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="city"
                        label="地市"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="area"
                        label="区县"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationName"
                        label="站址名称"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationId"
                        label="站址ID"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareType"
                        label="分摊方式"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.shareType === '01' ? '固定比例' : scope.row.shareType === '02' ? '分路计量' : '个性比例' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="startTime"
                        label="结算周期起"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endTime"
                        label="结算周期止"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endTax"
                        label="结算税率"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.endTax ? scope.row.endTax : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="accountMonth"
                        label="会计账期"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="shareTax"
                        label="分摊税率"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.shareTax ? scope.row.shareTax : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="addScale"
                        label="加成比例"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.addScale ? scope.row.addScale : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="priceTax"
                        label="价税合计"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaMobile"
                        label="电费分摊比例（移动）"
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
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaUnicom ? scope.row.chinaUnicom : 0)* 1000000 / 10000 }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaTelecom"
                        label="电费分摊比例（电信）"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaTelecom ? scope.row.chinaTelecom : 0)* 1000000 / 10000 + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="cmShareMoney"
                        label="电费分摊金额（移动）"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="cuShareMoney"
                        label="电费分摊金额（联通）"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ctShareMoney"
                        label="电费分摊金额（电信）"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="status"
                        label="报账状态"
                    ></el-table-column>
                    <el-table-column
                        width="150"
                        fixed="right"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <div class="operating" @click="goToDetail(scope.row.id)">
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
import { ELECTRICITY,GET_ELECTRICITY_INFO,CHANGE_ELECTRICITY_ID,GET_QX_BY_DS,BREAD_SHOW,POST_SEND_ACCOUNT } from './vuex.js';
import { Table } from 'hongxin-ui';

export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            searchInfo: {
                unit: '',
                dataSource: '',
                sendState: '',
                qx: '',
            },
            unitOptions: [],
            typesOptions: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '应收',
                    value: '01',
                },
                {
                    label: '应付',
                    value: '02',
                },
            ],
            statesOptions: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '已发送',
                    value: '02',
                },
                {
                    label: '未发送',
                    value: '01',
                },
            ],
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            towerCode: '',
            merterNum: '',
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
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        ...mapState(ELECTRICITY, {
            siteLoading: state => state.siteLoading,
            siteData: state => state.siteData,
            total: state => state.siteDataTotal,
            qxData: state => state.qxData,
        })
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            const sendData = {};
            sendData.dataSource = this.searchInfo.dataSource;
            sendData.sendState = this.searchInfo.sendState;
            sendData.ds = this.userInfo.ds;
            sendData.qx = this.searchInfo.qx;
            this.$store.dispatch(`${ELECTRICITY}/${GET_ELECTRICITY_INFO}`,sendData);
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
            this.towerCode = '';
            this.merterNum = '',
            this.getTableData();
        },
        goToDetail(id) {
            this.breadData.forEach(item => {
                this.$store.commit(`${ELECTRICITY}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${ELECTRICITY}/${CHANGE_ELECTRICITY_ID}`,id);
        },
        getQxByDs() {
            this.$store.dispatch(`${ELECTRICITY}/${GET_QX_BY_DS}`,{
                ds: this.userInfo.ds
            });
        },
        indexMethod (index) {
            const curpage = this.pageNum; 
            const limitpage = this.pageSize;
            return index+1 + (curpage-1)*limitpage;
        },
       
    }
};
</script>

<style lang="scss" scoped>
  .content {
    .table-box {
        margin: 20px;
        .operating {
            color: #2B90F7;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: #4c85ff;
            }
        }
    }
    .operate-box {
        display: flex;
        margin: 20px;
        div {
            display: flex;
            margin: 0 2px;
            span {
                width: 120px;
                height: 40px;
                line-height: 40px;
            }
        }
    }
  }
</style>




