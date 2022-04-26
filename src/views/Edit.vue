<template>
  <div class="edit">
    <Breadcrmb />
    <SignIn />
    <SelectCategory @onChange="setValue" />

    <AddImage @emitImageFile="setImageFile" />
    <div
      v-show="
        state.selectedCategory === state.food ||
        state.selectedCategory === state.drink
      "
    >
      <EditFood
        :category="state.selectedCategory"
        :imageFile="state.imageFile"
      />
    </div>
    <div v-show="state.selectedCategory === state.news">
      <EditNews :imageFile="state.imageFile" />
    </div>
    <div v-show="state.selectedCategory === state.shop">
      <EditShop :imageFile="state.imageFile" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import SelectCategory from "@/components/Templates/Edit/SelectCategory.vue";
import EditFood from "@/components/Templates/Edit/EditFood.vue";
import EditNews from "@/components/Templates/Edit/EditNews.vue";
import AddImage from "@/components/Templates/Edit/AddImage.vue";
import EditShop from "@/components/Templates/Edit/EditShop.vue";
import Breadcrmb from "@/components/Templates/Breadcrmb.vue";
import SignIn from "@/components/Templates/Edit/SignIn.vue";

export default defineComponent({
  components: {
    SelectCategory,
    EditFood,
    EditNews,
    AddImage,
    EditShop,
    Breadcrmb,
    SignIn,
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
    };
    return { setValue, setImageFile, state };
  },
});
</script>

<style lang="scss" scoped></style>
