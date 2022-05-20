<template>
  <TitleText :text="propsValue.text" />
  <div class="menu-special__content">
    <div class="menu-special__image">
      <img
        class="image-show"
        src="@/assets/images/hotcake3.jpeg"
        alt="コンセプト写真"
      />
    </div>
    <div class="menu-special__text">
      <p>
        看板商品の「フルーツいっぱいのリコッタパンケーキ」をリニューアルし、従来の軽い食感やふんわり香るバターの香り、優しい甘みはそのままに、濃厚なリコッタチーズからミネラルが豊富で低脂肪・低カロリーのバターミルクに置き換えました。
        体に優しく沢山食べても罪悪感のない生地にブラッシュアップしました。
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText },
  name: "special",
  setup() {
    const propsValue = {
      // タイトルのテキスト
      text: "Special",
    };
    return {
      propsValue,
    };
  },
});
</script>

<style lang="scss">
.menu-special {
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
