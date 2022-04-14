<template>
  <div class="news">
    <p class="title">News</p>
    <div class="news-wrapper">
      <div class="news-content">
        <router-link to="/news">
          <div class="news-image">
            <img src="../../../assets/images/news1.jpeg" alt="ニュース写真" />
          </div>
          <p>2022.04.01 「hanako」に掲載されました</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "News",
});
</script>

<style lang="scss" scoped>
.news {
  &-wrapper {
    display: flex;
  }
  &-content {
    padding: 12px;
    width: 30%;
    @include defaultText;
    line-height: 200%;
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
      content: "Read More";
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
      @include defaultText;
      line-height: 200%;
    }
  }
}
</style>
