<!--
 * @Author: Anonymous-CZ
 * @Date: 2022-11-23 13:43:00
 * @LastEditors: Anonymous-CZ
 * @LastEditTime: 2022-11-23 15:21:36
 * @FilePath: /vue-study/src/components/EchartsView/line-histogram-echarts.vue
 * @Description: 折线+柱状图
-->

<script>
import * as echarts from "echarts";
export default {
  components: {},
  props: {
    dataList: {
      type: Array,
      default: () => [
        {
          name: "扬子津街道",
          value1: 10,
          value2: 23,
        },
        {
          name: "文汇街道",
          value1: -13,
          value2: -23,
        },
        {
          name: "施桥镇",
          value1: 35,
          value2: 20,
        },
        {
          name: "八里镇",
          value1: 17,
          value2: 18,
        },
        {
          name: "朴席镇",
          value1: 18,
          value2: 19,
        },
      ],
    },
    // 折线颜色
    lineColorIndex: {
      type: Number,
      default: 0,
    },
    // 柱状图颜色
    barColorIndex: {
      type: Number,
      default: 1,
    },
    // 横线值
    markLineValue: {
      type: Number,
      default: 19.57,
    },
  },
  setup() {
    var xUnit = "%",
      xUnit1 = "个";
    return { xUnit, xUnit1 };
  },
  methods: {
    creatCharts() {
      const self = this;
      const container = this.$refs.chartPart;
      const chartPart = echarts.init(container);
      const bgColor = "#fff00000";
      const color = [
        "#0090FF",
        "#36CE9E",
        "#FFC005",
        "#FF515A",
        "#8B5CFF",
        "#00CA69",
      ];
      const echartData = this.dataList;
      const xAxisData = echartData.map((v) => v.name);
      const yAxisData1 = echartData.map((v) => v.value1);
      const yAxisData2 = echartData.map((v) => v.value2);
      const hexToRgba = (hex, opacity) => {
        let rgbaColor = "";
        const reg = /^#[\da-f]{6}$/i;
        const hex1 = hex.slice(1, 3);
        const hex2 = hex.slice(3, 5);
        const hex3 = hex.slice(5, 7);
        if (reg.test(hex)) {
          rgbaColor = `rgba(${parseInt(`0x${hex1}`, 16)},${parseInt(
            `0x${hex2}`,
            16
          )},${parseInt(`0x${hex3}`, 16)},${opacity})`;
        }
        return rgbaColor;
      };
      const option = {
        backgroundColor: bgColor,
        legend: {
          show: true,
          right: "center",
          top: 10,
          textStyle: {
            color: "#EAF0F3",
          },
          data: [
            {
              name: "增幅",
              itemStyle: {
                color: hexToRgba(color[self.lineColorIndex], 1),
              },
            },
            {
              name: "完成数",
              itemStyle: {
                color: hexToRgba(color[self.barColorIndex], 1),
              },
            },
          ],
        },
        tooltip: {
          trigger: "axis",
          formatter(params) {
            if (params.length > 1) {
              return (
                `${params[0].name}<br/>` +
                `<span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${
                  color[self.lineColorIndex]
                };'></span>` +
                `<span>${params[0].value}</span>${self.xUnit}<br/>` +
                `<span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${
                  color[self.barColorIndex]
                };'></span>` +
                `<span>${params[1].value}</span>${self.xUnit1}<br/>`
              );
            }
            let index = 0;
            let unit = "%";
            if (params[0].componentSubType === "line") {
              index = self.lineColorIndex;
              unit = self.xUnit;
            } else {
              index = self.barColorIndex;
              unit = self.xUnit1;
            }
            return (
              `${params[0].name}<br/>` +
              `<span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color[index]};'></span>` +
              `<span>${params[0].value}</span>${unit}<br/>`
            );
          },
          backgroundColor: "rgba(0,0,0,0.7)",
          borderWidth: 0,
          textStyle: {
            color: "#ffffff",
          },
        },
        grid: {
          top: 60,
          bottom: 20,
          left: 20,
          right: 20,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#EAF0F3",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#D9D9D9",
                opacity: 0.5,
              },
            },
            axisTick: {
              // x轴刻度线
              show: false,
            },
            data: xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "增幅：(%)",
            axisLabel: {
              formatter: "{value}%",
              textStyle: {
                color: "#EAF0F3",
              },
            },
            nameTextStyle: {
              color: "#EAF0F3",
              fontSize: 12,
              lineHeight: 40,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#E9E9E9",
                opacity: 0.2,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "增幅",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
              normal: {
                color: color[self.lineColorIndex],
                shadowBlur: 3,
                shadowColor: hexToRgba(color[self.lineColorIndex], 0.5),
                shadowOffsetY: 8,
              },
            },
            markLine: {
              lineStyle: {
                color: "#FFAC5A",
                width: 1,
                type: "dashed",
              },
              symbol: "none",
              label: {
                position: "insideEndTop",
                formatter: `${self.markLineValue}`,
                fontSize: 14,
                color: "#FFAC5A",
              },
              data: [
                {
                  name: `${self.markLineValue}`,
                  yAxis: self.markLineValue,
                },
              ],
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: hexToRgba(color[self.lineColorIndex], 0.3),
                    },
                    {
                      offset: 1,
                      color: hexToRgba(color[self.lineColorIndex], 0.1),
                    },
                  ],
                  false
                ),
                shadowColor: hexToRgba(color[self.lineColorIndex], 0.1),
                shadowBlur: 10,
              },
            },
            data: yAxisData1,
          },
          {
            name: "完成数",
            type: "bar",
            barWidth: 20,
            data: yAxisData2,
            markLine: {
              lineStyle: {
                color: "#FFAC5A",
                width: 1,
                type: "dashed",
              },
              symbol: "none",
              label: {
                position: "insideEndTop",
                formatter: `${self.markLineValue}`,
                fontSize: 14,
                color: "#FFAC5A",
              },
              data: [
                {
                  name: `${self.markLineValue}`,
                  yAxis: self.markLineValue,
                },
              ],
            },
            itemStyle: {
              color(params) {
                if (params.data > 0) {
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: hexToRgba(color[self.barColorIndex], 1),
                      },
                      {
                        offset: 1,
                        color: hexToRgba(color[self.barColorIndex], 0.3),
                      },
                    ],
                    false
                  );
                }
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 1,
                      color: hexToRgba(color[self.barColorIndex], 1),
                    },
                    {
                      offset: 0,
                      color: hexToRgba(color[self.barColorIndex], 0.3),
                    },
                  ],
                  false
                );
              },
              shadowColor: hexToRgba(color[self.barColorIndex], 0.1),
              shadowBlur: 10,
              borderRadius: [0, 0, 0, 0],
            },
            label: {
              show: false,
              position: "top",
              fontSize: 36,
              fontWeight: 400,
              color: hexToRgba(color[self.barColorIndex], 1),
            },
          },
        ],
      };
      chartPart.setOption(option);
    },
  },
  mounted() {
    this.creatCharts();
  },
};
</script>
<template>
  <div class="line-histogram-echarts" ref="chartPart"></div>
</template>
<style lang="scss" scoped>
.line-histogram-echarts {
  height: 100%;
  width: 100%;
}
</style>