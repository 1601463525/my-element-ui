<template>
    <div class="hongxin-dialog">
        <el-dialog 
            ref="hongxinDialog"
            v-bind="$props" 
            :visible="visible"
            :fullscreen="fullscreenControl"
            :top="marginTop"
            :class="{'showMenu': showMenu}"
            @open="open"
            @opened="opened"
            @close="close"
            @closed="closed">
            <div>
                <div 
                    v-if="showFullScreen" 
                    slot="title" 
                    :class="['zoomBtn', setIcon(fullscreenControl)]"
                    @click="zoomDialog"></div>
                <slot></slot>
            </div>
            <div v-if="$slots['hongxin-header']" slot="title">
                <slot name="hongxin-header" ></slot>
            </div>
            <div v-if="$slots['hongxin-footer']" slot="footer">
                <slot name="hongxin-footer" ></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {Dialog, Button} from 'element-ui';

const dialogProps = {...Dialog.props};
delete dialogProps.fullscreen;
export default {
    name: 'ElDialog',
    components: {
        'el-dialog': Dialog,
        'el-button': Button
    },
    props: {
        ...dialogProps, //继承el-dialog的props
        visible: {
            type: Boolean,
            default: () => false
        },
        //默认是否全屏
        fullscreen: {
            type: Boolean,
            default: () => false
        },
        //显示菜单
        showMenu: {
            type: Boolean,
            default: () => false
        },
        //是否显示全屏按钮
        showFullScreen: {
            type: Boolean,
            default: () => true
        },
        height: {
            type: String,
            default: () => 'auto'
        },
        //弹框是否居中显示
        contentCenter: {
            type: Boolean,
            default: () => false
        },
        top: {
            type: String,
            default: () => '15vh'
        },
    },
    data() {
        return {
            fullscreenControl: this.$props.fullscreen,
            marginTop: this.contentCenter ? '0' : this.top,
            zoomObj: {icon: 'hongxin-icon-zoomin1', type: 'default'}
        };
    },
    computed: {
    },
    watch: {
        visible(newVal) {
            if (newVal) {
                this.setDialogContentHeight();
                this.setDialogCenter();
            }
        }   
    },
    mounted() {
        if (this.visible) {
            this.setDialogContentHeight();
            this.setDialogCenter();
        }
    },
    methods: {
        setDialogContentHeight(height) {
            this.$nextTick(() => {
                const $dialog = this.$refs.hongxinDialog.$refs.dialog.querySelector('.el-dialog__body');
                $dialog.style.height = height || this.height ;
            });
        },
        setDialogCenter() {
            const $dialog = this.$refs.hongxinDialog.$refs.dialog;
            if (this.contentCenter) {
                $dialog.style.top = '50%';
                $dialog.style.transform = 'translateY(-50%)';
            }
        },
        zoomDialog() {
            if (this.zoomObj.type === 'default') {
                this.setIcon(false);
                this.setDialogContentHeight('calc(100% - 30px)');
            } else {
                this.setDialogContentHeight();
                this.setIcon(true);
            }
            this.fullscreenControl = !this.fullscreenControl;
            this.$emit('zoomClick',this.zoomObj.type);
        },
        setIcon(fullscreen) {
            if (fullscreen) {
                this.zoomObj.icon = 'hongxin-icon-zoomout1';
                this.zoomObj.type = 'fullScreen';
            } else {
                this.zoomObj.icon = 'hongxin-icon-zoomin1';
                this.zoomObj.type = 'default';
            }
            return this.zoomObj.icon;
        },
        open() {
            //重置窗口
            this.zoomObj.type = 'default';
            this.fullscreenControl = false;
            this.$emit('open');
        },
        opened() {
            this.$emit('opened');
        },
        close() {
            this.$emit('close');
        },
        closed() {
            this.$emit('closed');
        },
    },
};
</script>
<style lang="scss" scoped>
.zoomBtn {
    position: absolute;
    top: 21px;
    right: 50px;
    color: #333;
    cursor: pointer;
    font-size: 13px;
}
.zoomBtn:hover {
    color: #409EFF
}
.showMenu {
    top: 56px;
    left: 56px;
}

/deep/ .el-dialog__headerbtn .el-dialog__close {
    font-family: "hongxinfont" !important;
    color: #333;
}

/deep/ .el-dialog__body>div {
    height: 100%;
}

/deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    .el-dialog__header {
        .el-icon-close:before {
            content: "\e890";
        }
    }
    .el-dialog__body {
        overflow: auto;
        //flex: 1;
    }
    .el-dialog__footer {
        border-top: 1px solid #ddd;
    }
}
</style>


