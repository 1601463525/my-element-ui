<template>
    <div class="info-content">
        <el-form 
            :model="shareDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back"  class="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="shareDetailData.towerCode" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="stadionName">
                        <el-input v-model="shareDetailData.stadionName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站址来源分类:" prop="sourceType">
                        <el-input v-model="shareDetailData.sourceType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="共享类型:" prop="shareType">
                        <el-input v-model="shareDetailData.shareType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="title">
                <span>电费分摊比例(固定比例)</span>
            </div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="移动: " prop="mobileValue">
                        <el-input v-model="shareDetailData.mobileValue" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联通: " prop="unicomValue">
                        <el-input v-model="shareDetailData.unicomValue" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电信: " prop="teleValue">
                        <el-input v-model="shareDetailData.teleValue" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="历史轨迹:">
                        <history-table ></history-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SHARE,GET_SHARE_DETAIL,BREAD_SHOW  } from './vuex.js';
import HistoryTable from './history';
export default {
    components: {
        'history-table': HistoryTable,
    },
    data () {
        return {
            breadData: [
                {
                    key: 'tableShow',
                    value: true
                },
                {
                    key: 'detailShow',
                    value: false
                },
            ]
        };
    },
    computed: {
        ...mapState(SHARE, {
            shareId: state => state.shareId,
            shareDetailData: state => state.shareDetailData,
        })
    },
    created() {
        this.getSHAREDetail();
    },
    methods: {
        getSHAREDetail() {
            this.$store.dispatch(`${SHARE}/${GET_SHARE_DETAIL}`,{
                id: this.shareId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${SHARE}/${BREAD_SHOW}`,item);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .info-content {
        margin: 20px;
        font-size: 16px;
        .back {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        .title {
            height: 40px;
            margin-left: 100px;
            font-size: 14px;
            font-weight: 400;
            color: #B0B0B0;
        }
    }
</style>
