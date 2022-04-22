<template>
  <title-text :text="props.text" />
  <div class="menu-special-content">
    <img
      class="menu-image"
      src="@/assets/images/staff.jpeg"
      alt="コンセプト写真"
    />
    <div>
      <p>
        社員の着実なステップアップをかなえる研修制度や、一人ひとりに合った働き方を応援するサポート体制。
        社員がやりがいをもって働くことのできる環境づくりを目指しています。
        あなたの夢を、私たちと一緒に実現していきませんか。
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText },
  name: "RecruitTop",
  setup() {
    const props = {
      text: "Recruit",
    };
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu {
  &-special-content {
    display: flex;
    p {
      @include defaultText;
      padding: 20px;
      line-height: 200%;
    }
  }

  &-image {
    max-width: 600px;
    height: 400px;
    object-fit: cover;
  }

  @include sp {
    &-special-content {
      display: flex;
      flex-direction: column;
      p {
        padding: 20px;
        @include defaultText;
        line-height: 200%;
      }
    }

    &-image {
      max-width: 100%;
    }
  }
}
</style>
