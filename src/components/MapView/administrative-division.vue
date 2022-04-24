<!--
 * @Author: CZ
 * @Date: 2022-04-24 08:48:40
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-24 16:45:06
 * @Description: 
 * @FilePath: \vue-study\src\components\MapView\administrative-division.vue
-->
<script>
// import { ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
export default {
  setup() {
    const map = shallowRef(null);
    var textQH, textJN;
    return {
      map,
      textQH,
      textJN,
    };
  },
  methods: {
    ininMap() {
      AMapLoader.load({
        key: "5d0f6d15be39f3f60f3d3d3cd1e2b3a9",
        version: "1.4.15",
      })
        .then((AMap) => {
          let self = this;
          self.map = new AMap.Map("administrative-division-container", {
            viewMode: "3D",
            pitch: 60, // 地图俯仰角度
            zoom: 11,
            expandZoomRange: true, //支持开启最大缩放级别20
            rotateEnable: true, //开启鼠标右键改变视角
            mapStyle: "amap://styles/f379bc72684c65ef2f1148c9b5fdaade",
          });
          // 光照
          self.map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
          // 平行光源
          self.map.DirectionLight = new AMap.Lights.DirectionLight(
            [0, 0, 1],
            [1, 1, 1],
            0.5
          );
          // 添加Object3DLayer  承载 Object3D对象的图层
          var object3Dlayer = new AMap.Object3DLayer();
          self.map.add(object3Dlayer);

          AMap.plugin("AMap.DistrictSearch", function () {
            // 创建行政区查询对象
            var district = new AMap.DistrictSearch({
              // 返回行政区边界坐标等具体信息
              extensions: "all",
              // 设置查询行政区级别为 区
              level: "district",
              showbiz: false,
            });
            // 秦淮区
            self.addQinHuai(district, object3Dlayer, AMap);
            // 溧水区
            self.addLiShui(district, object3Dlayer, AMap);
            // 江宁区
            self.addJiangNing(district, object3Dlayer, AMap);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addQinHuai(district, object3Dlayer, AMap) {
      let self = this;
      district.search("320104", function (status, result) {
        var lng = result.districtList[0].center.lng;
        var lat = result.districtList[0].center.lat;
        self.textQH = new AMap.Text({
          text:
            result.districtList[0].name +
            "</br>(" +
            result.districtList[0].adcode +
            ")",
          verticalAlign: "bottom",
          position: [lng, lat],
          height: 5000,
          zooms: [11, 20],
          style: {
            "background-color": "transparent",
            "text-align": "center",
            border: "none",
            color: "white",
            "font-size": "24px",
            "font-weight": 600,
          },
        });
        self.map.add(self.textQH);
        // 边界信息
        var bounds = result.districtList[0].boundaries;
        var polygons = [];
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              map: self.map,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.7,
              fillColor: "#CCF3FF",
              strokeColor: "#CC66CC",
            });
            polygons.push(polygon);
          }
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 10000, //3d侧边的高度
            color: "#0088ffcc",
          });
          // 开启透明度支持
          prism.transparent = true;
          object3Dlayer.add(prism);
        }
      });
    },
    /**
     * @description: 江宁区
     * @author: CZ
     * @param {*} district
     * @param {*} object3Dlayer
     * @param {*} AMap
     */
    addJiangNing(district, object3Dlayer, AMap) {
      let self = this;
      district.search("320115", function (status, result) {
        var lng = result.districtList[0].center.lng;
        var lat = result.districtList[0].center.lat;
        self.textJN = new AMap.Text({
          text:
            result.districtList[0].name +
            "</br>(" +
            result.districtList[0].adcode +
            ")",
          verticalAlign: "bottom",
          position: [lng, lat],
          height: 5000,
          style: {
            "background-color": "transparent",
            "text-align": "center",
            border: "none",
            color: "white",
            "font-size": "24px",
            "font-weight": 600,
          },
        });

        self.map.add(self.textJN);
        // 边界信息
        var bounds = result.districtList[0].boundaries;
        var polygons = [];
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              map: self.map,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.1,
              fillColor: "#ffffffcc",
              strokeColor: "#CA06CC",
            });
            polygons.push(polygon);
          }
          var color = "#9088ffcc";
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 5000, //3d侧边的高度
            color: color,
          });
          // 开启透明度支持
          prism.transparent = true;
          object3Dlayer.add(prism);
          // 地图自适应
        }
      });
    },
    addLiShui(district, object3Dlayer, AMap) {
      let self = this;
      district.search("320117", function (status, result) {
        var lng = result.districtList[0].center.lng;
        var lat = result.districtList[0].center.lat;
        var text = new AMap.Text({
          text:
            result.districtList[0].name +
            "</br>(" +
            result.districtList[0].adcode +
            ")",
          verticalAlign: "bottom",
          position: [lng, lat],
          height: 5000,
          style: {
            "background-color": "transparent",
            "text-align": "center",
            border: "none",
            color: "white",
            "font-size": "24px",
            "font-weight": 600,
          },
        });
        self.map.add(text);
        // 边界信息
        var bounds = result.districtList[0].boundaries;
        var polygons = [];
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              map: self.map,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.7,
              fillColor: "#CCa3FF",
              strokeColor: "#CC66CC",
            });
            polygons.push(polygon);
          }
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 5000, //3d侧边的高度
            color: "#F7E93da6",
          });
          // 开启透明度支持
          prism.transparent = true;
          object3Dlayer.add(prism);
          // 地图自适应
        }
      });
    },
    fitViewQinHuai() {
      let self = this;
      self.map.setFitView([self.textQH, self.textJN]);
    },
    fitView() {
      let self = this;
      self.map.setFitView();
    },
  },
  mounted() {
    this.ininMap();
  },
};
</script>

<template>
  <div class="administrative-division">
    <button @click="fitViewQinHuai()">自适应秦淮覆盖物</button>
    <button @click="fitView()">自适应所有覆盖物</button>
    <div id="administrative-division-container"></div>
  </div>
</template>
<style lang="scss" scoped>
.administrative-division {
  background-color: rgb(93, 170, 170);
}
#administrative-division-container {
  height: 1000px;
}
</style>