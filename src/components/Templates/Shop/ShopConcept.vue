<template>
  <TitleText :text="propsValue.text" />
  <div class="shop-concept__content">
    <div class="shop-concept__image">
      <img
        class="image-show"
        src="@/assets/images/shop1.jpeg"
        alt="コンセプト写真"
      />
    </div>
    <div class="shop-concept__text">
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
    width: 60%;
    height: 400px;
    display: flex;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $white;
      @include animation(
        $animation-name: cover-slide,
        $duration: 1.5s,
        $fill-mode: forwards,
        $delay: 0.2s
      );
    }

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      @include animation(
        $animation-name: image-show,
        $duration: 1.5s,
        $fill-mode: forwards,
        $delay: 0.2s
      );
    }
  }

  &__text {
    width: 40%;
  }

  @include tab {
    &__content {
      flex-direction: column;
    }

    &__image {
      width: 100%;
    }
    &__text {
      width: 100%;
    }
  }
}
</style>
