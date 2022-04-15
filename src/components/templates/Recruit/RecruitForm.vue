<template>
  <title-text :text="props.text" />
  <div class="recruitForm">
    <div class="recruitForm-content">
      <Form :title="state.name" :size="state.large" />
    </div>
    <div class="recruitForm-content">
      <Form :title="state.furigana" :size="state.large" />
    </div>
    <div class="recruitForm-content">
      <Form :title="state.phone" :size="state.large" />
    </div>
    <div class="recruitForm-content">
      <Form :title="state.email" :size="state.large" />
    </div>
  </div>
  <div class="recruitForm-button">
    <Button :label="state.submit" />
  </div>
</template>
<script lang="ts">
import Button from "@/components/Atoms/Button.vue";
import Form from "@/components/Atoms/Form.vue";
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { TitleText, Form, Button },
  name: "RecruitForm",
  setup() {
    const props = {
      text: "Form",
    };
    const state = ref({
      medium: "medium",
      small: "small",
      large: "large",
      name: "氏名",
      furigana: "ふりがな",
      phone: "電話番号",
      email: "メールアドレス",
      submit: "送信",
    });

    return {
      props,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.recruitForm {
  &-content {
    display: flex;
    margin: auto;
    margin-bottom: 12px;
  }

  &-button {
    display: flex;
    justify-content: center;
    margin: 12px 0;
  }
}
</style>
