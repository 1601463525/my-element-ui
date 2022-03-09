<template>
    <div :class="['hongxinTable',...className]">
        <div class="tableBox">
            <el-table
                ref="table"
                v-bind="$props"
                style="width:100%;"
                border
                @select="select"
                @selection-change="selectionChange"
                @select-all="selectAll"
                @cell-mouse-enter="cellMouseEnter"
                @cell-mouse-leave="cellMouseLeave"
                @cell-click="cellClick"
                @row-click="rowClick"
                @row-contextmenu="rowContextmenu"
                @row-dblclick="rowDblclick"
                @header-click="headerClick"
                @header-contextmenu="headerContextmenu"
                @sort-change="sortChange"
                @filter-change="filterChange"
                @current-change="currentRowChange"
                @header-dragend="headerDragend"
                @expand-change="expandChange"
            >
                <slot></slot>
                <div slot="empty">
                    <div class="noData">
                        <div class="imgBox"><img src="../../../assets/img/noData/tableNoData.png"></div>
                        <div class="empty">暂无数据</div>
                    </div>
                </div>
            </el-table>
        </div>
        <div v-if="showPagination" :class="['paginationBox', addPaginationStyle]">
            <el-pagination
                v-bind="$props"
                :layout="layout"
                @size-change="sizeChange"
                @current-change="currentPageChange"
                @prev-click="prevClick"
                @next-click="nextClick"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { Table, Pagination } from 'element-ui';
