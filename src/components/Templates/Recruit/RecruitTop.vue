<template>
  <TitleText :text="propsValue.text" />
  <div class="recruit-top__content">
    <div class="recruit-top__image">
      <img
        class="image-show"
        src="@/assets/images/staff.jpeg"
        alt="コンセプト写真"
      />
    </div>
    <div class="recruit-top__text">
      <p>Sample Cafeでは現在スタッフを募集しています。ご応募お待ちしてます。</p>

      <p>■応募資格：18歳以上</p>
      <p>■勤務内容：ホール、レジ、キッチン補助</p>
      <p>
        ■勤務時間： ①10:30〜15:00 ②17:30〜21:00
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
    const propsValue = {
      // タイトルのテキスト
      text: "Recruit",
    };
    return {
      propsValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.recruit-top {
  &__content {
    display: flex;
    p {
      @include defaultText;
      padding-left: 20px;
    }
  }

  &__image {
    width: 60%;
    height: 400px;
    display: flex;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $white;
      @include animation(
        $animation-name: cover-slide,
        $duration: 1.5s,
        $fill-mode: forwards,
        $delay: 0.2s
      );
    }

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      @include animation(
        $animation-name: image-show,
        $duration: 1.5s,
        $fill-mode: forwards,
        $delay: 0.2s
      );
    }
  }

  &__text {
    width: 40%;
  }

  @include tab {
    &__content {
      flex-direction: column;
    }

    &__image {
      width: 100%;
    }
    &__text {
      width: 100%;
    }
  }
}
</style>
