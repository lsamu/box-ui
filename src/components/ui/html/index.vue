<template>
  <div class="box-html" v-html="html"></div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

export default defineComponent({
  name: "Html",
  props: ["option", "value"],
  setup(props, context) {
    const thatData = reactive({
      html:props.value||""
    })
    return {
      ...toRefs(thatData)
    };
  },
});
</script>
<style lang="scss">
.box-html {
}
</style>
