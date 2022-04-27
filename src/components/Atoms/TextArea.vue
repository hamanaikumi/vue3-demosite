<template>
  <textarea :rows="rows" @input="emitInput" v-model="textArea"></textarea>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Textarea",
  props: {
    // size
    rows: {
      type: Number,
    },
    text: {
      type: String,
    },
  },
  setup(props, context) {
    props = reactive(props);
    const textArea = ref(props.text);
    // 入力した値を取得しemitに渡す
    const emitInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      context.emit("onInput", target.value);
    };
    return { emitInput, textArea };
  },
});
</script>

<style lang="scss" scoped>
textarea {
  box-sizing: border-box;
  width: 100%;
  resize: none;
  border: 2px solid $light-gray;
  padding: 8px 20px;
  border-radius: 20px;
}

textarea:focus {
  outline: none;
}
</style>
