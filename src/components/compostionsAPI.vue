<!--
 * @Author: CZ
 * @Date: 2022-04-18 09:18:15
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-20 16:42:08
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
//at()返回字符
const str2 = "hello";
console.log(
  "%c str.at(1):-24",
  "font-size:13px; background:pink; color:#bf2c9f;",
  str2.at("e")
);
// String.fromCharCode(0x20bb7)用于从 Unicode 码点返回对应字符,但是这个方法不能识别码点大于0xFFFF的字符。
// console.log(
//   "%c String.fromCharCode(0x20BB7):-22",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   String.fromCharCode(0x20bb7)
// );
// // String.fromCodePoint(0x20bb7)用于从 Unicode 码点返回对应字符，可以识别大于0xFFFF的字符。
// console.log(
//   "%c String.fromCharCode(0x20BB7):-22",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   String.fromCodePoint(0x20bb7)
// );
// let s = "𠮷a";
// console.log(
//   "%c s.codePointAt(0):-36",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   s.codePointAt(0).toString(16)
// );
// console.log(
//   "%c s.codePointAt(1):-36",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   s.codePointAt(1).toString(16)
// );
// let str1 = s.codePointAt(0).toString(16);
// console.log(
//   "%c String.fromCharCode(0x20BB7):-22",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   String.fromCodePoint(`0x${str1}`)
// );
// console.log(
//   "%c s.codePointAt(2):-38",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   s.codePointAt(2)
// );
// 标签模板
// alert`hello`;
// 等同于
// alert(["hello"]);
// let a = 5;
// let b = 10;
// var x = (a, b) => a * b;
// // x`Hello ${a + b} world ${a * b}`;
// console.log(
//   "%c x:-29",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   x`Hello ${a + b} world ${a * b}`
// );
// // 等同于
// var y = (["Hello ", " world ", ""], 15, 50);
// console.log("%c y:-32", "font-size:13px; background:pink; color:#bf2c9f;", y);

// 定义为全局 模板语句才能接受到
var str = ref("1");
var fun = () => {
  let name = "Bob",
    time = "today";
  str.value = `Hello ${name}, how are you ${time}?`;
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