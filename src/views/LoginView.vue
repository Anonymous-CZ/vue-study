<!--
 * @Author: CZ
 * @Date: 2022-04-19 14:07:04
 * @LastEditors: CZ
 * @LastEditTime: 2022-04-19 18:47:38
 * @Description: 登录页
 * @FilePath: \vue-study\src\views\LoginVIew.vue
-->
<script >
export default {
  setup() {
    var runAnimation = () => {
      var whileLineStyle = document.getElementsByClassName("whileLine")[0];
      var doorStyleStyle = document.getElementsByClassName("doorStyle")[0];
      if ("running" === doorStyleStyle.style.animationPlayState) {
        whileLineStyle.style.animationPlayState = "paused";
        doorStyleStyle.style.animationPlayState = "paused";
      } else {
        whileLineStyle.style.animationPlayState = "running";
        doorStyleStyle.style.animationPlayState = "running";
      }
    };

    return {
      runAnimation,
    };
  },
};
</script>

<template>
  <div class="login-main">
    <div class="formStyle">
      <button @click="runAnimation">登录</button>
    </div>
    <div class="doorOut">
      <div class="whileLine"></div>
    </div>
    <div class="animationStyle">
      <div class="doorFrame">
        <div class="doorInner">
          <div class="doorStyle">abc</div>
        </div>
      </div>
    </div>

    <!-- <div class="footer">@....</div> -->
  </div>
</template>
<style lang="scss" scoped>
.login-main {
  background-color: rgba(5, 181, 224, 0.7);
  background-image: linear-gradient(to bottom right, #3bb7ff, #1c53e3);
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: 200px 200px 200px;
  grid-gap: 20px 20px;
}
.formStyle {
  background-color: rgb(49, 235, 235);
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 2;
}
.animationStyle {
  background-color: rgb(47, 126, 126);
  grid-row-start: 2;
  grid-row-end: 4;
  grid-column-start: 4;
  z-index: 1;
  overflow: hidden;
}
.doorFrame {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  background-color: rgb(224, 179, 123);
  z-index: 2;
}
.doorStyle {
  display: flex;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transform-origin: right;
  transform: rotateY(-60deg);
  background-color: bisque;
}
.doorStyle {
  // 动画时长
  animation: doorStyle 3s;
  // 重复次数
  animation-iteration-count: 3;
  // 反向执行
  animation-direction: alternate;
  animation-play-state: paused;
}
@keyframes doorStyle {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-60deg);
  }
}
.doorInner {
  height: 95%;
  width: 90%;
  perspective: 600px;
  background-image: url("https://imgtp.apqiang.com/2022/03/31/FE8wtVmj.jpg");
}
.doorOut {
  height: 80%;
  grid-row-start: 3;
  grid-row-end: 5;
  grid-column-start: 4;
  grid-column-end: 5;
}
.whileLine {
  // 动画时长
  animation: whileLine 3s;
  // 重复次数
  animation-iteration-count: 3;
  // 反向执行
  animation-direction: alternate;
  animation-play-state: paused;
}
@keyframes whileLine {
  0% {
    width: 0%;
  }
  100% {
    width: 89%;
  }
}
.whileLine {
  margin-top: 40%;
  margin-left: 7%;
  width: 89%;
  height: 40%;
  background-image: linear-gradient(
    180deg,
    rgba(167, 222, 253, 0.5),
    rgba(160, 219, 253, 0)
  );
  transform: rotate(-10deg);
  z-index: -1;
}
</style>