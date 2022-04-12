<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/templates/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
  // setup() {

  // },
});
</script>

<style lang="scss">
#app {
  font-family: "Lato";
  // 表示される文字がなめらかになる
  // -webkit-font-smoothing: antialiased;
  // -webkit-にantialiasedと指定した時のみgrayscaleを指定すると、ブラウザ間での見え方の差が小さくすむ
  // -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
.title {
  @include titleText;
  text-align: center;
  padding: 1rem 0;
}
p {
  @include defaultText;
  line-height: 200%;
}
</style>
