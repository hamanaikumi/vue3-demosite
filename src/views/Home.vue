<template>
  <div class="home">
    <div class="home-image">
      <SlideImage />
    </div>
    <div class="home-component" ref="componentRef1">
      <HomeConcept />
    </div>
    <div class="home-component" ref="componentRef2">
      <HomeNews />
    </div>
    <div class="home-component" ref="componentRef3">
      <HomeShop />
    </div>
  </div>
</template>

<script lang="ts">
import SlideImage from "@/components/Templates/Home/SlideImage.vue";
import HomeConcept from "@/components/Templates/Home/HomeConcept.vue";
import HomeNews from "@/components/Templates/Home/HomeNews.vue";
import HomeShop from "@/components/Templates/Home/HomeShop.vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: { HomeConcept, HomeNews, HomeShop, SlideImage },

  setup() {
    const state = ref({
      refArray: Array<Element>(),
      appearance: Array<boolean>(),
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
    transition: opacity 0.5s ease;
  }
  .show {
    // transform: translateY(0);
    opacity: 1;
    transition: opacity 0.5s ease;
    transition-delay: 20ms;
  }
}
</style>
