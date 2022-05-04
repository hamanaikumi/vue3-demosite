<template>
  <TitleText :text="propsValue.text" />
  <div class="news-content">
    <div class="news-image">
      <img :src="state.displayNews.image" alt="コンセプト写真" />
    </div>
    <div class="news-text">
      <p>
        {{ state.displayNews.date }}
      </p>
      <p>
        {{ state.displayNews.title }}
      </p>
      <p>
        {{ state.displayNews.detail }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import TitleText from "@/components/Atoms/TitleText.vue";
import { computed, defineComponent, onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";
import NewsType from "@/models/news";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

export default defineComponent({
  components: { TitleText },
  name: "News",
  setup() {
    // metaデータ
    const siteData = reactive({
      title: `Sample Cafe || ニュース`,
    });
    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
        },
      ],
    });

    const store = useStore();
    const route = useRoute();
    const propsValue = {
      // タイトルのテキスト
      text: "News",
    };
    const state = ref({
      // ニュース
      displayNews: {} as NewsType,
    });

    /**
     * ストアからIDの一致するニュースを取得する.
     */
    const getNews = async () => {
      const id = Number(route.params.id);
      store.commit("filterNews", id);
      state.value.displayNews = store.getters.getOneNews;
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
.news {
  &-content {
    display: flex;
  }

  &-image {
    height: 400px;
    width: 40%;
    // hover時に画像サイズを固定するため
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-text {
    width: 60%;
    p {
      @include defaultText;
      padding: 20px;
      line-height: 200%;
    }
  }
  @include sp {
    &-content {
      display: flex;
      flex-direction: column;
    }

    &-image {
      width: 100%;
    }
    &-text {
      width: 100%;
    }
  }
}
</style>
