<template>
  <div class="menu-drink">
    <title-text :text="propsValue.text" />
    <div class="menu-drink__wrapper">
      <div
        class="menu-drink__content"
        v-for="drink of state.drinkMenu"
        :key="drink.id"
      >
        <div class="menu-drink__option" v-show="flag">
          <MeatBallMenu
            :deleteData="{
              id: drink.id,
              name: drink.name,
              category: 'ドリンク',
              image: drink.image,
            }"
          />
        </div>
        <div class="menu-drink__image">
          <img :src="drink.image" alt="ドリンク写真" />
        </div>
        <div class="menu-drink__text">
          <p>{{ drink.name }}</p>
          <span>{{ drink.price }}円</span>
          <span>（税込{{ drink.includeTaxPrice }}円）</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Drink from "@/models/drink";
import MeatBallMenu from "@/components/Atoms/MeatBallMenu.vue";

export default defineComponent({
  components: { TitleText, MeatBallMenu },
  name: "Drink",
  setup() {
    const store = useStore();
    const propsValue = {
      // タイトルのテキスト
      text: "Drink",
    };
    const state = ref({
      // ドリンクメニュー
      drinkMenu: Array<Drink>(),
    });

    /**
     * ドリンクメニューを取得する.
     */
    const getDrinkMenu = async () => {
      await store.dispatch("getDrink");
      state.value.drinkMenu = store.getters.getAllDrink;
    };

    onBeforeMount(() => {
      getDrinkMenu();
    });

    /**
     * ストアのログイン状態を取得する.
     */
    const flag = computed(() => {
      return store.getters.getSignInFlag;
    });

    return {
      propsValue,
      state,
      getDrinkMenu,
      flag,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-drink {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  &__content {
    margin-bottom: 24px;
    text-align: center;
    width: 23%;
    position: relative;
    span,
    p {
      @include defaultText;
    }
  }
  &__option {
    position: absolute;
    top: 2.5%;
    right: 5%;
    z-index: 1;
  }
  &__image {
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
  &__text {
    margin: 8px;
  }

  @include sp {
    &__wrapper {
      flex-direction: column;
    }
    &__content {
      width: 80%;
    }
  }
}
</style>
