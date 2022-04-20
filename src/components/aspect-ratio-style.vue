<!--
 * @Author: CZ
 * @Date: 2022-04-18 20:15:39
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-20 15:30:11
 * @Description: 纵横比测试
 * @FilePath: \vue-study\src\components\aspect-ratio-style.vue
-->
<template>
  <div class="aspect-ratio-style backStyle">
    <div class="content items-1">
      <img src="https://picsum.photos/800/500?random=1" alt="" srcset="" />
    </div>
    <div class="content items-2">
      <img src="https://picsum.photos/800/500?random=2" alt="" srcset="" />
    </div>
    <div class="content items-3">
      <img src="https://picsum.photos/800/500?random=3" alt="" srcset="" />
    </div>
  </div>
</template>
<script>
</script>

<style  lang="scss" scoped>
.aspect-ratio-style {
  margin-top: 1%;
  // margin-bottom: 10%;
  padding-bottom: 10%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-column-gap: 20px;
}
.content {
  &:hover {
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  width: 100%;
}
.items-1 {
  overflow: hidden;
  aspect-ratio: 8/5;
}
.items-2 {
  overflow: hidden;
  aspect-ratio: 16/9;
}
.items-3 {
  overflow: hidden;
  aspect-ratio: 9/16;
}
</style>
