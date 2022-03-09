<template>
    <div class="traceability-main">
        <div class="back">
            <el-button size="medium" type="primary" @click="back">返回</el-button>
        </div>
        <el-steps :active="traceabilityData.length" align-center>
            <template v-for="(item,index) in traceabilityData">
                <el-step :title="`${item.name}(${item.status})`"
                         :description="`${item.suggess}(${item.time})`"
                         icon="el-icon-s-custom"
                         :key="index"
                         @click.native="goToDetail(item)"></el-step>
            </template>
        </el-steps>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { ELECTRICITY,GET_TRACE_DATA,BREAD_SHOW,CHANGE_TRACE_DETAIL_ID  } from './vuex.js';
export default {
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
                    key: 'traceDetailShow',
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
                    key: 'traceDetailShow',
                    value: true
                },
            ],
        };
    },
    computed: {
        ...mapState(ELECTRICITY, {
            traceabilityId: state => state.traceabilityId,
            traceabilityData: state => state.traceabilityData,
        })
    },
    created() {
        this.getTraceabilityData();
    },
    methods: {
        getTraceabilityData() {
            this.$store.dispatch(`${ELECTRICITY}/${GET_TRACE_DATA}`,{
                id: this.traceabilityId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${ELECTRICITY}/${BREAD_SHOW}`,item);
            });
        },
        goToDetail(data) {
            this.$store.commit(`${ELECTRICITY}/${CHANGE_TRACE_DETAIL_ID}`,data.id);
            this.breadDataDetail.forEach(item => {
                this.$store.commit(`${ELECTRICITY}/${BREAD_SHOW}`,item);
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

