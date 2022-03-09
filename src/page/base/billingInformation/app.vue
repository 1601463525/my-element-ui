<template>
    <div style="left:30px;righ:30px;">
        <div class="operation-section-class">
            <div>
                <span>铁塔编码: </span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in towerCodeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>电表号: </span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in elecNumberList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-button type="primary">查  询</el-button>
                <el-button>重  置</el-button>
            </div>
        </div>
        <el-button style="margin-bottom: 17px;"><i class="el-icon-download"></i> 导出Excel</el-button>
        <el-table
            :data="tableData"
            :height="tableHeight"
            border
            class="eltable-class">
            <el-table-column
                prop="number"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="city"
                label="城市"
                width="180">
            </el-table-column>
            <el-table-column
                prop="region"
                label="区域">
            </el-table-column>
            <el-table-column
                prop="towerCode"
                label="铁塔编码">
            </el-table-column>
            <el-table-column
                prop="address"
                label="站址名称">
            </el-table-column>
            <el-table-column
                prop="elecNumber"
                label="电表号">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleSettle(scope.row)" type="text" size="small">结 算</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="position:absolute;bottom:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        >
        </el-pagination>
    </div>
</template>

<script>
import * as api from '@/api/search/index';
import { wrapResponse } from '@/utils/ajax';

export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }],
            value: '',
            tableData: [],
            tableHeight: window.innerHeight - 280,
            towerCodeList: [],
            elecNumberList: []
        };
    },
    created() {
        this.getTowerCodeList(),
        this.getElecNumberList(),
        this.getTableDataList();
    },
    mounted() {
        // 表格高度自适应
        window.onresize = () => {
            return (() => {
                this.tableHeight = window.innerHeight - 280;
            })();
        };
    },
    
    methods: {
        // 铁塔编码列表获取
        async getTowerCodeList() {
            try {
                const result = await wrapResponse(api.default.getTowerCodeListAPI({}));
                this.towerCodeList = result.list;
            } catch (e) {
                // do nothing.
            }
        },
        // 获取电号表下拉列表
        async getElecNumberList() {
            try {
                const result = await wrapResponse(api.default.getElecNumberListAPI({}));
                this.elecNumberList = result.list;
            } catch (e) {
                // do nothing.
            }
        },
        // 结算信息表格数据
        async getTableDataList() {
            try {
                const result = await wrapResponse(api.default.getTableDataListAPI({}));
                this.tableData = result.list;
            } catch(e) {
                // do nothing.
            }
        },
        // 结算
        handleSettle(item) {}
    }
};
</script>e

<style lang="scss" scoped>
.operation-section-class{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
}
.eltable-class::-webkit-scrollbar {
  display: none;
}
</style>
