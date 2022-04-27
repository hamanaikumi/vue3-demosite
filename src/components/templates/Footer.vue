<template>
  <div class="footer">
    <p>Copyright(c) 2022 *** Co.Ltd. All Rights Reserved.</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>
<style lang="scss" scoped>
.footer {
  @include defaultText();
  height: 120px;
  display: flex;
  justify-content: center;
}
</style>
