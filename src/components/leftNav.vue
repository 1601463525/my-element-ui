<template>
    <div class="left">
        <i :class="controlCls" :title="controlTip" @click="onControlClick" style="color: #ffffff;"><a-icon :type="controlAlgin"></a-icon></i>
        <div :class="navCls">
            <h4 class="title">后台管理</h4>
            <el-scrollbar class="navBox">
                <el-menu
                    :default-active="currentMenu"
                    class="menu"
                    background-color="#2b3443"
                    text-color="#fff"
                    active-text-color="#00FFFF"
                >
                    <template v-for="menu in menuList">
                        <el-submenu
                            v-if="menu.subMenu"
                            :index="menu.type"
                            :key="menu.type"
                            class="submenu"
                        >
                            <template slot="title">
                                <a-icon :type="menu.icon" ></a-icon>
                                <span>{{ menu.title }}</span>
                            </template>
                            <el-menu-item
                                v-for="subMenu in menu.subMenu"
                                :key="subMenu.type"
                                :index="subMenu.type"
                                class="menu-item-row-2"
                                @click="onMenuClick(subMenu)"
                            >{{ subMenu.title }}</el-menu-item>
                        </el-submenu>
                        <el-menu-item
                            v-if="!menu.subMenu"
                            :key="menu.type"
                            :index="menu.type"
                            class="menu-item-row-1"
                            @click="onMenuClick(menu)"
                        >
                            <template slot="title">
                                <a-icon :type="menu.icon" ></a-icon>
                                <span>{{ menu.title }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { Menu, Submenu, MenuItem, Scrollbar } from 'element-ui';
export default {
    components: {
        'el-menu': Menu,
        'el-submenu': Submenu,
        'el-menu-item': MenuItem,
        'el-scrollbar': Scrollbar
    },
    props: {
        menuList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            expand: true, // 是否展开
        };
    },
    computed: {
        currentMenu() {
            if (this.$route.path === '/' && this.menuList.length > 0) {
                if (this.menuList[0].subMenu) {
                    return this.menuList[0].subMenu[0].type;
                } else {
                    return this.menuList[0].type;
                }
            }
            return this.$route.path;
        },
        controlCls() {
            return {
                control: true,
                'safety-icon-outdent': this.expand,
                'safety-icon-indent': !this.expand,
            };
        },
        controlAlgin() {
            const algin = this.expand ? 'align-right' : 'align-left';
            return algin;
        },
        controlTip() {
            if (this.expand) {
                return '收起菜单';
            } else {
                return '打开菜单';
            }
        },
        navCls() {
            return {
                'nav': true,
                'nav-shrink': !this.expand,
            };
        },
    },
    watch:{
        currentMenu(newVal){
            this.$router.replace(newVal);
        }
    },
    methods: {
        onMenuClick(menu) {
            this.$router.push(menu.type);
        },
        onControlClick() {
            this.expand = !this.expand;
        },
    },
};
</script>

<style lang="scss" scoped>
.left {
    position: relative;
    height: 100%;

    .control {
        position: absolute;
        line-height: 56px;
        right: -40px;
        font-size: 20px;
        color: #999999;
        z-index:999;
    }
}

.nav{
    position: relative;
    width: 230px;
    transition: width 0.3s;
    background-color: #2b3443;
    height: 100%;
    overflow: hidden;
    &-shrink {
        width: 0;
    }
    .title {
        margin: 0;
        padding: 0;
        height: 56px;
        padding-left: 20px;
        line-height: 56px;
        font-size: 18px;
        color: #fff;
    }
    .menu {
        width: 100%;
        border-right: 1px solid #2b3443;
        .anticon {
            margin-right: 10px;
        }
        .submenu /deep/ .el-submenu__title {
            padding-left: 12px !important;
        }
        .menu-item-row-1 {
            padding-left: 12px !important;
        }
        .menu-item-row-2 {
            padding-left: 46px !important;
        }
    }
    .navBox{
        height: calc(100vh - 56px);
        /deep/ .el-scrollbar__wrap{
            overflow-x: auto; 
        }
    }
    /deep/ .el-menu-item.is-active {
        background-color: #313b4d !important;
    }
}
</style>

