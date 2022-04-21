<!--
 * @Author: CZ
 * @Date: 2022-04-21 10:08:13
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-21 14:16:15
 * @Description: 高德地图demo
 * @FilePath: \vue-study\src\views\MapVIew.vue
-->
<script >
import firstViewMap from "@/components/MapView/first-view.vue";
import { ref } from "vue";

export default {
  components: {
    firstViewMap,
  },
  setup() {
    const firstMapHeight = ref("500px");
    return {
      firstMapHeight,
    };
  },
};
</script>

<template>
  <div class="mapStyle backStyle">
    <firstViewMap :firstMapHeight="firstMapHeight" />
  </div>
</template>
<style lang="scss" scoped>
.mapStyle {
  display: grid;
  grid-template-rows: 500px;
  background-color: antiquewhite;
}
</style>
