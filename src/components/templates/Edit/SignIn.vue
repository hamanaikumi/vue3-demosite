<template>
  <div class="edit-signin">
    <title-text :text="state.text" />

    <div class="edit-signin__form">
      <div class="edit-signin__title">
        <p>{{ state.userId }}</p>
      </div>
      <div class="edit-signin__content">
        <Form :size="state.large" @onInput="setUserId" />
      </div>
    </div>
    <div class="edit-signin__form">
      <div class="edit-signin__title">
        <p>{{ state.password }}</p>
      </div>
      <div class="edit-signin__content">
        <Form :size="state.large" @onInput="setPassword" :type="state.type" />
      </div>
    </div>
    <div class="edit-signin__error">
      <p>{{ state.errorMassage }}</p>
    </div>
    <div class="edit-signin__button">
      <Button :label="state.login" @emitClick="signIn" />
    </div>
  </div>
</template>
<script lang="ts">
import Button from "@/components/Atoms/Button.vue";
import Form from "@/components/Atoms/Form.vue";
import { defineComponent, ref } from "vue";
import axios from "axios";
import TitleText from "@/components/Atoms/TitleText.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { Form, Button, TitleText },
  name: "SignIn",
  props: {
    imageFile: {},
  },
  setup() {
    const store = useStore();
    const state = ref({
      // 子コンポーネントに渡す値
      text: "SignIn",
      medium: "medium",
      small: "small",
      large: "large",
      userId: "管理者ID",
      password: "パスワード",
      type: "password",
      login: "ログイン",
      // ログイン失敗時のメッセージ
      errorMassage: "",
      // アップロード用記事タイトル
      userIdValue: "",
      // アップロード用記事詳細
      passwordValue: "",
    });

    const setUserId = (inputValue: string) => {
      state.value.userIdValue = inputValue;
    };
    const setPassword = (inputValue: string) => {
      state.value.passwordValue = inputValue;
    };

    /**
     * 入力した情報をmongoDBに保管する.
     */
    const signIn = async () => {
      // mongodbに保管
      const res = await axios.post(
        "https://vast-everglades-32808.herokuapp.com/signIn",
        {
          userId: state.value.userIdValue,
          password: state.value.passwordValue,
        }
      );
      if (res.data.status === "success") {
        store.commit("setSignInFlag");
        state.value.errorMassage = "";
      } else if (res.data.status === "no user") {
        state.value.errorMassage = "管理者IDまたはパスワードが間違っています";
      }
    };

    return {
      state,
      signIn,
      setUserId,
      setPassword,
    };
  },
});
</script>
<style lang="scss" scoped>
.edit-signin {
  &__form {
    width: 50%;
    display: flex;
    margin-bottom: 12px;
    @include sp {
      width: 100%;
      flex-direction: column;
    }
  }
  &__title {
    width: 20%;
    p {
      @include defaultText;
    }
    @include sp {
      width: 100%;
      margin-left: 15%;
    }
  }
  &__content {
    width: 80%;
  }
  &__error {
    height: 1rem;
    text-align: center;
    p {
      @include defaultText;
    }
  }
  &__button {
    display: flex;
    justify-content: center;
    margin: 48px 0;
  }
}
</style>
