<template>
  <box-form :option="currentOption" v-model="formData"></box-form>
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
  name: "Form",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {
        labelWidth: 100,
        items: [
          {
            type: "select",
            prop: "labelAlign",
            label: "对齐方式",
          },
          {
            type: "input",
            prop: "labelWidth",
            label: "标签宽度",
          },
          {
            type: "switch",
            prop: "footer.visable",
            label: "显示按钮",
          },
          {
            type: "select",
            prop: "footer.location",
            label: "按钮位置",
          },
          {
            type: "select",
            prop: "footer.location",
            label: "按钮列表",
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
