<template>
    <div class="s-canvas">
        <canvas id="s-canvas" :style="{marginLeft:marginLeft}" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>
<script>
export default {
    name: 'SIdentify',
    data() {
        return {
            identifyCode: 'swef',
            marginLeft:''
        };
    },
    computed: {
        scale: function () {
            const a = window.devicePixelRatio*50/100;
            return a;     
        },
        fontSizeMin: function () {
            return 40*this.scale;
        },
        fontSizeMax: function () {
            return this.scale*60;
        },
        backgroundColorMin: function () {
            return 180;
        },
        backgroundColorMax: function () {
            return 240;
        },
        colorMin: function () {
            return 50;
        },
        colorMax: function () {
            return 160;
        },
        lineColorMin: function () {
            return this.scale*40;
        },
        lineColorMax: function () {
            return 180;
        },
        dotColorMin: function () {
            return 0;
        },
        dotColorMax: function () {
            return 255;
        },
        contentWidth: function () {
            return this.scale*169;
        },
        contentHeight: function () {
            return this.scale*73;
        },
    },
    watch: {
        identifyCode() {
            this.drawPic();
        },
    },
    mounted() {
        this.marginLeft = (104 - 80)/2*this.scale*10+'px';
        this.drawPic();
    },
    methods: {
        // 生成一个随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        // 生成一个随机的颜色
        randomColor(min, max) {
            const r = this.randomNum(min, max);
            const g = this.randomNum(min, max);
            const b = this.randomNum(min, max);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        drawPic() {
            const canvas = document.getElementById('s-canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            // 绘制背景
            ctx.fillStyle = this.randomColor(
                this.backgroundColorMin,
                this.backgroundColorMax
            );
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
            // 绘制文字
            for (let i = 0; i < this.identifyCode.length; i++) {
                this.drawText(ctx, this.identifyCode[i], i);
            }
            // this.drawLine(ctx);
            // this.drawDot(ctx);
        },
        drawText(ctx, txt, i) {
            ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
            const font = this.randomNum(this.fontSizeMin, this.fontSizeMax);
            ctx.font = font + 'px SimHei';

            ctx.font =
                this.randomNum(this.fontSizeMin, this.fontSizeMax) +
                'px SimHei';
            let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
            const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
            if (i === 3) {
                if (font + x > this.contentWidth) {
                    x = this.contentWidth - font;
                }
            }
            const deg = this.randomNum(-45, 45);
            // 修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        },
        drawLine(ctx) {
            // 绘制干扰线
            for (let i = 0; i < 3; i++) {
                ctx.strokeStyle = this.randomColor(
                    this.lineColorMin,
                    this.lineColorMax
                );
                ctx.beginPath();
                ctx.moveTo(
                    this.randomNum(0, this.contentWidth),
                    this.randomNum(0, this.contentHeight)
                );
                ctx.lineTo(
                    this.randomNum(0, this.contentWidth),
                    this.randomNum(0, this.contentHeight)
                );
                ctx.stroke();
            }
        },
        drawDot(ctx) {
            // 绘制干扰点
            for (let i = 0; i < 100; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(
                    this.randomNum(0, this.contentWidth),
                    this.randomNum(0, this.contentHeight),
                    1,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        },
        setCode() {
            const nums = [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z',
            ];
            let str = '';
            for (let i = 0; i < 4; i++) {
                str += nums[Math.floor(Math.random() * nums.length)];
            }
            this.identifyCode = str;
            return str;
        },
    },
};
</script>
<style lang="scss" scoped>
.s-canvas {
    height: 104px;
    margin-top: 1px;
    width:184px;
    font-size: 0px;
    canvas {
        // margin-top: 1px;
        // margin-left: 8px;
    }
}
</style>
