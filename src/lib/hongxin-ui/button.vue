<template>
    <el-button 
        :size="size" 
        :type="type"
        :plain="plain" 
        :round="round" 
        :circle="circle" 
        :loading="loading" 
        :disabled="disabled" 
        :icon="icon" 
        :autofocus="autofocus"
        :native-type="nativeType"
        :class="className"
        @click="click"
    >
        <slot></slot>
        <!-- {{ btnName }} -->
    </el-button>
</template>

<script>
import { Button } from 'element-ui';
const buttonProps = { ...Button.props };
export default {
    components: {
        'el-button': Button,
    },
    props:{
        ...buttonProps,
        className: {  //class
            type: String,
            default: ''
        },
    },
    methods: {
        click() {
            this.$emit('click');
        }
    },
};
</script>
<style lang="scss" scoped>
    .el-button--cancel {
        color: #fff;
        background-color: #C3CCDF;
        border-color: #C3CCDF;
        &:hover,&:focus{
            color: #fff;
            background-color: #D1DAF0;
            border-color: #D1DAF0;
        }
    }
    .el-button--sure, .el-button--return {
        color: #fff;
        background-color: #6D94E9;
        border-color: #6D94E9;
        &:hover,&:focus{
            color: #fff;
            background: #7FA8FF;
            border-color: #7FA8FF;
        }
    }
    .el-button--small, .el-button--small.is-round {
        padding: 7px 15px;
    }
</style>


