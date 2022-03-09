<template>
    <div v-loading="lading" class="search-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >查询系统</el-breadcrumb-item>
                <el-breadcrumb-item >电费汇报总账</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="main">
            <sum-span-table></sum-span-table>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { ELECTRICITY,BREAD_SHOW } from './vuex.js';
import SiteDetail from './detail';
import SiteTable from './table';
import Traceability from './traceability';
import SumSpanTable from './sumSpanTable';

export default {
    components: {
        'site-detail': SiteDetail,
        'site-table': SiteTable,
        'traceability-dom': Traceability,
        'sum-span-table': SumSpanTable,
    },
    data() {
        return {
            breadData: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceabilityShow',
                    value: true
                },
                {
                    key: 'traceDetailShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(ELECTRICITY, {
            traceabilityShow: state => state.traceabilityShow,
            traceDetailShow: state => state.traceDetailShow,
            tableShow: state => state.tableShow,
            lading: state => state.lading,
        })
    },
    created() {
    },
    destroyed() {
        this.breadData.forEach(item => {
            this.$store.commit(`${ELECTRICITY}/${BREAD_SHOW}`,item);
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


