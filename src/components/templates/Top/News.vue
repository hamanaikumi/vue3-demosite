<template>
  <div class="news">
    <p class="title">News</p>
    <div class="news-wrapper">
      <div class="news-content">
        <img
          class="news-image"
          src="../../../assets/images/news1.jpeg"
          alt="ニュース写真"
        />
        <p>
          「おいしいものは人を笑顔にできる。」
          この思いをカタチにしたのが『幸せのパンケーキ』です。
        </p>
      </div>
      <div class="news-content">
        <img
          class="news-image"
          src="../../../assets/images/news1.jpeg"
          alt="ニュース写真"
        />
        <p>
          「おいしいものは人を笑顔にできる。」
          この思いをカタチにしたのが『幸せのパンケーキ』です。
        </p>
      </div>
      <div class="news-content">
        <img
          class="news-image"
          src="../../../assets/images/news1.jpeg"
          alt="ニュース写真"
        />
        <p>
          「おいしいものは人を笑顔にできる。」
          この思いをカタチにしたのが『幸せのパンケーキ』です。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "News",
  // setup() {

  // },
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
      width: 80%;
      @include defaultText;
      line-height: 200%;
    }
  }
}
</style>
