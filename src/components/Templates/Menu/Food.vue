<template>
  <div class="menu-food">
    <TitleText :text="propsValue.text" />
    <div class="menu-food__wrapper">
      <transition-group name="fade">
        <div
          class="menu-food__content"
          v-for="(food, index) of state.foodMenu"
          :key="food.id"
          v-show="fade"
          :class="'fade-' + index"
        >
          <div class="menu-food__option" v-show="flag">
            <MeatBallMenu
              :deleteData="{
                id: food.id,
                name: food.name,
                category: 'フード',
                image: food.image,
              }"
            />
          </div>
          <div class="menu-food__image">
            <img :src="food.image" alt="フード写真" />
          </div>
          <div class="menu-food__text">
            <p>{{ food.name }}</p>
            <span>{{ food.price }}円</span>
            <span>（税込{{ food.includeTaxPrice }}円）</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Food from "@/models/food";
import MeatBallMenu from "@/components/Atoms/MeatBallMenu.vue";

export default defineComponent({
  components: { TitleText, MeatBallMenu },
  name: "Food",
  props: {
    fade: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const propsValue = {
      // タイトルのテキスト
      text: "Food",
    };
    const state = ref({
      // フードメニュー
      foodMenu: Array<Food>(),
    });

    /**
     * フードメニューを取得する.
     */
    const getFoodMenu = async () => {
      await store.dispatch("getFood");
      state.value.foodMenu = store.getters.getAllFood;
    };

    onBeforeMount(() => {
      getFoodMenu();
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
      getFoodMenu,
      flag,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-food {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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

// 出現アニメーション
@for $i from 1 through 20 {
  $enter-delay: 100ms;
  .fade-enter-active {
    opacity: 0;
    animation: fade-in 1s;

    &.fade-#{$i} {
      animation-delay: #{300ms * $i + $enter-delay};
    }
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
