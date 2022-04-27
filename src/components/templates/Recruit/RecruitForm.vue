<template>
  <title-text :text="props.text" />
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ props.name }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="props.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ props.furigana }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="props.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ props.phone }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="props.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ props.email }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="props.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ props.gender }}</p>
    </div>
    <div class="recruit-form__content">
      <SelectBox
        :size="props.large"
        :options="props.genderOptions"
        :value="props.genderValue"
      />
    </div>
  </div>
  <div class="recruit-form__button">
    <Button :label="props.submit" />
  </div>
</template>
<script lang="ts">
import Button from "@/components/Atoms/Button.vue";
import Form from "@/components/Atoms/Form.vue";
import SelectBox from "@/components/Atoms/SelectBox.vue";
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText, Form, Button, SelectBox },
  name: "RecruitForm",
  setup() {
    const props = {
      // タイトルのテキスト
      text: "Form",
      // フォームのサイズ
      medium: "medium",
      small: "small",
      large: "large",
      // フォームのタイトル
      name: "氏名",
      furigana: "ふりがな",
      phone: "電話番号",
      email: "メールアドレス",
      submit: "送信",
      gender: "性別",
      // 性別選択の初期値
      genderValue: "性別を選択",
      // 性別選択の選択肢
      genderOptions: [
        {
          name: "男",
        },
        {
          name: "女",
        },
      ],
    };

    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.recruit-form {
  &__container {
    width: 50%;
    display: flex;
    margin-bottom: 12px;
    @include sp {
      width: 100%;
      flex-direction: column;
    }
  }
  &__title {
    width: 30%;
    p {
      @include defaultText;
    }
    @include sp {
      width: 100%;
      margin-left: 20%;
    }
  }
  &__content {
    width: 70%;
  }
  &__button {
    display: flex;
    justify-content: center;
    margin: 48px 0;
  }
}
</style>
