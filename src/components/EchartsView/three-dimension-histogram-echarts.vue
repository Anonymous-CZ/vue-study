<!--
 * @Author: Anonymous-CZ
 * @Date: 2022-11-22 20:15:04
 * @LastEditors: Anonymous-CZ
 * @LastEditTime: 2022-11-23 09:02:49
 * @FilePath: /vue-study/src/components/EchartsView/three-dimension-histogram-echarts.vue
 * @Description: 三维柱状图
-->
<script >
import * as echarts from "echarts";
export default {
  components: {},
  props: {
    // 最大值列表
    maxList: {
      type: Array,
      default: () => [
        6000, 6000, 6000, 6000, 6000, 5000, 4000, 3000, 2000, 4000, 3000, 2000,
      ],
    },
    // 值列表
    valueList: {
      type: Array,
      default: () => [
        2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654,
      ],
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
      // let self = this;
      const container = this.$refs.chartPart;
      const chartPart = echarts.init(container);
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: (ctx, shape) => {
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y];
          const c1 = [shape.x - 9, shape.y - 9];
          const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: (ctx, shape) => {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y];
          const c2 = [xAxisPoint[0], xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
          const c4 = [shape.x + 18, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: (ctx, shape) => {
          const c1 = [shape.x, shape.y];
          const c2 = [shape.x + 18, shape.y - 9];
          const c3 = [shape.x + 9, shape.y - 18];
          const c4 = [shape.x - 9, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);
      const MAX = this.maxList;
      const VALUE = this.valueList;
      const option = {
        backgroundColor: "#010d3a",
        title: {
          text: "",
          top: 32,
          left: 18,
          textStyle: {
            color: "#00F6FF",
            fontSize: 24,
          },
        },
        grid: {
          left: 20,
          right: 40,
          bottom: "19%",
          top: 107,
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
          data: [
            "德州",
            "德城区",
            "陵城区",
            "禹城市",
            "乐陵市",
            "临邑县",
            "平原县",
            "夏津县",
            "武城县",
            "庆云县",
            "宁津县",
            "齐河县",
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: "white",
            },
          },
          offset: 20,
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: "#7DFFFD",
            },
          },
          axisLabel: {
            fontSize: 10,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 16,
          },
          boundaryGap: ["20%", "20%"],
        },
        series: [
          {
            type: "custom",
            renderItem: function (params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(7,29,97,.6)",
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(10,35,108,.7)",
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(11,42,106,.8)",
                    },
                  },
                ],
              };
            },
            data: MAX,
          },
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2",
                        },
                        {
                          offset: 1,
                          color: "#49BEE5",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2",
                        },
                        {
                          offset: 1,
                          color: "#49BEE5",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2",
                        },
                        {
                          offset: 1,
                          color: "#49BEE5",
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: VALUE,
          },
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: (e) => {
                  switch (e.name) {
                    case "10kV线路":
                      return VALUE[0];
                    case "公用配变":
                      return VALUE[1];
                    case "35kV主变":
                      return VALUE[2];
                    case "水":
                  }
                },
                fontSize: 16,
                color: "#fff",
                offset: [4, -25],
              },
            },
            itemStyle: {
              color: "transparent",
            },
            data: MAX,
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
  <div class="three-dimension-histogram-echarts" ref="chartPart"></div>
</template>
<style lang="scss" scoped>
.three-dimension-histogram-echarts {
  height: 100%;
  width: 100%;
}
</style>
