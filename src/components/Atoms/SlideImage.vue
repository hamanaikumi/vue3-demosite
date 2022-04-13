<template>
  <img src="../../assets/images/hotcake.jpeg" class="slideshow" />
  <img src="../../assets/images/hotcake2.jpeg" class="slideshow fadeout" />
  <img src="../../assets/images/hotcake3.jpeg" class="slideshow fadeout" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const state = ref({
      index: 0,
    });
    onMounted(() => {
      const images = document.getElementsByClassName("slideshow");
      console.log(images);

      slideshow(images);
      setInterval(() => {
        state.value.index =
          state.value.index < images.length - 1 ? state.value.index + 1 : 0;
        slideshow(images);
      }, 3000);
    });

    const slideshow = (images: any) => {
      const current = images[state.value.index];
      const prev = images[state.value.index - 1]
        ? images[state.value.index - 1]
        : images[images.length - 1];
      current.classList.add("fadein");
      current.classList.remove("fadeout");
      prev.classList.remove("fadein");
      prev.classList.add("fadeout");
    };
    return {
      state,
      slideshow,
    };
  },
});
</script>
<style scoped>
img {
  width: 100%;
  height: 720px;
  object-fit: cover;
}
.fadein {
  opacity: 1;
  transition: opacity 0.8s;
}

.fadeout {
  opacity: 0;
  transition: opacity 0.8s;
}

.slideshow {
  position: absolute;
}
</style>
