<!--
 * @Author: CZ
 * @Date: 2022-04-18 08:49:38
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-20 13:51:23
 * @Description: 第一个测试页
 * @FilePath: \vue-study\src\components\first-view.vue
-->
<template>
  <div class="">
    <h2>{{ count }}</h2>
    <h2>{{ count2 }}</h2>
    <button @click="update">update</button>
    <button @click="addItem">add2</button>
    <hr />

    <h2>{{ "a:" + a + ";b:" + b + ";c:" + c }}</h2>
    <h2>{{ "head:" + head + ";tail:" + tail }}</h2>
    <hr />
    <h2>{{ "foo:" + foo + ";bar:" + bar }}</h2>
    <hr />
    <div>
      <button @click="addProperties">增加属性</button>
      <h2>{{ fb }}</h2>
    </div>
    <hr />
    <h2>{{ state }}</h2>
    <button @click="updateState">变动数据</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    // 定义响应式数据 ref对象
    const count = ref(1);
    const count2 = ref(0);

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
    function f() {
      console.log("aaa");
    }
    let x = f();
    // 对象赋值
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    // 响应式数据赋值
    let fb = ref([{ a: 1, b: 2 }]);
    let addProperties = () => {
      fb.value.push({ a: 1, b: 2, c: 3 });
      console.log(
        "%c [ fb ]-99",
        "font-size:13px; background:pink; color:#bf2c9f;",
        fb.value.length
      );
    };
    // 使用reactive多个数据的响应式赋值
    const state = reactive({
      name: "tom",
      age: 25,
      wife: {
        name: "marry",
        age: 22,
      },
    });
    const updateState = () => {
      state.name += "--";
      state.age += 1;
      state.wife.name += "++";
      state.wife.age += 2;
      console.log(
        "%c [ state ]-116",
        "font-size:13px; background:pink; color:#bf2c9f;",
        state
      );
    };

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
      x,
      foo,
      bar,
      fb,
      addProperties,
      state,
      updateState,
    };
  },
};
</script>

<style scoped>
</style>
