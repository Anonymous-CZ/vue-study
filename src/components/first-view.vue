<!--
 * @Author: CZ
 * @Date: 2022-04-18 08:49:38
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-18 19:50:36
 * @Description: 第一个测试页
 * @FilePath: \vue-study\src\components\first-view.vue
-->
<template>
  <h2>{{ count }}</h2>
  <hr />
  <h2>{{ count2 }}</h2>
  <hr />
  <button @click="update">update</button>
  <button @click="addItem">add2</button>
  <h2>{{ "a:" + a + ";b:" + b + ";c:" + c }}</h2>
  <h2>{{ "head:" + head + ";tail:" + tail }}</h2>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    // 定义响应式数据 ref对象
    const count = ref(1);
    const count2 = ref(0);
    console.log(count);
    console.log("font-size:13px; background:pink; color:#bf2c9f;", count2);

    // 更新响应式数据的函数
    function update() {
      count.value = count.value + 1;
    }
    // 箭头函数
    var addItem = () => count2.value++;
    // 数组的解构赋值
    let [a, b, c] = [1, 2, 3];
    let [head, ...tail] = [1, 2, 3, 4];
    function* fibs() {
      let a = 0;
      let b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }

    let [first, second, third, fourth, fifth, sixth] = fibs();
    console.log(
      "%c [ sixth ]-49",
      "font-size:13px; background:pink; color:#bf2c9f;",
      sixth
    );
    console.log(
      "%c [ fifth ]-49",
      "font-size:13px; background:pink; color:#bf2c9f;",
      fifth
    );
    console.log(
      "%c [ fourth ]-49",
      "font-size:13px; background:pink; color:#bf2c9f;",
      fourth
    );
    console.log(
      "%c [ third ]-49",
      "font-size:13px; background:pink; color:#bf2c9f;",
      third
    );
    console.log(
      "%c [ second ]-49",
      "font-size:13px; background:pink; color:#bf2c9f;",
      second
    );
    console.log(
      "%c [ first ]-49",
      "font-size:13px; background:pink; color:#bf2c9f;",
      first
    );

    return {
      count,
      count2,
      update,
      addItem,
      a,
      b,
      c,
      head,
      tail,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
    };
  },
};
</script>

<style scoped>
</style>
