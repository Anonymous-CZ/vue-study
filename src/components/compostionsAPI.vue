<!--
 * @Author: CZ
 * @Date: 2022-04-18 09:18:15
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-20 13:51:58
 * @Description: 组合API写法 测试ES6
 * @FilePath: \vue-study\src\components\compostionsAPI.vue
-->
<script setup>
import { ref } from "vue";
// export default {
//   setup() {
//     return {
//       fun,
//       increment,
//       count,
//       str,
//     };
//   }, //入口
// };
// 定义为全局 模板语句才能接受到
var str = ref("1");
var fun = () => {
  let name = "Bob",
    time = "today";
  str.value = `Hello ${name}, how are you ${time}?`;
  console.log(
    "%c str.value:-27",
    "font-size:13px; background:pink; color:#bf2c9f;",
    str.value
  );
};

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">Count ：{{ count }}</button>
  <button @click="fun">按钮:{{ str }}</button>
</template>