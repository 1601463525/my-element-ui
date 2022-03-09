<template>
    <div class="echarts-manage">
        <div class="title">
            <div class="normal">
                <div></div>
                <div>正常</div>
            </div>
            <div class="warning">
                <div></div>
                <div>预警</div>
            </div>
        </div>
        <div ref="chart" style="width: 100%;height: 400px"></div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { ACCOUNT, GET_ACCOUNT_INFO } from './vuex.js';
import echarts from 'echarts';

export default {
    props: {
        xData: {
            type: Array,
            default: () => []
        },
        yData: {
            type: Array,
            default: () => []
        },
        rulesLoading: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            chart: null,
            erveyData: 0,
        };
    },
    created() {
 
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {
        this.chart.clear();
    },
    watch: {
        xData: {
            deep:true,
            handler(newValue,oldValue){
                
                this.chart.setOption({
                    xAxis: {
                        data: newValue || []
                    }
                });
            }
        },
        yData: {
            deep:true,
            handler(newValue,oldValue){
                const count = this.yData.reduce((prev, next, index, array) => prev + next);
                const erveyData = count / this.yData.length;
                this.chart.setOption({
                    series: {
                        data: newValue || [],
                        itemStyle: {
                            normal: {
                                // 定制显示（按顺序）
                                color: function(params) {
                                    let color = '';
                                    if (params.data > erveyData) {
                                        color = 'rgba(245, 35, 35, 0.85)';
                                    } else {
                                        color = '#78BBFF';
                                    }
                                    return color;
                                }
                            }
                        },
                    }
                });
            }
        },
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.chart);
            const option = {
                color: ['#78BBFF'],
                title: {
                    left: 40,
                    textStyle: {
                        color: '#333333',
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '分摊结果： <br/>{b} : {c}'
                },
                legend: {
                    left: 10
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        show: true,
                    },
                    //   axisLine: {
                    //     lineStyle: {
                    //       color: "#B8B8B8"
                    //     }
                    //   },
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.xData
                },
                yAxis: {
                    name: '',
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontWeight: 'bold',
                    }
                },
                dataZoom : [
                    {
                        type: 'slider',
                        show: true,
                    },
                ],
                series: [
                    {
                        data: this.yData,
                        type: 'bar',
                        cursor: 'default',
                        smooth: true,
                        barWidth: '20',
                       
                        label: {
                            show: true,
                            position: 'top',
                            fontSize: '14px',
                        },
                        markLine: {
                            /*以下设置一行后，平均线就没有开始和结束标记了（即看不见箭头了）*/
                            symbol: 'none',
                            data: [
                                {
                                    name: '平均线',
                                    // 支持 'average', 'min', 'max'
                                    type: 'average',
                                    lineStyle: {
                                        normal: {
                                            color: 'rgba(245, 35, 35, 0.85)',
                                            width: 2,
                                            type: 'solid'
                                        }
                                    },
                                    label: {
                                        position: 'center',
                                        formatter: function (val) {
                                            return '阈值：' + val.data.value;
                                        }
                                    }
                                }
                            ]
                        },
                        
                    }
                ]
            };
            this.chart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped>
.echarts-manage {
  .title {
      display: flex;
      justify-content: flex-end;
      margin-right: 50px;
      .normal {
          display: flex;
          margin: 20px;
          div:first-child {
              width: 30px;
              height: 20px;
              background: #78BBFF;
              margin-right: 10px;
              border-radius: 2px;
          }
      }
      .warning {
          display: flex;
           margin: 20px;
          div:first-child {
              width: 30px;
              height: 20px;
              background: rgba(245, 35, 35, 0.85);
              margin-right: 10px;
              border-radius: 2px;
          }
      }
  }
}
</style>


