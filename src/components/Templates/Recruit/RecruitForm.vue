<template>
  <TitleText :text="propsValue.text" />
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ propsValue.name }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="propsValue.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ propsValue.furigana }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="propsValue.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ propsValue.phone }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="propsValue.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ propsValue.email }}</p>
    </div>
    <div class="recruit-form__content">
      <Form :size="propsValue.large" />
    </div>
  </div>
  <div class="recruit-form__container">
    <div class="recruit-form__title">
      <p>{{ propsValue.gender }}</p>
    </div>
    <div class="recruit-form__content">
      <SelectBox
        :size="propsValue.large"
        :options="propsValue.genderOptions"
        :value="propsValue.genderValue"
      />
    </div>
  </div>
  <div class="recruit-form__button">
    <Button :label="propsValue.submit" />
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
    const propsValue = {
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
      propsValue,
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
