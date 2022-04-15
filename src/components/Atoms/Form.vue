<template>
  <input
    :class="classes"
    :placeholder="InputPlaceholder"
    :value="inputValue"
    @input="emitInput"
  />
</template>

<script lang="ts">
import { reactive, computed, defineComponent } from "vue";

export default defineComponent({
  name: "Form",
  props: {
    // size
    size: {
      type: String,
      // バリデーションはアロー関数にする
      validator: (value: string) => {
        // 配列の中から値を探して、見つからない場合は−1を返す
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },

    // placeholder
    placeholder: {
      type: String || Number,
      required: false,
      default: "",
    },
    // value
    value: {
      type: String || Number,
      required: false,
      default: "",
    },
  },

  setup(props, context) {
    props = reactive(props);

    // 入力した値を取得しemitに渡す
    const emitInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      context.emit("onInput", target.value);
    };

    // return
    return {
      InputPlaceholder: computed(() => props.placeholder),
      classes: computed(() => ({
        [`input-${props.size || "medium"}`]: true,
      })),
      inputValue: computed(() => props.value),
      emitInput,
    };
  },
});
</script>

<style scoped>
input {
  box-sizing: border-box;
}
.input-large {
  width: 100%;
  /* border: 1px solid #a9a9a9; */
  padding: 8px;
}
.input-large:focus {
  outline: none;
}

.input-medium {
  width: 50%;
  border: 1px solid #a9a9a9;
  padding: 8px;
}
.input-medium:focus {
  outline: none;
}
.input-small {
  width: 100px;
  border: 1px solid #a9a9a9;
  padding: 8px;
}
.input-small {
  outline: none;
}
</style>
