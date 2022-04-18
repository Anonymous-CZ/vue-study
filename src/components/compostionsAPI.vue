<!--
 * @Author: CZ
 * @Date: 2022-04-18 09:18:15
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-18 09:18:15
 * @Description: 组合API写法
 * @FilePath: \vue-study\src\components\compostionsAPI.vue
-->
<script setup>
import { ref, onMounted } from "vue";

// reactive state
const count = ref(0);

// functions that mutate state and trigger updates
function increment() {
  count.value++;
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
});
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>