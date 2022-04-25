<template>
  <div class="select">
    <select :disabled="disabled" @change="handleChange" :class="classes">
      <option disabled value="" selected>{{ value }}</option>
      <option v-for="option of options" :key="option.name" :value="option.name">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, PropType, computed } from "vue";
export default defineComponent({
  name: "SelectBox",
  props: {
    value: {
      type: String,
      default: "都道府県を選択",
    },
    options: {
      type: Array as PropType<any[]>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      // バリデーションはアロー関数にする
      validator: (value: string) => {
        // 配列の中から値を探して、見つからない場合は−1を返す
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
  },
  setup(props, context) {
    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      context.emit("onChange", target.selectedOptions[0].value);
    };
    props = reactive(props);
    return {
      handleChange,
      classes: computed(() => ({
        [`select-${props.size || "medium"}`]: true,
      })),
    };
  },
});
</script>
<style lang="scss" scoped>
select {
  appearance: none;
  padding: 8px 20px;
  border: 2px solid $light-gray;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
}

option {
  text-align: center;
}

.select {
  display: flex;
  margin: 0 auto;
  &-medium {
    width: 180px;
  }
  &-large {
    width: 100%;
  }
}
</style>
