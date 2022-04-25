<template>
  <div class="complete">
    <p>データの送信が完了しました。</p>
    <Button :label="propsValue.edit" @emitClick="backToEdit" />
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
  name: "Complete",
  setup() {
    const router = useRouter();
    const propsValue = {
      edit: "編集に戻る",
    };
    const backToEdit = () => {
      router.push("/Edit");
    };
    return { propsValue, backToEdit };
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
