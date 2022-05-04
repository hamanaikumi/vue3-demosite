<template>
  <div v-show="modalVisible">
    <div class="modal" @click="setModalFlag"></div>
    <div class="card">
      <div class="card-content">
        <p>データを削除しますか？</p>
        <p>カテゴリー：{{ showDeleteData.category }}</p>
        <p>ID：{{ showDeleteData.id }}</p>
        <p>{{ showDeleteData.name }}</p>
        <div class="card-content__button">
          <Button :label="state.delete" @emitClick="deleteData" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Button from "../Atoms/Button.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = ref({
      // ボタンのテキスト
      delete: "削除",
    });

    /**
     * ストアから取得したモーダルの表示状態を返す.
     */
    const modalVisible = computed(() => {
      return store.getters.getModalFlag;
    });

    /**
     * ストアのモーダルの表示状態を切り替える.
     */
    const setModalFlag = () => {
      store.commit("changeModalFlag");
    };

    /**
     * 削除するデータを返す.
     */
    const showDeleteData = computed(() => {
      return store.getters.getDeleteData;
    });

    /**
     * 選択したデータを削除する.
     */
    const deleteData = async () => {
      setModalFlag();
      const id: number = showDeleteData.value.id;
      const image: string = showDeleteData.value.image;
      if (showDeleteData.value.category === "ドリンク") {
        await axios.delete(
          "https://vast-everglades-32808.herokuapp.com/drink",
          {
            data: { id: id },
          }
        );
      } else if (showDeleteData.value.category === "フード") {
        await axios.delete("https://vast-everglades-32808.herokuapp.com/food", {
          data: { id: id },
        });
      } else if (showDeleteData.value.category === "店舗") {
        await axios.delete("https://vast-everglades-32808.herokuapp.com/shop", {
          data: { id: id },
        });
      }
      // S3のバケットから写真を削除
      await axios.delete("https://vast-everglades-32808.herokuapp.com/s3Url", {
        data: { image: image },
      });
      // 完了画面に画面遷移する
      router.push("/DeleteComplete");
    };

    return {
      state,
      modalVisible,
      setModalFlag,
      showDeleteData,
      deleteData,
    };
  },
  components: { Button },
});
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 150%;
  height: 100%;
  background-color: $black;
  opacity: 0.5;
  z-index: 3;
}
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 50%;
  height: 40%;
  background-color: $white;
  z-index: 4;
  // 中身を中央よせ
  display: flex;
  margin: 0 auto;
  // 装飾
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  @include sp {
    width: 80%;
    height: 30%;
  }

  &-content {
    p {
      @include defaultText;
    }
    &__button {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
  }
}
</style>
