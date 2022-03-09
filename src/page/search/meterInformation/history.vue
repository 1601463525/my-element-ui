<template>
    <div class="meter-history-main" v-loading="historyLoading">
        <el-form
            :model="meterDetail"
            :validate-on-rule-change="false"
            label-width="150px"
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="地市">
                        <el-select v-model="meterDetail.city"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县">
                        <el-select v-model="meterDetail.district"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址ID">
                        <el-input v-model="meterDetail.siteId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="铁塔编码">
                        <el-input v-model="meterDetail.towerCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="铁塔权属">
                        <el-input v-model="meterDetail.towerOwnership"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电费类别">
                        <el-input v-model="meterDetail.feeType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电表号">
                        <el-input v-model="meterDetail.meterCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="充电方式">
                        <el-input v-model="meterDetail.chargeType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电表状态">
                        <el-input v-model="meterDetail.meterState"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="对方单位/个人名称">
                        <el-input v-model="meterDetail.oppoName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="协议价格">
                        <el-input v-model="meterDetail.contractPrice">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否专票">
                        <el-input v-model="meterDetail.isSpecialTicket"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="税率">
                        <el-input v-model="meterDetail.taxRate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="历史轨迹">
                        <trace-table></trace-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { METERS_INFO, GET_METER_DETAIL, MODIFY_CONTENT_DISPLAY, MODIFY_TRACE_ID } from './vuex';
import { mapState } from 'vuex';
import TraceTable from './historyTraceTable';

export default {
    components: {
        'trace-table': TraceTable
    },
    data() {
        return {
            backDisplayParams: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'historyShow',
                    value: false
                },
                {
                    key: 'historyTraceShow',
                    value: false
                }
            ]
        };
    },
    computed: {
        ...mapState(METERS_INFO, {
            historyLoading: state => state.historyLoading,
            meterDetail: state => state.meterDetail,
            meterId: state => state.meterId
        })
    },
    created() {
        this.getMeterDetail();
    },
    methods: {
        getMeterDetail() {
            this.$store.dispatch(`${METERS_INFO}/${GET_METER_DETAIL}`, {
                id: this.meterId
            });
        },
        back() {
            this.backDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
        },
        goToHistoryTrace(id) {
            this.toBrowseDisplayParams.forEach(param => {
                this.$store.commit(`${METERS_INFO}/${MODIFY_CONTENT_DISPLAY}`, param);
            });
            this.$store.commit(`${METERS_INFO}/${MODIFY_TRACE_ID}`, id);
        }
    }
};
</script>

<style lang="scss" scoped>
.meter-history-main {
    font-size: 16px;
    margin: 20px;
    .back {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
}
</style>
