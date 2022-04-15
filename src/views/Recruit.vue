<template>
  <div class="recruit">
    <breadcrmb />
    <div class="recruit-spacial" ref="componentRef1">
      <recruit-top />
    </div>
    <div class="recruit-component" ref="componentRef2">
      <recruit-form />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Breadcrmb from "@/components/templates/Breadcrmb.vue";
import Form from "@/components/Atoms/Form.vue";
import RecruitTop from "@/components/templates/Recruit/RecruitTop.vue";
import RecruitForm from "@/components/templates/Recruit/RecruitForm.vue";

export default defineComponent({
  name: "Recruit",
  components: { Breadcrmb, RecruitTop, RecruitForm },

  setup() {
    const state = ref({
      refArray: Array<Element>(),

      medium: "medium",
      small: "small",
      large: "large",
      name: "氏名",
      furigana: "ふりがな",
      phone: "電話番号",
      email: "メールアドレス",
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
    width: 400px;
    // opacity: 0;
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
