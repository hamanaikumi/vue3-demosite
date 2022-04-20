<template>
  <div class="shop">
    <title-text :text="props.text" />
    <div class="shop-content" v-for="shop of state.shopArray" :key="shop.id">
      <div class="shop-image">
        <img :src="shop.image" alt="ショップ写真" />
      </div>
      <div class="shop-description">
        <p>{{ shop.name }}</p>
        <p>〒{{ shop.postCode }}</p>
        <p>{{ shop.address }}</p>
        <div class="shop-description__container">
          <span>営業時間：</span>
          <span>{{ shop.open }}</span>
        </div>
        <div class="shop-description__container">
          <span>定休日：</span>
          <span>{{ shop.holiday }}</span>
        </div>
        <div class="shop-description__container">
          <span>客席数：</span>
          <span>{{ shop.seats }}席</span>
        </div>
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
  name: "ShopDetail",
  setup() {
    const store = useStore();
    const props = {
      text: "Shop",
    };
    const state = ref({
      shopArray: [],
    });
    const getShop = async () => {
      await store.dispatch("getShop");
      state.value.shopArray = store.getters.getAllShop;
    };
    onBeforeMount(() => {
      getShop();
    });
    return {
      props,
      state,
      getShop,
    };
  },
});
</script>

<style lang="scss" scoped>
.shop {
  &-content {
    display: flex;
    padding: 12px;
    width: 100%;
  }
  &-image {
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
  &-description {
    width: 50%;
    padding: 12px;
    p,
    span {
      @include defaultText;
      line-height: 200%;
    }
    span {
      margin-right: 4px;
    }
  }

  @include sp {
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-content {
      display: flex;
      flex-direction: column;
      width: 80%;
    }
    &-image {
      width: 100%;
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
    &-description {
      width: 100%;
      padding: 12px;
      p {
        @include defaultText;
        line-height: 200%;
      }
    }
  }
}
</style>
