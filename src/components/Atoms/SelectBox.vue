<template>
  <div class="select">
    <div class="select-content">
      <div class="select-icon"></div>
      <select :disabled="disabled" @change="handleChange">
        <option disabled value="" selected>{{ value }}</option>
        <option
          v-for="option of options"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, PropType } from "vue";
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
  },
  setup(props, context) {
    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      context.emit("onChange", target.selectedOptions[0].value);
    };
    props = reactive(props);
    return {
      handleChange,
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
  width: 120px;
  &:focus {
    outline: none;
  }
}

option {
  text-align: center;
}
.select {
  display: flex;
  position: relative;

  &-content {
    display: flex;
    text-align: left;
  }

  &-icon {
    position: absolute;
    border-color: $light-gray transparent transparent;
    border-style: solid;
    border-width: 0.45em 0.3em;
    content: "";
    display: block;
    height: 0;
    margin-top: -0.2em;
    left: 70%;
    top: 50%;
    width: 0;
    z-index: 1;
  }
}
</style>
