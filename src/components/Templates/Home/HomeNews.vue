<template>
  <div class="home-news">
    <TitleText :text="propsValue.text" />
    <div class="home-news__wrapper">
      <div
        class="home-news__content"
        v-for="news of state.newsArray"
        :key="news.id"
      >
        <router-link class="router-link" :to="'/News/' + news.id">
          <div class="home-news__image">
            <img :src="news.image" alt="ニュース写真" />
          </div>
          <div class="home-news__text">
            <p>{{ news.date }}</p>
            <p>{{ news.title }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import News from "@/models/news";

export default defineComponent({
  components: { TitleText },
  name: "TopNews",
  setup() {
    const store = useStore();
    const propsValue = {
      // タイトルのテキスト
      text: "News",
    };
    const state = ref({
      // ニュース
      newsArray: Array<News>(),
    });

    /**
     * ニュース(最新3件)を取得する.
     */
    const getNews = async () => {
      await store.dispatch("getNews");
      // 最新が先頭に来るように並び替え
      state.value.newsArray = store.getters.getTopNews;
    };

    onBeforeMount(() => {
      getNews();
    });

    return {
      propsValue,
      state,
      getNews,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-news {
  &__wrapper {
    display: flex;
  }
  &__content {
    padding: 12px;
    width: 30%;
    @include defaultText;
    line-height: 200%;
  }
  &__image {
    height: 300px;
    width: 300px;
    // hover時に画像サイズを固定するため
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &::after {
      content: "Read More";
      font-size: 16px;
      letter-spacing: 0.2em;
      text-align: center;
      padding-top: 41%;
      color: #fff;
      width: 100%;
      height: 100%;
      display: block;
      background: rgba(0, 0, 0, 0.4);
      transition: 0.8s;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    &:hover {
      img {
        transition: all 0.5s ease;
        transform: scale(1.05);
      }
      &::after {
        opacity: 1;
      }
    }
  }

  &__text {
    overflow: hidden;
    width: 100%;
    margin: 8px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @include tab {
    &__image {
      height: 200px;
      width: 200px;
    }
  }

  @include sp {
    &__wrapper {
      display: flex;
      flex-direction: column;
    }
    &__content {
      width: 80%;
      @include defaultText;
      line-height: 200%;
    }
    &__image {
      height: 300px;
      width: 300px;
    }
  }
}
</style>
