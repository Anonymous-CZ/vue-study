<template>
  <div class="about">
    <div class="content items-1"><h1>1</h1></div>
    <div class="content items-2"><h1>2</h1></div>
    <div class="content items-3"><h1>3</h1></div>
    <div class="content"><h1>4</h1></div>
    <div class="content"><h1>5</h1></div>
    <div class="content"><h1>6</h1></div>
    <div class="content"><h1>7</h1></div>
    <div class="content"><h1>8</h1></div>
    <div class="content"><h1>9</h1></div>
  </div>
</template>
<script>
// import { ref } from "vue";
export default {
  setup() {
    return {};
  },
};
</script>

<style  lang="scss">
.about {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100px 100px 100px;
  grid-gap: 20px 20px;
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i";
}
.content {
  background-color: rgb(92, 164, 182);
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
/* 设置块占用从第一个网格线到第三个网格线的位置 */
.items-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}
/* 表示跨越两个格子 */
.items-2 {
  grid-row: span 2;
}
/* 指定内容放在哪个区域 */
.items-3 {
  grid-area: c;
}
</style>
