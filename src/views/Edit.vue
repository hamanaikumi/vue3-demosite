<template>
  <div class="edit">
    <select-category @onChange="setValue" />
    <div
      v-show="
        state.selectedCategory === state.food ||
        state.selectedCategory === state.drink
      "
    >
      <NewFood :category="state.selectedCategory" />
    </div>
    <div v-show="state.selectedCategory === state.news">
      <NewNews :category="state.selectedCategory" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import SelectCategory from "@/components/Templates/Edit/SelectCategory.vue";
import NewFood from "@/components/Templates/Edit/NewFood.vue";
import NewNews from "@/components/Templates/Edit/NewNews.vue";

export default defineComponent({
  components: { SelectCategory, NewFood, NewNews },
  name: "Edit",
  setup() {
    const state = ref({
      selectedCategory: "新商品（フード）",
      food: "新商品（フード）",
      drink: "新商品（ドリンク）",
      news: "ニュース",
    });
    const setValue = (selectedValue: string) => {
      state.value.selectedCategory = selectedValue;
    };

    return { setValue, state };
  },
});
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
}
</style>
