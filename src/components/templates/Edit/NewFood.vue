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

export default defineComponent({
  components: { Form, Button },
  name: "NewFood",
  props: {
    category: {
      type: String,
    },
    imageFile: {},
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
      // アップロード用商品名
      nameValue: "",
      // アップロード用値段
      priceValue: "",
      // アップロード用画像URL
      imageUrl: "",
    });

    const setName = (inputValue: string) => {
      state.value.nameValue = inputValue;
    };
    const setPrice = (inputValue: string) => {
      state.value.priceValue = inputValue;
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
}
</style>
