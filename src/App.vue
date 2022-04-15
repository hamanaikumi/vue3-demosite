<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/templates/Header.vue";
import Footer from "./components/templates/Footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Noto Sans JP";
  // 表示される文字がなめらかになる
  // -webkit-font-smoothing: antialiased;
  // -webkit-にantialiasedと指定した時のみgrayscaleを指定すると、ブラウザ間での見え方の差が小さくすむ
  // -moz-osx-font-smoothing: grayscale;
}

.router-link {
  text-decoration: none;
  color: #333333;
}
</style>
