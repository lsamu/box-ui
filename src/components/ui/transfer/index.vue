<template>
  <div class="box-transfer">
    <el-transfer
      v-model="formData"
      :data="currentData"
      filterable
      :titles="currentOption.titles"
    ></el-transfer>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Transfer",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || [],
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    const currentOption = computed(() => {
      const defaultOption = {
        titles: ["列表1", "列表2"],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentData = computed(() => {
      const defaultData = [];
      let oo = Object.assign(defaultData, props.data || []);
      return oo;
    });

    return {
      ...toRefs(thatData),
      currentOption,
      currentData
    };
  },
});
</script>
<style lang="scss">
.box-transfer {
}
</style>
