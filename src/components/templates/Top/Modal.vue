<template>
  <div class="header-modal">
    <div class="header-modal__container">
      <router-link class="router-link" to="/"> <p>Menu</p></router-link>
      <router-link class="router-link" to="/"> <p>Shops</p></router-link>
      <router-link class="router-link" to="/"> <p>Recruit</p></router-link>
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
  z-index: 1;
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
          width: 60%;
        }
      }
    }
  }
}
</style>
