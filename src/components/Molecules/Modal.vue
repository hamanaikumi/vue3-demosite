<template>
  <div class="header-modal">
    <div class="header-modal__container">
      <p>Menu</p>
      <p>Shops</p>
      <p>Recruit</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  //   setup() {},
});
</script>
<style lang="scss" scoped>
.header-modal {
  @include menuText;
  position: relative;

  &__container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 12px;
    width: 100%;
    text-align: center;
    background-color: #ffff;
    p {
      padding: 8px 0;
    }
  }
}
</style>
