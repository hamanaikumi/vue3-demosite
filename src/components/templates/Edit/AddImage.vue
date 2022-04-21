<template>
  <div class="addImage">
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
    <div class="addImage-container">
      {{ state.errorimage }}
      <div v-show="!state.imageSrc" class="addImage-imageBox"></div>
      <img v-show="state.imageSrc" :src="state.imageSrc" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import imageCompression from "browser-image-compression";

export default defineComponent({
  setup(props, context) {
    props = reactive(props);
    const state = ref({
      // 画像のURL
      imageSrc: "",
      // 画像エラー文
      errorimage: "",
      // S3に送信する画像ファイル
      imageFile: {},
    });

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
      context.emit("emitImageFile", state.value.imageFile);
    };

    return {
      state,
      fileSelected,
    };
  },
});
</script>
<style lang="scss" scoped>
.addImage {
  margin-bottom: 24px;
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
    margin-bottom: 12px;
    &:hover {
      background: $dark-gray;
    }
  }
  &-container {
    display: flex;
  }
  // 画像添付前のイメージ
  &-imageBox {
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
</style>
