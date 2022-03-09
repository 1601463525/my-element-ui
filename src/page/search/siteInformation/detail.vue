<template>
    <div class="info-content">
        <el-form 
            :model="siteDetailData" 
            :validate-on-rule-change="false"
            label-width="150px" 
        >
            <div class="back">
                <el-button size="medium" type="primary" @click="back">返回</el-button>
            </div>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="地市:" prop="city">
                        <el-input v-model="siteDetailData.city" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="区县:" prop="area">
                        <el-input v-model="siteDetailData.area" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="共享用户:" prop="shareUser">
                        <el-input v-model="siteDetailData.shareUser" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="铁塔编码:" prop="towerCode">
                        <el-input v-model="siteDetailData.towerCode" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址名称:" prop="stadionName">
                        <el-input v-model="siteDetailData.stadionName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="业务账期: " prop="businessTime">
                        <el-input v-model="siteDetailData.businessTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="站址原产权方: " prop="originalUnit">
                        <el-input v-model="siteDetailData.originalUnit" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="服务起始日期: " prop="startTime">
                        <el-input v-model="siteDetailData.startTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="服务结束日期: " prop="endTime">
                        <el-input v-model="siteDetailData.endTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="是否含有5G: " prop="contain5G">
                        <el-input v-model="siteDetailData.contain5G" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { SITE,GET_SITE_DETAIL,BREAD_SHOW  } from './vuex.js';
export default {
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
        ...mapState(SITE, {
            siteId: state => state.siteId,
            siteDetailData: state => state.siteDetailData,
        })
    },
    created() {
        this.getSiteDetail();
    },
    methods: {
        getSiteDetail() {
            this.$store.dispatch(`${SITE}/${GET_SITE_DETAIL}`,{
                id: this.siteId
            });
        },
        back() {
            this.breadData.forEach(item => {
                this.$store.commit(`${SITE}/${BREAD_SHOW}`,item);
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
    }
</style>
