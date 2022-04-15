<template>
  <div class="recruit">
    <breadcrmb />
    <div class="recruit-spacial" ref="componentRef1">
      <special />
    </div>
    <div class="recruit-component" ref="componentRef2">
      <Form :size="medium" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Special from "@/components/templates/Menu/Special.vue";
import Breadcrmb from "@/components/templates/Breadcrmb.vue";
import Form from "@/components/Atoms/Form.vue";

export default defineComponent({
  name: "Recruit",
  components: { Special, Breadcrmb, Form },

  setup() {
    const state = ref({
      refArray: Array<Element>(),
    });

    const componentRef1 = ref();
    const componentRef2 = ref();
    const componentRef3 = ref();
    onMounted(() => {
      // 型から undefined をなくす
      if (!componentRef1.value) return;
      if (!componentRef2.value) return;
      if (!componentRef3.value) return;

      state.value.refArray.push(
        componentRef1.value,
        componentRef2.value,
        componentRef3.value
      );
    });

    const checkBoxes = () => {
      // 現在表示されているページの縦の長さを取得
      // 要素はそれよりも狭い範囲で計算したいので、いくらかで割る
      const triggerBottom = (window.innerHeight / 5) * 4;

      state.value.refArray.forEach((ref) => {
        // ref要素の天辺の位置を取得
        const refTop = ref.getBoundingClientRect().top;

        if (refTop < triggerBottom) {
          ref.classList.add("show");
        } else {
          ref.classList.remove("show");
        }
      });
    };

    // スクロールイベントを登録
    window.addEventListener("scroll", checkBoxes);

    return {
      state,
      checkBoxes,
      componentRef1,
      componentRef2,
      componentRef3,
    };
  },
});
</script>
<style lang="scss" scoped>
.recruit {
  &-component {
    opacity: 0;
    // transform: translateY(100px);
    transition: opacity 1s ease;
  }
  .show {
    // transform: translateY(0);
    opacity: 1;
    transition: opacity 1s ease;
    transition-delay: 500ms;
  }
}
</style>
