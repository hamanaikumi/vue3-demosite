<template>
  <title-text :text="props.text" />
  <table>
    <tr class="recruit-form__container">
      <th class="recruit-form__title">
        <p>{{ props.name }}</p>
      </th>
      <td class="recruit-form__content"><Form :size="props.large" /></td>
    </tr>
    <tr class="recruit-form__container">
      <th class="recruit-form__title">
        <p class="recruit-form__content">{{ props.furigana }}</p>
      </th>
      <td><Form :size="props.large" /></td>
    </tr>
    <tr class="recruit-form__container">
      <th class="recruit-form__title">
        <p class="recruit-form__content">{{ props.phone }}</p>
      </th>
      <td><Form :size="props.large" /></td>
    </tr>
    <tr class="recruit-form__container">
      <th class="recruit-form__title">
        <p class="recruit-form__content">{{ props.email }}</p>
      </th>
      <td><Form :size="props.large" /></td>
    </tr>
    <tr class="recruit-form__container">
      <th class="recruit-form__title">
        <p class="recruit-form__content">{{ props.gender }}</p>
      </th>
      <td>
        <SelectBox :options="props.genderOptions" :value="props.genderValue" />
      </td>
    </tr>
  </table>
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
      text: "Form",
      medium: "medium",
      small: "small",
      large: "large",
      name: "氏名",
      furigana: "ふりがな",
      phone: "電話番号",
      email: "メールアドレス",
      submit: "送信",
      gender: "性別",
      genderValue: "性別を選択",
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
table {
  border-spacing: 20px;
}
.recruit-form {
  &__title {
    p {
      font-size: 0.875rem;
      width: 150px;
      font-weight: bold;
    }
  }
  &__button {
    display: flex;
    justify-content: center;
    margin: 18px 0;
  }
}
</style>
