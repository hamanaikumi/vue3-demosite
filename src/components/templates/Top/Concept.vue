<template>
  <div class="concept">
    <title-text :text="props.text" />
    <div class="concept-first">
      <img
        class="concept-image"
        src="../../../assets/images/hotcake2.jpeg"
        alt="コンセプト写真"
      />
      <div class="concept-text">
        <ciecle />
        <p>
          「おいしいものは人を笑顔にできる。」
          世界一ふわふわでしっとり感のあるパンケーキに
          濃厚でクリーミーなニュージーランドの高級マヌカハニーと
          発酵バターをブレンドしたホイップバターを絡めると
          これまでになかった驚きと感動に包まれます。
        </p>
      </div>
    </div>
    <div class="concept-second">
      <img
        class="concept-image"
        src="../../../assets/images/berry.jpeg"
        alt="コンセプト写真"
      />
      <div class="concept-text">
        <ciecle />
        <p>
          デートや友人同士の御来店はもちろん
          年配のご夫婦から小さなお子様のいるファミリーまで、
          皆様に愛されるパンケーキを目指して
          たくさんの幸せを込めて焼き上げます。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Ciecle from "@/components/Atoms/Circle.vue";
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TitleText, Ciecle },
  name: "Concept",
  setup() {
    const props = {
      text: "Concept",
    };
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.concept {
  text-align: center;

  &-first {
    display: flex;
  }
  &-second {
    display: flex;
    flex-direction: row-reverse;
  }
  &-image {
    max-width: 480px;
    height: 320px;
    object-fit: cover;
  }
  &-text {
    width: 50%;
    position: relative;
    p {
      @include defaultText;
      // 中央よせ
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      transform: translateY(-50%) translateX(-50%);
      margin: auto;
      // padding: 20px;
      line-height: 200%;
    }
  }

  @include sp {
    &-first {
      display: flex;
      flex-direction: column;
    }
    &-second {
      display: flex;
      flex-direction: column;
    }
    &-image {
      max-width: 100%;
    }
    &-text {
      width: 100%;
      position: relative;
      margin: 12px 0;
      p {
        @include defaultText;
        // 中央よせ
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
        margin: auto;
        // padding: 20px;
        line-height: 200%;
      }
    }
  }
}
</style>
