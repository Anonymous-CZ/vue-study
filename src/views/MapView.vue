<!--
 * @Author: CZ
 * @Date: 2022-04-21 10:08:13
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-24 08:52:56
 * @Description: 高德地图demo
 * @FilePath: \vue-study\src\views\MapVIew.vue
-->
<script >
import firstViewMap from "@/components/MapView/first-view.vue";
import administrativeDivision from "@/components/MapView/administrative-division.vue";
import { ref } from "vue";

export default {
  components: {
    firstViewMap,
    administrativeDivision,
  },
  setup() {
    const firstMapHeight = ref("480px");
    return {
      firstMapHeight,
    };
  },
};
</script>

<template>
  <div class="mapStyle backStyle">
    <firstViewMap :firstMapHeight="firstMapHeight" />
    <administrativeDivision />
  </div>
</template>
<style lang="scss" scoped>
.mapStyle {
  display: grid;
  grid-template-rows: 500px;
  background-color: antiquewhite;
  grid-row-gap: 20px;
  padding-bottom: 5%;
}
</style>
