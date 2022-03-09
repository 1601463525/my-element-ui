<template>
    <div v-loading="shareLoading" class="search-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >查询系统</el-breadcrumb-item>
                <el-breadcrumb-item >结算结果查询</el-breadcrumb-item>
                <el-breadcrumb-item v-if='traceabilityShow'>区块链溯源</el-breadcrumb-item>
                <el-breadcrumb-item v-if='historyDetailShow'>历史轨迹查看</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="main">
            <share-table v-if='tableShow'></share-table>
            <traceability-dom v-if='traceabilityShow' ></traceability-dom>
            <!-- <share-detail v-if='detailShow'></share-detail> -->
            <history-detail v-if='historyDetailShow'></history-detail>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SHARE,BREAD_SHOW } from './vuex.js';
import ShareDetail from './detail';
import ShareTable from './table';
import HistoryDeatil from './historyDetail';
import Traceability from './traceability';

export default {
    components: {
        'share-detail': ShareDetail,
        'share-table': ShareTable,
        'history-detail': HistoryDeatil,
        'traceability-dom': Traceability,
    },
    data() {
        return {
            breadData: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'detailShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(SHARE, {
            detailShow: state => state.detailShow,
            tableShow: state => state.tableShow,
            historyDetailShow: state => state.historyDetailShow,
            shareLoading: state => state.shareLoading,
            traceabilityShow: state => state.traceabilityShow,
        })
    },
    created() {
    },
    beforeDestroy () {
        this.breadData.forEach(item => {
            this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
        });
    },
    methods: {
      
    }
};
</script>

<style lang="scss" scoped>
.search-manage {
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
  .back {
      position: absolute;
      right: 20px;
  }
  .main {
        height: calc(100% - 30px);
        overflow: auto;
  }
}
</style>


