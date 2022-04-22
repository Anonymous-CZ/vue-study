<!--
 * @Author: CZ
 * @Date: 2022-04-21 10:10:30
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-22 16:56:32
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
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.ToolBar", "AMap.Driving", "AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        map = new AMap.Map("mapId", {
          // mapStyle: "amap://styles/f379bc72684c65ef2f1148c9b5fdaade", //设置地图的显示样式
          viewMode: "3D", //使用3D视图
          zoom: 12, //级别
          center: [118.4253323, 31.80452471], //中心点坐标
          terrain: true, // 开启地形图
          pitch: 60,
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
        map.add([marker, circle]);
        Satellite = new AMap.TileLayer.Satellite();
        var DistrictLayer = new AMap.DistrictLayer({
          heightFactor: 2,
          styles: {
            fill: function (properties) {
              // properties为可用于做样式映射的字段，包含
              // NAME_CHN:中文名称
              // adcode_pro
              // adcode_cit
              // adcode
              var adcode = properties.adcode;
              return getColorByAdcode(adcode);
            },
            "province-stroke": "cornflowerblue",
            "city-stroke": "white", // 中国地级市边界
            "county-stroke": "rgba(255,255,255,0.5)", // 中国区县边界
          },
        });
        map.addLayer(DistrictLayer);
      });
    };
    // 颜色辅助方法
    var colors = {};
    var getColorByAdcode = function (adcode) {
      if (!colors[adcode]) {
        var gb = Math.random() * 155 + 50;
        colors[adcode] = "rgb(" + gb + "," + gb + ",255)";
      }

      return colors[adcode];
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