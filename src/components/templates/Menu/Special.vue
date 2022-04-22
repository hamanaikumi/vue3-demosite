<template>
  <title-text :text="props.text" />
  <div class="menu-special-content">
    <img
      class="menu-image"
      src="@/assets/images/hotcake3.jpeg"
      alt="コンセプト写真"
    />
    <div>
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
    const props = {
      text: "Special",
    };
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu {
  &-special-content {
    display: flex;
    p {
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
