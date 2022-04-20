<template>
  <div class="newNews">
    <div class="newsForm">
      <div class="newsForm-title">
        <p>{{ propsValue.name }}</p>
      </div>
      <div class="newsForm-content">
        <Form :size="propsValue.large" @onInput="setTitle" />
      </div>
    </div>
    <div class="newsForm">
      <div class="newsForm-title">
        <p>{{ propsValue.detail }}</p>
      </div>
      <div class="newsForm-content">
        <TextArea :rows="6" @onInput="setDetail" />
      </div>
    </div>
    <!-- button -->
    <div class="newsForm-button">
      <Button :label="propsValue.submit" @emitClick="upload" />
    </div>
  </div>
  {{ props }}
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
    const propsValue = {
      medium: "medium",
      small: "small",
      large: "large",
      name: "タイトル",
      detail: "詳細",
      submit: "送信",
    };
    const state = ref({
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
      const { url } = await fetch("http://localhost:3000/s3Url").then((res) =>
        res.json()
      );
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
     * 製品名、値段、画像URLをmongoDBに保管する.
     */
    const upload = async () => {
      await accessS3();
      // mongodbに保管
      axios.post("http://localhost:3000/news", {
        title: state.value.titleValue,
        detail: state.value.detailValue,
        image: state.value.imageUrl,
      });
    };

    return {
      propsValue,
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
.newNews {
  .newsForm {
    display: flex;
    margin-bottom: 12px;
    &-title {
      p {
        font-size: 0.875rem;
        width: 150px;
        font-weight: bold;
      }
    }
    &-button {
      display: flex;
      justify-content: center;
      margin: 18px 0;
    }
    &-fileUpload {
      display: flex;
      flex-direction: column;
      // justify-items: center;
      input[type="file"] {
        display: none;
      }
      p {
        font-size: 0.875rem;
        text-align: center;
        cursor: pointer;
        border-radius: 20px;
        width: 150px;
        height: 40px;
        // 中央揃えにするためheightと同じ数値
        line-height: 40px;
        background: $light-gray;
        border: none;
        color: $white;
        margin-bottom: 24px;
        &:hover {
          background: $dark-gray;
        }
      }
      .imageBox {
        height: 300px;
        width: 300px;
        background-color: $light-gray;
      }
      img {
        height: 300px;
        width: 300px;
        object-fit: cover;
      }
    }
  }
}
</style>
