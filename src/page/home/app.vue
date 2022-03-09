<template>
    <div v-loading="loading" class="home-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="abnormalShow">电表信息异常</el-breadcrumb-item>
                <el-breadcrumb-item v-if="stationShow">有站址无电表</el-breadcrumb-item>
                <el-breadcrumb-item v-if="metersShow">有电表无站址</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <home-table v-if="homeShow"></home-table>
        <abnormal-table v-if="abnormalShow"></abnormal-table>
        <station-table v-if="stationShow"></station-table>
        <meters-table v-if="metersShow"></meters-table>
        <!-- <iframe src="http://10.2.12.71:8080/#/" width="100%" height="100%"></iframe> -->
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { HOME } from './vuex.js';
import HomeTable from './table';
import AbnormalTable from './abnormal';
import StationTable from './stadion';
import MetersTable from './meters';
export default {
    components: {
        'home-table': HomeTable,
        'abnormal-table': AbnormalTable,
        'station-table': StationTable,
        'meters-table': MetersTable,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
        };
    },
    computed: {
        ...mapState(HOME, {
            loading: state => state.loading,
            tableData: state => state.homeInfo,
            homeShow: state => state.homeShow,
            abnormalShow: state => state.abnormalShow,
            stationShow: state => state.stationShow,
            metersShow: state => state.metersShow,
        })
    },
    created() {
    },
    methods: {
    
    }
};
</script>

<style lang="scss" scoped>
.home-manage {
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
  .content {
    .base-info {
      font-size: 16px;
      font-weight: 500;
      color: #2d2d2d;
      margin: 20px 0 20px 20px;
    }
    .table-box {
        margin: 0 20px;
    }
  }
}
</style>

