<template>
    <div class="noData">
        <div class="imgBox"><img src="../../assets/img/noData/tableNoData.png"></div>
        <div class="empty">暂无数据</div>
    </div>
</template>
<style lang="scss" scoped>
    .noData{
        font-size: 14px;
        color: #B3B3B3;
        text-align: center;
        padding: 10px 0;
        .imgBox{
            display:flex;
            img{
                margin: 10px auto 0;
            }
        }
        .empty{
            height: 30px;
            line-height: 30px;
        }
    }
</style>
