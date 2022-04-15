<template>
  <div class="recruit">
    <breadcrmb />
    <div class="recruit-spacial">
      <recruit-top />
    </div>
    <div class="recruit-component">
      <recruit-form />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Breadcrmb from "@/components/templates/Breadcrmb.vue";
import RecruitTop from "@/components/templates/Recruit/RecruitTop.vue";
import RecruitForm from "@/components/templates/Recruit/RecruitForm.vue";

export default defineComponent({
  name: "Recruit",
  components: { Breadcrmb, RecruitTop, RecruitForm },

  setup() {
    const state = ref({
      medium: "medium",
      small: "small",
      large: "large",
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
