<template>
    <a-layout id="layout">
        <a-layout-header class="header" style="background-color:#162436">
            <a-row>
                <a-col :span="3">
                    <div class="logo">
                        <img src="/img/首页/logo-vue.png" alt>
                        <span>财务机器人管理平台</span>
                    </div>
                </a-col>
                <a-col :span="18">
                </a-col>
                <a-col :span="3">
                    <!-- 头部下拉菜单 -->
                    <div>
                        <template>
                            <a-dropdown style="margin-right:30px">
                                <a
                                    class="ant-dropdown-link"
                                    @click="e => e.preventDefault()"
                                >
                                    <a-icon type="user"></a-icon>&nbsp;&nbsp;
                                    <span>{{username}}</span>
                                    <a-icon type="down"></a-icon>
                                </a>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                        <a href="javascript:;">
                                            <a-icon type="tool"></a-icon>&nbsp;&nbsp;修改密码
                                        </a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">
                                            <a-icon type="poweroff"></a-icon>
                                            <span
                                                @click="logout"
                                            >&nbsp;&nbsp;退出登录</span>
                                        </a>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </template>
                    </div>
                </a-col>
            </a-row>
        </a-layout-header>

        <!-- 二级路由 -->
        <div class="banner">
            <router-view></router-view>
        </div>
    </a-layout>
</template>
<script>
import { mapState } from 'vuex';
import { SAVE_ROUTER, REQUEST_GET_MENU_LIST } from '../store/index.js';

export default {
    data() {
        return {
            username: sessionStorage.getItem('userName'),
            current: [''],
            collapsed: false
        };
    },
    computed: {
        ...mapState({
            menuList: state => state.menuList,
            userInfo: state => state.userInfo,
            loading: state => state.userInfoLoading
        })
    },
    created() {
        this.$store.commit(`${REQUEST_GET_MENU_LIST}`,'top');
    },
    beforeCreate() {
        this.$store.commit(SAVE_ROUTER, this.$router);
    },
    methods: {
        logout() {
            sessionStorage.setItem('isAuth', 'false');
            this.$router.push('login');
        }
    }
};
</script>

<style scoped lang="scss">
#layout {
  width: 100vw;
  height: 100vh;
  position: relative;
  .banner {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 64px;
    right: 0;
    
  }
  .header {
    width: 100vw;
    height: 64px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1000;
    .nav {
      line-height: 65px;
      height: 65px;
      a-menu-item {
        margin-right: 14px;
        &:hover {
          color: white;
        }
        .ant-menu-horizontal > .ant-menu-item-selected {
          color: red;
        }
      }
    }
  }
  .logo {
    width: 280px;
    height: 64px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    color: white;
    line-height: 64px;
    text-align: center;
    font-size: 22px;
    font-weight: bolder;
    margin-right: 300px;
    img {
      width: 35px;
      height: 35px;
      margin-right: 16px;
      margin-left: 0px;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>
