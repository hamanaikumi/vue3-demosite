<template>
  <router-link class="router-link" :to="link">
    <p>{{ text }}</p>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuText",
  props: {
    link: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
      default: "Menu",
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  @include menuText;
  margin: 0 30px;

  &::after {
    border-bottom: solid 2px #3333;
    bottom: 0;
    content: "";
    display: block;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    width: 0;
  }

  &:hover {
    color: #808080;
    &::after {
      width: 100%;
    }
  }
}
</style>
