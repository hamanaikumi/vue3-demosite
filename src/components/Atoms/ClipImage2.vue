<template>
  <svg
    width="0"
    height="0"
    style="position: absolute; top: 0; left: 0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="clip02">
      <path
        fill="#F2F4F8"
        d="M35.5,-44.9C50,-38.4,68.4,-33.3,75.8,-21.9C83.3,-10.5,79.8,7.1,73,22.4C66.2,37.6,56.1,50.5,43.4,56C30.7,61.6,15.3,59.8,2.5,56.3C-10.3,52.9,-20.5,47.6,-36,43C-51.5,38.3,-72.1,34.2,-82.7,22.1C-93.2,9.9,-93.6,-10.3,-84.4,-24C-75.3,-37.8,-56.6,-45,-41,-51.1C-25.3,-57.2,-12.7,-62.1,-1.1,-60.7C10.5,-59.2,21.1,-51.4,35.5,-44.9Z"
        transform="translate(100 100)"
      />
    </clipPath>
  </svg>

  <svg width="200" height="200" viewBox="0 0 200 200">
    <image
      xlink:href="../../assets/images/background.jpeg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#clip02)"
    />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClipImage2",
});
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: auto;
  margin: -200px;
  @include tab {
    margin: -130px;
  }
  @include sp {
    margin: -60px;
  }
}
image {
  opacity: 0.8;
}
</style>
