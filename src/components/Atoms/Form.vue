<template>
  <div class="form">
    <div class="form-content">
      <input
        :class="classes"
        :placeholder="InputPlaceholder"
        :value="inputValue"
        @input="emitInput"
      />
    </div>
  </div>
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

<style lang="scss" scoped>
.form {
  // display: flex;
  // width: 360px;
  &-content {
    margin-left: 0;
    display: flex;
    text-align: left;
  }

  input {
    box-sizing: border-box;
  }
  .input-large {
    width: 100%;
    border: 2px solid $light-gray;
    padding: 8px 20px;
    border-radius: 20px;
  }
  .input-large:focus {
    outline: none;
  }

  .input-medium {
    width: 120px;
    border: 2px solid $light-gray;
    padding: 8px 20px;
    border-radius: 20px;
  }
  .input-medium:focus {
    outline: none;
  }
  .input-small {
    width: 60px;
    border: 2px solid $light-gray;
    padding: 8px 20px;
    border-radius: 20px;
  }
  .input-small {
    outline: none;
  }
}
</style>
