<template>
  <title-text :text="props.text" />
  <div class="news-content">
    <img
      class="news-image"
      :src="state.displayNews.image"
      alt="コンセプト写真"
    />
    <div>
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
    &-content {
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
