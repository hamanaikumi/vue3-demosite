<template>
  <div class="selectCategory">
    <title-text :text="props.text" />
    <div class="categoryForm">
      <div class="categoryForm-content">
        <select-box
          :options="props.categoryOptions"
          :value="props.categoryValue"
          :size="props.size"
          @onChange="emitChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SelectBox from "../../Atoms/SelectBox.vue";
import TitleText from "../../Atoms/TitleText.vue";

export default defineComponent({
  components: { SelectBox, TitleText },
  setup(_, context) {
    const props = ref({
      text: "Edit",
      size: "large",

      categoryValue: "カテゴリーを選択",
      categoryOptions: [
        { name: "新商品（フード）" },
        { name: "新商品（ドリンク）" },
        { name: "ニュース" },
        { name: "店舗" },
      ],
    });
    const emitChange = (selectedValue: string) => {
      context.emit("onChange", selectedValue);
    };
    return {
      props,
      emitChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.selectCategory {
  margin-bottom: 24px;
  .categoryForm {
    display: flex;
    justify-content: flex-start;
    &-title {
      width: 30%;
      p {
        font-size: 0.875rem;
        font-weight: bold;
      }
    }
    &-content {
      width: 70%;
    }
  }
}
</style>
