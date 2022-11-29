<!--
 * @Author: Anonymous-CZ
 * @Date: 2022-11-22 15:25:52
 * @LastEditors: Anonymous-CZ
 * @LastEditTime: 2022-11-23 14:36:00
 * @FilePath: /vue-study/src/views/EchartsView.vue
 * @Description: echarts页面测试
-->
<script >
import ProcessBarEcharts from "@/components/EchartsView/process-bar-echarts.vue";
import ThreeDimmensionHistogramEcharts from "@/components/EchartsView/three-dimension-histogram-echarts.vue";
import LineHistogramEcharts from "@/components/EchartsView/line-histogram-echarts.vue";

export default {
  components: {
    ProcessBarEcharts,
    ThreeDimmensionHistogramEcharts,
    LineHistogramEcharts,
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="echartsStyle backStyle">
    <!-- 进度条 -->
    <div class="process-bar-echarts">
      <process-bar-echarts
        :value="80"
        :maxValue="100"
        :bgOpacity="0.4"
        :startColor="'rgba(255, 162, 62, 1)'"
        :endColor="'rgba(255, 162, 62, 0.63)'"
        :node="6"
        :startNodeColor="'#A9DB52'"
        :endNodeColor="'#69A009'"
        :insideValue="'num-%'"
      ></process-bar-echarts>
    </div>
    <!-- 三维柱状图 -->
    <div class="three-dimension-histogram-echarts">
      <three-dimmension-histogram-echarts></three-dimmension-histogram-echarts>
    </div>
    <!-- 折线+柱状图 -->
    <div class="line-histogram-echarts">
      <line-histogram-echarts></line-histogram-echarts>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.echartsStyle {
  display: grid;
  grid-template-rows: 50px 500px 500px 500px;
  background-color: antiquewhite;
  grid-row-gap: 20px;
  padding-bottom: 5%;

  // 进度条
  .process-bar-echarts {
    height: 28px;
    width: 500px;
  }

  // 三维柱状图
  .three-dimension-histogram-echarts {
    height: 500px;
    width: 800px;
  }

  // 折线+柱状图
  .line-histogram-echarts {
    height: 500px;
    width: 800px;
    background-color: #000B32;
  }
}
</style>
