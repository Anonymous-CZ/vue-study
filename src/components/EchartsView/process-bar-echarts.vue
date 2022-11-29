<!--
 * @Author: Anonymous-CZ
 * @Date: 2022-11-22 15:30:47
 * @LastEditors: Anonymous-CZ
 * @LastEditTime: 2022-11-23 14:01:21
 * @FilePath: /vue-study/src/components/EchartsView/process-bar-echarts.vue
 * @Description: 进度条组件
-->
<script >
import * as echarts from "echarts";
export default {
  components: {},
  props: {
    // 值
    value: {
      type: Number,
      default: 90,
    },
    // 最大值
    maxValue: {
      type: Number,
      default: 100,
    },
    // 默认颜色
    indexColor: {
      type: Number,
      default: 0,
    },
    // 自定义起始颜色
    startColor: {
      type: String,
      default: "0",
    },
    // 自定义结束颜色
    endColor: {
      type: String,
      default: "0",
    },
    // 节点颜色,超过节点后改变颜色
    node: {
      type: Number,
      default: 0,
    },
    // 自定义节点起始颜色
    startNodeColor: {
      type: String,
      default: "0",
    },
    // 自定义节点结束颜色
    endNodeColor: {
      type: String,
      default: "0",
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "#757F94",
    },
    // 背景颜色透明度
    bgOpacity: {
      type: Number,
      default: 1,
    },
    // 进度条内部文字 默认不显示 num-unit 显示数值-单位 否则直接显示
    insideValue: {
      type: String,
      default: "0",
    },
  },
  setup() {
    // 颜色列表
    const colorList = [
      "rgba(255, 73, 73, 1)",
      "rgba(255, 206, 73, 1)",
      "rgba(73, 180, 255, 1)",
      "rgba(146, 73, 255, 1)",
      "rgba(73, 255, 236, 1)",
      "rgba(223, 255, 73, 1)",
    ];
    const colorListDark = [
      "rgba(255, 73, 73, 0.5)",
      "rgba(255, 206, 73, 0.5)",
      "rgba(73, 180, 255, 0.5)",
      "rgba(146, 73, 255, 0.5)",
      "rgba(73, 255, 236, 0.5)",
      "rgba(223, 255, 73, 0.5)",
    ];

    return { colorList, colorListDark };
  },
  methods: {
    creatCharts() {
      let self = this;
      const container = this.$refs.chartPart;
      const chartPart = echarts.init(container);
      const option = {
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0],
        },
        yAxis: [
          {
            type: "category",
            data: [""],
            axisLine: { show: false },
            axisTick: [
              {
                show: false,
              },
            ],
          },
        ],
        series: [
          {
            name: "数值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color(params) {
                  if (self.startColor !== "0" && self.endColor !== "0") {
                    if (
                      self.node !== 0 &&
                      self.startNodeColor !== "0" &&
                      self.endNodeColor !== "0"
                    ) {
                      if (params.data > self.node) {
                        return new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                          {
                            offset: 1,
                            color: self.startNodeColor,
                          },
                          {
                            offset: 0,
                            color: self.endNodeColor,
                          },
                        ]);
                      }
                      return new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        {
                          offset: 1,
                          color: self.startColor,
                        },
                        {
                          offset: 0,
                          color: self.endColor,
                        },
                      ]);
                    }
                    return new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                      {
                        offset: 1,
                        color: self.startColor,
                      },
                      {
                        offset: 0,
                        color: self.endColor,
                      },
                    ]);
                  }
                  return new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                    {
                      offset: 1,
                      color: self.colorListDark[self.indexColor],
                    },
                    {
                      offset: 0,
                      color: self.colorList[self.indexColor],
                    },
                  ]);
                },
              },
            },
            barWidth: 20,
            label: {
              show: true, // position: "insideTopRight",
              position: "insideLeft",
              color: "#fff",
              formatter(params) {
                if (self.insideValue === "0") {
                  return "";
                } else if (self.insideValue.split("-")[0] === "num") {
                  return params.data + self.insideValue.split("-")[1];
                }
                return self.insideValue;
              },
            },
            data: [Number(self.value)],
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: [Number(self.maxValue)],
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: self.bgColor,
                opacity: 0.4,
              },
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
  <div class="progress-bar-charts" ref="chartPart"></div>
</template>
<style lang="scss" scoped>
.progress-bar-charts {
  height: 100%;
  width: 100%;
}
</style>
