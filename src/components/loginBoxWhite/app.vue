<template>
    <div class="loginbox">
        <div v-if="showLogin">
            <h3 class="loginbox-title">
                <p :class="{ 'is-center': title }">{{ title || '用户登录' }}</p>
                <i class="bg-line"></i>
            </h3>
            <div class="loginbox-content">
                <div class="form-item">
                    <input 
                        v-model="username" 
                        class="username" 
                        type="text" 
                        placeholder="请输入用户名" 
                        @input="onInput"
                    >
                    <img :src="require('./images/user.png')">
                </div>
                <div class="form-item">
                    <input 
                        v-model="password" 
                        class="password" 
                        type="password" 
                        placeholder="请输入密码"
                        @input="onInput"
                    >
                    <img :src="require('./images/password.png')">
                </div>
                <div class="form-item">
                    <input 
                        v-model="inputCode" 
                        class="inputCode" 
                        type="inputCode" 
                        placeholder="请输入图形验证码"
                        @input="onInput"
                    >
                    <img :src="require('./images/password.png')">
                    <div
                        style="position: absolute;right: 0px;top: 0px;"
                        @click="updateCode"
                    >
                        <s-identify ref="verfCode"></s-identify>
                    </div>
                </div>
                <div class="loginbox-err">{{ errMsg }}</div>
                <el-checkbox class="check-password" v-model="remember">记住密码</el-checkbox>
            </div>

            <div class="loginbox-footer">
                <button :disabled="loading" class="loginbox-btn" @click="onLoginClick">登录</button>
            </div>

        </div>
        <div v-else class="loginbox-tip">
            <div class="bg-user">
            </div>
            <p class="username">欢迎您，{{ loginName }}</p>
            <a class="loginbox-btn" href="/user/workbench">进入平台</a>
            <span id="loginOut" class="loginOut" @click="onLoginOut">退出登录</span>
        </div>
    </div>
</template>

<script>
import SIdentify from '../code/verifCode';
import login from '../login';
import { Checkbox } from 'element-ui';
export default {
    components:{
        SIdentify
    },
    props: {
        title: {
            type: String,
            default: () => ''
        }
    },
    data() {
        return {
            showLogin: true,
            loginName: '',
            username: '',
            password: '',
            remember: true,
            verCode: '',
            inputCode: '',
            errMsg: '',
            loading: false,
        };
    },
    mounted() {
        this.updateCode();
        this.loginName = '';
        if (this.loginName) {
            this.showLogin = false;
        } else {
            const date = new Date();
            date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
            document.cookie = 
                'loginUrl=' + '/;expires=' + date.toGMTString() + ';path=/';
        }
    },
    methods: {
        async onLoginClick() {
            const { username, password, verCode, inputCode, remember } = this.$data;
            console.log(JSON.stringify(this.$data));
            try {
                this.loading = true;
                const result = await login(username, password, verCode, inputCode, remember);
                if(result === '登录成功') {
                    const date = new Date();
                    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                    document.cookie = 
                        'loginUrl=' + '/login' + this.$route.fullPath + ';expires=' + date.toGMTString() + ';path=/';
                    sessionStorage.setItem('isAuth',true);
                    window.location.href = '/blockchain/';
                    this.loading = false;
                }
            } catch (e) {
                this.errMsg = e.message;
                this.loading = false;
            }
        },
        onInput(){
            this.errMsg = '';
        },
        onLoginOut() {
            window.location.href = `${window.location.origin}/blockchain/login`;
        },
        updateCode() {
            this.verCode = this.$refs.verfCode.setCode();
            console.log(this.verCode);
        }
    },
};
</script>



<style lang="scss" scoped>
.loginbox {
    position: absolute;
    width: 450px;
    height: 440px;
    background: rgba(255, 255, 255, 0.7);
    border: 2px solid #fff;
    border-radius: 8px;
    &-title {
        height: 75px;
        line-height: 75px;
        margin: 0;
        font-size: 20px;
        color: #000000;
        padding: 0 52px;
        position: relative;
        p.is-center {
            text-align: center;
            font-size: 18px;
            color: #455870;
        }
        .bg-line {
            display: inline;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #fff;
        }
    }
    &-content {
        position: relative;
        padding: 0 50px;
        .form-item {
            width: 100%;
            height: 50px;
            border-color: #dedede;
            margin-top: 25px;
            position: relative;
            input {
                width: 100%;
                height: 100%;
                padding-left: 55px;
                border-radius: 25px;
                border: 0;
                outline:none;
            }
            .inputCode {
                width: 65%;
                height: 100%;
                padding-left: 55px;
                border-radius: 25px;
                border: 0;
                outline:none;
            }
            .inputCode-div {
                position: absolute;
                top: 14px;
                right: 20px;
            }
            img {
                position: absolute;
                top: 14px;
                left: 20px;
            }
        }
        .loginbox-err {
            height: 20px;
            font-size: 14px;
            color: red;
        }
        .check-password {
            margin: 0px 0px 10px 0px;
        }
    }

    .loginbox-tip {
        .username {
            text-align: center;
            margin: 30px 0;
            font-size: 16px;
        }
        .bg-user {
            width: 100%;
            height: 128px;
            margin-top: 30px;
            background: url(./images/usr.png) no-repeat center;
        }
    }
    .loginbox-btn {
        display: block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background: #d30003;
        border-radius: 5px;
        outline: none;
        border: none;
        width: calc(100% - 100px);
        cursor: pointer;
        margin: 0 50px;
        &:hover {
            background: rgba(211, 0, 3, 0.7);
        }
    }
    .loginOut {
        float: right;
        font-size: 16px;
        color: #d30003;
        margin: 15px 55px;
        cursor: pointer;
    }
}
</style>
