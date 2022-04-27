<!--
 * @Author: CZ
 * @Date: 2022-04-24 08:48:40
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-27 11:55:37
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
          AMap.plugin(
            [
              "AMap.ToolBar",
              "AMap.Scale",
              "AMap.OverView",
              "AMap.MapType",
              "AMap.Geolocation",
            ],
            function () {
              // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
              self.map.addControl(new AMap.ToolBar());

              // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
              self.map.addControl(new AMap.Scale());

              // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
              self.map.addControl(new AMap.OverView({ isOpen: true }));

              // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
              self.map.addControl(new AMap.MapType());

              // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
              self.map.addControl(new AMap.Geolocation());
            }
          );
          //加载天气查询插件
          AMap.plugin("AMap.Weather", function () {
            //创建天气查询实例
            var weather = new AMap.Weather();

            //执行实时天气信息查询
            weather.getLive("320104", function (err, data) {
              console.log("天气情况：", data);
            });
            //执行天气预报信息查询
            weather.getForecast("320104", function (err, data) {
              console.log("天气预报：", data);
            });
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

        // 折线的节点坐标数组，每个元素为 AMap.LngLat 对象
        var path = [
          new AMap.LngLat(118.84112392057455, 31.984711744367075),
          new AMap.LngLat(118.84124414476307, 31.984830483919296),
          new AMap.LngLat(116.387271, 39.912501),
          new AMap.LngLat(116.388258, 39.904689),
        ];

        // 创建折线实例
        var Polygon = new AMap.Polygon({
          path: path,
          borderWeight: 1, // 线条宽度，默认为 1
          strokeColor: "red", // 线条颜色
          lineJoin: "round", // 折线拐点连接处样式
        });

        // 添加至地图实例
        self.map.add(Polygon);

        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          var color = "rgba(32,90,250,0.8)";
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 10000, //3d侧边的高度
            color: color,
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
    /**
     * @description: 溧水区
     * @author: CZ
     * @param {*} district
     * @param {*} object3Dlayer
     * @param {*} AMap
     */
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
  <div class="fill-color"></div>
</template>
<style lang="scss" scoped>
.administrative-division {
  background-color: rgb(93, 170, 170);
  grid-row-start: 2;
  grid-row-end: 4;
}
#administrative-division-container {
  height: 1000px;
}
.fill-color {
  background-color: bisque;
}
</style>