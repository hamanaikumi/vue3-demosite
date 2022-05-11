<template>
  <div class="header-modal">
    <div class="header-modal__container">
      <div
        class="header-modal__content"
        v-for="(menu, i) of propsValue"
        :key="i"
      >
        <MenuText :link="menu.link" :text="menu.text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import MenuText from "@/components/Atoms/MenuText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { MenuText },
  name: "Modal",
  setup() {
    // リンク一覧
    const propsValue = [
      {
        link: "/Menu",
        text: "Menu",
      },
      {
        link: "/Shop",
        text: "Shop",
      },
      {
        link: "/Recruit",
        text: "Recruit",
      },
      {
        link: "/Edit",
        text: "Edit",
      },
    ];
    return { propsValue };
  },
});
</script>
<style lang="scss" scoped>
.header-modal {
  @include menuText;
  position: relative;
  z-index: 1;

  &__container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 12px;
    width: 100%;
    text-align: center;
    background-color: $white;
  }

  &__content {
    width: 50%;
    padding: 12px 0;
  }
}
</style>
