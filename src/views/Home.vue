<template>
  <div class="home">
    <div class="home-image">
      <slide-image />
    </div>
    <div class="home-component" ref="componentRef1">
      <concept />
    </div>
    <div class="home-component" ref="componentRef2">
      <news />
    </div>
    <div class="home-component" ref="componentRef3">
      <shop />
    </div>
  </div>
</template>

<script lang="ts">
import SlideImage from "@/components/Templates/Top/SlideImage.vue";
import Concept from "@/components/Templates/Top/Concept.vue";
import News from "@/components/Templates/Top/News.vue";
import Shop from "@/components/Templates/Top/Shop.vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: { Concept, News, Shop, SlideImage },

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
.home {
  &-image {
    height: 45rem;
  }

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
