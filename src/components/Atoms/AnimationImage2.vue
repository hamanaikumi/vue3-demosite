<template>
  <img src="../../assets/images/welcome.png" alt="アニメ" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnimationImage2",
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;

  transform: rotate(10deg);
  animation: step 2s steps(1) infinite;
}
@keyframes step {
  0% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
