<template>
  <div class="drink-item">
    <title-text :text="props.text" />
    <div class="drink-item-wrapper">
      <div
        class="drink-item-content"
        v-for="drink of state.drinkMenu"
        :key="drink.id"
      >
        <div class="drink-item-image">
          <img :src="drink.image" alt="ドリンク写真" />
        </div>
        <p>{{ drink.name }}</p>
        <span>{{ drink.price }}円</span>
        <span>（税込{{ drink.includeTaxPrice }}円）</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { TitleText },
  name: "Drink",
  setup() {
    const store = useStore();
    const props = {
      text: "Drink",
    };
    const state = ref({
      drinkMenu: [],
    });
    const getDrinkMenu = async () => {
      await store.dispatch("getDrink");
      state.value.drinkMenu = store.getters.getAllDrink;
    };
    onBeforeMount(() => {
      getDrinkMenu();
    });
    return {
      props,
      state,
      getDrinkMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.drink-item {
  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  &-content {
    padding: 4px;
    text-align: center;
    width: 23%;
    span,
    p {
      @include defaultText;
      line-height: 200%;
    }
  }
  &-image {
    position: relative;
    width: 100%;
    height: 100%;

    // hover時に画像サイズを固定するため
    overflow: hidden;
    &::before {
      content: "";
      width: 100%;
      display: block;
      padding-top: 100%;
    }

    p {
      @include defaultText;
      line-height: 200%;
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      img {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
    }
  }

  @include sp {
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-content {
      width: 80%;
    }
  }
}
</style>
