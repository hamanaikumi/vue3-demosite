<template>
  <div class="meatball-menu" @click="setModalFlag">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MeatBallMenu",
  setup() {
    const store = useStore();
    const setModalFlag = () => {
      store.commit("changeModalFlag");
    };
    return {
      setModalFlag,
    };
  },
});
</script>

<style lang="scss" scoped>
.meatball-menu {
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: $white;
    position: absolute;
    &:nth-child(1) {
      top: 50%;
      left: 0%;
      transition: 0.6s;
    }
    &:nth-child(2) {
      top: 50%;
      left: 35%;
    }
    &:nth-child(3) {
      top: 50%;
      left: 70%;
    }
  }
}
</style>
