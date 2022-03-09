<template>
    <div class="traceability-main">
        <div class="back">
            <el-button size="medium" type="primary" @click="back">返回</el-button>
        </div>
        <el-steps :active="traceabilityData.length" align-center v-if="traceabilityData.length > 0">
            <template v-for="(item,index) in traceabilityData">
                <el-step :title="`${item.voteUser}(${item.operate === 'A' ? '新增' : item.operate === 'D' ? '删除' : '修改'})`"
                         :description="`${item.voteResult}(${item.voteDate})`"
                         icon="el-icon-s-custom"
                         :key="index"
                         @click.native="goToDetail(item)"></el-step>
            </template>
        </el-steps>
        <no-data v-else></no-data>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SHARE,GET_TRACE_DATA,BREAD_SHOW,CHANGE_TRACE_DETAIL_ID  } from './vuex.js';
import { NoData } from 'hongxin-ui';

export default {
    components: {
        'no-data': NoData
    },
    data () {
        return {
            breadData: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'traceabilityShow',
                    value: false
                },
                {
                    key: 'historyDetailShow',
                    value: false
                },
            ],
            breadDataDetail: [
                {
                    key: 'tableShow',
                    value: false
                },
                {
                    key: 'traceabilityShow',
                    value: false
                },
                {
                    key: 'historyDetailShow',
                    value: true
                },
            ],
        };
    },
    computed: {
        ...mapState(SHARE, {
            shareId: state => state.shareId,
            traceabilityData: state => state.traceabilityData,
        })
    },
    created() {
        this.getTraceabilityData();
    },
    methods: {
        getTraceabilityData() {
            this.$store.dispatch(`${SHARE}/${GET_TRACE_DATA}`,{
                ...this.shareId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
        },
        goToDetail(data) {
            this.$store.commit(`${SHARE}/${CHANGE_TRACE_DETAIL_ID}`,data);
            this.breadDataDetail.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
        }
    },
};
</script>

<style lang="scss" scoped>
    .traceability-main {
        font-size: 16px;
        .back {
            display: flex;
            justify-content: flex-end;
            padding: 20px;
        }
    }
</style>