const tableProps = { ...Table.props };
const paginationProps = { ...Pagination.props };
export default {
    components: {
        'el-table': Table,
        'el-pagination': Pagination,
    },
    props: {
        ...tableProps,//继承el-table的props
        ...paginationProps, //继承el-pagination的props
        className: {
            type: Array,
            default() {
                return ['table-blue', 'small'];
            },
        },
        showPagination: {
            type:Boolean,
            default() {
                return true;
            },
        },
        layout: {
            type: String,
            default() {
                return 'prev, pager, next, jumper, ->, total';
            },
        },
    },
    data() {
        return {};
    },
    computed: {
        addPaginationStyle(){
            if (this.layout.indexOf('sizes') !== -1 && this.layout.indexOf('total') !== -1){
                return 'hasTotalAndSizes';
            } else if (this.layout.indexOf('sizes') !== -1){
                return 'hasSizes';
            }else if(this.layout.indexOf('total') !== -1){
                return 'hasTotal';
            }
            return '';
        },
    },
    watch: {},
    mounted() {
    },
    methods: {
        toggleRowSelection(row, selected) {
            if (selected) {
                this.$refs.table.toggleRowSelection(row, true);
            } else {
                this.$refs.table.toggleRowSelection(row);
            }
        },
        clearSelection(row) {
            this.$refs.table.clearSelection(row);
        },
        toggleAllSelection() {
            this.$refs.table.toggleAllSelection();
        },
        toggleRowExpansion(row, expanded) {
            if (expanded) {
                this.$refs.table.toggleRowExpansion(row, true);
            } else {
                this.$refs.table.toggleRowExpansion(row);
            }
        },
        setCurrentRow(row) {
            this.$refs.table.setCurrentRow(row);
        },
        clearSort() {
            this.$refs.table.clearSort();
        },
        clearFilter(columnKey) {
            this.$refs.table.clearFilter(columnKey);
        },
        doLayout() {
            this.$refs.table.doLayout();
        },
        sort(prop, order) {
            this.$refs.table.sort(prop, order);
        },
        select(selection, row) {
            this.$emit('select', selection, row);
        },
        selectAll(selection) {
            this.$emit('selection-all', selection);
        },
        selectionChange(selection) {
            this.$emit('selection-change', selection);
        },
        cellMouseEnter(row, column, cell, event) {
            this.$emit('cell-mouse-enter', row, column, cell, event);
        },
        cellMouseLeave(row, column, cell, event) {
            this.$emit('cell-mouse-leave', row, column, cell, event);
        },
        cellClick(row, column, cell, event) {
            this.$emit('cell-click', row, column, cell, event);
        },
        rowClick(row, column, event) {
            this.$emit('row-click', row, column, event);
        },
        rowContextmenu(row, column, event) {
            this.$emit('row-contextmenu', row, column, event);
        },
        rowDblclick(row, column, event) {
            this.$emit('row-dblclick', row, column, event);
        },
        headerClick(column, event) {
            this.$emit('header-click', column, event);
        },
        headerContextmenu(column, event) {
            this.$emit('header-contextmenu', column, event);
        },
        sortChange({ column, prop, order }) {
            this.$emit('sort-change', { column, prop, order });
        },
        filterChange(filters) {
            this.$emit('filter-change', filters);
        },
        currentRowChange(currentRow, oldCurrentRow) {
            this.$emit('current-row-change', currentRow, oldCurrentRow);
        },
        headerDragend(newWidth, oldWidth, column, event) {
            this.$emit('header-dragend', newWidth, oldWidth, column, event);
        },
        expandChange(row, expanded) {
            this.$emit('expand-change', row, expanded);
        },
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
.hongxinTable {
    .tableBox {
        /deep/ .el-table{
            background-color: transparent;
        }
        /deep/ .el-table .cell {
            padding: 0 10px;
        }
        /deep/ .el-table th {
            font-weight: normal;
        }
        /deep/ .el-table tr {
            color: #454545;
            font-size: 14px;
        }
        /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: #f0f6fe;
        }
        /deep/ .el-table td,
        /deep/ .el-table th {
            padding: 0;
        }
        /deep/ .el-checkbox {
            margin: 0;
        }
    }
    .paginationBox {
        /deep/ .el-pagination {
            margin-top: 22px;
            display: flex;
            justify-content: flex-end;
        }
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
        &.hasTotalAndSizes,&.hasSizes{
            /deep/ .el-pagination__sizes {
                margin-right: auto;
            }
        }
        &.hasTotal{
            /deep/ .el-pagination__rightwrapper, /deep/ .el-pagination__total{
                margin-right: auto;
           }
        }
    }
    &.table-blue {
        /deep/ .el-table::before {
            height: 0;
        }
        /deep/ .el-table th {
            color: #fff;
            background-color: #7da6ff;
        }
        /deep/ .el-table td,
        /deep/ .el-table th.is-leaf {
            border-bottom: 1px solid #fff;
        }
        &.medium {
            /deep/ .el-table .cell {
                height: 49px;
                line-height: 49px;
            }
        }
        &.small {
            /deep/ .el-table .cell {
                height: 39px;
                line-height: 39px;
            }
        }
        &.mini {
            /deep/ .el-table .cell {
                height: 29px;
                line-height: 29px;
            }
            /deep/ .el-table .caret-wrapper {
                height: 30px;
            }
            /deep/ .el-table .sort-caret.ascending {
                top: 3px;
            }
            /deep/ .el-table .sort-caret.descending {
                bottom: 3px;
            }
        }
        /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: #fff6bd;
        }
    }
    &.table-gray {
        /deep/ .el-table th {
            color: #7f8fa4;
            background-color: #f4f8fb;
        }
        &.medium {
            /deep/ .el-table th .cell {
                height: 38px;
                line-height: 38px;
            }
            /deep/ .el-table td .cell {
                height: 59px;
                line-height: 59px;
            }
        }
        &.small {
            /deep/ .el-table th .cell {
                height: 38px;
                line-height: 38px;
            }
            /deep/ .el-table td .cell {
                height: 49px;
                line-height: 49px;
            }
        }
        &.mini {
            /deep/ .el-table td .cell,
            /deep/ .el-table th .cell {
                height: 28px;
                line-height: 28px;
            }
        }
        /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: #f3f9ff;
        }
        /deep/ .el-table th.is-leaf {
            border-bottom: 1px solid #ebeef5;
            border-top: 1px solid #ebeef5;
        }
    }
    &.table-dark-blue {
         /deep/ .el-table::before {
            height: 0;
        }
        /deep/ .el-table th {
            color: #00FFFF;
            background-color: rgba(5,200,246,0.2);
        }
        /deep/ .el-table tr {
            color: #fff;
            background-color:transparent;
        }
        /deep/ .el-table td,
        /deep/ .el-table th.is-leaf {
            border-bottom: 1px solid transparent;
        }
        /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: rgba(5,200,246,0.1);
        }
        /deep/ .el-pagination{
            color: rgba(230, 230, 230, 1);
            .el-pagination__total,.btn-next,.btn-prev,.el-pagination__jump{
                color: rgba(230, 230, 230, 1);
            }
            button:disabled{
                color: #909090;
            }
        }
        &.medium {
            /deep/ .el-table .cell {
                height: 49px;
                line-height: 49px;
            }
        }
        &.small {
            /deep/ .el-table .cell {
                height: 39px;
                line-height: 39px;
            }
        }
        &.mini {
            /deep/ .el-table .cell {
                height: 29px;
                line-height: 29px;
            }
            /deep/ .el-table .caret-wrapper {
                height: 30px;
            }
            /deep/ .el-table .sort-caret.ascending {
                top: 3px;
            }
            /deep/ .el-table .sort-caret.descending {
                bottom: 3px;
            }
        }
        /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgba(246, 146, 17, 0.5);
        }
    }
    &.mini {
        /deep/ .el-table tr {
            font-size: 12px;
        }
        .paginationBox {
            /deep/ .el-pagination button,
            /deep/ .el-pagination span:not([class*='suffix']),
            /deep/ .el-pagination__sizes .el-input .el-input__inner {
                font-size: 12px;
            }
            /deep/ .el-pagination .btn-next,
            /deep/ .el-pagination button:disabled,
            /deep/ .el-pagination .btn-prev,
            /deep/ .el-pager li {
                background: transparent;
                font-size: 12px;
            }
        }
    }
    .noData{
        font-size: 14px;
        color: #B3B3B3;
        text-align: center;
        padding: 10px 0;
        .imgBox{
            display:flex;
            img{
                margin: 10px auto 0;
            }
        }
        .empty{
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>

