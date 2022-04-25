<template>
  <div class="edit-food">
    <div class="edit-food__form">
      <div class="edit-food__title">
        <p>{{ propsValue.name }}</p>
      </div>
      <div class="edit-food__content">
        <Form :size="propsValue.large" @onInput="setName" />
      </div>
    </div>
    <div class="edit-food__form">
      <div class="edit-food__title">
        <p>{{ propsValue.price }}</p>
      </div>
      <div class="edit-food__content">
        <Form :size="propsValue.large" @onInput="setPrice" />
      </div>
    </div>
    <div class="edit-food__button">
      <Button :label="propsValue.submit" @emitClick="upload" />
    </div>
  </div>
</template>
<script lang="ts">
import Button from "@/components/Atoms/Button.vue";
import Form from "@/components/Atoms/Form.vue";
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { Form, Button },
  name: "EditFood",
  props: {
    category: {
      type: String,
    },
    imageFile: {},
  },
  setup(props) {
    const router = useRouter();
    props = reactive(props);
    const propsValue = {
      medium: "medium",
      small: "small",
      large: "large",
      name: "商品名",
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
     * 商品名、値段、画像URLをmongoDBに保管する.
     */
    const upload = async () => {
      await accessS3();
      // mongodbに保管
      if (props.category === "新商品（ドリンク）") {
        await axios.post("https://vast-everglades-32808.herokuapp.com/drink", {
          name: state.value.nameValue,
          price: state.value.priceValue,
          image: state.value.imageUrl,
        });
      } else if (props.category === "新商品（フード）") {
        await axios.post("https://vast-everglades-32808.herokuapp.com/food", {
          name: state.value.nameValue,
          price: state.value.priceValue,
          image: state.value.imageUrl,
        });
      }
      router.push("/Complete");
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
.edit-food {
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
