<template>
  <div class="newShop">
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.name }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setName" />
      </div>
    </div>
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.postCode }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setPostCode" />
      </div>
    </div>
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.address }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setAddress" />
      </div>
    </div>
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.holiday }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setHoliday" />
      </div>
    </div>
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.tel }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setTel" />
      </div>
    </div>
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.open }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setOpen" />
      </div>
    </div>
    <div class="shopForm">
      <div class="shopForm-title">
        <p>{{ propsValue.seats }}</p>
      </div>
      <div class="shopForm-content">
        <Form :size="propsValue.large" @onInput="setSeats" />
      </div>
    </div>
    <!-- button -->
    <div class="shopForm-button">
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
  name: "NewShop",
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
      name: "店舗名",
      postCode: "郵便番号",
      address: "住所",
      holiday: "定休日",
      tel: "電話番号",
      open: "営業時間",
      seats: "客席数",
      submit: "送信",
    };
    const state = ref({
      // アップロード用店舗名
      nameValue: "",
      // アップロード用郵便番号
      postCodeValue: "",
      // アップロード用住所
      addressValue: "",
      // アップロード用定休日
      holidayValue: "",
      // アップロード用電話番号
      telValue: "",
      // アップロード用営業時間
      openValue: "",
      // アップロード用客席数
      seatsValue: "",
      // アップロード用画像URL
      imageUrl: "",
    });

    const setName = (inputValue: string) => {
      state.value.nameValue = inputValue;
    };
    const setPostCode = (inputValue: string) => {
      state.value.postCodeValue = inputValue;
    };
    const setAddress = (inputValue: string) => {
      state.value.addressValue = inputValue;
    };
    const setHoliday = (inputValue: string) => {
      state.value.holidayValue = inputValue;
    };
    const setTel = (inputValue: string) => {
      state.value.telValue = inputValue;
    };
    const setOpen = (inputValue: string) => {
      state.value.openValue = inputValue;
    };
    const setSeats = (inputValue: string) => {
      state.value.seatsValue = inputValue;
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
      axios.post("http://localhost:3000/shop", {
        name: state.value.nameValue,
        postCode: state.value.postCodeValue,
        address: state.value.addressValue,
        holiday: state.value.holidayValue,
        tel: state.value.telValue,
        open: state.value.openValue,
        seats: state.value.seatsValue,
        image: state.value.imageUrl,
      });
      console.log("post!");
    };

    return {
      propsValue,
      state,
      accessS3,
      upload,
      setName,
      setPostCode,
      setAddress,
      setHoliday,
      setTel,
      setOpen,
      setSeats,
    };
  },
});
</script>
<style lang="scss" scoped>
.shopForm {
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
