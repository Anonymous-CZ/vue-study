<!--
 * @Author: CZ
 * @Date: 2022-04-14 20:15:18
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-18 11:43:43
 * @Description: 
 * @FilePath: \vue-study\src\components\HelloWorld.vue
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  module: {
    fun() {
      var str = "str";
      console.log(
        "%c [ str ]-42",
        "font-size:13px; background:pink; color:#bf2c9f;",
        str
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
