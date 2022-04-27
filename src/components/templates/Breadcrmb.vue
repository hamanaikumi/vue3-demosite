<template>
  <div class="breadcrumb">
    <div>
      <p><router-link class="router-link" to="/">Home</router-link></p>
      <p>></p>
      <p>{{ id }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    const id = route.name;
    return { id };
  },
});
</script>
<style lang="scss" scoped>
.breadcrumb {
  height: 1.5rem;
  div {
    display: flex;
    float: left;
    padding: 0 12px;
    p {
      @include defaultText;
      margin-right: 6px;
    }
  }
}
</style>
