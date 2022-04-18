<!--
 * @Author: CZ
 * @Date: 2022-04-18 10:41:57
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-18 16:05:59
 * @Description: Home
 * @FilePath: \vue-study\src\views\HomeView.vue
-->
<template>
  <div class="home">
    <div></div>
    <div class="helloView">
      <HelloWorld />
    </div>
    <div></div>
    <div class="firstView">
      <FirstView />
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import FirstView from "@/components/first-view.vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
    FirstView,
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: grid;
  // grid-template-columns: 1% 48% 2% 48% 1%;
  // grid-template-rows: 50% 50%;
}
.helloView {
  background-color: rgb(255, 255, 255);
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.18), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  }
  margin-bottom: 10%;
}
.firstView {
  background-color: rgb(255, 255, 255);
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>
