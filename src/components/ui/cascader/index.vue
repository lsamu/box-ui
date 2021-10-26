<template>
  <div class="box-cascader">
    <el-cascader :options="currentData" :show-all-levels="false"></el-cascader>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Cascader",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      let oo = {};
      oo = Object.assign(oo, props.option || {});
      return oo;
    });

    const currentData = computed(() => {
      let oo: any = [];
      oo = Object.assign(oo, props.data || []);
      return oo;
    });

    return {
      currentOption,
      currentData,
    };
  },
});
</script>
<style lang="scss" scoped>
.box-cascader {
}
</style>
