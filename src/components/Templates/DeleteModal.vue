<template>
  <div v-if="modalVisible">
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
    const router = useRouter();
    const state = ref({
      delete: "削除",
    });
    // モーダル
    const store = useStore();
    const modalVisible = computed(() => {
      return store.getters.getModalFlag;
    });
    const setModalFlag = () => {
      store.commit("changeModalFlag");
    };
    // 削除
    const showDeleteData = computed(() => {
      return store.getters.getDeleteData;
    });

    /**
     *
     */
    const deleteData = async () => {
      setModalFlag();
      const id: number = showDeleteData.value.id;
      const image: string = showDeleteData.value.image;
      if (showDeleteData.value.category === "ドリンク") {
        console.log(showDeleteData.value.category);
        await axios.delete(
          //   "https://vast-everglades-32808.herokuapp.com/drink",
          "http://localhost:3000/drink",
          {
            data: { id: id },
          }
        );
        // S3のバケットから写真を削除
        await axios.delete("http://localhost:3000/s3Url", {
          data: { image: image },
        });
      }

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
  height: 50%;
  background-color: $white;
  z-index: 4;
  // 装飾
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  @include sp {
    width: 80%;
    height: 25%;
  }

  &-content {
    line-height: 200%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    &__button {
      display: flex;
      justify-content: center;
      margin: 8px 0;
    }
  }
}
</style>
