<template>
  <div class="news">
    <title-text :text="props.text" />
    <div class="news-wrapper">
      <div class="news-content" v-for="news of state.newsArray" :key="news.id">
        <router-link class="router-link" :to="'/News/' + news.id">
          <div class="news-image">
            <img :src="news.image" alt="ニュース写真" />
          </div>
          <div class="news-text">
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

export default defineComponent({
  components: { TitleText },
  name: "TopNews",
  setup() {
    const store = useStore();
    const props = {
      text: "News",
    };
    const state = ref({
      newsArray: [],
    });
    const getNews = async () => {
      await store.dispatch("getNews");
      state.value.newsArray = store.getters.getAllNews;
    };
    onBeforeMount(() => {
      getNews();
    });
    return {
      props,
      state,
      getNews,
    };
  },
});
</script>

<style lang="scss" scoped>
.news {
  &-wrapper {
    display: flex;
  }
  &-content {
    padding: 12px;
    width: 30%;
    @include defaultText;
    line-height: 200%;
  }
  &-image {
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

  &-text {
    overflow: hidden;
    width: 100%;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @include sp {
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-content {
      width: 80%;
      @include defaultText;
      line-height: 200%;
    }
  }
}
</style>
