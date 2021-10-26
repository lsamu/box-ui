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
  name: "BoxImage",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {
        labelWidth: 50,
        hasFooter: false,
        items: [
          {
            type: "textarea",
            prop: "url",
            label: "地址",
            data: [],
          },
          {
            type: "upload",
            prop: "url",
            label: "上传",
            data: [],
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
