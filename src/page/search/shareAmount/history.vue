<template>
    <div class="content" >
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <hongxin-table
                    v-loading="historyLoading"
                    ref="table"
                    :class-name="['table-gray', 'medium']"
                    :data="historyData"
                    :showPagination="false"
                    :max-height="tableHeight"
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
                        prop="businessType"
                        label="业务类型"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="initiator"
                        label="发起方"
                    >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="initiatorTime"
                        label="发起时间"
                    ></el-table-column>
                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <div class="operating" @click="goToDetail(scope.row.id)">
                                查看
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
import { SHARE,GET_HISTORY_DATA,CHANGE_HISTORY_ID,BREAD_SHOW } from './vuex.js';
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
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'detailShow',
                    value: true
                },
            ],
            historyBreadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'detailShow',
                    value: false,
                },
                {
                    key: 'historyDetailShow',
                    value: true,
                },
            ],
        };
    },
    computed: {
        ...mapState(SHARE, {
            historyLoading: state => state.historyLoading,
            historyData: state => state.historyData,
        })
    },
    
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            const sendData = {};
            this.$store.dispatch(`${SHARE}/${GET_HISTORY_DATA}`,sendData);
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
            this.siteSource = '',
            this.getTableData();
        },
        goToDetail(id) {
            this.historyBreadData.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
            this.$store.commit(`${SHARE}/${CHANGE_HISTORY_ID}`,id);
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
  .content {
    .table-box {
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
                width: auto;
                height: 40px;
                line-height: 40px;
            }
        }
    }
  }
</style>




