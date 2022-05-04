<template>
  <div class="shop">
    <Breadcrmb />
    <div class="shop-concept" ref="componentRef1">
      <ShopConcept />
    </div>
    <div class="shop-component" ref="componentRef2">
      <ShopDetail />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

import Breadcrmb from "@/components/Templates/Breadcrmb.vue";
import ShopConcept from "@/components/Templates/Shop/ShopConcept.vue";
import ShopDetail from "@/components/Templates/Shop/ShopDetail.vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
  name: "Shop",
  components: { Breadcrmb, ShopConcept, ShopDetail },

  setup() {
    // metaデータ
    const siteData = reactive({
      title: `Sample Cafe || 店舗情報`,
      description: `何気ない毎日の中で、心安らぐひと時を。Sample Cafe はお客様ひとりひとりに寄り添う、心地よい空間とお食事を提供する憩いの場です。 ともだちと語らうランチ、1人でゆっくり過ごすアフタヌーン。 少し特別でささやかな幸せを感じられるあなただけの時間をお過ごしください。`,
    });
    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    });

    const state = ref({
      // refで参照するHTMLテンプレートの配列
      refArray: Array<Element>(),
    });

    const componentRef1 = ref();
    const componentRef2 = ref();

    onMounted(() => {
      // 型から undefined をなくす
      if (!componentRef1.value) return;
      if (!componentRef2.value) return;

      state.value.refArray.push(componentRef1.value, componentRef2.value);
    });

    /**
     * HTMLテンプレートの位置とスクロール位置を照らし合わせて、表示非表示を切り替える.
     */
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
    };
  },
});
</script>
<style lang="scss" scoped>
.shop {
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
