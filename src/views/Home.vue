<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <img
      src="../assets/images/hotcake.jpeg"
      alt="TOPイメージ"
      class="home-image"
    />
    <concept />
    <news />
    <shop />
  </div>
</template>

<script lang="ts">
import Concept from "@/components/templates/Concept.vue";
import News from "@/components/templates/News.vue";
import Shop from "@/components/templates/Shop.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { Concept, News, Shop },
});
</script>
<style lang="scss" scoped>
.home {
  &-image {
    // @include sp {
    width: 100%;
    // }
  }

  .menu {
    @include menuText;
  }
}
</style>
