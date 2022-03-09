<template>
    <div class="bread-crumb">
        <a-icon type="unordered-list" style=""></a-icon>
        <el-breadcrumb style="display:flex;align-items:center;" separator="/">
            <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
                <a @click="handleLink(item)">{{item.title}}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data () {
        return {
            breadList: null
        };
    },
    computed: {
        menuList () {
            return this.$store.state.menuList;
        }
    },
    created () {
        this.getBreadList();
    },
    methods: {
        // 初始化获取面包屑列表
        getBreadList() {
            this.breadList = [];
            if (this.$route.path === '' || this.menuList.length <= 0) {
                return [];
            } else {
                this.menuList.forEach(item => {
                    if (item.subMenu && item.subMenu.length > 0) {
                        item.subMenu.forEach(el => {
                            if (el['type'] === this.$route.path) {
                                this.breadList.push({ type: '', title: item.title });
                                this.breadList.push(el);
                            }
                        });
                    }
                });
            }
        },
        // 面包屑选中跳转
        handleLink(item) {
            const {title, type} = item;
            if (type !== '') {
                this.$router.push({path: type});
            }            
        }
    },
    watch: {
        $route() {
            this.getBreadList();
        }
    }
};
</script>

<style lang="scss" scoped>
.bread-crumb {
    width: 100%;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 1px 7px 0px rgba(104, 113, 158, 0.17);
    display: flex;
    align-items: center;
    i {
    margin: 0 20px;
    }
    a {
        font-weight: normal;
    }
    a:hover {
        color: #000000;
    }
}
</style>
