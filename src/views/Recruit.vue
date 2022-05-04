<template>
  <div class="recruit">
    <Breadcrmb />
    <div class="recruit-top">
      <RecruitTop />
    </div>
    <div class="recruit-component">
      <RecruitForm />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import Breadcrmb from "@/components/Templates/Breadcrmb.vue";
import RecruitTop from "@/components/Templates/Recruit/RecruitTop.vue";
import RecruitForm from "@/components/Templates/Recruit/RecruitForm.vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
  name: "Recruit",
  components: { Breadcrmb, RecruitTop, RecruitForm },

  setup() {
    // metaデータ
    const siteData = reactive({
      title: `Sample Cafe || 採用情報`,
      description: `Sample Cafeでは現在スタッフを募集しています。ご応募お待ちしてます。`,
    });
    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    });

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
