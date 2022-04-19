<!--
 * @Author: CZ
 * @Date: 2022-04-19 09:49:21
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-19 11:00:42
 * @Description: 其他入口页
 * @FilePath: \vue-study\src\views\OtherView.vue
-->
<script >
import { ref } from "vue";
import compostionsAPI from "@/components/compostionsAPI.vue";

export default {
  components: {
    compostionsAPI,
  },

  setup() {
    const count = ref(1);
    let increment = () => count.value++;
    return {
      count,

      increment,
    };
  },
};
</script>

<template>
  <div class="OtherStyle">
    <button @click="increment">Count is: {{ count }}</button>
  </div>
  <compostionsAPI />
</template>
<style lang="scss" scoped>
.OtherStyle {
  margin-top: 1%;
  margin-bottom: 1%;
  background-color: rgb(92, 164, 182);
  width: 100%;
  height: 200px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>