<template>
  <div class="newFood">
    <div class="foodForm">
      <div class="foodForm-title">
        <p>{{ propsValue.name }}</p>
      </div>
      <div class="foodForm-content">
        <Form :size="propsValue.large" @onInput="setName" />
      </div>
    </div>
    <div class="foodForm">
      <div class="foodForm-title">
        <p>{{ propsValue.price }}</p>
      </div>
      <div class="foodForm-content">
        <Form :size="propsValue.large" @onInput="setPrice" />
      </div>
    </div>
    <!-- file -->
    <div class="foodForm-fileUpload">
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
    <div class="foodForm-button">
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

export default defineComponent({
  components: { Form, Button },
  name: "NewFood",
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
      name: "製品名",
      price: "値段（税抜）",
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
      // アップロード用商品名
      nameValue: "",
      // アップロード用値段
      priceValue: "",
    });

    const setName = (inputValue: string) => {
      state.value.nameValue = inputValue;
    };
    const setPrice = (inputValue: string) => {
      state.value.priceValue = inputValue;
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
      if (props.category === "新商品（ドリンク）") {
        axios.post("http://localhost:3000/food", {
          name: state.value.nameValue,
          price: state.value.priceValue,
          image: state.value.imageUrl,
        });
      } else if (props.category === "新商品（フード）") {
        axios.post("http://localhost:3000/food", {
          name: state.value.nameValue,
          price: state.value.priceValue,
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
      setPrice,
    };
  },
});
</script>
<style lang="scss" scoped>
.foodForm {
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
    // 画像添付前のイメージ
    .imageBox {
      height: 300px;
      width: 300px;
      background-color: $light-gray;
    }
    // 添付された画像
    img {
      height: 300px;
      width: 300px;
      object-fit: cover;
    }
  }
}
</style>
