<!--
 * @Author: CZ
 * @Date: 2022-04-21 10:10:30
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-21 17:28:42
 * @Description: 第一个地图demo
 * @FilePath: \vue-study\src\components\MapView\first-view.vue
-->
<script>
// import { ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import apiGetIPInfo from "@/apis/getIP";
export default {
  props: {
    firstMapHeight: String,
  },
  setup(props, context) {
    // console.log("props", props);
    // console.log("context", context.attrs);
    var getIP = () => {
      apiGetIPInfo().then((res) => {
        console.log(
          "%c res:",
          "font-size:13px; background:pink; color:#bf2c9f;",
          res
        );
      });
    };
    const initMap = () => {
      AMapLoader.load({
        key: "5d0f6d15be39f3f60f3d3d3cd1e2b3a9", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.ToolBar", "AMap.Driving", "AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        var map = new AMap.Map("mapId", {
          zoom: 12, //级别
          center: [118.4253323, 31.80452471], //中心点坐标
          viewMode: "3D", //使用3D视图
          mapStyle: "amap://styles/f379bc72684c65ef2f1148c9b5fdaade", //设置地图的显示样式
        });

        // 构造点标记
        var marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [118.4253323, 31.80452471],
        });
        // 构造矢量圆形
        var circle = new AMap.Circle({
          center: new AMap.LngLat("118.4253323", "31.80452471"), // 圆心位置
          radius: 1000, //半径
          strokeColor: "#aafdd0 ", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线粗细度
          fillColor: "#aafdd0", //填充颜色
          fillOpacity: 0.35, //填充透明度
        });

        // 将以上覆盖物添加到地图上
        // 单独将点标记添加到地图上
        // map.add(marker);
        // add方法可以传入一个覆盖物数组，将点标记和矢量圆同时添加到地图上
        map.add([marker, circle]);
      });
    };

    return { props, context, getIP, initMap };
  },
};
</script>

<template>
  <div class="firstMapStyle">
    <button @click="getIP">获取IP位置</button>
    <button @click="initMap">启动地图</button>
    <div id="mapId" :style="{ '--firstMapHeight': firstMapHeight }"></div>
  </div>
</template>
<style lang="scss" scoped>
.firstMapStyle {
  background-color: aqua;
}
#mapId {
  height: var(--firstMapHeight);
}
</style>