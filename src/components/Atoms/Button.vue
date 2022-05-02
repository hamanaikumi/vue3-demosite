<template>
  <button :class="classes" @click="onClick" :style="style" type="button">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { reactive, computed, defineComponent } from "vue";
export default defineComponent({
  name: "Button",
  props: {
    label: { type: String, default: "Button", required: true },
    primary: {
      type: Boolean,
      default: true,
    },
    backgroundColor: { type: String },
  },
  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        button: true,
        "button-primary": props.primary,
        "button-secondary": !props.primary,
      })),
      // storyで変更できるようにstyle設定
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit("emitClick");
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.button {
  padding: 8px 32px;
  cursor: pointer;
  border-radius: 20px;
  // width: 100px;
  height: 40px;
}
.button-primary {
  background: $light-gray;
  border: none;
  color: $white;
  &:hover {
    background: $dark-gray;
  }
}
</style>
