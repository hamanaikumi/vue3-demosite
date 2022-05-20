<template>
  <div class="title-container">
    <span
      v-for="(t, index) in text"
      :key="index"
      class="title-item"
      :style="{ animationDelay: index * 80 + 'ms' }"
      >{{ t }}</span
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TitleText",
  props: {
    text: {
      type: String,
      require: true,
      default: "Menu",
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  &-container {
    @include titleText;
    text-align: center;
    padding: 64px;
    letter-spacing: 2px;
  }
  &-item {
    display: inline-block;
    min-width: 0.3em;
    font-size: 2rem;
    animation: text-in 0.8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }
}
@keyframes text-in {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
}
</style>
