<template>
  <div class="edit">
    <Breadcrmb />
    <div v-if="!flag">
      <SignIn />
    </div>
    <div v-if="flag">
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
    <div class="edit-button" v-if="flag">
      <Button :label="state.logout" @emitClick="logout" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import SelectCategory from "@/components/Templates/Edit/SelectCategory.vue";
import EditFood from "@/components/Templates/Edit/EditFood.vue";
import EditNews from "@/components/Templates/Edit/EditNews.vue";
import AddImage from "@/components/Templates/Edit/AddImage.vue";
import EditShop from "@/components/Templates/Edit/EditShop.vue";
import Breadcrmb from "@/components/Templates/Breadcrmb.vue";
import SignIn from "@/components/Templates/Edit/SignIn.vue";
import Button from "@/components/Atoms/Button.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    SelectCategory,
    EditFood,
    EditNews,
    AddImage,
    EditShop,
    Breadcrmb,
    SignIn,
    Button,
  },
  name: "Edit",

  setup() {
    const store = useStore();
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
      logout: "ログアウト",
    });
    const setValue = (selectedValue: string) => {
      state.value.selectedCategory = selectedValue;
    };

    const setImageFile = (file: any) => {
      state.value.imageFile = file;
    };

    const logout = () => {
      store.commit("setSignInFlag");
    };

    const flag = computed(() => {
      return store.getters.getSignInFlag;
    });

    return { setValue, setImageFile, state, flag, logout };
  },
});
</script>

<style lang="scss" scoped>
.edit {
  &-button {
    display: flex;
    justify-content: center;
  }
}
</style>
