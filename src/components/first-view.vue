<!--
 * @Author: CZ
 * @Date: 2022-04-18 08:49:38
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-18 09:11:20
 * @Description: 第一个测试页
 * @FilePath: \vue-study\src\components\first-view.vue
-->
<template>
  <h2>{{ count }}</h2>
  <hr />
  <h2>{{ count2 }}</h2>
  <hr />
  <button @click="update">更新</button>
</template>

<script>
import { ref } from "vue";
export default {
  /* 在Vue3中依然可以使用data和methods配置, 但建议使用其新语法实现 */
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   update () {
  //     this.count++
  //   }
  // }

  /* 使用vue3的composition API */
  setup() {
    // 定义响应式数据 ref对象
    const count = ref(1);
    const count2 = ref(0);
    console.log(count);
    console.log("font-size:13px; background:pink; color:#bf2c9f;", count2);

    // 更新响应式数据的函数
    function update() {
      // alert('update')
      count.value = count.value + 1;
      count2.value = count2.value + 1;
    }

    return {
      count,
      count2,
      update,
    };
  },
};
</script>

<style scoped>
</style>
