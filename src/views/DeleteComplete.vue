<template>
  <div class="complete">
    <p>データの削除が完了しました。</p>
    <Button :label="propsValue.edit" @emitClick="backToTop" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Atoms/Button.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    Button,
  },
  name: "DeleteComplete",
  setup() {
    const router = useRouter();
    const propsValue = {
      // ボタンのテキスト
      edit: "トップに戻る",
    };
    /**
     * 編集画面に戻る.
     */
    const backToTop = () => {
      router.push("/");
    };
    return { propsValue, backToTop };
  },
});
</script>

<style lang="scss" scoped>
.complete {
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    @include defaultText;
    padding: 24px;
  }
}
</style>
