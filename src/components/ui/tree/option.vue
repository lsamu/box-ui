<template>
  <box-form :option="currentOption" v-model="formData"></box-form>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  watch,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  name: "Tree",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {
        labelWidth: 70,
        hasFooter: false,
        items: [
          {
            type: "textarea",
            label: "默认值",
            prop: "value",
          },
        ],
      };
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
