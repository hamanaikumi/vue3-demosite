<template>
  <TitleText :text="propsValue.text" />
  <div class="shop-concept__content">
    <img
      class="shop-concept__image"
      src="@/assets/images/shop1.jpeg"
      alt="コンセプト写真"
    />
    <div>
      <p>
        何気ない毎日の中で、心安らぐひと時を。<br />
        Sample
        Cafeはお客様ひとりひとりに寄り添う、心地よい空間とお食事を提供する憩いの場です。
        ともだちと語らうランチ、1人でゆっくり過ごすアフタヌーン。
        少し特別でささやかな幸せを感じられるあなただけの時間をお過ごしください。
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText },
  name: "ShopConcept",
  setup() {
    const propsValue = {
      // タイトルのテキスト
      text: "Concept",
    };
    return {
      propsValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.shop-concept {
  &__content {
    display: flex;
    p {
      @include defaultText;
      padding: 20px;
    }
  }
  &__image {
    max-width: 600px;
    height: 400px;
    object-fit: cover;
  }

  @include tab {
    &__content {
      flex-direction: column;
    }

    &__image {
      max-width: 100%;
    }
  }
}
</style>
