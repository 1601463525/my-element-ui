<template>
    <el-form label-width="100px">
        <el-row class="suggess">
            <el-col :span="4">
                <div>
                    <div class="left-img">
                        <span>铁塔公司</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="投票结果:">
                            {{ suggess.voteResult }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投票日期:">
                            {{ suggess.voteDate }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="voteTextLabel">
                            {{ suggess.opinion }}
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            voteTextLabel: '备注:',
        };
    },
    props: {
        suggess: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        'suggess.voteResult': {
            deep:true,
            handler(newVal) {
                if(newVal === '同意'){
                    this.voteTextLabel = '备注:';
                } else {
                    this.voteTextLabel = '不同意原因:';
                }
            },
        }
    },
};
</script>
<style lang="scss" scoped>
    .suggess {
            border: 1px solid #000;
            .left-img {
                height: 90px;
                width: 140px;
                background: blue;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                font-size: 16px;
            }
        }
</style>


