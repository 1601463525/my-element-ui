<template>
    <div class="fraction-box">
        <div class="operate-box">
            <div class="filter-box">
                <div class="select-box">
                    <div>
                        <span>用户名称：</span>
                        <el-input placeholder="请输入用户名称" v-model="searchInfo.userName" clearable >
                        </el-input>
                    </div>
                    <div>
                        <span>用户角色：</span>
                        <el-select v-model="searchInfo.userRole" placeholder="请选择角色" clearable>
                            <el-option v-for="item in userRoleOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span class="filter-commit" @click="searchData">查询</span>
                <span class="filter-reset" @click="reset">重置</span>
            </div>
            <div class="add operate-btn" @click="addUser">
                <i class="el-icon-plus"></i>
                添加用户
            </div>
        </div>
        <div class="table-box">
            <div ref="tableInfo" class="tableInfo">
                <hongxin-table
                    v-loading="loading"
                    ref="table"
                    :data="tableData"
                    :class-name="['table-gray', 'medium']"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :total="Number(userDataTotal)"
                    :max-height="tableHeight"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="width: 100%"
                    @size-change="sizeChange"
                    @current-page-change="currentChange"
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
                        prop="username"
                        label="用户名称"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="roleId"
                        label="用户角色"
                    >
                        <template slot-scope="scope">
                            <span>
                                {{ scope.row.roleId == 1 ? '超级管理员' : scope.row.roleId == 2 ? '管理员' : '员工'}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="mobile"
                        label="联系方式"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="email"
                        label="邮箱地址"
                    ></el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="createTime"
                        label="创建时间"
                    ></el-table-column>
                    <el-table-column
                        width="150"
                        align="center"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <span class="operating" @click="deleteUser(scope.row)">
                                删除
                            </span>
                        </template>
                    </el-table-column>
                </hongxin-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SYSTEMMANAGE, GET_SYSTEM_MANAGE_INFO,DELETE_SYSTEM_MANAGE_INFO,BREAD_SHOW } from './vuex.js';
import { Table } from 'hongxin-ui';
import { MessageBox } from 'element-ui';
export default {
    components: {
        'hongxin-table': Table,
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            pageNum: 1,
            pageSize: 10,
            searchInfo: {
                userRole: '',
                userName: '',
            },
            userRoleOptions: [{
                label: '超级管理员',
                value: 1,
            },{
                label: '管理员',
                value: 2,
            },{
                label: '员工',
                value: 3,
            }],
            breadData: [
                {
                    key: 'homeShow',
                    value: true
                }
            ]
        };
    },
    computed: {
        ...mapState(SYSTEMMANAGE, {
            loading: state => state.loading,
            tableData: state => state.userData,
            userDataTotal: state => state.userDataTotal,
        })
    },
    created() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            const sendData = {};
            sendData.pageNum = this.pageNum;
            sendData.pageSize = this.pageSize;
            sendData.userRole = this.searchInfo.userRole;
            sendData.userName = this.searchInfo.userName;
            this.$store.dispatch(`${SYSTEMMANAGE}/${GET_SYSTEM_MANAGE_INFO}`,sendData).then(() => {
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
            this.getUserData();
        },
        currentChange(res) {
            this.pageNum = res;
            this.getUserData();
        },
        deleteUser(res) {
            MessageBox.confirm('确定删除该用户吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch(`${SYSTEMMANAGE}/${DELETE_SYSTEM_MANAGE_INFO}`,{
                        userId: res.userId,
                    }).then(() => {
                        this.getUserData();
                    });
                });
        },
        searchData() {
            this.getUserData();
        },
        reset() {
            this.pageNum = 1;
            this.pageSize = 10;
            this.searchInfo.userRole = '';
            this.searchInfo.userName = '';
            this.getUserData();
        },
        addUser() {
            this.$store.commit(`${SYSTEMMANAGE}/${BREAD_SHOW}`,{
                key: 'homeShow',
                value: false
            });
        },
        indexMethod(index) {
            return index + 1;
        },
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
