<!--
 * @Author: CZ
 * @Date: 2022-04-14 20:15:18
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-18 14:41:06
 * @Description: 
 * @FilePath: \vue-study\src\App.vue
-->
<template>
  <nav style="margin-top: 20px; margin-bottom: 30px">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 50px;
  padding-right: 50px;
}
::-webkit-scrollbar {
  width: 5px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  //滑块部分
  border-radius: 0px;
  background: rgb(81, 90, 110);
}
::-webkit-scrollbar-track {
  //轨道部分
  box-shadow: inset 0 0 5px rgba(54, 54, 54, 0.2);
  background: rgb(198, 199, 199);
  border-radius: 5px;
}
</style>
