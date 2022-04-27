<template>
  <div class="shop-detail">
    <title-text :text="propsValue.text" />
    <div
      class="shop-detail__content"
      v-for="shop of state.shopArray"
      :key="shop.id"
    >
      <div class="shop-detail__image">
        <img :src="shop.image" alt="ショップ写真" />
      </div>
      <div class="shop-detail__description">
        <p>{{ shop.name }}</p>
        <p>〒{{ shop.postCode }}</p>
        <p>{{ shop.address }}</p>
        <div>
          <span>営業時間：</span>
          <span>{{ shop.open }}</span>
        </div>
        <div>
          <span>定休日：</span>
          <span>{{ shop.holiday }}</span>
        </div>
        <div>
          <span>客席数：</span>
          <span>{{ shop.seats }}席</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import Shop from "@/models/shop";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { TitleText },
  name: "ShopDetail",
  setup() {
    const store = useStore();
    const propsValue = {
      // タイトルのテキスト
      text: "Shop",
    };
    const state = ref({
      // ショップ一覧
      shopArray: Array<Shop>(),
    });

    /**
     * 店舗情報一覧を取得する.
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
.shop-detail {
  &__content {
    display: flex;
    padding: 12px;
    width: 100%;
  }
  &__image {
    width: 50%;
    // hover時に画像サイズを固定するため
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      &:hover {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
    }
  }
  &__description {
    width: 50%;
    padding: 12px;
    p,
    span {
      @include defaultText;
    }
    span {
      margin-right: 4px;
    }
  }

  @include sp {
    &__content {
      flex-direction: column;
      width: 80%;
    }
    &__image {
      width: 100%;
    }
    &__description {
      width: 100%;
    }
  }
}
</style>
