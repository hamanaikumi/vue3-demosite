<template>
  <div class="food-item">
    <title-text :text="props.text" />
    <div class="food-item-wrapper">
      <div
        class="food-item-content"
        v-for="food of state.foodMenu"
        :key="food.id"
      >
        <div class="food-item-image">
          <img :src="food.image" alt="フード写真" />
        </div>
        <p>{{ food.name }}</p>
        <span>{{ food.price }}円</span>
        <span>（税込{{ food.includeTaxPrice }}円）</span>
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
  name: "Food",
  setup() {
    const store = useStore();
    const props = {
      text: "Food",
    };
    const state = ref({
      foodMenu: [],
    });
    const getFoodMenu = async () => {
      await store.dispatch("getFood");
      state.value.foodMenu = store.getters.getAllFood;
    };
    onBeforeMount(() => {
      getFoodMenu();
    });
    return {
      props,
      state,
      getFoodMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.food-item {
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
