<template>
  <div class="food-item">
    <title-text :text="props.text" />
    <div class="food-item-wrapper">
      <div class="food-item-content">
        <div class="food-item-image">
          <img
            src="../../../assets/images/cheesecake.jpeg"
            alt="ショップ写真"
          />
        </div>
        <p>チーズケーキ</p>
        <p>400円（税込440円）</p>
      </div>
      <div class="food-item-content">
        <div class="food-item-image">
          <img src="../../../assets/images/gltenfree.jpeg" alt="ショップ写真" />
        </div>
        <p>グルテンフリーケーキ</p>
        <p>400円（税込440円）</p>
      </div>
      <div class="food-item-content">
        <div class="food-item-image">
          <img src="../../../assets/images/cofee.jpeg" alt="ショップ写真" />
        </div>
        <p>プレンドコーヒー</p>
        <p>400円（税込440円）</p>
      </div>
      <div class="food-item-content">
        <div class="food-item-image">
          <img src="../../../assets/images/cofee.jpeg" alt="ショップ写真" />
        </div>
        <p>プレンドコーヒー</p>
        <p>400円（税込440円）</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText },
  name: "food",
  setup() {
    const props = {
      text: "food",
    };
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.food-item {
  &-wrapper {
    display: flex;
    width: 100%;
  }
  &-content {
    padding: 12px;
    text-align: center;
    width: 25%;
    p {
      @include defaultText;
      line-height: 200%;
    }
  }
  &-image {
    width: 100%;
    // hover時に画像サイズを固定するため
    overflow: hidden;

    p {
      @include defaultText;
      line-height: 200%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      img {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
    }
  }

  @include sp {
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-content {
      width: 80%;
    }
  }
}
</style>
