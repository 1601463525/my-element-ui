<template>
    <div class="info-content" v-loading="addUserLoading">
        <el-form 
            ref="userRoleForm"
            :model="userRoleInfo" 
            :validate-on-rule-change="false"
            :rules="addUserRules"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" @click="back">返回</el-button>
                <el-button size="medium" type="primary" @click="submit">提交</el-button>
            </div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="机构名称:" prop="deptId">
                        <el-select v-model="userRoleInfo.deptId" placeholder="请选择用户角色" @click.native="getDeptList">
                            <el-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色:" prop="roleId">
                        <el-select v-model="userRoleInfo.roleId" placeholder="请选择用户角色" @click.native="getRoleList">
                            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="24">
                    <el-form-item
                        label="用户角色: "
                        prop="userRole"
                    >
                        <el-select v-model="userRoleInfo.userRole" placeholder="请选择用户角色" disabled>
                            <el-option v-for="item in userRoleOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名:" prop="userName">
                        <el-input v-model="userRoleInfo.userName"  placeholder="请填写用户名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码:" prop="passWord">
                        <el-input v-model="userRoleInfo.passWord" placeholder="请填写密码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系方式:" prop="mobile">
                        <el-input v-model="userRoleInfo.mobile"  placeholder="请填写联系方式"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱地址:" prop="email">
                        <el-input v-model="userRoleInfo.email" placeholder="请填写邮箱地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SYSTEMMANAGE,ADD_SYSTEM_MANAGE_INFO,BREAD_SHOW,GET_DEPT_LIST,GET_ROLE_LIST  } from './vuex.js';

export default {
    components: {
    },
    data () {
        return {
            xlsxFile:'',
            fileList: [],
            userRoleInfo: {
                userName: '',
                passWord: '',
                mobile: '',
                email: '',
                roleId: '',
                deptId: '',
                salt: '',
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
            addUserRules: {
                passWord: [
                    {
                        required: true,
                        message: '请填写用户密码',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
                        message: '密码强度为最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
                        trigger: 'blur',
                    },
                ],
                roleId: [
                    {
                        required: true,
                        message: '请选择用户角色',
                        trigger: 'blur',
                    },
                ],
                deptId: [
                    {
                        required: true,
                        message: '请选择机构名称',
                        trigger: 'blur',
                    },
                ],
                userName: [
                    {
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                        message: '用户名为4到16位的字母，数字，下划线，减号',
                        trigger: 'blur',
                    },
                ],
                mobile: [
                    {
                        required: true,
                        message: '请填写联系方式',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: '联系方式格式不正确',
                        trigger: 'blur',
                    },
                ],
                email: [
                    {
                        required: true,
                        message: '请填写邮箱地址',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: '邮箱地址格式不正确',
                        trigger: 'blur',
                    },
                ],
            },
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
        ...mapState({
            menuList:state => state.menuList,
            userInfo: state => state.userInfo,
            loading: state => state.userInfoLoading,
        }),
        ...mapState(SYSTEMMANAGE, {
            addUserLoading: state => state.addUserLoading,
            deptList: state => state.deptList,
            roleList: state => state.roleList,
        })
    },
    created() {
        // this.userRoleInfo.userRole = window.golobalConfig.userInfo === '电信用户' ? 'ChinaTelecom' : 'ChinaTower';
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        getFile(){
            //获取file内容
            const files = this.$refs.fileId.files[0];
            this.xlsxFile = files;
        },
        back() {
            this.$store.commit(`${SYSTEMMANAGE}/${BREAD_SHOW}`,{
                key: 'homeShow',
                value: true
            });
            this.$refs.userRoleForm.resetFields();
        },
        submit() {
            this.$refs.userRoleForm.validate(valid => {
                if(valid) {
                    this.$store.dispatch(`${SYSTEMMANAGE}/${ADD_SYSTEM_MANAGE_INFO}`,{
                        ...this.userRoleInfo
                    }).then(() => {
                        this.back();
                    });
                }
            });
        },
        getDeptList() {
            this.$store.dispatch(`${SYSTEMMANAGE}/${GET_DEPT_LIST}`);
        },
        getRoleList() {
            this.$store.dispatch(`${SYSTEMMANAGE}/${GET_ROLE_LIST}`);
        },
    }
};
</script>
<style lang="scss" scoped>
    .info-content {
        margin: 20px;
        font-size: 16px;
        .back {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        .title {
            height: 40px;
            margin-left: 100px;
            font-size: 14px;
            font-weight: 400;
            color: #B0B0B0;
        }
        .priceTax {
            display: flex;
            .unit {
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #f4f8fb;
                display: inline-block;
                border: 1px solid #dcdfe6;
                border-left: none;
            }
        }
        /deep/ .el-select {
            width: 100%;
        }
    }
</style>
