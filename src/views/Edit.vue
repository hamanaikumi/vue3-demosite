<template>
  <div class="edit">
    <select-category @onChange="setValue" />
    <AddImage @emitImageFile="setImageFile" />
    <div
      v-show="
        state.selectedCategory === state.food ||
        state.selectedCategory === state.drink
      "
    >
      <NewFood :category="state.selectedCategory" />
    </div>
    <div v-show="state.selectedCategory === state.news">
      <NewNews
        :category="state.selectedCategory"
        :imageFile="state.imageFile"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import SelectCategory from "@/components/Templates/Edit/SelectCategory.vue";
import NewFood from "@/components/Templates/Edit/NewFood.vue";
import NewNews from "@/components/Templates/Edit/NewNews.vue";
import AddImage from "@/components/Templates/Edit/AddImage.vue";

export default defineComponent({
  components: { SelectCategory, NewFood, NewNews, AddImage },
  name: "Edit",

  setup() {
    const state = ref({
      // 選択されたカテゴリー
      selectedCategory: "新商品（フード）",
      food: "新商品（フード）",
      drink: "新商品（ドリンク）",
      news: "ニュース",
      // 添付された画像ファイル
      imageFile: {},
    });
    const setValue = (selectedValue: string) => {
      state.value.selectedCategory = selectedValue;
    };

    const setImageFile = (file: any) => {
      state.value.imageFile = file;
      console.log("set");
    };
    return { setValue, setImageFile, state };
  },
});
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
}
</style>
