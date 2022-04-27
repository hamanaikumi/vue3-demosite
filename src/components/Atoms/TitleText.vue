<template>
  <p class="title">{{ text }}</p>
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
  @include titleText;
  text-align: center;
  padding: 56px;
}
</style>
