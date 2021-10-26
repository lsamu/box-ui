<template>
  <div class="box-markdown-editor">
    <!-- <mavon-editor style="height: 100%"></mavon-editor> -->
    调试中
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import "mavon-editor/dist/css/index.css";

export default defineComponent({
  name: "Markdown",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    return {};
  },
});
</script>
<style lang="scss">
.box-markdown-editor {
}
</style>
