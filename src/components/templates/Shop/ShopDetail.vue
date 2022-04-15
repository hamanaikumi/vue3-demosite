<template>
  <div class="shop">
    <title-text :text="props.text" />

    <div class="shop-content">
      <div class="shop-image">
        <img src="../../../assets/images/shop2.jpeg" alt="ショップ写真" />
      </div>
      <div class="shop-description">
        <p>秋葉原店</p>
        <p>〒150-0041</p>
        <p>東京都渋谷区神南1丁目21−3 渋谷モディB1F</p>
        <p>営業時間</p>
        <p>11:00～18:00</p>
        <p>ラストオーダー</p>
        <p>17:45</p>
        <p>定休日</p>
        <p>渋谷モディ営業日に準ずる</p>
        <p>客席数：32席</p>
        <p>WiFiあり、コンセントあり、現金のみ</p>
      </div>
    </div>
    <div class="shop-content">
      <div class="shop-image">
        <img src="../../../assets/images/shop4.jpeg" alt="ショップ写真" />
      </div>
      <div class="shop-description">
        <p>秋葉原店</p>
        <p>〒150-0041</p>
        <p>東京都渋谷区神南1丁目21−3 渋谷モディB1F</p>
        <p>営業時間 11:00～18:00</p>
        <p>ラストオーダー 17:45</p>
        <p>定休日 渋谷モディ営業日に準ずる</p>
        <p>客席数：32席</p>
        <p>WiFiあり、コンセントあり、現金のみ</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText },
  name: "ShopDetail",
  setup() {
    const props = {
      text: "Shop",
    };
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.shop {
  &-content {
    display: flex;
    padding: 12px;
    width: 100%;
  }
  &-image {
    width: 50%;
    // hover時に画像サイズを固定するため
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      &:hover {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
    }
  }
  &-description {
    width: 50%;
    padding: 12px;
    p {
      @include defaultText;
      line-height: 200%;
    }
  }

  @include sp {
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-content {
      display: flex;
      flex-direction: column;
      width: 80%;
    }
    &-image {
      width: 100%;
      // hover時に画像サイズを固定するため
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        &:hover {
          transition: all 0.5s ease;
          transform: scale(1.05);
        }
      }
    }
    &-description {
      width: 100%;
      padding: 12px;
      p {
        @include defaultText;
        line-height: 200%;
      }
    }
  }
}
</style>
