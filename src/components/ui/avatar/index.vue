<template>
  <div class="box-avatar">
    <el-avatar
      shape="square"
      :size="100"
      fit="fill"
      :src="formData"
    ></el-avatar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Avatar",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    let formData = ref(props.value || "#");
    return {
      formData,
    };
  },
});
</script>