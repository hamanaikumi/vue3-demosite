<template>
  <div v-if="modalVisible">
    <div class="modal" @click="setModalFlag"></div>

    <div class="card">
      <div class="card-content">
        <p>削除しますか？</p>
        <Button :label="state.delete" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Button from "../Atoms/Button.vue";

export default defineComponent({
  setup() {
    const state = ref({
      delete: "削除",
    });
    // モーダル
    const store = useStore();
    const modalVisible = computed(() => {
      return store.getters.getModalFlag;
    });
    const setModalFlag = () => {
      store.commit("changeModalFlag");
    };
    return {
      state,
      modalVisible,
      setModalFlag,
    };
  },
  components: { Button },
});
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 150%;
  height: 100%;
  background-color: $black;
  opacity: 0.5;
  z-index: 3;
}
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 50%;
  height: 50%;
  background-color: $white;
  z-index: 4;
  // 装飾
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  @include sp {
    width: 80%;
    height: 25%;
  }

  &-content {
    line-height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
