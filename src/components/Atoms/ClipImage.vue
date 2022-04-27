<template>
  <svg
    width="0"
    height="0"
    style="position: absolute; top: 0; left: 0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="clip01">
      <path
        fill="#F2F4F8"
        d="M34.4,-45.4C43.8,-33,50.3,-21.5,51.6,-9.7C52.9,2,49.1,14.1,41.4,20.6C33.7,27.2,22.2,28.2,11,33.8C-0.2,39.4,-11,49.6,-26.5,52.7C-42.1,55.8,-62.4,51.8,-69.8,39.9C-77.2,27.9,-71.7,8.1,-63.5,-6.5C-55.3,-21,-44.3,-30.4,-33.3,-42.6C-22.3,-54.7,-11.1,-69.6,0.7,-70.4C12.4,-71.2,24.9,-57.9,34.4,-45.4Z"
        transform="translate(100 100)"
      />
    </clipPath>
  </svg>

  <svg width="200" height="200" viewBox="0 0 200 200">
    <image
      xlink:href="../../assets/images/hotcake3.jpeg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#clip01)"
    />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClipImage",
});
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: auto;
  margin: -120px;
  @include tab {
    margin: -100px;
  }
  @include sp {
    margin: -60px;
  }
}
image {
  opacity: 0.8;
}
</style>
