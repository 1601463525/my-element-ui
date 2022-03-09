<template>
    <hongxin-table
        v-loading="traceListLoading"
        :class-name="['table-gray', 'medium']"
        :data="traceList"
        :showPagination="false"
        :max-height="tableHeight"
        style="width: 100%"
    >
        <el-table-column
            :show-overflow-tooltip="true"
            type="index"
            width="50"
            label="序号"
        ></el-table-column>
        <el-table-column
            :show-overflow-tooltip="true"
            label="业务类型"
            prop="businessType"
        ></el-table-column>
        <el-table-column
            :show-overflow-tooltip="true"
            label="发起方"
            prop="initiator"
        ></el-table-column>
        <el-table-column
            :show-overflow-tooltip="true"
            label="发起时间"
            prop="initiateTime"
        ></el-table-column>
        <el-table-column
            :show-overflow-tooltip="true"
            label="操作"
        >
            <slot slot-scope="scope">
                <el-button
                    v-if="scope.row.supportOperation.indexOf('browse')!==-1" 
                    type="text" 
                    @click="goToTraceDetail(scope.row.traceId)"
                >查看</el-button>
            </slot>
        </el-table-column>
    </hongxin-table>
</template>

<script>
import { Table } from 'hongxin-ui';
import { mapState } from 'vuex';
import { METERS_INFO, MODIFY_TRACE_ID, GET_METER_TRACE_LIST, MODIFY_CONTENT_DISPLAY } from './vuex';

export default {
    components: {
        'hongxin-table': Table
    },
    data() {
        return {
            tableHeight: window.innerHeight - 280,
            toBrowseDisplayParams: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'historyShow',
                    value: false
                },
                {
                    key: 'historyTraceShow',
                    value: true
                }
            ]
        };
    },
    computed: {
        ...mapState(METERS_INFO, {
            traceListLoading: state => state.traceListLoading,
            traceList: state => state.traceList,
            meterId: state => state.meterId
        })
    },
    created() {
        this.getMeterTraceList();
    },
    methods: {
        getMeterTraceList() {
            this.$store.dispatch(`${METERS_INFO}/${GET_METER_TRACE_LIST}`, {
                id: this.meterId
            });
        },
        goToTraceDetail(id) {
            this.toBrowseDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
            this.$store.commit(`${METERS_INFO}/${MODIFY_TRACE_ID}`, id);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
