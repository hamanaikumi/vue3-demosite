<template>
  <div class="home-shop">
    <TitleText :text="propsValue.text" />
    <div class="home-shop__wrapper">
      <div
        class="home-shop__content"
        v-for="shop of state.shopArray"
        :key="shop.id"
      >
        <router-link class="router-link" to="/Shop">
          <div class="home-shop__image">
            <img :src="shop.image" alt="ショップ写真" />
          </div>
          <p>{{ shop.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Shop from "@/models/shop";

export default defineComponent({
  components: { TitleText },
  name: "TopShop",
  setup() {
    const store = useStore();
    const propsValue = {
      // タイトルのテキスト
      text: "Shops",
    };

    const state = ref({
      // 店舗情報
      shopArray: Array<Shop>(),
    });

    /**
     * 店舗情報を取得する.
     */
    const getShop = async () => {
      await store.dispatch("getShop");
      state.value.shopArray = store.getters.getAllShop;
    };

    onBeforeMount(() => {
      getShop();
    });

    return {
      propsValue,
      state,
      getShop,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-shop {
  &__wrapper {
    display: flex;
  }
  &__content {
    padding: 12px;
    text-align: center;
    width: 30%;
    p {
      @include defaultText;
      line-height: 200%;
    }
  }
  &__image {
    height: 300px;
    width: 300px;
    // hover時に画像サイズを固定するため
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: "Information";
      font-size: 16px;
      letter-spacing: 0.2em;
      text-align: center;
      padding-top: 41%;
      color: $white;
      width: 100%;
      height: 100%;
      display: block;
      background: rgba(0, 0, 0, 0.4);
      transition: 0.8s;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    &:hover {
      img {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
      &::after {
        opacity: 1;
      }
    }
  }

  @include tab {
    &__image {
      height: 200px;
      width: 200px;
    }
  }

  @include sp {
    &__wrapper {
      display: flex;
      flex-direction: column;
    }
    &__content {
      width: 80%;
    }
    &__image {
      height: 300px;
      width: 300px;
    }
  }
}
</style>
