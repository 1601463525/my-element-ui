<template>
    <div v-loading="siteLoading" class="search-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >基础信息管理</el-breadcrumb-item>
                <el-breadcrumb-item >分路计量</el-breadcrumb-item>
                <el-breadcrumb-item  v-if='detailShow'>历史轨迹</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="main">
            <site-table v-if='tableShow'></site-table>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SITE,BREAD_SHOW } from './vuex.js';
import SiteTable from './table';

export default {
    components: {
        'site-table': SiteTable,
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
        ...mapState(SITE, {
            detailShow: state => state.detailShow,
            tableShow: state => state.tableShow,
            siteLoading: state => state.siteLoading,
        })
    },
    created() {
    },
    beforeDestroy () {
        this.breadData.forEach(item => {
            this.$store.commit(`${SITE}/${BREAD_SHOW}`,item);
        });
    },
    methods: {
      
    }
};
</script>

<style lang="scss" scoped>
.search-manage {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
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


