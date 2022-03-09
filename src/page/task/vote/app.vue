<template>
    <div v-loading="loading" class="search-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >任务待办</el-breadcrumb-item>
                <el-breadcrumb-item >投票</el-breadcrumb-item>
                <el-breadcrumb-item v-if='detailShow'>电表信息投票</el-breadcrumb-item>
                <el-breadcrumb-item v-if='proportionShow'>固定比例投票</el-breadcrumb-item>
                <el-breadcrumb-item v-if='settlementShow'>结算信息投票</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="main">
            <confirm-table v-if="tableShow"></confirm-table>
            <confirm-detail v-if="detailShow"></confirm-detail>
            <proportion-detail v-if="proportionShow"></proportion-detail>
            <settlement-detail v-if="settlementShow"></settlement-detail>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { VOTE,BREAD_SHOW,REST_DATA } from './vuex.js';
import ConfirmTable from './table';
import ConfirmDetail from './merterDetail';
import ProportionDetail from './proportionDetail';
import SettlementDetail from './settlementDetail';

export default {
    components: {
        'confirm-table': ConfirmTable,
        'confirm-detail': ConfirmDetail,
        'proportion-detail': ProportionDetail,
        'settlement-detail': SettlementDetail,
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
                {
                    key: 'proportionShow',
                    value: false
                },
                {
                    key: 'settlementShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(VOTE, {
            tableShow: state => state.tableShow,
            detailShow: state => state.detailShow,
            proportionShow: state => state.proportionShow,
            settlementShow: state => state.settlementShow,
            loading: state => state.loading,
        })
    },
    created() {
    },
    destroyed() {
        this.breadData.forEach(item => {
            this.$store.commit(`${VOTE}/${BREAD_SHOW}`,item);
        });
        this.$store.commit(`${VOTE}/${REST_DATA}`,{
            pageNum: 1,
            pageSize: 10,
            taskName: '金额结算投票',
            dataState: [],
            payType: '',
            towerCode: '',
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
        height: calc(100% - 50px);
        overflow: auto;
  }
}
</style>


