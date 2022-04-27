<template>
  <img src="../../assets/images/cappuccino.png" alt="アニメ" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnimationImage1",
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  transform: rotate(40deg);
  animation: step 2s steps(1) infinite;
}
@keyframes step {
  0% {
    transform: rotate(40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(40deg);
  }
}
</style>
