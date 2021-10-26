<template>
  <div class="box-input-number">
    <el-input-number
      v-model="formData"
      :controls-position="currentOption.controlsPosition"
      :min="currentOption.min"
      :max="currentOption.max"
    ></el-input-number>
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
  name: "InputNumber",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || 0,
    });

    const currentOption = computed(() => {
      let oo = {
        min: -10000000,
        max: 10000000,
      };
      oo = Object.assign(oo, props.option || {});
      return oo;
    });

    watch(() => thatData.formData, (n, o) => {
      context.emit("input", n)
    })

    return {
      ...toRefs(thatData),
      currentOption,
    };
  },
});
</script>
<style lang="scss">
.box-input-number {
  .el-input-number--mini {
    width: 100% !important;
  }
  .el-input-number--small {
    width: 100% !important;
  }
}
</style>
