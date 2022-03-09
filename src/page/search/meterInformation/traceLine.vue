<template>
    <div class="trace-line-main" v-loading="traceLineLoading">
        <div class="back">
            <el-button size="medium" type="primary" @click="back">返回</el-button>
        </div>
        <el-steps :active="traceLineInfo.length" align-center v-if="traceLineInfo.length > 0">
            <template v-for="(item,index) in traceLineInfo">
                <el-step :title="`${item.voteUser}(${item.operate === 'A' ? '新增' : item.operate === 'D' ? '删除' : '修改'})`"
                         :description="`${item.voteResult}(${item.voteDate})`"
                         icon="el-icon-s-custom"
                         :key="index"
                         @click.native="goToTraceDetail(item)"></el-step>
            </template>
        </el-steps>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_METER_TRACE_LINE, METERS_INFO, MODIFY_CONTENT_DISPLAY, MODIFY_TRACE_ID } from './vuex';
import { NoData } from 'hongxin-ui';

export default {
    components: {
        'no-data': NoData
    },
    data() {
        return {
            backDisplayParams: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'traceLineShow',
                    value: false
                },
                {
                    key: 'historyTraceShow',
                    value: false
                }
            ],
            toTraceDetailDisplayParams: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceLineShow',
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
            traceLineLoading: state => state.traceLineLoading,
            traceLineInfo: state => state.traceLineInfo,
            meterId: state => state.meterId
        })
    },
    created() {
        this.getMeterTraceLine();
    },
    methods: {
        getMeterTraceLine() {
            this.$store.dispatch(`${METERS_INFO}/${GET_METER_TRACE_LINE}`, this.meterId);
        },
        goToTraceDetail(item) {
            this.toTraceDetailDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
            this.$store.commit(`${METERS_INFO}/${MODIFY_TRACE_ID}`, item);
        },
        back() {
            this.backDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.trace-line-main {
    font-size: 16px;
    margin: 20px;
    .back {
        display: flex;
        justify-content: flex-end;
        margin: 20px;
    }
}
</style>
