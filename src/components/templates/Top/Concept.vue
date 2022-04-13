<template>
  <div class="concept">
    <p class="title">Concept</p>
    <div class="concept-first">
      <img
        class="concept-image"
        src="../../../assets/images/hotcake2.jpeg"
        alt="コンセプト写真"
      />
      <p>
        「おいしいものは人を笑顔にできる。」
        この思いをカタチにしたのが『幸せのパンケーキ』です。
        世界一ふわふわでしっとり感のあるパンケーキに
        濃厚でクリーミーなニュージーランドの高級マヌカハニーと
        発酵バターをブレンドしたホイップバターを絡めると
        これまでになかった驚きと感動に包まれます。
      </p>
    </div>
    <div class="concept-second">
      <img
        class="concept-image"
        src="../../../assets/images/berry.jpeg"
        alt="コンセプト写真"
      />
      <p>
        デートや友人同士の御来店はもちろん
        年配のご夫婦から小さなお子様のいるファミリーまで、
        皆様に愛されるパンケーキを目指して たくさんの幸せを込めて焼き上げます。
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Concept",
  // setup() {

  // },
});
</script>

<style lang="scss" scoped>
.concept {
  text-align: center;

  &-first {
    display: flex;
    p {
      padding: 20px;
      @include defaultText;
      line-height: 200%;
    }
  }
  &-second {
    display: flex;
    flex-direction: row-reverse;
    p {
      @include defaultText;
      line-height: 200%;
      padding: 20px;
    }
  }
  &-image {
    max-width: 480px;
    height: 320px;
    object-fit: cover;
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
  }
}
</style>
