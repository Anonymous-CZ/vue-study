<!--
 * @Author: CZ
 * @Date: 2022-04-21 10:10:30
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-24 10:58:33
 * @Description: 第一个地图demo
 * @FilePath: \vue-study\src\components\MapView\first-view.vue
-->
<script>
// import { ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
import apiGetIPInfo from "@/apis/getIP";
export default {
  props: {
    firstMapHeight: String,
  },
  setup(props, context) {
    // Vue3需要浅层监听防止与proxy冲突
    var map = shallowRef(null);
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
    var Satellite;
    const initMap = () => {
      AMapLoader.load({
        key: "5d0f6d15be39f3f60f3d3d3cd1e2b3a9", // 申请好的Web端开发者Key，首次调用 load 时必填
        // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.ToolBar", "AMap.Driving", "AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        map = new AMap.Map("mapId", {
          // mapStyle: "amap://styles/f379bc72684c65ef2f1148c9b5fdaade", //设置地图的显示样式
          viewMode: "2D", //使用3D视图
          zoom: 11, //级别
          center: [118.794792, 32.039065], //中心点坐标
          terrain: true, // 开启地形图
          // pitch: 60,
          // layers: [
          //   // 高德默认标准图层
          //   new AMap.TileLayer.Satellite(),
          //   // 楼块图层
          //   new AMap.Buildings({
          //     zooms: [16, 18],
          //     zIndex: 10,
          //     heightFactor: 2, //2倍于默认高度，3D下有效
          //   }),
          // ],
        });
        // // 构造点标记
        // var marker = new AMap.Marker({
        //   icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        //   position: [118.7947923, 32.0390671],
        // });
        // // 构造矢量圆形
        // var circle = new AMap.Circle({
        //   center: new AMap.LngLat("118.7947923", "32.0390671"), // 圆心位置
        //   radius: 1000, //半径
        //   strokeColor: "#aafdd0 ", //线颜色
        //   strokeOpacity: 1, //线透明度
        //   strokeWeight: 3, //线粗细度
        //   fillColor: "#aafdd0", //填充颜色
        //   fillOpacity: 0.35, //填充透明度
        // });
        // map.add([marker, circle]);
        Satellite = new AMap.TileLayer.Satellite();
        var DistrictLayer = new AMap.DistrictLayer({
          depth: 2,
          adcode: ["320104"],
          styles: {
            fill: "rgba(215, 155, 155, 0.5)",
            "province-stroke": "cornflowerblue",
            "city-stroke": "white", // 中国地级市边界
            "county-stroke": "rgba(255,255,255,0.5)", // 中国区县边界
          },
        });
        map.addLayer(DistrictLayer);
      });
    };

    var bool = true;
    var setSatellite = () => {
      if (bool) {
        map.add(Satellite);
        bool = false;
      } else {
        map.remove(Satellite);
        bool = true;
      }
    };
    return { props, context, getIP, map, initMap, setSatellite, Satellite };
  },
};
</script>

<template>
  <div class="firstMapStyle">
    <button @click="getIP">获取IP位置</button>
    <button @click="initMap">启动地图</button>
    <button @click="setSatellite">卫星图层</button>
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