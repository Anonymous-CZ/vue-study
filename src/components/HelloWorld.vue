<!--
 * @Author: CZ
 * @Date: 2022-04-14 20:15:18
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-19 19:05:12
 * @Description: 
 * @FilePath: \vue-study\src\components\HelloWorld.vue
-->
<template>
  <div class="hello">
    <form>
      <input type="email" name="email" />
      <button type="submit">
        <svg
          t="1650269422129"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2597"
          width="32"
          height="32"
        >
          <path
            d="M955.069071 864.311021 740.015134 649.258107c-3.752464-3.751441-8.841366-5.860475-14.149255-5.860475-5.306866 0-10.395768 2.108011-14.149255 5.860475l-16.692171 16.692171-38.34226-38.34226c53.03796-59.810201 85.298711-138.442072 85.298711-224.478588 0-186.774871-151.952784-338.727655-338.727655-338.727655S64.527642 216.35456 64.527642 403.12943c0 186.775894 151.952784 338.728678 338.727655 338.728678 86.36909 0 165.276231-32.510438 225.170343-85.913718l38.303374 38.303374-17.34504 17.34504c-7.812943 7.813966-7.812943 20.48352 0 28.297486l215.051891 215.052914c3.753487 3.751441 8.841366 5.860475 14.149255 5.860475 5.306866 0 10.395768-2.108011 14.149255-5.860475l62.334697-62.334697C962.883037 884.794541 962.883037 872.124987 955.069071 864.311021zM104.546078 403.12943c0-164.709319 133.9999-298.709219 298.709219-298.709219s298.709219 133.9999 298.709219 298.709219S567.964616 701.839673 403.255297 701.839673 104.546078 567.838749 104.546078 403.12943zM878.585119 912.496463 691.829691 725.741036l34.036187-34.036187 186.755428 186.755428L878.585119 912.496463z"
            p-id="2598"
          ></path>
        </svg>
      </button>
    </form>
    <div class="flexboxStyle">
      <div class="flexbox-content flexbox-items-1"><h1>1</h1></div>
      <div class="flexbox-content flexbox-items-2"><h1>2</h1></div>
      <div class="flexbox-content flexbox-items-3"><h1>3</h1></div>
      <div class="flexbox-content"><h1>4</h1></div>
      <div class="flexbox-content"><h1>5</h1></div>
      <div class="flexbox-content"><h1>6</h1></div>
      <div class="flexbox-content"><h1>7</h1></div>
      <div class="flexbox-content"><h1>8</h1></div>
      <div class="flexbox-content"><h1>9</h1></div>
    </div>
  </div>
</template>

<script>
</script>

<style  lang="scss" >
form {
  display: flex;
}
/* 占用当前行所有剩余宽度 */
input {
  flex-grow: 1;
  /* flex-start：顶边对齐，高度不拉伸
  flex-end：底边对齐，高度不拉伸
  center：居中，高度不拉伸
  stretch：默认值，高度自动拉伸
  align-self: center; */
}
.flexboxStyle {
  display: flex;
  /* row 水平排列 */
  /* 垂直排列 */
  /* flex-direction: column; */
  /* 从后往前排列 */
  /* flex-direction: column-reverse; */
  /* 定义如何换行，默认不换行|换行|换行倒序 */
  /* flex-wrap: nowrap | wrap | wrap-reverse; */
  flex-wrap: wrap;
  /* justify-content属性定义了项目在主轴上的对齐方式 */
  /* 默认左对齐|右对齐|居中|两端对齐|每个项目两端距离相等，两边距离最小 */
  /* justify-content: flex-start | flex-end | center | space-between | space-around; */
  justify-content: space-around;
  /* align-items属性定义项目在交叉轴上如何对齐。 */
  /* 起点对齐|终点对齐|中点对齐|项目的第一行文字的基线对齐|默认值，自动占满整个高度 */
  /* align-items: flex-start | flex-end | center | baseline | stretch; */
  /* align-items: center; */
  /* align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 */
  /* 起点对齐|终点对齐|中点对齐|两端对齐| 每个项目两端距离相等，两边距离最小|占满*/
  /* align-content: flex-start | flex-end | center | space-between | space-around | stretch; */
  /* align-content: space-around; */
  padding-bottom: 1%;
}
.flexbox-content {
  background-color: aquamarine;
  width: 30%;
  height: 100px;
  margin-bottom: 1%;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
.flexbox-items-1 {
  margin-top: 1%;
  margin-bottom: 1%;
}
.flexbox-items-2 {
  margin-top: 1%;
  margin-bottom: 1%;
}
.flexbox-items-3 {
  /* 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。 */
  order: -1;
  margin-top: 1%;
  margin-bottom: 1%;
}
</style>
