<template>
  <div class="edit">
    <Breadcrmb />
    <div class="edit-wrapper">
      <SelectCategory @onChange="setValue" />
      <AddImage @emitImageFile="setImageFile" />
      <div
        v-show="
          state.selectedCategory === state.food ||
          state.selectedCategory === state.drink
        "
      >
        <NewFood
          :category="state.selectedCategory"
          :imageFile="state.imageFile"
        />
      </div>
      <div v-show="state.selectedCategory === state.news">
        <NewNews :imageFile="state.imageFile" />
      </div>
      <div v-show="state.selectedCategory === state.shop">
        <NewShop :imageFile="state.imageFile" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import SelectCategory from "@/components/Templates/Edit/SelectCategory.vue";
import NewFood from "@/components/Templates/Edit/NewFood.vue";
import NewNews from "@/components/Templates/Edit/NewNews.vue";
import AddImage from "@/components/Templates/Edit/AddImage.vue";
import NewShop from "@/components/Templates/Edit/NewShop.vue";
import Breadcrmb from "@/components/Templates/Breadcrmb.vue";

export default defineComponent({
  components: {
    SelectCategory,
    NewFood,
    NewNews,
    AddImage,
    NewShop,
    Breadcrmb,
  },
  name: "Edit",

  setup() {
    const state = ref({
      // 選択されたカテゴリー
      selectedCategory: "",
      // カテゴリー
      food: "新商品（フード）",
      drink: "新商品（ドリンク）",
      news: "ニュース",
      shop: "店舗",
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

<style lang="scss" scoped></style>
