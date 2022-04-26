<template>
  <div class="edit-shop">
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.name }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setName" />
      </div>
    </div>
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.postCode }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setPostCode" />
      </div>
    </div>
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.address }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setAddress" />
      </div>
    </div>
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.holiday }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setHoliday" />
      </div>
    </div>
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.tel }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setTel" />
      </div>
    </div>
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.open }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setOpen" />
      </div>
    </div>
    <div class="edit-shop__form">
      <div class="edit-shop__title">
        <p>{{ state.seats }}</p>
      </div>
      <div class="edit-shop__content">
        <Form :size="state.large" @onInput="setSeats" />
      </div>
    </div>
    <!-- button -->
    <div class="edit-shop__button">
      <Button :label="state.submit" @emitClick="upload" />
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

    const state = ref({
      // 子コンポーネントに渡す値
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
     * 入力した情報をmongoDBに保管する.
     */
    const upload = async () => {
      await accessS3();
      // mongodbに保管
      axios.post("https://vast-everglades-32808.herokuapp.com/shop", {
        name: state.value.nameValue,
        postCode: state.value.postCodeValue,
        address: state.value.addressValue,
        holiday: state.value.holidayValue,
        tel: state.value.telValue,
        open: state.value.openValue,
        seats: state.value.seatsValue,
        image: state.value.imageUrl,
      });
    };

    return {
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
.edit-shop {
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
    margin: 48px 0;
  }
}
</style>
