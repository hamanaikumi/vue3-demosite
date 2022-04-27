<template>
  <div class="recruit">
    <breadcrmb />
    <div class="recruit-top">
      <RecruitTop />
    </div>
    <div class="recruit-component">
      <RecruitForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Breadcrmb from "@/components/Templates/Breadcrmb.vue";
import RecruitTop from "@/components/Templates/Recruit/RecruitTop.vue";
import RecruitForm from "@/components/Templates/Recruit/RecruitForm.vue";

export default defineComponent({
  name: "Recruit",
  components: { Breadcrmb, RecruitTop, RecruitForm },

  setup() {
    const state = ref({
      // フォームのサイズ
      medium: "medium",
      small: "small",
      large: "large",
      // フォームのタイトル
      name: "氏名",
      furigana: "ふりがな",
      phone: "電話番号",
      email: "メールアドレス",
    });

    return {
      state,
    };
  },
});
</script>
<style lang="scss" scoped>
.recruit {
  &-component {
    width: 100%;
  }
}
</style>
