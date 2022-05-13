<template>
  <div class="slideImage-image">
    <img src="../../../assets/images/hotcake.jpeg" class="slideshow" />
    <img src="../../../assets/images/hotcake2.jpeg" class="slideshow fadeout" />
    <img src="../../../assets/images/hotcake3.jpeg" class="slideshow fadeout" />
  </div>
  <div class="slideImage-text">
    <p>
      make every day special. make every day special. make every day special.
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const state = ref({
      // 表示されている画像のインデックス
      index: 0,
    });

    onMounted(() => {
      const images = document.getElementsByClassName("slideshow");

      slideshow(images);
      setInterval(() => {
        state.value.index =
          // indexが最後まで行ったら0に戻る
          state.value.index < images.length - 1 ? state.value.index + 1 : 0;
        slideshow(images);
      }, 3000);
    });

    /**
     * 画像の切り替えを行う.参考：https://qiita.com/ryo511/items/4c65caffb01ba13fb89b
     */
    const slideshow = (images: HTMLCollection) => {
      const current = images[state.value.index];

      const prev = images[state.value.index - 1]
        ? images[state.value.index - 1]
        : images[images.length - 1];
      if (current) {
        current.classList.add("fadein");
        current.classList.remove("fadeout");
        prev.classList.remove("fadein");
        prev.classList.add("fadeout");
      }
    };
    return {
      state,
      slideshow,
    };
  },
});
</script>
<style lang="scss" scoped>
img {
  width: 960px;
  height: 720px;
  @include tab {
    width: 100%;
    object-fit: cover;
  }
}
.fadein {
  opacity: 1;
  transition: opacity 1s;
}

.fadeout {
  opacity: 0;
  transition: opacity 1s;
}

.slideshow {
  position: absolute;
}

.slideImage-text {
  width: 100%;
  overflow: hidden;

  p {
    font-size: 100px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    animation: loop-text 60s linear infinite;
  }
}

@keyframes loop-text {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
