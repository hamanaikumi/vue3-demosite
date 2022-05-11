<template>
  <div class="meatball-menu" @click="setModalFlag">
    <div class="meatball-menu-text">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MeatBallMenu",
  props: {
    deleteData: {},
  },
  setup(props) {
    props = reactive(props);
    const store = useStore();

    /**
     * ストアのモーダルの表示状態を変更し、削除するデータをストアに格納する.
     */
    const setModalFlag = () => {
      store.commit("changeModalFlag");
      store.commit("setDeleteData", props.deleteData);
    };
    return {
      setModalFlag,
    };
  },
});
</script>

<style lang="scss" scoped>
.meatball-menu {
  margin: auto;
  width: 30px;
  height: 30px;
  &-text {
    width: 100%;
    height: 100%;
    border: 2px solid $white;
    border-radius: 50%;
    position: relative;
    cursor: pointer;

    span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: $white;
      position: absolute;
      &:nth-child(1) {
        top: calc(50% - 2px);
        left: 20%;
        transition: 0.6s;
      }
      &:nth-child(2) {
        top: calc(50% - 2px);
        left: 45%;
      }
      &:nth-child(3) {
        top: calc(50% - 2px);
        left: 70%;
      }
    }
  }
}
</style>
