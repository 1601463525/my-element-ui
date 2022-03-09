<template>
    <el-pagination
        v-bind="$props"
        :layout="layout"
        :page-sizes="pageSizes"
        class="hongxin-pagination"
        @size-change="sizeChange"
        @current-change="currentPageChange"
        @prev-click="prevClick"
        @next-click="nextClick"
    ></el-pagination>
</template>


<script>
import { Pagination } from 'element-ui';
const collapseProps = { ...Pagination.props };

export default {
    name: 'SafetyUIPagination',
    components: {
        'el-pagination': Pagination,
    },
    props: {
        ...collapseProps,
        layout: {
            type: String,
            default: () => 'total,sizes,prev,pager,next',
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 50],
        },
    },
    methods: {
        sizeChange(pages) {
            this.$emit('size-change', pages);
        },
        currentPageChange(page) {
            this.$emit('current-page-change', page);
        },
        prevClick(page) {
            this.$emit('prev-click', page);
        },
        nextClick(page) {
            this.$emit('next-click', page);
        },
    },
};
</script>

<style lang="scss" scoped>
.hongxin-pagination {
    display: flex;
    justify-content: flex-end;
    /deep/ .el-pagination button,
    /deep/ .el-pagination span:not([class*='suffix']),
    /deep/ .el-pagination__sizes .el-input .el-input__inner {
        font-size: 14px;
    }
    /deep/ .el-pagination .btn-next,
    /deep/ .el-pagination button:disabled,
    /deep/ .el-pagination .btn-prev,
    /deep/ .el-pager li {
        background: transparent;
        font-size: 14px;
    }
    /deep/ .el-pagination__sizes{
        margin-right:auto;
    }
}
</style>

