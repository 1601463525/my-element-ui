<template>
    <div class="search-meter-info">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item>查询系统</el-breadcrumb-item>
                <el-breadcrumb-item>电表信息查询</el-breadcrumb-item>
                <!-- <el-breadcrumb-item v-if="historyShow">历史轨迹</el-breadcrumb-item> -->
                <el-breadcrumb-item v-if="traceLineShow || historyTraceShow">溯源信息</el-breadcrumb-item>
                <el-breadcrumb-item v-if="historyTraceShow">查看</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="main">
            <meter-info-table v-if="tableShow"></meter-info-table>
            <!-- <meter-history-trace v-if="historyShow"></meter-history-trace> -->
            <trace-line v-if="traceLineShow"></trace-line>
            <trace-detail v-if="historyTraceShow"></trace-detail>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { METERS_INFO } from './vuex.js';
import MeterInfoTable from './table';
// import MeterHistoryTrace from './history';
import TraceDetail from './traceDetail';
import TraceLine from './traceLine';

export default {
    components: {
        'meter-info-table': MeterInfoTable,
        // 'meter-history-trace': MeterHistoryTrace,
        'trace-line': TraceLine,
        'trace-detail': TraceDetail
    },
    computed: {
        ...mapState(METERS_INFO, {
            tableShow: state => state.tableShow,
            historyShow: state => state.historyShow,
            historyTraceShow: state => state.historyTraceShow,
            traceLineShow: state => state.traceLineShow
        })
    },
    created() {
    },
    destroyed() {
        
    },
};
</script>

<style lang="scss" scoped>
.search-meter-info {
    height: calc(100% - 52px);
    .bread-crumb {
    height: 47px;
    background: #ffffff;
    box-shadow: 0px 1px 7px 0px rgba(104, 113, 158, 0.17);
    display: flex;
    align-items: center;
    i {
      margin: 0 20px;
    }
  }
    .main {
        height: calc(100% - 30px);
        overflow: auto;
    }
}
</style>
