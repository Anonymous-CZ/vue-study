<!--
 * @Author: CZ
 * @Date: 2022-04-24 08:48:40
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-28 16:11:59
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
              "ElasticMarker",
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
          var object3Dlayer = new AMap.Object3DLayer({
            zIndex: 110,
            opacity: 1,
          });
          self.map.add(object3Dlayer);

          AMap.plugin("AMap.DistrictSearch", function () {
            // 创建行政区查询对象
            var district = new AMap.DistrictSearch({
              // 返回行政区边界坐标等具体信息
              extensions: "all",
              // 设置查询行政区级别为 区
              level: "district",
              showbiz: false,
              setSubdistrict: 2,
            });
            // 秦淮区
            self.addQinHuai(district, object3Dlayer, AMap);
            // 溧水区
            self.addLiShui(district, object3Dlayer, AMap);

            // 江宁区
            self.addJiangNing(district, object3Dlayer, AMap);
            // 雨花台区
            self.addYuHuaTai(district, object3Dlayer, AMap);
            // 玄武区
            self.addXuanWu(district, object3Dlayer, AMap);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addXuanWu(district, object3Dlayer, AMap) {
      let self = this;
      district.search("320102", function (status, result) {
        var lng = result.districtList[0].center.lng;
        var lat = result.districtList[0].center.lat;
        self.textQH = new AMap.Text({
          text:
            result.districtList[0].name +
            "</br>(" +
            result.districtList[0].adcode +
            ")", //标记显示的文本内容
          position: [lng, lat], //位置
          ancher: "center", //文本标记锚点'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
          // offset: Pixel(0, 0), //点标记显示位置偏移量
          topWhenClick: true, //鼠标点击时置顶
          bubble: true, //将覆盖物的鼠标或touch等事件冒泡到地图上
          draggable: true, //是否可拖动
          raiseOnDrag: true, //拖动标记的动画效果
          cursor: "", //鼠标悬停时样式
          visible: true, //点标记是否可见
          zIndex: 100, //默认值100
          angle: 0, //点标记的旋转角度
          autoRotaion: false, //是否自动旋转点标记
          // animation: "AMAP_ANIMATION_BOUNCE",//动画效果
          // shadow: Icon,//点标记阴影
          title: "这是一个文字提示", //鼠标滑过时的文字提示
          clickable: true, //点标记是否可点击
          verticalAlign: "bottom",
          height: 8000, //高度
          zooms: [11, 20], //在什么层级内显示
          style: {
            //样式
            "background-color": "transparent",
            "text-align": "center",
            border: "none",
            color: "white",
            "font-size": "24px",
            "font-weight": 600,
          },
        });
        self.map.add(self.textQH);
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          var color = "rgba(2,130,250,0.8)";
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 7000, //3d侧边的高度
            color: color,
          });
          // 开启透明度支持
          prism.transparent = true;
          object3Dlayer.add(prism);
        }
        var zoomStyleMapping1 = {
          14: 0,
          15: 0,
          16: 1,
          17: 1,
          18: 1,
          19: 1,
          20: 1,
        };
        var elasticMarker = new AMap.ElasticMarker({
          position: [lng, lat], // 基点位置
          styles: [
            {
              clickable: true, //设置是否可点击
              draggable: true, //设置是否可拖动
              icon: {
                img: "https://picsum.photos/100/100?random=2",
                size: [32, 32], //可见区域的大小
                ancher: [0, 0], //锚点
                fitZoom: 14, //最合适的级别
                scaleFactor: 2, //地图放大一级的缩放比例系数
                maxScale: 2, //最大放大比例
                minScale: 1, //最小放大比例
              },
              label: {
                content: "name",
                offset: [-35, 0],
                position: "BM",
                minZoom: 15,
              },
            },
            {
              clickable: true, //设置是否可点击
              draggable: true, //设置是否可拖动
              icon: {
                img: "https://picsum.photos/100/100?random=3",
                size: [64, 64],
                ancher: [0, 0], //锚点，图标原始大小下锚点所处的位置，相对左上角
                fitZoom: 17.5, //显示原始大小的级别
                scaleFactor: 2, //地图放大一级的缩放比例系数
                maxScale: 2, //最大放大比例
                minScale: 0.125, //最小放大比例
              },
              label: {
                content: "name2",
                position: "BM",
                offset: [-15, 0], //相对于position的偏移量
                //BL、BM、BR、ML、MR、TL、TM、TR分别代表左下角、底部中央、右下角、
                //左侧中央、右侧中央、左上角、顶部中央、右上角。
                //缺省时代表相对图标的锚点位置
                minZoom: 1, //label的最小显示级别
              },
            },
          ],
          zoomStyleMapping: zoomStyleMapping1,
        });
        self.map.add(elasticMarker);
      });
    },
    addYuHuaTai(district, object3Dlayer, AMap) {
      let self = this;
      district.search("320114", function (status, result) {
        var lng = result.districtList[0].center.lng;
        var lat = result.districtList[0].center.lat;
        // 创建文本
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
        // 创建 AMap.Icon 实例：
        var icon = new AMap.Icon({
          size: new AMap.Size(50, 50), // 图标尺寸
          image: "https://picsum.photos/100/100?random=1", // Icon的图像
          // imageOffset: new AMap.Pixel(0, -50), // 图像相对展示区域的偏移量，适于雪碧图等
          imageSize: new AMap.Size(50, 50), // 根据所设置的大小拉伸或压缩图片
        });
        // 创建Mark点 将Icon添加到实例上
        var marker = new AMap.Marker({
          position: [lng, lat], // 基点位置
          offset: new AMap.Pixel(-25, -25), // 相对于基点的偏移位置
          zooms: [11, 20],
          icon: icon, // 添加 Icon 实例
          maxScale: 0.5, //最大放大比例
          minScale: 0.5, //最小放大比例
        });
        self.map.add(marker);
        // 创建3D
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          var color = "rgba(2,230,250,0.8)";
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 8000, //3d侧边的高度
            color: color,
          });
          // 开启透明度支持
          prism.transparent = true;
          object3Dlayer.add(prism);
        }
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
          zooms: [11, 20],
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
          zooms: [11, 20],
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
        if (bounds) {
          var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: 5000, //3d侧边的高度
            color: "#F7E93da6",
          });
          // 开启透明度支持
          prism.transparent = true;
          object3Dlayer.add(prism);
          var points3D = new AMap.Object3D.Points();
          var lines = new AMap.Object3D.Line();
          var lineGeo = lines.geometry;
          points3D.transparent = true;
          var pointsGeo = points3D.geometry;
          var center = self.lnglatToG20(result.districtList[0].center, AMap);
          // points 类型的顶点坐标需要使用 G20 坐标
          var size = Math.max(10, Math.round(Math.random() * 40));
          var height = -size * 1000;
          // 连线
          lineGeo.vertices.push(center.x, center.y, 0);
          lineGeo.vertexColors.push(0, 1, 1, 1);
          lineGeo.vertices.push(center.x, center.y, height);
          lineGeo.vertexColors.push(0, 1, 1, 1);

          pointsGeo.vertices.push(center.x, center.y, 0); // 尾部小点
          pointsGeo.pointSizes.push(5);
          pointsGeo.vertexColors.push(0, 0, 1, 1);

          pointsGeo.vertices.push(center.x, center.y, height); // 空中点
          pointsGeo.pointSizes.push(size);
          pointsGeo.vertexColors.push(0.029, 0.015, 0.01, 0.5);
          points3D.borderColor = [0.2, 0.5, 0.7, 1];
          points3D.borderWeight = 3;
          object3Dlayer.add(lines);
          object3Dlayer.add(points3D);
        }
      });
    },
    /**
     * @description: 将坐标装换为G20坐标
     * @author: CZ
     * @param {*} lnglat
     * @param {*} AMap
     * @return {*} lnglat
     */
    lnglatToG20(lnglat, AMap) {
      let self = this;
      lnglat = self.map.lngLatToGeodeticCoord(lnglat);
      lnglat.x = AMap.Util.format(lnglat.x, 3);
      lnglat.y = AMap.Util.format(lnglat.y, 3);
      return lnglat;
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