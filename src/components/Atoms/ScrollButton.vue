<template>
  <div class="scroll">
    <a href="#app"
      ><svg
        width="42"
        height="42"
        viewBox="0 0 60 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_2739_1444)">
          <path
            d="M30 51C43.8071 51 55 39.8071 55 26C55 12.1929 43.8071 1 30 1C16.1929 1 5 12.1929 5 26C5 39.8071 16.1929 51 30 51Z"
            stroke="#545454"
            stroke-width="2"
          />
          <path
            d="M20 29.75L30 19.75L40 29.75"
            stroke="#545454"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_2739_1444"
            x="0"
            y="0"
            width="60"
            height="60"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2739_1444"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2739_1444"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScrollButton",
});
</script>
<style scoped>
.scroll {
  bottom: 0;
  position: fixed;
  right: 10px;
  z-index: 10;
  padding: 0;
}
</style>
