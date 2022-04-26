<template>
  <div class="edit-news">
    <div class="edit-news__form">
      <div class="edit-news__title">
        <p>{{ state.name }}</p>
      </div>
      <div class="edit-news__content">
        <Form :size="state.large" @onInput="setTitle" />
      </div>
    </div>
    <div class="edit-news__form">
      <div class="edit-news__title">
        <p>{{ state.detail }}</p>
      </div>
      <div class="edit-news__content">
        <TextArea :rows="6" @onInput="setDetail" />
      </div>
    </div>
    <div class="edit-news__button">
      <Button :label="state.submit" @emitClick="upload" />
    </div>
  </div>
</template>
<script lang="ts">
import Button from "@/components/Atoms/Button.vue";
import Form from "@/components/Atoms/Form.vue";
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import TextArea from "@/components/Atoms/TextArea.vue";

export default defineComponent({
  components: { Form, Button, TextArea },
  name: "NewNews",
  props: {
    imageFile: {},
  },
  setup(props) {
    props = reactive(props);

    const state = ref({
      // 子コンポーネントに渡す値
      medium: "medium",
      small: "small",
      large: "large",
      name: "タイトル",
      detail: "詳細",
      submit: "送信",
      // アップロード用記事タイトル
      titleValue: "",
      // アップロード用記事詳細
      detailValue: "",
      // アップロード用画像URL
      imageUrl: "",
    });

    const setTitle = (inputValue: string) => {
      state.value.titleValue = inputValue;
    };
    const setDetail = (inputValue: string) => {
      state.value.detailValue = inputValue;
    };

    /**
     * S3からURL取得した後、画像ファイルをS3に保管する.
     */
    const accessS3 = async () => {
      // S3からURLを取得
      const { url } = await fetch(
        "https://vast-everglades-32808.herokuapp.com/s3Url"
      ).then((res) => res.json());
      // S3のバケットに写真をPOST
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: props.imageFile as any,
      });
      state.value.imageUrl = url.split("?")[0];
    };

    /**
     * 入力した情報をmongoDBに保管する.
     */
    const upload = async () => {
      await accessS3();
      // mongodbに保管
      axios.post("https://vast-everglades-32808.herokuapp.com/news", {
        date: new Date(),
        title: state.value.titleValue,
        detail: state.value.detailValue,
        image: state.value.imageUrl,
      });
    };

    return {
      state,
      accessS3,
      upload,
      setTitle,
      setDetail,
    };
  },
});
</script>
<style lang="scss" scoped>
.edit-news {
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
  &__button {
    display: flex;
    justify-content: center;
    margin: 18px 0;
  }
}
</style>
