<template>
  <div class="newNews">
    <div class="newsForm">
      <div class="newsForm-title">
        <p>{{ propsValue.name }}</p>
      </div>
      <div class="newsForm-content">
        <Form :size="propsValue.large" @onInput="setName" />
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

    <!-- file -->
    <div class="newsForm-fileUpload">
      <label for="file-upload">
        <p>画像を選択</p>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          @change="fileSelected"
        />
      </label>
      <div>
        {{ state.errorimage }}
        <div v-show="!state.imageSrc" class="imageBox"></div>
        <img v-show="state.imageSrc" :src="state.imageSrc" />
      </div>
    </div>
    <!-- button -->
    <div class="newsForm-button">
      <Button :label="propsValue.submit" @emitClick="upload" />
    </div>
  </div>
</template>
<script lang="ts">
import Button from "@/components/Atoms/Button.vue";
import Form from "@/components/Atoms/Form.vue";
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import imageCompression from "browser-image-compression";
import TextArea from "@/components/Atoms/TextArea.vue";

export default defineComponent({
  components: { Form, Button, TextArea },
  name: "NewNews",
  props: {
    category: {
      type: String,
    },
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
      // 画像のURL
      imageSrc: "",
      // 画像エラー文
      errorimage: "",
      // S3に送信する画像ファイル
      imageFile: {},
      // アップロード用画像URL
      imageUrl: "",
      // アップロード用記事タイトル
      titleValue: "",
      // アップロード用記事詳細
      detailValue: "",
    });

    const setName = (inputValue: string) => {
      state.value.titleValue = inputValue;
    };
    const setDetail = (inputValue: string) => {
      state.value.detailValue = inputValue;
    };

    /**
     * 新しい画像画像に入れ替える.
     * @param e - 添付ファイル
     */
    const fileSelected = async (e: any) => {
      state.value.errorimage = "";
      const file = e.target.files[0];
      if (file) {
        // 制限サイズ(5MB)
        const sizeLimit = 1024 * 1024 * 5;
        // ファイルサイズが制限以上の場合のエラー
        if (file.size > sizeLimit) {
          state.value.errorimage = "ファイルサイズは5MB以下にしてください";
          return;
        }
        state.value.imageSrc = window.URL.createObjectURL(file);
        // Fileオブジェクトを圧縮
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        };
        const compFile = await imageCompression(file, options);
        state.value.imageFile = compFile;
      }
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
        body: state.value.imageFile as any,
      });
      state.value.imageUrl = url.split("?")[0];
    };
    console.log(props.category);

    /**
     * 製品名、値段、画像URLをmongoDBに保管する.
     */
    const upload = async () => {
      await accessS3();
      // mongodbに保管
      if (props.category === "ニュース") {
        axios.post("http://localhost:3000/news", {
          title: state.value.titleValue,
          detail: state.value.detailValue,
          image: state.value.imageUrl,
        });
      }
    };

    return {
      propsValue,
      state,
      fileSelected,
      accessS3,
      upload,
      setName,
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
