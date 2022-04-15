<template>
  <title-text :text="props.text" />
  <div class="shop-special-content">
    <img
      class="shop-image"
      src="@/assets/images/shop1.jpeg"
      alt="コンセプト写真"
    />
    <div>
      <p>
        何気ない毎日の中で、心安らぐひと時を。 SAMPLE CAFE
        はお客様ひとりひとりに寄り添う、心地よい空間とお食事を提供する憩いの場です。
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
    const props = {
      text: "Concept",
    };
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.shop {
  &-special-content {
    display: flex;
    p {
      text-align: center;
      @include defaultText;
      padding: 20px;
      line-height: 200%;
    }
  }

  &-image {
    max-width: 600px;
    height: 400px;
    object-fit: cover;
  }

  @include sp {
    &-special-content {
      display: flex;
      flex-direction: column;
      p {
        padding: 20px;
        @include defaultText;
        line-height: 200%;
      }
    }

    &-image {
      max-width: 100%;
    }
  }
}
</style>
