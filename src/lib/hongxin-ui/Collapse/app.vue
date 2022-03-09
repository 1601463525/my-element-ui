<template>
    <div class="hongxin-collapse">
        <!--大模式下有返回\折叠\关闭功能 -->
        <div v-if="bigMode" class="big-mode">
            <h3 class="collapse-title">
                <span :title="bigTitle" class="title" @click="onSlider()">{{ bigTitle }}</span>
                <i v-if="close" class="btn-close hongxin-icon-close_little" @click="onClose"></i>
                <i v-if="min" :class="slider" class="slider" @click="onSlider()"></i>
                <i v-if="back" class="back hongxin-icon-return" @click="onBack()"></i>
            </h3>
            <el-collapse v-show="!foldStatus" :value="value">
                <slot></slot>
            </el-collapse>
        </div>
        <!-- 小模式下,仅折叠功能,同饿了么collapse组件 -->
        <div v-if="!bigMode" class="small-mode">
            <el-collapse :value="value">
                <slot></slot>
            </el-collapse>
        </div>
    </div>
</template>
<script>
import { Collapse } from 'element-ui';
const collapseProps = {...Collapse.props};

export default {
    name:'SafetyCollapse',
    components:{
        'el-collapse':Collapse
    },
    props:{
        ...collapseProps,
        //新增属性
        bigMode:{//模式 大小模式 ，默认是小模式
            type:Boolean,
            default: () => false
        },
        bigTitle:{//大模式的标题
            type:String,
            default: () => ''
        },
        fold:{ //折叠，默认展开
            type:Boolean,
            default: () => false
        }, 
        close: { //关闭
            type: Boolean,
            default: () => false
        },
        back: { //返回
            type: Boolean,
            default: () => false
        },
        min: { //最小化
            type: Boolean,
            default: () => true
        },
    },
    data() {
        return {
            foldStatus:!this.fold
        };
    },
    computed: {
        slider(){
            return {
                'hongxin-icon-uparrow':!this.bigMode && !this.foldStatus,
                'hongxin-icon-downarrow':!this.bigMode && this.foldStatus,
                'hongxin-icon-min':this.bigMode && !this.foldStatus,
                'hongxin-icon-zoomin1':this.bigMode && this.foldStatus,
            };
        },
        modeStyle(){
            return {
                'collapse-panel-large':this.bigMode,
                'collapse-panel':!this.bigMode
            };
        }
    },
    mounted() { 
    },
    methods: {
        onSlider(){
            this.foldStatus = !this.foldStatus;
            this.$emit('slider');
        },
        onBack(){
            this.$emit('back');
        },
        onClose() {
            this.$emit('close');
        }
    },
};
</script>
<style lang="scss" scoped>
    .hongxin-collapse{
        width:100%;
        /deep/ {
            .el-collapse{
                display: flex;
                flex-direction: column;
                height: calc(100% - 40px);
                border-top: none;
                background: #fff;
                .el-scrollbar{
                    flex:1;
                }
                .el-scrollbar__wrap{
                    overflow-x: hidden;
                    margin-bottom: 0 !important;
                }
                .el-collapse-item:last-child{
                    margin-bottom: 0 !important;
                }
            }
            
            .el-collapse-item__header{
                position: relative;
                font-size:12px;
                height:40px;
                line-height:40px;
                color:#4c85ff;
                padding-left:20px;
                border-bottom:solid 3px #ebeef5;
                &.is-active{
                    border-bottom:none;
                }
                &:before{
                    content:'';
                    position: absolute;
                    left:10px;
                    top:13px;
                    width:2px;
                    height:14px;
                    background:#4c85ff;
                }
                .el-collapse-item__arrow{
                    font-family: "hongxinfont" !important;
                    color:#4c85ff;
                    font-size:14px;
                    line-height: 30px;
                    float: right;
                    cursor: pointer;
                    &::before{
                        content:"\e653";
                    }
                    &.is-active{
                        transform: rotate(180deg);
                    }
                }
            }
            .el-collapse-item__content{
                padding:10px;
            }
            .el-collapse-item__wrap{
                border-bottom: 3px solid #ebeef5;
            }
        }
        .big-mode{
            height: 100%;
            > .collapse-title{
                font-size:14px;
                height:40px;
                line-height:40px;
                margin:0;
                padding:0 10px;
                background:#4c85ff;
                color:#fff;
                i{
                    cursor: pointer;
                    margin-left:10px;
                }
                .back{
                    float: right;
                }
                .title{
                    white-space: nowrap;
                    overflow: hidden;
                    max-width: 270px;
                    display: inline-block;
                    text-overflow: ellipsis;
                }
                .slider{
                    float: right;
                }
                .btn-close {
                    float: right;
                    font-size: 12px;
                }
            }
        }
    }
</style>
