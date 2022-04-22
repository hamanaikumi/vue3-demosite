<template>
  <title-text :text="props.text" />
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
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import NewsType from "@/models/news";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { TitleText },
  name: "News",
  setup() {
    const store = useStore();
    const route = useRoute();
    const props = {
      text: "News",
    };
    const state = ref({
      displayNews: {} as NewsType,
    });
    const getNews = async () => {
      const id = Number(route.params.id);
      store.commit("filterNews", id);
      state.value.displayNews = store.getters.getOneNews;
      console.log(state.value.displayNews);
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
