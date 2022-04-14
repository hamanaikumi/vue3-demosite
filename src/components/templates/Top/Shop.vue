<template>
  <div class="shop">
    <p class="title">Shop</p>
    <div class="shop-wrapper">
      <div class="shop-content">
        <router-link to="/news">
          <div class="shop-image">
            <img src="../../../assets/images/shop1.jpeg" alt="ショップ写真" />
          </div>
          <p>秋葉原店</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Shop",
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
    height: 300px;
    width: 300px;
    // hover時に画像サイズを固定するため
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: "Information";
      font-size: 16px;
      letter-spacing: 0.2em;
      text-align: center;
      padding-top: 41%;
      color: #fff;
      width: 100%;
      height: 100%;
      display: block;
      background: rgba(0, 0, 0, 0.4);
      transition: 0.8s;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    &:hover {
      img {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
      &::after {
        opacity: 1;
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
