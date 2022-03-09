<template>
    <div v-loading="loading" class="home-manage">
        <div class="bread-crumb">
            <a-icon type="unordered-list" ></a-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >铁塔区块链管理平台</el-breadcrumb-item>
                <el-breadcrumb-item >系统管理</el-breadcrumb-item>
                <el-breadcrumb-item >用户管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!homeShow">添加用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <user-table v-if="homeShow"></user-table>
        <add-user v-else></add-user>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SYSTEMMANAGE } from './vuex.js';
import UserTable from './table';
import AddUser from './addUser';

export default {
    components: {
        'user-table': UserTable,
        'add-user': AddUser,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
        };
    },
    computed: {
        ...mapState(SYSTEMMANAGE, {
            loading: state => state.loading,
            tableData: state => state.userData,
            homeShow: state => state.homeShow,
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

