<template>
  <Header />
  <transition name="load">
    <router-view />
  </transition>
  <Footer />
  <transition name="scroll">
    <ScrollButton v-show="visible" />
  </transition>
  <DeleteModal />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "@/components/Templates/Header.vue";
import Footer from "./components/Templates/Footer.vue";
import ScrollButton from "./components/Atoms/ScrollButton.vue";
import DeleteModal from "./components/Templates/DeleteModal.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
    ScrollButton,
    DeleteModal,
  },

  setup() {
    // スクロール量
    let scrollY = ref(0);
    // 表示非表示の切り替え
    let visible = ref(false);
    /**
     * スクロールに合わせて、ボタンの表示非表示を切り替える.
     */
    const handleScroll = () => {
      scrollY.value = window.scrollY;
      if (!visible.value) {
        visible.value = window.scrollY > 100;
      } else if (window.scrollY < 90) {
        visible.value = !visible.value;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return {
      handleScroll,
      scrollY,
      visible,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Poppins", sans-serif;
  max-width: 960px;
  // 表示される文字がなめらかになる
  // -webkit-font-smoothing: antialiased;
  // -webkit-にantialiasedと指定した時のみgrayscaleを指定すると、ブラウザ間での見え方の差が小さくすむ
  // -moz-osx-font-smoothing: grayscale;
}
.router-link {
  text-decoration: none;
  color: $dark-gray;
}
/* アクティブ時 */
.scroll-leave-active,
.scroll-enter-active {
  transition: opacity 1s;
}
.load-leave-active,
.load-enter-active {
  transition: opacity 1s;
}
/* Enterの設定 */
.scroll-enter {
  opacity: 0;
}
.scroll-enter-from {
  opacity: 0;
}
.scroll-enter-to {
  opacity: 1;
}
.load-enter {
  opacity: 0;
}
.load-enter-from {
  opacity: 0;
}
.load-enter-to {
  opacity: 1;
}
/* Leaveの設定 */
.scroll-leave {
  opacity: 1;
}
.scroll-leave-to {
  opacity: 0;
}
.load-leave {
  opacity: 1;
}
.load-leave-to {
  opacity: 0;
}
</style>
