<template>
  <div class="shop">
    <p class="title">shop</p>
    <div class="shop-wrapper">
      <div class="shop-content">
        <img
          class="shop-image"
          src="../../../assets/images/shop1.jpeg"
          alt="ショップ写真"
        />
        <p>秋葉原店</p>
      </div>
      <div class="shop-content">
        <img
          class="shop-image"
          src="../../../assets/images/shop1.jpeg"
          alt="ショップ写真"
        />
        <p>新宿店</p>
      </div>
      <div class="shop-content">
        <img
          class="shop-image"
          src="../../../assets/images/shop1.jpeg"
          alt="ショップ写真"
        />
        <p>横浜店</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Shop",
  // setup() {

  // },
});
</script>

<style lang="scss" scoped>
.shop {
  &-wrapper {
    display: flex;
  }
  &-content {
    padding: 12px;
    text-align: center;
    width: 30%;
    p {
      @include defaultText;
      line-height: 200%;
    }
  }
  &-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  @include sp {
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-content {
      //   padding: 12px;
      width: 80%;
    }
  }
}
</style>
