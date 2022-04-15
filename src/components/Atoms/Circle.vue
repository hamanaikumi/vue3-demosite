<template>
  <div class="circle">
    <p class="circle-text">
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
      <span>●</span>
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Circle",
});
</script>

<style scoped>
.circle {
  width: 300px;
  margin: auto;
}
.circle-text {
  margin: auto;
  position: relative;
  width: 300px; /* 直径 */
  height: 300px; /* 直径 */
  font-size: 8px;
  text-align: center;
  margin: 0;
  /* 円の回転 */
  transform: rotate(-80deg);
  animation: r1 20s linear infinite;
}
@keyframes r1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.circle-text span {
  position: absolute;
  top: 0;
  /* 中心点。文字サイズ分ずらす */
  left: calc(50% - 4px);
  display: inline-block;
  /* 文字サイズと同じ */
  width: 8px;
  /* 半径 */
  height: 150px;
  /* 回転の基準点 */
  transform-origin: center bottom;
  /* border: solid 1px; */
  color: #ffc0cb;
}

.circle-text span:nth-child(1) {
  transform: rotate(0deg);
}

.circle-text span:nth-child(2) {
  transform: rotate(30deg);
}

.circle-text span:nth-child(3) {
  transform: rotate(60deg);
}

.circle-text span:nth-child(4) {
  transform: rotate(90deg);
}

.circle-text span:nth-child(5) {
  transform: rotate(120deg);
}

.circle-text span:nth-child(6) {
  transform: rotate(150deg);
}

.circle-text span:nth-child(7) {
  transform: rotate(180deg);
}

.circle-text span:nth-child(8) {
  transform: rotate(210deg);
}

.circle-text span:nth-child(9) {
  transform: rotate(240deg);
}

.circle-text span:nth-child(10) {
  transform: rotate(270deg);
}

.circle-text span:nth-child(11) {
  transform: rotate(300deg);
}

.circle-text span:nth-child(12) {
  transform: rotate(330deg);
}
</style>
