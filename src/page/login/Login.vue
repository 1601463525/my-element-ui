<template>
    <div v-cloak class="login-app ldqt-login">
        <!-- <div class="header-content">
            <div class="logo"></div>
        </div> -->
        <div class="main">
            <div class="main-box my-clear">
                <login-box class="login-box" ></login-box>
            </div>
        </div>
    </div>
</template>


<script>
import LoginBoxWhite from '~c/loginBoxWhite/app.vue';
export default {
    components:{
        'login-box':LoginBoxWhite
    },
};
</script>

<style lang="scss" scoped>
.my-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);    /* for Chrome || Safari */
    -moz-transform: translate(-50%, -50%);       /* for Firefox */
    -ms-transform: translate(-50%, -50%);        /* for IE */
    -o-transform: translate(-50%, -50%);         /* for Opera */
}
.my-clear:after{
    content: '';
    display: block;
    clear: both;
}
[v-cloak] {
    display: none;
}
.main-wrapper-content {
    height: 100%;
}
.login-app {
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 18px;
    color: #5e5e5e;
    .main {
        width: 100%;
        height: 100%;
        min-height:500px;
        background: url(./images/bg.png) no-repeat center;
        background-size: cover;
        margin: 0;
    }
    .main-box {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .footer-content {
        width: 100%;
        padding: 40px 0;
        p {
            height: 30px;
            font-size: 18px;
            line-height: 30px;
            text-align: center;
            color: #162837;
            opacity: 0.82;
        }
    }
    .login-box{
        position: absolute;
        right:-10%;
        top:50%;
        transform:translate(-50%, -50%);
    }
}
</style>

<style lang="scss">
.ldqt-login {
    .loginbox-btn {
        background: #2B90F7 !important;
        border-radius: 25px !important;
        &:hover {
            background: rgba(19, 70, 111, 0.7)!important;
        }
    }
    .loginOut {
        color: #13466f!important;
    }
}
</style>
