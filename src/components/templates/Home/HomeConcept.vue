<template>
  <div class="home-concept">
    <title-text :text="props.text" />
    <div class="home-concept__first">
      <div class="home-concept__image">
        <ClipImage />
        <div class="home-concept__anime__first">
          <AnimationImage />
        </div>
        <div class="home-concept__text__first">
          <p>「おいしいものは人を笑顔にできる。」</p>
          <p>
            世界一ふわふわでしっとり感のあるパンケーキに
            濃厚でクリーミーなニュージーランドの高級マヌカハニーと
            発酵バターをブレンドしたホイップバターを絡めると
            これまでになかった驚きと感動に包まれます。
          </p>
        </div>
      </div>
    </div>
    <div class="home-concept__second">
      <div class="home-concept__image">
        <ClipImage2 />
        <div class="home-concept__anime__second">
          <AnimationImage2 />
        </div>
        <div class="home-concept__text__second">
          <p>
            デートや友人同士の御来店はもちろん
            年配のご夫婦から小さなお子様のいるファミリーまで、
            皆様に愛されるパンケーキを目指して
            たくさんの幸せを込めて焼き上げます。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AnimationImage from "@/components/Atoms/AnimationImage1.vue";
import AnimationImage2 from "@/components/Atoms/AnimationImage2.vue";
import ClipImage from "@/components/Atoms/ClipImage.vue";
import ClipImage2 from "@/components/Atoms/ClipImage2.vue";
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TitleText,
    ClipImage,
    ClipImage2,
    AnimationImage,
    AnimationImage2,
  },
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
.home-concept {
  text-align: center;

  &__first {
    display: flex;
  }
  &__second {
    display: flex;
    flex-direction: row-reverse;
  }
  &__image {
    width: 100%;
    position: relative;
  }
  &__text {
    &__first {
      width: 60%;
      position: absolute;
      top: 10%;
      left: 5%;
      p {
        @include defaultText;
      }
    }
    &__second {
      width: 50%;
      position: absolute;
      top: -20%;
      right: 5%;
      p {
        @include defaultText;
      }
    }
  }

  &__anime {
    &__first {
      width: 18%;
      position: absolute;
      top: 50%;
      right: 5%;
    }
    &__second {
      width: 25%;
      position: absolute;
      top: 90%;
      left: 5%;
    }
  }

  @include tab {
    &__first {
      display: flex;
      flex-direction: column;
    }
    &__second {
      display: flex;
      flex-direction: column;
    }
    &__image {
      width: 100%;
    }
    &__text {
      &__first {
        position: static;
        width: 80%;
        p {
          @include defaultText;
        }
      }
      &__second {
        position: static;
        width: 80%;
        p {
          @include defaultText;
        }
      }
    }
    &__anime {
      &__first {
        top: 40%;
      }
      &__second {
        top: 55%;
      }
    }
  }
}
</style>
