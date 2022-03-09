<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>铁塔编码：</span>
                        <el-input
                            placeholder="请输入铁塔编码"
                            v-model="towerCode"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>电表号：</span>
                        <el-input
                            placeholder="请输入电表号"
                            v-model="consno"
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
                        fixed
                        :index="indexMethod" 
                        type="index"
                        label="序号"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="towerCode"
                        width="200"
                        label="铁塔编码"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed
                        prop="consno"
                        width="150"
                        label="电表号"
                    >
                    </el-table-column>
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
                        prop="shareType"
                        label="分摊方式"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.shareType === '01' ? '固定比例' : scope.row.shareType === '02' ? '分路计量' : '个性比例' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="stationId"
                        label="站址ID"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="accountMonth"
                        label="会计账期"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="beginDate"
                        label="结算周期起"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endDate"
                        label="结算周期止"
                        width="120"
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
                        prop="priceTax"
                        label="价税合计"
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
                        prop="chinaMobile"
                        label="电费分摊比例（移动）"
                        width="160"
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
                        width="160"
                    >
                        <template slot-scope="scope" >
                            <span>
                                {{ parseFloat(scope.row.chinaUnicom ? scope.row.chinaUnicom : 0)* 1000000 / 10000  + '%' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="chinaTelecom"
                        label="电费分摊比例（电信）"
                        width="160"
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
                        width="160"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="cuShareMoney"
                        label="电费分摊金额（联通）"
                        width="160"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="ctShareMoney"
                        label="电费分摊金额（电信）"
                        width="160"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        fixed="right"
                        prop="accountState"
                        label="报账状态"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.accountState === '02' ? '已报' : '未报'  }}</span>
                        </template>
                    </el-table-column>
                  
                    <el-table-column
                        fixed="right"
                        width="120"
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

export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            towerCode: '',
            consno: '',
            fileUrl: window.BASE_URL + '/api/search/exportShareMoneyInformationData',
            fileName: '结算信息报表',
            options: [
                {
                    label: '固定比例',
                    value: '固定比例',
                },
                {
                    label: '约定比例',
                    value: '约定比例',
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
            return `${this.fileUrl}?towerCode=${this.towerCode}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&consno=${this.consno}}&ds=${this.ds}&qx=${this.qx}`;
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
            sendData.towerCode = this.towerCode;
            sendData.consno = this.consno;
            if(this.$route.params.ds || this.$route.params.qx) {
                sendData.ds = this.$route.params.ds;
                sendData.qx = this.$route.params.qx;
            }
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
            this.consno = '',
            this.getTableData();
        },
        goToDetail(res) {
            this.breadData.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${SHARE}/${CHANGE_SHARE_ID}`, {
                towerCode: res.towerCode,
                consno: res.consno
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



