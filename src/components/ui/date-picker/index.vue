<template>
  <el-date-picker
    v-model="text"
    type="date"
    :placeholder="currentOption.placeholder"
    value-format="yyyy-MM-dd"
    :disabled="currentOption.disabled"
  >
  </el-date-picker>
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
  name: "DatePicker",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      text: props.value,
    });
    const currentOption = computed(() => {
      const defaultOption = {
        disabled: false,
        placeholder: "",
      };
      return Object.assign(defaultOption, props.option || {});
    });

    watch(
      () => thatData.text,
      (n, o) => {
        let result = n;
        context.emit("input", result);
        context.emit("change", result);
      }
    );

    watch(
      () => props.value,
      (n, o) => {
        thatData.text = n;
      }
    );

    return {
      ...toRefs(thatData),
      currentOption
    }
  },
});
</script>
<style lang="scss"></style>
