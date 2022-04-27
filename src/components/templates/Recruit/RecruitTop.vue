<template>
  <title-text :text="props.text" />
  <div class="recruit-top__content">
    <img
      class="recruit-top__image"
      src="@/assets/images/staff.jpeg"
      alt="コンセプト写真"
    />
    <div class="recruit-top__text">
      <p>Sample Cafeでは現在スタッフを募集しています。ご応募お待ちしてます。</p>

      <p>■応募資格：18歳以上</p>
      <p>■勤務内容：ホール、レジ、キッチン補助</p>
      <p>■勤務時間：</p>
      <p>
        ①10:30〜15:00 ②17:30〜21:00
        <br />
        ※①のみ②のみでもOK <br />
        ※土日祝入れる方<br />
        ※週2日〜3日程度勤務可能な方
      </p>
      <p>■勤務日：1ヶ月ごとのシフト希望制</p>
      <p>■待遇：時給1000円<br />交通費支給なし エプロン貸与</p>
      <p>■選考方法：面接</p>
      <p>
        ■応募方法：お電話にて面接日時を決定させて頂きます。
        面接時は履歴書をご持参ください。
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
.recruit-top {
  &__content {
    display: flex;
  }

  &__image {
    max-width: 600px;
    height: 400px;
    object-fit: cover;
  }

  &__text {
    padding: 20px;
    p {
      @include defaultText;
    }
  }

  @include sp {
    &__content {
      flex-direction: column;
    }

    &__image {
      max-width: 100%;
    }
  }
}
</style>
