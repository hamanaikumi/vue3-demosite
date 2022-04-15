<template>
  <div class="thumbnail-image" :style="styles">
    <img :src="img" alt="サムネイル" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "ThumbnailImage",
  props: {
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "300px",
    },
    propSrc: {
      type: String,
      default: "@/assets/images/news1.jpeg",
    },
  },
  setup(props) {
    // バインドするスタイルを生成
    const styles = computed(() => {
      return {
        "--height": props.width,
        "--width": props.width,
      };
    });

    const img = ref();
    img.value = require(props.propSrc);

    return {
      styles,
      img,
    };
  },
});
</script>

<style lang="scss" scoped>
.thumbnail-image {
  // 変数設定
  height: var(--height);
  width: var(--width);
  // hover時に画像サイズを固定するため
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::after {
    // content: attr(data-text); 反映されなかった
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
</style>
