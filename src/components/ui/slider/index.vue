<template>
  <div class="box-slider">
    <el-slider
      v-model="formData"
      :min="currentOption.min"
      :max="currentOption.max"
    ></el-slider>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Slider",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || 0,
    });

    const currentOption = computed(() => {
      let oo = {
        min: 0,
        max: 100,
      };
      oo = Object.assign(oo, props.option || {});
      return oo;
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    return {
      ...toRefs(thatData),
      currentOption,
    };
  },
});
</script>
<style lang="scss"></style>
